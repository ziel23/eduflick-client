// src/AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/login';
import SignUpPage from '../pages/signup';
import HomePage from '../pages/home';
import CardPage from '../pages/card';
import LeadersBoardPage from '../pages/leadersBoard';
import LeadersBoardCardPage from '../pages/leadersBoardCards';
import ProfilePage from '../pages/profile';
import NotFound from '../pages/notfound';
import Layout from '../layout/layout';

const AppRouter = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/card" element={<CardPage />} />
        <Route path="/leaders-board" element={<LeadersBoardPage />} />
        <Route path="/leaders-board/:id" element={<LeadersBoardCardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  </Router>
);

export default AppRouter;