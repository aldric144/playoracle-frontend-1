import { useState, useEffect, ReactNode } from 'react';

interface HydrationGateProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function HydrationGate({ children, fallback = null }: HydrationGateProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    
    setIsReady(false);

    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        if (mounted) {
          setTimeout(() => setIsReady(true), 150);
        }
      });
    } else {
      setTimeout(() => {
        if (mounted) {
          setIsReady(true);
        }
      }, 150);
    }

    return () => {
      mounted = false;
    };
  }, []);

  if (!isReady) {
    return <>{fallback}</>;
  }

  return (
    <div className="fade-in-150">
      {children}
    </div>
  );
}
