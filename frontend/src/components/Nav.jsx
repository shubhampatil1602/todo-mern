import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className='w-full bg-blue-50 border-gray-200 flex justify-between items-center shadow-md mb-10'>
      <div className='flex justify-center items-center justify-betwee p-4 w-3/12'>
        <Link to={'/'} className='text-2xl font-bold'>
          TodoApp
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
