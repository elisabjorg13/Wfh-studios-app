'use client';

import { useRef, useState, useEffect } from 'react';

interface CustomScrollbarProps {
  children: React.ReactNode;
  className?: string;
}

export default function CustomScrollbar({ children, className = '' }: CustomScrollbarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; scrollLeft: number; ratio: number } | null>(null);
  const didDragRef = useRef(false);

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

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const start = dragStartRef.current;
      const element = scrollRef.current;
      if (!start || !element) return;

      const deltaX = e.clientX - start.x;
      const newScrollLeft = Math.max(0, Math.min(maxScroll, start.scrollLeft + deltaX * start.ratio));
      element.scrollLeft = newScrollLeft;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      dragStartRef.current = null;
      didDragRef.current = true;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, maxScroll]);

  const handleScrollbarClick = (e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) return;
    if (didDragRef.current) {
      didDragRef.current = false;
      return;
    }

    const element = scrollRef.current;
    if (!element || maxScroll === 0) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const scrollbarWidth = rect.width;
    const scrollRatio = clickX / scrollbarWidth;

    element.scrollLeft = scrollRatio * maxScroll;
  };

  const handleThumbMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const element = scrollRef.current;
    const track = trackRef.current;
    if (!element || !track || maxScroll === 0) return;

    const trackWidth = track.getBoundingClientRect().width;
    const thumbWidth = trackWidth * (element.clientWidth / element.scrollWidth);
    const thumbTravel = trackWidth - thumbWidth;
    const ratio = thumbTravel > 0 ? maxScroll / thumbTravel : 0;

    dragStartRef.current = {
      x: e.clientX,
      scrollLeft: element.scrollLeft,
      ratio,
    };
    setIsDragging(true);
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
            ref={trackRef}
            className="h-2 bg-white cursor-pointer relative select-none"
            onClick={handleScrollbarClick}
          >
            {/* Thumb */}
            <div
              role="scrollbar"
              aria-valuenow={scrollPosition}
              aria-valuemin={0}
              aria-valuemax={maxScroll}
              className={`h-2 bg-wfh-blue absolute top-0 hover:opacity-80 transition-opacity ${isDragging ? 'cursor-grabbing opacity-90' : 'cursor-grab'}`}
              style={{
                width: `${thumbWidth}px`,
                left: `${thumbPosition}px`,
              }}
              onMouseDown={handleThumbMouseDown}
            />
          </div>
        </div>
      )}
    </div>
  );
}
