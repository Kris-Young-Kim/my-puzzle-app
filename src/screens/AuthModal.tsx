// Clerk 기반 회원가입 / 로그인 / 프로필 관리 모달
// 고급 미술관 테마 및 시니어 모드 완벽 호환

import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
  Image,
  Alert
} from 'react-native';
import { useSignIn, useSignUp, useUser, useClerk } from '@clerk/clerk-expo';
import { useAppTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<Props> = ({ visible, onClose }) => {
  const { theme, seniorMode } = useAppTheme();
  const { isLoaded: isSignInLoaded, signIn, setActive: setSignInActive } = useSignIn();
  const { isLoaded: isSignUpLoaded, signUp, setActive: setSignUpActive } = useSignUp();
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setCode('');
    setPendingVerification(false);
    setErrorMessage('');
    setLoading(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // 로그인 처리
  const handleSignIn = async () => {
    if (!isSignInLoaded || !signIn) return;
    if (!email.trim() || !password.trim()) {
      setErrorMessage('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    try {
      const result = await signIn.create({
        identifier: email.trim(),
        password
      });

      if (result.status === 'complete') {
        await setSignInActive({ session: result.createdSessionId });
        Alert.alert('로그인 성공', '안전하게 로그인되었습니다.');
        handleClose();
      } else {
        setErrorMessage('추가 인증이 필요합니다. 관리자에게 문의하세요.');
      }
    } catch (err: any) {
      const msg = err.errors?.[0]?.longMessage || err.errors?.[0]?.message || err.message || '로그인에 실패했습니다.';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  // 회원가입 처리
  const handleSignUp = async () => {
    if (!isSignUpLoaded || !signUp) return;
    if (!email.trim() || !password.trim()) {
      setErrorMessage('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    try {
      await signUp.create({
        emailAddress: email.trim(),
        password
      });

      // 이메일 인증 코드 발송
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err: any) {
      const msg = err.errors?.[0]?.longMessage || err.errors?.[0]?.message || err.message || '회원가입에 실패했습니다.';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  // 이메일 인증번호 확인
  const handleVerifyCode = async () => {
    if (!isSignUpLoaded || !signUp) return;
    if (!code.trim()) {
      setErrorMessage('인증 코드를 입력해주세요.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: code.trim()
      });

      if (completeSignUp.status === 'complete') {
        await setSignUpActive({ session: completeSignUp.createdSessionId });
        Alert.alert('회원가입 완료', '환영합니다! 클라우드 동기화가 활성화되었습니다.');
        handleClose();
      } else {
        setErrorMessage('인증이 아직 완료되지 않았습니다.');
      }
    } catch (err: any) {
      const msg = err.errors?.[0]?.longMessage || err.errors?.[0]?.message || err.message || '인증번호가 일치하지 않습니다.';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  // 로그아웃 처리
  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
      Alert.alert('로그아웃', '정상적으로 로그아웃되었습니다.');
      handleClose();
    } catch (err: any) {
      Alert.alert('오류', '로그아웃 도중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalBox, { backgroundColor: theme.colors.bgCard, borderColor: theme.colors.borderGold }]}>
          {/* 헤더 */}
          <View style={styles.modalHeader}>
            <View style={styles.titleWithIcon}>
              <Ionicons name="person-circle-outline" size={26} color={theme.colors.goldBright} />
              <Text style={[styles.modalTitle, { fontSize: theme.typography.h2, color: theme.colors.goldBright }]}>
                {isSignedIn ? '회원 프로필' : (mode === 'signin' ? '미술관 계정 로그인' : '새 계정 만들기')}
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleClose}
              style={[styles.closeBtn, { minHeight: theme.minTouchSize, minWidth: theme.minTouchSize }]}
            >
              <Ionicons name="close" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
            {isSignedIn ? (
              // 1. 로그인된 상태 (프로필 화면)
              <View style={styles.profileSection}>
                <View style={styles.avatarContainer}>
                  {user?.imageUrl ? (
                    <Image source={{ uri: user.imageUrl }} style={styles.avatarImage} />
                  ) : (
                    <View style={[styles.avatarPlaceholder, { backgroundColor: theme.colors.bgElevated }]}>
                      <Ionicons name="person" size={40} color={theme.colors.goldBright} />
                    </View>
                  )}
                  <View style={styles.onlineBadge} />
                </View>

                <Text style={[styles.userName, { fontSize: theme.typography.h3, color: theme.colors.textPrimary }]}>
                  {user?.fullName || user?.firstName || '명화 컬렉터'}
                </Text>
                <Text style={[styles.userEmail, { fontSize: theme.typography.body, color: theme.colors.textSecondary }]}>
                  {user?.primaryEmailAddress?.emailAddress || '연결된 이메일 없음'}
                </Text>

                <View style={[styles.badgeCard, { backgroundColor: theme.colors.bgElevated }]}>
                  <Ionicons name="shield-checkmark" size={20} color={theme.colors.accentSuccess} />
                  <Text style={[styles.badgeCardText, { fontSize: theme.typography.caption, color: theme.colors.textPrimary }]}>
                    Clerk 클라우드 보안 동기화 활성화됨
                  </Text>
                </View>

                <TouchableOpacity
                  style={[styles.actionBtn, styles.signOutBtn, { minHeight: theme.minTouchSize }]}
                  onPress={handleSignOut}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#ffffff" />
                  ) : (
                    <>
                      <Ionicons name="log-out-outline" size={20} color="#ff6b6b" />
                      <Text style={[styles.signOutBtnText, { fontSize: theme.typography.body }]}>
                        로그아웃
                      </Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            ) : pendingVerification ? (
              // 2. 이메일 인증번호 입력 화면
              <View style={styles.formSection}>
                <Text style={[styles.subText, { fontSize: theme.typography.body, color: theme.colors.textSecondary }]}>
                  {email} 주소로 발송된 6자리 인증번호를 입력해주세요.
                </Text>

                <TextInput
                  style={[styles.input, { fontSize: theme.typography.h3, color: theme.colors.textPrimary, borderColor: theme.colors.borderGold }]}
                  placeholder="인증번호 6자리"
                  placeholderTextColor={theme.colors.textMuted}
                  value={code}
                  onChangeText={setCode}
                  keyboardType="number-pad"
                  autoFocus
                />

                {!!errorMessage && (
                  <Text style={[styles.errorText, { fontSize: theme.typography.caption }]}>{errorMessage}</Text>
                )}

                <TouchableOpacity
                  style={[styles.actionBtn, { backgroundColor: theme.colors.goldBright, minHeight: theme.minTouchSize }]}
                  onPress={handleVerifyCode}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#0b0e14" />
                  ) : (
                    <Text style={[styles.actionBtnText, { fontSize: theme.typography.body, color: '#0b0e14' }]}>
                      인증 완료 및 로그인
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            ) : (
              // 3. 로그인 / 회원가입 폼
              <View style={styles.formSection}>
                {/* 탭 전환 */}
                <View style={styles.tabContainer}>
                  <TouchableOpacity
                    style={[styles.tabBtn, mode === 'signin' && styles.activeTabBtn]}
                    onPress={() => { setMode('signin'); setErrorMessage(''); }}
                  >
                    <Text style={[styles.tabText, { color: mode === 'signin' ? theme.colors.goldBright : theme.colors.textMuted }]}>
                      로그인
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.tabBtn, mode === 'signup' && styles.activeTabBtn]}
                    onPress={() => { setMode('signup'); setErrorMessage(''); }}
                  >
                    <Text style={[styles.tabText, { color: mode === 'signup' ? theme.colors.goldBright : theme.colors.textMuted }]}>
                      회원가입
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text style={[styles.inputLabel, { fontSize: theme.typography.caption, color: theme.colors.textSecondary }]}>
                  이메일 주소
                </Text>
                <TextInput
                  style={[styles.input, { fontSize: theme.typography.body, color: theme.colors.textPrimary, borderColor: 'rgba(212, 175, 55, 0.4)' }]}
                  placeholder="user@example.com"
                  placeholderTextColor={theme.colors.textMuted}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />

                <Text style={[styles.inputLabel, { fontSize: theme.typography.caption, color: theme.colors.textSecondary }]}>
                  비밀번호
                </Text>
                <TextInput
                  style={[styles.input, { fontSize: theme.typography.body, color: theme.colors.textPrimary, borderColor: 'rgba(212, 175, 55, 0.4)' }]}
                  placeholder="8자 이상 영문/숫자"
                  placeholderTextColor={theme.colors.textMuted}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />

                {!!errorMessage && (
                  <Text style={[styles.errorText, { fontSize: theme.typography.caption }]}>{errorMessage}</Text>
                )}

                <TouchableOpacity
                  style={[styles.actionBtn, { backgroundColor: theme.colors.goldBright, minHeight: theme.minTouchSize }]}
                  onPress={mode === 'signin' ? handleSignIn : handleSignUp}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#0b0e14" />
                  ) : (
                    <Text style={[styles.actionBtnText, { fontSize: theme.typography.body, color: '#0b0e14', fontWeight: 'bold' }]}>
                      {mode === 'signin' ? '로그인하기' : '회원가입 시작하기'}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  modalBox: {
    width: '100%',
    maxWidth: 440,
    borderRadius: 20,
    borderWidth: 1.5,
    padding: 22,
    maxHeight: '85%'
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  titleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  modalTitle: {
    fontWeight: 'bold'
  },
  closeBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6
  },
  modalBody: {
    marginTop: 4
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10
  },
  activeTabBtn: {
    backgroundColor: 'rgba(212, 175, 55, 0.2)'
  },
  tabText: {
    fontWeight: 'bold',
    fontSize: 15
  },
  formSection: {
    gap: 12
  },
  inputLabel: {
    fontWeight: '600',
    marginBottom: -4
  },
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  errorText: {
    color: '#ff6b6b',
    marginTop: 4
  },
  subText: {
    lineHeight: 22,
    marginBottom: 10
  },
  actionBtn: {
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    gap: 8
  },
  actionBtnText: {
    fontWeight: '700'
  },
  profileSection: {
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12
  },
  avatarContainer: {
    position: 'relative'
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#d4af37'
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#d4af37'
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#10b981',
    borderWidth: 2,
    borderColor: '#131926'
  },
  userName: {
    fontWeight: 'bold'
  },
  userEmail: {
    marginTop: -4
  },
  badgeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 8
  },
  badgeCardText: {
    fontWeight: '600'
  },
  signOutBtn: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.4)',
    width: '100%',
    marginTop: 16
  },
  signOutBtnText: {
    color: '#ff6b6b',
    fontWeight: '700'
  }
});
