import { useEffect, useRef, useState, useCallback } from 'react';

export interface NarrationSegment {
  id: string;
  startTime: number; // in seconds
  endTime: number;
  text: string;
  visualCue: string;
  soundCue?: string;
}

export const narrationTimeline: NarrationSegment[] = [
  {
    id: 'intro-hum',
    startTime: 0,
    endTime: 5,
    text: '(soft ambient hum)',
    visualCue: 'neural-strands-forming',
    soundCue: 'low-ai-synth-tone'
  },
  {
    id: 'game-prediction',
    startTime: 5,
    endTime: 12,
    text: 'The game doesn\'t wait for predictions…',
    visualCue: 'hero-background-fade-in',
    soundCue: 'ambient-stadium-reverb'
  },
  {
    id: 'rewards-perception',
    startTime: 12,
    endTime: 18,
    text: '…it rewards perception.',
    visualCue: 'hero-tagline-fade',
    soundCue: 'sub-bass-pulse'
  },
  {
    id: 'intelligence-learns',
    startTime: 18,
    endTime: 25,
    text: 'Every pass. Every heartbeat. Every trend — understood by intelligence that learns you.',
    visualCue: 'neural-grid-pulse',
    soundCue: 'data-blip-sounds'
  },
  {
    id: 'not-an-app',
    startTime: 25,
    endTime: 33,
    text: 'PlayOracle™ is not an app. It\'s an awakening.',
    visualCue: '3d-carousel-rotate',
    soundCue: 'crowd-murmur-rise'
  },
  {
    id: 'plays-become-patterns',
    startTime: 33,
    endTime: 40,
    text: 'Your plays become patterns. Your instincts become insight.',
    visualCue: 'ai-brain-visualization',
    soundCue: 'ticking-metronome'
  },
  {
    id: 'rivalries-evolve',
    startTime: 40,
    endTime: 50,
    text: 'Watch rivalries evolve. Momentum breathe. Confidence quantified.',
    visualCue: 'rivalry-timeline-slide',
    soundCue: 'energy-hum-crescendo'
  },
  {
    id: 'already-know',
    startTime: 50,
    endTime: 60,
    text: 'When others react… you already know.',
    visualCue: 'sports-iq-gauge-rise',
    soundCue: 'echoed-heartbeat'
  },
  {
    id: 'crowd-feels',
    startTime: 60,
    endTime: 70,
    text: 'The crowd feels it. You see it first.',
    visualCue: 'crowd-emotion-data-merge',
    soundCue: 'crowd-cheer-fade'
  },
  {
    id: 'march-madness-superbowl',
    startTime: 70,
    endTime: 78,
    text: 'From March Madness to the Super Bowl — every moment analyzed, visualized, personalized.',
    visualCue: 'premium-carousel-rotate',
    soundCue: 'sports-montage-percussion'
  },
  {
    id: 'sports-iq-evolves',
    startTime: 78,
    endTime: 85,
    text: 'Your Sports IQ evolves with every prediction.',
    visualCue: 'sports-iq-meter-rise',
    soundCue: 'electro-pulse-accent'
  },
  {
    id: 'dont-just-play',
    startTime: 85,
    endTime: 95,
    text: 'Because you don\'t just play the game…',
    visualCue: 'neural-eye-zoom',
    soundCue: 'ambient-hum-deepens'
  },
  {
    id: 'you-perceive',
    startTime: 95,
    endTime: 100,
    text: '…you perceive it.',
    visualCue: 'logo-pulse-emerald',
    soundCue: 'heartbeat-echo'
  },
  {
    id: 'ai-becomes-instinct',
    startTime: 100,
    endTime: 110,
    text: 'PlayOracle™ — where AI becomes instinct.',
    visualCue: 'logo-stabilize-cta',
    soundCue: 'closing-synth-swell'
  },
  {
    id: 'fade-out',
    startTime: 110,
    endTime: 115,
    text: '(fade out)',
    visualCue: 'fade-complete',
    soundCue: 'silence'
  }
];

interface VoiceoverSyncProps {
  audioUrl?: string;
  isMuted: boolean;
  onSegmentChange?: (segment: NarrationSegment | null) => void;
  onPlaybackStateChange?: (isPlaying: boolean) => void;
}

