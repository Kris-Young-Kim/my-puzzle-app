# 명화 직소 퍼즐 — 백엔드 + Neon DB Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 명화 직소 퍼즐 앱의 백엔드 API(콘텐츠 카탈로그 + 유저 진행상황 동기화)를 Vercel Functions + Neon Postgres로 구현한다.

**Architecture:** `api/*.ts` 파일마다 Web 표준 `Request`→`Response` 핸들러를 export 한다(Vercel zero-config가 자동 빌드). 핸들러는 얇게 유지하고 실제 로직은 `src/lib`(순수 함수: 검증·HTTP·동기화 병합)와 `src/repositories`(DB 접근)로 분리한다. DB 접근은 `QueryExecutor` 인터페이스 뒤에 두어, 프로덕션은 Neon serverless 드라이버로, 테스트는 인프로세스 Postgres(PGlite)로 주입한다. 이렇게 하면 Docker·외부 서비스 없이 실제 Postgres에 대고 통합 테스트가 가능하다.

**Tech Stack:** Node.js (ESM, TypeScript), Vercel Functions(`@vercel/node`), `@neondatabase/serverless`, `@clerk/backend`, `zod`(검증), `vitest`(테스트), `@electric-sql/pglite`(테스트용 인프로세스 Postgres).

---

## File Structure

```
api/
  health.ts            — GET /api/health (DB 연결 확인)
  paintings.ts         — GET /api/paintings (공개, 콘텐츠 카탈로그)
  packs.ts             — GET /api/packs (공개, 확장팩 카탈로그)
  progress.ts          — GET + PUT /api/progress (Clerk 인증 필요)
  sync.ts              — POST /api/sync (Clerk 인증 필요, 로컬→클라우드 병합)
src/
  types.ts             — 공유 타입(Difficulty, ProgressRecord, Painting, Pack)
  lib/
    http.ts            — JSON 응답 헬퍼 (순수)
    validation.ts      — Zod 스키마 + JSON 파싱 (순수)
    sync-merge.ts      — 진행상황 병합 규칙 (순수, 핵심 비즈니스 로직)
    sql-file.ts        — SQL 파일을 문 단위로 분리/실행 (순수 분리 + 실행 헬퍼)
    db.ts              — QueryExecutor 인터페이스 + Neon 구현
    auth.ts            — Bearer 토큰 추출(순수) + Clerk 검증 래퍼
    deps.ts            — 핸들러 의존성(Deps) 조립: 프로덕션 db + getUserId
  repositories/
    paintings.ts       — 카탈로그 조회
    packs.ts           — 확장팩 조회
    progress.ts        — 유저 진행상황 조회/upsert/sync
  handlers/
    paintings.ts       — handleGetPaintings(request, deps)  (테스트 대상 코어)
    packs.ts           — handleGetPacks(request, deps)
    progress.ts        — handleGetProgress / handlePutProgress(request, deps)
    sync.ts            — handleSync(request, deps)
  migrations/
    001_init.sql       — 스키마
    seed.sql           — 개발용 초기 명화 데이터
  scripts/
    migrate.ts         — DATABASE_URL에 마이그레이션 SQL 실행
    seed.ts            — seed.sql 실행
  test/
    pglite-executor.ts — 테스트용 PGlite 기반 QueryExecutor 팩토리
tests/
  http.test.ts
  validation.test.ts
  sync-merge.test.ts
  sql-file.test.ts
  migrate.test.ts
  repositories.test.ts
  auth.test.ts
  handlers.test.ts
  seed.test.ts
vercel.ts              — Vercel 프로젝트 설정
tsconfig.json
vitest.config.ts
package.json
.env.example
.gitignore
```

핸들러는 `api/*.ts`(Vercel이 발견하는 얇은 어댑터)와 `src/handlers/*.ts`(DI를 받는 테스트 가능한 코어)로 나눈다. `api/*.ts`는 프로덕션 `Deps`를 만들어 코어에 위임만 한다.

---

## 공유 규약 (모든 Task 공통 참조)

- **Difficulty 타입:** `'25' | '100' | '400'`
- **ProgressRecord 필드:** `paintingId: string`, `difficulty: Difficulty`, `placedPieceIds: number[]`, `isCompleted: boolean`, `completedAt: string | null`(ISO), `updatedAt: string`(ISO)
- **QueryExecutor:** `query<T>(text: string, params?: unknown[]): Promise<T[]>` — **rows 배열을 직접 반환**한다. (Neon http 드라이버의 `sql.query`는 rows 배열을 반환하고, PGlite는 `{rows}`를 반환하므로 어댑터에서 `.rows`를 벗겨 통일한다.)
- **다중 문 SQL:** Neon http 드라이버는 한 쿼리에 여러 SQL 문을 지원하지 않는다. 마이그레이션/시드는 항상 `applySqlFile`로 문 단위 분리 실행한다.
- **Deps:** `{ db: QueryExecutor; getUserId: (request: Request) => Promise<string | null> }`
- **응답 포맷:** 성공 `{ success: true, ...data }`, 실패 `{ success: false, error: string }`

---

## Task 0: 프로젝트 스캐폴딩

**Files:**
- Create: `package.json`, `tsconfig.json`, `vitest.config.ts`, `vercel.ts`, `.env.example`, `.gitignore`

- [ ] **Step 1: package.json 작성**

Create `package.json`:

```json
{
  "name": "mypuzzle-backend",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vercel dev",
    "test": "vitest run",
    "test:watch": "vitest",
    "migrate": "node --experimental-strip-types src/scripts/migrate.ts",
    "seed": "node --experimental-strip-types src/scripts/seed.ts",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@clerk/backend": "^1.21.0",
    "@neondatabase/serverless": "^0.10.4",
    "zod": "^3.24.1"
  },
  "devDependencies": {
    "@electric-sql/pglite": "^0.2.17",
    "@types/node": "^22.10.0",
    "typescript": "^5.7.2",
    "vitest": "^2.1.8"
  }
}
```

- [ ] **Step 2: tsconfig.json 작성**

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "lib": ["ES2022", "DOM"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "verbatimModuleSyntax": false,
    "types": ["node"],
    "noEmit": true
  },
  "include": ["src", "api", "tests", "vercel.ts"]
}
```

> `lib`에 `DOM`을 넣는 이유: Web 표준 `Request`/`Response` 타입을 쓰기 위함.

- [ ] **Step 3: vitest.config.ts 작성**

Create `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
});
```

- [ ] **Step 4: vercel.ts 작성**

Create `vercel.ts`:

```typescript
import type { VercelConfig } from '@vercel/config/v1';

export const config: VercelConfig = {
  framework: null,
};
```

> 백엔드만 있는 zero-config 프로젝트이므로 framework는 null. 프론트엔드(Expo)는 별도 빌드이며 이 설정에 포함하지 않는다. `@vercel/config`가 미설치면 타입 경고가 날 수 있으니 설치: `npm i -D @vercel/config`.

- [ ] **Step 5: .env.example 과 .gitignore 작성**

Create `.env.example`:

```
# Neon Postgres 연결 문자열 (sslmode=require 포함)
DATABASE_URL=postgresql://user:password@ep-xxx.aws.neon.tech/neondb?sslmode=require

# Clerk 백엔드 시크릿 키 (대시보드 > API Keys)
CLERK_SECRET_KEY=sk_test_xxx
```

Create `.gitignore`:

```
node_modules/
.env
.env.local
.vercel/
dist/
*.log
```

- [ ] **Step 6: 의존성 설치**

Run: `npm install`
Expected: `node_modules/` 생성, 에러 없이 완료

- [ ] **Step 7: Commit**

```bash
git add package.json tsconfig.json vitest.config.ts vercel.ts .env.example .gitignore
git commit -m "chore: scaffold backend project (vercel + neon + vitest)"
```

---

## Task 1: 공유 타입 + HTTP 응답 헬퍼

**Files:**
- Create: `src/types.ts`
- Create: `src/lib/http.ts`
- Test: `tests/http.test.ts`

- [ ] **Step 1: 공유 타입 작성**

Create `src/types.ts`:

```typescript
export type Difficulty = '25' | '100' | '400';

