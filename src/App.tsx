import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RequireAuth, Login } from 'components';
import Logout from 'pages/Logout';
import Layout from 'layouts/Layout';
import { ThemeProvider } from 'providers';

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Router>
          <Routes>
            <Route path="/" element={<RequireAuth />}>
              <Route index element={<h1 className="text-3xl font-bold underline">Hello world!</h1>} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Router>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
