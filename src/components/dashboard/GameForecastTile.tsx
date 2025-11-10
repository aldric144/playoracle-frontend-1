import { useState, useEffect } from 'react';
import { api, Game, AIPrediction } from '../../lib/api';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Loader2, TrendingUp, AlertCircle, History } from 'lucide-react';
import { CoachCorner } from './CoachCorner';

interface HistoricalMatchup {
  date: string;
  winner: string;
  dci: number;
  confidence: number;
  score?: string;
}

interface GameForecastTileProps {
  game: Game;
}

export function GameForecastTile({ game }: GameForecastTileProps) {
  const [prediction, setPrediction] = useState<AIPrediction | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPredictionDialog, setShowPredictionDialog] = useState(false);
  const [userPrediction, setUserPrediction] = useState('');
  const [userConfidence, setUserConfidence] = useState(50);
  const [submitting, setSubmitting] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [historicalData, setHistoricalData] = useState<HistoricalMatchup[]>([]);

  useEffect(() => {
    loadPrediction();
    loadHistoricalData();
  }, [game.id]);

  const loadPrediction = async () => {
    setLoading(true);
    try {
      const data = await api.getAIPrediction(game.id);
      setPrediction(data);
    } catch (error) {
      console.error('Failed to load prediction:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadHistoricalData = async () => {
    try {
      // const data = await api.getHistoricalMatchups(game.sport, game.home_team, game.away_team);
      
      const mockData: HistoricalMatchup[] = [
        {
          date: '2025-10-15',
          winner: game.home_team,
          dci: 62,
          confidence: 68,
          score: '24-21'
        },
        {
          date: '2025-01-21',
          winner: game.away_team,
          dci: 70,
          confidence: 72,
          score: '28-24'
        },
        {
          date: '2024-11-11',
          winner: game.home_team,
          dci: 65,
          confidence: 66,
          score: '31-27'
        },
        {
          date: '2024-09-15',
          winner: game.away_team,
          dci: 58,
          confidence: 61,
          score: '17-14'
        },
        {
          date: '2024-01-07',
          winner: game.home_team,
          dci: 73,
          confidence: 81,
          score: '35-21'
        }
      ];
      setHistoricalData(mockData);
    } catch (error) {
      console.error('Failed to load historical data:', error);
    }
  };

  const handleSubmitPrediction = async () => {
    if (!userPrediction) return;
    
    setSubmitting(true);
    try {
      await api.submitPrediction(game.id, game.sport, userPrediction, userConfidence);
      setShowPredictionDialog(false);
      alert('Prediction submitted successfully!');
    } catch (error) {
      console.error('Failed to submit prediction:', error);
      alert('Failed to submit prediction');
    } finally {
      setSubmitting(false);
    }
  };

  const getDCIColor = (dci: number) => {
    if (dci >= 80) return 'bg-green-500';
    if (dci >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getDCILabel = (dci: number) => {
    if (dci >= 80) return 'Strong';
    if (dci >= 60) return 'Moderate';
    return 'Weak';
  };

  return (
    <div className="relative" style={{ perspective: '1000px' }}>
      <div 
        className="relative transition-transform duration-600 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          minHeight: '400px'
        }}
      >
        {/* Front Face - Live Match */}
        <div 
          className="absolute w-full"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
          <Card className="bg-zinc-900 border-zinc-800 hover:border-green-500 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="border-zinc-700 text-zinc-300">
                  {game.league}
                </Badge>
                <span className="text-xs text-zinc-500">
                  {new Date(game.scheduled_time).toLocaleDateString()} {new Date(game.scheduled_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-200">{game.home_team}</span>
            <span className="text-xs text-zinc-500">HOME</span>
          </div>
          <div className="text-center text-zinc-500 text-xs">vs</div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-200">{game.away_team}</span>
            <span className="text-xs text-zinc-500">AWAY</span>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="w-6 h-6 animate-spin text-green-400" />
          </div>
        ) : prediction ? (
          <div className="space-y-3">
            <div className="p-3 bg-zinc-800 rounded-lg border border-zinc-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-zinc-400">AI Prediction</span>
                <Badge className={`${getDCIColor(prediction.dci_score)} text-black text-xs`}>
                  DCI: {prediction.dci_score.toFixed(0)} - {getDCILabel(prediction.dci_score)}
                </Badge>
              </div>
              {prediction.dci_score >= 75 && (
                <div className="mb-2 flex items-center gap-1 text-xs text-green-400">
                  <span>✅</span>
                  <span className="font-medium">Verified by PlayOracle™ AI</span>
                </div>
              )}
              <div className="text-sm font-semibold text-green-400">
                {prediction.predicted_winner}
              </div>
              <div className="text-xs text-zinc-400 mt-1">
                Confidence: {prediction.confidence.toFixed(1)}%
              </div>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  View Analysis
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-green-400">Coach's Corner Analysis</DialogTitle>
                  <DialogDescription className="text-zinc-400">
                    {game.home_team} vs {game.away_team}
                  </DialogDescription>
                </DialogHeader>
                <CoachCorner gameId={game.id} />
              </DialogContent>
            </Dialog>

            <Dialog open={showPredictionDialog} onOpenChange={setShowPredictionDialog}>
              <DialogTrigger asChild>
                <Button className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Make Your Prediction
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
                <DialogHeader>
                  <DialogTitle className="text-green-400">Submit Your Prediction</DialogTitle>
                  <DialogDescription className="text-zinc-400">
                    {game.home_team} vs {game.away_team}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Who will win?</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant={userPrediction === game.home_team ? 'default' : 'outline'}
                        onClick={() => setUserPrediction(game.home_team)}
                        className={
                          userPrediction === game.home_team
                            ? 'bg-green-500 text-black hover:bg-green-600'
                            : 'border-zinc-700 text-zinc-300 hover:bg-zinc-800'
                        }
                      >
                        {game.home_team}
                      </Button>
                      <Button
                        variant={userPrediction === game.away_team ? 'default' : 'outline'}
                        onClick={() => setUserPrediction(game.away_team)}
                        className={
                          userPrediction === game.away_team
                            ? 'bg-green-500 text-black hover:bg-green-600'
                            : 'border-zinc-700 text-zinc-300 hover:bg-zinc-800'
                        }
                      >
                        {game.away_team}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">
                      Confidence: {userConfidence}%
                    </label>
                    <Input
                      type="range"
                      min="0"
                      max="100"
                      value={userConfidence}
                      onChange={(e) => setUserConfidence(Number(e.target.value))}
                      className="bg-zinc-800 border-zinc-700"
                    />
                  </div>
                  <Button
                    onClick={handleSubmitPrediction}
                    disabled={!userPrediction || submitting}
                    className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold"
                  >
                    {submitting ? 'Submitting...' : 'Submit Prediction'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              onClick={() => setIsFlipped(true)}
              variant="outline"
              size="sm"
              className="w-full border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10"
            >
              <History className="w-4 h-4 mr-2" />
              View History
            </Button>
          </div>
        ) : (
          <div className="text-center py-4 text-zinc-500 text-sm">
            No prediction available
          </div>
        )}
            </CardContent>
          </Card>
        </div>

        {/* Back Face - Historical Matchups */}
        <div 
          className="absolute w-full"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <Card className="bg-zinc-900 border-emerald-500/20">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="border-emerald-500/50 text-emerald-400">
                  Historical Matchups
                </Badge>
                <span className="text-xs text-zinc-400">
                  {game.home_team} vs {game.away_team}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                {historicalData.length > 0 ? (
                  historicalData.map((match, index) => (
                    <div 
                      key={index}
                      className="p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-zinc-400">
                          {new Date(match.date).toLocaleDateString()}
                        </span>
                        <Badge className={`${getDCIColor(match.dci)} text-black text-xs`}>
                          DCI: {match.dci}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-emerald-400">
                            {match.winner} def. {match.winner === game.home_team ? game.away_team : game.home_team}
                          </div>
                          <div className="text-xs text-zinc-400 mt-1">
                            Confidence: {match.confidence}%
                            {match.score && ` • Score: ${match.score}`}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-zinc-500 text-sm">
                    No historical data available
                  </div>
                )}
              </div>

              <Button
                onClick={() => setIsFlipped(false)}
                variant="outline"
                size="sm"
                className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              >
                Back to Live
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
