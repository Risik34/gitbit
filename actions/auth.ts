'use server';

import { z } from 'zod';
import { LoginSchema, SignupSchema } from '@/schema/';
import { getUserByEmail } from '@/data/user';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { signIn } from '@/auth';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const parsedValues = LoginSchema.safeParse(values);

  if (!parsedValues.success) {
    return {
      error: 'Invalid credentials ',
    };
  }

  const {email,password}=parsedValues.data

  await signIn('credentials',{
    email,
    password
  })

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
   
  const {name,email,password}=parsedValues.data


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
