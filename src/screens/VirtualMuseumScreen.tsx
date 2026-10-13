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
import { GalleryCustomization, Painting, ShopItem, FrameStyle, WallpaperStyle } from '../types';
import { useAppTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { SHOP_FRAMES, SHOP_WALLPAPERS } from '../data/shopCatalog';
import { PurchaseModal } from './PurchaseModal';
import { getSafeImageUrl } from '../utils/imageUrl';

interface Props {
  onBack: () => void;
  onSelectPainting: (painting: Painting) => void;
  onGoToShop?: () => void;
}

export const VirtualMuseumScreen: React.FC<Props> = ({ onBack, onSelectPainting, onGoToShop }) => {
  const { theme } = useAppTheme();
  const screenWidth = Dimensions.get('window').width;

  const [customization, setCustomization] = useState<GalleryCustomization>(() => {
    return StorageService.getGalleryCustomization();
  });
  const [purchases, setPurchases] = useState(() => StorageService.getPurchases());
  const [itemToBuy, setItemToBuy] = useState<ShopItem | null>(null);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

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
    gallery_wood: '#241a12',   // 클래식 원목
    orsay_midnight: '#0a1322', // 파리 오르세 심야 살롱
    louvre_moonlight: '#130e24',// 루브르 궁전 달빛 회랑
    uffizi_marble: '#1c1b18',  // 피렌체 우피치 대리석 홀
    belvedere_golden: '#241808',// 빈 벨베데레 황금 살롱
    rijks_damask: '#1a1410',   // 암스테르담 렘브란트 홀
    prado_crimson: '#2a0a10',  // 마드리드 프라도 궁정 크림슨
    met_grand_hall: '#14181f', // 뉴욕 메트로폴리탄 그랜드 홀
    national_emerald: '#061712'// 런던 내셔널 갤러리 로열 에메랄드
  }[customization.wallpaperStyle] || '#2e0f14';

  // 액자 스타일 테두리 매핑
  const frameBorderColor = {
    ornate_gold: '#d4af37',
    minimal_black: '#000000',
    natural_oak: '#b3824b',
    rococo_silver: '#e2e8f0',
    imperial_marble: '#f1ede4',
    renaissance_baroque: '#ffd700',
    art_deco_emerald: '#10b981',
    victorian_rosegold: '#fb7185',
    gothic_obsidian: '#334155',
    florentine_walnut: '#854d0e'
  }[customization.frameStyle] || '#d4af37';


  const handleSelectWallpaper = (style: WallpaperStyle) => {
    if (purchases.wallpapers.includes(style)) {
      const updated = StorageService.saveGalleryCustomization({ wallpaperStyle: style });
      setCustomization(updated);
    } else {
      const shopItem = SHOP_WALLPAPERS.find(w => w.wallpaperStyle === style);
      if (shopItem) {
        setItemToBuy(shopItem);
        setIsPurchaseModalOpen(true);
      }
    }
  };

  const handleSelectFrame = (style: FrameStyle) => {
    if (purchases.frames.includes(style)) {
      const updated = StorageService.saveGalleryCustomization({ frameStyle: style });
      setCustomization(updated);
    } else {
      const shopItem = SHOP_FRAMES.find(f => f.frameStyle === style);
      if (shopItem) {
        setItemToBuy(shopItem);
        setIsPurchaseModalOpen(true);
      }
    }
  };

  const handlePurchaseSuccess = (item: ShopItem) => {
    const updatedPurchases = StorageService.getPurchases();
    setPurchases(updatedPurchases);
    if (item.type === 'frame') {
      const updated = StorageService.saveGalleryCustomization({ frameStyle: item.frameStyle });
      setCustomization(updated);
    } else if (item.type === 'wallpaper') {
      const updated = StorageService.saveGalleryCustomization({ wallpaperStyle: item.wallpaperStyle });
      setCustomization(updated);
    }
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

        {onGoToShop && (
          <TouchableOpacity
            style={[styles.shopHeaderBtn, { minHeight: theme.minTouchSize }]}
            onPress={onGoToShop}
          >
            <Ionicons name="bag-handle" size={15} color="#0b0e14" />
            <Text style={styles.shopHeaderBtnText}>부티크</Text>
          </TouchableOpacity>
        )}
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
                  <Image source={{ uri: getSafeImageUrl(painting.imageUrl) }} style={styles.artworkImage} resizeMode="cover" />
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
      <View style={[styles.customToolbar, { backgroundColor: 'rgba(10, 14, 22, 0.94)' }]}>
        <View style={styles.toolbarRow}>
          <Text style={[styles.toolLabel, { fontSize: theme.typography.caption, color: theme.colors.goldBright }]}>
            벽지 테마:
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.btnGroupScroll}>
            {SHOP_WALLPAPERS.map((wp) => {
              const isOwned = purchases.wallpapers.includes(wp.wallpaperStyle);
              const isActive = customization.wallpaperStyle === wp.wallpaperStyle;

              return (
                <TouchableOpacity
                  key={wp.id}
                  style={[styles.pillBtn, isActive && styles.activePill]}
                  onPress={() => handleSelectWallpaper(wp.wallpaperStyle)}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    {!isOwned && <Ionicons name="lock-closed" size={11} color="#f5d76e" />}
                    <Text style={[styles.pillText, isActive && styles.activePillText]}>
                      {wp.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.toolbarRow}>
          <Text style={[styles.toolLabel, { fontSize: theme.typography.caption, color: theme.colors.goldBright }]}>
            액자 스타일:
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.btnGroupScroll}>
            {SHOP_FRAMES.map((fr) => {
              const isOwned = purchases.frames.includes(fr.frameStyle);
              const isActive = customization.frameStyle === fr.frameStyle;

              return (
                <TouchableOpacity
                  key={fr.id}
                  style={[styles.pillBtn, isActive && styles.activePill]}
                  onPress={() => handleSelectFrame(fr.frameStyle)}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    {!isOwned && <Ionicons name="lock-closed" size={11} color="#f5d76e" />}
                    <Text style={[styles.pillText, isActive && styles.activePillText]}>
                      {fr.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>

      {/* 결제 확인 모달 */}
      <PurchaseModal
        visible={isPurchaseModalOpen}
        item={itemToBuy}
        onClose={() => setIsPurchaseModalOpen(false)}
        onPurchaseSuccess={handlePurchaseSuccess}
      />
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
  btnGroupScroll: {
    flexDirection: 'row',
    gap: 6,
    paddingRight: 16
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
    color: '#cbd5e1',
    fontSize: 11,
    fontWeight: '500'
  },
  activePillText: {
    color: '#f5d76e',
    fontWeight: 'bold'
  },
  shopHeaderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#d4af37',
    paddingHorizontal: 10,
    borderRadius: 14
  },
  shopHeaderBtnText: {
    color: '#0b0e14',
    fontSize: 11,
    fontWeight: 'bold'
  }
});

