// 나만의 가상 미술관 화면 (완성작 액자 전시, 전시실 가로 스크롤, 액자/벽지 커스터마이징)

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { MASTERPIECES } from '../data/paintings';
import { StorageService } from '../services/storage';
import { GalleryCustomization, Painting } from '../types';
import { useAppTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  onBack: () => void;
  onSelectPainting: (painting: Painting) => void;
}

export const VirtualMuseumScreen: React.FC<Props> = ({ onBack, onSelectPainting }) => {
  const { theme } = useAppTheme();
  const screenWidth = Dimensions.get('window').width;

  const [customization, setCustomization] = useState<GalleryCustomization>(() => {
    return StorageService.getGalleryCustomization();
  });

  // 전체 완성된 명화 확인 (최소 1개 난이도라도 완료된 명화들)
  const completedPaintings = MASTERPIECES.filter(p => {
    const p25 = StorageService.getProgress(p.id, '25')?.isCompleted;
    const p100 = StorageService.getProgress(p.id, '100')?.isCompleted;
    const p400 = StorageService.getProgress(p.id, '400')?.isCompleted;
    return p25 || p100 || p400;
  });

  // 벽지 스타일 색상 매핑
  const wallpaperBg = {
    classic_velvet: '#2e0f14', // 딥 버건디 벨벳
    modern_slate: '#121620',   // 미드나이트 슬레이트
    gallery_wood: '#241a12'    // 클래식 원목
  }[customization.wallpaperStyle];

  // 액자 스타일 테두리 매핑
  const frameBorderColor = {
    ornate_gold: '#d4af37',
    minimal_black: '#000000',
    natural_oak: '#b3824b'
  }[customization.frameStyle];

  const handleUpdateWallpaper = (style: GalleryCustomization['wallpaperStyle']) => {
    const updated = StorageService.saveGalleryCustomization({ wallpaperStyle: style });
    setCustomization(updated);
  };

  const handleUpdateFrame = (style: GalleryCustomization['frameStyle']) => {
    const updated = StorageService.saveGalleryCustomization({ frameStyle: style });
    setCustomization(updated);
  };

  return (
    <View style={[styles.container, { backgroundColor: wallpaperBg }]}>
      {/* 상단 네비게이션 헤더 */}
      <View style={[styles.header, { borderColor: theme.colors.borderGold }]}>
        <TouchableOpacity
          onPress={onBack}
          style={[styles.backBtn, { minHeight: theme.minTouchSize, minWidth: theme.minTouchSize }]}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>

        <View style={styles.titleGroup}>
          <Text style={[styles.title, { fontSize: theme.typography.h2, color: theme.colors.goldBright }]}>
            나만의 가상 미술관
          </Text>
          <Text style={[styles.subtitle, { fontSize: theme.typography.caption, color: '#e2e8f0' }]}>
            제1전시실 • 완성된 명화 {completedPaintings.length}/{MASTERPIECES.length}점 전시 중
          </Text>
        </View>
      </View>

      {/* 가로 스크롤 미술관 전시실 벽면 */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.galleryWall}
      >
        {MASTERPIECES.map((painting, index) => {
          const isCompleted = completedPaintings.some(p => p.id === painting.id);

          return (
            <View key={painting.id} style={styles.artworkStation}>
              {/* 미술관 천장 조명 (스포트라이트 효과) */}
              <View style={styles.spotlight} />

              {/* 액자 프레임 */}
              <TouchableOpacity
                style={[
                  styles.pictureFrame,
                  { borderColor: frameBorderColor },
                  !isCompleted && styles.emptyFrame
                ]}
                onPress={() => onSelectPainting(painting)}
              >
                {isCompleted ? (
                  <Image source={{ uri: painting.imageUrl }} style={styles.artworkImage} resizeMode="cover" />
                ) : (
                  <View style={styles.uncompletedPlaceholder}>
                    <Ionicons name="image-outline" size={44} color="rgba(255, 255, 255, 0.2)" />
                    <Text style={styles.uncompletedText}>미완성 작품</Text>
                    <Text style={styles.touchToPlay}>터치하여 맞추기</Text>
                  </View>
                )}
              </TouchableOpacity>

              {/* 황동 명판 (Plaque) */}
              <View style={styles.plaque}>
                <Text style={styles.plaqueTitle} numberOfLines={1}>{painting.title}</Text>
                <Text style={styles.plaqueArtist}>{painting.painter.name}</Text>
                {isCompleted && (
                  <View style={styles.exhibitBadge}>
                    <Ionicons name="ribbon" size={12} color="#f5d76e" />
                    <Text style={styles.exhibitText}>전시 중</Text>
                  </View>
                )}
              </View>

              {/* 미술관 원목 바닥 장식 */}
              <View style={styles.floorBevel} />
            </View>
          );
        })}
      </ScrollView>

      {/* 하단 인테리어 커스터마이징 툴바 */}
      <View style={[styles.customToolbar, { backgroundColor: 'rgba(10, 14, 22, 0.92)' }]}>
        <View style={styles.toolbarRow}>
          <Text style={[styles.toolLabel, { fontSize: theme.typography.caption, color: theme.colors.goldBright }]}>
            벽지 테마:
          </Text>
          <View style={styles.btnGroup}>
            <TouchableOpacity
              style={[styles.pillBtn, customization.wallpaperStyle === 'classic_velvet' && styles.activePill]}
              onPress={() => handleUpdateWallpaper('classic_velvet')}
            >
              <Text style={styles.pillText}>벨벳 레드</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.pillBtn, customization.wallpaperStyle === 'modern_slate' && styles.activePill]}
              onPress={() => handleUpdateWallpaper('modern_slate')}
            >
              <Text style={styles.pillText}>슬레이트 블랙</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.pillBtn, customization.wallpaperStyle === 'gallery_wood' && styles.activePill]}
              onPress={() => handleUpdateWallpaper('gallery_wood')}
            >
              <Text style={styles.pillText}>클래식 원목</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.toolbarRow}>
          <Text style={[styles.toolLabel, { fontSize: theme.typography.caption, color: theme.colors.goldBright }]}>
            액자 스타일:
          </Text>
          <View style={styles.btnGroup}>
            <TouchableOpacity
              style={[styles.pillBtn, customization.frameStyle === 'ornate_gold' && styles.activePill]}
              onPress={() => handleUpdateFrame('ornate_gold')}
            >
              <Text style={styles.pillText}>앤틱 골드</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.pillBtn, customization.frameStyle === 'minimal_black' && styles.activePill]}
              onPress={() => handleUpdateFrame('minimal_black')}
            >
              <Text style={styles.pillText}>모던 블랙</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.pillBtn, customization.frameStyle === 'natural_oak' && styles.activePill]}
              onPress={() => handleUpdateFrame('natural_oak')}
            >
              <Text style={styles.pillText}>내추럴 오크</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    backgroundColor: 'rgba(5, 7, 12, 0.65)'
  },
  backBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  titleGroup: {
    flex: 1
  },
  title: {
    fontWeight: 'bold'
  },
  subtitle: {
    marginTop: 2
  },
  galleryWall: {
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 40
  },
  artworkStation: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  spotlight: {
    width: 140,
    height: 14,
    backgroundColor: 'rgba(255, 245, 200, 0.18)',
    borderRadius: 7,
    marginBottom: 16,
    shadowColor: '#fff',
    shadowOpacity: 0.5,
    shadowRadius: 10
  },
  pictureFrame: {
    width: 250,
    height: 310,
    borderRadius: 10,
    borderWidth: 10,
    backgroundColor: '#0a0d14',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.8,
    shadowRadius: 24,
    elevation: 12
  },
  emptyFrame: {
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center'
  },
  artworkImage: {
    width: '100%',
    height: '100%'
  },
  uncompletedPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16
  },
  uncompletedText: {
    color: '#8492a6',
    fontWeight: '600',
    fontSize: 14,
    marginTop: 8
  },
  touchToPlay: {
    color: '#f5d76e',
    fontSize: 12,
    marginTop: 4
  },
  plaque: {
    marginTop: 14,
    backgroundColor: 'rgba(25, 20, 12, 0.92)',
    borderWidth: 1,
    borderColor: '#d4af37',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
    minWidth: 160,
    maxWidth: 220
  },
  plaqueTitle: {
    color: '#f5d76e',
    fontWeight: 'bold',
    fontSize: 13
  },
  plaqueArtist: {
    color: '#cbd5e1',
    fontSize: 11,
    marginTop: 2
  },
  exhibitBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 3
  },
  exhibitText: {
    color: '#f5d76e',
    fontSize: 10,
    fontWeight: '600'
  },
  floorBevel: {
    width: 280,
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginTop: 20,
    borderRadius: 4
  },
  customToolbar: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    gap: 8
  },
  toolbarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  toolLabel: {
    fontWeight: '600',
    marginRight: 8
  },
  btnGroup: {
    flexDirection: 'row',
    gap: 6
  },
  pillBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'transparent'
  },
  activePill: {
    backgroundColor: 'rgba(212, 175, 55, 0.25)',
    borderColor: '#f5d76e'
  },
  pillText: {
    color: '#f8fafc',
    fontSize: 11,
    fontWeight: '500'
  }
});
