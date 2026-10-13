// MMKV 기반 고성능 로컬 스토리지 서비스
// 최우선 원칙: 조각 스냅마다 디바운스 없이 즉시 저장하여 진행 상황 절대 손실 방지

import { UserProgress, UserSettings, GalleryCustomization, Painting } from '../types';

let mmkvInstance: any = null;

try {
  const { MMKV } = require('react-native-mmkv');
  mmkvInstance = new MMKV();
} catch (e) {
  // 웹 또는 네이티브 모듈 로드 실패 시 인메모리 폴백
  const memoryStore = new Map<string, string>();
  mmkvInstance = {
    set: (key: string, val: string) => memoryStore.set(key, val),
    getString: (key: string) => memoryStore.get(key) || null,
    delete: (key: string) => memoryStore.delete(key),
    getAllKeys: () => Array.from(memoryStore.keys())
  };
}

const DEFAULT_SETTINGS: UserSettings = {
  seniorMode: false,
  hapticOn: true,
  bgmVolume: 0.5,
  sfxVolume: 0.8
};

const DEFAULT_GALLERY: GalleryCustomization = {
  unlockedRooms: ['room-1'],
  wallpaperStyle: 'classic_velvet',
  frameStyle: 'ornate_gold'
};

export const StorageService = {
  // 1. 퍼즐 진행도 즉시 저장 (조각 스냅 시마다 호출)
  saveProgress(paintingId: string, difficulty: string, placedPieceIds: number[], isCompleted: boolean): UserProgress {
    const key = `progress:${paintingId}:${difficulty}`;
    const progress: UserProgress = {
      paintingId,
      difficulty: difficulty as any,
      placedPieceIds,
      isCompleted,
      completedAt: isCompleted ? new Date().toISOString() : undefined,
      updatedAt: new Date().toISOString()
    };
    mmkvInstance.set(key, JSON.stringify(progress));
    return progress;
  },

  // 진행도 불러오기
  getProgress(paintingId: string, difficulty: string): UserProgress | null {
    const key = `progress:${paintingId}:${difficulty}`;
    const raw = mmkvInstance.getString(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  // 전체 진행상황 맵 (홈 화면 및 동기화 업로드용)
  getAllProgress(): Record<string, UserProgress> {
    const keys = mmkvInstance.getAllKeys ? mmkvInstance.getAllKeys() : [];
    const result: Record<string, UserProgress> = {};
    for (const key of keys) {
      if (typeof key === 'string' && key.startsWith('progress:')) {
        const raw = mmkvInstance.getString(key);
        if (raw) {
          try {
            result[key] = JSON.parse(raw);
          } catch {}
        }
      }
    }
    return result;
  },

  // 2. 유저 설정 (시니어 모드, 사운드/진동 등)
  getSettings(): UserSettings {
    const raw = mmkvInstance.getString('settings');
    if (!raw) return DEFAULT_SETTINGS;
    try {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  saveSettings(settings: Partial<UserSettings>): UserSettings {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    mmkvInstance.set('settings', JSON.stringify(updated));
    return updated;
  },

  // 3. 가상 미술관 인테리어 커스터마이징
  getGalleryCustomization(): GalleryCustomization {
    const raw = mmkvInstance.getString('gallery');
    if (!raw) return DEFAULT_GALLERY;
    try {
      return { ...DEFAULT_GALLERY, ...JSON.parse(raw) };
    } catch {
      return DEFAULT_GALLERY;
    }
  },

  saveGalleryCustomization(customization: Partial<GalleryCustomization>): GalleryCustomization {
    const current = this.getGalleryCustomization();
    const updated = { ...current, ...customization };
    mmkvInstance.set('gallery', JSON.stringify(updated));
    return updated;
  },

  // 4. 명화 카탈로그 오프라인 캐시
  cachePaintings(paintings: Painting[]) {
    mmkvInstance.set('contentCache:paintings', JSON.stringify(paintings));
  },

  getCachedPaintings(): Painting[] | null {
    const raw = mmkvInstance.getString('contentCache:paintings');
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  // 범용 키-값 읽기/쓰기 (Clerk 토큰 캐시 등)
  getString(key: string): string | null {
    return mmkvInstance.getString(key);
  },
  set(key: string, val: string): void {
    mmkvInstance.set(key, val);
  },
  delete(key: string): void {
    mmkvInstance.delete(key);
  }
};
