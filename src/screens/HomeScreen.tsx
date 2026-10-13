// 홈 화면 (명화 카탈로그 그리드, 가상미술관 입구, 시니어 모드 원터치 토글)

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';
import { MASTERPIECES } from '../data/paintings';
import { Painting } from '../types';
import { StorageService } from '../services/storage';
import { useAppTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';

interface Props {
  onSelectPainting: (painting: Painting) => void;
  onGoToVirtualMuseum: () => void;
  onGoToSettings: () => void;
  onOpenAuth: () => void;
}

export const HomeScreen: React.FC<Props> = ({
  onSelectPainting,
  onGoToVirtualMuseum,
  onGoToSettings,
  onOpenAuth
}) => {
  const { theme, seniorMode, toggleSeniorMode } = useAppTheme();
  const { user, isSignedIn } = useUser();
  const screenWidth = Dimensions.get('window').width;
  const numColumns = screenWidth > 500 ? 3 : 2;
  const cardWidth = (screenWidth - 32 - (numColumns - 1) * 12) / numColumns;

  const [selectedTag, setSelectedTag] = useState<string>('전체');

  const tags = ['전체', '후기 인상주의', '인상주의', '네덜란드 황금기', '아르누보 / 상징주의', '르네상스'];

  const filteredPaintings = selectedTag === '전체'
    ? MASTERPIECES
    : MASTERPIECES.filter(p => p.styleTag.includes(selectedTag));

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.bgDark }]}>
      {/* 상단 럭셔리 뮤지엄 헤더 */}
      <View style={[styles.header, { borderColor: theme.colors.borderGold }]}>
        <View style={styles.titleArea}>
          <Text style={[styles.brandText, { fontSize: theme.typography.caption, color: theme.colors.goldBright }]}>
            L’ATELIER DES MAÎTRES
          </Text>
          <Text style={[styles.mainTitle, { fontSize: theme.typography.h1, color: theme.colors.textPrimary }]}>
            힐링 명화 미술관
          </Text>
        </View>

        <View style={styles.headerButtons}>
          {/* Clerk 회원 로그인 / 프로필 버튼 */}
          {isSignedIn ? (
            <TouchableOpacity
              style={[styles.userChip, { minHeight: theme.minTouchSize, borderColor: theme.colors.borderGold }]}
              onPress={onOpenAuth}
            >
              {user?.imageUrl ? (
                <Image source={{ uri: user.imageUrl }} style={styles.miniAvatar} />
              ) : (
                <Ionicons name="person-circle" size={20} color={theme.colors.goldBright} />
              )}
              <Text style={[styles.userChipText, { color: theme.colors.goldBright, fontSize: theme.typography.caption }]} numberOfLines={1}>
                {user?.firstName || '회원'}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.loginChip, { minHeight: theme.minTouchSize, borderColor: theme.colors.borderGold }]}
              onPress={onOpenAuth}
            >
              <Ionicons name="log-in-outline" size={17} color={theme.colors.goldBright} />
              <Text style={[styles.loginChipText, { color: theme.colors.goldBright, fontSize: theme.typography.caption }]}>
                로그인
              </Text>
            </TouchableOpacity>
          )}

          {/* 시니어 모드 원터치 토글 칩 */}
          <TouchableOpacity
            style={[styles.seniorChip, seniorMode && styles.activeSeniorChip, { minHeight: theme.minTouchSize }]}
            onPress={toggleSeniorMode}
          >
            <Ionicons name="glasses-outline" size={16} color={seniorMode ? '#0b0e14' : theme.colors.goldBright} />
            <Text style={[styles.seniorChipText, { color: seniorMode ? '#0b0e14' : theme.colors.goldBright }]}>
              {seniorMode ? '시니어' : '시니어'}
            </Text>
          </TouchableOpacity>

          {/* 가상 미술관 바로가기 버튼 */}
          <TouchableOpacity
            style={[styles.iconButton, { minHeight: theme.minTouchSize, minWidth: theme.minTouchSize }]}
            onPress={onGoToVirtualMuseum}
          >
            <Ionicons name="easel-outline" size={22} color={theme.colors.goldBright} />
          </TouchableOpacity>

          {/* 설정 버튼 */}
          <TouchableOpacity
            style={[styles.iconButton, { minHeight: theme.minTouchSize, minWidth: theme.minTouchSize }]}
            onPress={onGoToSettings}
          >
            <Ionicons name="settings-outline" size={22} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 장르/스타일 필터 칩 */}
      <View style={styles.filterBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {tags.map((tag) => (
            <TouchableOpacity
              key={tag}
              style={[
                styles.filterChip,
                selectedTag === tag && { backgroundColor: 'rgba(212, 175, 55, 0.25)', borderColor: theme.colors.goldBright }
              ]}
              onPress={() => setSelectedTag(tag)}
            >
              <Text
                style={[
                  styles.filterText,
                  { fontSize: theme.typography.caption },
                  selectedTag === tag ? { color: theme.colors.goldBright, fontWeight: 'bold' } : { color: theme.colors.textSecondary }
                ]}
              >
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* 명화 갤러리 그리드 */}
      <ScrollView contentContainerStyle={styles.gridContainer}>
        <View style={styles.gridWrap}>
          {filteredPaintings.map((painting) => {
            const p25 = StorageService.getProgress(painting.id, '25')?.isCompleted;
            const p100 = StorageService.getProgress(painting.id, '100')?.isCompleted;
            const p400 = StorageService.getProgress(painting.id, '400')?.isCompleted;

            return (
              <TouchableOpacity
                key={painting.id}
                style={[styles.paintingCard, { width: cardWidth, backgroundColor: theme.colors.bgCard }]}
                onPress={() => onSelectPainting(painting)}
              >
                {/* 썸네일 이미지 */}
                <View style={styles.thumbWrap}>
                  <Image source={{ uri: painting.thumbnailUrl || painting.imageUrl }} style={styles.thumbImage} resizeMode="cover" />
                  <View style={styles.badgeRow}>
                    <View style={[styles.diffBadge, p25 && styles.diffDone]}>
                      <Text style={styles.diffBadgeText}>25</Text>
                    </View>
                    <View style={[styles.diffBadge, p100 && styles.diffDone]}>
                      <Text style={styles.diffBadgeText}>100</Text>
                    </View>
                    <View style={[styles.diffBadge, p400 && styles.diffDone]}>
                      <Text style={styles.diffBadgeText}>400</Text>
                    </View>
                  </View>
                </View>

                {/* 메타 정보 */}
                <View style={styles.cardInfo}>
                  <Text style={[styles.cardTitle, { fontSize: theme.typography.body, color: theme.colors.textPrimary }]} numberOfLines={1}>
                    {painting.title}
                  </Text>
                  <Text style={[styles.cardPainter, { fontSize: theme.typography.caption, color: theme.colors.textMuted }]} numberOfLines={1}>
                    {painting.painter.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
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
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1
  },
  titleArea: {
    flex: 1
  },
  brandText: {
    letterSpacing: 1.5,
    fontWeight: 'bold'
  },
  mainTitle: {
    fontWeight: 'bold',
    marginTop: 2
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  userChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    borderRadius: 14,
    borderWidth: 1,
    backgroundColor: 'rgba(212, 175, 55, 0.15)'
  },
  miniAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d4af37'
  },
  userChipText: {
    fontWeight: 'bold',
    maxWidth: 70
  },
  loginChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    borderRadius: 14,
    borderWidth: 1,
    backgroundColor: 'rgba(212, 175, 55, 0.1)'
  },
  loginChipText: {
    fontWeight: 'bold'
  },
  seniorChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
    backgroundColor: 'rgba(212, 175, 55, 0.1)'
  },
  activeSeniorChip: {
    backgroundColor: '#f5d76e',
    borderColor: '#f5d76e'
  },
  seniorChipText: {
    fontSize: 11,
    fontWeight: 'bold'
  },
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)'
  },
  filterBar: {
    paddingVertical: 10
  },
  filterScroll: {
    paddingHorizontal: 16,
    gap: 8
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.04)'
  },
  filterText: {
    fontWeight: '500'
  },
  gridContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24
  },
  gridWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12
  },
  paintingCard: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 4
  },
  thumbWrap: {
    width: '100%',
    aspectRatio: 4 / 3,
    backgroundColor: '#0c0f17'
  },
  thumbImage: {
    width: '100%',
    height: '100%'
  },
  badgeRow: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    flexDirection: 'row',
    gap: 4
  },
  diffBadge: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: 'rgba(11, 14, 20, 0.75)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)'
  },
  diffDone: {
    backgroundColor: '#10b981',
    borderColor: '#10b981'
  },
  diffBadgeText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  cardInfo: {
    padding: 10
  },
  cardTitle: {
    fontWeight: 'bold'
  },
  cardPainter: {
    marginTop: 2
  }
});
