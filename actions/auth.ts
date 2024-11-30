'use server';

import { z } from 'zod';
import { LoginSchema, SignupSchema } from '@/schema/';
import { getUserByEmail } from '@/data/user';
import prisma from '@/lib/prisma';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  console.log(values);
  const parsedValues = LoginSchema.safeParse(values);

  if (!parsedValues.success) {
    return {
      error: 'Invalid credentials ',
    };
  }
  //authorize

  return { message: 'Successfully authenticated' };
};

export const signup = async (values: z.infer<typeof SignupSchema>) => {
  console.log(values);
  const parsedValues = SignupSchema.safeParse(values);

  if (!parsedValues.success) {
    return {
      error: 'Invalid credentials ',
    };
  }

  const existingUser = await getUserByEmail(values.email);

  if (existingUser) {
    return {
      error: 'Email already taken',
    };
  }

  await prisma.user.create({
    data: values,
  });

  //Signup

  return {
    message: 'Successfully signed up',
  };
};
