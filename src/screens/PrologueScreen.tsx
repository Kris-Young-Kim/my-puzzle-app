// 시네마틱 프롤로그 컷씬 화면 (PrologueScreen.tsx)
// 3단계 감성 컷씬과 서사 텍스트를 통해 명화 복원가의 세계관으로 몰입시키는 오프닝

import React, { useState, useRef, useEffect } from 'react';
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

interface Props {
  onComplete: () => void;
  onSkip: () => void;
}

interface Cutscene {
  id: number;
  chapterTitle: string;
  imageUrl: string;
  artworkName: string;
  artistName: string;
  mainStory: string;
  poeticQuote: string;
}

const CUTSCENES: Cutscene[] = [
  {
    id: 1,
    chapterTitle: '제1장 : 비밀스러운 초대',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
    artworkName: '별이 빛나는 밤',
    artistName: '빈센트 반 고흐',
    mainStory: '비가 내리던 어느 고요한 밤, 당신의 문 앞으로 낡은 금빛 실링 왁스가 찍힌 낡은 초대장이 도착했습니다.',
    poeticQuote: '“시간의 틈새로 흩어져 빛을 잃어버린 거장들의 영혼을 찾아주십시오…”'
  },
  {
    id: 2,
    chapterTitle: '제2장 : 부서진 기억의 조각',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg/1200px-The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg',
    artworkName: '키스 (The Kiss)',
    artistName: '구스타프 클림트',
    mainStory: '고흐가 새겨넣은 고독한 별빛도, 클림트의 찬란한 황금빛 입맞춤도… 기나긴 세월 속에 산산이 조각나 어둠 속에 잠들고 말았습니다.',
    poeticQuote: '“색채를 잃어버린 캔버스는 영원한 침묵 속에 갇혀 있습니다.”'
  },
  {
    id: 3,
    chapterTitle: '제3장 : 위대한 복원의 시작',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/960px-1665_Girl_with_a_Pearl_Earring.jpg',
    artworkName: '진주 귀걸이를 한 소녀',
    artistName: '요하네스 페르메이르',
    mainStory: '이제 당신의 따뜻한 손길로 흩어진 조각들을 맞추어, 캔버스 위에 잠든 거장의 숨결과 아름다운 빛을 다시 깨워주세요.',
    poeticQuote: '“시간을 잊은 아틀리에에서, 당신만의 복원의 여정이 지금 시작됩니다.”'
  }
];

