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

export interface GalleryCustomization {
  unlockedRooms: string[];
  wallpaperStyle: 'classic_velvet' | 'modern_slate' | 'gallery_wood';
  frameStyle: 'ornate_gold' | 'minimal_black' | 'natural_oak';
}
