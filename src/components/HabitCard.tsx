'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AiOutlineCheck, AiFillCheckCircle } from 'react-icons/ai';

type HabitEntry = {
  createdAt: Date;
};

export interface HabitCardProps {
  id: string;
  name: string;
  habitEntries: HabitEntry[];
}

import HabitStreak from '@/components/HabitSreak';
import { useEffect, useState } from 'react';
import { addHabitEntry } from '@/actions/habit';

const HabitCard: React.FC<HabitCardProps> = ({ id, name, habitEntries }) => {
  const [completed, setIsCompleted] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];

    const todayData = habitEntries.find((item) => {
      const itemDate = item.createdAt.toISOString().split('T')[0];
      return itemDate === today;
    });

    console.log(todayData);

    if (todayData) {
      setIsCompleted(true);
    }
  }, [habitEntries]);

  const handleClick = async () => {
    if (!completed) {
       addHabitEntry(id);
    }

    setIsCompleted((prev) => !prev);
  };

  return (
    <Card className="w-full bg-gradient-to-br from-gray-900 to-black max-w-sm  shadow-lg border border-gray-500">
      <CardHeader className="py-3 flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl">{name}</CardTitle>
        <button
          onClick={handleClick}
          className={`size-8 p-1 relative flex items-center justify-center  rounded-full transition-all transform-gpu hover:scale-110 active:scale-95
        ${
          completed
            ? 'bg-green-500 text-white'
            : 'bg-gradient-to-br from-gray-500 to-gray-900 text-white'
        }`}
        >
          {/* <span */}
          {/*   className={`absolute inset-0 rounded-full blur-sm transition-all ${ */}
          {/*     completed */}
          {/*       ? "bg-green-300 opacity-30" */}
          {/*       : "bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 opacity-50" */}
          {/*   }`} */}
          {/* /> */}
          {completed ? (
            <AiFillCheckCircle size={28} className="z-10" />
          ) : (
            <AiOutlineCheck size={28} className="z-10 animate-pulse" />
          )}
        </button>
      </CardHeader>
      <CardContent>
        <HabitStreak habitEntries={habitEntries} />
      </CardContent>
    </Card>
  );
};

export default HabitCard;
