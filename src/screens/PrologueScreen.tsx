// 시네마틱 프롤로그 컷씬 화면 (PrologueScreen.tsx)
// 3단계 감성 컷씬, 화려한 모션 그래픽, 타이포그래피, 음향 햅틱 연출이 결합된 인터랙티브 스토리

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
import { audioHaptics } from '../services/audioHaptics';

interface Props {
  onComplete: () => void;
  onSkip: () => void;
}

interface Cutscene {
  id: number;
  chapterTitle: string;
  artworkName: string;
  artistName: string;
  year: string;
  imageUrl: string;
  mainStory: string;
  poeticQuote: string;
  themeColor: string;
}

const CUTSCENES: Cutscene[] = [
  {
    id: 1,
    chapterTitle: '제1막 : 칠흑 속의 비밀 초대장',
    artworkName: '별이 빛나는 밤',
    artistName: '빈센트 반 고흐',
    year: '1889',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
    mainStory: '비가 내리던 어느 고요한 밤, 당신의 문 앞으로 낡은 금빛 실링 왁스가 찍힌 초대장이 도착했습니다.',
    poeticQuote: '“시간의 틈새로 흩어져 빛을 잃어버린 거장들의 영혼을 찾아주십시오…”',
    themeColor: '#3b82f6'
  },
  {
    id: 2,
    chapterTitle: '제2막 : 산산이 부서진 황금의 기억',
    artworkName: '키스 (The Kiss)',
    artistName: '구스타프 클림트',
    year: '1908',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg/1200px-The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg',
    mainStory: '고흐가 새겨넣은 고독한 별빛도, 클림트의 찬란한 황금빛 입맞춤도… 기나긴 세월 속에 산산이 조각나 어둠 속에 잠들고 말았습니다.',
    poeticQuote: '“색채를 잃어버린 캔버스는 오직 복원가의 손길만을 기다립니다.”',
    themeColor: '#f59e0b'
  },
  {
    id: 3,
    chapterTitle: '제3막 : 영혼을 깨우는 복원의 여정',
    artworkName: '진주 귀걸이를 한 소녀',
    artistName: '요하네스 페르메이르',
    year: '1665',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/960px-1665_Girl_with_a_Pearl_Earring.jpg',
    mainStory: '이제 당신의 섬세한 손끝으로 흩어진 조각들을 맞추어, 캔버스 위에 잠든 거장의 숨결과 아름다운 빛을 다시 깨워주세요.',
    poeticQuote: '“시간을 잊은 아틀리에에서, 당신만의 기적이 지금 시작됩니다.”',
    themeColor: '#0ea5e9'
  }
];

const AMBIENT_VIDEO_URL = 'https://vjs.zencdn.net/v/oceans.mp4';
const PARTICLE_COUNT = 12;

