import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, AlertTriangle, Info } from 'lucide-react';

interface TrustIndexBadgeProps {
  trustIndex: 'verified' | 'high' | 'moderate' | 'low';
  confidence: number;
  dataSources?: string[];
  lastUpdated?: string;
  showTooltip?: boolean;
}

const getTrustConfig = (trustIndex: string) => {
  switch (trustIndex) {
    case 'verified':
      return {
        icon: Lock,
        label: 'Verified Confidence',
        color: 'text-emerald-400',
        bgColor: 'bg-emerald-500/20',
        borderColor: 'border-emerald-500/40',
        glowColor: 'shadow-emerald-500/30'
      };
    case 'high':
      return {
        icon: Shield,
        label: 'High Confidence',
        color: 'text-blue-400',
        bgColor: 'bg-blue-500/20',
        borderColor: 'border-blue-500/40',
        glowColor: 'shadow-blue-500/30'
      };
    case 'moderate':
      return {
        icon: Info,
        label: 'Moderate Confidence',
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-500/20',
        borderColor: 'border-yellow-500/40',
        glowColor: 'shadow-yellow-500/30'
      };
    case 'low':
      return {
        icon: AlertTriangle,
        label: 'Low Confidence',
        color: 'text-red-400',
        bgColor: 'bg-red-500/20',
        borderColor: 'border-red-500/40',
        glowColor: 'shadow-red-500/30'
      };
    default:
      return {
        icon: Info,
        label: 'Unknown',
        color: 'text-gray-400',
        bgColor: 'bg-gray-500/20',
        borderColor: 'border-gray-500/40',
        glowColor: 'shadow-gray-500/30'
      };
  }
};

export const TrustIndexBadge: React.FC<TrustIndexBadgeProps> = ({
  trustIndex,
  confidence,
  dataSources = ['SportsDataIO', 'Sportradar'],
  lastUpdated,
  showTooltip = true
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const config = getTrustConfig(trustIndex);
  const Icon = config.icon;

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const updated = new Date(timestamp);
    const diffMs = now.getTime() - updated.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`
          flex items-center gap-2 px-3 py-1.5 rounded-lg border
          ${config.bgColor} ${config.borderColor} ${config.glowColor}
          transition-all duration-300 cursor-pointer
          hover:scale-105 hover:shadow-lg
        `}
      >
        <Icon className={`w-4 h-4 ${config.color}`} />
        <span className={`text-xs font-semibold ${config.color}`}>
          {confidence.toFixed(0)}%
        </span>
      </motion.div>

      {/* Tooltip */}
      {showTooltip && (
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64"
            >
              <div className="bg-[#101626] border border-emerald-500/30 rounded-lg p-4 shadow-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Icon className={`w-5 h-5 ${config.color}`} />
                  <span className={`text-sm font-semibold ${config.color}`}>
                    {config.label}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-gray-300">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Model Certainty:</span>
                    <span className="font-semibold">{confidence.toFixed(1)}%</span>
                  </div>

                  <div className="border-t border-gray-700 pt-2">
                    <div className="text-gray-400 mb-1">Data Sources:</div>
                    <div className="flex flex-wrap gap-1">
                      {dataSources.map((source, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-xs"
                        >
                          {source}
                        </span>
                      ))}
                    </div>
                  </div>

                  {lastUpdated && (
                    <div className="border-t border-gray-700 pt-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Last Update:</span>
                        <span className="font-semibold">{getTimeAgo(lastUpdated)}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tooltip arrow */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-px">
                  <div className="w-3 h-3 bg-[#101626] border-r border-b border-emerald-500/30 transform rotate-45"></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};
