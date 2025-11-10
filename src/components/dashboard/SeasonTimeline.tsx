import { motion } from 'framer-motion';
import { Calendar, Trophy, Target } from 'lucide-react';
import { Badge } from '../ui/badge';

interface Milestone {
  date: string;
  label: string;
  type: 'season_start' | 'playoffs' | 'finals' | 'championship' | 'highlight';
  note?: string;
}

interface SeasonTimelineProps {
  sport: string;
  year: number;
  start: string;
  end: string;
  champion: string;
  aiPrediction: string;
  milestones: Milestone[];
  isActive: boolean;
  progress: number;
}

export function SeasonTimeline({
  sport,
  start,
  end,
  champion,
  aiPrediction,
  milestones,
  isActive,
  progress
}: SeasonTimelineProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getSeasonLabel = () => {
    const startYear = new Date(start).getFullYear();
    const endYear = new Date(end).getFullYear();
    
    if (startYear !== endYear) {
      return `${startYear}–${endYear}`;
    }
    return `${startYear}`;
  };

  const getMilestoneIcon = (type: string) => {
    switch (type) {
      case 'championship':
        return <Trophy className="w-3 h-3" />;
      case 'playoffs':
      case 'finals':
        return <Target className="w-3 h-3" />;
      default:
        return <Calendar className="w-3 h-3" />;
    }
  };

  const getMilestoneColor = (type: string) => {
    switch (type) {
      case 'championship':
        return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400';
      case 'playoffs':
      case 'finals':
        return 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400';
      default:
        return 'bg-zinc-700/50 border-zinc-600 text-zinc-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`bg-zinc-900 rounded-2xl p-6 border ${
        isActive ? 'border-emerald-500/20' : 'border-yellow-500/20'
      }`}
      style={{
        boxShadow: isActive 
          ? '0 0 20px rgba(16, 185, 129, 0.1)' 
          : '0 0 20px rgba(255, 215, 0, 0.1)'
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-emerald-400" />
          <div>
            <h3 className="text-lg font-semibold text-zinc-200">
              {sport.toUpperCase()} Season {getSeasonLabel()}
            </h3>
            <p className="text-sm text-zinc-400">
              {isActive ? 'Active Season' : `Completed – Champion: ${champion}`}
            </p>
          </div>
        </div>
        <Badge 
          variant="outline" 
          className={
            isActive 
              ? 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10'
              : 'border-yellow-500/50 text-yellow-400 bg-yellow-500/10'
          }
        >
          {isActive ? 'Live' : 'Archived'}
        </Badge>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
          <span>{formatDate(start)}</span>
          <span>{Math.round(progress)}% Complete</span>
          <span>{formatDate(end)}</span>
        </div>
        <div className="relative h-2 bg-zinc-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={`absolute inset-y-0 left-0 rounded-full ${
              isActive 
                ? 'bg-gradient-to-r from-emerald-500 to-emerald-400'
                : 'bg-gradient-to-r from-yellow-500 to-yellow-400'
            }`}
          />
        </div>
      </div>

      {/* Milestones */}
      <div className="space-y-2 mb-6">
        <h4 className="text-sm font-medium text-zinc-300 mb-3">
          {isActive ? 'Upcoming Events' : 'Season Highlights'}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {milestones.slice(0, 4).map((milestone, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 p-2 rounded-lg border ${getMilestoneColor(milestone.type)}`}
            >
              {getMilestoneIcon(milestone.type)}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">{milestone.label}</p>
                <p className="text-xs opacity-70">{formatDate(milestone.date)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Prediction vs Actual */}
      {!isActive && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700"
        >
          <h4 className="text-sm font-medium text-zinc-300 mb-3">
            AI Prediction vs Actual Result
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-zinc-400 mb-1">AI Predicted</p>
              <p className="text-sm font-semibold text-emerald-400">{aiPrediction}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-400 mb-1">Actual Champion</p>
              <p className="text-sm font-semibold text-yellow-400">{champion}</p>
            </div>
          </div>
          {aiPrediction === champion && (
            <div className="mt-3 flex items-center gap-2 text-xs text-emerald-400">
              <Trophy className="w-3 h-3" />
              <span>AI prediction was correct!</span>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
