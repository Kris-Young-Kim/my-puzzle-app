# 명화 직소 퍼즐 앱 — 설계 문서

## 개요
저작권이 만료된(사후 70년 경과) 명화 100점으로 구성된 안드로이드 직소 퍼즐 앱. 타겟은 미술 감상/힐링 퍼즐을 좋아하는 30~50대 여성·실버 세대와 아동 교육 시장. 핵심 포지셔닝: "경쟁 앱들은 퍼즐 게임, 우리는 손끝으로 완성하는 나만의 힐링 미술관."

## 경쟁 분석 요약
- **Artizen**: 명화 전문 큐레이션 (벤치마킹 대상)
- **Masterpieced (BorderLeap)**: 반고흐미술관 공식 파트너십, 무광고 유료, 멀티플레이 (벤치마킹 대상)
- **명화 퍼즐: 블록&직소 (국내)**: 3,000점 이상의 양적 공세형, 광고 중심 (차별화 대상)

## 핵심 차별화 기능 (MVP 범위)
1. **도슨트 스토리텔링** — 퍼즐 완성 후 화가/작품의 비하인드 스토리 카드 제공
2. **나만의 가상 미술관** — 완성작이 전시실에 걸리는 갤러리, 전시실/액자/벽지 커스터마이징
3. **ASMR/Haptic 손맛** — 조각 스냅 진동, 캔버스 마찰음, 명화 분위기 클래식 BGM
4. **시니어 모드** — 큰 글씨, 단순 UI, 다크모드 고정 (중장년/실버 타겟)
5. (보류, v2 후보) **숨은그림찾기 결합** — 퍼즐 완성 후 그림 속 특정 요소 찾기 2단계 미션

## 콘텐츠 범위
- 1차 출시부터 100점 전체 목표 (고흐, 모네, 클림트, 베르메르, 다빈치, 미켈란젤로, 쇠라, 드가, 마네, 고갱 등 — 모두 저작권 만료작)
- 난이도: 25피스(5x5) / 100피스(10x10) / 400피스(20x20). 하위 난이도를 완료해야 상위 난이도 해금

## 아키텍처 & 기술 스택

### 클라이언트 (프론트엔드 — Antigravity 담당)
- Expo (React Native + TypeScript), `blank-typescript` 템플릿
- `@shopify/react-native-skia` — 직소 조각(탭/블랭크 요철) 렌더링
- `react-native-gesture-handler` + `react-native-reanimated` — 드래그/스냅 애니메이션
- `react-native-mmkv` — 로컬 캐시 (오프라인/익명 플레이)
- `expo-haptics`, `expo-av` — 손맛 진동/사운드
- `react-native-google-mobile-ads` — 광고
- `react-native-purchases` (RevenueCat) — 광고제거 IAP, 확장팩 구매, 영수증 검증/소유권 관리
- `@clerk/clerk-expo` — 로그인 (Google/Apple 소셜)

### 백엔드 (Claude Code 담당)
- Vercel Functions (Node.js, Fluid Compute)
- Neon (Postgres) — 콘텐츠 카탈로그 + 유저 진행상황 저장
- Clerk 토큰으로 요청 인증 검증
- 엔드포인트: `GET /paintings`, `GET/PUT /progress`, `POST /sync`, `GET /packs`

## 데이터 모델 (Neon Postgres)
```sql
painters (id, name, birth_year, death_year, bio_short)

paintings (id, painter_id FK, title, image_url, thumbnail_url,
           style_tag, docent_story, is_featured)

painting_difficulties (painting_id FK, level enum('25','100','400'),
                        grid_cols, grid_rows)

users (id = clerk_user_id, display_name, created_at, last_synced_at)

user_progress (id, user_id FK, painting_id FK, difficulty,
               placed_piece_ids jsonb, is_completed, completed_at, updated_at)
               -- unique(user_id, painting_id, difficulty)

user_gallery (user_id FK, unlocked_rooms text[], wallpaper_style, frame_style)

packs (id, name, description, price_display, revenuecat_product_id, painting_ids[])
```

- **조각 모양(탭/블랭크) 데이터는 DB에 저장하지 않음** — `painting_id + difficulty`를 시드로 쓰는 결정적(deterministic) PRNG로 매번 동일하게 재생성. `placed_piece_ids`만 저장하면 정확히 이어서 할 수 있음.
- **확장팩 소유 여부는 Neon에 저장하지 않음** — RevenueCat이 결제 검증/소유권을 전담. RevenueCat 유저 ID = Clerk 유저 ID로 연동(`Purchases.logIn(clerkUserId)`)하여 익명 구매도 로그인 시 그대로 연결됨. `packs` 테이블은 콘텐츠 카탈로그(어떤 팩에 어떤 작품이 들어있는지)용으로만 사용.

