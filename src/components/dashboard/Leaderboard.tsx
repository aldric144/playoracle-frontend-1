import { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Trophy, Medal, Award, Loader2 } from 'lucide-react';

export function Leaderboard() {
  const [globalLeaderboard, setGlobalLeaderboard] = useState<any>(null);
  const [challenges, setChallenges] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [leaderboardData, challengesData] = await Promise.all([
        api.getGlobalLeaderboard(),
        api.getChallenges()
      ]);
      setGlobalLeaderboard(leaderboardData);
      setChallenges(challengesData);
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Award className="w-5 h-5 text-amber-600" />;
    return <span className="text-zinc-400 font-semibold">{rank}</span>;
  };

  if (loading) {
    return (
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-green-400" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Tabs defaultValue="global" className="space-y-6">
      <TabsList className="bg-zinc-900 border border-zinc-800">
        <TabsTrigger value="global" className="data-[state=active]:bg-green-500 data-[state=active]:text-black">
          Global Rankings
        </TabsTrigger>
        <TabsTrigger value="challenges" className="data-[state=active]:bg-green-500 data-[state=active]:text-black">
          Weekly Challenges
        </TabsTrigger>
      </TabsList>

      <TabsContent value="global">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-green-400">Global Leaderboard</CardTitle>
            <CardDescription className="text-zinc-400">
              Top analysts ranked by prediction accuracy
            </CardDescription>
          </CardHeader>
          <CardContent>
            {globalLeaderboard?.leaderboard?.length > 0 ? (
              <div className="space-y-2">
                {globalLeaderboard.leaderboard.map((entry: any) => (
                  <div
                    key={entry.user_id}
                    className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg border border-zinc-700 hover:border-green-500 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 flex items-center justify-center">
                        {getRankIcon(entry.rank)}
                      </div>
                      <div>
                        <div className="font-semibold text-zinc-200">{entry.full_name}</div>
                        <div className="text-xs text-zinc-400">
                          {entry.total_predictions} predictions • {entry.badges} badges
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-400">
                        {entry.accuracy.toFixed(1)}%
                      </div>
                      <div className="text-xs text-zinc-400">
                        {entry.correct_predictions}/{entry.total_predictions}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-zinc-400">
                No leaderboard data available
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="challenges">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-green-400">Weekly Challenges</CardTitle>
            <CardDescription className="text-zinc-400">
              Complete challenges to earn badges and improve your skills
            </CardDescription>
          </CardHeader>
          <CardContent>
            {challenges?.challenges?.length > 0 ? (
              <div className="space-y-4">
                {challenges.challenges.map((challenge: any) => (
                  <div
                    key={challenge.id}
                    className="p-4 bg-zinc-800 rounded-lg border border-zinc-700"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-zinc-200">{challenge.title}</h3>
                        <p className="text-sm text-zinc-400 mt-1">{challenge.description}</p>
                      </div>
                      <Badge className="bg-yellow-500 text-black">
                        {challenge.reward}
                      </Badge>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                        <span>Progress</span>
                        <span>{challenge.progress}/{challenge.target}</span>
                      </div>
                      <div className="w-full bg-zinc-700 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all"
                          style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-zinc-400">
                No challenges available
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
