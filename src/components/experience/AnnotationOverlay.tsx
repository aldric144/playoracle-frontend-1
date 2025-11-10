import { motion, AnimatePresence } from 'framer-motion';
import { NarrationSegment } from './VoiceoverSync';
import { useDeviceDetection } from '../../hooks/useDeviceDetection';
import { getMotionPreset } from '../../config/motionConfig';

interface AnnotationOverlayProps {
  currentSegment: NarrationSegment | null;
}

interface AnnotationConfig {
  segmentId: string;
  title?: string;
  subtitle?: string;
  highlight?: string;
  position: 'top' | 'center' | 'bottom';
  style: 'bold' | 'elegant' | 'tech' | 'dramatic';
}

const annotationConfigs: AnnotationConfig[] = [
  {
    segmentId: 'intro-hum',
    title: 'Initializing...',
    position: 'center',
    style: 'tech'
  },
  {
    segmentId: 'game-prediction',
    title: 'The game doesn\'t wait',
    subtitle: 'for predictions',
    position: 'top',
    style: 'dramatic'
  },
  {
    segmentId: 'rewards-perception',
    title: 'It rewards',
    highlight: 'PERCEPTION',
    position: 'center',
    style: 'bold'
  },
  {
    segmentId: 'intelligence-learns',
    title: 'Intelligence that learns',
    highlight: 'YOU',
    position: 'bottom',
    style: 'elegant'
  },
  {
    segmentId: 'not-an-app',
    title: 'Not an app',
    highlight: 'AN AWAKENING',
    position: 'center',
    style: 'dramatic'
  },
  {
    segmentId: 'plays-become-patterns',
    title: 'Plays → Patterns',
    subtitle: 'Instincts → Insight',
    position: 'center',
    style: 'tech'
  },
  {
    segmentId: 'rivalries-evolve',
    title: 'Watch rivalries',
    highlight: 'EVOLVE',
    position: 'top',
    style: 'bold'
  },
  {
    segmentId: 'already-know',
    title: 'When others react',
    highlight: 'YOU ALREADY KNOW',
    position: 'center',
    style: 'dramatic'
  },
  {
    segmentId: 'crowd-feels',
    title: 'The crowd feels it',
    subtitle: 'You see it first',
    position: 'bottom',
    style: 'elegant'
  },
  {
    segmentId: 'march-madness-superbowl',
    title: 'March Madness → Super Bowl',
    subtitle: 'Every moment analyzed',
    position: 'top',
    style: 'tech'
  },
  {
    segmentId: 'sports-iq-evolves',
    title: 'Your Sports IQ',
    highlight: 'EVOLVES',
    position: 'center',
    style: 'bold'
  },
  {
    segmentId: 'dont-just-play',
    title: 'You don\'t just play',
    subtitle: 'the game',
    position: 'bottom',
    style: 'elegant'
  },
  {
    segmentId: 'you-perceive',
    title: 'You',
    highlight: 'PERCEIVE IT',
    position: 'center',
    style: 'dramatic'
  },
  {
    segmentId: 'ai-becomes-instinct',
    title: 'Where AI becomes',
    highlight: 'INSTINCT',
    position: 'center',
    style: 'bold'
  },
  {
    segmentId: 'fade-out',
    position: 'center',
    style: 'tech'
  }
];

