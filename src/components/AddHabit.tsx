'use client'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { HabitSchema } from '@/schema';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DialogClose } from '@/components/ui/dialog';
import { z } from 'zod';
import { addHabit } from '@/actions/habit';

const AddHabitForm = () => {
  const form = useForm<z.infer<typeof HabitSchema>>({
    resolver: zodResolver(HabitSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof HabitSchema>) => {
    console.log(data);
   await addHabit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Meditation" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogClose>
          <Button type="submit" className="w-full">
            Save
          </Button>
        </DialogClose>
      </form>
    </Form>
  );
};

export default AddHabitForm;
