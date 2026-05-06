'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Intro from './components/Intro';
import LoadingBar from './components/LoadingBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Section2 from './components/Section2';
import Section3 from './components/Section3';
import Section4 from './components/Section4';
import Section5 from './components/Section5';
import Section6 from './components/Section6';
import RescuedMeals from './components/RescuedMeals';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import SmoothScroll from './components/SmoothScroll';

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
              <Section5 />
              <Section6 />
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