
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playSfx: (sfx: 'click' | 'solve' | 'damage' | 'dash') => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [bgm, setBgm] = useState<HTMLAudioElement | null>(null);
  const [sfx, setSfx] = useState<Record<string, HTMLAudioElement>>({});
  
  // Initialize audio elements
  useEffect(() => {
    // Check if muted state is stored in localStorage
    const savedMuteState = localStorage.getItem('codebreaker-muted');
    if (savedMuteState) {
      setIsMuted(savedMuteState === 'true');
    }
    
    // Background music
    const bgmAudio = new Audio('/audio/bgm.mp3');
    bgmAudio.loop = true;
    bgmAudio.volume = 0.5;
    setBgm(bgmAudio);
    
    // SFX
    const clickSfx = new Audio('/audio/click.mp3');
    const solveSfx = new Audio('/audio/solve.mp3');
    const damageSfx = new Audio('/audio/damage.mp3');
    const dashSfx = new Audio('/audio/dash.mp3');
    
    setSfx({
      click: clickSfx,
      solve: solveSfx,
      damage: damageSfx,
      dash: dashSfx,
    });
    
    return () => {
      if (bgmAudio) {
        bgmAudio.pause();
      }
    };
  }, []);
  
  // Update audio elements when mute state changes
  useEffect(() => {
    if (bgm) {
      bgm.muted = isMuted;
      if (!isMuted) {
        // This tries to play BGM. It might fail due to browser autoplay restrictions.
        const playPromise = bgm.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay was prevented. We'll need user interaction to play audio.
            console.info('Autoplay prevented. Music will play after user interaction.');
          });
        }
      }
    }
    
    // Save muted state to localStorage
    localStorage.setItem('codebreaker-muted', isMuted.toString());
  }, [isMuted, bgm]);
  
  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };
  
  const playSfx = (sfxName: 'click' | 'solve' | 'damage' | 'dash') => {
    if (isMuted || !sfx[sfxName]) return;
    
    // Clone the audio to allow multiple sounds to play simultaneously
    const sound = sfx[sfxName].cloneNode() as HTMLAudioElement;
    sound.volume = 0.6;
    sound.play().catch(() => {
      // Autoplay prevented
      console.info('SFX playback prevented by browser.');
    });
  };
  
  return (
    <AudioContext.Provider value={{ isMuted, toggleMute, playSfx }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
