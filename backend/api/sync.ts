import { handleSync } from '../src/handlers/sync.ts';
import { productionDeps } from '../src/lib/deps.ts';

export async function POST(request: Request): Promise<Response> {
  return handleSync(request, productionDeps());
}
