import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RequireAuth } from 'components';
import Login from 'pages/Login';
import Logout from 'pages/Logout';
import NoMatch from 'pages/NoMatch';
import { ThemeProvider } from 'providers';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RequireAuth />}>
            <Route index element={<h1 className="text-3xl font-bold underline">Hello world!</h1>} />
            <Route path="*" element={<NoMatch />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
