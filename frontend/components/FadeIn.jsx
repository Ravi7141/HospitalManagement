'use client';

import { useState, useEffect, useRef } from 'react';
import './FadeIn.css';

const FadeIn = ({ 
    children, 
    delay = 0, 
    direction = 'up',
    duration = 0.5,
    className = '' 
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, delay);

        return () => clearTimeout(timer);
    }, [delay]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={elementRef}
            className={`fade-in fade-in-${direction} ${isVisible ? 'visible' : ''} ${className}`}
            style={{ '--duration': `${duration}s` }}
        >
            {children}
        </div>
    );
};

export default FadeIn;

