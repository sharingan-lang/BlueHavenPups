import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import Home from '@/pages/Home';

// Route-level code splitting keeps the home page bundle small.
const Puppies = lazy(() => import('@/pages/Puppies'));
const About = lazy(() => import('@/pages/About'));
const Health = lazy(() => import('@/pages/Health'));
const Reviews = lazy(() => import('@/pages/Reviews'));
const Faq = lazy(() => import('@/pages/Faq'));
const Contact = lazy(() => import('@/pages/Contact'));
const NotFound = lazy(() => import('@/pages/NotFound'));

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="puppies" element={<Puppies />} />
          <Route path="about" element={<About />} />
          <Route path="health" element={<Health />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="faq" element={<Faq />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
