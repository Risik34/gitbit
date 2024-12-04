'use server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { HabitSchema } from '@/schema';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const addHabit = async (data: z.infer<typeof HabitSchema>) => {
  const parsedData = HabitSchema.safeParse(data);

  if (!parsedData.success) {
    return { error: 'Invalid data' };
  }

  const session = await auth();
  if (session?.user?.id) {
    try {
      const habit = await prisma.habit.create({
        data: parsedData.data,
      });
      await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          habits: {
            connect: {
              id: habit.id,
            },
          },
        },
      });
    } catch (err) {
      return { err };
    }
  }
  return { error: 'please signin' };
};

export const addHabitEntry = async (id: string) => {
  try {
    const habitEntry = await prisma.habitEntries.create({
      data: {
        habitId: id,
      },
    });
    revalidatePath('/')
    return habitEntry;
  } catch (err) {
    return err;
  }
};
