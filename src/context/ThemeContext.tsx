// 시니어 모드 & 미술관 다크 골드 전역 테마 컨텍스트
// 시니어 모드 활성화 시: 폰트 1.4배, 터치 타겟 56dp 이상, 직관적 고대비 UI

import React, { createContext, useContext, useState, useEffect } from 'react';
import { StorageService } from '../services/storage';

export interface ThemeTokens {
  isSenior: boolean;
  fontScale: number;
  minTouchSize: number;
  colors: {
    bgDark: string;
    bgCard: string;
    bgElevated: string;
    goldBright: string;
    goldMuted: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    borderGold: string;
    accentSuccess: string;
  };
  typography: {
    h1: number;
    h2: number;
    h3: number;
    body: number;
    caption: number;
  };
}

interface ThemeContextType {
  theme: ThemeTokens;
  seniorMode: boolean;
  toggleSeniorMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [seniorMode, setSeniorMode] = useState<boolean>(() => {
    return StorageService.getSettings().seniorMode;
  });

  const toggleSeniorMode = () => {
    const nextVal = !seniorMode;
    setSeniorMode(nextVal);
    StorageService.saveSettings({ seniorMode: nextVal });
  };

  const scale = seniorMode ? 1.35 : 1.0;

  const theme: ThemeTokens = {
    isSenior: seniorMode,
    fontScale: scale,
    minTouchSize: seniorMode ? 56 : 44,
    colors: {
      bgDark: '#0b0e14',
      bgCard: '#131926',
      bgElevated: '#1c2538',
      goldBright: '#f5d76e',
      goldMuted: '#d4af37',
      textPrimary: '#ffffff',
      textSecondary: '#cbd5e1',
      textMuted: '#8896ab',
      borderGold: 'rgba(212, 175, 55, 0.35)',
      accentSuccess: '#10b981'
    },
    typography: {
      h1: Math.round(24 * scale),
      h2: Math.round(20 * scale),
      h3: Math.round(17 * scale),
      body: Math.round(15 * scale),
      caption: Math.round(12 * scale)
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, seniorMode, toggleSeniorMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within ThemeProvider');
  }
  return context;
};
