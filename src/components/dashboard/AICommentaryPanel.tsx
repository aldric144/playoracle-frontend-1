import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { api } from '../../lib/api';
import { TrustIndexBadge } from './TrustIndexBadge';

interface AICommentaryPanelProps {
  sport: string;
  season?: number;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

interface CommentaryData {
  sport: string;
  season: number;
  commentary: string;
  trust_index: 'verified' | 'high' | 'moderate' | 'low';
  confidence: number;
  accuracy: number;
  delta: number;
  key_factors: string[];
  data_sources: string[];
  last_updated: string;
  timestamp: string;
}

export const AICommentaryPanel: React.FC<AICommentaryPanelProps> = ({
  sport,
  season = 2026,
  autoRefresh = false,
  refreshInterval = 15000
}) => {
  const [commentary, setCommentary] = useState<CommentaryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchCommentary();

    if (autoRefresh) {
      const interval = setInterval(fetchCommentary, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [sport, season, autoRefresh, refreshInterval]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  const fetchCommentary = async () => {
    try {
      const data = await api.getAICommentary(sport, season);
      setCommentary(data);
    } catch (error) {
      console.error('Failed to fetch AI commentary:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchCommentary();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!commentary) {
    return null;
  }

  return (
    <div className="relative">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="relative bg-zinc-900/50 border-l-4 border-emerald-500/60 rounded-lg p-4 backdrop-blur-sm"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-400">
                  🧠 PlayOracle Insight
                </span>
                <TrustIndexBadge
                  trustIndex={commentary.trust_index}
                  confidence={commentary.confidence}
                  dataSources={commentary.data_sources}
                  lastUpdated={commentary.last_updated}
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="p-1 hover:bg-emerald-500/10 rounded transition-colors"
                  title="Refresh Insight"
                >
                  <RefreshCw
                    className={`w-4 h-4 text-emerald-400 ${refreshing ? 'animate-spin' : ''}`}
                  />
                </button>
                <button
                  onClick={() => setIsVisible(false)}
                  className="p-1 hover:bg-emerald-500/10 rounded transition-colors"
                  title="Hide AI Insight"
                >
                  <EyeOff className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Commentary Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-sm italic text-emerald-400/80 leading-relaxed"
            >
              {commentary.commentary}
              {showCursor && (
                <span className="inline-block w-0.5 h-4 bg-emerald-400 ml-1 animate-pulse"></span>
              )}
            </motion.p>

            {/* Metadata */}
            <div className="mt-3 pt-3 border-t border-gray-700/50 flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center gap-4">
                <span>Accuracy: {commentary.accuracy.toFixed(1)}%</span>
                <span className={commentary.delta >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                  {commentary.delta >= 0 ? '+' : ''}{commentary.delta.toFixed(1)}% YoY
                </span>
              </div>
              <span>
                Updated {new Date(commentary.last_updated).toLocaleDateString()}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show AI Insight Button (when hidden) */}
      {!isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setIsVisible(true)}
          className="flex items-center gap-2 px-3 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg transition-colors"
        >
          <Eye className="w-4 h-4 text-emerald-400" />
          <span className="text-xs text-emerald-400">Show AI Insight</span>
        </motion.button>
      )}
    </div>
  );
};
