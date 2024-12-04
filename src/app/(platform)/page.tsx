import { auth } from '@/auth';
import Habit from '@/components/Habit';
import HabitCard from '@/components/HabitCard';
import prisma from '@/lib/prisma';

export default async function page() {
  const session = await auth();
  const data = await prisma.user.findUnique({
    where: {
      id: session?.user?.id,
    },
    select: {
      habits:true
    },
  });
  return (
    <>
      {data.habits?.map((habit) => (
        <Habit
          key={habit.id}
          id={habit.id}
        />
      ))}
    </>
  );
}
