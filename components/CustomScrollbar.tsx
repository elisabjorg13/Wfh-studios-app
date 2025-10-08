'use client';

import { useRef, useState, useEffect } from 'react';

interface CustomScrollbarProps {
  children: React.ReactNode;
  className?: string;
}

export default function CustomScrollbar({ children, className = '' }: CustomScrollbarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const updateScrollInfo = () => {
      setScrollPosition(element.scrollLeft);
      setMaxScroll(element.scrollWidth - element.clientWidth);
    };

    updateScrollInfo();
    element.addEventListener('scroll', updateScrollInfo);
    window.addEventListener('resize', updateScrollInfo);

    return () => {
      element.removeEventListener('scroll', updateScrollInfo);
      window.removeEventListener('resize', updateScrollInfo);
    };
  }, []);

  const handleScrollbarClick = (e: React.MouseEvent) => {
    const element = scrollRef.current;
    if (!element || maxScroll === 0) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const scrollbarWidth = rect.width;
    const scrollRatio = clickX / scrollbarWidth;
    
    element.scrollLeft = scrollRatio * maxScroll;
  };

  const scrollbarWidth = maxScroll > 0 ? (scrollRef.current?.clientWidth || 0) : 0;
  const thumbWidth = scrollbarWidth > 0 ? (scrollRef.current?.clientWidth || 0) * (scrollRef.current?.clientWidth || 0) / (scrollRef.current?.scrollWidth || 0) : 0;
  const thumbPosition = maxScroll > 0 ? (scrollPosition / maxScroll) * (scrollbarWidth - thumbWidth) : 0;

  return (
    <div className={`relative ${className}`}>
      {/* Content */}
      <div 
        ref={scrollRef}
        className="overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children}
      </div>
      
      {/* Custom Scrollbar */}
      {maxScroll > 0 && (
        <div className="">
          {/* Track */}
          <div 
            className="h-2 bg-white cursor-pointer relative"
            onClick={handleScrollbarClick}
          >
            {/* Thumb */}
            <div 
              className="h-2 bg-wfh-blue absolute top-0 cursor-pointer hover:opacity-80 transition-opacity"
              style={{
                width: `${thumbWidth}px`,
                left: `${thumbPosition}px`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
