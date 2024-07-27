import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArticleList from '../src/components/ArticleList';
import ArticleDetail from '../src/components/ArticleDetail';

function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
