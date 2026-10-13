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
