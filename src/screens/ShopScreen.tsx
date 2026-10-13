// 명작 부티크 화면 (ShopScreen.tsx)
// 명화 낱개 구매(개당 990원), 테마별 확장팩 번들, 명품 액자, 미술관 전시실 배경 테마 인앱 구매

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../context/ThemeContext';
import {
  ShopCategory,
  ShopItem,
  ShopPaintingItem,
  ShopPackItem,
  ShopFrameItem,
  ShopWallpaperItem
} from '../types';
import {
  SHOP_PAINTINGS,
  SHOP_PACKS,
  SHOP_FRAMES,
  SHOP_WALLPAPERS,
  FREE_PAINTING_IDS
} from '../data/shopCatalog';
import { MASTERPIECES } from '../data/paintings';
import { StorageService } from '../services/storage';
import { PurchaseModal } from './PurchaseModal';
import { getSafeImageUrl } from '../utils/imageUrl';

interface Props {
  onBack: () => void;
  onGoToVirtualMuseum?: () => void;
}

export const ShopScreen: React.FC<Props> = ({ onBack, onGoToVirtualMuseum }) => {
  const { theme } = useAppTheme();
  const screenWidth = Dimensions.get('window').width;

  const [activeTab, setActiveTab] = useState<ShopCategory>('paintings');
  const [purchases, setPurchases] = useState(() => StorageService.getPurchases());
  const [galleryCustom, setGalleryCustom] = useState(() => StorageService.getGalleryCustomization());

  // 선택된 구매 대상 아이템 (모달용)
  const [selectedItemToBuy, setSelectedItemToBuy] = useState<ShopItem | null>(null);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  // 액자/배경 탭에서의 실시간 프리뷰 선택 상태
  const [previewFrame, setPreviewFrame] = useState(galleryCustom.frameStyle);
  const [previewWallpaper, setPreviewWallpaper] = useState(galleryCustom.wallpaperStyle);

  const refreshPurchases = () => {
    setPurchases(StorageService.getPurchases());
    setGalleryCustom(StorageService.getGalleryCustomization());
  };

  const handleOpenPurchase = (item: ShopItem) => {
    setSelectedItemToBuy(item);
    setIsPurchaseModalOpen(true);
  };

  const handlePurchaseSuccess = (item: ShopItem) => {
    refreshPurchases();
    if (item.type === 'frame') {
      StorageService.saveGalleryCustomization({ frameStyle: item.frameStyle });
      setGalleryCustom(StorageService.getGalleryCustomization());
    } else if (item.type === 'wallpaper') {
      StorageService.saveGalleryCustomization({ wallpaperStyle: item.wallpaperStyle });
      setGalleryCustom(StorageService.getGalleryCustomization());
    }
  };

  const handleApplyFrame = (frameStyle: ShopFrameItem['frameStyle']) => {
    const updated = StorageService.saveGalleryCustomization({ frameStyle });
    setGalleryCustom(updated);
    setPreviewFrame(frameStyle);
  };

  const handleApplyWallpaper = (wallpaperStyle: ShopWallpaperItem['wallpaperStyle']) => {
    const updated = StorageService.saveGalleryCustomization({ wallpaperStyle });
    setGalleryCustom(updated);
    setPreviewWallpaper(wallpaperStyle);
  };

  const handleRestorePurchases = () => {
    const res = StorageService.restorePurchases();
    refreshPurchases();
    Alert.alert(
      '구매 내역 복원 완료',
      `Google Play 계정에 등록된 총 ${res.restoredCount}개의 소장 품목이 안전하게 복원되었습니다.`,
      [{ text: '확인' }]
    );
  };

  const ownedPaintingsCount = MASTERPIECES.filter((p) =>
    purchases.paintings.includes(p.id)
  ).length;

  return (
    <View style={[styles.container, { backgroundColor: '#07090e' }]}>
      {/* 상단 럭셔리 헤더 */}
      <View style={[styles.header, { borderColor: theme.colors.borderGold }]}>
        <TouchableOpacity
          onPress={onBack}
          style={[styles.backBtn, { minHeight: theme.minTouchSize, minWidth: theme.minTouchSize }]}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>

        <View style={styles.titleGroup}>
          <Text style={[styles.brandText, { fontSize: theme.typography.caption, color: theme.colors.goldBright }]}>
            L’ATELIER BOUTIQUE
          </Text>
          <Text style={[styles.mainTitle, { fontSize: theme.typography.h2, color: '#ffffff' }]}>
            명작 부티크
          </Text>
        </View>

        {/* 구매 복원 버튼 */}
        <TouchableOpacity
          style={[styles.restoreBtn, { minHeight: theme.minTouchSize }]}
          onPress={handleRestorePurchases}
        >
          <Ionicons name="cloud-download-outline" size={16} color={theme.colors.goldBright} />
          <Text style={[styles.restoreBtnText, { color: theme.colors.goldBright }]}>복원</Text>
        </TouchableOpacity>
      </View>

      {/* 보유 현황 서브 배너 */}
      <View style={styles.collectionStatusRow}>
        <View style={styles.statusPill}>
          <Ionicons name="easel-outline" size={14} color="#f5d76e" />
          <Text style={styles.statusPillText}>
            소장 명화: <Text style={{ color: '#f5d76e', fontWeight: 'bold' }}>{ownedPaintingsCount}</Text> / {MASTERPIECES.length}점
          </Text>
        </View>
        <Text style={styles.singlePriceNote}>명화 개별 소장: 개당 990원</Text>
      </View>

      {/* 3대 카테고리 네비게이션 탭 */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'paintings' && styles.activeTabItem]}
          onPress={() => setActiveTab('paintings')}
        >
          <Ionicons
            name="images-outline"
            size={18}
            color={activeTab === 'paintings' ? theme.colors.goldBright : '#94a3b8'}
          />
          <Text style={[styles.tabLabel, activeTab === 'paintings' && { color: theme.colors.goldBright }]}>
            명화 & 확장팩
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'frames' && styles.activeTabItem]}
          onPress={() => setActiveTab('frames')}
        >
          <Ionicons
            name="square-outline"
            size={18}
            color={activeTab === 'frames' ? theme.colors.goldBright : '#94a3b8'}
          />
          <Text style={[styles.tabLabel, activeTab === 'frames' && { color: theme.colors.goldBright }]}>
            명품 액자
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'wallpapers' && styles.activeTabItem]}
          onPress={() => setActiveTab('wallpapers')}
        >
          <Ionicons
            name="color-palette-outline"
            size={18}
            color={activeTab === 'wallpapers' ? theme.colors.goldBright : '#94a3b8'}
          />
          <Text style={[styles.tabLabel, activeTab === 'wallpapers' && { color: theme.colors.goldBright }]}>
            미술관 배경
          </Text>
        </TouchableOpacity>
      </View>

      {/* 메인 스크롤 콘텐츠 */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* ========================================================= */}
        {/* TAB 1: 명화 & 확장팩 */}
        {/* ========================================================= */}
        {activeTab === 'paintings' && (
          <View>
            {/* 1. 기획전: 확장팩 패키지 번들 */}
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleRow}>
                <Ionicons name="sparkles" size={16} color="#d4af37" />
                <Text style={styles.sectionTitle}>테마별 스페셜 확장팩</Text>
              </View>
              <Text style={styles.sectionSubtitle}>최대 65% 특별 할인가로 소장하는 거장들의 컬렉션</Text>
            </View>

            {SHOP_PACKS.map((pack) => {
              const isPackOwned = purchases.packs.includes(pack.id);
              const allPaintingsOwned = pack.paintingIds.every((pid) =>
                purchases.paintings.includes(pid)
              );
              const isOwned = isPackOwned || allPaintingsOwned;

              return (
                <View
                  key={pack.id}
                  style={[
                    styles.packCard,
                    { borderColor: pack.id === 'pack-all-pass' ? '#d4af37' : 'rgba(212, 175, 55, 0.3)' }
                  ]}
                >
                  <View style={[styles.packTopBar, { backgroundColor: pack.bannerColor }]}>
                    <View style={styles.packBadgeGroup}>
                      <View style={styles.packTag}>
                        <Text style={styles.packTagText}>{pack.tag}</Text>
                      </View>
                      <View style={styles.packDiscountBadge}>
                        <Text style={styles.packDiscountText}>{pack.discountBadge}</Text>
                      </View>
                    </View>
                    <Text style={styles.packCountPill}>{pack.paintingIds.length}점 포함</Text>
                  </View>

                  <View style={styles.packBody}>
                    <Text style={styles.packTitle}>{pack.title}</Text>
                    <Text style={styles.packSubtitle}>{pack.subtitle}</Text>
                    <Text style={styles.packDesc}>{pack.description}</Text>

                    {/* 수록 명화 썸네일 프리뷰 */}
                    {pack.includedPaintingsPreview && (
                      <View style={styles.previewThumbRow}>
                        {pack.includedPaintingsPreview.map((url, idx) => (
                          <Image key={idx} source={{ uri: getSafeImageUrl(url, 200) }} style={styles.packThumb} resizeMode="cover" />
                        ))}
                      </View>
                    )}

                    <View style={styles.packBottomRow}>
                      <View style={styles.priceGroup}>
                        <Text style={styles.originalPrice}>{pack.originalPriceDisplay}</Text>
                        <Text style={styles.discountedPrice}>{pack.priceDisplay}</Text>
                      </View>

                      {isOwned ? (
                        <View style={styles.ownedChip}>
                          <Ionicons name="checkmark-circle" size={16} color="#10b981" />
                          <Text style={styles.ownedChipText}>소장 완료</Text>
                        </View>
                      ) : (
                        <TouchableOpacity
                          style={styles.packBuyBtn}
                          onPress={() => handleOpenPurchase(pack)}
                        >
                          <Ionicons name="bag-check" size={16} color="#0b0e14" />
                          <Text style={styles.packBuyBtnText}>{pack.priceDisplay} 소장하기</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              );
            })}

            {/* 2. 개별 명화 낱개 구매 그리드 (개당 990원) */}
            <View style={[styles.sectionHeader, { marginTop: 24 }]}>
              <View style={styles.sectionTitleRow}>
                <Ionicons name="grid-outline" size={16} color="#d4af37" />
                <Text style={styles.sectionTitle}>명화 개별 소장 (개당 990원)</Text>
              </View>
              <Text style={styles.sectionSubtitle}>원하는 걸작을 단품으로 골라 부담 없이 복원하세요</Text>
            </View>

            <View style={styles.paintingsGrid}>
              {SHOP_PAINTINGS.map((painting) => {
                const isFree = FREE_PAINTING_IDS.includes(painting.id);
                const isOwned = isFree || purchases.paintings.includes(painting.id);

                return (
                  <View key={painting.id} style={styles.paintingCard}>
                    <View style={styles.paintingThumbWrap}>
                      <Image source={{ uri: getSafeImageUrl(painting.imageUrl, 300) }} style={styles.paintingThumb} resizeMode="cover" />
                      <View style={[styles.priceTag, isFree && { backgroundColor: 'rgba(16, 185, 129, 0.9)' }]}>
                        <Text style={styles.priceTagText}>{isFree ? '무료' : '₩990'}</Text>
                      </View>
                    </View>

                    <View style={styles.paintingCardMeta}>
                      <Text style={styles.paintingTitle} numberOfLines={1}>
                        {painting.title}
                      </Text>
                      <Text style={styles.paintingArtist} numberOfLines={1}>
                        {painting.artist}
                      </Text>
                      <Text style={styles.paintingTag}>{painting.styleTag}</Text>

                      {isOwned ? (
                        <View style={[styles.cardOwnedBtn, isFree && { borderColor: 'rgba(16, 185, 129, 0.5)' }]}>
                          <Ionicons name="checkmark-sharp" size={14} color="#10b981" />
                          <Text style={[styles.cardOwnedText, isFree && { color: '#10b981' }]}>
                            {isFree ? '기본 소장' : '소장 중'}
                          </Text>
                        </View>
                      ) : (
                        <TouchableOpacity
                          style={styles.cardBuyBtn}
                          onPress={() => handleOpenPurchase(painting)}
                        >
                          <Ionicons name="bag-add-outline" size={14} color="#0b0e14" />
                          <Text style={styles.cardBuyText}>₩990 소장</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* ========================================================= */}
        {/* TAB 2: 명품 액자 */}
        {/* ========================================================= */}
        {activeTab === 'frames' && (
          <View>
            {/* 상단 액자 실시간 미리보기 */}
            <View style={styles.previewContainer}>
              <Text style={styles.previewSectionLabel}>선택한 액자 실시간 착용 미리보기</Text>
              <View style={styles.previewFrameCenter}>
                <View
                  style={[
                    styles.previewSampleFrame,
                    {
                      borderColor:
                        SHOP_FRAMES.find((f) => f.frameStyle === previewFrame)?.borderColor || '#d4af37',
                      borderWidth:
                        SHOP_FRAMES.find((f) => f.frameStyle === previewFrame)?.borderWidth || 6,
                      shadowColor:
                        SHOP_FRAMES.find((f) => f.frameStyle === previewFrame)?.glowColor || '#d4af37'
                    }
                  ]}
                >
                  <Image
                    source={{
                      uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg'
                    }}
                    style={styles.previewSampleImg}
                    resizeMode="cover"
                  />
                </View>
                <Text style={styles.previewFrameTitle}>
                  현재 액자: {SHOP_FRAMES.find((f) => f.frameStyle === previewFrame)?.title}
                </Text>
              </View>
            </View>

            {/* 액자 리스트 */}
            <View style={styles.itemListWrap}>
              {SHOP_FRAMES.map((frame) => {
                const isOwned = purchases.frames.includes(frame.frameStyle);
                const isApplied = galleryCustom.frameStyle === frame.frameStyle;

                return (
                  <View
                    key={frame.id}
                    style={[
                      styles.itemRowCard,
                      isApplied && { borderColor: theme.colors.goldBright, backgroundColor: 'rgba(212, 175, 55, 0.08)' }
                    ]}
                  >
                    <View
                      style={[
                        styles.frameThumbMini,
                        { borderColor: frame.borderColor, borderWidth: frame.borderWidth }
                      ]}
                    />

                    <View style={styles.itemRowMeta}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <Text style={styles.itemRowTitle}>{frame.title}</Text>
                        {frame.isFree && (
                          <View style={styles.freeBadge}>
                            <Text style={styles.freeBadgeText}>기본</Text>
                          </View>
                        )}
                      </View>
                      <Text style={styles.itemRowDesc}>{frame.description}</Text>
                      <Text style={styles.itemRowPrice}>{frame.priceDisplay}</Text>
                    </View>

                    <View style={styles.itemRowActions}>
                      {isApplied ? (
                        <View style={styles.appliedBadge}>
                          <Ionicons name="checkmark-circle" size={14} color="#10b981" />
                          <Text style={styles.appliedText}>적용 중</Text>
                        </View>
                      ) : isOwned ? (
                        <TouchableOpacity
                          style={styles.applyBtn}
                          onPress={() => handleApplyFrame(frame.frameStyle)}
                        >
                          <Text style={styles.applyBtnText}>액자 적용</Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          style={styles.buyItemBtn}
                          onPress={() => handleOpenPurchase(frame)}
                        >
                          <Ionicons name="bag-check-outline" size={14} color="#0b0e14" />
                          <Text style={styles.buyItemBtnText}>{frame.priceDisplay}</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* ========================================================= */}
        {/* TAB 3: 미술관 배경 */}
        {/* ========================================================= */}
        {activeTab === 'wallpapers' && (
          <View>
            {/* 상단 배경 실시간 미리보기 */}
            <View style={styles.previewContainer}>
              <Text style={styles.previewSectionLabel}>선택한 미술관 테마 분위기 미리보기</Text>
              <View
                style={[
                  styles.previewWallpaperBox,
                  {
                    backgroundColor:
                      SHOP_WALLPAPERS.find((w) => w.wallpaperStyle === previewWallpaper)?.bgColor ||
                      '#2e0f14'
                  }
                ]}
              >
                <View style={styles.ambientSpot} />
                <View style={{ alignItems: 'center', marginBottom: 10 }}>
                  <View style={{ borderWidth: 3, borderColor: '#d4af37', borderRadius: 6, overflow: 'hidden', elevation: 8 }}>
                    <Image
                      source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg' }}
                      style={{ width: 150, height: 95 }}
                      resizeMode="cover"
                    />
                  </View>
                </View>
                <Text style={styles.previewWallpaperTitle}>
                  {SHOP_WALLPAPERS.find((w) => w.wallpaperStyle === previewWallpaper)?.title}
                </Text>
              </View>
            </View>

            {/* 배경 테마 리스트 */}
            <View style={styles.itemListWrap}>
              {SHOP_WALLPAPERS.map((wallpaper) => {
                const isOwned = purchases.wallpapers.includes(wallpaper.wallpaperStyle);
                const isApplied = galleryCustom.wallpaperStyle === wallpaper.wallpaperStyle;

                return (
                  <View
                    key={wallpaper.id}
                    style={[
                      styles.itemRowCard,
                      isApplied && { borderColor: theme.colors.goldBright, backgroundColor: 'rgba(212, 175, 55, 0.08)' }
                    ]}
                  >
                    <View style={[styles.wallpaperThumbMini, { backgroundColor: wallpaper.bgColor }]} />

                    <View style={styles.itemRowMeta}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <Text style={styles.itemRowTitle}>{wallpaper.title}</Text>
                        {wallpaper.isFree && (
                          <View style={styles.freeBadge}>
                            <Text style={styles.freeBadgeText}>기본</Text>
                          </View>
                        )}
                      </View>
                      <Text style={styles.itemRowDesc}>{wallpaper.description}</Text>
                      <Text style={styles.itemRowPrice}>{wallpaper.priceDisplay}</Text>
                    </View>

                    <View style={styles.itemRowActions}>
                      {isApplied ? (
                        <View style={styles.appliedBadge}>
                          <Ionicons name="checkmark-circle" size={14} color="#10b981" />
                          <Text style={styles.appliedText}>적용 중</Text>
                        </View>
                      ) : isOwned ? (
                        <TouchableOpacity
                          style={styles.applyBtn}
                          onPress={() => handleApplyWallpaper(wallpaper.wallpaperStyle)}
                        >
                          <Text style={styles.applyBtnText}>배경 적용</Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          style={styles.buyItemBtn}
                          onPress={() => handleOpenPurchase(wallpaper)}
                        >
                          <Ionicons name="bag-check-outline" size={14} color="#0b0e14" />
                          <Text style={styles.buyItemBtnText}>{wallpaper.priceDisplay}</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>

      {/* 결제 확인 모달 */}
      <PurchaseModal
        visible={isPurchaseModalOpen}
        item={selectedItemToBuy}
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1
  },
  backBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6
  },
  titleGroup: {
    flex: 1,
    alignItems: 'center'
  },
  brandText: {
    letterSpacing: 2,
    fontWeight: '700'
  },
  mainTitle: {
    fontWeight: 'bold',
    marginTop: 2
  },
  restoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)'
  },
  restoreBtnText: {
    fontSize: 12,
    fontWeight: '600'
  },
  collectionStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#0c101a',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)'
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  statusPillText: {
    color: '#cbd5e1',
    fontSize: 12
  },
  singlePriceNote: {
    color: '#94a3b8',
    fontSize: 11
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#0a0e16',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(212, 175, 55, 0.2)'
  },
  tabItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 6,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent'
  },
  activeTabItem: {
    borderBottomColor: '#d4af37',
    backgroundColor: 'rgba(212, 175, 55, 0.08)'
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94a3b8'
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40
  },
  sectionHeader: {
    marginBottom: 12
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  sectionSubtitle: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 2
  },
  packCard: {
    backgroundColor: '#0e1320',
    borderRadius: 16,
    borderWidth: 1.5,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#d4af37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6
  },
  packTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8
  },
  packBadgeGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  packTag: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6
  },
  packTagText: {
    color: '#f5d76e',
    fontSize: 11,
    fontWeight: 'bold'
  },
  packDiscountBadge: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6
  },
  packDiscountText: {
    color: '#ffffff',
    fontSize: 10.5,
    fontWeight: 'bold'
  },
  packCountPill: {
    color: '#e2e8f0',
    fontSize: 11,
    fontWeight: '600'
  },
  packBody: {
    padding: 16
  },
  packTitle: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold'
  },
  packSubtitle: {
    color: '#d4af37',
    fontSize: 12.5,
    marginTop: 3,
    fontWeight: '600'
  },
  packDesc: {
    color: '#94a3b8',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 6
  },
  previewThumbRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
    marginBottom: 4
  },
  packThumb: {
    width: 58,
    height: 58,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)'
  },
  packBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)'
  },
  priceGroup: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8
  },
  originalPrice: {
    color: '#64748b',
    fontSize: 12,
    textDecorationLine: 'line-through'
  },
  discountedPrice: {
    color: '#f5d76e',
    fontSize: 18,
    fontWeight: 'bold'
  },
  packBuyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#d4af37',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10
  },
  packBuyBtnText: {
    color: '#0b0e14',
    fontSize: 13,
    fontWeight: 'bold'
  },
  ownedChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8
  },
  ownedChipText: {
    color: '#10b981',
    fontSize: 12,
    fontWeight: '600'
  },
  paintingsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12
  },
  paintingCard: {
    width: '48%',
    backgroundColor: '#0e1320',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    overflow: 'hidden'
  },
  paintingThumbWrap: {
    width: '100%',
    height: 120,
    position: 'relative'
  },
  paintingThumb: {
    width: '100%',
    height: '100%'
  },
  priceTag: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(7, 9, 14, 0.85)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#d4af37'
  },
  priceTagText: {
    color: '#f5d76e',
    fontSize: 11,
    fontWeight: 'bold'
  },
  paintingCardMeta: {
    padding: 10
  },
  paintingTitle: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold'
  },
  paintingArtist: {
    color: '#94a3b8',
    fontSize: 11,
    marginTop: 2
  },
  paintingTag: {
    color: '#d4af37',
    fontSize: 10,
    marginTop: 4,
    marginBottom: 8
  },
  cardBuyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: '#d4af37',
    paddingVertical: 7,
    borderRadius: 6
  },
  cardBuyText: {
    color: '#0b0e14',
    fontSize: 11,
    fontWeight: 'bold'
  },
  cardOwnedBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingVertical: 7,
    borderRadius: 6
  },
  cardOwnedText: {
    color: '#10b981',
    fontSize: 11,
    fontWeight: '600'
  },
  previewContainer: {
    backgroundColor: '#0e1320',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.25)'
  },
  previewSectionLabel: {
    color: '#d4af37',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12
  },
  previewFrameCenter: {
    alignItems: 'center'
  },
  previewSampleFrame: {
    width: 160,
    height: 120,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8
  },
  previewSampleImg: {
    width: '100%',
    height: '100%'
  },
  previewFrameTitle: {
    color: '#e2e8f0',
    fontSize: 12,
    marginTop: 10,
    fontWeight: '500'
  },
  previewWallpaperBox: {
    width: '100%',
    height: 130,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  ambientSpot: {
    position: 'absolute',
    top: 0,
    width: '60%',
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50
  },
  miniEasel: {
    marginBottom: 4
  },
  previewWallpaperTitle: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4
  },
  itemListWrap: {
    gap: 10
  },
  itemRowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0e1320',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)'
  },
  frameThumbMini: {
    width: 44,
    height: 44,
    borderRadius: 6,
    backgroundColor: '#161b26'
  },
  wallpaperThumbMini: {
    width: 44,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)'
  },
  itemRowMeta: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8
  },
  itemRowTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold'
  },
  freeBadge: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4
  },
  freeBadgeText: {
    color: '#60a5fa',
    fontSize: 10,
    fontWeight: 'bold'
  },
  itemRowDesc: {
    color: '#94a3b8',
    fontSize: 11,
    marginTop: 2
  },
  itemRowPrice: {
    color: '#f5d76e',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 4
  },
  itemRowActions: {
    minWidth: 76,
    alignItems: 'flex-end'
  },
  appliedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  appliedText: {
    color: '#10b981',
    fontSize: 12,
    fontWeight: '600'
  },
  applyBtn: {
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#d4af37'
  },
  applyBtnText: {
    color: '#d4af37',
    fontSize: 11,
    fontWeight: 'bold'
  },
  buyItemBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#d4af37',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 6
  },
  buyItemBtnText: {
    color: '#0b0e14',
    fontSize: 11,
    fontWeight: 'bold'
  }
});
