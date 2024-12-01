import { Button } from '../ui/button';
import { FaGoogle,FaGithub } from 'react-icons/fa';
import { signIn } from 'next-auth/react';

export default function Social() {
  return (
    <div className="w-full flex flex-row justify-center gap-4">
      <Button onClick={()=>{signIn('google')}} className='w-full bg-gradient-to-tl from-gray-700 to-gray-800' variant='outline'>
        <FaGoogle />
      </Button>
      <Button onClick={()=>{signIn('github')}} className='w-full bg-gradient-to-tl from-gray-700 to-gray-800' variant='outline' >
        <FaGithub />
      </Button>
    </div>
  );
}
