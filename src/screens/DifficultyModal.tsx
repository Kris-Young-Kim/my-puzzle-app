// 난이도 선택 모달 (25 / 100 / 400 피스, 하위 완료 시 상위 해금)

import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Painting, DifficultyLevel } from '../types';
import { StorageService } from '../services/storage';
import { useAppTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  visible: boolean;
  painting: Painting | null;
  onClose: () => void;
  onSelectDifficulty: (painting: Painting, level: DifficultyLevel) => void;
}

export const DifficultyModal: React.FC<Props> = ({
  visible,
  painting,
  onClose,
  onSelectDifficulty
}) => {
  const { theme } = useAppTheme();
  if (!painting) return null;

  // 하위 난이도 완료 여부 확인
  const is25Completed = StorageService.getProgress(painting.id, '25')?.isCompleted || false;
  const is100Completed = StorageService.getProgress(painting.id, '100')?.isCompleted || false;

  const levels: { level: DifficultyLevel; label: string; desc: string; unlocked: boolean }[] = [
    { level: '25', label: '25 피스', desc: '5 × 5 입문용 (가볍고 편안한 힐링)', unlocked: true },
    { level: '100', label: '100 피스', desc: '10 × 10 집중과 몰입', unlocked: is25Completed },
    { level: '400', label: '400 피스', desc: '20 × 20 장인 모드', unlocked: is100Completed }
  ];

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={[styles.modalCard, { backgroundColor: theme.colors.bgCard, borderColor: theme.colors.borderGold }]}>
          {/* 헤더 */}
          <View style={styles.header}>
            <View>
              <Text style={[styles.title, { fontSize: theme.typography.h2, color: theme.colors.goldBright }]}>
                {painting.title}
              </Text>
              <Text style={[styles.subtitle, { fontSize: theme.typography.caption, color: theme.colors.textSecondary }]}>
                {painting.painter.name} • {painting.year}
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={[styles.closeBtn, { minHeight: theme.minTouchSize, minWidth: theme.minTouchSize }]}>
              <Ionicons name="close" size={24} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <Text style={[styles.instruction, { fontSize: theme.typography.caption, color: theme.colors.textMuted }]}>
            도전할 퍼즐의 조각 수를 선택하세요 (하위 단계 완료 시 해금)
          </Text>

          {/* 난이도 리스트 */}
          <View style={styles.list}>
            {levels.map((item) => {
              const progress = StorageService.getProgress(painting.id, item.level);
              const placedCount = progress?.placedPieceIds.length || 0;
              const totalPieces = item.level === '25' ? 25 : item.level === '100' ? 100 : 400;

              return (
                <TouchableOpacity
                  key={item.level}
                  style={[
                    styles.levelCard,
                    { minHeight: theme.minTouchSize + 16, backgroundColor: theme.colors.bgElevated },
                    !item.unlocked && styles.lockedCard
                  ]}
                  disabled={!item.unlocked}
                  onPress={() => onSelectDifficulty(painting, item.level)}
                >
                  <View style={styles.levelLeft}>
                    <View style={styles.levelTitleRow}>
                      <Text style={[styles.levelLabel, { fontSize: theme.typography.h3, color: item.unlocked ? theme.colors.textPrimary : theme.colors.textMuted }]}>
                        {item.label}
                      </Text>
                      {progress?.isCompleted ? (
                        <View style={styles.completedBadge}>
                          <Ionicons name="checkmark-circle" size={16} color={theme.colors.accentSuccess} />
                          <Text style={[styles.completedText, { color: theme.colors.accentSuccess }]}>완료됨</Text>
                        </View>
                      ) : placedCount > 0 ? (
                        <Text style={[styles.progressText, { color: theme.colors.goldBright }]}>
                          진행 중 ({placedCount}/{totalPieces})
                        </Text>
                      ) : null}
                    </View>
                    <Text style={[styles.levelDesc, { fontSize: theme.typography.caption, color: theme.colors.textMuted }]}>
                      {item.desc}
                    </Text>
                  </View>

                  <View style={styles.levelRight}>
                    {item.unlocked ? (
                      <Ionicons name="chevron-forward" size={22} color={theme.colors.goldBright} />
                    ) : (
                      <Ionicons name="lock-closed" size={20} color={theme.colors.textMuted} />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(5, 7, 12, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  modalCard: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 20,
    borderWidth: 1,
    padding: 24
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6
  },
  title: {
    fontWeight: 'bold'
  },
  subtitle: {
    marginTop: 2
  },
  closeBtn: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  instruction: {
    marginBottom: 16
  },
  list: {
    gap: 12
  },
  levelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)'
  },
  lockedCard: {
    opacity: 0.5
  },
  levelLeft: {
    flex: 1
  },
  levelTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  levelLabel: {
    fontWeight: 'bold'
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3
  },
  completedText: {
    fontSize: 12,
    fontWeight: '600'
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600'
  },
  levelDesc: {
    marginTop: 4
  },
  levelRight: {
    marginLeft: 12
  }
});
