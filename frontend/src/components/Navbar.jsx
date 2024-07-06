import { Link } from 'react-router-dom';
import Nav from './Nav';

const Navbar = () => {
  const token = localStorage.getItem('auth_token');

  if (!token) {
    return <Nav />;
  }

  return (
    <nav className='w-full bg-white border-gray-200 flex justify-between items-center shadow-md mb-10'>
      <div className='flex justify-center items-center justify-betwee p-4 w-3/12'>
        <Link to={'/'} className='text-2xl font-bold'>
          TodoApp
        </Link>
      </div>

      <div className='flex justify-center items-center gap-6 p-4 w-3/12'>
        <div className='flex gap-6 justify-center items-center'>
          <Link to={'/'} className='font-semibold cursor-pointer'>
            Logout
          </Link>
          <span className='bg-blue-400 px-4 py-2 rounded-full text-white'>
            S
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
