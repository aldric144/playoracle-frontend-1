import { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Trophy, TrendingUp, Award, BookOpen, Loader2, Download } from 'lucide-react';

export function UserProfile() {
  const [progress, setProgress] = useState<any>(null);
  const [accuracy, setAccuracy] = useState<any>(null);
  const [badges, setBadges] = useState<any>(null);
  const [insights, setInsights] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [progressData, accuracyData, badgesData, insightsData] = await Promise.all([
        api.getProgress(),
        api.getUserAccuracy(),
        api.getBadges(),
        api.getUserInsights()
      ]);
      setProgress(progressData);
      setAccuracy(accuracyData);
      setBadges(badgesData);
      setInsights(insightsData);
    } catch (error) {
      console.error('Failed to load profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = async () => {
    try {
      const report = await api.getReport();
      const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'playoracle-report.json';
      a.click();
    } catch (error) {
      console.error('Failed to download report:', error);
    }
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
    <div className="space-y-6">
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-green-400">Your Sports IQ Profile</CardTitle>
          <CardDescription className="text-zinc-400">
            Track your progress and improve your analytical skills
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 bg-zinc-800 rounded-lg border border-zinc-700">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-green-400" />
                <span className="text-sm text-zinc-400">Total Predictions</span>
              </div>
              <div className="text-2xl font-bold text-zinc-200">
                {progress?.total_predictions || 0}
              </div>
            </div>
            <div className="p-4 bg-zinc-800 rounded-lg border border-zinc-700">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span className="text-sm text-zinc-400">Accuracy</span>
              </div>
              <div className="text-2xl font-bold text-green-400">
                {accuracy?.accuracy_percentage?.toFixed(1) || 0}%
              </div>
            </div>
            <div className="p-4 bg-zinc-800 rounded-lg border border-zinc-700">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-green-400" />
                <span className="text-sm text-zinc-400">Badges Earned</span>
              </div>
              <div className="text-2xl font-bold text-zinc-200">
                {progress?.badges_earned || 0}
              </div>
            </div>
            <div className="p-4 bg-zinc-800 rounded-lg border border-zinc-700">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-green-400" />
                <span className="text-sm text-zinc-400">Level</span>
              </div>
              <div className="text-2xl font-bold text-zinc-200">
                {progress?.level || 'Beginner'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-green-400">Your Badges</CardTitle>
          <CardDescription className="text-zinc-400">
            Achievements unlocked through your predictions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {badges?.badges?.length > 0 ? (
              badges.badges.map((badge: string) => (
                <Badge key={badge} className="bg-yellow-500 text-black text-sm px-3 py-1">
                  {badge.toUpperCase()}
                </Badge>
              ))
            ) : (
              <p className="text-zinc-400 text-sm">No badges earned yet. Keep making predictions!</p>
            )}
          </div>
          {badges?.next_badge && (
            <div className="mt-4 p-3 bg-zinc-800 rounded-lg border border-zinc-700">
              <p className="text-sm text-zinc-400">
                Next badge: <span className="text-green-400 font-semibold">{badges.next_badge.toUpperCase()}</span>
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-green-400">Accuracy by Sport</CardTitle>
          <CardDescription className="text-zinc-400">
            Your performance across different sports
          </CardDescription>
        </CardHeader>
        <CardContent>
          {accuracy?.by_sport && Object.keys(accuracy.by_sport).length > 0 ? (
            <div className="space-y-3">
              {Object.entries(accuracy.by_sport).map(([sport, data]: [string, any]) => (
                <div key={sport} className="p-3 bg-zinc-800 rounded-lg border border-zinc-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-zinc-200 uppercase">{sport}</span>
                    <span className="text-sm font-bold text-green-400">
                      {data.accuracy.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>{data.correct}/{data.total} correct</span>
                    <div className="w-32 bg-zinc-700 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${data.accuracy}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-8 text-zinc-400">
              No sport-specific data yet. Start making predictions!
            </p>
          )}
        </CardContent>
      </Card>

      {insights && (
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-green-400">Personalized Insights</CardTitle>
            <CardDescription className="text-zinc-400">
              AI-powered analysis of your prediction patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {insights.bias_detected && (
                <div className="p-3 bg-yellow-900/20 border border-yellow-700 rounded-lg">
                  <p className="text-sm text-yellow-400">{insights.bias_detected}</p>
                </div>
              )}
              {insights.recommendation && (
                <div className="p-3 bg-green-900/20 border border-green-700 rounded-lg">
                  <p className="text-sm text-green-400">{insights.recommendation}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-green-400">Export Your Data</CardTitle>
          <CardDescription className="text-zinc-400">
            Download your complete prediction history and analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleDownloadReport}
            className="bg-green-500 hover:bg-green-600 text-black font-semibold"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
