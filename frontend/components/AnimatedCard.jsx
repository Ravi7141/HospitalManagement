'use client';

import { useState, useRef, useEffect } from 'react';
import './AnimatedCard.css';

const AnimatedCard = ({ children, className = '', delay = 0, hover = true, ...props }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const cardRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, delay);

        return () => clearTimeout(timer);
    }, [delay]);

    const handleMouseMove = (e) => {
        if (!hover || !cardRef.current) return;
        
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        setMousePosition({ x, y });
    };

    const handleMouseLeave = () => {
        setMousePosition({ x: 0, y: 0 });
    };

    return (
        <div
            ref={cardRef}
            className={`animated-card ${isVisible ? 'visible' : ''} ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                '--mouse-x': `${mousePosition.x}px`,
                '--mouse-y': `${mousePosition.y}px`,
            }}
            {...props}
        >
            {children}
        </div>
    );
};

export default AnimatedCard;

