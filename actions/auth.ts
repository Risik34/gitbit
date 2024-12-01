'use server';

import { z } from 'zod';
import { LoginSchema, SignupSchema } from '@/schema/';
import { getUserByEmail } from '@/data/user';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const parsedValues = LoginSchema.safeParse(values);

  if (!parsedValues.success) {
    return {
      error: 'Invalid credentials ',
    };
  }

  const { email, password } = parsedValues.data;

  try {
    await signIn('credentials', {
      email,
      password,
    });
    return { message: 'Successfully authenticated' };
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials' };
        default:
          return { error: 'Something went wrong' };
      }
    }
      throw err;
  }

  //authorize
};

export const signup = async (values: z.infer<typeof SignupSchema>) => {
  console.log(values);
  const parsedValues = SignupSchema.safeParse(values);

  if (!parsedValues.success) {
    return {
      error: 'Invalid credentials ',
    };
  }

  const { name, email, password } = parsedValues.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      error: 'Email already taken',
    };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  //Signup

  return {
    message: 'Successfully signed up',
  };
};
