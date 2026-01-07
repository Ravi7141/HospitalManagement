'use client';

import './LoadingSkeleton.css';

const LoadingSkeleton = ({ 
    width = '100%', 
    height = '20px', 
    borderRadius = '4px',
    className = '',
    count = 1 
}) => {
    const skeletons = Array.from({ length: count }, (_, i) => i);

    return (
        <>
            {skeletons.map((_, index) => (
                <div
                    key={index}
                    className={`loading-skeleton ${className}`}
                    style={{
                        width,
                        height,
                        borderRadius,
                        animationDelay: `${index * 0.1}s`,
                    }}
                />
            ))}
        </>
    );
};

export const StatCardSkeleton = () => {
    return (
        <div className="stat-card skeleton-card">
            <div className="stat-card-icon skeleton-icon" />
            <div className="stat-card-info">
                <LoadingSkeleton width="60px" height="32px" borderRadius="6px" />
                <LoadingSkeleton width="100px" height="16px" borderRadius="4px" className="mt-8" />
            </div>
        </div>
    );
};

export const TableRowSkeleton = ({ colCount = 4 }) => {
    return (
        <tr className="skeleton-row">
            {Array.from({ length: colCount }).map((_, index) => (
                <td key={index}>
                    <LoadingSkeleton width="80%" height="16px" />
                </td>
            ))}
        </tr>
    );
};

export default LoadingSkeleton;

