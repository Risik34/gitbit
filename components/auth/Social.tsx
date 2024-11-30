import { Button } from '../ui/button';
import { FaGoogle,FaGithub } from 'react-icons/fa';

export default function Social() {
  return (
    <div className="w-full flex flex-row justify-center gap-4">
      <Button className='w-full bg-gradient-to-tl from-gray-700 to-gray-800' variant='outline'>
        <FaGoogle />
      </Button>
      <Button className='w-full bg-gradient-to-tl from-gray-700 to-gray-800' variant='outline' >
        <FaGithub />
      </Button>
    </div>
  );
}
