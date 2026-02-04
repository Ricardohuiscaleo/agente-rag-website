'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { BackgroundLamp } from './BackgroundLamp';

export function LampSection() {
  return (
    <section className="relative h-[600px] w-full overflow-hidden">
      <BackgroundLamp />
      <motion.div
        initial={{ opacity: 0, y: 75 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.25, ease: 'easeInOut' }}
        className="container relative mx-auto flex h-full items-center justify-center px-8 text-center text-white"
      >
        <h2 className="text-4xl font-bold md:text-5xl lg:text-6xl">Let there be light</h2>
      </motion.div>
    </section>
  );
}
