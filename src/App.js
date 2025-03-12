import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import ImpactStory from './components/ImpactStory';
import Resources from './components/Resources';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';

function App() {
  return (
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
  );
}

export default App;