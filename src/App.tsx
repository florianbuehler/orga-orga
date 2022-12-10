import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RequireAuth } from 'components';
import { ThemeProvider } from 'providers';
import { DonorDetailsPage, LoginPage, LogoutPage, NoMatchPage, ProjectDetailsPage } from './pages';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<RequireAuth />}>
              <Route index element={<Navigate to="/projects" />} />
              <Route path="/projects">
                <Route index element={<Navigate to="9CvSuKw4csagC88dezBk" />} />
                <Route path=":projectId" element={<ProjectDetailsPage />} />
                <Route path=":projectId/donors/:donorId" element={<DonorDetailsPage />} />
              </Route>
              <Route path="*" element={<NoMatchPage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<LogoutPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
