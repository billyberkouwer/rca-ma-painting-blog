'use client';

import "./landing-element.scss";
import { useState, useMemo, useEffect, useRef, useCallback } from 'react';

// Muted organic color palette - softer and more subtle
const organicColors = [
    '#8BA3C4', // Muted blue
    '#9B8BB0', // Soft purple
    '#9BB59B', // Gentle green
    '#C4A68A', // Warm beige
    '#D4B08A', // Soft orange
    '#C49B8A', // Muted coral
    '#D4B8C4', // Soft pink
    '#A8B8B8', // Muted cyan
    '#9BB59B', // Gentle green
    '#D4A68A', // Soft amber
    '#C49BB0', // Muted pink
    '#B08BB0', // Soft purple
    '#8BA3C4', // Muted blue
    '#8BB5B0', // Soft teal
    '#D4B08A', // Gentle orange
    '#9B8BB0', // Muted lavender
    '#8BA3C4', // Soft blue
    '#A8B8A8', // Gentle green
    '#D4A68A', // Soft yellow
    '#C49B8A', // Muted orange
];

export default function LandingElement() {
    const [hiddenElements, setHiddenElements] = useState<Set<number>>(new Set());
    const [isClient, setIsClient] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const animationFrameRef = useRef<number | null>(null);
    const lastTouchTimeRef = useRef<number>(0);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleElementHover = (index: number) => {
        setHiddenElements(prev => new Set([...prev, index]));
    };

    const handleLandingClick = () => {
        setIsHidden(true);
    };

    // Mobile touch handling with requestAnimationFrame
    const handleTouchMove = useCallback((event: TouchEvent) => {
        if (!containerRef.current) return;

        // Throttle touch events to improve performance
        const now = Date.now();
        if (now - lastTouchTimeRef.current < 16) return; // ~60fps
        lastTouchTimeRef.current = now;

        // Cancel previous animation frame
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }

        // Use requestAnimationFrame for smooth touch handling
        animationFrameRef.current = requestAnimationFrame(() => {
            const touch = event.touches[0];
            if (!touch || !containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;

            // Calculate which grid cell is being touched
            const gridSize = 10; // 10x10 grid
            const cellWidth = rect.width / gridSize;
            const cellHeight = rect.height / gridSize;
            
            const col = Math.floor(x / cellWidth);
            const row = Math.floor(y / cellHeight);
            const index = row * gridSize + col;

            // Only trigger if within grid bounds
            if (col >= 0 && col < gridSize && row >= 0 && row < gridSize) {
                handleElementHover(index);
            }
        });
    }, []);

    // Add touch event listeners
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        document.addEventListener('touchmove', handleTouchMove, { passive: true });

        return () => {
            document.removeEventListener('touchmove', handleTouchMove);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [handleTouchMove]);

    // Generate fixed grid items with stable colors and animation properties
    const gridItems = useMemo(() => {
        if (!isClient) return [];
        
        return Array.from({ length: 100 }, (_, index) => {
            // Use a seeded random function for consistent values
            const seededRandom = (seed: number) => {
                const x = Math.sin(seed) * 10000;
                return x - Math.floor(x);
            };
            
            // Create deterministic random values based on index
            const randomDelay = seededRandom(index) * 5;
            const randomDuration = 3 + seededRandom(index + 1000) * 4; // 3-7 seconds
            
            // Pick a deterministic organic color based on index
            const colorIndex = Math.floor(seededRandom(index + 2000) * organicColors.length);
            const randomColor = organicColors[colorIndex];

            return {
                index,
                randomDelay,
                randomDuration,
                randomColor
            };
        });
    }, [isClient]); // Depends on isClient to ensure client-side generation

    // Render grid items with current hidden state
    const renderedGridItems = gridItems.map(({ index, randomDelay, randomDuration, randomColor }) => {
        const isHidden = hiddenElements.has(index);

        return (
            <div
                key={index}
                className={`landing-element__grid-item ${isHidden ? 'hidden' : ''}`}
                data-grid-index={index}
                onMouseEnter={() => handleElementHover(index)}
                style={{
                    animationDelay: `${randomDelay}s`,
                    animationDuration: `${randomDuration}s`,
                    backgroundColor: randomColor,
                }}
            />
        );
    });

    // Show loading state during hydration
    if (!isClient) {
        return (
            <div className="landing-element__wrapper">
                <div className="landing-element__container">
                    {/* Empty container during SSR */}
                </div>
            </div>
        );
    }

    return (
        <div 
            className={`landing-element__wrapper ${isHidden ? 'landing-hidden' : ''}`}
            onClick={handleLandingClick}
            style={{
                pointerEvents: isHidden ? 'none' : 'auto'
            }}
        >
            <div 
                ref={containerRef}
                className="landing-element__container"
            >
                {renderedGridItems}
            </div>
        </div>
    )
}