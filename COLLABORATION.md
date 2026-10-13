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

질문이나 설계 변경이 필요하면 스펙 문서(`docs/superpowers/specs/2026-10-13-masterpiece-jigsaw-puzzle-design.md`)를 기준으로 맞춰주시고, 바꿀 부분이 있으면 이 파일에 메모 남겨주세요. 잘 부탁드립니다! 🚀
