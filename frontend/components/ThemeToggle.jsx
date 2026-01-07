'use client';

import { useTheme } from '@/context/ThemeContext';
import styles from './ThemeToggle.module.css';

const ThemeToggle = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <button
            className={`${styles.toggle} ${isDark ? styles.dark : styles.light}`}
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            <div className={styles.toggleTrack}>
                {/* Stars for dark mode */}
                <div className={styles.stars}>
                    <span className={styles.star} style={{ top: '8px', left: '8px', animationDelay: '0s' }}></span>
                    <span className={styles.star} style={{ top: '18px', left: '16px', animationDelay: '0.3s' }}></span>
                    <span className={styles.star} style={{ top: '6px', left: '22px', animationDelay: '0.6s' }}></span>
                </div>

                {/* Clouds for light mode */}
                <div className={styles.clouds}>
                    <span className={styles.cloud} style={{ top: '12px', right: '8px' }}></span>
                    <span className={styles.cloud} style={{ top: '8px', right: '18px', transform: 'scale(0.6)' }}></span>
                </div>

                {/* Toggle thumb with sun/moon */}
                <div className={styles.thumb}>
                    {/* Sun */}
                    <div className={styles.sun}>
                        <div className={styles.sunCore}></div>
                        <div className={styles.sunRays}>
                            {[...Array(8)].map((_, i) => (
                                <span key={i} className={styles.ray} style={{ transform: `rotate(${i * 45}deg)` }}></span>
                            ))}
                        </div>
                    </div>

                    {/* Moon */}
                    <div className={styles.moon}>
                        <div className={styles.moonCore}></div>
                        <div className={styles.crater} style={{ top: '6px', left: '10px', width: '4px', height: '4px' }}></div>
                        <div className={styles.crater} style={{ top: '14px', left: '6px', width: '3px', height: '3px' }}></div>
                        <div className={styles.crater} style={{ top: '10px', left: '14px', width: '2px', height: '2px' }}></div>
                    </div>
                </div>
            </div>
        </button>
    );
};

export default ThemeToggle;
