import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import CreatePage from './pages/CreatePage';
import Layout from './layout/Layout';


function App() {
  return (
    <Router>
        <Layout />
    </Router>
  );
}

export default App;
