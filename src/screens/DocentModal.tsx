// 도슨트 비하인드 스토리 카드 모달 (퍼즐 완성 시 등장)

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Painting } from '../types';
import { useAppTheme } from '../context/ThemeContext';
import { audioHaptics } from '../services/audioHaptics';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  visible: boolean;
  painting: Painting | null;
  onClose: () => void;
  onGoToVirtualMuseum: () => void;
}

export const DocentModal: React.FC<Props> = ({
  visible,
  painting,
  onClose,
  onGoToVirtualMuseum
}) => {
  const { theme } = useAppTheme();

  useEffect(() => {
    if (visible) {
      audioHaptics.triggerVictory();
    }
  }, [visible]);

  if (!painting) return null;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={[styles.card, { backgroundColor: theme.colors.bgCard, borderColor: theme.colors.borderGold }]}>
          {/* 축하 뱃지 헤더 */}
          <View style={styles.header}>
            <View style={styles.sparkleRow}>
              <Ionicons name="sparkles" size={20} color={theme.colors.goldBright} />
              <Text style={[styles.congratsText, { fontSize: theme.typography.caption, color: theme.colors.goldBright }]}>
                명화 완성 축하합니다!
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={[styles.closeBtn, { minHeight: theme.minTouchSize, minWidth: theme.minTouchSize }]}>
              <Ionicons name="close" size={24} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {/* 완성 명화 액자 뷰 */}
            <View style={[styles.frameWrapper, { borderColor: theme.colors.goldMuted }]}>
              <Image source={{ uri: painting.imageUrl }} style={styles.artworkImage} resizeMode="cover" />
            </View>

            {/* 명화 타이틀 & 작가 */}
            <Text style={[styles.artTitle, { fontSize: theme.typography.h1, color: theme.colors.textPrimary }]}>
              {painting.title}
            </Text>
            <Text style={[styles.painterInfo, { fontSize: theme.typography.body, color: theme.colors.goldBright }]}>
              {painting.painter.name} ({painting.painter.birthYear} - {painting.painter.deathYear})
            </Text>
            <Text style={[styles.museumText, { fontSize: theme.typography.caption, color: theme.colors.textMuted }]}>
              {painting.museum || '세계 유명 미술관 소장'} • {painting.year}
            </Text>

            {/* 도슨트 해설 카드 */}
            <View style={[styles.docentBox, { backgroundColor: theme.colors.bgElevated, borderColor: theme.colors.borderGold }]}>
              <View style={styles.docentHeader}>
                <Ionicons name="mic-outline" size={18} color={theme.colors.goldBright} />
                <Text style={[styles.docentTitle, { fontSize: theme.typography.h3, color: theme.colors.goldBright }]}>
                  도슨트 비하인드 스토리
                </Text>
              </View>
              <Text style={[styles.storyText, { fontSize: theme.typography.body, color: theme.colors.textSecondary, lineHeight: theme.typography.body * 1.6 }]}>
                {painting.docentStory}
              </Text>
            </View>
          </ScrollView>

          {/* 하단 액션 버튼 */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.museumBtn, { backgroundColor: theme.colors.goldBright, minHeight: theme.minTouchSize }]}
              onPress={() => {
                onClose();
                onGoToVirtualMuseum();
              }}
            >
              <Ionicons name="easel-outline" size={20} color="#0b0e14" />
              <Text style={[styles.museumBtnText, { fontSize: theme.typography.body }]}>
                나만의 가상 미술관에 전시하기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(5, 7, 12, 0.88)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  },
  card: {
    width: '100%',
    maxWidth: 480,
    maxHeight: '90%',
    borderRadius: 24,
    borderWidth: 1.5,
    padding: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  sparkleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  congratsText: {
    fontWeight: 'bold',
    letterSpacing: 0.5
  },
  closeBtn: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 16
  },
  frameWrapper: {
    width: '100%',
    height: 220,
    borderRadius: 14,
    borderWidth: 4,
    overflow: 'hidden',
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 8
  },
  artworkImage: {
    width: '100%',
    height: '100%'
  },
  artTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 6
  },
  painterInfo: {
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 2
  },
  museumText: {
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 16
  },
  docentBox: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    padding: 18,
    gap: 10
  },
  docentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  docentTitle: {
    fontWeight: 'bold'
  },
  storyText: {
    textAlign: 'justify'
  },
  footer: {
    marginTop: 14,
    width: '100%'
  },
  museumBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    gap: 8
  },
  museumBtnText: {
    color: '#0b0e14',
    fontWeight: 'bold'
  }
});
