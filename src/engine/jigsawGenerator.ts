// 결정적(Deterministic) PRNG 기반 직소 조각 생성기
// painting_id + difficulty 문자열을 시드로 사용하여 항상 동일한 탭/블랭크 요철 패턴을 재생성합니다.

import { DifficultyLevel, PuzzlePiece, PuzzlePieceEdge } from '../types';

/**
 * 문자열을 32비트 정수 해시 시드로 변환 (FNV-1a 변형 알고리즘)
 */
export function stringToSeed(str: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 16777619);
  }
  return h >>> 0;
}

/**
 * 32비트 시드를 받는 결정적 난수 생성기 (Mulberry32)
 */
export function createPRNG(seed: number): () => number {
  let s = seed;
  return function () {
    let t = (s += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * 결정적 PRNG를 통해 cols x rows 퍼즐의 맞물리는 엣지 테이블을 생성합니다.
 */
export function generateDeterministicEdges(
  cols: number,
  rows: number,
  seedString: string
): PuzzlePieceEdge[][] {
  const prng = createPRNG(stringToSeed(seedString));

  // 1. 수평 내부 엣지: (rows - 1) x cols
  const hEdges: number[][] = [];
  for (let r = 0; r < rows - 1; r++) {
    hEdges[r] = [];
    for (let c = 0; c < cols; c++) {
      hEdges[r][c] = prng() < 0.5 ? 1 : -1;
    }
  }

  // 2. 수직 내부 엣지: (cols - 1) x rows
  const vEdges: number[][] = [];
  for (let c = 0; c < cols - 1; c++) {
    vEdges[c] = [];
    for (let r = 0; r < rows; r++) {
      vEdges[c][r] = prng() < 0.5 ? 1 : -1;
    }
  }

  // 3. 각 조각별 4개 엣지 조립 (테두리는 0)
  const edgesGrid: PuzzlePieceEdge[][] = [];
  for (let r = 0; r < rows; r++) {
    edgesGrid[r] = [];
    for (let c = 0; c < cols; c++) {
      edgesGrid[r][c] = {
        top: r === 0 ? 0 : -hEdges[r - 1][c],
        right: c === cols - 1 ? 0 : vEdges[c][r],
        bottom: r === rows - 1 ? 0 : hEdges[r][c],
        left: c === 0 ? 0 : -vEdges[c - 1][r]
      };
    }
  }

  return edgesGrid;
}

/**
 * 특정 명화와 난이도에 해당하는 직소 조각 메타데이터 목록 생성
 */
export function generatePuzzlePieces(
  paintingId: string,
  difficulty: DifficultyLevel,
  boardWidth: number,
  boardHeight: number
): {
  pieces: PuzzlePiece[];
  cols: number;
  rows: number;
  pieceWidth: number;
  pieceHeight: number;
  tabPadding: number;
} {
  // 난이도별 그리드 결정: 25 -> 5x5, 100 -> 10x10, 400 -> 20x20
  const cols = difficulty === '25' ? 5 : difficulty === '100' ? 10 : 20;
  const rows = cols;

  const pieceWidth = boardWidth / cols;
  const pieceHeight = boardHeight / rows;
  const tabPadding = Math.max(pieceWidth, pieceHeight) * 0.28;

  const seedString = `${paintingId}:${difficulty}`;
  const edgesGrid = generateDeterministicEdges(cols, rows, seedString);

  const pieces: PuzzlePiece[] = [];
  let id = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const edges = edgesGrid[r][c];
      const isEdge = edges.top === 0 || edges.right === 0 || edges.bottom === 0 || edges.left === 0;

      pieces.push({
        id,
        col: c,
        row: r,
        edges,
        targetX: c * pieceWidth,
        targetY: r * pieceHeight,
        width: pieceWidth,
        height: pieceHeight,
        isPlaced: false,
        isEdge
      });
      id++;
    }
  }

  return {
    pieces,
    cols,
    rows,
    pieceWidth,
    pieceHeight,
    tabPadding
  };
}

/**
 * 특정 조각의 보드 좌표계 기준 직소 외곽선 Path 문자열 (보드 위 소켓 및 안내선 렌더링용)
 */
export function buildJigsawPieceBoardPath(piece: PuzzlePiece): string {
  const x0 = piece.targetX;
  const y0 = piece.targetY;
  const x1 = piece.targetX + piece.width;
  const y1 = piece.targetY + piece.height;

  let d = `M ${x0.toFixed(2)} ${y0.toFixed(2)}`;
  d += drawEdgeSVG(x0, y0, x1, y0, piece.edges.top);
  d += drawEdgeSVG(x1, y0, x1, y1, piece.edges.right);
  d += drawEdgeSVG(x1, y1, x0, y1, piece.edges.bottom);
  d += drawEdgeSVG(x0, y1, x0, y0, piece.edges.left);
  d += ' Z';
  return d;
}

/**
 * 베지에 곡선을 활용해 Skia 및 SVG 호환 직소 조각 로컬 외곽선 Path 문자열을 생성합니다.
 * (0,0) 위치가 tabPadding 여백만큼 안쪽으로 오프셋되어 돌출 탭(tab)이 잘리지 않습니다.
 */
export function buildJigsawPieceSVGPath(
  pieceWidth: number,
  pieceHeight: number,
  tabPadding: number,
  edges: PuzzlePieceEdge
): string {
  const x0 = tabPadding;
  const y0 = tabPadding;
  const x1 = tabPadding + pieceWidth;
  const y1 = tabPadding + pieceHeight;

  let d = `M ${x0.toFixed(2)} ${y0.toFixed(2)}`;

  // 상단 엣지: x0,y0 -> x1,y0
  d += drawEdgeSVG(x0, y0, x1, y0, edges.top);
  // 우측 엣지: x1,y0 -> x1,y1
  d += drawEdgeSVG(x1, y0, x1, y1, edges.right);
  // 하단 엣지: x1,y1 -> x0,y1
  d += drawEdgeSVG(x1, y1, x0, y1, edges.bottom);
  // 좌측 엣지: x0,y1 -> x0,y0
  d += drawEdgeSVG(x0, y1, x0, y0, edges.left);

  d += ' Z';
  return d;
}

/**
 * 시계 방향 외곽선 순회 기준:
 * edge > 0: 바깥으로 볼록한 탭 (Tab)
 * edge < 0: 안으로 오목한 홈 (Blank / Socket)
 * edge === 0: 퍼즐 가장자리 직선 테두리 (Border)
 */
function drawEdgeSVG(x1: number, y1: number, x2: number, y2: number, edge: number): string {
  if (edge === 0) {
    return ` L ${x2.toFixed(2)} ${y2.toFixed(2)}`;
  }

  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);

  const ux = dx / len;
  const uy = dy / len;

  // 시계 방향 순회 시 외곽 법선 벡터 (Outward Normal):
  // Top (ux=1, uy=0) -> nx=0, ny=-1 (위쪽으로 돌출)
  // Right (ux=0, uy=1) -> nx=1, ny=0 (오른쪽으로 돌출)
  // Bottom (ux=-1, uy=0) -> nx=0, ny=1 (아래쪽으로 돌출)
  // Left (ux=0, uy=-1) -> nx=-1, ny=0 (왼쪽으로 돌출)
  const sign = edge > 0 ? 1 : -1;
  const nx = uy * sign;
  const ny = -ux * sign;

  const p = (t: number, n: number) => {
    const x = x1 + ux * (t * len) + nx * (n * len);
    const y = y1 + uy * (t * len) + ny * (n * len);
    return `${x.toFixed(2)} ${y.toFixed(2)}`;
  };

  // 실감나는 수제 직소 퍼즐의 둥근 모서리와 잘록한 목(neck) 곡선 좌표
  const ptA = p(0.35, 0.0);
  const cp1 = p(0.37, -0.04);
  const cp2 = p(0.33, 0.10);
  const ptB = p(0.37, 0.20);
  const cp3 = p(0.42, 0.30);
  const cp4 = p(0.58, 0.30);
  const ptC = p(0.63, 0.20);
  const cp5 = p(0.67, 0.10);
  const cp6 = p(0.63, -0.04);
  const ptD = p(0.65, 0.0);

  return ` L ${ptA} C ${cp1}, ${cp2}, ${ptB} C ${cp3}, ${cp4}, ${ptC} C ${cp5}, ${cp6}, ${ptD} L ${x2.toFixed(2)} ${y2.toFixed(2)}`;
}
