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
