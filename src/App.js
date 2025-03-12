import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import ImpactStory from './components/ImpactStory';
import Resources from './components/Resources';
import ResourcesPage from './components/ResourcesPage';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/" element={
          <div className="App">
            <a href="#main-content" className="skip-to-content">Skip to main content</a>
            <Navbar />
            <main id="main-content">
              <Hero />
              <About />
              <Services />
              <ImpactStory />
              <Resources />
              <Contact />
            </main>
            <Footer />
            <ChatBot />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;