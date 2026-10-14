// 시네마틱 메인 타이틀 & 인트로 화면 (TitleScreen.tsx)
// 게임 요소를 접목한 초호화 모션 그래픽, 타이포그래피, 앰비언트 비디오, 미니 퍼즐 복원 인터랙션

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  Easing,
  Platform
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useAppTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';
import { audioHaptics } from '../services/audioHaptics';
import { StorageService } from '../services/storage';

interface Props {
  onEnterMuseum: () => void;
  onWatchPrologue: () => void;
  onGoToVirtualMuseum: () => void;
  onGoToSettings: () => void;
  onOpenAuth: () => void;
  onGoToShop?: () => void;
}

// 타이틀 쇼케이스 명화 프리셋 (각 거장의 독창적 색채 & 서사)
const SHOWCASE_PAINTINGS = [
  {
    id: 'starry-night',
    title: '별이 빛나는 밤',
    artist: '빈센트 반 고흐',
    year: '1889',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
    themeColor: '#3b82f6',
    goldAccent: '#f59e0b',
    quote: '“나는 별을 볼 때마다 언제나 꿈을 꾼다.”'
  },
  {
    id: 'the-kiss',
    title: '키스 (The Kiss)',
    artist: '구스타프 클림트',
    year: '1908',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg/1200px-The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg',
    themeColor: '#eab308',
    goldAccent: '#fef08a',
    quote: '“진정한 사랑과 찬란한 황금빛이 머무는 순간.”'
  },
  {
    id: 'pearl-earring',
    title: '진주 귀걸이를 한 소녀',
    artist: '요하네스 페르메이르',
    year: '1665',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/960px-1665_Girl_with_a_Pearl_Earring.jpg',
    themeColor: '#0ea5e9',
    goldAccent: '#fde047',
    quote: '“단 두 번의 붓질로 빚어낸 영원한 빛의 마술.”'
  },
  {
    id: 'water-lilies',
    title: '수련 연못',
    artist: '클로드 모네',
    year: '1906',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg/960px-Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg',
    themeColor: '#10b981',
    goldAccent: '#6ee7b7',
    quote: '“빛과 물결의 영원한 대화를 캔버스에 담다.”'
  }
];

// 우주 / 밤하늘 / 빛의 심연을 연상시키는 안정적인 앰비언트 비디오 소스
const AMBIENT_VIDEO_URL = 'https://vjs.zencdn.net/v/oceans.mp4';

// 떠다니는 파티클 수
const PARTICLE_COUNT = 16;

