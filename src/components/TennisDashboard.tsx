import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, TrendingUp, Target, Zap } from 'lucide-react';

interface TennisEvent {
  id: string;
  tournament: string;
  round: string;
  date: string;
  venue: string;
  surface: string;
  player_one: {
    name: string;
    ranking: number;
    handedness?: string;
    nationality?: string;
  };
  player_two: {
    name: string;
    ranking: number;
    handedness?: string;
    nationality?: string;
  };
  dci_preview?: {
    player_one_score: number;
    player_two_score: number;
    classification: string;
  };
}

const DCIBadge = ({ score, classification }: { score: number; classification: string }) => {
  const getColor = () => {
    if (score >= 85) return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    if (score >= 65) return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    if (score >= 50) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    return 'bg-red-500/20 text-red-400 border-red-500/30';
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <Badge className={`${getColor()} border font-mono text-sm px-3 py-1`}>
        DCI {score.toFixed(0)}
      </Badge>
      <span className="text-xs text-gray-400">{classification}</span>
    </div>
  );
};

const getSurfaceColor = (surface: string) => {
  switch (surface.toLowerCase()) {
    case 'clay':
      return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    case 'grass':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'hard':
    default:
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
  }
};

const TennisCard = ({ event }: { event: TennisEvent }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="tennis-card-container"
      style={{ perspective: '1000px' }}
    >
      <div 
        className={`tennis-card ${isFlipped ? 'flipped' : ''}`}
        onClick={() => setIsFlipped(!isFlipped)}
        style={{
          position: 'relative',
          width: '100%',
          height: '320px',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          cursor: 'pointer'
        }}
      >
        <div 
          className="tennis-card-front"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
          <Card className="h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-700 p-6 hover:border-green-500/50 transition-colors">
            <div className="flex flex-col h-full justify-between">
              <div className="flex justify-between items-start mb-4">
                <Badge className={getSurfaceColor(event.surface)}>
                  {event.surface.toUpperCase()}
                </Badge>
                <span className="text-xs text-gray-400">
                  {new Date(event.date).toLocaleDateString()}
                </span>
              </div>

              <div className="flex-1 flex flex-col justify-center gap-4">
                <div className="text-center">
                  <h3 className="text-lg font-bold text-white mb-1">
                    {event.player_one.name}
                  </h3>
                  <p className="text-sm text-gray-400">Rank #{event.player_one.ranking}</p>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    {event.player_one.handedness && (
                      <span className="text-xs text-gray-500">{event.player_one.handedness}</span>
                    )}
                    {event.player_one.nationality && (
                      <span className="text-xs text-gray-500">{event.player_one.nationality}</span>
                    )}
                  </div>
                </div>

                <div className="text-center">
                  <span className="text-2xl font-bold text-green-400">VS</span>
                </div>

                <div className="text-center">
                  <h3 className="text-lg font-bold text-white mb-1">
                    {event.player_two.name}
                  </h3>
                  <p className="text-sm text-gray-400">Rank #{event.player_two.ranking}</p>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    {event.player_two.handedness && (
                      <span className="text-xs text-gray-500">{event.player_two.handedness}</span>
                    )}
                    {event.player_two.nationality && (
                      <span className="text-xs text-gray-500">{event.player_two.nationality}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-xs text-gray-500 text-center">{event.tournament}</p>
                <p className="text-xs text-gray-600 text-center mt-1">{event.round} • {event.venue}</p>
              </div>
            </div>
          </Card>
        </div>

        <div 
          className="tennis-card-back"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <Card className="h-full bg-gradient-to-br from-green-900/50 via-gray-800 to-gray-900 border-green-500/30 p-6">
            <div className="flex flex-col h-full justify-between">
              <div className="text-center mb-4">
                <h4 className="text-sm font-semibold text-green-400 mb-2">
                  Dynamic Confidence Index
                </h4>
              </div>

              {event.dci_preview ? (
                <div className="flex-1 flex flex-col justify-center gap-6">
                  <div className="flex justify-around items-center">
                    <div className="text-center">
                      <p className="text-xs text-gray-400 mb-2">{event.player_one.name}</p>
                      <DCIBadge 
                        score={event.dci_preview.player_one_score} 
                        classification={event.dci_preview.classification}
                      />
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-gray-400 mb-2">{event.player_two.name}</p>
                      <DCIBadge 
                        score={event.dci_preview.player_two_score} 
                        classification={event.dci_preview.classification}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Zap className="w-3 h-3 text-yellow-400" />
                      <span>Serve Power</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Target className="w-3 h-3 text-blue-400" />
                      <span>Break Points</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <TrendingUp className="w-3 h-3 text-green-400" />
                      <span>Recent Form</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Trophy className="w-3 h-3 text-purple-400" />
                      <span>Surface Win %</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-sm text-gray-400 text-center">
                    DCI analysis available soon
                  </p>
                </div>
              )}

              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-4 border-green-500/30 text-green-400 hover:bg-green-500/10"
              >
                View Full Match Analysis
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export const TennisDashboard = () => {
  const [events, setEvents] = useState<TennisEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTennisEvents = async () => {
      try {
        setLoading(true);
        const response = await api.getTennisEvents();
        setEvents(response.events || []);
      } catch (err) {
        console.error('Failed to fetch tennis events:', err);
        setError('Failed to load tennis events');
      } finally {
        setLoading(false);
      }
    };

    fetchTennisEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No upcoming tennis matches available</p>
        <p className="text-sm text-gray-500 mt-2">Check back soon for new matches</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-6 h-6 text-green-500" />
            Tennis Intelligence
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            AI-powered match analysis with Dynamic Confidence Index
          </p>
        </div>
        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
          {events.length} Upcoming Matches
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <TennisCard key={event.id} event={event} />
        ))}
      </div>

      <div className="text-center text-xs text-gray-500 mt-8">
        <p>Click any match card to view DCI analysis</p>
        <p className="mt-1">Data powered by ATP & WTA databases • Updated daily</p>
      </div>
    </div>
  );
};
