import { motion, AnimatePresence } from 'framer-motion';
import { NarrationSegment } from './VoiceoverSync';
import { useDeviceDetection } from '../../hooks/useDeviceDetection';
import { getMotionPreset } from '../../config/motionConfig';

interface VisualTimelineProps {
  currentSegment: NarrationSegment | null;
}

interface VisualConfig {
  segmentId: string;
  gradient: string;
  sportIcon?: 'football' | 'basketball' | 'baseball' | 'racing';
  lightingEffect: 'spotlight' | 'ambient' | 'dramatic' | 'neural';
  motionPattern: 'zoom' | 'pan' | 'pulse' | 'rotate';
}

const visualConfigs: VisualConfig[] = [
  {
    segmentId: 'intro-hum',
    gradient: 'from-black via-gray-900 to-black',
    lightingEffect: 'neural',
    motionPattern: 'pulse'
  },
  {
    segmentId: 'game-prediction',
    gradient: 'from-gray-900 via-green-900/20 to-black',
    sportIcon: 'football',
    lightingEffect: 'ambient',
    motionPattern: 'pan'
  },
  {
    segmentId: 'rewards-perception',
    gradient: 'from-black via-purple-900/30 to-black',
    lightingEffect: 'dramatic',
    motionPattern: 'zoom'
  },
  {
    segmentId: 'intelligence-learns',
    gradient: 'from-green-900/20 via-black to-purple-900/20',
    lightingEffect: 'neural',
    motionPattern: 'pulse'
  },
  {
    segmentId: 'not-an-app',
    gradient: 'from-black via-green-500/10 to-black',
    sportIcon: 'basketball',
    lightingEffect: 'spotlight',
    motionPattern: 'rotate'
  },
  {
    segmentId: 'plays-become-patterns',
    gradient: 'from-purple-900/30 via-black to-green-900/20',
    lightingEffect: 'neural',
    motionPattern: 'pulse'
  },
  {
    segmentId: 'rivalries-evolve',
    gradient: 'from-black via-red-900/20 to-black',
    sportIcon: 'baseball',
    lightingEffect: 'dramatic',
    motionPattern: 'pan'
  },
  {
    segmentId: 'already-know',
    gradient: 'from-green-900/30 via-black to-purple-900/20',
    lightingEffect: 'spotlight',
    motionPattern: 'zoom'
  },
  {
    segmentId: 'crowd-feels',
    gradient: 'from-black via-orange-900/20 to-black',
    lightingEffect: 'ambient',
    motionPattern: 'pulse'
  },
  {
    segmentId: 'march-madness-superbowl',
    gradient: 'from-blue-900/20 via-black to-red-900/20',
    sportIcon: 'football',
    lightingEffect: 'dramatic',
    motionPattern: 'pan'
  },
  {
    segmentId: 'sports-iq-evolves',
    gradient: 'from-green-500/20 via-black to-purple-500/20',
    lightingEffect: 'neural',
    motionPattern: 'pulse'
  },
  {
    segmentId: 'dont-just-play',
    gradient: 'from-black via-green-900/30 to-black',
    sportIcon: 'racing',
    lightingEffect: 'spotlight',
    motionPattern: 'zoom'
  },
  {
    segmentId: 'you-perceive',
    gradient: 'from-purple-900/40 via-green-500/20 to-black',
    lightingEffect: 'dramatic',
    motionPattern: 'pulse'
  },
  {
    segmentId: 'ai-becomes-instinct',
    gradient: 'from-green-400/30 via-black to-purple-600/30',
    lightingEffect: 'neural',
    motionPattern: 'rotate'
  },
  {
    segmentId: 'fade-out',
    gradient: 'from-black via-gray-900 to-black',
    lightingEffect: 'ambient',
    motionPattern: 'pulse'
  }
];

const SportSilhouette = ({ sport }: { sport: 'football' | 'basketball' | 'baseball' | 'racing' }) => {
  const getSportPath = () => {
    switch (sport) {
      case 'football':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <ellipse cx="50" cy="50" rx="30" ry="20" fill="currentColor" opacity="0.3" />
            <line x1="50" y1="30" x2="50" y2="70" stroke="currentColor" strokeWidth="2" opacity="0.5" />
            <line x1="35" y1="40" x2="65" y2="40" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
            <line x1="35" y1="50" x2="65" y2="50" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
            <line x1="35" y1="60" x2="65" y2="60" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
          </svg>
        );
      case 'basketball':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
            <path d="M 50 25 Q 60 50 50 75" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
            <path d="M 50 25 Q 40 50 50 75" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
            <line x1="25" y1="50" x2="75" y2="50" stroke="currentColor" strokeWidth="2" opacity="0.5" />
          </svg>
        );
      case 'baseball':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
            <path d="M 35 35 Q 40 45 35 55 Q 30 65 35 75" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
            <path d="M 65 35 Q 60 45 65 55 Q 70 65 65 75" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
          </svg>
        );
      case 'racing':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect x="30" y="40" width="40" height="20" rx="5" fill="currentColor" opacity="0.3" />
            <circle cx="35" cy="65" r="8" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
            <circle cx="65" cy="65" r="8" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
            <path d="M 40 40 L 45 30 L 55 30 L 60 40" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
          </svg>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: [0.1, 0.3, 0.1],
        scale: [0.8, 1, 0.8],
        rotate: [0, 5, -5, 0]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      className="absolute inset-0 flex items-center justify-center text-green-400"
      style={{ willChange: 'transform, opacity' }}
    >
      {getSportPath()}
    </motion.div>
  );
};

