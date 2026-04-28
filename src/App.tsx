/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import UniversityDetail from './pages/UniversityDetail';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="about" element={<About />} />
          <Route path="resources" element={<Resources />} />
          <Route path="contact" element={<Contact />} />
          <Route path="university/:name" element={<UniversityDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
