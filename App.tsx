// 메인 애플리케이션 진입점 (App.tsx)
// 힐링 명화 직소 퍼즐: 도슨트 스토리텔링 + 나만의 가상 미술관 + ASMR 손맛 + 시니어 모드

import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { ThemeProvider, useAppTheme } from './src/context/ThemeContext';
import { HomeScreen } from './src/screens/HomeScreen';
import { PuzzleScreen } from './src/screens/PuzzleScreen';
import { DifficultyModal } from './src/screens/DifficultyModal';
import { DocentModal } from './src/screens/DocentModal';
import { VirtualMuseumScreen } from './src/screens/VirtualMuseumScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { AuthModal } from './src/screens/AuthModal';
import { Painting, DifficultyLevel } from './src/types';

function MainAppContent() {
  const { theme } = useAppTheme();

  // 화면 전환 상태: 'home' | 'puzzle' | 'museum' | 'settings'
  const [currentScreen, setCurrentScreen] = useState<'home' | 'puzzle' | 'museum' | 'settings'>('home');

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

  // 난이도 결정 시 -> 퍼즐 플레이 화면으로 진입
  const handleStartPuzzle = (painting: Painting, level: DifficultyLevel) => {
    setSelectedPainting(painting);
    setSelectedDifficulty(level);
    setIsDifficultyModalOpen(false);
    setCurrentScreen('puzzle');
  };

  // 퍼즐 완성 시 -> 도슨트 스토리 모달 오픈
  const handlePuzzleComplete = () => {
    setIsDocentModalOpen(true);
  };

  // 가상 미술관으로 이동
  const handleGoToVirtualMuseum = () => {
    setCurrentScreen('museum');
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.bgDark }]}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.bgDark} />

      <View style={styles.container}>
        {currentScreen === 'home' && (
          <HomeScreen
            onSelectPainting={handleSelectPainting}
            onGoToVirtualMuseum={handleGoToVirtualMuseum}
            onGoToSettings={() => setCurrentScreen('settings')}
            onOpenAuth={() => setIsAuthModalOpen(true)}
          />
        )}

        {currentScreen === 'puzzle' && selectedPainting && (
          <PuzzleScreen
            painting={selectedPainting}
            difficulty={selectedDifficulty}
            onBack={() => setCurrentScreen('home')}
            onComplete={handlePuzzleComplete}
          />
        )}

        {currentScreen === 'museum' && (
          <VirtualMuseumScreen
            onBack={() => setCurrentScreen('home')}
            onSelectPainting={handleSelectPainting}
          />
        )}

        {currentScreen === 'settings' && (
          <SettingsScreen
            onBack={() => setCurrentScreen('home')}
            onOpenAuth={() => setIsAuthModalOpen(true)}
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
