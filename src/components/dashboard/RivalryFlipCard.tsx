import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Clock, Trophy, Target } from 'lucide-react';
import { api } from '../../lib/api';

interface Game {
  home_team: string;
  away_team: string;
  sport: string;
  scheduled_time: string;
}

interface RivalryHistoryEntry {
  id: string;
  team_a: string;
  team_b: string;
  sport: string;
  game_date: string;
  score_a: number;
  score_b: number;
  winner: string;
  summary?: string;
}

interface RivalryMetrics {
  team_a: string;
  team_b: string;
  sport: string;
  total_meetings: number;
  wins_a: number;
  wins_b: number;
  avg_margin: number;
  current_streak?: string;
  last_updated: string;
}

interface RivalryData {
  history: RivalryHistoryEntry[];
  metrics: RivalryMetrics | null;
  has_access: boolean;
}

interface RivalryInsight {
  insight: string;
  momentum_score: number;
  trend: string;
}

interface RivalryFlipCardProps {
  game: Game;
  dciScore?: number;
  predictedWinner?: string;
}

export function RivalryFlipCard({ game, dciScore, predictedWinner }: RivalryFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [rivalryData, setRivalryData] = useState<RivalryData | null>(null);
  const [insight, setInsight] = useState<RivalryInsight | null>(null);
  const [loading, setLoading] = useState(false);
  const [insightText, setInsightText] = useState('');
  const [showTypewriter, setShowTypewriter] = useState(false);

  const triggerHaptic = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(8);
    }
  };

  const handleFlip = async () => {
    triggerHaptic();
    
    if (!isFlipped && !rivalryData) {
      setLoading(true);
      try {
        const [historyData, insightData] = await Promise.all([
          api.getRivalryHistory(game.home_team, game.away_team, game.sport, 10),
          api.getRivalryInsight(game.home_team, game.away_team, game.sport)
        ]);
        
        setRivalryData(historyData);
        setInsight(insightData);
        setShowTypewriter(true);
      } catch (error: any) {
        if (error.message?.includes('403') || error.message?.includes('Premium')) {
          setRivalryData({
            history: [],
            metrics: null,
            has_access: false
          });
        }
      } finally {
        setLoading(false);
      }
    }
    
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    if (showTypewriter && insight) {
      let currentIndex = 0;
      const text = insight.insight;
      setInsightText('');
      
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setInsightText(text.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
          setShowTypewriter(false);
        }
      }, 20);
      
      return () => clearInterval(interval);
    }
  }, [showTypewriter, insight]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getMomentumIcon = (trend: string) => {
    if (trend.includes('Dominant') || trend.includes('Momentum')) {
      return <TrendingUp className="w-4 h-4" />;
    } else if (trend === 'Evenly Matched') {
      return <Minus className="w-4 h-4" />;
    }
    return <TrendingDown className="w-4 h-4" />;
  };

  const getMomentumColor = (score: number) => {
    if (score > 1.5) return 'text-emerald-400';
    if (score > 0.5) return 'text-emerald-500';
    if (score < -1.5) return 'text-red-400';
    if (score < -0.5) return 'text-red-500';
    return 'text-gray-400';
  };

  return (
    <div className="relative h-64 md:h-72 lg:h-80" style={{ perspective: '1000px' }}>
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {/* Front of card - Game forecast */}
        <motion.div
          className="absolute inset-0"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-emerald-500/20 hover:border-emerald-500/40 transition-all h-full cursor-pointer overflow-hidden"
               onClick={handleFlip}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="text-sm text-gray-400 mb-2">{game.sport}</div>
                <div className="text-lg font-bold text-white mb-1">{game.home_team}</div>
                <div className="text-sm text-gray-400 mb-2">vs</div>
                <div className="text-lg font-bold text-white">{game.away_team}</div>
              </div>
              {dciScore && (
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-400">{dciScore}%</div>
                  <div className="text-xs text-gray-400">DCI Score</div>
                </div>
              )}
            </div>
            
            {predictedWinner && (
              <div className="mt-4 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                <div className="text-sm text-emerald-400 font-semibold">Predicted Winner</div>
                <div className="text-white font-bold">{predictedWinner}</div>
              </div>
            )}
            
            <div className="mt-4 text-xs text-gray-500 flex items-center gap-2">
              <Clock className="w-3 h-3" />
              Tap to view rivalry history
            </div>
          </div>
        </motion.div>

        {/* Back of card - Rivalry history */}
        <motion.div
          className="absolute inset-0"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-purple-500/20 h-full overflow-y-auto cursor-pointer overflow-hidden"
               onClick={handleFlip}>
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
              </div>
            ) : rivalryData && !rivalryData.has_access ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Trophy className="w-16 h-16 text-purple-500/50 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Live Rivalry Intelligence™</h3>
                <p className="text-gray-400 mb-4">Unlock detailed rivalry history, AI insights, and momentum analysis</p>
                <div className="px-6 py-3 bg-gradient-to-r from-purple-600 to-emerald-600 rounded-lg text-white font-semibold">
                  Upgrade to Oracle Elite
                </div>
              </div>
            ) : rivalryData && rivalryData.has_access ? (
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Rivalry History</h3>
                    <div className="text-sm text-gray-400">{game.home_team} vs {game.away_team}</div>
                  </div>
                  <div className="text-xs text-purple-400">Tap to flip back</div>
                </div>

                {rivalryData.metrics && (
                  <div className="mb-6 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{rivalryData.metrics.total_meetings}</div>
                        <div className="text-xs text-gray-400">Total Games</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-400">{rivalryData.metrics.wins_a}</div>
                        <div className="text-xs text-gray-400">{rivalryData.metrics.team_a} Wins</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-400">{rivalryData.metrics.wins_b}</div>
                        <div className="text-xs text-gray-400">{rivalryData.metrics.team_b} Wins</div>
                      </div>
                    </div>
                    {rivalryData.metrics.current_streak && (
                      <div className="text-center text-sm text-purple-300">
                        <Trophy className="w-4 h-4 inline mr-1" />
                        Current Streak: {rivalryData.metrics.current_streak}
                      </div>
                    )}
                  </div>
                )}

                {insight && (
                  <div className="mb-6 p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-emerald-400" />
                      <div className="text-sm font-semibold text-emerald-400">AI Insight</div>
                      <div className={`ml-auto flex items-center gap-1 ${getMomentumColor(insight.momentum_score)}`}>
                        {getMomentumIcon(insight.trend)}
                        <span className="text-xs">{insight.trend}</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-300 leading-relaxed">
                      {showTypewriter ? insightText : insight.insight}
                      {showTypewriter && <span className="animate-pulse">|</span>}
                    </div>
                  </div>
                )}

                {rivalryData.history.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-3">Last 10 Meetings</h4>
                    <div className="space-y-2">
                      {rivalryData.history.map((entry, index) => (
                        <motion.div
                          key={entry.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="p-3 bg-gray-800/50 rounded-lg border border-gray-700/50"
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex-1">
                              <div className="text-xs text-gray-400 mb-1">{formatDate(entry.game_date)}</div>
                              <div className="text-sm">
                                <span className={entry.winner === entry.team_a ? 'text-emerald-400 font-semibold' : 'text-gray-400'}>
                                  {entry.team_a}
                                </span>
                                <span className="text-gray-500 mx-2">{entry.score_a} - {entry.score_b}</span>
                                <span className={entry.winner === entry.team_b ? 'text-emerald-400 font-semibold' : 'text-gray-400'}>
                                  {entry.team_b}
                                </span>
                              </div>
                            </div>
                            {entry.winner === entry.team_a ? (
                              <TrendingUp className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-red-400" />
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {rivalryData.metrics && (
                  <div className="mt-4 text-xs text-gray-500 text-center">
                    Last updated {new Date(rivalryData.metrics.last_updated).toLocaleTimeString()}
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
