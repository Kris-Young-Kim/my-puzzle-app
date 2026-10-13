import { handleGetPacks } from '../src/handlers/packs.ts';
import { productionDeps } from '../src/lib/deps.ts';

export async function GET(request: Request): Promise<Response> {
  return handleGetPacks(request, productionDeps());
}
