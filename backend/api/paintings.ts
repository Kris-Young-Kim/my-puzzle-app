import { handleGetPaintings } from '../src/handlers/paintings.ts';
import { productionDeps } from '../src/lib/deps.ts';

export async function GET(request: Request): Promise<Response> {
  return handleGetPaintings(request, productionDeps());
}