export interface ProgressRecord {
  paintingId: string;
  difficulty: Difficulty;
  placedPieceIds: number[];
  isCompleted: boolean;
  completedAt: string | null;
  updatedAt: string;
}

export interface PaintingDifficulty {
  level: Difficulty;
  gridCols: number;
  gridRows: number;
}

export interface Painting {
  id: string;
  painter: { id: string; name: string; birthYear: number | null; deathYear: number | null };
  title: string;
  imageUrl: string;
  thumbnailUrl: string;
  styleTag: string | null;
  docentStory: string | null;
  isFeatured: boolean;
  difficulties: PaintingDifficulty[];
}

export interface Pack {
  id: string;
  name: string;
  description: string | null;
  priceDisplay: string | null;
  revenuecatProductId: string | null;
  paintingIds: string[];
}
```

- [ ] **Step 2: 실패하는 테스트 작성**

Create `tests/http.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { jsonResponse, ok, badRequest, unauthorized, serverError } from '../src/lib/http.ts';

async function readJson(res: Response) {
  return JSON.parse(await res.text());
}

describe('http helpers', () => {
  it('jsonResponse sets status and content-type', async () => {
    const res = jsonResponse(201, { a: 1 });
    expect(res.status).toBe(201);
    expect(res.headers.get('content-type')).toBe('application/json');
    expect(await readJson(res)).toEqual({ a: 1 });
  });

  it('ok wraps data with success true and status 200', async () => {
    const res = ok({ paintings: [] });
    expect(res.status).toBe(200);
    expect(await readJson(res)).toEqual({ success: true, paintings: [] });
  });

  it('badRequest returns 400 with error message', async () => {
    const res = badRequest('bad input');
    expect(res.status).toBe(400);
    expect(await readJson(res)).toEqual({ success: false, error: 'bad input' });
  });

  it('unauthorized returns 401', async () => {
    const res = unauthorized();
    expect(res.status).toBe(401);
    expect(await readJson(res)).toEqual({ success: false, error: 'Unauthorized' });
  });

  it('serverError returns 500', async () => {
    const res = serverError('boom');
    expect(res.status).toBe(500);
    expect(await readJson(res)).toEqual({ success: false, error: 'boom' });
  });
});
```

- [ ] **Step 3: 테스트 실패 확인**

Run: `npm test -- tests/http.test.ts`
Expected: FAIL — `Cannot find module '../src/lib/http.ts'`

- [ ] **Step 4: 최소 구현 작성**

Create `src/lib/http.ts`:

```typescript
export function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

export function ok(data: Record<string, unknown>): Response {
  return jsonResponse(200, { success: true, ...data });
}

export function badRequest(error: string): Response {
  return jsonResponse(400, { success: false, error });
}

export function unauthorized(): Response {
  return jsonResponse(401, { success: false, error: 'Unauthorized' });
}

export function serverError(error: string): Response {
  return jsonResponse(500, { success: false, error });
}
```

- [ ] **Step 5: 테스트 통과 확인**

Run: `npm test -- tests/http.test.ts`
Expected: PASS (5 passed)

- [ ] **Step 6: Commit**

```bash
git add src/types.ts src/lib/http.ts tests/http.test.ts
git commit -m "feat: add shared types and http response helpers"
```

---

## Task 2: 요청 검증 (Zod)

**Files:**
- Create: `src/lib/validation.ts`
- Test: `tests/validation.test.ts`

- [ ] **Step 1: 실패하는 테스트 작성**

Create `tests/validation.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { progressRecordSchema, syncBodySchema } from '../src/lib/validation.ts';

const validRecord = {
  paintingId: 'starry-night',
  difficulty: '100',
  placedPieceIds: [0, 1, 2],
  isCompleted: false,
  completedAt: null,
  updatedAt: '2026-10-13T10:00:00.000Z',
};

describe('progressRecordSchema', () => {
  it('accepts a valid record', () => {
    expect(progressRecordSchema.safeParse(validRecord).success).toBe(true);
  });

  it('rejects an invalid difficulty', () => {
    const r = progressRecordSchema.safeParse({ ...validRecord, difficulty: '50' });
    expect(r.success).toBe(false);
  });

  it('rejects a non-ISO updatedAt', () => {
    const r = progressRecordSchema.safeParse({ ...validRecord, updatedAt: 'yesterday' });
    expect(r.success).toBe(false);
  });

  it('rejects negative piece ids', () => {
    const r = progressRecordSchema.safeParse({ ...validRecord, placedPieceIds: [-1] });
    expect(r.success).toBe(false);
  });
});

