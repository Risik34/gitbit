import { z } from "zod";

export const LoginSchema=z.object({
 email:z.string().email(),
 password:z.string().min(1)
})

export const SignupSchema=z.object({
 name:z.string(),
 email:z.string().email(),
 password:z.string().min(1)
})

export const HabitSchema = z.object({
  name: z.string(),
});

export const HabitEntrySchema=z.object({
  createdAt:z.date()
})

