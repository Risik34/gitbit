import HabitCard from '@/components/HabitCard';
import prisma from '@/lib/prisma';

export default async function Habit({ id }: { id: string }) {
  const habitData = await prisma.habit.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
      habitEntries: {
        select: {
          createdAt: true,
        },
      },
    },
  });
  return (
    <div className='p-4'>
      {habitData && (
        <HabitCard
          id={id}
          name={habitData.name}
          habitEntries={habitData.habitEntries}
        />
      )}
    </div>
  );
}
