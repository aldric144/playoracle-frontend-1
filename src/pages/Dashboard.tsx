import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api, Game } from '../lib/api';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { GameForecastTile } from '../components/dashboard/GameForecastTile';
import { SeasonArchiveSection } from '../components/dashboard/SeasonArchiveSection';
import { TrendGraph } from '../components/dashboard/TrendGraph';
import { Leaderboard } from '../components/dashboard/Leaderboard';
import { UserProfile } from '../components/dashboard/UserProfile';
import { EventCarousel } from '../components/dashboard/EventCarousel';
import { BoxingDashboard } from '../components/BoxingDashboard';
import { MMADashboard } from '../components/MMADashboard';
import { TennisDashboard } from '../components/TennisDashboard';
import { VolleyballDashboard } from '../components/VolleyballDashboard';
import { RugbyDashboard } from '../components/RugbyDashboard';
import { CricketDashboard } from '../components/CricketDashboard';
import { GolfDashboard } from '../components/GolfDashboard';
import { TableTennisDashboard } from '../components/TableTennisDashboard';
import { NASCARDashboard } from '../components/NASCARDashboard';
import { MotoGPDashboard } from '../components/MotoGPDashboard';
import { CyclingDashboard } from '../components/CyclingDashboard';
import { Trophy, TrendingUp, Users, BookOpen, LogOut } from 'lucide-react';

