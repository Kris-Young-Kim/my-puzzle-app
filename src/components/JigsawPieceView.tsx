// 명품 원목 직소 퍼즐 조각 뷰 (고해상도 3D 레이저 커팅 베벨 & 유광 림 & 심도 그림자)
import React, { useMemo } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Svg, {
  Defs,
  ClipPath,
  Path,
  Image as SvgImage,
  G,
  LinearGradient,
  RadialGradient,
  Stop
} from 'react-native-svg';
import { PuzzlePiece } from '../types';
import { buildJigsawPieceSVGPath } from '../engine/jigsawGenerator';

interface Props {
  piece: PuzzlePiece;
  imageUrl: string;
  boardWidth: number;
  boardHeight: number;
  tabPadding: number;
  mode?: 'board' | 'tray' | 'floating';
  traySize?: number;
  isSelected?: boolean;
  isJustPlaced?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const JigsawPieceView: React.FC<Props> = ({
  piece,
  imageUrl,
  boardWidth,
  boardHeight,
  tabPadding,
  mode = 'board',
  traySize = 78,
  isSelected = false,
  isJustPlaced = false,
  style
}) => {
  const svgTotalWidth = piece.width + 2 * tabPadding;
  const svgTotalHeight = piece.height + 2 * tabPadding;

  // 조각의 고유 베지에 외곽선 SVG path
  const piecePath = useMemo(() => {
    return buildJigsawPieceSVGPath(piece.width, piece.height, tabPadding, piece.edges);
  }, [piece.width, piece.height, tabPadding, piece.edges]);

  // 고유 그래디언트 및 클립 ID
  const clipId = `clip-${piece.id}-${mode}`;
  const bevelGradId = `bevel-grad-${piece.id}-${mode}`;
  const shadowGradId = `shadow-grad-${piece.id}-${mode}`;

  if (mode === 'floating') {
    // 3D 공중 부유 모드: 드래그 중인 원목 조각 (4mm 입체 측면 단면 + 깊은 연체 그림자 + 표면 바니시 광택)
    return (
      <View
        style={[
          styles.floatingContainer,
          {
            width: svgTotalWidth + 12,
            height: svgTotalHeight + 16
          },
          style
        ]}
        pointerEvents="none"
      >
        <Svg
          width={svgTotalWidth + 12}
          height={svgTotalHeight + 16}
          viewBox={`0 0 ${svgTotalWidth + 12} ${svgTotalHeight + 16}`}
        >
          <Defs>
            <ClipPath id={clipId}>
              <Path d={piecePath} />
            </ClipPath>
            {/* 3D 사선 입체 조명 그래디언트 */}
            <LinearGradient id={bevelGradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
              <Stop offset="40%" stopColor="#f5d76e" stopOpacity="0.4" />
              <Stop offset="70%" stopColor="#1a120b" stopOpacity="0.6" />
              <Stop offset="100%" stopColor="#080503" stopOpacity="0.9" />
            </LinearGradient>
          </Defs>

          {/* 1. 바닥에 드리운 부드럽고 묵직한 3D 연체 그림자 */}
          <Path
            d={piecePath}
            fill="rgba(0, 0, 0, 0.55)"
            transform="translate(6, 12)"
          />

          {/* 2. 레이저 커팅 자작나무 측면 단면 (3D Extrusion Layers) */}
          <Path
            d={piecePath}
            fill="#1d140a"
            stroke="#120c06"
            strokeWidth={1.2}
            transform="translate(0, 4.5)"
          />
          <Path
            d={piecePath}
            fill="#2c1e10"
            stroke="#1d140a"
            strokeWidth={1}
            transform="translate(0, 2.5)"
          />
          <Path
            d={piecePath}
            fill="#3d2a17"
            stroke="#2c1e10"
            strokeWidth={0.8}
            transform="translate(0, 1.0)"
          />

          {/* 3. 명화 전면 텍스처 (클리핑) */}
          <G transform="translate(0, 0)">
            <SvgImage
              href={imageUrl}
              x={-piece.targetX + tabPadding}
              y={-piece.targetY + tabPadding}
              width={boardWidth}
              height={boardHeight}
              clipPath={`url(#${clipId})`}
              preserveAspectRatio="none"
            />
          </G>

          {/* 4. 표면 바니시 광택 & 3D 베벨 림 */}
          <Path
            d={piecePath}
            fill="none"
            stroke={`url(#${bevelGradId})`}
            strokeWidth={2.4}
          />

          {/* 5. 외부 샴페인 골드 오라 (드래그 조작 림) */}
          <Path
            d={piecePath}
            fill="none"
            stroke="#ffd700"
            strokeWidth={1.6}
            strokeOpacity={0.85}
          />
        </Svg>
      </View>
    );
  }

  if (mode === 'tray') {
    // 트레이 모드: 벨벳 쿠션 위에 놓인 명품 미니어처 조각
    const maxDim = Math.max(svgTotalWidth, svgTotalHeight);
    const scale = (traySize - 14) / maxDim;
    const renderWidth = svgTotalWidth * scale;
    const renderHeight = svgTotalHeight * scale;

    return (
      <View style={[styles.trayContainer, { width: traySize, height: traySize }, style]}>
        <Svg
          width={renderWidth}
          height={renderHeight}
          viewBox={`0 0 ${svgTotalWidth} ${svgTotalHeight}`}
          style={styles.svgShadow}
        >
          <Defs>
            <ClipPath id={clipId}>
              <Path d={piecePath} />
            </ClipPath>
            <LinearGradient id={bevelGradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#fff8e7" stopOpacity="0.8" />
              <Stop offset="50%" stopColor="#d4af37" stopOpacity="0.3" />
              <Stop offset="100%" stopColor="#140d06" stopOpacity="0.8" />
            </LinearGradient>
          </Defs>

          {/* 벨벳 바닥 그림자 */}
          <Path
            d={piecePath}
            fill="rgba(0, 0, 0, 0.6)"
            transform="translate(2, 3)"
          />

          {/* 측면 목재 두께 */}
          <Path
            d={piecePath}
            fill="#2c1e10"
            transform="translate(0, 1.8)"
          />

          {/* 명화 텍스처 */}
          <SvgImage
            href={imageUrl}
            x={-piece.targetX + tabPadding}
            y={-piece.targetY + tabPadding}
            width={boardWidth}
            height={boardHeight}
            clipPath={`url(#${clipId})`}
            preserveAspectRatio="none"
          />

          {/* 3D 엠보싱 베벨 테두리 */}
          <Path
            d={piecePath}
            fill="none"
            stroke={`url(#${bevelGradId})`}
            strokeWidth={isSelected ? 3.0 : 1.8}
          />
          {isSelected && (
            <Path
              d={piecePath}
              fill="none"
              stroke="#ffd700"
              strokeWidth={2.0}
            />
          )}
        </Svg>
      </View>
    );
  }

  // 보드 모드: 보드 위 1:1 체결 조각 (리얼 접촉 칼선 음영 + 3D 베벨 + 방금 맞춘 번쩍임 이펙트)
  return (
    <View
      style={[
        styles.boardContainer,
        {
          left: piece.targetX - tabPadding,
          top: piece.targetY - tabPadding,
          width: svgTotalWidth,
          height: svgTotalHeight
        },
        style
      ]}
      pointerEvents="none"
    >
      <Svg
        width={svgTotalWidth}
        height={svgTotalHeight}
        viewBox={`0 0 ${svgTotalWidth} ${svgTotalHeight}`}
      >
        <Defs>
          <ClipPath id={clipId}>
            <Path d={piecePath} />
          </ClipPath>
          <LinearGradient id={bevelGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
            <Stop offset="30%" stopColor="#f5e6b8" stopOpacity="0.35" />
            <Stop offset="70%" stopColor="#1a120b" stopOpacity="0.55" />
            <Stop offset="100%" stopColor="#0a0603" stopOpacity="0.85" />
          </LinearGradient>
        </Defs>

        {/* 조각 아래 깊은 칼선 접촉 음영 (Deep Seam Contact Shadow) */}
        <Path
          d={piecePath}
          fill="none"
          stroke="rgba(8, 5, 2, 0.75)"
          strokeWidth={2.4}
        />

        {/* 명화 원화 클리핑 */}
        <SvgImage
          href={imageUrl}
          x={-piece.targetX + tabPadding}
          y={-piece.targetY + tabPadding}
          width={boardWidth}
          height={boardHeight}
          clipPath={`url(#${clipId})`}
          preserveAspectRatio="none"
        />

        {/* 3D 입체 베벨: 빛과 그림자가 그라데이션으로 흐르는 자연스러운 림 */}
        <Path
          d={piecePath}
          fill="none"
          stroke={`url(#${bevelGradId})`}
          strokeWidth={1.8}
        />

        {/* 미세한 칼선 그루브 (수제 레이저 컷의 미세한 틈새) */}
        <Path
          d={piecePath}
          fill="none"
          stroke="rgba(25, 18, 10, 0.45)"
          strokeWidth={0.9}
        />

        {/* 방금 체결되었을 때의 황금빛 이음새 펄스 (Just Placed Glow) */}
        {isJustPlaced && (
          <Path
            d={piecePath}
            fill="none"
            stroke="#ffd700"
            strokeWidth={3.5}
            strokeOpacity={0.9}
          />
        )}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  boardContainer: {
    position: 'absolute'
  },
  trayContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  floatingContainer: {
    position: 'absolute',
    zIndex: 99999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.7,
    shadowRadius: 28,
    elevation: 35
  },
  svgShadow: {
    overflow: 'visible'
  }
});
