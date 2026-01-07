'use client';

import { useRef, useState } from 'react';
import './MagicCard.css';

const MagicCard = ({ children, className = '', gradientColor = '#3b82f6' }) => {
    const cardRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        setPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={cardRef}
            className={`magic-card ${className}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Gradient spotlight effect */}
            <div
                className="magic-card-spotlight"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${gradientColor}20, transparent 40%)`,
                }}
            />
            {/* Animated border gradient */}
            <div
                className="magic-card-border"
                style={{
                    opacity,
                    background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${gradientColor}, transparent 40%)`,
                }}
            />
            {/* Card content */}
            <div className="magic-card-content">
                {children}
            </div>
        </div>
    );
};

export default MagicCard;
