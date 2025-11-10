import React, { useState, useEffect } from 'react';
import { Trophy, TrendingUp } from 'lucide-react';
import FlipCard from './FlipCard';

interface GolfDashboardProps {
  onBack: () => void;
}

export const GolfDashboard: React.FC<GolfDashboardProps> = ({ onBack }) => {
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewAll, setViewAll] = useState(false);
  const [scope, setScope] = useState<'live' | 'all'>('live');

  useEffect(() => {
    fetchGolfData();
  }, [scope]);

  const fetchGolfData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/golf/upcoming?scope=${scope}`);
      const tournamentsData = await response.json();
      
      const historyResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/golf/history`);
      const historyData = await historyResponse.json();

      setTournaments(tournamentsData.tournaments || []);
      setHistory(historyData.history || []);
    } catch (error) {
      console.error('Failed to fetch golf data:', error);
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
            className="px-4 py-2 bg-[#101626] border border-emerald-500/20 rounded-lg shadow hover:shadow-emerald-500/20 transition-shadow text-zinc-200"
          >
            ← Back to Sports IQ
          </button>
          <Trophy className="w-8 h-8 text-emerald-400" />
          <h1 className="text-3xl font-bold text-zinc-100">Golf Tournaments</h1>
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

      {/* Tournaments Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
          <p className="mt-4 text-zinc-400">Loading tournaments...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tournaments.map((tournament, idx) => (
            <div
              key={tournament.id || idx}
              className="bg-[#101626] border border-emerald-500/20 rounded-xl shadow-lg shadow-emerald-500/10 p-6 hover:shadow-xl hover:shadow-emerald-500/20 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-zinc-100">{tournament.name}</h3>
                  <p className="text-sm text-zinc-400">{tournament.venue}</p>
                  <p className="text-xs text-zinc-500">{tournament.location}</p>
                </div>
                <Trophy className="w-6 h-6 text-yellow-500" />
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Dates:</span>
                  <span className="font-medium text-zinc-200">{tournament.start_date} - {tournament.end_date}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Purse:</span>
                  <span className="font-medium text-emerald-400">{tournament.purse}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Field Size:</span>
                  <span className="font-medium text-zinc-200">{tournament.field_size} players</span>
                </div>
              </div>

              {/* Top Players */}
              {tournament.top_players && tournament.top_players.length > 0 && (
                <div className="border-t border-zinc-700 pt-4">
                  <h4 className="text-sm font-semibold text-zinc-300 mb-3">Top Contenders</h4>
                  <div className="space-y-3">
                    {tournament.top_players.slice(0, 3).map((player: any, pidx: number) => (
                      <div key={pidx} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-zinc-500">#{player.rank}</span>
                          <span className="text-sm font-medium text-zinc-200">{player.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded text-xs font-bold text-white ${getDCIColor(player.dci.dci_score)}`}>
                            DCI {player.dci.dci_score}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-zinc-700">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  tournament.status === 'Upcoming' ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {tournament.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tournaments.length === 0 && !loading && (
        <div className="text-center py-12 bg-[#101626] border border-emerald-500/20 rounded-xl shadow-lg shadow-emerald-500/10">
          <Trophy className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
          <p className="text-zinc-400">No tournaments available at this time</p>
        </div>
      )}
    </div>
  );

  const renderHistoryDashboard = () => (
    <div className="space-y-6 p-6 bg-[#0a0f1f]">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-8 h-8 text-emerald-400" />
        <h2 className="text-2xl font-bold text-zinc-100">Tournament History</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {history.map((tournament, idx) => (
          <div
            key={tournament.id || idx}
            className="bg-[#101626] border border-emerald-500/20 rounded-xl shadow-lg shadow-emerald-500/10 p-6"
          >
            <h3 className="text-lg font-bold text-zinc-100 mb-2">{tournament.name}</h3>
            <p className="text-sm text-zinc-400 mb-4">{tournament.venue}</p>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Dates:</span>
                <span className="font-medium text-zinc-200">{tournament.start_date} - {tournament.end_date}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Purse:</span>
                <span className="font-medium text-emerald-400">{tournament.purse}</span>
              </div>
            </div>

            {tournament.top_players && tournament.top_players.length > 0 && (
              <div className="mt-4 pt-4 border-t border-zinc-700">
                <h4 className="text-sm font-semibold text-zinc-300 mb-2">Past Performance</h4>
                <div className="space-y-2">
                  {tournament.top_players.slice(0, 2).map((player: any, pidx: number) => (
                    <div key={pidx} className="flex items-center justify-between text-sm">
                      <span className="font-medium text-zinc-200">{player.name}</span>
                      <span className="text-zinc-400">DCI {player.dci.dci_score}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
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

export default GolfDashboard;
