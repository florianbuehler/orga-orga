import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RequireAuth } from './components';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RequireAuth />}>
          <Route index element={<h1 className="text-3xl font-bold underline">Hello world!</h1>} />
        </Route>
        <Route path="/login" element={<h1 className="text-3xl font-bold underline">Login</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
