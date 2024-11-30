'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import CardWrapper from '@/components/auth/CardWrapper';
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SignupSchema } from '@/schema';
import { signup } from '@/actions/auth';
import { useState } from 'react';
import FormSuccess from '../FormSuccess';
import FormError from '../FormError';

type FormResponse = {
  message?: string;
  error?: string;
};

export default function SignupForm() {
  const [formResponse, setFormResponse] = useState<FormResponse>({});
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues:{
      name:'',
      email:'',
      password:'',
    }
  });

  async function onSubmit(values: z.infer<typeof SignupSchema>) {
    setFormResponse({})
    const res = await signup(values);
    setFormResponse(res);
  }
  return (
    <CardWrapper
      headerLabel="Signup"
      backButtonLabel="Already have an account?"
      backButtonHref="/signup"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John doe"
                    className="bg-gray-900"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    placeholder="johndoe@mail.com"
                    className="bg-gray-900"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="********"
                    type="password"
                    className="bg-gray-900"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="default"
            className="w-full bg-gradient-to-br from-blue-500 to-blue-600 text-md text-gray-300  outline  outline-1 outline-blue-500 shadow-md shadow-blue-900"
          >
            Submit
          </Button>
        </form>
      </Form>
      {formResponse?.message ? <FormSuccess message="success" /> : null}
      {formResponse?.error ? <FormError error="success" /> : null}
    </CardWrapper>
  );
}
