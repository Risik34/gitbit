import React from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
  return <div className='p-8 flex items-center justify-center'>{children}</div>;
}
