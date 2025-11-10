import React, { useState, useEffect } from 'react';
import { Zap, TrendingUp, Activity } from 'lucide-react';
import FlipCard from './FlipCard';

interface TableTennisDashboardProps {
  onBack: () => void;
}

export const TableTennisDashboard: React.FC<TableTennisDashboardProps> = ({ onBack }) => {
  const [matches, setMatches] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewAll, setViewAll] = useState(false);
  const [scope, setScope] = useState<'live' | 'all'>('live');

  useEffect(() => {
    fetchTableTennisData();
  }, [scope]);

  const fetchTableTennisData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tabletennis/upcoming?scope=${scope}`);
      const matchesData = await response.json();
      
      const historyResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/tabletennis/history`);
      const historyData = await historyResponse.json();

      setMatches(matchesData.matches || []);
      setHistory(historyData.history || []);
    } catch (error) {
      console.error('Failed to fetch table tennis data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDCIColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 70) return 'bg-blue-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const renderLiveDashboard = () => (
    <div className="space-y-6 p-6 bg-[#0a0f1f]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-[#101626] border border-emerald-500/20 rounded-lg shadow hover:shadow-emerald-500/20 transition-shadow"
          >
            ← Back to Sports IQ
          </button>
          <Zap className="w-8 h-8 text-emerald-400" />
          <h1 className="text-3xl font-bold text-zinc-100">Table Tennis Matches</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm font-medium text-zinc-300">
            <input
              type="checkbox"
              checked={viewAll}
              onChange={(e) => {
                setViewAll(e.target.checked);
                setScope(e.target.checked ? 'all' : 'live');
              }}
              className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-emerald-500 focus:ring-emerald-500"
            />
            View All Events
          </label>
        </div>
      </div>

      {/* Matches Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
          <p className="mt-4 text-zinc-400">Loading matches...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match, idx) => (
            <div
              key={match.id || idx}
              className="bg-[#101626] border border-emerald-500/20 rounded-xl shadow-lg shadow-emerald-500/10 p-6 hover:shadow-xl hover:shadow-emerald-500/20 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-zinc-100">{match.tournament}</h3>
                  <p className="text-sm text-zinc-400">{match.round}</p>
                  <p className="text-xs text-zinc-500">{match.venue}</p>
                </div>
                <Zap className="w-6 h-6 text-orange-500" />
              </div>

              {/* Player 1 */}
              <div className="mb-4 p-4 bg-zinc-800/50 border border-blue-500/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-bold text-zinc-100">{match.player1.name}</p>
                    {match.player1.country && (
                      <p className="text-xs text-zinc-400">{match.player1.country}</p>
                    )}
                    {match.player1.rank && (
                      <p className="text-xs text-zinc-500">Rank #{match.player1.rank}</p>
                    )}
                  </div>
                  <div className={`px-3 py-1 rounded-lg text-sm font-bold text-white ${getDCIColor(match.player1.dci.dci_score)}`}>
                    DCI {match.player1.dci.dci_score}
                  </div>
                </div>
                
                {/* DCI Factors */}
                <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                  <div className="text-center">
                    <p className="text-zinc-400">Aces</p>
                    <p className="font-bold">{match.player1.dci.factors.aces}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-zinc-400">Rally Eff</p>
                    <p className="font-bold">{match.player1.dci.factors.rally_efficiency}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-zinc-400">Reflex</p>
                    <p className="font-bold">{match.player1.dci.factors.reflex}%</p>
                  </div>
                </div>
              </div>

              {/* VS Divider */}
              <div className="text-center my-3">
                <span className="px-4 py-1 bg-gray-200 rounded-full text-sm font-bold text-zinc-300">VS</span>
              </div>

              {/* Player 2 */}
              <div className="mb-4 p-4 bg-zinc-800/50 border border-red-500/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-bold text-zinc-100">{match.player2.name}</p>
                    {match.player2.country && (
                      <p className="text-xs text-zinc-400">{match.player2.country}</p>
                    )}
                    {match.player2.rank && (
                      <p className="text-xs text-zinc-500">Rank #{match.player2.rank}</p>
                    )}
                  </div>
                  <div className={`px-3 py-1 rounded-lg text-sm font-bold text-white ${getDCIColor(match.player2.dci.dci_score)}`}>
                    DCI {match.player2.dci.dci_score}
                  </div>
                </div>
                
                {/* DCI Factors */}
                <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                  <div className="text-center">
                    <p className="text-zinc-400">Aces</p>
                    <p className="font-bold">{match.player2.dci.factors.aces}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-zinc-400">Rally Eff</p>
                    <p className="font-bold">{match.player2.dci.factors.rally_efficiency}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-zinc-400">Reflex</p>
                    <p className="font-bold">{match.player2.dci.factors.reflex}%</p>
                  </div>
                </div>
              </div>

              {/* Match Info */}
              <div className="pt-4 border-t border-zinc-700 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Best of:</span>
                  <span className="font-medium">{match.best_of} sets</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Start Time:</span>
                  <span className="font-medium">{new Date(match.start_time).toLocaleDateString()}</span>
                </div>
                <div className="mt-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    match.status === 'Scheduled' ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {match.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {matches.length === 0 && !loading && (
        <div className="text-center py-12 bg-[#101626] border border-emerald-500/20 rounded-xl shadow-lg shadow-emerald-500/10">
          <Zap className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
          <p className="text-zinc-400">No matches available at this time</p>
        </div>
      )}
    </div>
  );

  const renderHistoryDashboard = () => (
    <div className="space-y-6 p-6 bg-[#0a0f1f]">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-8 h-8 text-zinc-400" />
        <h2 className="text-2xl font-bold text-zinc-100">Match History</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {history.map((match, idx) => (
          <div
            key={match.id || idx}
            className="bg-[#101626] border border-emerald-500/20 rounded-xl shadow-lg shadow-emerald-500/10 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-zinc-100">{match.tournament}</h3>
                <p className="text-sm text-zinc-400">{new Date(match.date).toLocaleDateString()}</p>
              </div>
              <Activity className="w-6 h-6 text-gray-400" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-zinc-800/50 border border-emerald-500/20 rounded-lg">
                <span className="font-bold text-zinc-100">{match.player1}</span>
                <span className="text-emerald-400 font-bold">{match.winner === match.player1 ? '✓ Winner' : ''}</span>
              </div>
              
              <div className="text-center">
                <span className="px-4 py-2 bg-zinc-700 rounded-lg text-lg font-bold text-zinc-200">{match.score}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-zinc-800/50 border border-red-500/20 rounded-lg">
                <span className="font-bold text-zinc-100">{match.player2}</span>
                <span className="text-emerald-400 font-bold">{match.winner === match.player2 ? '✓ Winner' : ''}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between text-sm text-zinc-400">
                <span>Duration:</span>
                <span className="font-medium">{match.duration_minutes} minutes</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {history.length === 0 && (
        <div className="text-center py-12 bg-[#101626] border border-emerald-500/20 rounded-xl shadow-lg shadow-emerald-500/10">
          <p className="text-zinc-400">No historical data available</p>
        </div>
      )}
    </div>
  );

  return (
    <FlipCard
      frontContent={renderLiveDashboard()}
      backContent={renderHistoryDashboard()}
    />
  );
};

export default TableTennisDashboard;