export const PrologueScreen: React.FC<Props> = ({ onComplete, onSkip }) => {
  const { theme } = useAppTheme();
  const screenWidth = Dimensions.get('window').width;

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentCut = CUTSCENES[currentIndex];

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const transitionToCut = (nextIndex: number) => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 350,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true
      }),
      Animated.timing(slideAnim, {
        toValue: -15,
        duration: 350,
        useNativeDriver: true
      })
    ]).start(() => {
      setCurrentIndex(nextIndex);
      slideAnim.setValue(20);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 450,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 450,
          useNativeDriver: true
        })
      ]).start();
    });
  };

  const handleNext = () => {
    if (currentIndex < CUTSCENES.length - 1) {
      transitionToCut(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      transitionToCut(currentIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* 배경 시네마틱 이미지 (블러 & 딤 처리) */}
      <Image
        source={{ uri: currentCut.imageUrl }}
        style={styles.backdropImage}
        blurRadius={12}
      />
      <View style={styles.darkGradientOverlay} />

      {/* 상단 헤더 (진행도 & 스킵 버튼) */}
      <View style={styles.topHeader}>
        <View style={styles.dotsRow}>
          {CUTSCENES.map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.dot,
                currentIndex === idx && styles.activeDot
              ]}
            />
          ))}
          <Text style={styles.progressText}>
            {currentIndex + 1} / {CUTSCENES.length}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.skipBtn, { minHeight: theme.minTouchSize }]}
          onPress={onSkip}
        >
          <Text style={styles.skipBtnText}>건너뛰기</Text>
          <Ionicons name="play-skip-forward" size={14} color="#94a3b8" />
        </TouchableOpacity>
      </View>

      {/* 중앙 컷씬 스토리 캔버스 */}
      <Animated.View
        style={[
          styles.contentCard,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        {/* 명화 컷씬 액자 */}
        <View style={[styles.artworkFrame, { width: Math.min(screenWidth * 0.85, 420) }]}>
          <Image
            source={{ uri: currentCut.imageUrl }}
            style={styles.artworkImage}
            resizeMode="cover"
          />
          <View style={styles.artworkGlow} />

          <View style={styles.artworkLabel}>
            <Text style={styles.artTitleText}>{currentCut.artworkName}</Text>
            <Text style={styles.artistNameText}>{currentCut.artistName}</Text>
          </View>
        </View>

        {/* 챕터 타이틀 & 서사 텍스트 */}
        <View style={styles.storySection}>
          <Text style={[styles.chapterTitle, { fontSize: theme.typography.caption }]}>
            {currentCut.chapterTitle}
          </Text>

          <Text style={[styles.mainStoryText, { fontSize: theme.typography.h3 }]}>
            {currentCut.mainStory}
          </Text>

          <View style={styles.quoteBox}>
            <Ionicons name="sparkles" size={14} color="#d4af37" style={{ marginTop: 2 }} />
            <Text style={[styles.quoteText, { fontSize: theme.typography.caption }]}>
              {currentCut.poeticQuote}
            </Text>
          </View>
        </View>
      </Animated.View>

      {/* 하단 네비게이션 버튼 바 */}
      <View style={styles.bottomNav}>
        {currentIndex > 0 ? (
          <TouchableOpacity
            style={[styles.prevBtn, { minHeight: theme.minTouchSize }]}
            onPress={handlePrev}
          >
            <Ionicons name="arrow-back" size={18} color="#94a3b8" />
            <Text style={styles.prevBtnText}>이전</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 80 }} />
        )}

        <TouchableOpacity
          style={[styles.nextBtn, { minHeight: theme.minTouchSize }]}
          onPress={handleNext}
          activeOpacity={0.85}
        >
          <Text style={[styles.nextBtnText, { fontSize: theme.typography.body }]}>
            {currentIndex === CUTSCENES.length - 1 ? '✦ 복원의 여정 시작하기' : '다음 이야기'}
          </Text>
          <Ionicons
            name={currentIndex === CUTSCENES.length - 1 ? 'sparkles' : 'arrow-forward'}
            size={18}
            color="#07090e"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07090e',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20
  },
  backdropImage: {
    ...StyleSheet.absoluteFill,
    opacity: 0.22
  },
  darkGradientOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(7, 9, 14, 0.78)'
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  },
  activeDot: {
    width: 24,
    backgroundColor: '#d4af37'
  },
  progressText: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 6
  },
  skipBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.08)'
  },
  skipBtnText: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '600'
  },
  contentCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    zIndex: 5
  },
  artworkFrame: {
    aspectRatio: 16 / 10,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#d4af37',
    position: 'relative',
    shadowColor: '#d4af37',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10
  },
  artworkImage: {
    width: '100%',
    height: '100%'
  },
  artworkGlow: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.15)'
  },
  artworkLabel: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(7, 9, 14, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)'
  },
  artTitleText: {
    color: '#d4af37',
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
    paddingHorizontal: 12
  },
  chapterTitle: {
    color: '#d4af37',
    fontWeight: 'bold',
    letterSpacing: 2
  },
  mainStoryText: {
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 28,
    fontWeight: '700'
  },
  quoteBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderLeftWidth: 3,
    borderLeftColor: '#d4af37',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 6
  },
  quoteText: {
    color: '#cbd5e1',
    fontStyle: 'italic',
    lineHeight: 18,
    flex: 1
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
    paddingTop: 8
  },
  prevBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10
  },
  prevBtnText: {
    color: '#94a3b8',
    fontWeight: '600',
    fontSize: 14
  },
  nextBtn: {
    backgroundColor: '#d4af37',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 22,
    paddingVertical: 12,
    shadowColor: '#d4af37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6
  },
  nextBtnText: {
    color: '#07090e',
    fontWeight: '900',
    letterSpacing: 0.5
  }
});
