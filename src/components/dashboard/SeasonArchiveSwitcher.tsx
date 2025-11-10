import { useState } from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface SeasonArchiveSwitcherProps {
  currentYear: number;
  availableYears: number[];
  onYearChange: (year: number) => void;
  isMobile?: boolean;
}

export function SeasonArchiveSwitcher({
  currentYear,
  availableYears,
  onYearChange,
  isMobile = false
}: SeasonArchiveSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <Calendar className="w-4 h-4 text-emerald-400" />
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size={isMobile ? 'sm' : 'default'}
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-emerald-400 transition-colors"
          >
            {isMobile ? `Season ${currentYear}` : `Season Archive: ${currentYear}`}
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="bg-zinc-900 border-zinc-800 min-w-[180px]"
        >
          {availableYears.map((year) => (
            <DropdownMenuItem
              key={year}
              onClick={() => {
                onYearChange(year);
                setIsOpen(false);
              }}
              className={`cursor-pointer ${
                year === currentYear
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'text-zinc-300 hover:bg-zinc-800 hover:text-emerald-400'
              }`}
            >
              <span className="flex items-center justify-between w-full">
                <span>{year}</span>
                {year === currentYear && (
                  <span className="text-xs text-emerald-400">✓</span>
                )}
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