const LightingEffect = ({ type, isMobile }: { type: 'spotlight' | 'ambient' | 'dramatic' | 'neural'; isMobile: boolean }) => {
  const effectCount = isMobile ? 1 : 2;
  
  switch (type) {
    case 'spotlight':
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' as const }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(0, 230, 118, 0.15) 0%, transparent 70%)',
            filter: isMobile ? 'blur(40px)' : 'blur(60px)',
            willChange: 'opacity',
            transform: 'translateZ(0)'
          }}
        />
      );
    case 'ambient':
      return (
        <>
          <motion.div
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' as const }}
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 20% 50%, rgba(0, 230, 118, 0.08) 0%, transparent 50%)',
              willChange: 'transform',
              transform: 'translateZ(0)'
            }}
          />
          {!isMobile && (
            <motion.div
              animate={{
                x: [0, -50, 0],
                y: [0, -30, 0]
              }}
              transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' as const }}
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 80% 80%, rgba(155, 107, 255, 0.08) 0%, transparent 50%)',
                willChange: 'transform',
                transform: 'translateZ(0)'
              }}
            />
          )}
        </>
      );
    case 'dramatic':
      return (
        <>
          <motion.div
            animate={{
              opacity: [0, 0.3, 0],
              scale: [0.9, 1.1, 0.9]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' as const }}
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(0, 230, 118, 0.2) 0%, transparent 70%)',
              filter: isMobile ? 'blur(50px)' : 'blur(80px)',
              willChange: 'transform, opacity',
              transform: 'translateZ(0)'
            }}
          />
          {effectCount > 1 && (
            <motion.div
              animate={{
                opacity: [0, 0.3, 0],
                scale: [1.1, 0.9, 1.1]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 1, ease: 'easeInOut' as const }}
              className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(155, 107, 255, 0.2) 0%, transparent 70%)',
                filter: isMobile ? 'blur(50px)' : 'blur(80px)',
                willChange: 'transform, opacity',
                transform: 'translateZ(0)'
              }}
            />
          )}
        </>
      );
    case 'neural':
      return (
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              opacity: [0.08, 0.2, 0.08]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' as const }}
            className="absolute inset-0"
            style={{
              backgroundImage: 'linear-gradient(rgba(0, 230, 118, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 230, 118, 0.08) 1px, transparent 1px)',
              backgroundSize: isMobile ? '60px 60px' : '50px 50px',
              willChange: 'opacity'
            }}
          />
          {[...Array(isMobile ? 2 : 3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.15, 0, 0.15]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 1,
                ease: 'easeInOut'
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-green-400"
              style={{
                willChange: 'transform, opacity',
                transform: 'translateZ(0)'
              }}
            />
          ))}
        </div>
      );
  }
};

export function VisualTimeline({ currentSegment }: VisualTimelineProps) {
  const deviceInfo = useDeviceDetection();
  const motionPreset = getMotionPreset(deviceInfo.isMobile, deviceInfo.prefersReducedMotion);
  const config = visualConfigs.find(c => c.segmentId === currentSegment?.id);

  if (!config) {
    return (
      <div className="fixed inset-0 bg-black z-0" />
    );
  }

  const getMotionProps = () => {
    const intensity = deviceInfo.isMobile ? 0.5 : 1;
    
    switch (config.motionPattern) {
      case 'zoom':
        return {
          initial: { scale: 1 },
          animate: { scale: [1, 1 + (0.05 * intensity), 1] },
          transition: { ...motionPreset.fade, duration: 10, repeat: Infinity, ease: 'easeInOut' as const }
        };
      case 'pan':
        return {
          initial: { x: 0 },
          animate: { x: [0, -10 * intensity, 0] },
          transition: { ...motionPreset.fade, duration: 15, repeat: Infinity, ease: 'easeInOut' as const }
        };
      case 'pulse':
        return {
          initial: { opacity: 0.85 },
          animate: { opacity: [0.85, 1, 0.85] },
          transition: { ...motionPreset.fade, duration: 3, repeat: Infinity, ease: 'easeInOut' as const }
        };
      case 'rotate':
        return {
          initial: { rotate: 0 },
          animate: { rotate: [0, 1 * intensity, -1 * intensity, 0] },
          transition: { ...motionPreset.fade, duration: 20, repeat: Infinity, ease: 'easeInOut' as const }
        };
      default:
        return {};
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentSegment?.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={motionPreset.fade}
        className="fixed inset-0 z-0"
        style={{ 
          willChange: 'opacity',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {/* Gradient Background */}
        <motion.div
          {...getMotionProps()}
          className={`absolute inset-0 bg-gradient-to-br ${config.gradient}`}
          style={{ 
            willChange: 'transform, opacity',
            transform: 'translateZ(0)'
          }}
        />

        {/* Lighting Effects */}
        <LightingEffect type={config.lightingEffect} isMobile={deviceInfo.isMobile} />

        {/* Sport Silhouette - only show on desktop or when not reduced motion */}
        {config.sportIcon && !deviceInfo.prefersReducedMotion && (
          <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
            <div className={deviceInfo.isMobile ? "w-64 h-64" : "w-96 h-96 md:w-[600px] md:h-[600px]"}>
              <SportSilhouette sport={config.sportIcon} />
            </div>
          </div>
        )}

        {/* Vignette Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.8) 100%)'
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
