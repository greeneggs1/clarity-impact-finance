import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TeamSection from './components/TeamSection';
import Services from './components/Services';
import ImpactStory from './components/ImpactStory';
import Blog from './components/Blog';
import Resources from './components/Resources';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import Login from './components/Login';
import ClientResources from './components/ClientResources';
import AdminPanel from './components/AdminPanel';
import { AuthProvider } from './components/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <a href="#main-content" className="skip-to-content">Skip to main content</a>
          
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/client-resources" element={
              <PrivateRoute>
                <ClientResources />
              </PrivateRoute>
            } />
            <Route path="/" element={
              <>
                <Navbar />
                <main id="main-content">
                  <Hero />
                  <TeamSection />
                  <Services />
                  <ImpactStory />
                  <Blog />
                  <Resources />
                  <Contact />
                </main>
                <Footer />
                <ChatBot />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;