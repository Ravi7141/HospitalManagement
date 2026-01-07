'use client';

import { useState } from 'react';
import './AnimatedButton.css';

const AnimatedButton = ({
    children,
    onClick,
    variant = 'primary',
    className = '',
    disabled = false,
    type = 'button',
    ...props
}) => {
    const [ripples, setRipples] = useState([]);

    const handleClick = (e) => {
        if (disabled) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const size = Math.max(rect.width, rect.height);

        const newRipple = {
            id: Date.now(),
            x,
            y,
            size,
        };

        setRipples((prev) => [...prev, newRipple]);

        setTimeout(() => {
            setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
        }, 600);

        if (onClick) {
            onClick(e);
        }
    };

    return (
        <button
            type={type}
            className={`animated-button animated-button-${variant} ${className} ${disabled ? 'disabled' : ''}`}
            onClick={handleClick}
            disabled={disabled}
            {...props}
        >
            <span className="animated-button-content">{children}</span>
            {ripples.map((ripple) => (
                <span
                    key={ripple.id}
                    className="animated-button-ripple"
                    style={{
                        left: `${ripple.x}px`,
                        top: `${ripple.y}px`,
                        width: `${ripple.size}px`,
                        height: `${ripple.size}px`,
                    }}
                />
            ))}
        </button>
    );
};

export default AnimatedButton;

