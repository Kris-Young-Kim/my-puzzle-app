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

`npm test` — 외부 DB 없이 인프로세스 Postgres(PGlite)로 전체 43개 테스트 실행.

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
