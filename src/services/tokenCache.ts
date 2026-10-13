// Clerk Expo 토큰 캐시 (MMKV & Web LocalStorage 하이브리드 지원)
import { Platform } from 'react-native';

export const tokenCache = {
  async getToken(key: string): Promise<string | null> {
    try {
      if (Platform.OS === 'web') {
        if (typeof window !== 'undefined' && window.localStorage) {
          return window.localStorage.getItem(key);
        }
        return null;
      }
      // Native MMKV
      const { StorageService } = await import('./storage');
      return StorageService.getString(`clerk:${key}`) ?? null;
    } catch (err) {
      console.warn('Failed to get token from cache', err);
      return null;
    }
  },

  async saveToken(key: string, value: string): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem(key, value);
        }
        return;
      }
      const { StorageService } = await import('./storage');
      StorageService.set(`clerk:${key}`, value);
    } catch (err) {
      console.warn('Failed to save token to cache', err);
    }
  },

  async clearToken(key: string): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.removeItem(key);
        }
        return;
      }
      const { StorageService } = await import('./storage');
      StorageService.delete(`clerk:${key}`);
    } catch (err) {
      console.warn('Failed to clear token from cache', err);
    }
  }
};