export const PrologueScreen: React.FC<Props> = ({ onComplete, onSkip }) => {
  const { theme } = useAppTheme();
  const screenWidth = Dimensions.get('window').width;

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentCut = CUTSCENES[currentIndex];

  const [fadeAnim] = useState(() => new Animated.Value(1));
  const [slideAnim] = useState(() => new Animated.Value(0));
  const [pulseAnim] = useState(() => new Animated.Value(1));

  // 파티클 (정적 결정론적 값으로 순수성 보장)
  const [particles] = useState(() =>
    Array.from({ length: PARTICLE_COUNT }).map((_, i) => ({
      y: new Animated.Value(0),
      x: (i * (screenWidth / PARTICLE_COUNT) + ((i % 3) * 6 - 6)),
      size: (i % 3) + 2,
      delay: i * 350,
      duration: 3800 + (i % 4) * 600,
      opacity: 0.35 + (i % 4) * 0.1
    }))
  );

  useEffect(() => {
    // 펄스 애니메이션
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        }),
        Animated.timing(pulseAnim, {
          toValue: 1.0,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        })
      ])
    ).start();

    // 파티클 루프
    particles.forEach((p) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(p.delay),
          Animated.timing(p.y, {
            toValue: -550,
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

  const transitionToCut = (nextIndex: number) => {
    audioHaptics.triggerPickup();

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true
      }),
      Animated.timing(slideAnim, {
        toValue: -20,
        duration: 300,
        useNativeDriver: true
      })
    ]).start(() => {
      setCurrentIndex(nextIndex);
      slideAnim.setValue(25);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true
        })
      ]).start();
    });
  };

  const handleNext = () => {
    if (currentIndex < CUTSCENES.length - 1) {
      transitionToCut(currentIndex + 1);
    } else {
      audioHaptics.triggerVictory();
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      transitionToCut(currentIndex - 1);
    }
  };

  const handleSkip = () => {
    audioHaptics.triggerPickup();
    onSkip();
  };

  return (
    <View style={styles.container}>
      {/* 1. 배경 시네마틱 비디오 */}
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

      {/* 2. 다크 럭셔리 오버레이 */}
      <View style={[styles.darkOverlay, { backgroundColor: 'rgba(7, 9, 14, 0.86)' }]} />

      {/* 3. 모션 파티클 */}
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
                backgroundColor: currentCut.themeColor,
                transform: [{ translateY: p.y }]
              }
            ]}
          />
        ))}
      </View>

      {/* 4. 상단 진행 바 & 스킵 버튼 */}
      <View style={styles.topHeader}>
        <View style={styles.progressContainer}>
          {CUTSCENES.map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.progressBar,
                currentIndex === idx && [styles.activeProgressBar, { backgroundColor: currentCut.themeColor }]
              ]}
            />
          ))}
          <Text style={styles.progressCounter}>
            {currentIndex + 1} / {CUTSCENES.length}
          </Text>
        </View>

        <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
          <Text style={styles.skipBtnText}>건너뛰기</Text>
          <Ionicons name="play-skip-forward" size={13} color="#94a3b8" />
        </TouchableOpacity>
      </View>

      {/* 5. 중앙 시네마틱 컷씬 콘텐츠 */}
      <Animated.View
        style={[
          styles.contentCard,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        {/* 화려한 골드 앤틱 액자 */}
        <View
          style={[
            styles.artworkFrame,
            {
              width: Math.min(screenWidth * 0.86, 420),
              borderColor: currentCut.themeColor,
              shadowColor: currentCut.themeColor
            }
          ]}
        >
          <Image
            source={{ uri: currentCut.imageUrl }}
            style={styles.artworkImage}
            resizeMode="cover"
          />
          <View style={styles.frameShadowVignette} />

          {/* 명화 뱃지 */}
          <View style={styles.artworkLabel}>
            <Ionicons name="brush" size={12} color="#fbbf24" />
            <Text style={styles.artTitleText}>{currentCut.artworkName}</Text>
            <Text style={styles.artistNameText}>· {currentCut.artistName}</Text>
          </View>
        </View>

        {/* 챕터 타이포그래피 & 서사 본문 */}
        <View style={styles.storySection}>
          <View style={styles.chapterBadge}>
            <Ionicons name="sparkles" size={12} color="#fbbf24" />
            <Text style={styles.chapterTitle}>{currentCut.chapterTitle}</Text>
          </View>

          <Text style={[styles.mainStoryText, { fontSize: theme.typography.h3 }]}>
            {currentCut.mainStory}
          </Text>

          {/* 인용구 박스 */}
          <View style={[styles.quoteBox, { borderLeftColor: currentCut.themeColor }]}>
            <Text style={styles.quoteText}>{currentCut.poeticQuote}</Text>
          </View>
        </View>
      </Animated.View>

      {/* 6. 하단 네비게이션 액션 */}
      <View style={styles.bottomNav}>
        {currentIndex > 0 ? (
          <TouchableOpacity style={styles.prevBtn} onPress={handlePrev}>
            <Ionicons name="arrow-back" size={16} color="#94a3b8" />
            <Text style={styles.prevBtnText}>이전 장</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 80 }} />
        )}

        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <TouchableOpacity
            style={[styles.nextBtn, { backgroundColor: '#fbbf24' }]}
            onPress={handleNext}
            activeOpacity={0.85}
          >
            <Text style={[styles.nextBtnText, { fontSize: theme.typography.body }]}>
              {currentIndex === CUTSCENES.length - 1 ? '✦ 복원의 대모험 시작하기' : '다음 이야기'}
            </Text>
            <Ionicons
              name={currentIndex === CUTSCENES.length - 1 ? 'color-wand' : 'arrow-forward'}
              size={18}
              color="#07090e"
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
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
  darkOverlay: {
    ...StyleSheet.absoluteFill
  },
  particle: {
    position: 'absolute',
    bottom: 20
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
    paddingTop: Platform.OS === 'android' ? 8 : 4
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  progressBar: {
    width: 24,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.18)'
  },
  activeProgressBar: {
    width: 38
  },
  progressCounter: {
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: 'bold',
    marginLeft: 6
  },
  skipBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.08)'
  },
  skipBtnText: {
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '600'
  },
  contentCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    zIndex: 5
  },
  artworkFrame: {
    aspectRatio: 16 / 10,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    position: 'relative',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 10
  },
  artworkImage: {
    width: '100%',
    height: '100%'
  },
  frameShadowVignette: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(7, 9, 14, 0.2)'
  },
  artworkLabel: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(7, 9, 14, 0.88)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)'
  },
  artTitleText: {
    color: '#fbbf24',
    fontSize: 11,
    fontWeight: 'bold'
  },
  artistNameText: {
    color: '#cbd5e1',
    fontSize: 10
  },
  storySection: {
    width: '100%',
    maxWidth: 420,
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 8
  },
  chapterBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(245, 158, 11, 0.14)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)'
  },
  chapterTitle: {
    color: '#fbbf24',
    fontWeight: 'bold',
    fontSize: 11,
    letterSpacing: 1
  },
  mainStoryText: {
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: '700'
  },
  quoteBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderLeftWidth: 3,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 4
  },
  quoteText: {
    color: '#cbd5e1',
    fontStyle: 'italic',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center'
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
    paddingTop: 6
  },
  prevBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 8
  },
  prevBtnText: {
    color: '#94a3b8',
    fontWeight: '600',
    fontSize: 13
  },
  nextBtn: {
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 22,
    paddingVertical: 12,
    shadowColor: '#fbbf24',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 14,
    elevation: 6
  },
  nextBtnText: {
    color: '#07090e',
    fontWeight: '900',
    letterSpacing: 0.5
  }
});
