import React from 'react';

import { Route, Routes } from 'react-router-dom';
import CreatePage from '../pages/CreatePage';
import CombatPage from '../pages/CombatPage';
import DisplayPage from '../pages/DisplayPage';
import CreateTeamPage from '../pages/TeamPage';
import Battle from '../pages/Battle';

const Layout = () => {

  return (
      <Routes>
        <Route path="/battle" element={<Battle />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/chooseTeam" element={<CombatPage />} />
        <Route path="/createTeam" element={<CreateTeamPage />} />
        <Route path="/" element={<DisplayPage />} />
      </Routes>
  );
};

export default Layout;
