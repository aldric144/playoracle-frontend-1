import { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import { Loader2 } from 'lucide-react';

interface CoachCornerProps {
  gameId: string;
}

export function CoachCorner({ gameId }: CoachCornerProps) {
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalysis();
  }, [gameId]);

  const loadAnalysis = async () => {
    setLoading(true);
    try {
      const data = await api.getCoachCorner(gameId);
      setAnalysis(data);
    } catch (error) {
      console.error('Failed to load analysis:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-8 h-8 animate-spin text-green-400" />
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="text-center py-8 text-zinc-400">
        No analysis available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="p-4 bg-zinc-800 rounded-lg border border-zinc-700">
        <h3 className="text-sm font-semibold text-green-400 mb-2">AI Analysis</h3>
        <p className="text-sm text-zinc-300 leading-relaxed">
          {analysis.coach_analysis}
        </p>
      </div>

      {analysis.key_factors && (
        <div className="p-4 bg-zinc-800 rounded-lg border border-zinc-700">
          <h3 className="text-sm font-semibold text-green-400 mb-2">Key Factors</h3>
          <ul className="space-y-2">
            {analysis.key_factors.map((factor: string, index: number) => (
              <li key={index} className="text-sm text-zinc-300 flex items-start">
                <span className="text-green-400 mr-2">•</span>
                {factor}
              </li>
            ))}
          </ul>
        </div>
      )}

      {analysis.prediction && (
        <div className="p-4 bg-zinc-800 rounded-lg border border-zinc-700">
          <h3 className="text-sm font-semibold text-green-400 mb-2">Prediction Summary</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xs text-zinc-400 mb-1">Winner</div>
              <div className="text-sm font-semibold text-zinc-200">
                {analysis.prediction.winner}
              </div>
            </div>
            <div>
              <div className="text-xs text-zinc-400 mb-1">Confidence</div>
              <div className="text-sm font-semibold text-zinc-200">
                {analysis.prediction.confidence.toFixed(1)}%
              </div>
            </div>
            <div>
              <div className="text-xs text-zinc-400 mb-1">DCI Score</div>
              <div className="text-sm font-semibold text-zinc-200">
                {analysis.prediction.dci_score.toFixed(0)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DCI Score Guide */}
      <div className="p-4 bg-[#101626] rounded-lg border border-emerald-500/20">
        <div className="border-t border-zinc-700 -mx-4 -mt-4 mb-4"></div>
        <h3 className="text-sm font-semibold text-emerald-400 mb-3">DCI Score Guide</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-zinc-300">85-100</span>
            </div>
            <span className="text-zinc-400">Dominant Edge</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-zinc-300">70-84</span>
            </div>
            <span className="text-zinc-400">Technical Advantage</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-zinc-300">55-69</span>
            </div>
            <span className="text-zinc-400">Balanced Matchup</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-zinc-300">&lt;55</span>
            </div>
            <span className="text-zinc-400">Potential Upset</span>
          </div>
        </div>
      </div>
    </div>
  );
}
