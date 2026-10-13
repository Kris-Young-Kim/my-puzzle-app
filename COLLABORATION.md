# 🤝 공동 개발 가이드 (Antigravity & Claude Code Collaboration)

> **2026-10-13 업데이트: 프로젝트 방향이 바뀌었습니다.**
> 이전에 작업하셨던 Vite + React + Canvas 웹앱(랭킹보드 중심) 프로토타입은 역할 오해에서 시작된 것으로 확인되어, 전체 폐기하고 아래 새 방향으로 다시 시작합니다. 전체 설계는 `docs/superpowers/specs/2026-10-13-masterpiece-jigsaw-puzzle-design.md`에 있으니 반드시 먼저 읽어주세요. 여기서는 Antigravity가 바로 작업을 시작할 수 있도록 핵심만 요약합니다.

---

## 📌 바뀐 방향 한 줄 요약
**웹(Vite/Canvas) → Expo React Native 안드로이드 네이티브 앱.**
단순 랭킹 경쟁 퍼즐이 아니라, "도슨트 스토리텔링 + 나만의 가상 미술관 + ASMR/손맛 + 시니어 모드"를 갖춘 명화 100점 직소 퍼즐 앱입니다. 랭킹보드 기능은 설계에 없습니다 (제외).

## 📌 역할 분담 (변경 없음, 기술 스택만 교체)

| 영역 | 담당 에이전트 | 주요 업무 |
| :--- | :--- | :--- |
| **Frontend** | **Antigravity** | • Expo (React Native + TypeScript)<br>• `@shopify/react-native-skia` 기반 직소 퍼즐 엔진 (탭/블랭크 요철 있는 정통 직소 모양)<br>• `react-native-gesture-handler` + `react-native-reanimated` 드래그/스냅<br>• `expo-haptics` + `expo-av` 손맛/BGM<br>• `react-native-mmkv` 로컬 저장 (오프라인/익명 플레이)<br>• `@clerk/clerk-expo` 로그인<br>• `react-native-google-mobile-ads` + RevenueCat(`react-native-purchases`) 광고/IAP/확장팩 결제<br>• 가상미술관 갤러리 UI, 시니어 모드 전역 테마, 도슨트 스토리 카드 UI |
| **Backend & DB** | **Claude Code** | • Vercel Functions (Node.js) API 서버<br>• Neon PostgreSQL 연동 및 스키마 구축<br>• Clerk 토큰 인증 검증<br>• `/paintings`, `/progress`, `/sync`, `/packs` 엔드포인트 구현 |

## 🚀 Antigravity 시작 가이드

1. 기존 Vite 관련 파일은 이미 삭제했습니다. 아래로 새 프로젝트를 시작해주세요:
   ```bash
   npx create-expo-app . --template blank-typescript
   ```
2. 설치할 핵심 라이브러리:
   ```bash
   npx expo install @shopify/react-native-skia react-native-gesture-handler react-native-reanimated react-native-mmkv expo-haptics expo-av
   npm install @clerk/clerk-expo react-native-purchases react-native-google-mobile-ads
   ```
3. 조각 모양 생성은 `painting_id + difficulty`를 시드로 쓰는 결정적 PRNG로 구현 (서버는 모양 데이터를 주지 않음 — 상세는 스펙 문서 "데이터 모델" 섹션 참고)
4. 백엔드 API는 아래 계약(contract)으로 호출하시면 됩니다 (아직 구현 전이라 당분간은 로컬 MMKV 캐시/오프라인 폴백으로 개발 진행 가능).

## 🌐 백엔드 API 계약 (Claude Code가 구현할 엔드포인트)

### `GET /paintings`
콘텐츠 카탈로그 전체 반환 (화가/작품/도슨트 스토리/난이도별 그리드 설정 포함)
```json
{
  "paintings": [
    {
      "id": "starry-night",
      "painter": { "name": "빈센트 반 고흐", "birthYear": 1853, "deathYear": 1890 },
      "title": "별이 빛나는 밤",
      "imageUrl": "...",
      "thumbnailUrl": "...",
      "docentStory": "...",
      "difficulties": [{ "level": "25", "gridCols": 5, "gridRows": 5 }, ...]
    }
  ]
}
```

### `GET /progress` (Clerk 인증 필요)
로그인한 유저의 클라우드 저장 진행상황 전체 반환

### `PUT /progress` (Clerk 인증 필요)
```json
{ "paintingId": "starry-night", "difficulty": "100", "placedPieceIds": [1,2,3], "isCompleted": false }
```

### `POST /sync` (Clerk 인증 필요)
로컬(MMKV)에 쌓인 익명 플레이 진행상황을 한 번에 업로드 (클라우드 백업 버튼 클릭 시 호출)

### `GET /packs`
확장팩 카탈로그 (가격/포함 작품 목록). 소유 여부는 서버가 판단하지 않음 — 클라이언트가 RevenueCat SDK로 직접 확인

---

## 🎨 Antigravity (프론트엔드) 진행 현황 (2026-10-13)

1. ✅ **Expo Blank-TypeScript 프로젝트 및 전원 의존성 설치 완료**:
   - `@shopify/react-native-skia`, `react-native-gesture-handler`, `react-native-reanimated`, `react-native-mmkv`, `expo-haptics`, `expo-av`, `@clerk/clerk-expo`, `react-native-purchases`, `react-native-google-mobile-ads` 설치 및 검증 완료.
