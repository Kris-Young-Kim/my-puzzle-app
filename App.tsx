// 메인 애플리케이션 진입점 (App.tsx)
// 힐링 명화 직소 퍼즐: 도슨트 스토리텔링 + 나만의 가상 미술관 + ASMR 손맛 + 시니어 모드

import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { ThemeProvider, useAppTheme } from './src/context/ThemeContext';
import { TitleScreen } from './src/screens/TitleScreen';
import { PrologueScreen } from './src/screens/PrologueScreen';
import { PuzzleLoadingScreen } from './src/screens/PuzzleLoadingScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { PuzzleScreen } from './src/screens/PuzzleScreen';
import { DifficultyModal } from './src/screens/DifficultyModal';
import { DocentModal } from './src/screens/DocentModal';
import { VirtualMuseumScreen } from './src/screens/VirtualMuseumScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { AuthModal } from './src/screens/AuthModal';
import { ShopScreen } from './src/screens/ShopScreen';
import { Painting, DifficultyLevel } from './src/types';

function MainAppContent() {
  const { theme } = useAppTheme();

  // 게임 화면 네비게이션 상태:
  // 'title' (시네마틱 메인 타이틀) -> 'prologue' (서사 컷씬) -> 'home' (명화 갤러리) -> 'loading' (이젤 세팅) -> 'puzzle' (플레이) -> 'museum' -> 'settings' -> 'shop'
  const [currentScreen, setCurrentScreen] = useState<'title' | 'prologue' | 'home' | 'loading' | 'puzzle' | 'museum' | 'settings' | 'shop'>('title');

  // 활성 선택 명화 및 난이도
  const [selectedPainting, setSelectedPainting] = useState<Painting | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('25');

  // 모달 제어 상태
  const [isDifficultyModalOpen, setIsDifficultyModalOpen] = useState(false);
  const [isDocentModalOpen, setIsDocentModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // 명화 선택 시 -> 난이도 선택 모달 오픈
  const handleSelectPainting = (painting: Painting) => {
    setSelectedPainting(painting);
    setIsDifficultyModalOpen(true);
  };

  // 난이도 결정 시 -> 시네마틱 이젤 로딩 화면으로 진입 후 게임 시작
  const handleStartPuzzle = (painting: Painting, level: DifficultyLevel) => {
    setSelectedPainting(painting);
    setSelectedDifficulty(level);
    setIsDifficultyModalOpen(false);
    setCurrentScreen('loading'); // 즉시 게임판으로 가지 않고 시네마틱 이젤 로딩 연출 거침!
  };

  // 퍼즐 완성 시 -> 도슨트 스토리 모달 오픈
  const handlePuzzleComplete = () => {
    setIsDocentModalOpen(true);
  };

  // 가상 미술관으로 이동
  const handleGoToVirtualMuseum = () => {
    setCurrentScreen('museum');
  };

  // 상점으로 이동
  const handleGoToShop = () => {
    setCurrentScreen('shop');
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: '#07090e' }]}>
      <StatusBar barStyle="light-content" backgroundColor="#07090e" />

      <View style={styles.container}>
        {/* 1. 감성 메인 타이틀 화면 */}
        {currentScreen === 'title' && (
          <TitleScreen
            onEnterMuseum={() => setCurrentScreen('home')}
            onWatchPrologue={() => setCurrentScreen('prologue')}
            onGoToVirtualMuseum={handleGoToVirtualMuseum}
            onGoToSettings={() => setCurrentScreen('settings')}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onGoToShop={handleGoToShop}
          />
        )}

        {/* 2. 오프닝 프롤로그 컷씬 스토리 */}
        {currentScreen === 'prologue' && (
          <PrologueScreen
            onComplete={() => setCurrentScreen('home')}
            onSkip={() => setCurrentScreen('home')}
          />
        )}

        {/* 3. 명화 갤러리 카탈로그 */}
        {currentScreen === 'home' && (
          <HomeScreen
            onSelectPainting={handleSelectPainting}
            onGoToVirtualMuseum={handleGoToVirtualMuseum}
            onGoToSettings={() => setCurrentScreen('settings')}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onGoToTitle={() => setCurrentScreen('title')}
            onGoToShop={handleGoToShop}
          />
        )}

        {/* 4. 시네마틱 이젤 세팅 & 복원 준비 전환 연출 */}
        {currentScreen === 'loading' && selectedPainting && (
          <PuzzleLoadingScreen
            painting={selectedPainting}
            difficulty={selectedDifficulty}
            onReady={() => setCurrentScreen('puzzle')}
          />
        )}

        {/* 5. 3D 입체 직소 퍼즐 플레이 화면 */}
        {currentScreen === 'puzzle' && selectedPainting && (
          <PuzzleScreen
            painting={selectedPainting}
            difficulty={selectedDifficulty}
            onBack={() => setCurrentScreen('home')}
            onComplete={handlePuzzleComplete}
          />
        )}

        {/* 6. 나만의 가상 미술관 */}
        {currentScreen === 'museum' && (
          <VirtualMuseumScreen
            onBack={() => setCurrentScreen('home')}
            onSelectPainting={handleSelectPainting}
            onGoToShop={handleGoToShop}
          />
        )}

        {/* 7. 설정 및 계정 관리 */}
        {currentScreen === 'settings' && (
          <SettingsScreen
            onBack={() => setCurrentScreen('home')}
            onOpenAuth={() => setIsAuthModalOpen(true)}
          />
        )}

        {/* 8. 명작 부티크 (인앱 구매 상점) */}
        {currentScreen === 'shop' && (
          <ShopScreen
            onBack={() => setCurrentScreen('home')}
            onGoToVirtualMuseum={handleGoToVirtualMuseum}
          />
        )}
      </View>


      {/* 난이도 선택 모달 */}
      <DifficultyModal
        visible={isDifficultyModalOpen}
        painting={selectedPainting}
        onClose={() => setIsDifficultyModalOpen(false)}
        onSelectDifficulty={handleStartPuzzle}
      />

      {/* 퍼즐 완성 도슨트 스토리텔링 모달 */}
      <DocentModal
        visible={isDocentModalOpen}
        painting={selectedPainting}
        onClose={() => {
          setIsDocentModalOpen(false);
          setCurrentScreen('home');
        }}
        onGoToVirtualMuseum={() => {
          setIsDocentModalOpen(false);
          setCurrentScreen('museum');
        }}
      />

      {/* Clerk 계정 / 로그인 / 회원가입 모달 */}
      <AuthModal
        visible={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </SafeAreaView>
  );
}

import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';
import { tokenCache } from './src/services/tokenCache';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || 'pk_test_c3BsZW5kaWQtdGV0cmEtNTY4NC5jbGVyay5hY2NvdW50cy5kZXYk';

export default function App() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <ThemeProvider>
          <MainAppContent />
        </ThemeProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  container: {
    flex: 1
  }
});
