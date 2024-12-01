import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

import { House, LucideProps } from 'lucide-react';

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
    <div className="fixed z-10 bottom-4 left-0 right-0 mx-auto bg-slate-900 max-w-fit   p-2 h-14 rounded-md">
      <ul className="flex flex-row h-full gap-6 justify-center items-center">
        <NavbarItem Icon={House} link="/" />
        <NavbarItem Icon={House} link="/" />
        <NavbarItem Icon={House} link="/" />
      </ul>
    </div>
  );
}

function NavbarItem({ Icon, link, className }: NavbarItemProps) {
  return (
    <Link href={link}>
      <div className={cn('size-12 p-2 rounded-md hover:bg-gray-700', className)}>
        <Icon className="size-8" />
      </div>
    </Link>
  );
}
