
import { useAnimationControls } from 'framer-motion';


type AnimationControls = ReturnType<typeof useAnimationControls>;
interface AnimationGroup {
  controls: AnimationControls[];
  isPlaying: boolean;
}

class FrameOrchestrator {
  private static instance: FrameOrchestrator;
  private rafId = 0;
  private groups = new Map<string, AnimationGroup>();
  private readonly STAGGER_MS = 33; // ~2 frames at 60fps

  private constructor() {}

  static getInstance(): FrameOrchestrator {
    if (!FrameOrchestrator.instance) {
      FrameOrchestrator.instance = new FrameOrchestrator();
    }
    return FrameOrchestrator.instance;
  }

  register(groupName: string, controls: AnimationControls[]) {
    this.groups.set(groupName, {
      controls,
      isPlaying: false
    });
  }

  play(groupName: string, variant = 'visible') {
    const group = this.groups.get(groupName);
    if (!group || group.isPlaying) return;

    group.isPlaying = true;

    group.controls.forEach((control, index) => {
      setTimeout(() => {
        control.start(variant);
      }, index * this.STAGGER_MS);
    });

    this.ensureLoop();
  }

  stop(groupName: string) {
    const group = this.groups.get(groupName);
    if (!group) return;

    group.isPlaying = false;
    group.controls.forEach(control => control.stop());
  }

  private ensureLoop() {
    if (this.rafId) return;

    let lastTime = performance.now();
    const FRAME_TIME = 1000 / 60; // 16.67ms

    const loop = (currentTime: number) => {
      const delta = currentTime - lastTime;

      if (delta >= FRAME_TIME) {
        lastTime = currentTime - (delta % FRAME_TIME);
      }

      this.rafId = requestAnimationFrame(loop);
    };

    this.rafId = requestAnimationFrame(loop);
  }

  cleanup() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = 0;
    }
    this.groups.clear();
  }
}

export const frameOrchestrator = FrameOrchestrator.getInstance();
