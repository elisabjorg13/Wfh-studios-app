'use client';

import { useId, useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import CustomScrollbar from './CustomScrollbar';

type Project = {
  title: string;
  href: string;
  year: string | number;
  images: { src: string; alt: string }[];
};

function useAutoHeight(isOpen: boolean) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const next = el.scrollHeight;
    if (isOpen) setHeight(next);
    else setHeight(0);

    const ro = new ResizeObserver(() => {
      if (isOpen) setHeight(el.scrollHeight);
    });
    ro.observe(el);

    return () => ro.disconnect();
  }, [isOpen]);

  return { ref, height };
}

function Row({
  project,
  open,
  onToggle,
}: {
  project: Project;
  open: boolean;
  onToggle: () => void;
}) {
  const contentId = useId();
  const { ref, height } = useAutoHeight(open);

  return (
    <div className="">
      <button
        type="button"
        className="w-full flex items-center gap-4 px-6 py-3 md:py-6 text-left"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={onToggle}
      >
        <span className="flex-1">
          {project.href ? (
            <a 
              href={project.href} 
              target="_blank" 
              rel="noreferrer"
              className="hover:underline transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </span>
        <span className="tabular-nums">{project.year}</span>
        <span aria-hidden className="w-6 text-center">
          {open ? '–' : '+'}
        </span>
      </button>

      <div
        id={contentId}
        role="region"
        aria-hidden={!open}
        className="overflow-hidden transition-[height] duration-500 ease-out"
        style={{ height }}
      >
        <div ref={ref} className="">
          <CustomScrollbar className="">
            <div className="flex mt-5">
              {project.images.map((img, i) => (
                <div key={i} className="relative w-[500px] flex-shrink-0 aspect-[4/3] bg-neutral-100">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="500px"
                    className="object-cover"
                    priority={false}
                  />
                </div>
              ))}
            </div>
          </CustomScrollbar>
        </div>
      </div>

      <div className="border-b border-black" />
    </div>
  );
}

export default function ProjectAccordion({
  projects,
}: {
  projects: Project[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section aria-label="Projects" className="bg-white">
      {projects.map((p, i) => {
        const isOpen = openIndex === i;
        return (
          <Row
            key={p.title}
            project={p}
            open={isOpen}
            onToggle={() => {
              setOpenIndex(prev => (prev === i ? null : i));
            }}
          />
        );
      })}
    </section>
  );
}

