"use client";

import { useState, MouseEvent } from "react";

export const useMouseTransform = () => {
    const [transform, setTransform] = useState({ x: 0, y: 0 });

    const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY, currentTarget } = e;
        const { width, height, left, top } = currentTarget.getBoundingClientRect();

        // Reduced the factor from 25 to 15 to make the tilt more noticeable
        const x = (clientX - left - width / 2) / 15;
        const y = (clientY - top - height / 2) / 15;

        // Inverting y to make it feel more natural (tilt towards the mouse)
        setTransform({ x, y: -y });
    };

    const onMouseLeave = () => {
        setTransform({ x: 0, y: 0 });
    };

    return { transform, onMouseMove, onMouseLeave };
};