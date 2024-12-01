import { auth, signOut } from '@/auth';
import React from 'react';

export default async function page() {
  const session = await auth();
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      {JSON.stringify(session)}
      <button type="submit">SignOut</button>
    </form>
  );
}
