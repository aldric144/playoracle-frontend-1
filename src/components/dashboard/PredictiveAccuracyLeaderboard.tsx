import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, TrendingUp, TrendingDown, Activity, Award, Target, Zap } from 'lucide-react';
import { api } from '../../lib/api';

interface SportAccuracy {
  accuracy: number;
  seasons: number;
  trend_r: number;
  delta: number;
}

interface AIAccuracyData {
  nfl: SportAccuracy;
  nba: SportAccuracy;
  mlb: SportAccuracy;
  nhl: SportAccuracy;
  soccer: SportAccuracy;
  formula1: SportAccuracy;
  college_football: SportAccuracy;
  boxing: SportAccuracy;
  mma: SportAccuracy;
  tennis: SportAccuracy;
  volleyball: SportAccuracy;
  rugby: SportAccuracy;
  cricket: SportAccuracy;
  golf: SportAccuracy;
  table_tennis: SportAccuracy;
  nascar: SportAccuracy;
  motogp: SportAccuracy;
  cycling: SportAccuracy;
  last_updated: string;
}

interface LeaderboardEntry {
  sport: string;
  displayName: string;
  icon: string;
  accuracy: number;
  seasons: number;
  trend_r: number;
  delta: number;
  tier: 'exceptional' | 'high' | 'moderate' | 'needs_review';
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

const getTier = (accuracy: number): 'exceptional' | 'high' | 'moderate' | 'needs_review' => {
  if (accuracy >= 85) return 'exceptional';
  if (accuracy >= 70) return 'high';
  if (accuracy >= 55) return 'moderate';
  return 'needs_review';
};

const getTierColor = (tier: string) => {
  switch (tier) {
    case 'exceptional':
      return 'from-emerald-500/20 to-emerald-600/20 border-emerald-500/40';
    case 'high':
      return 'from-blue-500/20 to-blue-600/20 border-blue-500/40';
    case 'moderate':
      return 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/40';
    case 'needs_review':
      return 'from-red-500/20 to-red-600/20 border-red-500/40';
    default:
      return 'from-gray-500/20 to-gray-600/20 border-gray-500/40';
  }
};

const getTierGlow = (tier: string) => {
  switch (tier) {
    case 'exceptional':
      return 'shadow-emerald-500/20';
    case 'high':
      return 'shadow-blue-500/20';
    case 'moderate':
      return 'shadow-yellow-500/20';
    case 'needs_review':
      return 'shadow-red-500/20';
    default:
      return 'shadow-gray-500/20';
  }
};

export const PredictiveAccuracyLeaderboard: React.FC = () => {
  const [accuracyData, setAccuracyData] = useState<AIAccuracyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSport, setSelectedSport] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccuracyData = async () => {
      try {
        const data = await api.getAIAccuracy();
        setAccuracyData(data);
      } catch (error) {
        console.error('Failed to fetch AI accuracy data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccuracyData();
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-[#101626] to-[#0a0f1f] rounded-xl border border-emerald-500/20 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-lg">
            <Trophy className="w-5 h-5 text-emerald-400" />
          </div>
          <h3 className="text-lg font-semibold text-white">Predictive Accuracy Leaderboard</h3>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
        </div>
      </div>
    );
  }

  if (!accuracyData) {
    return null;
  }

  const leaderboardEntries: LeaderboardEntry[] = Object.entries(accuracyData)
    .filter(([key]) => key !== 'last_updated')
    .map(([sport, data]) => ({
      sport,
      displayName: SPORT_DISPLAY_NAMES[sport] || sport,
      icon: SPORT_ICONS[sport] || '🏆',
      accuracy: (data as SportAccuracy).accuracy,
      seasons: (data as SportAccuracy).seasons,
      trend_r: (data as SportAccuracy).trend_r,
      delta: (data as SportAccuracy).delta,
      tier: getTier((data as SportAccuracy).accuracy)
    }))
    .sort((a, b) => b.accuracy - a.accuracy);

  const mostAccurate = leaderboardEntries[0];
  const mostImproved = leaderboardEntries.reduce((prev, current) => 
    current.delta > prev.delta ? current : prev
  );
  const lowestVariance = leaderboardEntries.reduce((prev, current) => 
    current.trend_r > prev.trend_r ? current : prev
  );

  return (
    <div className="bg-gradient-to-br from-[#101626] to-[#0a0f1f] rounded-xl border border-emerald-500/20 p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-lg">
          <Trophy className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">The Oracle's Mirror</h3>
          <p className="text-xs text-gray-400">AI Predictive Accuracy Across All Sports</p>
        </div>
      </div>

      {/* Performance Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/30 rounded-lg p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-medium text-emerald-400">Most Accurate</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{mostAccurate.icon}</span>
            <div>
              <div className="text-sm font-semibold text-white">{mostAccurate.displayName}</div>
              <div className="text-xs text-gray-400">{mostAccurate.accuracy.toFixed(1)}% accuracy</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-lg p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-medium text-blue-400">Most Improved</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{mostImproved.icon}</span>
            <div>
              <div className="text-sm font-semibold text-white">{mostImproved.displayName}</div>
              <div className="text-xs text-gray-400">+{mostImproved.delta.toFixed(1)}% YoY</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/30 rounded-lg p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-medium text-purple-400">Lowest Variance</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{lowestVariance.icon}</span>
            <div>
              <div className="text-sm font-semibold text-white">{lowestVariance.displayName}</div>
              <div className="text-xs text-gray-400">r = {lowestVariance.trend_r.toFixed(2)}</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Leaderboard */}
      <div className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar">
        <AnimatePresence>
          {leaderboardEntries.map((entry, index) => (
            <motion.div
              key={entry.sport}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`
                bg-gradient-to-r ${getTierColor(entry.tier)}
                border rounded-lg p-4 cursor-pointer
                transition-all duration-300 hover:scale-[1.02]
                ${getTierGlow(entry.tier)} hover:shadow-lg
              `}
              onClick={() => setSelectedSport(selectedSport === entry.sport ? null : entry.sport)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-400 w-6">#{index + 1}</span>
                    <span className="text-2xl">{entry.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-white">{entry.displayName}</div>
                    <div className="text-xs text-gray-400">{entry.seasons} seasons analyzed</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{entry.accuracy.toFixed(1)}%</div>
                    <div className="flex items-center gap-1 text-xs">
                      {entry.delta >= 0 ? (
                        <TrendingUp className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-400" />
                      )}
                      <span className={entry.delta >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                        {entry.delta >= 0 ? '+' : ''}{entry.delta.toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  <div className="w-24">
                    <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${entry.accuracy}%` }}
                        transition={{ delay: index * 0.05 + 0.3, duration: 0.6 }}
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                      />
                    </div>
                    <div className="text-xs text-gray-400 mt-1">r = {entry.trend_r.toFixed(2)}</div>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              <AnimatePresence>
                {selectedSport === entry.sport && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-white/10"
                  >
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Accuracy Tier</div>
                        <div className="text-sm font-semibold text-white capitalize">
                          {entry.tier.replace('_', ' ')}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Trend Correlation</div>
                        <div className="text-sm font-semibold text-white">
                          {entry.trend_r.toFixed(3)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">YoY Change</div>
                        <div className={`text-sm font-semibold ${entry.delta >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {entry.delta >= 0 ? '+' : ''}{entry.delta.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <Activity className="w-3 h-3" />
          <span>Updated: {new Date(accuracyData.last_updated).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-3 h-3 text-emerald-400" />
          <span>Live AI Analytics</span>
        </div>
      </div>
    </div>
  );
};
