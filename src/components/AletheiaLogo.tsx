"use client";

import React from 'react';

interface AletheiaLogoProps {
    className?: string;
    size?: number;
}

export function AletheiaLogo({ className = "", size = 24 }: AletheiaLogoProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Geometric "A" integrated with an Eye */}
            <path
                d="M12 4L4 20H8L10 15H14L16 20H20L12 4Z"
                className="fill-accent opacity-20"
            />
            <path
                d="M12 6L5.5 19H8.5L10 15H14L15.5 19H18.5L12 6Z"
                fill="currentColor"
                className="text-accent"
            />
            {/* The "Eye" pupil/center */}
            <circle
                cx="12"
                cy="14"
                r="2"
                fill="currentColor"
                className="text-accent-hover animate-pulse"
            />
            {/* Outer eye orbit */}
            <path
                d="M4 14C4 14 7 9 12 9C17 9 20 14 20 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="text-accent/60"
            />
        </svg>
    );
}
