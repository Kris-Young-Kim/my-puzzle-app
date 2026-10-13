import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView
} from 'react-native';
import Svg, { Path, G } from 'react-native-svg';
import { Painting, DifficultyLevel, PuzzlePiece } from '../types';
import { generatePuzzlePieces, buildJigsawPieceBoardPath } from '../engine/jigsawGenerator';
import { JigsawPieceView } from '../components/JigsawPieceView';
import { StorageService } from '../services/storage';
import { audioHaptics } from '../services/audioHaptics';
import { useAppTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  painting: Painting;
  difficulty: DifficultyLevel;
  onBack: () => void;
  onComplete: () => void;
}

export const PuzzleScreen: React.FC<Props> = ({
  painting,
  difficulty,
  onBack,
  onComplete
}) => {
  const { theme } = useAppTheme();
  const windowDims = Dimensions.get('window');

  // 명화 고유 종횡비 (가로 / 세로) - 미로딩 시 즉시 적용할 고해상도 프리셋
  const [aspectRatio, setAspectRatio] = useState<number>(() => {
    const DEFAULT_ASPECT_RATIOS: Record<string, number> = {
      'pearl-earring': 960 / 1130, // ~0.85 (세로형 인물화)
      'starry-night': 1280 / 1014, // ~1.26 (가로형 풍경화)
      'the-kiss': 1.0,             // 1.0 (정사각형)
      'mona-lisa': 960 / 1440,     // ~0.67 (세로형 인물화)
      'wanderer': 960 / 1238,      // ~0.78 (세로형 풍경화)
      'water-lilies': 960 / 936,   // ~1.03 (정사각형에 가까움)
      'great-wave': 1280 / 864,    // ~1.48 (가로형 판화)
      'birth-of-venus': 1280 / 814 // ~1.57 (가로 와이드)
    };
    return DEFAULT_ASPECT_RATIOS[painting.id] || 1.0;
  });

  // 이미지 실제 해상도 기반 동적 비율 보정
  useEffect(() => {
    if (painting.imageUrl) {
      Image.getSize(
        painting.imageUrl,
        (w, h) => {
          if (w > 0 && h > 0) {
            setAspectRatio(w / h);
          }
        },
        () => {}
      );
    }
  }, [painting.imageUrl]);

  // 보드 크기 계산 (화면 여백 및 종횡비 엄격 보존하여 오른쪽/하단 잘림 100% 방지)
  const maxAvailableWidth = Math.min(windowDims.width - 36, 520);
  const maxAvailableHeight = Math.max(windowDims.height - 275, 260);

  let boardWidth = maxAvailableWidth;
  let boardHeight = Math.round(boardWidth / aspectRatio);

  if (boardHeight > maxAvailableHeight) {
    boardHeight = maxAvailableHeight;
    boardWidth = Math.round(boardHeight * aspectRatio);
  }
  if (boardWidth > maxAvailableWidth) {
    boardWidth = maxAvailableWidth;
    boardHeight = Math.round(boardWidth / aspectRatio);
  }

  // 퍼즐 보드 DOM 참조 (브라우저 정확한 뷰포트 절대 좌표 측정용)
  const boardRef = useRef<View>(null);

  // 퍼즐 기하학 계산
  const puzzleLayout = useMemo(() => {
    return generatePuzzlePieces(painting.id, difficulty, boardWidth, boardHeight);
  }, [painting.id, difficulty, boardWidth, boardHeight]);

  // 배치된 조각 ID 목록 (MMKV에서 이전 진행상황 복원)
  const [placedPieceIds, setPlacedPieceIds] = useState<number[]>(() => {
    const saved = StorageService.getProgress(painting.id, difficulty);
    return saved ? saved.placedPieceIds : [];
  });

  // 조각 보관함 무작위 셔플 순서 (순차 배치 치트 방지)
  const [shuffleOrder, setShuffleOrder] = useState<number[]>([]);

  // 난이도/명화 진입 시 피셔-예이츠 셔플로 조각 순서 무작위화
  useEffect(() => {
    if (!puzzleLayout.pieces || puzzleLayout.pieces.length === 0) return;
    const ids = puzzleLayout.pieces.map(p => p.id);
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    setShuffleOrder(ids);
  }, [painting.id, difficulty, puzzleLayout.pieces.length]);

  // 수동 다시 섞기 핸들러
  const handleReshuffleTray = () => {
    audioHaptics.triggerPickup();
    setShuffleOrder(prev => {
      const copy = [...prev];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    });
    setToastMessage({
      text: '🔀 보관함 조각들을 새로 섞었습니다!',
      type: 'info'
    });
  };

  // UI 및 드래그 상태
  const [showGhost, setShowGhost] = useState<boolean>(true);
  const [edgeOnly, setEdgeOnly] = useState<boolean>(false);
  const [activePiece, setActivePiece] = useState<PuzzlePiece | null>(null);
  const [draggingPiece, setDraggingPiece] = useState<PuzzlePiece | null>(null);
  const [dragCoords, setDragCoords] = useState<{ x: number; y: number } | null>(null);
  const [dragTilt, setDragTilt] = useState<number>(0);
  const prevDragX = useRef<number>(0);
  const [justPlacedId, setJustPlacedId] = useState<number | null>(null);
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; vx: number; vy: number; size: number; opacity: number; color: string }>
  >([]);
  const [streakCount, setStreakCount] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'info' | 'success' | 'error' } | null>(null);

  // 골드 스파클 파티클 물리 시뮬레이션 루프
  useEffect(() => {
    if (particles.length === 0) return;
    const frame = requestAnimationFrame(() => {
      setParticles(prev =>
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.14, // 미세 중력
            vx: p.vx * 0.94, // 공기 저항 감속
            opacity: p.opacity - 0.038
          }))
          .filter(p => p.opacity > 0)
      );
    });
    return () => cancelAnimationFrame(frame);
  }, [particles]);

  // 토스트 메시지 자동 해제
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3200);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // 미배치 조각들 (무작위 셔플 순서 적용)
  const unplacedPieces = useMemo(() => {
    const placedSet = new Set(placedPieceIds);
    let list = puzzleLayout.pieces.filter(p => !placedSet.has(p.id));
    if (edgeOnly) {
      list = list.filter(p => p.isEdge);
    }
    if (shuffleOrder.length > 0) {
      const orderMap = new Map<number, number>();
      shuffleOrder.forEach((id, index) => orderMap.set(id, index));
      return list.sort((a, b) => {
        const orderA = orderMap.has(a.id) ? orderMap.get(a.id)! : a.id;
        const orderB = orderMap.has(b.id) ? orderMap.get(b.id)! : b.id;
        return orderA - orderB;
      });
    }
    return list;
  }, [puzzleLayout.pieces, placedPieceIds, edgeOnly, shuffleOrder]);

  // 웹 브라우저/마우스 전역 드래그 리스너 (틸트 물리 관성 적용)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleWindowMove = (e: any) => {
      if (!draggingPiece) return;
      const clientX = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      const clientY = e.clientY ?? (e.touches && e.touches[0] ? e.touches[0].clientY : 0);

      // 드래그 속도에 비례한 유려한 3D 회전 틸트 각도 (-5도 ~ +5도)
      const deltaX = clientX - prevDragX.current;
      prevDragX.current = clientX;
      const targetTilt = Math.max(-5, Math.min(5, deltaX * 0.4));
      setDragTilt(targetTilt);
      setDragCoords({ x: clientX, y: clientY });
    };

    const handleWindowUp = (e: any) => {
      if (!draggingPiece) return;
      const clientX = e.clientX ?? (e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientX : 0);
      const clientY = e.clientY ?? (e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientY : 0);
      handleDropOrPlace(draggingPiece, clientX, clientY);
      setDraggingPiece(null);
      setDragCoords(null);
      setDragTilt(0);
    };

    if (draggingPiece) {
      window.addEventListener('pointermove', handleWindowMove);
      window.addEventListener('pointerup', handleWindowUp);
      window.addEventListener('touchmove', handleWindowMove);
      window.addEventListener('touchend', handleWindowUp);
    }

    return () => {
      window.removeEventListener('pointermove', handleWindowMove);
      window.removeEventListener('pointerup', handleWindowUp);
      window.removeEventListener('touchmove', handleWindowMove);
      window.removeEventListener('touchend', handleWindowUp);
    };
  }, [draggingPiece, boardWidth, boardHeight, puzzleLayout, streakCount, placedPieceIds]);

  // 브라우저 뷰포트 좌표를 보드 로컬 좌표계로 절대 변환 (서브픽셀 오차 및 자식 요소 오프셋 오류 100% 방지)
  const getBoardCoordsFromClient = (clientX: number, clientY: number) => {
    if (typeof window !== 'undefined' && boardRef.current) {
      const node = boardRef.current as any;
      if (node && node.getBoundingClientRect) {
        const rect = node.getBoundingClientRect();
        return {
          x: clientX - rect.left,
          y: clientY - rect.top,
          isInside:
            clientX >= rect.left - 40 &&
            clientX <= rect.right + 40 &&
            clientY >= rect.top - 40 &&
            clientY <= rect.bottom + 40
        };
      }
    }
    return null;
  };

  // 조각 1개 스냅 처리 함수 (ASMR 사운드 + 골드 스파클 파티클 폭발)
  const handleSnapPiece = (pieceId: number, streak: number = 0) => {
    audioHaptics.triggerSnap(streak);
    const nextPlaced = [...placedPieceIds, pieceId];
    setPlacedPieceIds(nextPlaced);
    setActivePiece(null);

    // 체결 부위 골드 펄스 및 화려한 스파클 파티클 방출
    const piece = puzzleLayout.pieces[pieceId];
    if (piece) {
      setJustPlacedId(pieceId);
      setTimeout(() => setJustPlacedId(null), 650);

      const centerX = piece.targetX + piece.width / 2;
      const centerY = piece.targetY + piece.height / 2;
      const colors = ['#ffd700', '#fff8e7', '#f5d76e', '#ffecb3', '#ffffff'];
      const newParticles = Array.from({ length: 10 }, (_, i) => {
        const angle = (Math.PI * 2 * i) / 10 + (Math.random() - 0.5) * 0.5;
        const speed = 2.4 + Math.random() * 3.2;
        return {
          id: Math.random(),
          x: centerX,
          y: centerY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.2,
          size: 3.5 + Math.random() * 4,
          opacity: 1,
          color: colors[i % colors.length]
        };
      });
      setParticles(newParticles);
    }

    const isFinished = nextPlaced.length === puzzleLayout.pieces.length;
    StorageService.saveProgress(painting.id, difficulty, nextPlaced, isFinished);

    const percent = Math.round((nextPlaced.length / puzzleLayout.pieces.length) * 100);

    if (isFinished) {
      audioHaptics.triggerVictory();
      setToastMessage({
        text: '🎉 명화가 완성되었습니다! 도슨트 해설 카드를 불러옵니다...',
        type: 'success'
      });
      setTimeout(() => {
        onComplete();
      }, 700);
    } else if (streak >= 3) {
      setToastMessage({
        text: `🔥 ${streak}연속 적중! 뛰어난 미술적 안목입니다.`,
        type: 'success'
      });
    } else if (percent === 25) {
      setToastMessage({
        text: '🏛️ [25% 달성] 작품의 전체적인 구도가 서서히 드러나고 있습니다!',
        type: 'info'
      });
    } else if (percent === 50) {
      setToastMessage({
        text: '🏛️ [50% 달성] 절반 완성! 화가의 섬세한 명암이 살아납니다.',
        type: 'info'
      });
    } else if (percent === 75) {
      setToastMessage({
        text: '🏛️ [75% 달성] 완성이 눈앞입니다! 마지막 조각들을 찾아보세요.',
        type: 'info'
      });
    } else {
      setToastMessage({
        text: '✨ 완벽한 위치에 기분 좋게 맞물렸습니다!',
        type: 'success'
      });
    }
  };

  // 드롭 또는 터치 시 정밀 위치 판정 (Hit-Testing)
  const handleDropOrPlace = (piece: PuzzlePiece, clientX: number, clientY: number) => {
    const coords = getBoardCoordsFromClient(clientX, clientY);
    if (!coords) return;

    // 타겟 조각의 중심 좌표 계산
    const targetCenterX = piece.targetX + piece.width / 2;
    const targetCenterY = piece.targetY + piece.height / 2;

    // 터치/드롭 위치와 타겟 소켓 중심 사이의 거리
    const distance = Math.hypot(coords.x - targetCenterX, coords.y - targetCenterY);

    // 너그러운 스냅 판정 허용 오차: 조각 가로/세로의 1.3배 (손가락/마우스로 대략만 가져와도 찰칵 맞물림)
    const tolerance = Math.max(piece.width, piece.height) * (theme.isSenior ? 1.5 : 1.3);

    if (distance <= tolerance) {
      // 🎯 정확한 위치에 배치 성공!
      const nextStreak = streakCount + 1;
      setStreakCount(nextStreak);
      handleSnapPiece(piece.id, nextStreak);
    } else if (coords.isInside) {
      // ❌ 보드 안이지만 다른 자리에 놓음
      audioHaptics.triggerMismatch();
      setStreakCount(0);
      setToastMessage({
        text: '❌ 이 위치가 아닙니다. 그림의 색채와 요철 형태를 확인해보세요!',
        type: 'error'
      });
    }
  };

  // 보드 클릭 이벤트 핸들러
  const handleBoardClick = (e: any) => {
    if (!activePiece) {
      setToastMessage({
        text: '하단 보관함에서 조각을 먼저 드래그하거나 선택해주세요.',
        type: 'info'
      });
      return;
    }
    const clientX = e.clientX ?? (e.nativeEvent ? e.nativeEvent.clientX : 0);
    const clientY = e.clientY ?? (e.nativeEvent ? e.nativeEvent.clientY : 0);
    handleDropOrPlace(activePiece, clientX, clientY);
  };

  // 힌트: 조각 1개 자동 맞추기
  const handleAutoHint = () => {
    if (unplacedPieces.length === 0) return;
    const target = unplacedPieces[0];
    handleSnapPiece(target.id, 0);
    setToastMessage({
      text: '💡 도슨트 힌트: 한 조각의 자리를 안내해 드렸습니다.',
      type: 'info'
    });
  };

  const progressPercent = Math.round((placedPieceIds.length / puzzleLayout.pieces.length) * 100);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.bgDark }]}>
      {/* 3D 공중 부유 드래그 중인 조각 오버레이 (물리 틸트 회전 & 4mm 입체 그림자) */}
      {draggingPiece && dragCoords && (
        <View
          style={[
            styles.floatingPieceOverlay,
            {
              left: dragCoords.x - (draggingPiece.width / 2 + puzzleLayout.tabPadding),
              top: dragCoords.y - (draggingPiece.height / 2 + puzzleLayout.tabPadding),
              transform: [{ rotate: `${dragTilt}deg` }, { scale: 1.08 }]
            }
          ]}
          pointerEvents="none"
        >
          <JigsawPieceView
            piece={draggingPiece}
            imageUrl={painting.imageUrl}
            boardWidth={boardWidth}
            boardHeight={boardHeight}
            tabPadding={puzzleLayout.tabPadding}
            mode="floating"
          />
        </View>
      )}

      {/* 상단 액션바 */}
      <View style={[styles.header, { borderColor: theme.colors.borderGold }]}>
        <TouchableOpacity
          onPress={onBack}
          style={[styles.headerBtn, { minHeight: theme.minTouchSize, minWidth: theme.minTouchSize }]}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>

        <View style={styles.headerInfo}>
          <View style={styles.titleRow}>
            <Text style={[styles.headerTitle, { fontSize: theme.typography.h3, color: theme.colors.goldBright }]} numberOfLines={1}>
              {painting.title}
            </Text>
            {streakCount > 1 && (
              <View style={styles.streakBadge}>
                <Text style={styles.streakBadgeText}>🔥 {streakCount}연속</Text>
              </View>
            )}
          </View>
          <Text style={[styles.headerProgress, { fontSize: theme.typography.caption, color: theme.colors.textSecondary }]}>
            진행률: {placedPieceIds.length}/{puzzleLayout.pieces.length} ({progressPercent}%)
          </Text>
        </View>

        <View style={styles.headerActions}>
          {/* 고스트 밑그림 토글 */}
          <TouchableOpacity
            onPress={() => setShowGhost(!showGhost)}
            style={[styles.headerBtn, showGhost && styles.activeBtn, { minHeight: theme.minTouchSize, minWidth: theme.minTouchSize }]}
          >
            <Ionicons name={showGhost ? 'eye' : 'eye-off'} size={22} color={showGhost ? theme.colors.goldBright : theme.colors.textMuted} />
          </TouchableOpacity>

          {/* 조각 1개 힌트 맞춤 */}
          <TouchableOpacity
            onPress={handleAutoHint}
            style={[styles.headerBtn, { minHeight: theme.minTouchSize, minWidth: theme.minTouchSize }]}
          >
            <Ionicons name="bulb-outline" size={22} color={theme.colors.goldBright} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 상태 안내 및 감동 피드백 토스트 배너 */}
      {toastMessage && (
        <View
          style={[
            styles.toastBanner,
            toastMessage.type === 'error' && styles.toastError,
            toastMessage.type === 'success' && styles.toastSuccess,
            toastMessage.type === 'info' && styles.toastInfo
          ]}
        >
          <Text
            style={[
              styles.toastText,
              { fontSize: theme.typography.caption },
              toastMessage.type === 'error' && { color: '#ff6b6b' },
              toastMessage.type === 'success' && { color: '#f5d76e' },
              toastMessage.type === 'info' && { color: '#74c0fc' }
            ]}
          >
            {toastMessage.text}
          </Text>
        </View>
      )}

      {/* 중앙: 퍼즐 보드 (황금 액자 프레임) */}
      <View style={styles.boardContainer}>
        <View
          style={[
            styles.boardFrame,
            { borderColor: theme.colors.goldMuted }
          ]}
        >
          {/* 퍼즐 캔버스 컨테이너 (정확히 boardWidth x boardHeight, 1픽셀도 잘리지 않음) */}
          <View
            ref={boardRef}
            style={{
              width: boardWidth,
              height: boardHeight,
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: '#0a0d14',
              borderRadius: 4
            }}
          >
            {/* 고스트 밑그림 오버레이 */}
            {showGhost && (
              <Image
                source={{ uri: painting.imageUrl }}
                style={[styles.ghostImage, { width: boardWidth, height: boardHeight }]}
                resizeMode="cover"
              />
            )}

          {/* 보드 위 정통 3D 음각 직소 요철 소켓 메쉬 안내선 & 터치 판정 (SVG) */}
          <TouchableOpacity
            activeOpacity={1}
            style={StyleSheet.absoluteFill}
            onPress={handleBoardClick}
          >
            <Svg width={boardWidth} height={boardHeight} style={StyleSheet.absoluteFill}>
              {puzzleLayout.pieces.map((piece) => {
                const isPlaced = placedPieceIds.includes(piece.id);
                if (isPlaced) return null;

                const isTarget = (activePiece?.id === piece.id) || (draggingPiece?.id === piece.id);
                const pathData = buildJigsawPieceBoardPath(piece);

                return (
                  <G key={`socket-${piece.id}`}>
                    {/* 1. 음각 홈 바닥 깊이 (파여 있는 어두운 홈) */}
                    <Path
                      d={pathData}
                      fill={isTarget ? 'rgba(243, 156, 18, 0.35)' : 'rgba(8, 11, 16, 0.75)'}
                    />
                    {/* 2. 상단/좌측 벽면의 깊은 음영 (3D Inward Depth Shadow) */}
                    <Path
                      d={pathData}
                      fill="none"
                      stroke="rgba(0, 0, 0, 0.9)"
                      strokeWidth={2.2}
                      transform="translate(1.0, 1.0)"
                    />
                    {/* 3. 하단/우측 모서리의 빛 반사 림 (3D Rim Catch Light) */}
                    <Path
                      d={pathData}
                      fill="none"
                      stroke={isTarget ? '#f39c12' : 'rgba(212, 175, 55, 0.45)'}
                      strokeWidth={isTarget ? 3.0 : 1.2}
                      transform="translate(-0.6, -0.6)"
                    />
                    {/* 4. 직소 안내 결선 */}
                    <Path
                      d={pathData}
                      fill="none"
                      stroke={isTarget ? '#f5d76e' : 'rgba(212, 175, 55, 0.25)'}
                      strokeWidth={1.0}
                      strokeDasharray={isTarget ? undefined : '4, 3'}
                    />
                  </G>
                );
              })}
            </Svg>
          </TouchableOpacity>

          {/* 이미 맞춰진 정통 직소 조각들 렌더링 (SVG 3D 클리핑) */}
          {placedPieceIds.map((id) => {
            const piece = puzzleLayout.pieces[id];
            if (!piece) return null;

            return (
              <JigsawPieceView
                key={`placed-${id}`}
                piece={piece}
                imageUrl={painting.imageUrl}
                boardWidth={boardWidth}
                boardHeight={boardHeight}
                tabPadding={puzzleLayout.tabPadding}
                mode="board"
                isJustPlaced={justPlacedId === id}
              />
            );
          })}

          {/* 체결 축하 골드 스파클 파티클 VFX */}
          {particles.length > 0 && (
            <View style={StyleSheet.absoluteFill} pointerEvents="none">
              {particles.map((p) => (
                <View
                  key={`p-${p.id}`}
                  style={{
                    position: 'absolute',
                    left: p.x - p.size / 2,
                    top: p.y - p.size / 2,
                    width: p.size,
                    height: p.size,
                    borderRadius: p.size / 2,
                    backgroundColor: p.color,
                    opacity: p.opacity,
                    shadowColor: '#ffd700',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.9,
                    shadowRadius: p.size * 2,
                    elevation: 12
                  }}
                />
              ))}
            </View>
            )}
          </View>
        </View>
      </View>

      {/* 하단: 조각 보관함 트레이 */}
      <View style={[styles.trayWrapper, { backgroundColor: theme.colors.bgCard, borderColor: theme.colors.borderGold }]}>
        <View style={styles.trayHeader}>
          <Text style={[styles.trayTitle, { fontSize: theme.typography.caption, color: theme.colors.goldBright, flex: 1 }]} numberOfLines={1}>
            조각 보관함 ({unplacedPieces.length}개 남음)
            {activePiece ? ' • 조각 선택됨' : ''}
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <TouchableOpacity
              style={styles.trayActionBtn}
              onPress={handleReshuffleTray}
            >
              <Ionicons name="shuffle-outline" size={14} color={theme.colors.goldBright} />
              <Text style={[styles.trayActionText, { color: theme.colors.goldBright }]}>
                조각 섞기
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.edgeFilterBtn, edgeOnly && styles.activeEdgeBtn]}
              onPress={() => setEdgeOnly(!edgeOnly)}
            >
              <Ionicons name="scan-outline" size={14} color={edgeOnly ? '#0b0e14' : theme.colors.textSecondary} />
              <Text style={[styles.edgeFilterText, { color: edgeOnly ? '#0b0e14' : theme.colors.textSecondary }]}>
                가장자리만
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.trayScrollList}
        >
          {unplacedPieces.map((piece) => {
            const isSelected = activePiece?.id === piece.id;

            return (
              <TouchableOpacity
                key={`tray-${piece.id}`}
                style={[
                  styles.trayPieceCard,
                  isSelected && styles.activeTrayCard,
                  {
                    backgroundColor: theme.colors.bgElevated
                  }
                ]}
                onPress={() => {
                  if (isSelected) {
                    setActivePiece(null);
                    setToastMessage(null);
                  } else {
                    audioHaptics.triggerPickup();
                    setActivePiece(piece);
                    setToastMessage({
                      text: '🎨 조각을 집었습니다! 보드에서 들어갈 자리를 찾아 터치하거나 드래그하세요.',
                      type: 'info'
                    });
                  }
                }}
                // @ts-ignore 웹 네이티브 포인터 다운 드래그 지원
                onPointerDown={(e: any) => {
                  audioHaptics.triggerPickup();
                  setActivePiece(piece);
                  setDraggingPiece(piece);
                  const clientX = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
                  const clientY = e.clientY ?? (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
                  setDragCoords({ x: clientX, y: clientY });
                }}
              >
                <JigsawPieceView
                  piece={piece}
                  imageUrl={painting.imageUrl}
                  boardWidth={boardWidth}
                  boardHeight={boardHeight}
                  tabPadding={puzzleLayout.tabPadding}
                  mode="tray"
                  traySize={72}
                  isSelected={isSelected}
                />
                {piece.isEdge && <View style={styles.edgeDot} />}
                {isSelected && (
                  <View style={styles.snapBadge}>
                    <Text style={styles.snapBadgeText}>선택됨</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* 3D 공중 부유 드래그 조각 오버레이 (물리 관성 틸트 & 리얼 연체 그림자) */}
      {draggingPiece && dragCoords && (
        <View
          style={{
            position: 'absolute',
            left: dragCoords.x - (draggingPiece.width / 2 + puzzleLayout.tabPadding),
            top: dragCoords.y - (draggingPiece.height / 2 + puzzleLayout.tabPadding),
            zIndex: 9999,
            transform: [{ rotate: `${dragTilt}deg` }],
            pointerEvents: 'none'
          }}
        >
          <JigsawPieceView
            piece={draggingPiece}
            imageUrl={painting.imageUrl}
            boardWidth={boardWidth}
            boardHeight={boardHeight}
            tabPadding={puzzleLayout.tabPadding}
            mode="floating"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    justifyContent: 'space-between'
  },
  headerBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  activeBtn: {
    backgroundColor: 'rgba(212, 175, 55, 0.2)'
  },
  headerInfo: {
    flex: 1,
    marginHorizontal: 10
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  headerTitle: {
    fontWeight: 'bold'
  },
  streakBadge: {
    backgroundColor: 'rgba(243, 156, 18, 0.25)',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#f39c12'
  },
  streakBadgeText: {
    color: '#f5d76e',
    fontSize: 11,
    fontWeight: 'bold'
  },
  headerProgress: {
    marginTop: 2
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  toastBanner: {
    position: 'absolute',
    top: 56,
    left: 20,
    right: 20,
    zIndex: 999,
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 12
  },
  toastInfo: {
    backgroundColor: 'rgba(15, 30, 50, 0.94)',
    borderWidth: 1,
    borderColor: 'rgba(116, 192, 252, 0.5)'
  },
  toastSuccess: {
    backgroundColor: 'rgba(25, 35, 20, 0.95)',
    borderWidth: 1.5,
    borderColor: '#f5d76e'
  },
  toastError: {
    backgroundColor: 'rgba(45, 15, 15, 0.95)',
    borderWidth: 1.5,
    borderColor: '#ff6b6b'
  },
  toastText: {
    fontWeight: '600',
    textAlign: 'center'
  },
  boardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12
  },
  boardFrame: {
    borderRadius: 12,
    borderWidth: 8,
    borderColor: '#b38f4d',
    backgroundColor: '#0a0d14',
    shadowColor: '#d4af37',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.35,
    shadowRadius: 36,
    elevation: 20
  },
  trayActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.45)',
    backgroundColor: 'rgba(212, 175, 55, 0.12)'
  },
  trayActionText: {
    fontSize: 12,
    fontWeight: '600'
  },
  ghostImage: {
    position: 'absolute',
    opacity: 0.35
  },
  gridCell: {
    position: 'absolute',
    borderWidth: 0.5,
    borderColor: 'rgba(212, 175, 55, 0.15)'
  },
  placedPieceView: {
    position: 'absolute',
    overflow: 'hidden'
  },
  pieceBorderHighlight: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.25)'
  },
  trayWrapper: {
    borderTopWidth: 2,
    borderTopColor: 'rgba(212, 175, 55, 0.45)',
    paddingTop: 12,
    paddingBottom: 24,
    paddingHorizontal: 12
  },
  trayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  trayTitle: {
    fontWeight: 'bold'
  },
  edgeFilterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.35)'
  },
  activeEdgeBtn: {
    backgroundColor: '#f5d76e',
    borderColor: '#f5d76e'
  },
  edgeFilterText: {
    fontSize: 12,
    fontWeight: '600'
  },
  trayScrollList: {
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 6
  },
  trayPieceCard: {
    borderRadius: 16,
    borderWidth: 1.8,
    borderColor: 'rgba(212, 175, 55, 0.35)',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
    minWidth: 88,
    minHeight: 88,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8
  },
  activeTrayCard: {
    borderColor: '#ffd700',
    backgroundColor: 'rgba(243, 156, 18, 0.22)',
    transform: [{ scale: 1.1 }],
    shadowColor: '#ffd700',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.85,
    shadowRadius: 18,
    elevation: 16
  },
  snapBadge: {
    position: 'absolute',
    bottom: 3,
    backgroundColor: '#ffd700',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8
  },
  snapBadgeText: {
    color: '#0b0e14',
    fontSize: 10,
    fontWeight: 'bold'
  },
  edgeDot: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#f5d76e'
  },
  floatingPieceOverlay: {
    position: 'absolute',
    zIndex: 99999,
    pointerEvents: 'none'
  }
});
