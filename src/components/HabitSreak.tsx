'use client';
import { useRef, useEffect, FC } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { fillDates } from '@/lib/dates';

type HabitEntry = {
  createdAt: Date;
};

interface HabitEntryProps {
  habitEntries: HabitEntry[];
}

const HabitStreak: FC<HabitEntryProps> = ({ habitEntries }) => {
  const streakData = fillDates(habitEntries);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scrollToEnd = () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft =
          scrollContainerRef.current.scrollWidth;
      }
    };

    // Scroll to the end on mount
    scrollToEnd();
  }, []);

  return (
    <div className="p-1 bg-gray-900 rounded-lg shadow-md ">
      <div
        className="h-20 flex flex-col overflow-scroll flex-wrap gap-1"
        ref={scrollContainerRef}
      >
        {streakData &&
          streakData?.map((item) => (
            <TooltipProvider key={item.createdAt}>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className={`w-3 h-3 rounded-sm ${item.isCompleted ? 'bg-green-600 ' : 'bg-gray-800'}`}
                  />
                </TooltipTrigger>
                <TooltipContent>{item.isCompleted}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
      </div>
    </div>
  );
};

export default HabitStreak;
