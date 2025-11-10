import { useEffect, useRef } from 'react';

export function useFadeInOnView() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          io.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return ref;
}
