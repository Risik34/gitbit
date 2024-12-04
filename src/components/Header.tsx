import { FaUser } from 'react-icons/fa'; // User Icon

const Header = () => {
  return (
    <header className="flex justify-between items-center p-6 text-white">
      <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-500">
        Welcome
      </h1>
      <button className="flex items-center p-2 rounded-full hover:bg-blue-600 transition-colors">
        <FaUser size={24} className="text-gray-300 hover:text-white" />
      </button>
    </header>
  );
};

export default Header;

