import { GoogleOneTap, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SignedIn>
        <UserButton />
        {children}
      </SignedIn>
      <SignedOut>
        <GoogleOneTap />
      </SignedOut>
    </div>
  );
}
