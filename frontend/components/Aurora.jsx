'use client';

import { useEffect, useRef } from 'react';
import './Aurora.css';

export default function Aurora({
    colorStops = ["#3A29FF", "#FF94B4", "#FF3232"],
    blend = 0.5,
    amplitude = 1.0,
    speed = 0.5
}) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationId;
        let time = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createGradient = (x, y, radius, colors) => {
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
            colors.forEach((color, i) => {
                gradient.addColorStop(i / (colors.length - 1), color);
            });
            return gradient;
        };

        const draw = () => {
            const width = canvas.width;
            const height = canvas.height;

            // Clear canvas with dark background
            ctx.fillStyle = '#0a0a0f';
            ctx.fillRect(0, 0, width, height);

            // Aurora waves
            const numWaves = 3;
            for (let w = 0; w < numWaves; w++) {
                ctx.beginPath();
                ctx.globalAlpha = 0.3 - (w * 0.08);
                ctx.globalCompositeOperation = 'lighter';

                const baseY = height * 0.5 + (w * 50);
                const waveAmplitude = 100 * amplitude + (w * 30);
                const waveSpeed = time * speed * (1 + w * 0.2);

                ctx.moveTo(0, baseY);

                for (let x = 0; x <= width; x += 5) {
                    const y = baseY +
                        Math.sin(x * 0.003 + waveSpeed) * waveAmplitude +
                        Math.sin(x * 0.007 + waveSpeed * 0.5) * (waveAmplitude * 0.5) +
                        Math.cos(x * 0.002 + waveSpeed * 0.3) * (waveAmplitude * 0.3);
                    ctx.lineTo(x, y);
                }

                ctx.lineTo(width, height);
                ctx.lineTo(0, height);
                ctx.closePath();

                // Create gradient for each wave
                const gradient = ctx.createLinearGradient(0, baseY - waveAmplitude, 0, height);
                const colorIndex = w % colorStops.length;
                const nextColorIndex = (w + 1) % colorStops.length;

                gradient.addColorStop(0, colorStops[colorIndex] + '00');
                gradient.addColorStop(0.3, colorStops[colorIndex] + '80');
                gradient.addColorStop(0.6, colorStops[nextColorIndex] + '60');
                gradient.addColorStop(1, colorStops[nextColorIndex] + '00');

                ctx.fillStyle = gradient;
                ctx.fill();
            }

            // Add glow orbs
            ctx.globalCompositeOperation = 'lighter';
            for (let i = 0; i < colorStops.length; i++) {
                const orbX = width * (0.2 + i * 0.3) + Math.sin(time * speed * 0.5 + i) * 100;
                const orbY = height * 0.4 + Math.cos(time * speed * 0.3 + i * 2) * 80;
                const radius = 200 + Math.sin(time * speed + i) * 50;

                const gradient = createGradient(orbX, orbY, radius, [
                    colorStops[i] + '40',
                    colorStops[i] + '20',
                    colorStops[i] + '00'
                ]);

                ctx.beginPath();
                ctx.arc(orbX, orbY, radius, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.globalAlpha = 0.5 * blend;
                ctx.fill();
            }

            ctx.globalAlpha = 1;
            ctx.globalCompositeOperation = 'source-over';

            time += 0.016;
            animationId = requestAnimationFrame(draw);
        };

        resize();
        window.addEventListener('resize', resize);
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, [colorStops, blend, amplitude, speed]);

    return (
        <canvas
            ref={canvasRef}
            className="aurora-canvas"
        />
    );
}
