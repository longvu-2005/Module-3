import React from 'react';
import { ThemeProvider } from './ThemeContext';
import { Header } from './Header';
import { MainContent } from './MainContent';
import { Footer } from './Footer';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="app-container">
        <Header />
        <MainContent />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;