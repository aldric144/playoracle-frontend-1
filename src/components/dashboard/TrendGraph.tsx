import { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Loader2 } from 'lucide-react';

interface TrendGraphProps {
  sport: string;
}

export function TrendGraph({ sport }: TrendGraphProps) {
  const [trends, setTrends] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrends();
  }, [sport]);

  const loadTrends = async () => {
    setLoading(true);
    try {
      const data = await api.getTrends(sport);
      setTrends(data);
    } catch (error) {
      console.error('Failed to load trends:', error);
    } finally {
      setLoading(false);
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

  if (!trends) {
    return (
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="text-center py-12 text-zinc-400">
          No trend data available
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-green-400">Prediction Accuracy Trends</CardTitle>
          <CardDescription className="text-zinc-400">
            7-day rolling accuracy for {sport.toUpperCase()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trends.trends.prediction_accuracy}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
              <XAxis dataKey="date" stroke="#a1a1aa" />
              <YAxis stroke="#a1a1aa" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#18181b',
                  border: '1px solid #3f3f46',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="accuracy"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ fill: '#22c55e' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-green-400">User Engagement</CardTitle>
          <CardDescription className="text-zinc-400">
            Number of predictions made per day
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trends.trends.user_engagement}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
              <XAxis dataKey="date" stroke="#a1a1aa" />
              <YAxis stroke="#a1a1aa" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#18181b',
                  border: '1px solid #3f3f46',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="predictions"
                stroke="#eab308"
                strokeWidth={2}
                dot={{ fill: '#eab308' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
