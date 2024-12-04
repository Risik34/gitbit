import { HabitEntrySchema } from '@/schema';
import { eachDayOfInterval, parseISO, format, startOfDay } from 'date-fns';
import { z } from 'zod';

type HabitEntry = {
  createdAt: string;
  isCompleted: boolean;
};


export const fillDates = (data:z.infer<typeof HabitEntrySchema>[]):HabitEntry[] => { if (data.length === 0) return [];

  const result = [];

  // Normalize and sort data by `createdAt`
  const sortedData = data
    .map((item) => {
      const date =
        typeof item.createdAt === 'string'
          ? parseISO(item.createdAt)
          : item.createdAt;
      return { createdAt: startOfDay(date) }; // Normalize to start of the day
    })
    .sort((a, b) => a.createdAt - b.createdAt);

  for (let i = 0; i < sortedData.length - 1; i++) {
    const current = sortedData[i].createdAt;
    const next = sortedData[i + 1].createdAt;

    // Add the current date with `isComplete: true`
    result.push({ createdAt: format(current, 'yyyy-MM-dd'), isCompleted: true });

    // Fill in the missing dates with `isComplete: false`
    const inBetweenDates = eachDayOfInterval({ start: current, end: next })
      .slice(1, -1) // Exclude the current and next dates
      .map((date) => ({
        createdAt: format(date, 'yyyy-MM-dd'),
        isComplete: false,
      }));

    result.push(...inBetweenDates);
  }

  // Add the last date with `isComplete: true`
  const lastDate = sortedData[sortedData.length - 1];
  result.push({
    createdAt: format(lastDate.createdAt, 'yyyy-MM-dd'),
    isComplete: true,
  });

  return result;
};
