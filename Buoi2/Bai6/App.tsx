import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CourseList } from './CourseList';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CourseList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;