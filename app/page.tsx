'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

import Intro from './components/Intro';
import LoadingBar from './components/LoadingBar';
import Navbar from '../src/components/navbar/Navbar';
import Hero from '../src/components/hero/Hero';
import CustomCursor from './components/CustomCursor';
import SmoothScroll from './components/SmoothScroll';

const Section2 = dynamic(() => import('./components/Section2'));
const Section3 = dynamic(() => import('./components/Section3'));
const Section4 = dynamic(() => import('./components/Section4'));
const Section5 = dynamic(() => import('./components/Section5'));
const Section6 = dynamic(() => import('./components/Section6'));
const RescuedMeals = dynamic(() => import('./components/RescuedMeals'));
const FAQ = dynamic(() => import('./components/FAQ'));
const Footer = dynamic(() => import('../src/components/footer/Footer'));

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="bg-[#F4F3EE] min-h-screen selection:bg-[#F28F3B] selection:text-white cursor-none">
      <LoadingBar />
      <CustomCursor />
      <AnimatePresence mode="wait">
        {loading && <Intro key="intro" setFinished={setLoading} />}
      </AnimatePresence>

      <AnimatePresence>
        {!loading && (
          <SmoothScroll>
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Navbar />
              <Hero />
              <Section2 />
              <Section3 />
              <Section4 />
              <Section6 />
              <Section5 />
              <RescuedMeals />
              <FAQ />
              <Footer />
            </motion.main>
          </SmoothScroll>
        )}
      </AnimatePresence>
    </div>
  );
}