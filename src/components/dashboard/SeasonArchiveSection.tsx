import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SeasonTimeline } from './SeasonTimeline';
import { SeasonArchiveSwitcher } from './SeasonArchiveSwitcher';
import { AIValidationPanel } from './AIValidationPanel';
import { api } from '../../lib/api';
import { Loader2 } from 'lucide-react';

interface Milestone {
  date: string;
  label: string;
  type: 'season_start' | 'playoffs' | 'finals' | 'championship' | 'highlight';
  note?: string;
}

interface TopDCITeam {
  team: string;
  avg_dci: number;
}

interface SeasonHistory {
  sport: string;
  year: number;
  start: string;
  end: string;
  champion: string;
  ai_champion_prediction: string;
  top_dci: TopDCITeam[];
  prediction_accuracy: number;
  milestones: Milestone[];
}

interface YearAccuracy {
  year: number;
  accuracy: number;
}

interface AccuracyTrend {
  sport: string;
  from_year: number;
  to_year: number;
  total_seasons: number;
  correct_count: number;
  accuracy_percent: number;
  trend: YearAccuracy[];
}

interface SeasonArchiveSectionProps {
  sport: string;
}

const seasonCache = new Map<string, SeasonHistory>();
const accuracyCache = new Map<string, AccuracyTrend>();

export function SeasonArchiveSection({ sport }: SeasonArchiveSectionProps) {
  const currentYear = 2026;
  const availableYears = [2026, 2025, 2024, 2023, 2022];
  
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [seasonData, setSeasonData] = useState<SeasonHistory | null>(null);
  const [accuracyData, setAccuracyData] = useState<AccuracyTrend | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    loadSeasonData();
    loadAccuracyData();
  }, [sport, selectedYear]);

  const loadSeasonData = async () => {
    setLoading(true);
    const cacheKey = `${sport}-${selectedYear}`;
    
    if (seasonCache.has(cacheKey)) {
      setSeasonData(seasonCache.get(cacheKey)!);
      setLoading(false);
      return;
    }

    try {
      const data = await api.getSeasonHistory(sport, selectedYear);
      seasonCache.set(cacheKey, data);
      setSeasonData(data);
    } catch (error) {
      console.error('Failed to load season data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAccuracyData = async () => {
    const cacheKey = `${sport}-accuracy`;
    
    if (accuracyCache.has(cacheKey)) {
      setAccuracyData(accuracyCache.get(cacheKey)!);
      return;
    }

    try {
      const data = await api.getAccuracyTrend(sport, 2022, 2026);
      accuracyCache.set(cacheKey, data);
      setAccuracyData(data);
    } catch (error) {
      console.error('Failed to load accuracy data:', error);
    }
  };

  const calculateProgress = () => {
    if (!seasonData) return 0;
    
    const now = new Date();
    const start = new Date(seasonData.start);
    const end = new Date(seasonData.end);
    
    if (now < start) return 0;
    if (now > end) return 100;
    
    const total = end.getTime() - start.getTime();
    const elapsed = now.getTime() - start.getTime();
    return Math.min(Math.max((elapsed / total) * 100, 0), 100);
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  if (loading && !seasonData) {
    return (
      <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 mb-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
          <span className="ml-2 text-zinc-400">Loading season data...</span>
        </div>
      </div>
    );
  }

  if (!seasonData) {
    return null;
  }

  const isActive = selectedYear === currentYear;
  const progress = isActive ? calculateProgress() : 100;

  return (
    <div className="mb-6 space-y-4">
      {/* Season Archive Switcher */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-zinc-200">Season Timeline</h2>
        <SeasonArchiveSwitcher
          currentYear={selectedYear}
          availableYears={availableYears}
          onYearChange={handleYearChange}
          isMobile={isMobile}
        />
      </div>

      {/* Season Timeline with Flip Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedYear}
          initial={{ opacity: 0, rotateY: 6 }}
          animate={{ opacity: 1, rotateY: 0 }}
          exit={{ opacity: 0, rotateY: -6 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <SeasonTimeline
            sport={seasonData.sport}
            year={seasonData.year}
            start={seasonData.start}
            end={seasonData.end}
            champion={seasonData.champion}
            aiPrediction={seasonData.ai_champion_prediction}
            milestones={seasonData.milestones}
            isActive={isActive}
            progress={progress}
          />
        </motion.div>
      </AnimatePresence>

      {/* Top DCI Teams */}
      {seasonData.top_dci && seasonData.top_dci.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap gap-2"
        >
          <span className="text-sm text-zinc-400">Top DCI:</span>
          {seasonData.top_dci.slice(0, 3).map((team, index) => (
            <div
              key={index}
              className="px-3 py-1 bg-zinc-800 rounded-full border border-zinc-700 text-sm"
            >
              <span className="text-zinc-300">{team.team}</span>
              <span className="ml-2 text-emerald-400 font-semibold">
                {team.avg_dci.toFixed(1)}
              </span>
            </div>
          ))}
        </motion.div>
      )}

      {/* AI Validation Panel */}
      {accuracyData && (
        <AIValidationPanel
          totalSeasons={accuracyData.total_seasons}
          correctCount={accuracyData.correct_count}
          accuracyPercent={accuracyData.accuracy_percent}
          trend={accuracyData.trend}
        />
      )}
    </div>
  );
}
