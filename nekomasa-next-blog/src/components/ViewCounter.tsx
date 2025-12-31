'use client';

import { useEffect, useState } from 'react';

interface ViewCounterProps {
    id: string;
    initialViews?: number;
}

export default function ViewCounter({ id, initialViews = 0 }: ViewCounterProps) {
    const [views, setViews] = useState<number>(initialViews);

    useEffect(() => {
        const incrementView = async () => {
            try {
                const res = await fetch('/api/incr', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id }),
                });

                if (res.ok) {
                    const data = await res.json();
                    setViews(data.views);
                } else {
                    console.error('Failed to increment views');
                }
            } catch (error) {
                console.error('Error incrementing views:', error);
            }
        };

        incrementView();
    }, [id]);

    return (
        <span className="text-gray-500 text-sm flex items-center gap-1">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
            </svg>
            {views.toLocaleString()} views
        </span>
    );
}
