import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, RefreshCw, TrendingUp } from 'lucide-react';
import { api } from '../../lib/api';
import { TrustIndexBadge } from './TrustIndexBadge';

interface CommentaryEntry {
  sport: string;
  season: number;
  commentary: string;
  trust_index: 'verified' | 'high' | 'moderate' | 'low';
  confidence: number;
  accuracy: number;
  delta: number;
  data_sources: string[];
  last_updated: string;
}

const SPORT_DISPLAY_NAMES: Record<string, string> = {
  nfl: 'NFL',
  nba: 'NBA',
  mlb: 'MLB',
  nhl: 'NHL',
  soccer: 'Soccer',
  formula1: 'Formula 1',
  college_football: 'College Football',
  boxing: 'Boxing',
  mma: 'MMA',
  tennis: 'Tennis',
  volleyball: 'Volleyball',
  rugby: 'Rugby',
  cricket: 'Cricket',
  golf: 'Golf',
  table_tennis: 'Table Tennis',
  nascar: 'NASCAR',
  motogp: 'MotoGP',
  cycling: 'Cycling'
};

const SPORT_ICONS: Record<string, string> = {
  nfl: '🏈',
  nba: '🏀',
  mlb: '⚾',
  nhl: '🏒',
  soccer: '⚽',
  formula1: '🏎️',
  college_football: '🏈',
  boxing: '🥊',
  mma: '🥋',
  tennis: '🎾',
  volleyball: '🏐',
  rugby: '🏉',
  cricket: '🏏',
  golf: '⛳',
  table_tennis: '🏓',
  nascar: '🏁',
  motogp: '🏍️',
  cycling: '🚴'
};

export const AIReflectionsPanel: React.FC = () => {
  const [reflections, setReflections] = useState<CommentaryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    fetchReflections();
  }, []);

  const fetchReflections = async () => {
    try {
      const topSports = ['nfl', 'nba', 'mlb', 'nhl', 'soccer', 'tennis'];
      const promises = topSports.map(sport => 
        api.getLatestAICommentary(sport).catch(() => null)
      );
      
      const results = await Promise.all(promises);
      const validReflections = results.filter(r => r !== null) as CommentaryEntry[];
      
      setReflections(validReflections);
      setLastUpdated(new Date().toISOString());
    } catch (error) {
      console.error('Failed to fetch AI reflections:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchReflections();
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const updated = new Date(timestamp);
    const diffMs = now.getTime() - updated.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours < 1) return 'Just now';
    if (diffHours === 1) return '1 hour ago';
    if (diffHours < 24) return `${diffHours} hours ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-[#101626] to-[#0a0f1f] rounded-xl border border-emerald-500/20 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-lg">
            <MessageSquare className="w-5 h-5 text-emerald-400" />
          </div>
          <h3 className="text-lg font-semibold text-white">AI Reflections & Model Insights</h3>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#101626] to-[#0a0f1f] rounded-xl border border-emerald-500/20 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-lg">
            <MessageSquare className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">🗣️ AI Reflections & Model Insights</h3>
            <p className="text-xs text-gray-400">
              Last updated {lastUpdated ? getTimeAgo(lastUpdated) : 'recently'}
            </p>
          </div>
        </div>

        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-3 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg transition-colors"
        >
          <RefreshCw className={`w-4 h-4 text-emerald-400 ${refreshing ? 'animate-spin' : ''}`} />
          <span className="text-xs text-emerald-400">Refresh Insights</span>
        </button>
      </div>

      {/* Reflections List */}
      <div className="space-y-4">
        {reflections.map((reflection, index) => (
          <motion.div
            key={reflection.sport}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-zinc-900/50 border border-emerald-500/20 rounded-lg p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{SPORT_ICONS[reflection.sport] || '🏆'}</span>
                <div>
                  <div className="text-sm font-semibold text-white">
                    {SPORT_DISPLAY_NAMES[reflection.sport] || reflection.sport}
                  </div>
                  <div className="text-xs text-gray-400">Season {reflection.season}</div>
                </div>
              </div>

              <TrustIndexBadge
                trustIndex={reflection.trust_index}
                confidence={reflection.confidence}
                dataSources={reflection.data_sources}
                lastUpdated={reflection.last_updated}
              />
            </div>

            <p className="text-sm italic text-emerald-400/80 leading-relaxed mb-3">
              {reflection.commentary}
            </p>

            <div className="flex items-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>Accuracy: {reflection.accuracy.toFixed(1)}%</span>
              </div>
              <span className={reflection.delta >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                {reflection.delta >= 0 ? '+' : ''}{reflection.delta.toFixed(1)}% YoY
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
