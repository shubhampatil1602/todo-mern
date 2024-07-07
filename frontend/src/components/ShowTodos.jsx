import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import Navbar from './Navbar.jsx';

const ShowTodos = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/v1/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      const data = await res.json();
      console.log(data);
      if (res.ok) {
        toast.success(data.msg);
        setTitle('');
        setDescription('');
        fetchTodos();
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      const res = await fetch('http://localhost:3000/api/v1/todos', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify({
          todoId,
        }),
      });

      const data = await res.json();
      console.log(data);
      if (res.ok) {
        toast.success(data.msg);
        setTodos(todos.filter((todo) => todo._id !== todoId));
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDoneTodo = async (todoId) => {
    try {
      const res = await fetch('http://localhost:3000/api/v1/todos', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify({
          todoId,
        }),
      });

      const data = await res.json();
      console.log(data);
      if (res.ok) {
        if (data.msg === 'Done') {
          toast.success(data.msg);
        } else {
          toast.warning(data.msg);
        }
        fetchTodos();
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTodos = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/v1/todos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setTodos(data.todos);
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <>
      <Toaster position='top-right' expand={false} richColors />
      <Navbar />
      <div className='w-full flex gap-3 p-2'>
        {/* ----- */}
        <div className='w-2/5 flex flex-col gap-6 items-center'>
          <div className='w-4/5 px-6'>
            <h1 className='font-semibold text-2xl'>Add Todos</h1>
          </div>

          <div className='w-4/5 flex flex-col gap-6 items-center'>
            <div className='mb-5 flex flex-col gap-6'>
              <div className=''>
                <label className='block mb-2 text-sm font-medium text-gray-900'>
                  Title
                </label>
                <input
                  type='text'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                  placeholder='Title'
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className=''>
                <label className='block mb-2 text-sm font-medium text-gray-900'>
                  Description
                </label>
                <textarea
                  type='text'
                  rows={4}
                  cols={50}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                  placeholder='Description'
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <button
                onClick={handleAddTodo}
                type='submit'
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
              >
                Add todo
              </button>
            </div>
          </div>
        </div>
        {/* ----- */}
        <div className='w-3/5 flex flex-col gap-6 items-center h-[calc(100vh-64px)]'>
          <div className='w-4/5'>
            <h1 className='font-semibold text-2xl'>Your Todos</h1>
          </div>
          <div className='w-4/5 flex flex-col gap-3 items-center overflow-auto'>
            {todos?.map((todo) => {
              return (
                <div
                  key={todo?._id}
                  className={`
                    ${
                      todo?.isCompleted ? 'bg-green-50' : 'bg-yellow-50'
                    } border rounded-md p-4 w-full`}
                >
                  <h2 className='font-semibold text-2xl mb-2'>{todo?.title}</h2>
                  <p className='mb-2'>{todo?.description}</p>

                  <button
                    onClick={() => handleDoneTodo(todo?._id)}
                    className='py-2 px-4 border rounded-md mr-2'
                  >
                    Done
                  </button>
                  <button
                    onClick={() => handleDeleteTodo(todo?._id)}
                    className='py-2 px-4 border rounded-md'
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowTodos;
