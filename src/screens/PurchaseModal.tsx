// 인앱 구매(IAP) 결제 확인 모달
// 명화 낱개(990원), 패키지 번들, 액자, 미술관 배경 구매 및 구글 플레이 빌링 시뮬레이션

import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Animated
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../context/ThemeContext';
import { ShopItem } from '../types';
import { StorageService } from '../services/storage';

interface Props {
  visible: boolean;
  item: ShopItem | null;
  onClose: () => void;
  onPurchaseSuccess: (item: ShopItem) => void;
}

export const PurchaseModal: React.FC<Props> = ({
  visible,
  item,
  onClose,
  onPurchaseSuccess
}) => {
  const { theme } = useAppTheme();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!item) return null;

  const handleConfirmPurchase = () => {
    setIsProcessing(true);

    // 구글 플레이 인앱 결제(IAP Billing) 시뮬레이션 지연 (1.2초)
    setTimeout(() => {
      // 1. 스토리지에 소유권 영구 반영
      if (item.type === 'painting') {
        StorageService.unlockPainting(item.id);
      } else if (item.type === 'pack') {
        StorageService.unlockPack(item.id, item.paintingIds);
      } else if (item.type === 'frame') {
        StorageService.unlockFrame(item.frameStyle);
      } else if (item.type === 'wallpaper') {
        StorageService.unlockWallpaper(item.wallpaperStyle);
      }

      setIsProcessing(false);
      setIsCompleted(true);

      // 성공 메시지 1초 노출 후 닫기 및 콜백
      setTimeout(() => {
        setIsCompleted(false);
        onPurchaseSuccess(item);
        onClose();
      }, 1000);
    }, 1200);
  };

  const getItemTypeBadge = () => {
    switch (item.type) {
      case 'painting':
        return '명화 낱개 해금 (개당 990원)';
      case 'pack':
        return '스페셜 확장팩 컬렉션';
      case 'frame':
        return '명품 액자 프레임';
      case 'wallpaper':
        return '가상 미술관 전시실 테마';
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.dialogCard, { backgroundColor: '#10141f', borderColor: theme.colors.borderGold }]}>
          {/* 상단 닫기 버튼 */}
          {!isProcessing && !isCompleted && (
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={22} color="#94a3b8" />
            </TouchableOpacity>
          )}

          {isCompleted ? (
            /* 결제 성공 축하 화면 */
            <View style={styles.successContainer}>
              <View style={styles.successIconCircle}>
                <Ionicons name="checkmark-sharp" size={42} color="#10b981" />
              </View>
              <Text style={[styles.successTitle, { color: theme.colors.goldBright }]}>
                소장 완료!
              </Text>
              <Text style={styles.successDesc}>
                {item.title}을(를) 영구 소장하였습니다.{'\n'}
                이제 언제든지 감상하고 복원할 수 있습니다.
              </Text>
            </View>
          ) : (
            /* 결제 확인 화면 */
            <View style={styles.contentWrap}>
              {/* 카테고리 뱃지 */}
              <View style={styles.badgePill}>
                <Ionicons name="diamond-outline" size={12} color="#f5d76e" />
                <Text style={styles.badgeText}>{getItemTypeBadge()}</Text>
              </View>

              {/* 프리뷰 이미지/아이콘 */}
              <View style={styles.previewWrap}>
                {item.type === 'painting' ? (
                  <Image source={{ uri: item.imageUrl }} style={styles.previewImage} resizeMode="cover" />
                ) : item.type === 'pack' ? (
                  <View style={[styles.packPreview, { backgroundColor: item.bannerColor }]}>
                    <Ionicons name="albums-outline" size={48} color="#d4af37" />
                    <Text style={styles.packCountText}>{item.paintingIds.length}점 명화 포함</Text>
                  </View>
                ) : item.type === 'frame' ? (
                  <View style={[styles.framePreview, { borderColor: item.borderColor, borderWidth: item.borderWidth }]}>
                    <Ionicons name="image-outline" size={36} color="rgba(255, 255, 255, 0.4)" />
                  </View>
                ) : (
                  <View style={[styles.wallpaperPreview, { backgroundColor: item.bgColor }]}>
                    <Ionicons name="color-palette-outline" size={36} color={item.accentColor} />
                  </View>
                )}
              </View>

              {/* 상품 타이틀 & 설명 */}
              <Text style={[styles.itemTitle, { color: theme.colors.goldBright }]}>
                {item.title}
              </Text>
              {'artist' in item && item.artist ? (
                <Text style={styles.itemArtist}>{item.artist}</Text>
              ) : null}

              <Text style={styles.itemDescription} numberOfLines={3}>
                {item.description}
              </Text>

              {/* 혜택 안내 리스트 */}
              <View style={styles.benefitBox}>
                <View style={styles.benefitRow}>
                  <Ionicons name="checkmark-circle" size={16} color="#10b981" />
                  <Text style={styles.benefitText}>모든 난이도(25, 100, 400피스) 영구 해금</Text>
                </View>
                <View style={styles.benefitRow}>
                  <Ionicons name="checkmark-circle" size={16} color="#10b981" />
                  <Text style={styles.benefitText}>완성 후 전문 도슨트 오디오 스토리 해금</Text>
                </View>
                <View style={styles.benefitRow}>
                  <Ionicons name="checkmark-circle" size={16} color="#10b981" />
                  <Text style={styles.benefitText}>나만의 가상 미술관 액자 전시 가능</Text>
                </View>
              </View>

              {/* 구글 플레이 스토어 안전 결제 뱃지 */}
              <View style={styles.storeSafetyRow}>
                <Ionicons name="shield-checkmark-outline" size={14} color="#60a5fa" />
                <Text style={styles.storeSafetyText}>Google Play 인앱 결제 보안 인증 연동</Text>
              </View>

              {/* 하단 가격 및 결제 버튼 */}
              <TouchableOpacity
                style={[styles.buyBtn, isProcessing && styles.buyBtnDisabled]}
                onPress={handleConfirmPurchase}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <View style={styles.processingRow}>
                    <ActivityIndicator size="small" color="#0b0e14" />
                    <Text style={styles.processingText}>결제 승인 처리 중...</Text>
                  </View>
                ) : (
                  <View style={styles.buyBtnInner}>
                    <Ionicons name="bag-check-outline" size={18} color="#0b0e14" />
                    <Text style={styles.buyBtnPrice}>{item.priceDisplay} 구매하기</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.82)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  dialogCard: {
    width: '100%',
    maxWidth: 380,
    borderRadius: 20,
    borderWidth: 1.5,
    padding: 24,
    shadowColor: '#d4af37',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 18,
    elevation: 12
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
    padding: 6
  },
  contentWrap: {
    alignItems: 'center'
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 5,
    marginBottom: 14
  },
  badgeText: {
    color: '#f5d76e',
    fontSize: 11,
    fontWeight: '700'
  },
  previewWrap: {
    width: 140,
    height: 140,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#0a0d14',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16
  },
  previewImage: {
    width: '100%',
    height: '100%'
  },
  packPreview: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  packCountText: {
    color: '#e2e8f0',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 6
  },
  framePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#161b26'
  },
  wallpaperPreview: {
    width: 100,
    height: 100,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4
  },
  itemArtist: {
    fontSize: 13,
    color: '#94a3b8',
    marginBottom: 8
  },
  itemDescription: {
    fontSize: 12,
    color: '#cbd5e1',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16
  },
  benefitBox: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 12,
    padding: 12,
    gap: 8,
    marginBottom: 14
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  benefitText: {
    fontSize: 11.5,
    color: '#e2e8f0'
  },
  storeSafetyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16
  },
  storeSafetyText: {
    fontSize: 11,
    color: '#93c5fd'
  },
  buyBtn: {
    width: '100%',
    backgroundColor: '#d4af37',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buyBtnDisabled: {
    opacity: 0.6
  },
  buyBtnInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  buyBtnPrice: {
    color: '#0b0e14',
    fontSize: 15,
    fontWeight: 'bold'
  },
  processingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  processingText: {
    color: '#0b0e14',
    fontSize: 14,
    fontWeight: '600'
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 20
  },
  successIconCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#10b981'
  },
  successTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8
  },
  successDesc: {
    fontSize: 13,
    color: '#cbd5e1',
    textAlign: 'center',
    lineHeight: 20
  }
});
