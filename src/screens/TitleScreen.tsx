// 시네마틱 메인 타이틀 화면 (TitleScreen.tsx)
// 게임의 몰입감을 극대화하는 밤의 미술관 게이트 및 시네마틱 입장 연출

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  Easing
} from 'react-native';
import { useAppTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';

interface Props {
  onEnterMuseum: () => void;
  onWatchPrologue: () => void;
  onGoToVirtualMuseum: () => void;
  onGoToSettings: () => void;
  onOpenAuth: () => void;
  onGoToShop?: () => void;
}

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

  // 애니메이션 값
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const frameFloatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. 전체 페이드 인
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true
    }).start();

    // 2. 메인 버튼 펄스 광채 애니메이션 (루프)
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        }),
        Animated.timing(pulseAnim, {
          toValue: 1.0,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        })
      ])
    ).start();

    // 3. 액자 은은한 부유 애니메이션
    Animated.loop(
      Animated.sequence([
        Animated.timing(frameFloatAnim, {
          toValue: -6,
          duration: 2500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true
        }),
        Animated.timing(frameFloatAnim, {
          toValue: 6,
          duration: 2500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true
        })
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim, backgroundColor: '#07090e' }]}>
      {/* 상단 앰비언트 유틸리티 바 */}
      <View style={styles.topBar}>
        <View style={styles.leftPill}>
          <Ionicons name="sparkles" size={14} color="#d4af37" />
          <Text style={[styles.pillText, { color: '#d4af37' }]}>L’ATELIER ARTISAN</Text>
        </View>

        <View style={styles.topActions}>
          {/* Clerk 로그인 버튼 */}
          {isSignedIn ? (
            <TouchableOpacity
              style={[styles.userChip, { minHeight: theme.minTouchSize }]}
              onPress={onOpenAuth}
            >
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
            <TouchableOpacity
              style={[styles.loginChip, { minHeight: theme.minTouchSize }]}
              onPress={onOpenAuth}
            >
              <Ionicons name="person-circle-outline" size={16} color="#d4af37" />
              <Text style={styles.loginChipText}>로그인</Text>
            </TouchableOpacity>
          )}

          {/* 시니어 모드 원터치 토글 */}
          <TouchableOpacity
            style={[styles.iconPill, seniorMode && styles.activeSeniorPill, { minHeight: theme.minTouchSize }]}
            onPress={toggleSeniorMode}
          >
            <Ionicons name="glasses-outline" size={16} color={seniorMode ? '#07090e' : '#d4af37'} />
            <Text style={[styles.pillText, { color: seniorMode ? '#07090e' : '#d4af37' }]}>
              {seniorMode ? '시니어 ON' : '시니어'}
            </Text>
          </TouchableOpacity>

          {/* 설정 버튼 */}
          <TouchableOpacity
            style={[styles.iconCircleBtn, { minHeight: theme.minTouchSize, minWidth: theme.minTouchSize }]}
            onPress={onGoToSettings}
          >
            <Ionicons name="settings-outline" size={20} color="#94a3b8" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 중앙 시네마틱 프레임 & 타이틀 */}
      <View style={styles.centerContent}>
        {/* 고풍스러운 미술관 명화 액자 프리뷰 (고흐의 별이 빛나는 밤) */}
        <Animated.View
          style={[
            styles.frameWrapper,
            {
              transform: [{ translateY: frameFloatAnim }],
              width: Math.min(screenWidth * 0.78, 360)
            }
          ]}
        >
          <View style={styles.ornateBorder}>
            <Image
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg'
              }}
              style={styles.heroArtwork}
              resizeMode="cover"
            />
            {/* 캔버스 위 스포트라이트 오버레이 */}
            <View style={styles.spotlightOverlay} />
            <View style={styles.frameBadge}>
              <Ionicons name="brush" size={12} color="#07090e" />
              <Text style={styles.frameBadgeText}>거장의 숨결 복원</Text>
            </View>
          </View>
        </Animated.View>

        {/* 럭셔리 골드 타이틀 타이포그래피 */}
        <View style={styles.titleSection}>
          <Text style={[styles.superTitle, { fontSize: theme.typography.caption }]}>
            HISTORICAL MASTERPIECE RESTORATION
          </Text>
          <Text style={[styles.mainBrandTitle, { fontSize: theme.typography.h1 * 1.25 }]}>
            L’ATELIER DES MAÎTRES
          </Text>
          <Text style={[styles.koreanSubTitle, { fontSize: theme.typography.h2 }]}>
            시간을 잊은 명화 미술관
          </Text>
          <Text style={[styles.storyLine, { fontSize: theme.typography.caption }]}>
            “흩어진 기억의 퍼즐을 맞춰, 잠든 거장의 영혼을 깨우다”
          </Text>
        </View>

        {/* 하단 메인 액션 버튼 그룹 */}
        <View style={styles.actionGroup}>
          {/* 1. 메인 입장 버튼 (빛나는 펄스 애니메이션) */}
          <Animated.View style={{ transform: [{ scale: pulseAnim }], width: '100%', maxWidth: 360 }}>
            <TouchableOpacity
              style={[styles.enterButton, { minHeight: theme.minTouchSize + 8 }]}
              onPress={onEnterMuseum}
              activeOpacity={0.85}
            >
              <Ionicons name="sparkles" size={20} color="#07090e" />
              <Text style={[styles.enterButtonText, { fontSize: theme.typography.h3 }]}>
                미술관 입장하기
              </Text>
              <Ionicons name="arrow-forward" size={20} color="#07090e" />
            </TouchableOpacity>
          </Animated.View>

          {/* 2. 보조 메뉴들 */}
          <View style={styles.secondaryActions}>
            <TouchableOpacity
              style={[styles.secondaryBtn, { minHeight: theme.minTouchSize }]}
              onPress={onWatchPrologue}
            >
              <Ionicons name="book-outline" size={17} color="#d4af37" />
              <Text style={[styles.secondaryBtnText, { fontSize: theme.typography.caption }]}>
                프롤로그 스토리
              </Text>
            </TouchableOpacity>

            <View style={styles.dividerDot} />

            <TouchableOpacity
              style={[styles.secondaryBtn, { minHeight: theme.minTouchSize }]}
              onPress={onGoToVirtualMuseum}
            >
              <Ionicons name="easel-outline" size={17} color="#d4af37" />
              <Text style={[styles.secondaryBtnText, { fontSize: theme.typography.caption }]}>
                가상 미술관
              </Text>
            </TouchableOpacity>

            {onGoToShop && (
              <>
                <View style={styles.dividerDot} />
                <TouchableOpacity
                  style={[styles.secondaryBtn, { minHeight: theme.minTouchSize }]}
                  onPress={onGoToShop}
                >
                  <Ionicons name="bag-handle-outline" size={17} color="#d4af37" />
                  <Text style={[styles.secondaryBtnText, { fontSize: theme.typography.caption }]}>
                    명작 부티크
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

      </View>

      {/* 하단 미술관 저작권 안내 */}
      <View style={styles.footerNote}>
        <Text style={styles.footerText}>
          사후 70년이 경과한 인류의 소중한 명화 문화유산을 보존하고 복원합니다
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  leftPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(212, 175, 55, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)'
  },
  pillText: {
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1
  },
  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  userChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#d4af37',
    backgroundColor: 'rgba(212, 175, 55, 0.15)'
  },
  miniAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10
  },
  userChipText: {
    color: '#d4af37',
    fontSize: 11,
    fontWeight: 'bold',
    maxWidth: 60
  },
  loginChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
    backgroundColor: 'rgba(212, 175, 55, 0.1)'
  },
  loginChipText: {
    color: '#d4af37',
    fontSize: 11,
    fontWeight: 'bold'
  },
  iconPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
    backgroundColor: 'rgba(212, 175, 55, 0.1)'
  },
  activeSeniorPill: {
    backgroundColor: '#f5d76e',
    borderColor: '#f5d76e'
  },
  iconCircleBtn: {
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 16
  },
  frameWrapper: {
    aspectRatio: 16 / 10,
    borderRadius: 20,
    padding: 4,
    backgroundColor: 'rgba(212, 175, 55, 0.35)',
    shadowColor: '#d4af37',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 25,
    elevation: 12
  },
  ornateBorder: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#d4af37',
    position: 'relative'
  },
  heroArtwork: {
    width: '100%',
    height: '100%'
  },
  spotlightOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(7, 9, 14, 0.25)'
  },
  frameBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#d4af37',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6
  },
  frameBadgeText: {
    color: '#07090e',
    fontSize: 10,
    fontWeight: 'bold'
  },
  titleSection: {
    alignItems: 'center',
    gap: 4
  },
  superTitle: {
    color: '#94a3b8',
    letterSpacing: 2,
    fontWeight: '600'
  },
  mainBrandTitle: {
    color: '#d4af37',
    fontWeight: '900',
    letterSpacing: 3,
    textAlign: 'center',
    textShadowColor: 'rgba(212, 175, 55, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10
  },
  koreanSubTitle: {
    color: '#ffffff',
    fontWeight: '800',
    letterSpacing: 1.5,
    textAlign: 'center'
  },
  storyLine: {
    color: '#94a3b8',
    fontStyle: 'italic',
    marginTop: 4,
    textAlign: 'center'
  },
  actionGroup: {
    width: '100%',
    alignItems: 'center',
    gap: 12,
    marginTop: 8
  },
  enterButton: {
    backgroundColor: '#d4af37',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 28,
    paddingVertical: 14,
    shadowColor: '#d4af37',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8
  },
  enterButtonText: {
    color: '#07090e',
    fontWeight: '900',
    letterSpacing: 1
  },
  secondaryActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 8
  },
  secondaryBtnText: {
    color: '#cbd5e1',
    fontWeight: '600'
  },
  dividerDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  },
  footerNote: {
    alignItems: 'center',
    marginTop: 8
  },
  footerText: {
    fontSize: 10,
    color: '#64748b',
    textAlign: 'center'
  }
});
