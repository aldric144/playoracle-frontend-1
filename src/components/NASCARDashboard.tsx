import React, { useState, useEffect } from 'react';
import { Flag, TrendingUp } from 'lucide-react';
import FlipCard from './FlipCard';

interface NASCARDashboardProps {
  onBack: () => void;
}

export const NASCARDashboard: React.FC<NASCARDashboardProps> = ({ onBack }) => {
  const [races, setRaces] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewAll, setViewAll] = useState(false);
  const [scope, setScope] = useState<'live' | 'all'>('live');

  useEffect(() => {
    fetchNASCARData();
  }, [scope]);

  const fetchNASCARData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/nascar/upcoming?scope=${scope}`);
      const racesData = await response.json();
      
      const historyResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/nascar/history`);
      const historyData = await historyResponse.json();

      setRaces(racesData.races || []);
      setHistory(historyData.history || []);
    } catch (error) {
      console.error('Failed to fetch NASCAR data:', error);
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
          <Flag className="w-8 h-8 text-emerald-400" />
          <h1 className="text-3xl font-bold text-zinc-100">NASCAR Races</h1>
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

      {/* Races Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
          <p className="mt-4 text-zinc-400">Loading races...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {races.map((race, idx) => (
            <div
              key={race.id || idx}
              className="bg-[#101626] border border-emerald-500/20 rounded-xl shadow-lg shadow-emerald-500/10 p-6 hover:shadow-xl hover:shadow-emerald-500/20 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-zinc-100">{race.name}</h3>
                  <p className="text-sm text-zinc-400">{race.track}</p>
                  <p className="text-xs text-zinc-500">{race.location}</p>
                </div>
                <Flag className="w-6 h-6 text-red-500" />
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Race Date:</span>
                  <span className="font-medium">{race.race_date}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Distance:</span>
                  <span className="font-medium">{race.distance}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Laps:</span>
                  <span className="font-medium">{race.laps}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Purse:</span>
                  <span className="font-medium text-emerald-400">{race.purse}</span>
                </div>
              </div>

              {/* Top Drivers */}
              {race.top_drivers && race.top_drivers.length > 0 && (
                <div className="border-t border-zinc-700 pt-4">
                  <h4 className="text-sm font-semibold text-zinc-300 mb-3">Top Contenders</h4>
                  <div className="space-y-3">
                    {race.top_drivers.slice(0, 3).map((driver: any, didx: number) => (
                      <div key={didx} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-zinc-500">#{driver.number}</span>
                          <div>
                            <div className="text-sm font-medium">{driver.name}</div>
                            <div className="text-xs text-zinc-500">{driver.team}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded text-xs font-bold text-white ${getDCIColor(driver.dci.dci_score)}`}>
                            DCI {driver.dci.dci_score}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4 pt-4 border-t">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  race.status === 'Upcoming' ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {race.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {races.length === 0 && !loading && (
        <div className="text-center py-12 bg-[#101626] border border-emerald-500/20 rounded-xl shadow-lg shadow-emerald-500/10">
          <Flag className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
          <p className="text-zinc-400">No races available at this time</p>
        </div>
      )}
    </div>
  );

  const renderHistoryDashboard = () => (
    <div className="space-y-6 p-6 bg-[#0a0f1f]">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-8 h-8 text-zinc-400" />
        <h2 className="text-2xl font-bold text-zinc-100">Race History</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {history.map((race, idx) => (
          <div
            key={race.id || idx}
            className="bg-[#101626] border border-emerald-500/20 rounded-xl shadow-lg shadow-emerald-500/10 p-6"
          >
            <h3 className="text-lg font-bold text-zinc-100 mb-2">{race.name}</h3>
            <p className="text-sm text-zinc-400 mb-4">{race.track}</p>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Race Date:</span>
                <span className="font-medium">{race.race_date}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Distance:</span>
                <span className="font-medium">{race.distance}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Purse:</span>
                <span className="font-medium text-emerald-400">{race.purse}</span>
              </div>
            </div>

            {race.top_drivers && race.top_drivers.length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <h4 className="text-sm font-semibold text-zinc-300 mb-2">Past Performance</h4>
                <div className="space-y-2">
                  {race.top_drivers.slice(0, 2).map((driver: any, didx: number) => (
                    <div key={didx} className="flex items-center justify-between text-sm">
                      <span className="font-medium">{driver.name}</span>
                      <span className="text-zinc-400">DCI {driver.dci.dci_score}</span>
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

export default NASCARDashboard;
