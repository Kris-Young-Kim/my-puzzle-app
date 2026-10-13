import { handleGetProgress, handlePutProgress } from '../src/handlers/progress.ts';
import { productionDeps } from '../src/lib/deps.ts';

export async function GET(request: Request): Promise<Response> {
  return handleGetProgress(request, productionDeps());
}

export async function PUT(request: Request): Promise<Response> {
  return handlePutProgress(request, productionDeps());
}
