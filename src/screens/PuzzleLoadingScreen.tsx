// 시네마틱 이젤 거치 & 게임 진입 전환 화면 (PuzzleLoadingScreen.tsx)
// 캔버스가 이젤 위에 놓이고 조명이 켜지며 명화 복원 작업으로 몰입시키는 전환 연출

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  Easing
} from 'react-native';
import { Painting, DifficultyLevel } from '../types';
import { useAppTheme } from '../context/ThemeContext';
import { getSafeImageUrl } from '../utils/imageUrl';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  painting: Painting;
  difficulty: DifficultyLevel;
  onReady: () => void;
}

const QUOTES: Record<string, string> = {
  'starry-night': '“별을 바라보는 것은 언제나 나를 꿈꾸게 만든다.” — 빈센트 반 고흐',
  'pearl-earring': '“빛은 고요한 어둠 속에서 가장 순수한 진실을 드러낸다.” — 요하네스 페르메이르',
  'the-kiss': '“진정한 예술은 당신의 영혼에 숨겨진 가장 찬란한 황금빛이다.” — 구스타프 클림트',
  'water-lilies': '“빛은 시시각각 변하며 자연의 모든 사물에 영혼을 불어넣는다.” — 클로드 모네',
  'mona-lisa': '“세밀함이 완벽함을 만들고, 완벽함은 결코 사소하지 않다.” — 레오나르도 다 빈치',
  'the-great-wave': '“거대한 파도 속에서도 후지산은 흔들림 없이 그 자리에 서 있다.” — 가츠시카 호쿠사이'
};

export const PuzzleLoadingScreen: React.FC<Props> = ({
  painting,
  difficulty,
  onReady
}) => {
  const { theme } = useAppTheme();
  const screenWidth = Dimensions.get('window').width;

  // 애니메이션 변수들
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const canvasScaleAnim = useRef(new Animated.Value(0.85)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const glowPulseAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    // 1. 화면 및 캔버스 스케일 페이드 인
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.spring(canvasScaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true
      })
    ]).start();

    // 2. 골드 광채 펄스
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowPulseAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true
        }),
        Animated.timing(glowPulseAnim, {
          toValue: 0.5,
          duration: 900,
          useNativeDriver: true
        })
      ])
    ).start();

    // 3. 복원 준비 프로그레스 바 (1.8초 동안 진행 후 전환)
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 1800,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false
    }).start(() => {
      // 짧은 페이드 아웃 후 게임 화면으로 진입
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }).start(() => {
        onReady();
      });
    });
  }, [painting, difficulty]);

  const pieceCount = difficulty === '25' ? '25' : difficulty === '100' ? '100' : '400';
  const quote = QUOTES[painting.id] || `“${painting.title}의 흩어진 조각들을 맞추어 찬란한 색채를 되살립니다.”`;

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  });

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* 핀 조명 배경 효과 */}
      <View style={styles.spotlightCircle} />

      <View style={styles.centerStage}>
        {/* 상단 무대 타이틀 */}
        <View style={styles.stageHeader}>
          <View style={styles.easelBadge}>
            <Ionicons name="easel-outline" size={16} color="#d4af37" />
            <Text style={styles.easelBadgeText}>L’ATELIER EASEL SETUP</Text>
          </View>
          <Text style={[styles.statusTitle, { fontSize: theme.typography.h2 }]}>
            명화 복원 작업을 준비합니다
          </Text>
        </View>

        {/* 이젤 위 캔버스 등장 연출 */}
        <Animated.View
          style={[
            styles.canvasCard,
            {
              transform: [{ scale: canvasScaleAnim }],
              width: Math.min(screenWidth * 0.82, 380)
            }
          ]}
        >
          <View style={styles.canvasFrame}>
            <Image
              source={{ uri: getSafeImageUrl(painting.imageUrl) }}
              style={styles.canvasImage}
              resizeMode="cover"
            />
            {/* 캔버스 거치 흑백/세피아 블렌드 효과 */}
            <Animated.View
              style={[
                styles.glowBorder,
                { opacity: glowPulseAnim }
              ]}
            />
          </View>

          {/* 명화 및 난이도 스펙 */}
          <View style={styles.metaRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.paintingTitle} numberOfLines={1}>
                {painting.title}
              </Text>
              <Text style={styles.painterName}>
                {painting.painter.name} ({painting.year})
              </Text>
            </View>

            <View style={styles.pieceBadge}>
              <Ionicons name="grid" size={13} color="#07090e" />
              <Text style={styles.pieceBadgeText}>{pieceCount} 조각</Text>
            </View>
          </View>
        </Animated.View>

        {/* 거장의 명언 / 도슨트 인트로 */}
        <View style={styles.quoteWrapper}>
          <Ionicons name="sparkles" size={16} color="#d4af37" />
          <Text style={[styles.quoteText, { fontSize: theme.typography.caption }]}>
            {quote}
          </Text>
        </View>

        {/* 하단 준비 프로그레스 바 */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBarBg}>
            <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
          </View>
          <Text style={styles.progressLabel}>
            이젤에 캔버스를 고정하고 조각을 섞는 중...
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07090e',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24
  },
  spotlightCircle: {
    position: 'absolute',
    width: 380,
    height: 380,
    borderRadius: 190,
    backgroundColor: 'rgba(212, 175, 55, 0.08)',
    top: '20%'
  },
  centerStage: {
    width: '100%',
    alignItems: 'center',
    gap: 22
  },
  stageHeader: {
    alignItems: 'center',
    gap: 6
  },
  easelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: 'rgba(212, 175, 55, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)'
  },
  easelBadgeText: {
    color: '#d4af37',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1.5
  },
  statusTitle: {
    color: '#ffffff',
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 0.5
  },
  canvasCard: {
    backgroundColor: '#111622',
    borderRadius: 20,
    padding: 12,
    borderWidth: 2,
    borderColor: 'rgba(212, 175, 55, 0.4)',
    shadowColor: '#d4af37',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12
  },
  canvasFrame: {
    aspectRatio: 16 / 10,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative'
  },
  canvasImage: {
    width: '100%',
    height: '100%'
  },
  glowBorder: {
    ...StyleSheet.absoluteFill,
    borderWidth: 2,
    borderColor: '#d4af37',
    borderRadius: 14
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingHorizontal: 4
  },
  paintingTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  painterName: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 2
  },
  pieceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#d4af37',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8
  },
  pieceBadgeText: {
    color: '#07090e',
    fontWeight: 'bold',
    fontSize: 11
  },
  quoteWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    maxWidth: 380
  },
  quoteText: {
    color: '#cbd5e1',
    fontStyle: 'italic',
    textAlign: 'center',
    flex: 1
  },
  progressContainer: {
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
    gap: 8,
    marginTop: 6
  },
  progressBarBg: {
    width: '100%',
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#d4af37',
    borderRadius: 3
  },
  progressLabel: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '500'
  }
});
