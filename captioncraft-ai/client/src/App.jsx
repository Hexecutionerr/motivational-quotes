import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Lazy load pages for code splitting & performance optimization
const Landing = React.lazy(() => import('./pages/Landing'));
const ToolsHub = React.lazy(() => import('./pages/ToolsHub'));
const ToolRunner = React.lazy(() => import('./pages/ToolRunner'));
const Instagram = React.lazy(() => import('./pages/Instagram'));
const PostIdeas = React.lazy(() => import('./pages/Ideas'));
const Saved = React.lazy(() => import('./pages/Saved'));
const Chat = React.lazy(() => import('./pages/Chat'));
const Templates = React.lazy(() => import('./pages/Templates'));
const Blog = React.lazy(() => import('./pages/Blog'));
const Pricing = React.lazy(() => import('./pages/Pricing'));
const Login = React.lazy(() => import('./pages/Login'));
const Offline = React.lazy(() => import('./pages/Offline'));
const Error404 = React.lazy(() => import('./pages/Error404'));
const Error500 = React.lazy(() => import('./pages/Error500'));

// Shimmering Spinner loader for Route Suspense fallback
const PageLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
    <div className="w-10 h-10 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin"></div>
    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider animate-pulse">Loading Workspace...</p>
  </div>
);

function App() {
  // Listen for browser network events to redirect offline state
  useEffect(() => {
    const handleOffline = () => {
      if (window.location.pathname !== '/offline') {
        window.location.href = '/offline';
      }
    };
    
    const handleOnline = () => {
      if (window.location.pathname === '/offline') {
        window.location.href = '/tools';
      }
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    // Initial check
    if (!navigator.onLine && window.location.pathname !== '/offline') {
      window.location.href = '/offline';
    }

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-primary-950 selection:text-primary-400">
        <Navbar />
        <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/tools" element={<ToolsHub />} />
              <Route path="/tools/:toolSlug" element={<ToolRunner />} />
              <Route path="/tools/:toolSlug/:categorySlug" element={<ToolRunner />} />
              <Route path="/tools/:toolSlug/:categorySlug/:topicSlug" element={<ToolRunner />} />
              <Route path="/tool/:slug" element={<ToolRunner />} />
              <Route path="/instagram" element={<Instagram />} />
              <Route path="/ideas" element={<PostIdeas />} />
              <Route path="/saved" element={<Saved />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/offline" element={<Offline />} />
              <Route path="/500" element={<Error500 />} />
              <Route path="*" element={<Error404 />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