2. ✅ **결정적 PRNG 직소 조각 생성기 구현 ([src/engine/jigsawGenerator.ts](file:///d:/developer/my-puzzle-app/src/engine/jigsawGenerator.ts))**:
   - `painting_id + difficulty` 시드 기반 Mulberry32 알고리즘으로 탭/블랭크 엣지 및 Skia/SVG 호환 베지에 외곽선 생성.
3. ✅ **오프라인 우선 MMKV 스토리지 구현 ([src/services/storage.ts](file:///d:/developer/my-puzzle-app/src/services/storage.ts))**:
   - 조각 스냅 즉시 `progress:{paintingId}:{difficulty}` 무지연 저장 (진행도 유실 방지).
4. ✅ **시니어 모드 & 테마 컨텍스트 ([src/context/ThemeContext.tsx](file:///d:/developer/my-puzzle-app/src/context/ThemeContext.tsx))**:
   - 폰트 1.35배 확대, 최소 터치 영역 56dp 보장, 다크 골드 미술관 고대비 컬러 토큰.
5. ✅ **화면 및 컴포넌트 완성**:
   - `HomeScreen` (명화 그리드 & 25/100/400 완료 뱃지, 시니어 모드 원터치 토글)
   - `DifficultyModal` (하위 단계 완료 시 상위 해금)
   - `PuzzleScreen` (액자 보드, 고스트 밑그림, 햅틱 스냅, 조각 트레이)
   - `DocentModal` (퍼즐 완성 시 화가/작품 비하인드 스토리 카드)
   - `VirtualMuseumScreen` (완성작 가로 스크롤 전시실, 벽지/액자 커스터마이징)
   - `SettingsScreen` (시니어 모드, 햅틱 on/off, Clerk 클라우드 백업, 구매 복원)
6. ✅ **Clerk 연동 방향**: **옵션 B 확정**
   - 평소에는 100% 무로그인 익명 플레이로 진입 장벽 제로.
   - 설정 화면에서 "클라우드 백업"을 누를 때만 Clerk 로그인 → 백엔드 `/sync` 호출로 Neon DB에 저장.
7. ✅ **정통 직소 퍼즐 베지에 요철 및 소켓 렌더링 완료 ([src/components/JigsawPieceView.tsx](file:///d:/developer/my-puzzle-app/src/components/JigsawPieceView.tsx), [src/engine/jigsawGenerator.ts](file:///d:/developer/my-puzzle-app/src/engine/jigsawGenerator.ts))**:
   - 단순 사각형 블록이 아닌 정통 직소 퍼즐 곡선(볼록한 탭 Tab, 오목한 홈 Blank)을 3차 베지에 곡선으로 구현.
   - SVG `ClipPath`를 적용하여 조각 이미지를 요철 형태 그대로 클리핑 & 3D 목재 베벨 테두리 음영 적용.
   - 퍼즐 보드 위에도 점선 골드 직소 소켓 메쉬를 렌더링하여 빈자리 홈 형태를 시각적으로 확인 가능.
   - 하단 조각 보관함 트레이에서도 실제 곡선 요철 모양으로 각 조각을 직관적으로 확인 및 탭/스냅 가능.
8. ✅ **타입체크 (`npx tsc --noEmit`) 0 Errors 검증 완료**.

---

## 🛠️ Backend & Neon DB (Claude Code 바통 터치 완료 — 100% 완료)

클로드코드의 백엔드 계획(`docs/superpowers/plans/2026-10-13-backend-neon-api.md`) 전 Task를 완수했습니다:

- [x] **Task 0: 프로젝트 스캐폴딩** (Vercel Functions + Neon + Vitest + PGlite)
- [x] **Task 1: 공유 타입 + HTTP 응답 헬퍼** (`src/types.ts`, `src/lib/http.ts`)
- [x] **Task 2: Zod 요청 검증** (`src/lib/validation.ts`)
- [x] **Task 3: 오프라인 진행상황 동기화 병합 순수 로직** (`src/lib/sync-merge.ts`, LWW + 완성 단조 증가)
- [x] **Task 4: DB 추상화 + 다중 문 SQL 실행기** (`src/lib/db.ts`, `src/lib/sql-file.ts`)
- [x] **Task 5: Neon 스키마 마이그레이션 + PGlite 테스트 하네스** (`src/migrations/001_init.sql`, `src/scripts/migrate.ts`)
- [x] **Task 6: Repositories** (`src/repositories/paintings.ts`, `src/repositories/packs.ts`, `src/repositories/progress.ts`)
- [x] **Task 7: 인증** (`src/lib/auth.ts`, Bearer 토큰 추출 + Clerk 검증)
- [x] **Task 8: 핸들러 + Vercel 어댑터**
  - 코어 핸들러: `src/handlers/{paintings,packs,progress,sync}.ts`
  - Vercel 엔드포인트: `api/{health,paintings,packs,progress,sync}.ts`
- [x] **Task 9: 개발용 시드 데이터** (`src/migrations/seed.sql`, 5대 명화 카탈로그 및 난이도 시드)
- [x] **Task 10: 전체 통합 테스트 & README** (`README.md`, Vitest 9개 테스트 파일, 43개 테스트 전원 PASS, Typecheck 통과)

모든 엔드포인트(`/api/health`, `/api/paintings`, `/api/packs`, `/api/progress`, `/api/sync`)와 DB 연동 코드가 배포 준비 완료되었습니다! 🚀
