'use client';

import { useState, useEffect } from 'react';
import './page-scroll-counter.scss';
import Link from 'next/link';

export default function PageScrollCounter() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Get the total height of the document
      const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

      // Get the current scroll position
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Calculate the percentage (0-100)
      const percentage = documentHeight > 0 ? Math.round((scrollTop / documentHeight) * 100) : 0;

      setScrollPercentage(percentage);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Call once to set initial value
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="page-scroll-counter__wrapper">
      <span
        className="page-scroll-counter"
        aria-label={`Scrolled ${scrollPercentage}% down the page`}
      >
        {scrollPercentage}%
      </span>
      <Link href="https://billyberkouwer.dev">
        <div className="dark-theme">Run by Billy Myles-Berkouwer</div>
      </Link>
    </div>

  );
}
