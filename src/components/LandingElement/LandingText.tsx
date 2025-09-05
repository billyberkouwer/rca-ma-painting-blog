'use client';

import "./landing-text.scss";
import { useState, useEffect } from 'react';

export default function LandingText() {
    const [isVisible, setIsVisible] =    useState(true);

    useEffect(() => {
        // Auto-fade after 4 seconds
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const handleClick = () => {
        setIsVisible(false);
    };

    return (
        <h1 
            className={`landing-text ${!isVisible ? 'fade-out' : ''}`}
            onClick={handleClick}
            style={{
                pointerEvents: isVisible ? 'auto' : 'none'
            }}
        >
            RCA MA Painting Blog 2025 / 2026
        </h1>
    );
}
