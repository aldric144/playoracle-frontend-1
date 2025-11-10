import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, TrendingUp } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

interface YearAccuracy {
  year: number;
  accuracy: number;
}

interface AIValidationPanelProps {
  totalSeasons: number;
  correctCount: number;
  accuracyPercent: number;
  trend: YearAccuracy[];
}

export function AIValidationPanel({
  totalSeasons,
  correctCount,
  accuracyPercent,
  trend
}: AIValidationPanelProps) {
  const [displayAccuracy, setDisplayAccuracy] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = accuracyPercent / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, accuracyPercent);
      setDisplayAccuracy(Math.round(current));

      if (step >= steps || current >= accuracyPercent) {
        clearInterval(timer);
        setDisplayAccuracy(accuracyPercent);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [accuracyPercent]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-zinc-900 rounded-xl p-4 border border-emerald-500/20"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <h4 className="text-sm font-medium text-zinc-300">
              AI Historical Accuracy
            </h4>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <motion.span
              key={displayAccuracy}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-3xl font-bold text-emerald-400"
            >
              {displayAccuracy}%
            </motion.span>
            <span className="text-sm text-zinc-400">
              ({correctCount} of {totalSeasons} seasons)
            </span>
          </div>
          <p className="text-xs text-zinc-500">
            Correctly predicted champion across historical seasons
          </p>
        </div>

        {/* Sparkline Chart */}
        <div className="w-32 h-16">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trend}>
              <YAxis domain={[0, 100]} hide />
              <Line
                type="monotone"
                dataKey="accuracy"
                stroke="#10b981"
                strokeWidth={2}
                dot={false}
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3 text-emerald-400" />
            <span className="text-xs text-zinc-400">Accuracy Trend</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