export function VoiceoverSync({ 
  audioUrl = '/audio/placeholder-narration.mp3',
  isMuted,
  onSegmentChange,
  onPlaybackStateChange
}: VoiceoverSyncProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [currentSegment, setCurrentSegment] = useState<NarrationSegment | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (typeof window !== 'undefined' && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const audio = new Audio(audioUrl);
    audio.preload = 'auto';
    audio.loop = false;
    
    audio.volume = 0;
    
    audio.addEventListener('canplaythrough', () => {
      setIsLoaded(true);
      console.log('[VoiceoverSync] Audio preloaded successfully');
    });

    audio.addEventListener('error', (e) => {
      console.error('[VoiceoverSync] Audio loading error:', e);
    });

    audioRef.current = audio;

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioUrl]);

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    const targetVolume = isMuted ? 0 : 1;
    const currentVolume = audio.volume;
    const fadeSteps = 10;
    const fadeInterval = 30; // 300ms total fade time

    let step = 0;
    const fadeTimer = setInterval(() => {
      step++;
      const progress = step / fadeSteps;
      audio.volume = currentVolume + (targetVolume - currentVolume) * progress;

      if (step >= fadeSteps) {
        clearInterval(fadeTimer);
        audio.volume = targetVolume;
      }
    }, fadeInterval);

    return () => clearInterval(fadeTimer);
  }, [isMuted]);

  const updateCurrentSegment = useCallback(() => {
    if (!audioRef.current || !isPlaying) return;

    const currentTime = audioRef.current.currentTime;
    
    const segment = narrationTimeline.find(
      seg => currentTime >= seg.startTime && currentTime < seg.endTime
    );

    if (segment && segment.id !== currentSegment?.id) {
      setCurrentSegment(segment);
      onSegmentChange?.(segment);
      
      if ('vibrate' in navigator) {
        navigator.vibrate(8);
      }
    }

    animationFrameRef.current = requestAnimationFrame(updateCurrentSegment);
  }, [currentSegment, isPlaying, onSegmentChange]);

  useEffect(() => {
    if (isPlaying) {
      updateCurrentSegment();
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, updateCurrentSegment]);

  useEffect(() => {
    const startPlayback = async () => {
      if (!audioRef.current || !isLoaded) return;

      try {
        if (audioContextRef.current?.state === 'suspended') {
          await audioContextRef.current.resume();
        }

        await audioRef.current.play();
        setIsPlaying(true);
        onPlaybackStateChange?.(true);
        console.log('[VoiceoverSync] Playback started');
      } catch (error) {
        console.warn('[VoiceoverSync] Autoplay blocked, waiting for user interaction:', error);
      }
    };

    const timer = setTimeout(startPlayback, 500);
    return () => clearTimeout(timer);
  }, [isLoaded, onPlaybackStateChange]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentSegment(null);
      onPlaybackStateChange?.(false);
      onSegmentChange?.(null);
      console.log('[VoiceoverSync] Playback completed');
    };

    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [onPlaybackStateChange, onSegmentChange]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__voiceoverControls = {
        play: () => audioRef.current?.play(),
        pause: () => audioRef.current?.pause(),
        seek: (time: number) => {
          if (audioRef.current) {
            audioRef.current.currentTime = time;
          }
        },
        getCurrentTime: () => audioRef.current?.currentTime,
        getCurrentSegment: () => currentSegment,
        getTimeline: () => narrationTimeline
      };
    }
  }, [currentSegment]);

  return null; // This component doesn't render anything, it just manages audio sync
}

export function useNarrationSegment() {
  const [currentSegment, setCurrentSegment] = useState<NarrationSegment | null>(null);
  
  return {
    currentSegment,
    setCurrentSegment,
    isActive: (segmentId: string) => currentSegment?.id === segmentId
  };
}

export function useNarrationTrigger(segmentId: string, callback: () => void) {
  const { currentSegment } = useNarrationSegment();
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (currentSegment?.id === segmentId && !hasTriggeredRef.current) {
      callback();
      hasTriggeredRef.current = true;
    } else if (currentSegment?.id !== segmentId) {
      hasTriggeredRef.current = false;
    }
  }, [currentSegment, segmentId, callback]);
}
