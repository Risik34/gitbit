import { Button } from '@/components/ui/button';
import { signOut } from '@/auth';
import React from 'react';

export default function page() {
  return (
    <form
      action={async() => {
        'use server';
        signOut();
      }}
    >
      <Button type="submit">SignOut</Button>
    </form>
  );
}
