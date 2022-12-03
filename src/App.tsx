import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { RequireAuth } from 'components';
import { ThemeProvider } from 'providers';
import { LoginPage, LogoutPage, NoMatchPage, ProjectDetailsPage } from './pages';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RequireAuth />}>
            <Route index element={<Navigate to="/projects" />} />
            <Route path="/projects">
              <Route index element={<Navigate to="todo-id" />} />
              <Route path=":id" element={<ProjectDetailsPage />} />
            </Route>
            <Route path="*" element={<NoMatchPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
