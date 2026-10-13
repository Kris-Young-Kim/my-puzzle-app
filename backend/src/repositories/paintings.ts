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
