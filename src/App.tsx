import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RequireAuth, Login } from './components';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RequireAuth />}>
          <Route index element={<h1 className="text-3xl font-bold underline">Hello world!</h1>} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
