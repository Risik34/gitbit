import React from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
  return <div className=' flex flex-col h-svh w-full justify-center items-center'>{children}</div>;
}
