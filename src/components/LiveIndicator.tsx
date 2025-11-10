import React from 'react';

interface LiveIndicatorProps {
  isLive?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LiveIndicator: React.FC<LiveIndicatorProps> = ({ 
  isLive = false, 
  size = 'sm',
  className = '' 
}) => {
  if (!isLive) return null;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5'
  };

  return (
    <div className={`inline-flex items-center gap-1.5 ${sizeClasses[size]} bg-red-500 text-white font-semibold rounded-full animate-pulse ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
      </span>
      LIVE
    </div>
  );
};

export default LiveIndicator;
