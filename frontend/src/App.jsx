import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Router import removed
import Layout from './components/Layout';
import Home from './pages/Home';
import EmployeeList from './pages/EmployeeList';
import EmployeeDetail from './pages/EmployeeDetail';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/employees/:id" element={<EmployeeDetail />} />
      </Routes>
    </Layout>
  );
}

export default App;