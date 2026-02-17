'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectAccordion, { type Project } from '@/components/ProjectAccordion';

const projects: Project[] = [
  {
    title: 'https://elisabjorg.is/',
    href: 'https://elisbajorg.is/',
    year: 2025,
    media: [
      { src: '/elisabjorg.is.WFHmockups/elisabjorg.is.mockup1.mp4', alt: 'Elísabet Björg mockup 1', type: 'video' },
      { src: '/elisabjorg.is.WFHmockups/elisa.is.coochiemockup.jpg', alt: 'Elísabet Björg coachie mockup', type: 'image' },
      { src: '/elisabjorg.is.WFHmockups/elisabjorg.is.simimockup.mp4', alt: 'Elísabet Björg simi mockup', type: 'video' },
      { src: '/elisabjorg.is.WFHmockups/elisa.istoiletmockup.xray.jpg', alt: 'Elísabet Björg toilet mockup xray', type: 'image' },


    ],
  },
  {
    title: 'katrinhers.is',
    href: 'https://katrinhers.is/',
    year: 2025,
    media: [
      { src: '/katrinhers.is.WFHmockups/katrinhers.is.mp4', alt: 'Katrin Hers mockup video', type: 'video' },
      { src: '/katrinhers.is.WFHmockups/katrinher.is.mockup1.png', alt: 'Katrin Hers mockup 1', type: 'image' },
      { src: '/katrinhers.is.WFHmockups/katrinhers.is.mockup2.png', alt: 'Katrin Hers mockup 2', type: 'image' },

    ],
  },
  {
    title: 'Komumutiminus',
    href: '',
    year: 2025,
    media: [
      { src: '/Komumutiminus.WFHmockups/komumutiminus.final.mp4', alt: 'Komumutiminus final', type: 'video' },
      { src: '/Komumutiminus.WFHmockups/komumutiminus.identidy1.png', alt: 'Komumutiminus identity 1', type: 'image' },
      { src: '/Komumutiminus.WFHmockups/komumutiminus.identidy2.png', alt: 'Komumutiminus identity 2', type: 'image' },
      { src: '/Komumutiminus.WFHmockups/lifidererfitt.postermockup.png', alt: 'Líf er erfitt poster mockup', type: 'image' },
    ],
  },
  {
    title: 'SUSKIN',
    href: 'https://suskin.is/',
    year: 2025,
    media: [
      { src: '/suskin.is.WFHmockups/SUSKIN.websitemockup.WFH.jpg', alt: 'SUSKIN website mockup', type: 'image' },
      { src: '/suskin.is.WFHmockups/SUSKIN.websitemockup.home.WFH.png', alt: 'SUSKIN home mockup', type: 'image' },
      { src: '/suskin.is.WFHmockups/SUSKIN.websitemockup.shop.WFH.png', alt: 'SUSKIN shop mockup', type: 'image' },
    ],
  },
  {
    title: '12Tónar',
    href: 'https://12tonar.is/',
    year: 2025,
    media: [
      { src: '/12Tónar.WFHmockup/12tónar.Laufeyposter.WFHmockup.png', alt: '12Tónar Laufey poster mockup', type: 'image' },
      { src: '/12Tónar.WFHmockup/12tónar.dagskra.WFHmockup.png', alt: '12Tónar dagskrá mockup', type: 'image' },
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

