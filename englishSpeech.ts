/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Primary English Speech synthesis helper with native browser SpeechSynthesis API

class EnglishSpeechService {
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private isLoaded = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
    this.isLoaded = this.voices.length > 0;
  }

  public getEnglishVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    if (!this.isLoaded) this.loadVoices();
    return this.voices.filter(v => v.lang.startsWith('en'));
  }

  public speak(
    text: string, 
    options?: { 
      rate?: number; // 0.75 for primary slow mode, 0.95-1.0 for normal
      pitch?: number; // 1.05 for clear friendly kid pitch
      voiceName?: string;
      onEnd?: () => void;
      onError?: () => void;
    }
  ): boolean {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('SpeechSynthesis is not supported in this browser.');
      return false;
    }

    try {
      window.speechSynthesis.cancel(); // Stop any ongoing utterance

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = options?.rate || 0.88; // Default slightly slowed down for primary learners
      utterance.pitch = options?.pitch || 1.05;

      const enVoices = this.getEnglishVoices();
      if (enVoices.length > 0) {
        // Prefer natural voices (Google US English, Samantha, Daniel, Karen, Victoria)
        const preferredVoice = enVoices.find(v => 
          (options?.voiceName && v.name.includes(options.voiceName)) ||
          v.name.includes('Google US English') || 
          v.name.includes('Samantha') || 
          v.name.includes('Natural') ||
          v.name.includes('US') ||
          v.name.includes('en-US')
        ) || enVoices[0];
        
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }
      }

      if (options?.onEnd) utterance.onend = () => options.onEnd?.();
      if (options?.onError) utterance.onerror = () => options.onError?.();

      window.speechSynthesis.speak(utterance);
      return true;
    } catch (e) {
      console.error('Error speaking text:', e);
      return false;
    }
  }

  public stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const englishSpeech = new EnglishSpeechService();
