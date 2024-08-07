import Auth from './components/Auth.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ShowTodos from './components/ShowTodos.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Auth />} />

          <Route
            path='/api/v1/todos'
            element={
              <ProtectedRoute>
                <ShowTodos />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
