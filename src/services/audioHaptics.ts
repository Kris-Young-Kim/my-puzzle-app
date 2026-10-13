// 명품 힐링 ASMR & 햅틱(손맛) 오디오 엔진
// 모뉴먼트 밸리(Monument Valley) & 아트 퍼즐 스타일:
// 물리적 자작나무 직소 타격음 (Acoustic Birch Click) + 펜타토닉 힐링 오버톤 (Pentatonic Zen Chime)

import * as Haptics from 'expo-haptics';
import { StorageService } from './storage';

class AudioHapticsService {
  private audioCtx: AudioContext | null = null;
  private comboStep = 0;

  private getAudioContext(): AudioContext | null {
    if (typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass && !this.audioCtx) {
        this.audioCtx = new AudioContextClass();
      }
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      return this.audioCtx;
    }
    return null;
  }

  // 조각을 집어 들었을 때: 벨벳 트레이에서 나무 조각을 집는 섬세한 마찰음
  triggerPickup() {
    this.playLuxuryPickup();
    const settings = StorageService.getSettings();
    if (!settings.hapticOn) return;
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {}
  }

  // 조각이 체결될 때: 묵직한 원목 체결 충격 + 명품 힐링 펜타토닉 울림
  triggerSnap(combo: number = 0) {
    this.playLuxurySnap(combo);
    const settings = StorageService.getSettings();
    if (!settings.hapticOn) return;
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } catch {}
  }

  // 잘못된 위치: 펠트 바닥에 부드럽게 닿는 자연스러운 둔탁음
  triggerMismatch() {
    this.playLuxuryMismatch();
    const settings = StorageService.getSettings();
    if (!settings.hapticOn) return;
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    } catch {}
  }

  // 명화 전체 완성: 웅장하고 영롱한 대성당 아르페지오 팡파르
  triggerVictory() {
    this.playGrandVictoryFanfare();
    const settings = StorageService.getSettings();
    if (!settings.hapticOn) return;
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {}
  }

  // ==========================================
  // 🎻 명품 어쿠스틱 오디오 합성 엔진 (Web Audio API)
  // ==========================================

  /**
   * 1. 명품 직소 스냅:
   * Layer A: 리얼 우드 마찰 노이즈 버스트 (Wood Texture Friction)
   * Layer B: 2중 원목 공명 바디 펀치 (240Hz & 460Hz Acoustic Resonance)
   * Layer C: 모뉴먼트 밸리 감성의 펜타토닉 힐링 오버톤 (Warm Celesta/Kalimba Resonance)
   */
  private playLuxurySnap(combo: number) {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // --- Layer A: 실제 나무 결이 맞물리는 마찰 임펄스 노이즈 ---
      const bufferSize = Math.floor(ctx.sampleRate * 0.035); // 35ms 초고속 과도현상
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
      }
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(2600, now);
      noiseFilter.Q.setValueAtTime(2.5, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.35, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      noiseSource.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noiseSource.start(now);

      // --- Layer B: 묵직한 핀란드산 자작나무 합판 바디 공명 타격감 ---
      const bodyOsc = ctx.createOscillator();
      const bodyGain = ctx.createGain();
      bodyOsc.type = 'sine';
      bodyOsc.frequency.setValueAtTime(320, now);
      bodyOsc.frequency.exponentialRampToValueAtTime(140, now + 0.06);

      bodyGain.gain.setValueAtTime(0.55, now);
      bodyGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      bodyOsc.connect(bodyGain);
      bodyGain.connect(ctx.destination);
      bodyOsc.start(now);
      bodyOsc.stop(now + 0.09);

      // --- Layer C: 모뉴먼트 밸리 스타일의 감성적인 펜타토닉 벨 화음 ---
      // 콤보에 따라 C5 -> D5 -> E5 -> G5 -> A5 -> C6 로 영롱하게 조율됨
      const pentatonicScale = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5];
      const noteIndex = Math.min(Math.max(combo, 0), pentatonicScale.length - 1);
      const toneFreq = pentatonicScale[noteIndex];

      const toneOsc = ctx.createOscillator();
      const toneFilter = ctx.createBiquadFilter();
      const toneGain = ctx.createGain();

      toneOsc.type = 'triangle'; // 따뜻한 마림바/칼림바 배음
      toneOsc.frequency.setValueAtTime(toneFreq, now);

      toneFilter.type = 'lowpass';
      toneFilter.frequency.setValueAtTime(2200, now);

      toneGain.gain.setValueAtTime(0.28, now);
      toneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.75); // 잔향이 0.75초 동안 고요하게 퍼짐

      toneOsc.connect(toneFilter);
      toneFilter.connect(toneGain);
      toneGain.connect(ctx.destination);
      toneOsc.start(now + 0.005);
      toneOsc.stop(now + 0.8);
    } catch {}
  }

  /**
   * 2. 조각 집어들기 (Wood Slide & Soft Lift)
   */
  private playLuxuryPickup() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(680, now);
      osc.frequency.exponentialRampToValueAtTime(950, now + 0.04);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch {}
  }

  /**
   * 3. 오답 터치 (Soft Felt Thud)
   * 귀를 찌르지 않고 원목이 부드러운 천에 닿는 자연스러운 소리
   */
  private playLuxuryMismatch() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(75, now + 0.1);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, now);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch {}
  }

  /**
   * 4. 완성 축하 그랜드 아르페지오 (Orchestral Glass & Strings Chime)
   */
  private playGrandVictoryFanfare() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // C 메이저 9th 영롱한 아르페지오 화음: C5 -> E5 -> G5 -> B5 -> C6 -> E6
      const chordNotes = [523.25, 659.25, 783.99, 987.77, 1046.5, 1318.51];
      chordNotes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        const startTime = now + idx * 0.11;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(3400, startTime);

        gain.gain.setValueAtTime(0.28, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.2);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 1.3);
      });
    } catch {}
  }
}

export const audioHaptics = new AudioHapticsService();
