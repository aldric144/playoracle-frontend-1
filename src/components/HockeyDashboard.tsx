import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, TrendingUp, Shield, Zap } from 'lucide-react';

interface HockeyEvent {
  id: string;
  league: string;
  date: string;
  venue: string;
  home_team: {
    name: string;
    abbreviation: string;
    city: string;
  };
  away_team: {
    name: string;
    abbreviation: string;
    city: string;
  };
  dci_preview?: {
    home_team_score: number;
    away_team_score: number;
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

const HockeyCard = ({ event }: { event: HockeyEvent }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="hockey-card-container"
      style={{ perspective: '1000px' }}
    >
      <div 
        className={`hockey-card ${isFlipped ? 'flipped' : ''}`}
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
          className="hockey-card-front"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
          <Card className="h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-700 p-6 hover:border-blue-500/50 transition-colors">
            <div className="flex flex-col h-full justify-between">
              <div className="flex justify-between items-start mb-4">
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  {event.league}
                </Badge>
                <span className="text-xs text-gray-400">
                  {new Date(event.date).toLocaleDateString()}
                </span>
              </div>

              <div className="flex-1 flex flex-col justify-center gap-4">
                <div className="text-center">
                  <h3 className="text-lg font-bold text-white mb-1">
                    {event.home_team.name}
                  </h3>
                  <p className="text-sm text-gray-400">{event.home_team.abbreviation}</p>
                  <p className="text-xs text-gray-500 mt-1">HOME</p>
                </div>

                <div className="text-center">
                  <span className="text-2xl font-bold text-blue-400">VS</span>
                </div>

                <div className="text-center">
                  <h3 className="text-lg font-bold text-white mb-1">
                    {event.away_team.name}
                  </h3>
                  <p className="text-sm text-gray-400">{event.away_team.abbreviation}</p>
                  <p className="text-xs text-gray-500 mt-1">AWAY</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-xs text-gray-600 text-center">{event.venue}</p>
              </div>
            </div>
          </Card>
        </div>

        <div 
          className="hockey-card-back"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <Card className="h-full bg-gradient-to-br from-blue-900/50 via-gray-800 to-gray-900 border-blue-500/30 p-6">
            <div className="flex flex-col h-full justify-between">
              <div className="text-center mb-4">
                <h4 className="text-sm font-semibold text-blue-400 mb-2">
                  Dynamic Confidence Index
                </h4>
              </div>

              {event.dci_preview ? (
                <div className="flex-1 flex flex-col justify-center gap-6">
                  <div className="flex justify-around items-center">
                    <div className="text-center">
                      <p className="text-xs text-gray-400 mb-2">{event.home_team.abbreviation}</p>
                      <DCIBadge 
                        score={event.dci_preview.home_team_score} 
                        classification={event.dci_preview.classification}
                      />
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-gray-400 mb-2">{event.away_team.abbreviation}</p>
                      <DCIBadge 
                        score={event.dci_preview.away_team_score} 
                        classification={event.dci_preview.classification}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Zap className="w-3 h-3 text-yellow-400" />
                      <span>Shots on Goal</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Shield className="w-3 h-3 text-green-400" />
                      <span>Save %</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <TrendingUp className="w-3 h-3 text-blue-400" />
                      <span>Powerplay</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Trophy className="w-3 h-3 text-purple-400" />
                      <span>Recent Form</span>
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
                className="w-full mt-4 border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
              >
                View Full Game Analysis
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export const HockeyDashboard = () => {
  const [events, setEvents] = useState<HockeyEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHockeyEvents = async () => {
      try {
        setLoading(true);
        const response = await api.getHockeyEvents();
        setEvents(response.events || []);
      } catch (err) {
        console.error('Failed to fetch hockey events:', err);
        setError('Failed to load hockey events');
      } finally {
        setLoading(false);
      }
    };

    fetchHockeyEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
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
        <p className="text-gray-400">No upcoming hockey games available</p>
        <p className="text-sm text-gray-500 mt-2">Check back soon for new games</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-6 h-6 text-blue-500" />
            Hockey Intelligence
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            AI-powered game analysis with Dynamic Confidence Index
          </p>
        </div>
        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
          {events.length} Upcoming Games
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <HockeyCard key={event.id} event={event} />
        ))}
      </div>

      <div className="text-center text-xs text-gray-500 mt-8">
        <p>Click any game card to view DCI analysis</p>
        <p className="mt-1">Data powered by NHL databases • Updated daily</p>
      </div>
    </div>
  );
};