describe('syncBodySchema', () => {
  it('accepts an array of records under records key', () => {
    const r = syncBodySchema.safeParse({ records: [validRecord] });
    expect(r.success).toBe(true);
  });

  it('rejects more than 500 records', () => {
    const many = Array.from({ length: 501 }, () => validRecord);
    const r = syncBodySchema.safeParse({ records: many });
    expect(r.success).toBe(false);
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npm test -- tests/validation.test.ts`
Expected: FAIL — `Cannot find module '../src/lib/validation.ts'`

- [ ] **Step 3: 최소 구현 작성**

Create `src/lib/validation.ts`:

```typescript
import { z } from 'zod';

export const difficultySchema = z.enum(['25', '100', '400']);

export const progressRecordSchema = z.object({
  paintingId: z.string().min(1).max(64),
  difficulty: difficultySchema,
  placedPieceIds: z.array(z.number().int().nonnegative()),
  isCompleted: z.boolean(),
  completedAt: z.string().datetime().nullable(),
  updatedAt: z.string().datetime(),
});

export const syncBodySchema = z.object({
  records: z.array(progressRecordSchema).max(500),
});

export type ProgressRecordInput = z.infer<typeof progressRecordSchema>;
export type SyncBodyInput = z.infer<typeof syncBodySchema>;
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `npm test -- tests/validation.test.ts`
Expected: PASS (6 passed)

- [ ] **Step 5: Commit**

```bash
git add src/lib/validation.ts tests/validation.test.ts
git commit -m "feat: add zod request validation schemas"
```

---

## Task 3: 진행상황 병합 로직 (핵심)

진행상황 동기화의 핵심 규칙:
1. **완성은 단조(monotonic)** — 한 번 완성된 퍼즐은 다시 미완성으로 되돌아가지 않는다.
2. 둘 다 완성 또는 둘 다 미완성이면 `updatedAt`이 더 최신인 쪽이 이긴다(last-write-wins). 동률이면 local 우선.

**Files:**
- Create: `src/lib/sync-merge.ts`
- Test: `tests/sync-merge.test.ts`

- [ ] **Step 1: 실패하는 테스트 작성**

Create `tests/sync-merge.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { mergeProgress } from '../src/lib/sync-merge.ts';
import type { ProgressRecord } from '../src/types.ts';

function rec(overrides: Partial<ProgressRecord> = {}): ProgressRecord {
  return {
    paintingId: 'starry-night',
    difficulty: '100',
    placedPieceIds: [0, 1],
    isCompleted: false,
    completedAt: null,
    updatedAt: '2026-10-13T10:00:00.000Z',
    ...overrides,
  };
}

describe('mergeProgress', () => {
  it('returns local when server record is null', () => {
    const local = rec();
    expect(mergeProgress(local, null)).toBe(local);
  });

  it('when neither completed, newer updatedAt wins', () => {
    const local = rec({ updatedAt: '2026-10-13T12:00:00.000Z', placedPieceIds: [0, 1, 2] });
    const server = rec({ updatedAt: '2026-10-13T09:00:00.000Z', placedPieceIds: [0] });
    expect(mergeProgress(local, server)).toBe(local);
  });

  it('when neither completed, older local loses to newer server', () => {
    const local = rec({ updatedAt: '2026-10-13T08:00:00.000Z' });
    const server = rec({ updatedAt: '2026-10-13T09:00:00.000Z' });
    expect(mergeProgress(local, server)).toBe(server);
  });

  it('on equal updatedAt, local wins', () => {
    const local = rec({ updatedAt: '2026-10-13T10:00:00.000Z' });
    const server = rec({ updatedAt: '2026-10-13T10:00:00.000Z' });
    expect(mergeProgress(local, server)).toBe(local);
  });

  it('completed local beats not-completed server even if server is newer', () => {
    const local = rec({ isCompleted: true, completedAt: '2026-10-13T08:00:00.000Z', updatedAt: '2026-10-13T08:00:00.000Z' });
    const server = rec({ isCompleted: false, updatedAt: '2026-10-13T20:00:00.000Z' });
    expect(mergeProgress(local, server)).toBe(local);
  });

  it('completed server beats not-completed local even if local is newer', () => {
    const local = rec({ isCompleted: false, updatedAt: '2026-10-13T20:00:00.000Z' });
    const server = rec({ isCompleted: true, completedAt: '2026-10-13T08:00:00.000Z', updatedAt: '2026-10-13T08:00:00.000Z' });
    expect(mergeProgress(local, server)).toBe(server);
  });

  it('when both completed, newer updatedAt wins', () => {
    const local = rec({ isCompleted: true, completedAt: '2026-10-13T08:00:00.000Z', updatedAt: '2026-10-13T08:00:00.000Z' });
    const server = rec({ isCompleted: true, completedAt: '2026-10-13T09:00:00.000Z', updatedAt: '2026-10-13T09:00:00.000Z' });
    expect(mergeProgress(local, server)).toBe(server);
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npm test -- tests/sync-merge.test.ts`
Expected: FAIL — `Cannot find module '../src/lib/sync-merge.ts'`

- [ ] **Step 3: 최소 구현 작성**

Create `src/lib/sync-merge.ts`:

```typescript
import type { ProgressRecord } from '../types.ts';

/**
 * 같은 (painting, difficulty)에 대한 로컬/서버 진행상황을 병합한다.
 * 규칙: (1) 완성은 단조 — 완성 레코드가 미완성 레코드를 항상 이긴다.
 *       (2) 완성 상태가 같으면 updatedAt 최신이 이기고, 동률이면 local 우선.
 */
export function mergeProgress(
  local: ProgressRecord,
  server: ProgressRecord | null,
): ProgressRecord {
  if (!server) return local;

  if (local.isCompleted && !server.isCompleted) return local;
  if (server.isCompleted && !local.isCompleted) return server;

  const localTime = new Date(local.updatedAt).getTime();
  const serverTime = new Date(server.updatedAt).getTime();
  return localTime >= serverTime ? local : server;
}
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `npm test -- tests/sync-merge.test.ts`
Expected: PASS (7 passed)

- [ ] **Step 5: Commit**

```bash
git add src/lib/sync-merge.ts tests/sync-merge.test.ts
git commit -m "feat: add progress merge logic (monotonic completion + last-write-wins)"
```

---

## Task 4: SQL 파일 실행 헬퍼

Neon http 드라이버는 한 쿼리에 여러 SQL 문을 지원하지 않으므로, 마이그레이션/시드 SQL을 문 단위로 분리해 순서대로 실행하는 헬퍼를 만든다.

**Files:**
- Create: `src/lib/sql-file.ts`
- Test: `tests/sql-file.test.ts`

- [ ] **Step 1: 실패하는 테스트 작성**

Create `tests/sql-file.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { splitStatements, applySqlFile } from '../src/lib/sql-file.ts';
import type { QueryExecutor } from '../src/lib/db.ts';

describe('splitStatements', () => {
  it('splits on semicolons and trims', () => {
    expect(splitStatements('SELECT 1; SELECT 2;')).toEqual(['SELECT 1', 'SELECT 2']);
  });

  it('drops empty trailing statements', () => {
    expect(splitStatements('SELECT 1;\n\n')).toEqual(['SELECT 1']);
  });

  it('strips full-line comments', () => {
    const sql = `-- a comment\nSELECT 1;\n-- another\nSELECT 2;`;
    expect(splitStatements(sql)).toEqual(['SELECT 1', 'SELECT 2']);
  });
});

describe('applySqlFile', () => {
  it('runs each statement in order against the executor', async () => {
    const seen: string[] = [];
    const db: QueryExecutor = {
      async query<T>(text: string): Promise<T[]> {
        seen.push(text);
        return [] as T[];
      },
    };
    await applySqlFile(db, 'SELECT 1; SELECT 2;');
    expect(seen).toEqual(['SELECT 1', 'SELECT 2']);
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npm test -- tests/sql-file.test.ts`
Expected: FAIL — `Cannot find module '../src/lib/sql-file.ts'` (또는 `db.ts` 미존재)

- [ ] **Step 3: 구현 작성 (db.ts 선행 생성)**

Create `src/lib/db.ts`:

```typescript
import { neon } from '@neondatabase/serverless';

/** 모든 DB 접근이 통과하는 최소 인터페이스. rows 배열을 직접 반환한다. */
export interface QueryExecutor {
  query<T = Record<string, unknown>>(text: string, params?: unknown[]): Promise<T[]>;
}

/** 프로덕션용: Neon serverless(http) 드라이버. sql.query는 rows 배열을 반환한다. */
export function createNeonExecutor(connectionString: string): QueryExecutor {
  const sql = neon(connectionString);
  return {
    async query<T>(text: string, params: unknown[] = []): Promise<T[]> {
      return (await sql.query(text, params)) as T[];
    },
  };
}
```

Create `src/lib/sql-file.ts`:

```typescript
import type { QueryExecutor } from './db.ts';

/**
 * SQL 문자열을 문 단위로 분리한다.
 * 전제: 통제된 내부 SQL(문자열 리터럴 안에 세미콜론 없음)에만 사용한다.
 * 전체 줄 주석(`--`로 시작)은 제거한다.
 */
export function splitStatements(sql: string): string[] {
  const withoutComments = sql
    .split('\n')
    .filter((line) => !line.trim().startsWith('--'))
    .join('\n');
  return withoutComments
    .split(';')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

/** SQL 파일 내용을 문 단위로 분리해 순서대로 실행한다. */
export async function applySqlFile(db: QueryExecutor, sql: string): Promise<void> {
  for (const stmt of splitStatements(sql)) {
    await db.query(stmt);
  }
}
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `npm test -- tests/sql-file.test.ts`
Expected: PASS (4 passed)

- [ ] **Step 5: Commit**

```bash
git add src/lib/db.ts src/lib/sql-file.ts tests/sql-file.test.ts
git commit -m "feat: add query executor interface and sql-file statement runner"
```

---

## Task 5: 마이그레이션 + PGlite 테스트 하네스

**Files:**
- Create: `src/migrations/001_init.sql`
- Create: `src/scripts/migrate.ts`
- Create: `src/test/pglite-executor.ts`
- Test: `tests/migrate.test.ts`

- [ ] **Step 1: 마이그레이션 SQL 작성**

Create `src/migrations/001_init.sql`:

```sql
CREATE TABLE IF NOT EXISTS painters (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  birth_year INT,
  death_year INT,
  bio_short TEXT
);

CREATE TABLE IF NOT EXISTS paintings (
  id TEXT PRIMARY KEY,
  painter_id TEXT NOT NULL REFERENCES painters(id),
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  style_tag TEXT,
  docent_story TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS painting_difficulties (
  painting_id TEXT NOT NULL REFERENCES paintings(id),
  level TEXT NOT NULL CHECK (level IN ('25', '100', '400')),
  grid_cols INT NOT NULL,
  grid_rows INT NOT NULL,
  PRIMARY KEY (painting_id, level)
);

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  display_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_synced_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS user_progress (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  painting_id TEXT NOT NULL REFERENCES paintings(id),
  difficulty TEXT NOT NULL CHECK (difficulty IN ('25', '100', '400')),
  placed_piece_ids JSONB NOT NULL DEFAULT '[]',
  is_completed BOOLEAN NOT NULL DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, painting_id, difficulty)
);

CREATE TABLE IF NOT EXISTS user_gallery (
  user_id TEXT PRIMARY KEY REFERENCES users(id),
  unlocked_rooms TEXT[] NOT NULL DEFAULT '{}',
  wallpaper_style TEXT,
  frame_style TEXT
);

CREATE TABLE IF NOT EXISTS packs (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price_display TEXT,
  revenuecat_product_id TEXT,
  painting_ids TEXT[] NOT NULL DEFAULT '{}'
);
```

> 스펙의 ENUM은 양쪽(Neon·PGlite) 호환과 단순 진화를 위해 `TEXT + CHECK` 제약으로 구현했다. 동작은 동일하다.

- [ ] **Step 2: 마이그레이션 러너 작성**

Create `src/scripts/migrate.ts`:

```typescript
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { createNeonExecutor } from '../lib/db.ts';
import { applySqlFile } from '../lib/sql-file.ts';

const here = dirname(fileURLToPath(import.meta.url));

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL is not set');
  const db = createNeonExecutor(url);
  const sql = readFileSync(join(here, '..', 'migrations', '001_init.sql'), 'utf8');
  await applySqlFile(db, sql);
  console.log('Migration 001_init applied.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

- [ ] **Step 3: PGlite 테스트 하네스 작성**

Create `src/test/pglite-executor.ts`:

```typescript
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { PGlite } from '@electric-sql/pglite';
import type { QueryExecutor } from '../lib/db.ts';
import { applySqlFile } from '../lib/sql-file.ts';

const here = dirname(fileURLToPath(import.meta.url));

export interface TestDb extends QueryExecutor {
  close(): Promise<void>;
}

/** 인프로세스 Postgres(PGlite)로 QueryExecutor를 만들고 초기 스키마를 적용한다. */
export async function createTestDb(): Promise<TestDb> {
  const pg = new PGlite();
  const db: QueryExecutor = {
    async query<T>(text: string, params: unknown[] = []): Promise<T[]> {
      const res = await pg.query<T>(text, params);
      return res.rows;
    },
  };
  const initSql = readFileSync(join(here, '..', 'migrations', '001_init.sql'), 'utf8');
  await applySqlFile(db, initSql);
  return {
    query: db.query,
    async close() {
      await pg.close();
    },
  };
}
```

- [ ] **Step 4: 마이그레이션 테스트 작성**

Create `tests/migrate.test.ts`:

```typescript
import { describe, it, expect, afterEach } from 'vitest';
import { createTestDb, type TestDb } from '../src/test/pglite-executor.ts';

let db: TestDb;
afterEach(async () => {
  await db?.close();
});

describe('migration 001_init', () => {
  it('creates all expected tables', async () => {
    db = await createTestDb();
    const rows = await db.query<{ table_name: string }>(
      `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`,
    );
    const names = rows.map((r) => r.table_name).sort();
    expect(names).toEqual(
      ['packs', 'painters', 'painting_difficulties', 'paintings', 'user_gallery', 'user_progress', 'users'].sort(),
    );
  });

  it('enforces the difficulty CHECK constraint', async () => {
    db = await createTestDb();
    await db.query(`INSERT INTO painters (id, name) VALUES ('vangogh', 'Vincent van Gogh')`);
    await db.query(
      `INSERT INTO paintings (id, painter_id, title, image_url, thumbnail_url) VALUES ('sn', 'vangogh', 'Starry Night', 'u', 't')`,
    );
    await expect(
      db.query(
        `INSERT INTO painting_difficulties (painting_id, level, grid_cols, grid_rows) VALUES ('sn', '50', 5, 10)`,
      ),
    ).rejects.toThrow();
  });
});
```

- [ ] **Step 5: 테스트 통과 확인**

Run: `npm test -- tests/migrate.test.ts`
Expected: PASS (2 passed). PGlite import 에러가 나면 `npm install`로 `@electric-sql/pglite`가 설치됐는지 확인한다.

- [ ] **Step 6: Commit**

```bash
git add src/migrations/001_init.sql src/scripts/migrate.ts src/test/pglite-executor.ts tests/migrate.test.ts
git commit -m "feat: add schema migration and pglite test harness"
```

---

## Task 6: Repositories (데이터 접근)

**Files:**
- Create: `src/repositories/paintings.ts`
- Create: `src/repositories/packs.ts`
- Create: `src/repositories/progress.ts`
- Test: `tests/repositories.test.ts`

- [ ] **Step 1: 실패하는 테스트 작성**

Create `tests/repositories.test.ts`:

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createTestDb, type TestDb } from '../src/test/pglite-executor.ts';
import { getAllPaintings } from '../src/repositories/paintings.ts';
import { getAllPacks } from '../src/repositories/packs.ts';
import { getProgressForUser, upsertProgress, syncProgress } from '../src/repositories/progress.ts';
import type { ProgressRecord } from '../src/types.ts';

let db: TestDb;

async function seedPainting() {
  await db.query(`INSERT INTO painters (id, name, birth_year, death_year) VALUES ('vangogh', 'Vincent van Gogh', 1853, 1890)`);
  await db.query(`INSERT INTO paintings (id, painter_id, title, image_url, thumbnail_url, style_tag, docent_story, is_featured)
                  VALUES ('starry-night', 'vangogh', 'The Starry Night', 'img', 'thumb', 'post-impressionism', 'a story', TRUE)`);
  await db.query(`INSERT INTO painting_difficulties (painting_id, level, grid_cols, grid_rows) VALUES
                  ('starry-night', '25', 5, 5), ('starry-night', '100', 10, 10)`);
}

beforeEach(async () => {
  db = await createTestDb();
});
afterEach(async () => {
  await db.close();
});

describe('getAllPaintings', () => {
  it('returns paintings with nested painter and difficulties', async () => {
    await seedPainting();
    const paintings = await getAllPaintings(db);
    expect(paintings).toHaveLength(1);
    const p = paintings[0];
    expect(p.id).toBe('starry-night');
    expect(p.painter.name).toBe('Vincent van Gogh');
    expect(p.isFeatured).toBe(true);
    expect(p.difficulties.map((d) => d.level).sort()).toEqual(['100', '25']);
    expect(p.difficulties.find((d) => d.level === '25')).toMatchObject({ gridCols: 5, gridRows: 5 });
  });

  it('returns an empty array when no paintings', async () => {
    expect(await getAllPaintings(db)).toEqual([]);
  });
});

describe('getAllPacks', () => {
  it('returns packs with painting ids', async () => {
    await db.query(`INSERT INTO packs (id, name, description, price_display, revenuecat_product_id, painting_ids)
                    VALUES ('impressionism', 'Impressionism Masters', 'desc', '$3.99', 'rc_impr', ARRAY['starry-night'])`);
    const packs = await getAllPacks(db);
    expect(packs).toHaveLength(1);
    expect(packs[0]).toMatchObject({ id: 'impressionism', name: 'Impressionism Masters', paintingIds: ['starry-night'] });
  });
});

describe('progress repository', () => {
  const userId = 'user_123';
  function rec(overrides: Partial<ProgressRecord> = {}): ProgressRecord {
    return {
      paintingId: 'starry-night',
      difficulty: '100',
      placedPieceIds: [0, 1, 2],
      isCompleted: false,
      completedAt: null,
      updatedAt: '2026-10-13T10:00:00.000Z',
      ...overrides,
    };
  }

  it('upsertProgress inserts then updates the same row', async () => {
    await seedPainting();
    await upsertProgress(db, userId, rec());
    let all = await getProgressForUser(db, userId);
    expect(all).toHaveLength(1);
    expect(all[0].placedPieceIds).toEqual([0, 1, 2]);

    await upsertProgress(db, userId, rec({ placedPieceIds: [0, 1, 2, 3], updatedAt: '2026-10-13T11:00:00.000Z' }));
    all = await getProgressForUser(db, userId);
    expect(all).toHaveLength(1);
    expect(all[0].placedPieceIds).toEqual([0, 1, 2, 3]);
  });

  it('getProgressForUser returns records in ProgressRecord shape', async () => {
    await seedPainting();
    await upsertProgress(db, userId, rec({ isCompleted: true, completedAt: '2026-10-13T10:00:00.000Z' }));
    const all = await getProgressForUser(db, userId);
    expect(all[0]).toMatchObject({
      paintingId: 'starry-night',
      difficulty: '100',
      isCompleted: true,
    });
    expect(typeof all[0].updatedAt).toBe('string');
  });

  it('syncProgress merges incoming records against server (completion is monotonic)', async () => {
    await seedPainting();
    // 서버에는 완성본이 이미 있음
    await upsertProgress(db, userId, rec({ isCompleted: true, completedAt: '2026-10-13T09:00:00.000Z', updatedAt: '2026-10-13T09:00:00.000Z' }));
    // 클라이언트가 더 최신 timestamp의 미완성본을 올림 → 완성이 유지돼야 함
    const merged = await syncProgress(db, userId, [rec({ isCompleted: false, updatedAt: '2026-10-13T20:00:00.000Z' })]);
    const target = merged.find((m) => m.paintingId === 'starry-night' && m.difficulty === '100');
    expect(target?.isCompleted).toBe(true);

    const persisted = await getProgressForUser(db, userId);
    expect(persisted.find((p) => p.difficulty === '100')?.isCompleted).toBe(true);
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npm test -- tests/repositories.test.ts`
Expected: FAIL — repository 모듈들을 찾을 수 없음

- [ ] **Step 3: paintings repository 구현**

Create `src/repositories/paintings.ts`:

```typescript
import type { QueryExecutor } from '../lib/db.ts';
import type { Painting, Difficulty } from '../types.ts';

interface PaintingRow {
  id: string;
  painter_id: string;
  painter_name: string;
  birth_year: number | null;
  death_year: number | null;
  title: string;
  image_url: string;
  thumbnail_url: string;
  style_tag: string | null;
  docent_story: string | null;
  is_featured: boolean;
}

interface DifficultyRow {
  painting_id: string;
  level: Difficulty;
  grid_cols: number;
  grid_rows: number;
}

export async function getAllPaintings(db: QueryExecutor): Promise<Painting[]> {
  const paintingRows = await db.query<PaintingRow>(
    `SELECT p.id, p.painter_id, pr.name AS painter_name, pr.birth_year, pr.death_year,
            p.title, p.image_url, p.thumbnail_url, p.style_tag, p.docent_story, p.is_featured
     FROM paintings p
     JOIN painters pr ON pr.id = p.painter_id
     ORDER BY p.id`,
  );
  const difficultyRows = await db.query<DifficultyRow>(
    `SELECT painting_id, level, grid_cols, grid_rows FROM painting_difficulties`,
  );

  const byPainting = new Map<string, DifficultyRow[]>();
  for (const d of difficultyRows) {
    const list = byPainting.get(d.painting_id) ?? [];
    list.push(d);
    byPainting.set(d.painting_id, list);
  }

  return paintingRows.map((r) => ({
    id: r.id,
    painter: { id: r.painter_id, name: r.painter_name, birthYear: r.birth_year, deathYear: r.death_year },
    title: r.title,
    imageUrl: r.image_url,
    thumbnailUrl: r.thumbnail_url,
    styleTag: r.style_tag,
    docentStory: r.docent_story,
    isFeatured: r.is_featured,
    difficulties: (byPainting.get(r.id) ?? []).map((d) => ({
      level: d.level,
      gridCols: d.grid_cols,
      gridRows: d.grid_rows,
    })),
  }));
}
```

- [ ] **Step 4: packs repository 구현**

Create `src/repositories/packs.ts`:

```typescript
import type { QueryExecutor } from '../lib/db.ts';
import type { Pack } from '../types.ts';

interface PackRow {
  id: string;
  name: string;
  description: string | null;
  price_display: string | null;
  revenuecat_product_id: string | null;
  painting_ids: string[];
}

export async function getAllPacks(db: QueryExecutor): Promise<Pack[]> {
  const rows = await db.query<PackRow>(
    `SELECT id, name, description, price_display, revenuecat_product_id, painting_ids FROM packs ORDER BY id`,
  );
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    description: r.description,
    priceDisplay: r.price_display,
    revenuecatProductId: r.revenuecat_product_id,
    paintingIds: r.painting_ids ?? [],
  }));
}
```

- [ ] **Step 5: progress repository 구현**

Create `src/repositories/progress.ts`:

```typescript
import type { QueryExecutor } from '../lib/db.ts';
import type { ProgressRecord, Difficulty } from '../types.ts';
import { mergeProgress } from '../lib/sync-merge.ts';

interface ProgressRow {
  painting_id: string;
  difficulty: Difficulty;
  placed_piece_ids: number[] | string;
  is_completed: boolean;
  completed_at: Date | string | null;
  updated_at: Date | string;
}

function toIso(value: Date | string | null): string | null {
  if (value === null) return null;
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}

function rowToRecord(r: ProgressRow): ProgressRecord {
  const pieces = typeof r.placed_piece_ids === 'string' ? JSON.parse(r.placed_piece_ids) : r.placed_piece_ids;
  return {
    paintingId: r.painting_id,
    difficulty: r.difficulty,
    placedPieceIds: pieces ?? [],
    isCompleted: r.is_completed,
    completedAt: toIso(r.completed_at),
    updatedAt: toIso(r.updated_at) as string,
  };
}

/** user_progress FK를 위해 users 행이 존재하도록 보장한다. */
async function ensureUser(db: QueryExecutor, userId: string): Promise<void> {
  await db.query(`INSERT INTO users (id) VALUES ($1) ON CONFLICT (id) DO NOTHING`, [userId]);
}

export async function getProgressForUser(db: QueryExecutor, userId: string): Promise<ProgressRecord[]> {
  const rows = await db.query<ProgressRow>(
    `SELECT painting_id, difficulty, placed_piece_ids, is_completed, completed_at, updated_at
     FROM user_progress WHERE user_id = $1`,
    [userId],
  );
  return rows.map(rowToRecord);
}

export async function upsertProgress(db: QueryExecutor, userId: string, record: ProgressRecord): Promise<void> {
  await ensureUser(db, userId);
  await db.query(
    `INSERT INTO user_progress (user_id, painting_id, difficulty, placed_piece_ids, is_completed, completed_at, updated_at)
     VALUES ($1, $2, $3, $4::jsonb, $5, $6, $7)
     ON CONFLICT (user_id, painting_id, difficulty)
     DO UPDATE SET placed_piece_ids = EXCLUDED.placed_piece_ids,
                   is_completed = EXCLUDED.is_completed,
                   completed_at = EXCLUDED.completed_at,
                   updated_at = EXCLUDED.updated_at`,
    [
      userId,
      record.paintingId,
      record.difficulty,
      JSON.stringify(record.placedPieceIds),
      record.isCompleted,
      record.completedAt,
      record.updatedAt,
    ],
  );
}

/**
 * 클라이언트가 올린 레코드들을 서버 상태와 병합(mergeProgress)하여 저장하고,
 * 병합 후 유저의 전체 진행상황을 반환한다.
 */
export async function syncProgress(
  db: QueryExecutor,
  userId: string,
  incoming: ProgressRecord[],
): Promise<ProgressRecord[]> {
  await ensureUser(db, userId);
  const existing = await getProgressForUser(db, userId);
  const serverByKey = new Map<string, ProgressRecord>();
  for (const r of existing) serverByKey.set(`${r.paintingId}:${r.difficulty}`, r);

  for (const local of incoming) {
    const key = `${local.paintingId}:${local.difficulty}`;
    const winner = mergeProgress(local, serverByKey.get(key) ?? null);
    await upsertProgress(db, userId, winner);
  }

  await db.query(`UPDATE users SET last_synced_at = NOW() WHERE id = $1`, [userId]);
  return getProgressForUser(db, userId);
}
```

- [ ] **Step 6: 테스트 통과 확인**

Run: `npm test -- tests/repositories.test.ts`
Expected: PASS (6 passed)

- [ ] **Step 7: Commit**

```bash
git add src/repositories tests/repositories.test.ts
git commit -m "feat: add paintings, packs, and progress repositories"
```

---

## Task 7: 인증 (Bearer 토큰 추출 + Clerk 검증)

**Files:**
- Create: `src/lib/auth.ts`
- Test: `tests/auth.test.ts`

- [ ] **Step 1: 실패하는 테스트 작성 (순수 추출 함수 대상)**

Create `tests/auth.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { getBearerToken } from '../src/lib/auth.ts';

describe('getBearerToken', () => {
  it('extracts the token from a Bearer header', () => {
    const req = new Request('https://x.test/api/progress', {
      headers: { authorization: 'Bearer abc.def.ghi' },
    });
    expect(getBearerToken(req)).toBe('abc.def.ghi');
  });

  it('returns null when no authorization header', () => {
    const req = new Request('https://x.test/api/progress');
    expect(getBearerToken(req)).toBeNull();
  });

  it('returns null for a non-Bearer scheme', () => {
    const req = new Request('https://x.test/api/progress', {
      headers: { authorization: 'Basic abc' },
    });
    expect(getBearerToken(req)).toBeNull();
  });
});
```

- [ ] **Step 2: 테스트 실패 확인**

Run: `npm test -- tests/auth.test.ts`
Expected: FAIL — `Cannot find module '../src/lib/auth.ts'`

- [ ] **Step 3: 구현 작성**

Create `src/lib/auth.ts`:

```typescript
import { verifyToken } from '@clerk/backend';

/** Authorization: Bearer <token> 헤더에서 토큰만 추출한다. 순수 함수. */
export function getBearerToken(request: Request): string | null {
  const header = request.headers.get('authorization');
  if (!header) return null;
  const match = /^Bearer\s+(.+)$/.exec(header);
  return match ? match[1] : null;
}

/** Clerk 세션 토큰을 검증하고 user id(sub)를 반환한다. 실패 시 null. */
export async function verifyClerkToken(token: string): Promise<string | null> {
  const secretKey = process.env.CLERK_SECRET_KEY;
  if (!secretKey) return null;
  try {
    const claims = await verifyToken(token, { secretKey });
    return claims.sub ?? null;
  } catch {
    return null;
  }
}

/** 요청에서 인증된 user id를 뽑아낸다. 없거나 검증 실패면 null. */
export async function getUserIdFromRequest(request: Request): Promise<string | null> {
  const token = getBearerToken(request);
  if (!token) return null;
  return verifyClerkToken(token);
}
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `npm test -- tests/auth.test.ts`
Expected: PASS (3 passed)

> `verifyClerkToken`/`getUserIdFromRequest`는 Clerk 네트워크 검증이 필요하므로 유닛 테스트에서 직접 호출하지 않는다. 핸들러 테스트(Task 8)에서는 `Deps.getUserId`를 스텁으로 주입해 우회한다. `@clerk/backend`의 `verifyToken` 시그니처가 버전에 따라 다를 수 있으니, 구현 후 `npm run typecheck`로 확인한다.

- [ ] **Step 5: Commit**

```bash
git add src/lib/auth.ts tests/auth.test.ts
git commit -m "feat: add bearer token extraction and clerk verification"
```

---

## Task 8: 핸들러 (코어 + Vercel 어댑터)

핸들러는 두 겹이다: `src/handlers/*`(DI 받는 테스트 가능 코어)와 `api/*`(프로덕션 Deps 주입 어댑터). 먼저 Deps 조립부를 만든다.

**Files:**
- Create: `src/lib/deps.ts`
- Create: `src/handlers/paintings.ts`, `src/handlers/packs.ts`, `src/handlers/progress.ts`, `src/handlers/sync.ts`
- Create: `api/health.ts`, `api/paintings.ts`, `api/packs.ts`, `api/progress.ts`, `api/sync.ts`
- Test: `tests/handlers.test.ts`

- [ ] **Step 1: Deps 조립부 작성**

Create `src/lib/deps.ts`:

```typescript
import { createNeonExecutor, type QueryExecutor } from './db.ts';
import { getUserIdFromRequest } from './auth.ts';

export interface Deps {
  db: QueryExecutor;
  getUserId: (request: Request) => Promise<string | null>;
}

let cached: Deps | null = null;

/** 프로덕션 Deps. 요청 간 재사용(Fluid Compute 인스턴스 재활용)을 위해 캐시한다. */
export function productionDeps(): Deps {
  if (cached) return cached;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL is not set');
  cached = {
    db: createNeonExecutor(url),
    getUserId: getUserIdFromRequest,
  };
  return cached;
}
```

- [ ] **Step 2: 실패하는 핸들러 테스트 작성**

Create `tests/handlers.test.ts`:

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createTestDb, type TestDb } from '../src/test/pglite-executor.ts';
import { handleGetPaintings } from '../src/handlers/paintings.ts';
import { handleGetPacks } from '../src/handlers/packs.ts';
import { handleGetProgress, handlePutProgress } from '../src/handlers/progress.ts';
import { handleSync } from '../src/handlers/sync.ts';
import type { Deps } from '../src/lib/deps.ts';

let db: TestDb;

function depsWithUser(userId: string | null): Deps {
  return { db, getUserId: async () => userId };
}

async function readJson(res: Response) {
  return JSON.parse(await res.text());
}

async function seedPainting() {
  await db.query(`INSERT INTO painters (id, name) VALUES ('vangogh', 'Vincent van Gogh')`);
  await db.query(`INSERT INTO paintings (id, painter_id, title, image_url, thumbnail_url) VALUES ('starry-night', 'vangogh', 'Starry Night', 'img', 'thumb')`);
  await db.query(`INSERT INTO painting_difficulties (painting_id, level, grid_cols, grid_rows) VALUES ('starry-night', '100', 10, 10)`);
}

beforeEach(async () => {
  db = await createTestDb();
});
afterEach(async () => {
  await db.close();
});

describe('GET /paintings', () => {
  it('returns 200 with paintings array (public, no auth)', async () => {
    await seedPainting();
    const res = await handleGetPaintings(new Request('https://x.test/api/paintings'), depsWithUser(null));
    expect(res.status).toBe(200);
    const body = await readJson(res);
    expect(body.success).toBe(true);
    expect(body.paintings).toHaveLength(1);
  });
});

describe('GET /packs', () => {
  it('returns 200 with packs array', async () => {
    const res = await handleGetPacks(new Request('https://x.test/api/packs'), depsWithUser(null));
    expect(res.status).toBe(200);
    expect((await readJson(res)).packs).toEqual([]);
  });
});

describe('GET /progress', () => {
  it('returns 401 when unauthenticated', async () => {
    const res = await handleGetProgress(new Request('https://x.test/api/progress'), depsWithUser(null));
    expect(res.status).toBe(401);
  });

  it('returns the user progress when authenticated', async () => {
    await seedPainting();
    const res = await handleGetProgress(new Request('https://x.test/api/progress'), depsWithUser('user_1'));
    expect(res.status).toBe(200);
    expect((await readJson(res)).progress).toEqual([]);
  });
});

describe('PUT /progress', () => {
  const validBody = JSON.stringify({
    paintingId: 'starry-night',
    difficulty: '100',
    placedPieceIds: [0, 1],
    isCompleted: false,
    completedAt: null,
    updatedAt: '2026-10-13T10:00:00.000Z',
  });

  it('returns 401 when unauthenticated', async () => {
    const req = new Request('https://x.test/api/progress', { method: 'PUT', body: validBody });
    const res = await handlePutProgress(req, depsWithUser(null));
    expect(res.status).toBe(401);
  });

  it('returns 400 on invalid body', async () => {
    await seedPainting();
    const req = new Request('https://x.test/api/progress', { method: 'PUT', body: JSON.stringify({ difficulty: '100' }) });
    const res = await handlePutProgress(req, depsWithUser('user_1'));
    expect(res.status).toBe(400);
  });

  it('upserts and returns 200 on valid body', async () => {
    await seedPainting();
    const req = new Request('https://x.test/api/progress', { method: 'PUT', body: validBody });
    const res = await handlePutProgress(req, depsWithUser('user_1'));
    expect(res.status).toBe(200);
    expect((await readJson(res)).success).toBe(true);
  });
});

describe('POST /sync', () => {
  it('returns 401 when unauthenticated', async () => {
    const req = new Request('https://x.test/api/sync', { method: 'POST', body: JSON.stringify({ records: [] }) });
    const res = await handleSync(req, depsWithUser(null));
    expect(res.status).toBe(401);
  });

  it('merges records and returns the full progress set', async () => {
    await seedPainting();
    const body = JSON.stringify({
      records: [{
        paintingId: 'starry-night', difficulty: '100', placedPieceIds: [0, 1, 2],
        isCompleted: true, completedAt: '2026-10-13T10:00:00.000Z', updatedAt: '2026-10-13T10:00:00.000Z',
      }],
    });
    const req = new Request('https://x.test/api/sync', { method: 'POST', body });
    const res = await handleSync(req, depsWithUser('user_1'));
    expect(res.status).toBe(200);
    const out = await readJson(res);
    expect(out.progress.find((p: { difficulty: string }) => p.difficulty === '100').isCompleted).toBe(true);
  });
});
```

- [ ] **Step 3: 테스트 실패 확인**

Run: `npm test -- tests/handlers.test.ts`
Expected: FAIL — handler 모듈들을 찾을 수 없음

- [ ] **Step 4: paintings / packs 코어 핸들러 구현**

Create `src/handlers/paintings.ts`:

```typescript
import type { Deps } from '../lib/deps.ts';
import { getAllPaintings } from '../repositories/paintings.ts';
import { ok, serverError } from '../lib/http.ts';

export async function handleGetPaintings(_request: Request, deps: Deps): Promise<Response> {
  try {
    const paintings = await getAllPaintings(deps.db);
    return ok({ paintings });
  } catch (err) {
    return serverError(err instanceof Error ? err.message : 'unknown error');
  }
}
```

Create `src/handlers/packs.ts`:

```typescript
import type { Deps } from '../lib/deps.ts';
import { getAllPacks } from '../repositories/packs.ts';
import { ok, serverError } from '../lib/http.ts';

export async function handleGetPacks(_request: Request, deps: Deps): Promise<Response> {
  try {
    const packs = await getAllPacks(deps.db);
    return ok({ packs });
  } catch (err) {
    return serverError(err instanceof Error ? err.message : 'unknown error');
  }
}
```

- [ ] **Step 5: progress 코어 핸들러 구현**

Create `src/handlers/progress.ts`:

```typescript
import type { Deps } from '../lib/deps.ts';
import { getProgressForUser, upsertProgress } from '../repositories/progress.ts';
import { progressRecordSchema } from '../lib/validation.ts';
import { ok, badRequest, unauthorized, serverError } from '../lib/http.ts';

export async function handleGetProgress(request: Request, deps: Deps): Promise<Response> {
  const userId = await deps.getUserId(request);
  if (!userId) return unauthorized();
  try {
    const progress = await getProgressForUser(deps.db, userId);
    return ok({ progress });
  } catch (err) {
    return serverError(err instanceof Error ? err.message : 'unknown error');
  }
}

export async function handlePutProgress(request: Request, deps: Deps): Promise<Response> {
  const userId = await deps.getUserId(request);
  if (!userId) return unauthorized();

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return badRequest('Invalid JSON');
  }

  const parsed = progressRecordSchema.safeParse(raw);
  if (!parsed.success) return badRequest(parsed.error.issues[0]?.message ?? 'Invalid body');

  try {
    await upsertProgress(deps.db, userId, parsed.data);
    return ok({});
  } catch (err) {
    return serverError(err instanceof Error ? err.message : 'unknown error');
  }
}
```

- [ ] **Step 6: sync 코어 핸들러 구현**

Create `src/handlers/sync.ts`:

```typescript
import type { Deps } from '../lib/deps.ts';
import { syncProgress } from '../repositories/progress.ts';
import { syncBodySchema } from '../lib/validation.ts';
import { ok, badRequest, unauthorized, serverError } from '../lib/http.ts';

export async function handleSync(request: Request, deps: Deps): Promise<Response> {
  const userId = await deps.getUserId(request);
  if (!userId) return unauthorized();

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return badRequest('Invalid JSON');
  }

  const parsed = syncBodySchema.safeParse(raw);
  if (!parsed.success) return badRequest(parsed.error.issues[0]?.message ?? 'Invalid body');

  try {
    const progress = await syncProgress(deps.db, userId, parsed.data.records);
    return ok({ progress });
  } catch (err) {
    return serverError(err instanceof Error ? err.message : 'unknown error');
  }
}
```

- [ ] **Step 7: 테스트 통과 확인**

Run: `npm test -- tests/handlers.test.ts`
Expected: PASS (9 passed)

- [ ] **Step 8: Vercel 어댑터 파일 작성**

Create `api/health.ts`:

```typescript
import { productionDeps } from '../src/lib/deps.ts';
import { ok, serverError } from '../src/lib/http.ts';

export async function GET(): Promise<Response> {
  try {
    const { db } = productionDeps();
    await db.query('SELECT 1');
    return ok({ status: 'ok', db: 'connected' });
  } catch (err) {
    return serverError(err instanceof Error ? err.message : 'db error');
  }
}
```

Create `api/paintings.ts`:

```typescript
import { handleGetPaintings } from '../src/handlers/paintings.ts';
import { productionDeps } from '../src/lib/deps.ts';

export async function GET(request: Request): Promise<Response> {
  return handleGetPaintings(request, productionDeps());
}
```

Create `api/packs.ts`:

```typescript
import { handleGetPacks } from '../src/handlers/packs.ts';
import { productionDeps } from '../src/lib/deps.ts';

export async function GET(request: Request): Promise<Response> {
  return handleGetPacks(request, productionDeps());
}
```

Create `api/progress.ts`:

```typescript
import { handleGetProgress, handlePutProgress } from '../src/handlers/progress.ts';
import { productionDeps } from '../src/lib/deps.ts';

export async function GET(request: Request): Promise<Response> {
  return handleGetProgress(request, productionDeps());
}

export async function PUT(request: Request): Promise<Response> {
  return handlePutProgress(request, productionDeps());
}
```

Create `api/sync.ts`:

```typescript
import { handleSync } from '../src/handlers/sync.ts';
import { productionDeps } from '../src/lib/deps.ts';

export async function POST(request: Request): Promise<Response> {
  return handleSync(request, productionDeps());
}
```

- [ ] **Step 9: 타입 체크**

Run: `npm run typecheck`
Expected: 에러 없음. (Clerk `verifyToken` 관련 타입 에러가 나면 설치된 `@clerk/backend` 버전 시그니처에 맞춰 `src/lib/auth.ts`를 조정.)

- [ ] **Step 10: Commit**

```bash
git add src/lib/deps.ts src/handlers api
git commit -m "feat: add testable core handlers and vercel adapters"
```

---

## Task 9: 시드 데이터 (개발용)

**Files:**
- Create: `src/migrations/seed.sql`
- Create: `src/scripts/seed.ts`
- Test: `tests/seed.test.ts`

- [ ] **Step 1: 시드 SQL 작성 (저작권 만료 명화 5점)**

Create `src/migrations/seed.sql`:

```sql
INSERT INTO painters (id, name, birth_year, death_year, bio_short) VALUES
  ('vangogh', 'Vincent van Gogh', 1853, 1890, '네덜란드 후기 인상주의 화가'),
  ('monet', 'Claude Monet', 1840, 1926, '프랑스 인상주의의 창시자'),
  ('vermeer', 'Johannes Vermeer', 1632, 1675, '네덜란드 황금기의 화가'),
  ('klimt', 'Gustav Klimt', 1862, 1918, '오스트리아 상징주의 화가'),
  ('seurat', 'Georges Seurat', 1859, 1891, '점묘법을 창시한 신인상주의 화가')
ON CONFLICT (id) DO NOTHING;

INSERT INTO paintings (id, painter_id, title, image_url, thumbnail_url, style_tag, docent_story, is_featured) VALUES
  ('starry-night', 'vangogh', '별이 빛나는 밤', 'https://example.com/starry-night.webp', 'https://example.com/starry-night-thumb.webp', 'post-impressionism', '생레미 요양원에서 그린 밤하늘.', TRUE),
  ('water-lilies', 'monet', '수련', 'https://example.com/water-lilies.webp', 'https://example.com/water-lilies-thumb.webp', 'impressionism', '지베르니 정원 연못 연작.', TRUE),
  ('girl-pearl-earring', 'vermeer', '진주 귀걸이를 한 소녀', 'https://example.com/pearl.webp', 'https://example.com/pearl-thumb.webp', 'baroque', '북구의 모나리자로 불린다.', TRUE),
  ('the-kiss', 'klimt', '키스', 'https://example.com/the-kiss.webp', 'https://example.com/the-kiss-thumb.webp', 'symbolism', '황금빛 시대의 대표작.', FALSE),
  ('la-grande-jatte', 'seurat', '그랑드 자트 섬의 일요일 오후', 'https://example.com/jatte.webp', 'https://example.com/jatte-thumb.webp', 'neo-impressionism', '수천 개의 점으로 완성한 그림.', FALSE)
ON CONFLICT (id) DO NOTHING;

INSERT INTO painting_difficulties (painting_id, level, grid_cols, grid_rows) VALUES
  ('starry-night', '25', 5, 5), ('starry-night', '100', 10, 10), ('starry-night', '400', 20, 20),
  ('water-lilies', '25', 5, 5), ('water-lilies', '100', 10, 10), ('water-lilies', '400', 20, 20),
  ('girl-pearl-earring', '25', 5, 5), ('girl-pearl-earring', '100', 10, 10), ('girl-pearl-earring', '400', 20, 20),
  ('the-kiss', '25', 5, 5), ('the-kiss', '100', 10, 10), ('the-kiss', '400', 20, 20),
  ('la-grande-jatte', '25', 5, 5), ('la-grande-jatte', '100', 10, 10), ('la-grande-jatte', '400', 20, 20)
ON CONFLICT (painting_id, level) DO NOTHING;

INSERT INTO packs (id, name, description, price_display, revenuecat_product_id, painting_ids) VALUES
  ('impressionism-masters', '인상주의 거장팩', '모네와 인상주의 거장들의 추가 명화', '$3.99', 'rc_impressionism_masters', ARRAY['water-lilies'])
ON CONFLICT (id) DO NOTHING;
```

> `image_url`은 임시 placeholder다. 실제 고화질 퍼블릭 도메인 이미지(메트로폴리탄 미술관, Artvee 등)로 교체하고 webp 최적화 후 호스팅 URL로 바꾼다.

- [ ] **Step 2: 시드 러너 작성**

Create `src/scripts/seed.ts`:

```typescript
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { createNeonExecutor } from '../lib/db.ts';
import { applySqlFile } from '../lib/sql-file.ts';

const here = dirname(fileURLToPath(import.meta.url));

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL is not set');
  const db = createNeonExecutor(url);
  await applySqlFile(db, readFileSync(join(here, '..', 'migrations', 'seed.sql'), 'utf8'));
  console.log('Seed data applied.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

- [ ] **Step 3: 시드 테스트 작성**

Create `tests/seed.test.ts`:

```typescript
import { describe, it, expect, afterEach } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createTestDb, type TestDb } from '../src/test/pglite-executor.ts';
import { applySqlFile } from '../src/lib/sql-file.ts';
import { getAllPaintings } from '../src/repositories/paintings.ts';
import { getAllPacks } from '../src/repositories/packs.ts';

let db: TestDb;
afterEach(async () => {
  await db?.close();
});

describe('seed.sql', () => {
  it('loads 5 paintings each with 3 difficulties and 1 pack', async () => {
    db = await createTestDb();
    await applySqlFile(db, readFileSync(join(process.cwd(), 'src/migrations/seed.sql'), 'utf8'));

    const paintings = await getAllPaintings(db);
    expect(paintings).toHaveLength(5);
    for (const p of paintings) {
      expect(p.difficulties.map((d) => d.level).sort()).toEqual(['100', '25', '400']);
    }

    const packs = await getAllPacks(db);
    expect(packs).toHaveLength(1);
    expect(packs[0].paintingIds).toContain('water-lilies');
  });
});
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `npm test -- tests/seed.test.ts`
Expected: PASS (1 passed)

- [ ] **Step 5: Commit**

```bash
git add src/migrations/seed.sql src/scripts/seed.ts tests/seed.test.ts
git commit -m "feat: add dev seed data for 5 public-domain paintings"
```

---

## Task 10: 전체 테스트 + 로컬 실행 문서

**Files:**
- Create: `README.md`

- [ ] **Step 1: 전체 테스트 실행**

Run: `npm test`
Expected: 모든 테스트 PASS (http, validation, sync-merge, sql-file, migrate, repositories, auth, handlers, seed)

- [ ] **Step 2: 타입 체크**

Run: `npm run typecheck`
Expected: 에러 없음

- [ ] **Step 3: README 작성**

Create `README.md`:

````markdown
# 명화 직소 퍼즐 — 백엔드 API

Vercel Functions + Neon Postgres. 콘텐츠 카탈로그와 유저 진행상황 동기화를 담당한다.
프론트엔드(Expo React Native)는 별도이며 이 API를 호출한다.

## 로컬 개발

1. 의존성 설치: `npm install`
2. Neon 프로젝트 생성 후 연결 문자열 확보. 개발용은 별도 브랜치 사용 권장.
3. `.env.example`을 `.env`로 복사하고 `DATABASE_URL`, `CLERK_SECRET_KEY` 채우기.
4. 스키마 적용: `npm run migrate`
5. 개발용 시드: `npm run seed`
6. 로컬 서버: `npm run dev` (Vercel CLI, 기본 http://localhost:3000)

## 테스트

`npm test` — 외부 DB 없이 인프로세스 Postgres(PGlite)로 전체 실행.

## 엔드포인트

| Method | Path | 인증 | 설명 |
| --- | --- | --- | --- |
| GET | /api/health | - | DB 연결 확인 |
| GET | /api/paintings | - | 콘텐츠 카탈로그 |
| GET | /api/packs | - | 확장팩 카탈로그 |
| GET | /api/progress | 필요 | 유저 진행상황 조회 |
| PUT | /api/progress | 필요 | 단일 진행상황 upsert |
| POST | /api/sync | 필요 | 로컬 진행상황 병합 업로드 |

인증: `Authorization: Bearer <Clerk 세션 토큰>`

## 배포

`vercel` (preview) / `vercel --prod`. 환경변수는 `vercel env add`로 등록.
프로덕션 마이그레이션은 프로덕션 `DATABASE_URL`로 `npm run migrate` 1회 실행.
````

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "docs: add backend README with local dev and endpoint reference"
```

---

## Self-Review 메모 (작성자 확인 완료)

- **스펙 커버리지:** Neon 스키마(painters/paintings/difficulties/users/user_progress/user_gallery/packs) → Task 5. `/paintings`·`/progress`(GET/PUT)·`/sync`·`/packs` → Task 8. Clerk 인증 검증 → Task 7. offline-first 병합(LWW + 완성 단조) → Task 3·6. 확장팩 카탈로그(소유권은 RevenueCat, 서버는 카탈로그만) → Task 6·8·9.
- **범위 결정(YAGNI):** `user_gallery` 테이블은 스키마엔 포함했으나 전용 엔드포인트는 MVP 백엔드에서 제외(갤러리 커스터마이징은 초기엔 로컬 저장으로 충분, 서버 동기화는 v2).
- **타입 일관성:** `QueryExecutor.query`는 전 Task에서 rows 배열 반환으로 통일. `ProgressRecord`·`Difficulty`·`Deps`·repository 함수명(`getAllPaintings`/`getAllPacks`/`getProgressForUser`/`upsertProgress`/`syncProgress`)이 정의 Task와 사용 Task에서 일치. 다중 문 SQL은 전부 `applySqlFile` 경유.
- **주의점:** `@clerk/backend`의 `verifyToken` 시그니처는 설치 버전에 따라 다를 수 있으므로 Task 7·8에서 `npm run typecheck`로 확인·조정. 시드 `image_url`은 placeholder → 실제 퍼블릭 도메인 이미지 URL로 교체 필요.
