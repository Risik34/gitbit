import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import Social from './Social';
import { Button } from '../ui/button';
import Link from 'next/link';

type CardWrapperProps = {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
};

export default function CardWrapper({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,
  showSocial,
}: CardWrapperProps) {
  return (
    <Card className='scale-in-center w-3/4 sm:w-3/5 bg-gradient-to-tl from-gray-900 to-bg shadow-xl shadow-slate-800 border-gray-500'>
      <CardHeader className='flex items-center'>
        <CardTitle className='text-4xl'>{headerLabel}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>{children}</CardContent>

      <CardFooter className='flex flex-col gap-4'>
        {/* Show the social logins conditionally */}
        {showSocial && <Social />}

        <Link href={backButtonHref}>

          <Button variant='link' className='scale-in-center underline'>{backButtonLabel}</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
