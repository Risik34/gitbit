'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import { House, Plus, Menu, LucideProps } from 'lucide-react';
import AddHabitForm from './AddHabit';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog';

type IconType = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<LucideProps> & React.RefAttributes<SVGSVGElement>
>;

type NavbarItemProps = {
  Icon: IconType;
  link: string;
  className?: string;
};

export default function Navbar() {
  return (
    <div className="flex flex-row h-16 gap-6 justify-center items-center fixed w-full z-10 bottom-4 left-0 right-0 mx-auto bg-gradient-to-br from-gray-800 to-gray-900 max-w-fit px-4 py-2 rounded-full shadow-lg backdrop-blur-md border border-gray-700">
      <NavbarItem Icon={House} link="/" />

      <Dialog>
        <DialogTrigger className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300">
            <Plus className="text-white w-6 h-6" />
        </DialogTrigger>
        <DialogContent className="bg-gray-900 w-3/4 rounded-md text-white">
          <DialogTitle>Add new habit</DialogTitle>
          <AddHabitForm />
        </DialogContent>
      </Dialog>

      <NavbarItem Icon={Menu} link="/menu" />
    </div>
  );
}

function NavbarItem({ Icon, link, className }: NavbarItemProps) {
  return (
    <Link href={link}>
      <div
        className={cn(
          'p-2 rounded-md transition-all duration-300 hover:bg-gray-700 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400',
          className,
        )}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
    </Link>
  );
}
