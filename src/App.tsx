import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import EmployeeList from './pages/employees/EmployeeList';
import EmployeeDetail from './pages/employees/EmployeeDetail';
import Login from './pages/users/login';
import UserList from './pages/users/userList';
import Navbar from './components/navbar';
import Home from './components/home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 dakika
    },
  },
});

function App() {
  const token = localStorage.getItem('token');
  return (
    <QueryClientProvider client={queryClient}>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route
            path='/'
            element={token ? <Home /> : <Navigate to='/login' replace />}
          />
          <Route path='/employees' element={<EmployeeList />} />
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/users' element={<UserList />} />
          <Route path='/employees/:employeeId' element={<EmployeeDetail />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
}
export default App;
