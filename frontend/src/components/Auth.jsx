import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (auth) {
      try {
        const res = await fetch('http://localhost:3000/api/v1/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            username,
            password,
          }),
        });

        const data = await res.json();
        if (res.ok) {
          toast.success(data.msg);
          setEmail('');
          setUsername('');
          setPassword('');
          setAuth(false);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await fetch('http://localhost:3000/api/v1/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const data = await res.json();
        if (res.ok) {
          toast.success(data.msg);
          localStorage.setItem('auth_token', data.token);
          navigate('/api/v1/todos');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // useEffect(() => {}, []);
  return (
    <>
      <Toaster position='top-right' expand={false} richColors />
      <h1 className='max-w-sm mx-auto font-bold text-2xl mb-4'>
        {auth ? 'Register' : 'Login'}
      </h1>
      <form className='max-w-sm mx-auto'>
        <div className='mb-5'>
          <label className='block mb-2 text-sm font-medium text-gray-900'>
            Your email
          </label>
          <input
            type='email'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            placeholder='bhidu@gmail.com'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {auth && (
          <div className='mb-5'>
            <label className='block mb-2 text-sm font-medium text-gray-900'>
              Username
            </label>
            <input
              type='text'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              placeholder='username'
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}
        <div className='mb-5'>
          <label className='block mb-2 text-sm font-medium text-gray-900'>
            Password
          </label>
          <input
            type='text'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            placeholder='password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type='submit'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mb-3 text-center'
          onClick={handleSubmit}
        >
          Submit
        </button>

        <p className='text-sm font-light text-gray-500'>
          {auth ? 'Already have an account?' : 'Don’t have an account?'}{' '}
          <Link
            to='/'
            className='font-medium text-blue-600 hover:underline'
            onClick={() => setAuth(!auth)}
          >
            {auth ? 'Login here' : 'Register here'}
          </Link>
        </p>
      </form>
    </>
  );
};

export default Auth;
