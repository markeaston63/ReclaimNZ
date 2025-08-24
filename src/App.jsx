import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'; 
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage'; 
import DisclaimerPage from './pages/DisclaimerPage'; 
import SituationPage from './pages/SituationPage'; 
import SolutionPage from './pages/SolutionPage'; 
import JoinPage from './pages/JoinPage'; 
import ContactPage from './pages/ContactPage'; 
import DonatePage from './pages/DonatePage'; 
import BlogPage from './pages/BlogPage'; 
import LinksPage from './pages/LinksPage'; 
import QAPage from './pages/QAPage'; 
import PressPage from './pages/PressPage';
import AdminPage from './pages/AdminPage'; 

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="disclaimer" element={<DisclaimerPage />} />
        <Route path="situation" element={<SituationPage />} />
        <Route path="solution" element={<SolutionPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="links" element={<LinksPage />} />
        <Route path="qa" element={<QAPage />} />
        <Route path="press" element={<PressPage />} />
        <Route path="admin" element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        } />
        <Route path="join" element={<JoinPage />} />
        <Route path="donate" element={<DonatePage />} />        
        <Route path="contact" element={<ContactPage />} />

        {/* Optional: Catch-all route for 404 Not Found pages */}
        <Route path="*" element={<div className="text-center py-12 text-2xl">404 - Page Not Found</div>} />
      </Route>
    </Routes>
  );
};

export default App;
