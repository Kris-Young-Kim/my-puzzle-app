// 명화 직소 퍼즐 타입 정의

export type DifficultyLevel = '25' | '100' | '400';

export interface DifficultyConfig {
  level: DifficultyLevel;
  gridCols: number;
  gridRows: number;
  label: string;
}

export interface Painter {
  name: string;
  birthYear: number;
  deathYear: number;
  bioShort?: string;
}

export interface Painting {
  id: string;
  title: string;
  painter: Painter;
  year?: string;
  imageUrl: string;
  thumbnailUrl: string;
  styleTag: string;
  museum?: string;
  docentStory: string; // 퍼즐 완성 후 해금되는 비하인드 스토리
  difficulties: DifficultyConfig[];
  isFeatured?: boolean;
}

export interface PuzzlePieceEdge {
  top: number;    // 0: 평평한 테두리, 1: 볼록 탭, -1: 오목 블랭크
  right: number;
  bottom: number;
  left: number;
}

export interface PuzzlePiece {
  id: number;     // 0 ~ (total - 1)
  col: number;
  row: number;
  edges: PuzzlePieceEdge;
  targetX: number;
  targetY: number;
  width: number;
  height: number;
  isPlaced: boolean;
  isEdge: boolean;
}

export interface UserProgress {
  paintingId: string;
  difficulty: DifficultyLevel;
  placedPieceIds: number[];
  isCompleted: boolean;
  completedAt?: string;
  updatedAt: string;
}

export interface UserSettings {
  seniorMode: boolean;   // 글씨 1.4배, 터치 영역 확대, 직관적인 UI
  hapticOn: boolean;     // 조각 스냅 진동
  bgmVolume: number;     // 0.0 ~ 1.0
  sfxVolume: number;     // 0.0 ~ 1.0
}

export type WallpaperStyle =
  | 'classic_velvet'
  | 'modern_slate'
  | 'gallery_wood'
  | 'orsay_midnight'
  | 'louvre_moonlight'
  | 'uffizi_marble'
  | 'belvedere_golden'
  | 'rijks_damask'
  | 'prado_crimson'
  | 'met_grand_hall'
  | 'national_emerald';

export type FrameStyle =
  | 'ornate_gold'
  | 'minimal_black'
  | 'natural_oak'
  | 'rococo_silver'
  | 'imperial_marble'
  | 'renaissance_baroque'
  | 'art_deco_emerald'
  | 'victorian_rosegold'
  | 'gothic_obsidian'
  | 'florentine_walnut';


export interface GalleryCustomization {
  unlockedRooms: string[];
  wallpaperStyle: WallpaperStyle;
  frameStyle: FrameStyle;
}

// 인앱 구매(IAP) 부티크 상품 타입
export type ShopCategory = 'paintings' | 'packs' | 'frames' | 'wallpapers';

export interface ShopPaintingItem {
  id: string;
  type: 'painting';
  title: string;
  artist: string;
  year?: string;
  priceKRW: number;
  priceDisplay: string;
  imageUrl: string;
  styleTag: string;
  description: string;
}

export interface ShopPackItem {
  id: string;
  type: 'pack';
  title: string;
  subtitle: string;
  description: string;
  priceKRW: number;
  priceDisplay: string;
  originalPriceDisplay: string;
  discountBadge: string;
  paintingIds: string[];
  bannerColor: string;
  tag: string;
  includedPaintingsPreview?: string[];
}

export interface ShopFrameItem {
  id: string;
  type: 'frame';
  frameStyle: FrameStyle;
  title: string;
  description: string;
  priceKRW: number;
  priceDisplay: string;
  borderColor: string;
  borderWidth: number;
  glowColor: string;
  isFree?: boolean;
}

export interface ShopWallpaperItem {
  id: string;
  type: 'wallpaper';
  wallpaperStyle: WallpaperStyle;
  title: string;
  description: string;
  priceKRW: number;
  priceDisplay: string;
  bgColor: string;
  accentColor: string;
  isFree?: boolean;
}

export type ShopItem = ShopPaintingItem | ShopPackItem | ShopFrameItem | ShopWallpaperItem;

