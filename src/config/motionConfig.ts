
export interface MotionPreset {
  spring: {
    type: 'spring';
    stiffness: number;
    damping: number;
    mass: number;
    restSpeed: number;
    restDelta: number;
  };
  tween: {
    type: 'tween';
    ease: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
    duration: number;
  };
  fade: {
    type: 'tween';
    ease: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
    duration: number;
  };
}

export const motionPresets: Record<'desktop' | 'mobile', MotionPreset> = {
  desktop: {
    spring: {
      type: 'spring',
      stiffness: 260,
      damping: 35,
      mass: 1,
      restSpeed: 2,
      restDelta: 0.01
    },
    tween: {
      type: 'tween',
      ease: 'easeOut' as const,
      duration: 0.4
    },
    fade: {
      type: 'tween',
      ease: 'easeInOut' as const,
      duration: 0.6
    }
  },
  mobile: {
    spring: {
      type: 'spring',
      stiffness: 150,
      damping: 28,
      mass: 0.9,
      restSpeed: 2,
      restDelta: 0.01
    },
    tween: {
      type: 'tween',
      ease: 'easeOut' as const,
      duration: 0.22
    },
    fade: {
      type: 'tween',
      ease: 'easeInOut' as const,
      duration: 0.4
    }
  }
};

export function getMotionPreset(isMobile: boolean, prefersReducedMotion: boolean): MotionPreset {
  if (prefersReducedMotion) {
    return {
      spring: {
        type: 'spring',
        stiffness: 500,
        damping: 50,
        mass: 0.5,
        restSpeed: 10,
        restDelta: 0.1
      },
      tween: {
        type: 'tween',
        ease: 'linear' as const,
        duration: 0.01
      },
      fade: {
        type: 'tween',
        ease: 'linear' as const,
        duration: 0.01
      }
    };
  }
  
  return isMobile ? motionPresets.mobile : motionPresets.desktop;
}
