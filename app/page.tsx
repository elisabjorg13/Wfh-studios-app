'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectAccordion from '@/components/ProjectAccordion';

const projects = [
  {
    title: 'https://elisabjorg.is/',
    href: 'https://elisbajorg.is/',
    year: 2025,
    images: [
      { src: '/elisabjorg/elisabjorg-img1.png', alt: 'Elísabet Björg homepage' },
      { src: '/elisabjorg/elisabjorg-img2.png', alt: 'Elísabet Björg project view' },
      { src: '/elisabjorg/elisabjorg-img3.png', alt: 'Elísabet Björg detail' },
      { src: '/elisabjorg/elisabjorg-img4.png', alt: 'Elísabet Björg detail' },
    ],
  },
];

export default function Home() {
  const [currentImage, setCurrentImage] = useState(1);
  const [showLoading, setShowLoading] = useState(true);
  
  useEffect(() => {
    // Cycle through images 1-4
    if (currentImage < 4) {
      const timer = setTimeout(() => {
        setCurrentImage(currentImage + 1);
      }, 500); // Half second between images
      
      return () => clearTimeout(timer);
    } else {
      // After showing all 4 images, wait 500ms then show main page
      const timer = setTimeout(() => {
        setShowLoading(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [currentImage]);

  if (showLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Image
          src={`/WFH.loading${currentImage}.jpg`}
          alt={`Loading ${currentImage}`}
          width={800}
          height={600}
          priority
          className="max-w-full h-auto"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow">
        <ProjectAccordion projects={projects} />
      </main>
      <Footer />
    </div>
  );
}