export const TitleScreen: React.FC<Props> = ({
  onEnterMuseum,
  onWatchPrologue,
  onGoToVirtualMuseum,
  onGoToSettings,
  onOpenAuth,
  onGoToShop
}) => {
  const { theme, seniorMode, toggleSeniorMode } = useAppTheme();
  const { user, isSignedIn } = useUser();
  const screenWidth = Dimensions.get('window').width;

  // 현재 쇼케이스 명화 인덱스
  const [selectedArtIdx, setSelectedArtIdx] = useState(0);
  const activeArt = SHOWCASE_PAINTINGS[selectedArtIdx];

  // 🧩 게임 요소: 미니 퍼즐 조각 복원 상태
  const [isPieceRestored, setIsPieceRestored] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);

  // 진행도 집계 (복원 명화 수 초기화)
  const [completedCount] = useState(() => {
    try {
      const allProgress = StorageService.getAllProgress();
      return Object.values(allProgress).filter((p) => p && p.isCompleted).length;
    } catch {
      return 0;
    }
  });

  // 애니메이션 제어 값들 (React 19 컴파일러 규칙 준수)
  const [fadeAnim] = useState(() => new Animated.Value(0));
  const [pulseAnim] = useState(() => new Animated.Value(1));
  const [frameFloatAnim] = useState(() => new Animated.Value(0));
  const [auraRotateAnim] = useState(() => new Animated.Value(0));
  const [shimmerAnim] = useState(() => new Animated.Value(-1));
  const [pieceSpringAnim] = useState(() => new Animated.Value(0));
  const [restoreFlashAnim] = useState(() => new Animated.Value(0));
  const [artSwitchFadeAnim] = useState(() => new Animated.Value(1));

  // 모션 그래픽: 황금빛 부유 파티클 (정적 결정론적 값으로 순수성 보장)
  const [particles] = useState(() =>
    Array.from({ length: PARTICLE_COUNT }).map((_, i) => ({
      y: new Animated.Value(0),
      x: (i * (screenWidth / PARTICLE_COUNT) + ((i % 3) * 6 - 6)),
      size: (i % 3) + 2.5,
      delay: i * 380,
      duration: 4200 + (i % 4) * 800,
      opacity: 0.35 + (i % 5) * 0.1
    }))
  );

  useEffect(() => {
    // 1. 전체 화면 시네마틱 페이드인
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();

    // 2. 스타트 버튼 네온 펄스 애니메이션 (호흡하듯 은은한 펄스)
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.06,
          duration: 1400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        }),
        Animated.timing(pulseAnim, {
          toValue: 1.0,
          duration: 1400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        })
      ])
    ).start();

    // 3. 액자 3D 부유 틸트 모션
    Animated.loop(
      Animated.sequence([
        Animated.timing(frameFloatAnim, {
          toValue: -8,
          duration: 2800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true
        }),
        Animated.timing(frameFloatAnim, {
          toValue: 8,
          duration: 2800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true
        })
      ])
    ).start();

    // 4. 후광 링 회전
    Animated.loop(
      Animated.timing(auraRotateAnim, {
        toValue: 1,
        duration: 24000,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start();

    // 5. 타이틀 골드 쉬머 광채
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 2600,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true
        }),
        Animated.delay(1200)
      ])
    ).start();

    // 6. 파티클 수직 상승 루프
    particles.forEach((p) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(p.delay),
          Animated.timing(p.y, {
            toValue: -650,
            duration: p.duration,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true
          }),
          Animated.timing(p.y, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true
          })
        ])
      ).start();
    });
  }, []);

  // 🧩 게임 요소: 미니 퍼즐 조각 터치 복원 인터랙션
  const handleSnapPiece = () => {
    if (isPieceRestored) return;

    // 사운드 & 햅틱 트리거
    audioHaptics.triggerSnap(3);

    // 복원 플래시 + 조각 스냅 스프링 애니메이션
    Animated.parallel([
      Animated.spring(pieceSpringAnim, {
        toValue: 1,
        tension: 120,
        friction: 8,
        useNativeDriver: true
      }),
      Animated.sequence([
        Animated.timing(restoreFlashAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true
        }),
        Animated.timing(restoreFlashAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true
        })
      ])
    ]).start(() => {
      setIsPieceRestored(true);
      // 승리 아르페지오 사운드
      audioHaptics.triggerVictory();
    });
  };

  // 명화 쇼케이스 전환
  const handleSelectArt = (idx: number) => {
    if (idx === selectedArtIdx) return;
    audioHaptics.triggerPickup();

    Animated.sequence([
      Animated.timing(artSwitchFadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true
      }),
      Animated.timing(artSwitchFadeAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true
      })
    ]).start();

    setSelectedArtIdx(idx);
    // 새 명화 선택 시 다시 복원 손맛을 즐길 수 있도록 리셋
    setIsPieceRestored(false);
    pieceSpringAnim.setValue(0);
  };

  // 게임 시작 (복원하지 않은 상태라도 자동 스냅 후 진입)
  const handleStartGame = () => {
    if (!isPieceRestored) {
      handleSnapPiece();
      setTimeout(() => {
        onEnterMuseum();
      }, 550);
    } else {
      audioHaptics.triggerPickup();
      onEnterMuseum();
    }
  };

  const auraSpin = auraRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* 1. 배경 시네마틱 비디오 (Web/iOS/Android 최적화) */}
      {isVideoEnabled && (
        <View style={StyleSheet.absoluteFill}>
          <Video
            source={{ uri: AMBIENT_VIDEO_URL }}
            rate={1.0}
            volume={0}
            isMuted={true}
            resizeMode={ResizeMode.COVER}
            shouldPlay
            isLooping
            style={StyleSheet.absoluteFill}
          />
        </View>
      )}

      {/* 2. 다크 럭셔리 비네팅 & 컬러 앰비언트 그라데이션 */}
      <View style={[styles.ambientGradientOverlay, { backgroundColor: 'rgba(7, 9, 14, 0.82)' }]} />
      <View
        style={[
          styles.glowOrb,
          {
            backgroundColor: activeArt.themeColor,
            opacity: 0.18,
            top: 100,
            left: screenWidth * 0.15
          }
        ]}
      />

      {/* 3. 모션 그래픽: 화면 가득 피어오르는 황금 파티클 */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {particles.map((p, idx) => (
          <Animated.View
            key={idx}
            style={[
              styles.particle,
              {
                left: p.x,
                width: p.size,
                height: p.size,
                borderRadius: p.size / 2,
                opacity: p.opacity,
                backgroundColor: activeArt.goldAccent,
                transform: [{ translateY: p.y }]
              }
            ]}
          />
        ))}
      </View>

      {/* 4. 상단 네비게이션 & 복원가 랭크 허브 */}
      <View style={styles.topBar}>
        {/* 복원가 칭호 & 레벨 칩 */}
        <View style={styles.artisanBadge}>
          <Ionicons name="shield-checkmark" size={14} color="#d4af37" />
          <View>
            <Text style={styles.artisanTitle}>
              {completedCount > 10 ? '대마스터 복원가' : completedCount > 0 ? '수습 복원가' : '아틀리에 입문자'}
            </Text>
            <Text style={styles.artisanSub}>복원 완료 {completedCount} / 100</Text>
          </View>
        </View>

        {/* 우측 퀵 컨트롤 액션들 */}
        <View style={styles.topActions}>
          {/* 비디오 배경 토글 */}
          <TouchableOpacity
            style={[styles.iconPill, isVideoEnabled && styles.activePill]}
            onPress={() => setIsVideoEnabled(!isVideoEnabled)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isVideoEnabled ? 'videocam' : 'videocam-off-outline'}
              size={15}
              color={isVideoEnabled ? '#07090e' : '#cbd5e1'}
            />
            <Text style={[styles.pillText, { color: isVideoEnabled ? '#07090e' : '#cbd5e1' }]}>
              {isVideoEnabled ? '영상 ON' : '영상 OFF'}
            </Text>
          </TouchableOpacity>

          {/* 시니어 모드 원터치 */}
          <TouchableOpacity
            style={[styles.iconPill, seniorMode && styles.activePill]}
            onPress={toggleSeniorMode}
            activeOpacity={0.7}
          >
            <Ionicons name="glasses-outline" size={15} color={seniorMode ? '#07090e' : '#cbd5e1'} />
            <Text style={[styles.pillText, { color: seniorMode ? '#07090e' : '#cbd5e1' }]}>
              {seniorMode ? '시니어 ON' : '시니어'}
            </Text>
          </TouchableOpacity>

          {/* 로그인 프로필 */}
          {isSignedIn ? (
            <TouchableOpacity style={styles.userChip} onPress={onOpenAuth}>
              {user?.imageUrl ? (
                <Image source={{ uri: user.imageUrl }} style={styles.miniAvatar} />
              ) : (
                <Ionicons name="person-circle" size={18} color="#d4af37" />
              )}
              <Text style={styles.userChipText} numberOfLines={1}>
                {user?.firstName || '회원'}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.loginChip} onPress={onOpenAuth}>
              <Ionicons name="person-circle-outline" size={15} color="#d4af37" />
              <Text style={styles.loginChipText}>로그인</Text>
            </TouchableOpacity>
          )}

          {/* 설정 버튼 */}
          <TouchableOpacity style={styles.iconCircleBtn} onPress={onGoToSettings}>
            <Ionicons name="settings-outline" size={18} color="#94a3b8" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 5. 중앙 게임 요소 & 시네마틱 명화 캔버스 */}
      <View style={styles.centerContent}>
        {/* AAA 게임 타이틀 타이포그래피 */}
        <View style={styles.typographyBlock}>
          <View style={styles.eyebrowRow}>
            <View style={styles.eyebrowLine} />
            <Text style={styles.eyebrowText}>✦ MASTERPIECE RESTORATION ✦</Text>
            <View style={styles.eyebrowLine} />
          </View>

          <Text style={[styles.mainBrandLogo, { fontSize: theme.typography.h1 * 1.35 }]}>
            L’ATELIER DES MAÎTRES
          </Text>

          <Text style={[styles.koreanTitle, { fontSize: theme.typography.h2 }]}>
            시간을 잊은 명화 아틀리에
          </Text>

          <Text style={styles.poeticQuote}>{activeArt.quote}</Text>
        </View>

        {/* 🎨 인터랙티브 명화 쇼케이스 & 미니 퍼즐 복원 프레임 */}
        <Animated.View
          style={[
            styles.frameWrapper,
            {
              transform: [{ translateY: frameFloatAnim }],
              width: Math.min(screenWidth * 0.84, 380)
            }
          ]}
        >
          {/* 회전하는 신비로운 황금빛 후광 링 */}
          <Animated.View
            style={[
              styles.rotatingAuraRing,
              {
                borderColor: activeArt.goldAccent,
                transform: [{ rotate: auraSpin }]
              }
            ]}
          />

          <View style={[styles.ornateFrame, { borderColor: activeArt.goldAccent }]}>
            <Animated.View style={[StyleSheet.absoluteFill, { opacity: artSwitchFadeAnim }]}>
              <Image
                source={{ uri: activeArt.imageUrl }}
                style={styles.heroArtwork}
                resizeMode="cover"
              />
            </Animated.View>

            {/* 캔버스 음영 필터 */}
            <View style={styles.canvasVignette} />

            {/* 🧩 게임 요소: 중앙 결손 퍼즐 슬롯 & 스냅 인터랙션 */}
            <View style={styles.puzzleSlotContainer}>
              {/* 결손 슬롯 가이드 (복원 전: 점선 홀로그램, 복원 후: 황금 빛) */}
              <View
                style={[
                  styles.missingPieceHole,
                  isPieceRestored && styles.restoredPieceBorder
                ]}
              >
                {!isPieceRestored ? (
                  <View style={styles.missingGlitch}>
                    <Ionicons name="sparkles" size={16} color="#fbbf24" />
                    <Text style={styles.missingText}>조각 분실</Text>
                  </View>
                ) : (
                  <Animated.View
                    style={[
                      styles.restoredSeal,
                      {
                        opacity: pieceSpringAnim
                      }
                    ]}
                  >
                    <Ionicons name="checkmark-circle" size={20} color="#fbbf24" />
                    <Text style={styles.restoredSealText}>복원 완료</Text>
                  </Animated.View>
                )}
              </View>
            </View>

            {/* 복원 성공 시 번쩍이는 황금빛 쇼크웨이브 플래시 */}
            <Animated.View
              pointerEvents="none"
              style={[
                styles.flashOverlay,
                {
                  opacity: restoreFlashAnim,
                  backgroundColor: activeArt.goldAccent
                }
              ]}
            />

            {/* 하단 명화 메타 정보 */}
            <View style={styles.artBadgeBar}>
              <View>
                <Text style={styles.artTitleText}>{activeArt.title}</Text>
                <Text style={styles.artistNameText}>
                  {activeArt.artist} ({activeArt.year})
                </Text>
              </View>
              <View style={[styles.statusPill, isPieceRestored && styles.statusPillSuccess]}>
                <Ionicons
                  name={isPieceRestored ? 'shield-checkmark' : 'hammer-outline'}
                  size={12}
                  color={isPieceRestored ? '#07090e' : '#fbbf24'}
                />
                <Text
                  style={[
                    styles.statusPillText,
                    isPieceRestored && { color: '#07090e' }
                  ]}
                >
                  {isPieceRestored ? '100% 완벽 복원' : '복원 인터랙션'}
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* 🧩 인터랙티브 미니 퍼즐 복원 핸들러 (조각을 터치해 맞춰보세요) */}
        {!isPieceRestored ? (
          <TouchableOpacity
            style={styles.floatingPuzzlePieceBtn}
            onPress={handleSnapPiece}
            activeOpacity={0.8}
          >
            <View style={styles.pieceGlowPulse} />
            <View style={styles.pieceContent}>
              <Ionicons name="extension-puzzle" size={18} color="#07090e" />
              <Text style={styles.piecePromptText}>
                ✦ 터치하여 결손 조각 복원하기 (손맛 체험)
              </Text>
              <Ionicons name="finger-print" size={16} color="#07090e" />
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.restoredBanner}>
            <Ionicons name="sparkles" size={14} color="#d4af37" />
            <Text style={styles.restoredBannerText}>
              거장의 붓결이 살아났습니다! 이제 모험을 시작하세요.
            </Text>
          </View>
        )}

        {/* 거장 명화 셀렉터 탭 (반 고흐 / 클림트 / 페르메이르 / 모네) */}
        <View style={styles.selectorRow}>
          {SHOWCASE_PAINTINGS.map((art, idx) => {
            const isSelected = selectedArtIdx === idx;
            return (
              <TouchableOpacity
                key={art.id}
                style={[
                  styles.selectorTab,
                  isSelected && {
                    borderColor: art.goldAccent,
                    backgroundColor: 'rgba(212, 175, 55, 0.22)'
                  }
                ]}
                onPress={() => handleSelectArt(idx)}
                activeOpacity={0.7}
              >
                <Image source={{ uri: art.imageUrl }} style={styles.selectorThumb} />
                <Text
                  style={[
                    styles.selectorName,
                    isSelected && { color: '#ffffff', fontWeight: 'bold' }
                  ]}
                  numberOfLines={1}
                >
                  {art.artist.split(' ')[0]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* 6. 하단 메인 액션 버튼 그룹 */}
        <View style={styles.actionGroup}>
          {/* 메인 게임 시작 버튼 (펄스 & 화려한 골드 네온) */}
          <Animated.View style={{ transform: [{ scale: pulseAnim }], width: '100%', maxWidth: 360 }}>
            <TouchableOpacity
              style={[
                styles.enterGameButton,
                { minHeight: theme.minTouchSize + 10 }
              ]}
              onPress={handleStartGame}
              activeOpacity={0.85}
            >
              <Ionicons name="color-palette" size={22} color="#07090e" />
              <Text style={[styles.enterGameButtonText, { fontSize: theme.typography.h3 }]}>
                {isPieceRestored ? '미술관 입장하기 (GAME START)' : '복원 시작 & 미술관 입장'}
              </Text>
              <Ionicons name="arrow-forward-circle" size={22} color="#07090e" />
            </TouchableOpacity>
          </Animated.View>

          {/* 보조 게임 모드 네비게이션 */}
          <View style={styles.secondaryActions}>
            <TouchableOpacity
              style={[styles.secondaryBtn, { minHeight: theme.minTouchSize }]}
              onPress={onWatchPrologue}
            >
              <Ionicons name="film-outline" size={16} color="#d4af37" />
              <Text style={styles.secondaryBtnText}>시네마틱 프롤로그</Text>
            </TouchableOpacity>

            <View style={styles.dividerDot} />

            <TouchableOpacity
              style={[styles.secondaryBtn, { minHeight: theme.minTouchSize }]}
              onPress={onGoToVirtualMuseum}
            >
              <Ionicons name="easel-outline" size={16} color="#d4af37" />
              <Text style={styles.secondaryBtnText}>가상 미술관</Text>
            </TouchableOpacity>

            {onGoToShop && (
              <>
                <View style={styles.dividerDot} />
                <TouchableOpacity
                  style={[styles.secondaryBtn, { minHeight: theme.minTouchSize }]}
                  onPress={onGoToShop}
                >
                  <Ionicons name="diamond-outline" size={16} color="#d4af37" />
                  <Text style={styles.secondaryBtnText}>명작 부티크</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>

      {/* 하단 헤리티지 라이선스 안내 */}
      <View style={styles.footerNote}>
        <Text style={styles.footerText}>
          사후 70년이 경과한 인류의 위대한 공공 명화 문화유산을 보존하고 복원합니다
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07090e',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16
  },
  ambientGradientOverlay: {
    ...StyleSheet.absoluteFill
  },
  glowOrb: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140
  },
  particle: {
    position: 'absolute',
    bottom: 20
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
    paddingTop: Platform.OS === 'android' ? 8 : 4
  },
  artisanBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
    backgroundColor: 'rgba(212, 175, 55, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.35)'
  },
  artisanTitle: {
    color: '#fbbf24',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5
  },
  artisanSub: {
    color: '#94a3b8',
    fontSize: 9,
    fontWeight: '600'
  },
  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  iconPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    backgroundColor: 'rgba(255, 255, 255, 0.08)'
  },
  activePill: {
    backgroundColor: '#fbbf24',
    borderColor: '#fbbf24'
  },
  pillText: {
    fontSize: 10,
    fontWeight: 'bold'
  },
  userChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#d4af37',
    backgroundColor: 'rgba(212, 175, 55, 0.15)'
  },
  miniAvatar: {
    width: 18,
    height: 18,
    borderRadius: 9
  },
  userChipText: {
    color: '#d4af37',
    fontSize: 10,
    fontWeight: 'bold',
    maxWidth: 55
  },
  loginChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
    backgroundColor: 'rgba(212, 175, 55, 0.12)'
  },
  loginChipText: {
    color: '#fbbf24',
    fontSize: 10,
    fontWeight: 'bold'
  },
  iconCircleBtn: {
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 12,
    zIndex: 5
  },
  typographyBlock: {
    alignItems: 'center',
    gap: 3
  },
  eyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  eyebrowLine: {
    width: 20,
    height: 1,
    backgroundColor: 'rgba(212, 175, 55, 0.4)'
  },
  eyebrowText: {
    color: '#fbbf24',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2
  },
  mainBrandLogo: {
    color: '#f59e0b',
    fontWeight: '900',
    letterSpacing: 2.5,
    textAlign: 'center',
    textShadowColor: 'rgba(245, 158, 11, 0.65)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 16
  },
  koreanTitle: {
    color: '#ffffff',
    fontWeight: '800',
    letterSpacing: 1.2,
    textAlign: 'center'
  },
  poeticQuote: {
    color: '#94a3b8',
    fontSize: 11,
    fontStyle: 'italic',
    marginTop: 2,
    textAlign: 'center',
    maxWidth: 320
  },
  frameWrapper: {
    aspectRatio: 16 / 10,
    borderRadius: 22,
    padding: 3,
    backgroundColor: 'rgba(212, 175, 55, 0.3)',
    shadowColor: '#d4af37',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.45,
    shadowRadius: 28,
    elevation: 14,
    position: 'relative'
  },
  rotatingAuraRing: {
    position: 'absolute',
    top: -12,
    left: -12,
    right: -12,
    bottom: -12,
    borderRadius: 30,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    opacity: 0.35
  },
  ornateFrame: {
    flex: 1,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 2,
    position: 'relative'
  },
  heroArtwork: {
    width: '100%',
    height: '100%'
  },
  canvasVignette: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(7, 9, 14, 0.22)'
  },
  puzzleSlotContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center'
  },
  missingPieceHole: {
    width: 72,
    height: 72,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fbbf24',
    borderStyle: 'dashed',
    backgroundColor: 'rgba(7, 9, 14, 0.72)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  restoredPieceBorder: {
    borderStyle: 'solid',
    borderColor: '#34d399',
    backgroundColor: 'rgba(52, 211, 153, 0.2)'
  },
  missingGlitch: {
    alignItems: 'center',
    gap: 2
  },
  missingText: {
    color: '#fbbf24',
    fontSize: 9,
    fontWeight: 'bold'
  },
  restoredSeal: {
    alignItems: 'center',
    gap: 2
  },
  restoredSealText: {
    color: '#fbbf24',
    fontSize: 9,
    fontWeight: 'bold'
  },
  flashOverlay: {
    ...StyleSheet.absoluteFill
  },
  artBadgeBar: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(7, 9, 14, 0.88)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.35)'
  },
  artTitleText: {
    color: '#fbbf24',
    fontSize: 11,
    fontWeight: 'bold'
  },
  artistNameText: {
    color: '#cbd5e1',
    fontSize: 9
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(245, 158, 11, 0.18)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.4)'
  },
  statusPillSuccess: {
    backgroundColor: '#34d399',
    borderColor: '#34d399'
  },
  statusPillText: {
    color: '#fbbf24',
    fontSize: 9,
    fontWeight: 'bold'
  },
  floatingPuzzlePieceBtn: {
    backgroundColor: '#fbbf24',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    shadowColor: '#fbbf24',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 14,
    elevation: 8,
    position: 'relative'
  },
  pieceGlowPulse: {
    ...StyleSheet.absoluteFill,
    borderRadius: 20,
    backgroundColor: '#fbbf24',
    opacity: 0.25
  },
  pieceContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  piecePromptText: {
    color: '#07090e',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.3
  },
  restoredBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(52, 211, 153, 0.15)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.4)'
  },
  restoredBannerText: {
    color: '#34d399',
    fontSize: 11,
    fontWeight: 'bold'
  },
  selectorRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 2
  },
  selectorTab: {
    alignItems: 'center',
    padding: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    width: 64
  },
  selectorThumb: {
    width: 44,
    height: 30,
    borderRadius: 6
  },
  selectorName: {
    color: '#94a3b8',
    fontSize: 9,
    marginTop: 3
  },
  actionGroup: {
    width: '100%',
    alignItems: 'center',
    gap: 10,
    marginTop: 4
  },
  enterGameButton: {
    backgroundColor: '#fbbf24',
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 24,
    paddingVertical: 14,
    shadowColor: '#fbbf24',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.55,
    shadowRadius: 20,
    elevation: 10
  },
  enterGameButtonText: {
    color: '#07090e',
    fontWeight: '900',
    letterSpacing: 0.8
  },
  secondaryActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14
  },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 6,
    paddingHorizontal: 6
  },
  secondaryBtnText: {
    color: '#cbd5e1',
    fontWeight: '600',
    fontSize: 12
  },
  dividerDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: 'rgba(255, 255, 255, 0.25)'
  },
  footerNote: {
    alignItems: 'center',
    marginTop: 4
  },
  footerText: {
    fontSize: 9,
    color: '#64748b',
    textAlign: 'center'
  }
});
