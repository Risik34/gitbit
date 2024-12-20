import Header from '@/components/Header';
import Navbar from '@/components/Navbar';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header/>
      <Navbar/>
      {children}
  </div>
  );
}