export function Dashboard() {
  const { user, logout } = useAuth();
  const [selectedSport, setSelectedSport] = useState('nfl');
  const [sports, setSports] = useState<any[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAllGames, setShowAllGames] = useState(false);

  const specialSports = [
    { id: 'boxing', name: 'Boxing', icon: '🥊' },
    { id: 'mma', name: 'MMA', icon: '🥋' },
    { id: 'tennis', name: 'Tennis', icon: '🎾' },
    { id: 'volleyball', name: 'Volleyball', icon: '🏐' },
    { id: 'rugby', name: 'Rugby', icon: '🏉' },
    { id: 'cricket', name: 'Cricket', icon: '🏏' },
    { id: 'golf', name: 'Golf', icon: '🏌️' },
    { id: 'tabletennis', name: 'Table Tennis', icon: '🏓' },
    { id: 'nascar', name: 'NASCAR', icon: '🏁' },
    { id: 'motogp', name: 'MotoGP', icon: '🏍️' },
    { id: 'cycling', name: 'Cycling', icon: '🚴' }
  ];

  useEffect(() => {
    loadSports();
  }, []);

  useEffect(() => {
    if (selectedSport && !['boxing', 'mma', 'tennis', 'volleyball', 'rugby', 'cricket', 'golf', 'tabletennis', 'nascar', 'motogp', 'cycling'].includes(selectedSport)) {
      loadGames();
    }
  }, [selectedSport, showAllGames]);

  const loadSports = async () => {
    try {
      const data = await api.getSports();
      setSports(data.sports);
    } catch (error) {
      console.error('Failed to load sports:', error);
    }
  };

  const loadGames = async () => {
    setLoading(true);
    try {
      const data = await api.getSchedule(selectedSport, showAllGames);
      setGames(data);
    } catch (error) {
      console.error('Failed to load games:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderSportContent = () => {
    if (selectedSport === 'boxing') {
      return <BoxingDashboard />;
    }
    if (selectedSport === 'mma') {
      return <MMADashboard />;
    }
    if (selectedSport === 'tennis') {
      return <TennisDashboard />;
    }
    if (selectedSport === 'volleyball') {
      return <VolleyballDashboard />;
    }
    if (selectedSport === 'rugby') {
      return <RugbyDashboard />;
    }
    if (selectedSport === 'cricket') {
      return <CricketDashboard />;
    }
    if (selectedSport === 'golf') {
      return <GolfDashboard onBack={() => setSelectedSport('nfl')} />;
    }
    if (selectedSport === 'tabletennis') {
      return <TableTennisDashboard onBack={() => setSelectedSport('nfl')} />;
    }
    if (selectedSport === 'nascar') {
      return <NASCARDashboard onBack={() => setSelectedSport('nfl')} />;
    }
    if (selectedSport === 'motogp') {
      return <MotoGPDashboard onBack={() => setSelectedSport('nfl')} />;
    }
    if (selectedSport === 'cycling') {
      return <CyclingDashboard onBack={() => setSelectedSport('nfl')} />;
    }

    return (
      <div className="space-y-4">
        {/* Season Archive Section - only show for NFL and NBA */}
        {(selectedSport === 'nfl' || selectedSport === 'nba') && (
          <SeasonArchiveSection sport={selectedSport} />
        )}
        
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-zinc-200">Upcoming Games</h3>
          <label className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer">
            <input
              type="checkbox"
              checked={showAllGames}
              onChange={(e) => setShowAllGames(e.target.checked)}
              className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-green-500 focus:ring-green-500"
            />
            Show All Upcoming Games
          </label>
        </div>
        {loading ? (
          <div className="text-center py-8 text-zinc-400">Loading games...</div>
        ) : games.length === 0 ? (
          <div className="text-center py-8 text-zinc-400">No upcoming games</div>
        ) : (
          <div className="sports-grid pb-16">
            {games.map((game) => (
              <GameForecastTile key={game.id} game={game} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-8 h-8 text-green-400" />
            <h1 className="text-2xl font-bold text-green-400">PlayOracle</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-400">
              {user?.full_name} ({user?.subscription_tier})
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6 p-4 bg-zinc-900 rounded-lg border border-zinc-800">
          <p className="text-sm text-zinc-400 text-center">
            PlayOracle is an analytical and learning tool, not a gambling platform. 
            Predictions are educational insights based on public data.
          </p>
        </div>

        <Tabs defaultValue="forecasts" className="space-y-6">
          <TabsList className="bg-zinc-900 border border-zinc-800 grid grid-cols-4">
            <TabsTrigger value="forecasts" className="data-[state=active]:bg-green-500 data-[state=active]:text-black">
              <Trophy className="w-4 h-4 mr-2" />
              Forecasts
            </TabsTrigger>
            <TabsTrigger value="trends" className="data-[state=active]:bg-green-500 data-[state=active]:text-black">
              <TrendingUp className="w-4 h-4 mr-2" />
              Trends
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="data-[state=active]:bg-green-500 data-[state=active]:text-black">
              <Users className="w-4 h-4 mr-2" />
              Leaderboard
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-green-500 data-[state=active]:text-black">
              <BookOpen className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="forecasts" className="space-y-6">
            <EventCarousel />
            
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-green-400">Sports IQ Dashboard</CardTitle>
                <CardDescription className="text-zinc-400">
                  AI-powered predictions and analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <label className="text-sm font-medium text-zinc-300 mb-2 block">
                    Select Sport
                  </label>
                  <div className="sport-selection">
                    {sports.map((sport) => (
                      <button
                        key={sport.id}
                        onClick={() => setSelectedSport(sport.id)}
                        className={`sport-button ${selectedSport === sport.id ? 'active' : ''}`}
                      >
                        {sport.icon} {sport.name}
                      </button>
                    ))}
                    {specialSports.map((sport) => (
                      <button
                        key={sport.id}
                        onClick={() => setSelectedSport(sport.id)}
                        className={`sport-button ${selectedSport === sport.id ? 'active' : ''}`}
                      >
                        {sport.icon} {sport.name}
                      </button>
                    ))}
                  </div>
                </div>

                {renderSportContent()}
              </CardContent>
            </Card>

          </TabsContent>

          <TabsContent value="trends">
            <TrendGraph sport={selectedSport} />
          </TabsContent>

          <TabsContent value="leaderboard">
            <Leaderboard />
          </TabsContent>

          <TabsContent value="profile">
            <UserProfile />
          </TabsContent>
        </Tabs>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 py-3 z-50">
        <div className="container mx-auto px-4">
          <p className="text-xs text-zinc-400 text-center">
            PlayOracle™ is an analytical and learning tool, not a gambling platform. Predictions are educational insights based on public data.
          </p>
          <div className="flex items-center justify-center gap-4 mt-2">
            <p className="text-xs text-zinc-500">
              © 2025 PlayOracle™ Technologies. All rights reserved.
            </p>
            <span className="text-zinc-700">|</span>
            <a href="/terms-of-use" className="text-xs text-green-400 hover:text-green-300">
              Terms of Use
            </a>
            <span className="text-zinc-700">|</span>
            <a href="/privacy-policy" className="text-xs text-green-400 hover:text-green-300">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