export function AnnotationOverlay({ currentSegment }: AnnotationOverlayProps) {
  const deviceInfo = useDeviceDetection();
  const motionPreset = getMotionPreset(deviceInfo.isMobile, deviceInfo.prefersReducedMotion);
  const config = annotationConfigs.find(c => c.segmentId === currentSegment?.id);

  if (!config || !currentSegment) return null;

  const getPositionClasses = () => {
    switch (config.position) {
      case 'top':
        return 'top-[20%]';
      case 'bottom':
        return 'bottom-[20%]';
      case 'center':
      default:
        return 'top-[50%] -translate-y-1/2';
    }
  };

  const getStyleClasses = () => {
    switch (config.style) {
      case 'bold':
        return 'font-black';
      case 'elegant':
        return 'font-light tracking-wide';
      case 'tech':
        return 'font-mono tracking-wider';
      case 'dramatic':
        return 'font-bold italic';
      default:
        return 'font-bold';
    }
  };

  const getFluidFontSize = () => {
    switch (config.style) {
      case 'bold':
        return { fontSize: 'clamp(2.5rem, 8vw, 5rem)' };
      case 'elegant':
        return { fontSize: 'clamp(2rem, 6vw, 4.5rem)' };
      case 'tech':
        return { fontSize: 'clamp(1.75rem, 5vw, 3.75rem)' };
      case 'dramatic':
        return { fontSize: 'clamp(2.25rem, 7vw, 4.5rem)' };
      default:
        return { fontSize: 'clamp(2rem, 6vw, 4.5rem)' };
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentSegment.id}
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 1.05, y: -10 }}
        transition={motionPreset.fade}
        className={`fixed left-1/2 -translate-x-1/2 ${getPositionClasses()} z-30 text-center px-4 max-w-5xl pointer-events-none`}
        style={{
          transform: 'translateZ(0)',
          transformOrigin: 'center',
          willChange: 'transform, opacity',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {config.title && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={motionPreset.tween}
            className={`${getStyleClasses()} text-white mb-4`}
            style={{
              ...getFluidFontSize(),
              textShadow: deviceInfo.isMobile 
                ? '0 0 20px rgba(0, 230, 118, 0.4)' 
                : '0 0 30px rgba(0, 230, 118, 0.5), 0 0 60px rgba(0, 230, 118, 0.3)',
              willChange: 'transform, opacity',
              transform: 'translateZ(0)'
            }}
          >
            {config.title}
          </motion.div>
        )}

        {config.subtitle && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-gray-300 font-light"
            style={{
              fontSize: 'clamp(1.25rem, 3.5vw, 2.5rem)',
              willChange: 'transform, opacity'
            }}
          >
            {config.subtitle}
          </motion.div>
        )}

        {config.highlight && (
          <div className="relative mt-6">
            {/* Layered glow elements behind text - GPU friendly */}
            {!deviceInfo.isMobile && (
              <>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: [0.3, 0.6, 0.3],
                    scale: [0.95, 1.05, 0.95]
                  }}
                  transition={{ 
                    delay: 0.6,
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="absolute inset-0 font-black text-green-400 blur-xl"
                  style={{
                    fontSize: 'clamp(3rem, 12vw, 7rem)',
                    willChange: 'transform, opacity',
                    transform: 'translateZ(0)',
                    color: 'rgba(0, 230, 118, 0.6)'
                  }}
                  aria-hidden="true"
                >
                  {config.highlight}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: [0.4, 0.7, 0.4],
                    scale: [0.98, 1.02, 0.98]
                  }}
                  transition={{ 
                    delay: 0.7,
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="absolute inset-0 font-black text-green-400 blur-md"
                  style={{
                    fontSize: 'clamp(3rem, 12vw, 7rem)',
                    willChange: 'transform, opacity',
                    transform: 'translateZ(0)',
                    color: 'rgba(0, 230, 118, 0.8)'
                  }}
                  aria-hidden="true"
                >
                  {config.highlight}
                </motion.div>
              </>
            )}
            {/* Main text */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={motionPreset.tween}
              className="relative font-black text-green-400"
              style={{
                fontSize: 'clamp(3rem, 12vw, 7rem)',
                WebkitTextStroke: '2px rgba(0, 230, 118, 0.5)',
                willChange: 'transform, opacity',
                transform: 'translateZ(0)',
                textShadow: deviceInfo.isMobile ? '0 0 20px rgba(0, 230, 118, 0.8)' : 'none'
              }}
            >
              {config.highlight}
            </motion.div>
          </div>
        )}

        {/* Accent line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent mt-8 mx-auto max-w-md"
        />

        {/* Particle effects - only on desktop */}
        {config.style === 'dramatic' && !deviceInfo.isMobile && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 0 }}
                animate={{ 
                  opacity: [0, 0.8, 0],
                  y: [-50, -150],
                  x: [0, (i - 1) * 30]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: 'easeOut'
                }}
                className="absolute left-1/2 top-1/2 w-2 h-2 bg-green-400 rounded-full"
                style={{
                  boxShadow: '0 0 10px rgba(0, 230, 118, 0.8)',
                  willChange: 'transform, opacity',
                  transform: 'translateZ(0)'
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