## 로컬 저장 (MMKV, 클라이언트)
```
progress:{paintingId}:{difficulty} → { placedPieceIds, isCompleted, completedAt, updatedAt }
settings → { seniorMode, hapticOn, bgmVolume, sfxVolume }
gallery → { unlockedRooms, wallpaperStyle, frameStyle }
contentCache:paintings → 서버 콘텐츠 캐시 (오프라인에서도 목록/스토리 표시)
authLink → { isLinked, lastSyncedAt }
```

## 온보딩 & 동기화 전략
- 로그인 없이 익명 플레이 가능 (전부 로컬 저장)
- "클라우드 백업" 버튼을 누르는 시점에만 Clerk 로그인 → 로컬 진행상황을 Neon으로 업로드
- 이후 `updated_at` 기준 last-write-wins로 동기화 (1인 플레이라 복잡한 충돌 해결 불필요)
- 재개 시: 맞춘 조각(`placedPieceIds`)은 정확히 복원, 미배치 조각은 트레이에 다시 랜덤 배치 (흩어놓은 정확한 위치까지는 저장하지 않음)

## 수익 모델
- 무료 + 전면/보상형 광고 (AdMob)
- 광고제거 IAP ($2.99~4.99 영구 상품)
- 확장팩 유료 구매 (예: "인상주의 거장팩", "바로크 명화팩" — 기본 100점 완료한 헤비 유저 대상)

## UI 구성
1. **홈 화면** — 작품 그리드, 완성/미완성 뱃지, 가상미술관 입구, 확장팩 배너
2. **난이도 선택 모달** — 25/100/400 피스, 하위 완료 시 상위 해금
3. **퍼즐 플레이 화면** — Skia 캔버스, 하단 트레이, 드래그 중 reanimated 추종, 스냅 시 진동+사운드, 미리보기 힌트(보상형 광고로 해금), 뒤로가기 시 자동 저장
4. **완성 화면** — 전면 광고(무료 유저) → 도슨트 스토리 카드 슬라이드 → "가상 미술관에 전시하기" 버튼
5. **나만의 가상 미술관** — 가로 스크롤 전시실, 10점마다 새 전시실 해금, 완성 보너스로 벽지/액자 코스메틱 해금
6. **확장팩 스토어** — 잠긴 팩은 흑백/블러 썸네일+가격, RevenueCat 결제 버튼
7. **시니어 모드** — 전역 테마 토큰 전환(폰트 1.4배, 터치 영역 확대, 다크모드 고정, 메뉴 depth 축소), 별도 화면이 아닌 전역 스타일 컨텍스트로 구현
8. **설정** — BGM/SFX 볼륨, 햅틱 on/off, 광고제거 구매, 계정 연결(클라우드 백업)

## 에러 처리
- 이미지 다운로드 실패: 재시도 2회 후 캐시된 썸네일 fallback, "다시 시도" 버튼
- 결제/IAP 실패: 토스트 알림만, 구매 전 상태로 안전 롤백
- 광고 로드 실패: 조용히 스킵, 게임 플레이는 광고 유무와 무관하게 항상 진행
- 동기화: offline-first, 서버 연결 없어도 로컬 저장만으로 완전 동작, 네트워크 복구 시 백그라운드 재동기화
- **최우선 원칙**: 유저의 퍼즐 진행상황(`placedPieceIds`)은 절대 손실되면 안 됨 — 조각 스냅마다 즉시 MMKV 저장(디바운스 없이)

## 테스트 전략
- 유닛 테스트: 조각 요철 패턴 생성기의 결정성(같은 시드 → 같은 모양), 스냅 판정 좌표 허용 오차, progress 저장/재개 로직
- 수동 QA 중심: Expo Go 실기기로 손맛/애니메이션/사운드 확인 (MVP 규모에 E2E 자동화는 과함)
- 결제 플로우: RevenueCat 샌드박스 모드로 테스트 구매 검증
- 구글 플레이 출시 요건인 20인 비공개 테스터 기간을 실사용 QA로 병행 활용

## 변경 이력
- 2026-10-13: 최초 설계 확정. Antigravity가 역할 오해로 먼저 진행했던 Vite 웹앱(랭킹보드 중심) 프로토타입은 폐기하고, Expo React Native 방향으로 재정렬.
