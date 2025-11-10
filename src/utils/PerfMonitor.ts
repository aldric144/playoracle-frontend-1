
interface PerformanceMetrics {
  frameDelta: number;
  longTasks: number;
  tapLatency: number;
  renderTime: number;
}

class PerfMonitor {
  private static instance: PerfMonitor;
  private frameCount = 0;
  private lastFrameTime = 0;
  private longTaskCount = 0;
  private tapStartTime = 0;
  private metrics: PerformanceMetrics = {
    frameDelta: 0,
    longTasks: 0,
    tapLatency: 0,
    renderTime: 0
  };

  private constructor() {
    this.startMonitoring();
  }

  static getInstance(): PerfMonitor {
    if (!PerfMonitor.instance) {
      PerfMonitor.instance = new PerfMonitor();
    }
    return PerfMonitor.instance;
  }

  private startMonitoring() {
    if (typeof window === 'undefined') return;

    const measureFrames = (timestamp: number) => {
      if (this.lastFrameTime > 0) {
        const delta = timestamp - this.lastFrameTime;
        this.metrics.frameDelta = delta;

        if (delta > 16.67) {
          this.longTaskCount++;
          this.metrics.longTasks = this.longTaskCount;
        }
      }
      this.lastFrameTime = timestamp;
      this.frameCount++;

      if (this.frameCount % 60 === 0) {
        this.logMetrics();
      }

      requestAnimationFrame(measureFrames);
    };

    requestAnimationFrame(measureFrames);

    document.addEventListener('touchstart', () => {
      this.tapStartTime = performance.now();
    }, { passive: true });

    document.addEventListener('touchend', () => {
      if (this.tapStartTime > 0) {
        const latency = performance.now() - this.tapStartTime;
        this.metrics.tapLatency = latency;
        this.tapStartTime = 0;
      }
    }, { passive: true });

    if ('PerformanceObserver' in window) {
      try {
        const paintObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'paint') {
              this.metrics.renderTime = entry.startTime;
            }
          }
        });
        paintObserver.observe({ entryTypes: ['paint'] });
      } catch (e) {
      }
    }
  }

  private logMetrics() {
    const avgFrameTime = this.metrics.frameDelta.toFixed(2);
    const fps = (1000 / this.metrics.frameDelta).toFixed(1);
    
    console.log('🎬 PlayOracle™ Performance Metrics:');
    console.log(`  Frame Delta: ${avgFrameTime}ms (${fps} fps)`);
    console.log(`  Long Tasks: ${this.metrics.longTasks}`);
    console.log(`  Tap Latency: ${this.metrics.tapLatency.toFixed(2)}ms`);
    console.log(`  Render Time: ${this.metrics.renderTime.toFixed(2)}ms`);
    
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      if (this.metrics.tapLatency > 70) {
        console.warn('⚠️ Tap latency exceeds 70ms target for mobile');
      }
      if (this.metrics.frameDelta > 16) {
        console.warn('⚠️ Frame time exceeds 16ms target for mobile');
      }
    }
  }

  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  resetLongTasks() {
    this.longTaskCount = 0;
    this.metrics.longTasks = 0;
  }
}

export const perfMonitor = PerfMonitor.getInstance();
