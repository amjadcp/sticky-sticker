import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Home } from '../pages/Home';
import { PromptDetail } from '../pages/PromptDetail';
import { InfoPage } from '../pages/InfoPage';

const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return null;
};

export const AppRoutes: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prompt/:slug" element={<PromptDetail />} />
        <Route path="/how-it-works" element={<InfoPage />} />
        <Route path="/pricing" element={<InfoPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
};
