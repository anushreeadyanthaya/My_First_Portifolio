import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function Scene3D({ theme = 'dark' }) {
  const canvasRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let isVisible = true;
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    // Mouse coordinates with dampening
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const relativeX = e.clientX - rect.left - width / 2;
      const relativeY = e.clientY - rect.top - height / 2;
      mouse.targetX = relativeX * 0.0008;
      mouse.targetY = relativeY * 0.0008;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Visibility observer to pause animation when out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    // Generate 3D point cloud (icosahedron / cyber geometric field)
    const isMobile = width < 768;
    const pointCount = isMobile ? 32 : 64;
    const points = [];
    const radius = Math.min(width, height) * 0.42;

    for (let i = 0; i < pointCount; i++) {
      // Fibonacci sphere distribution for uniform 3D geometry
      const theta = Math.acos(1 - (2 * (i + 0.5)) / pointCount);
      const phi = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);

      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);

      points.push({
        origX: x,
        origY: y,
        origZ: z,
        x,
        y,
        z,
        baseSize: Math.random() * 2 + 1.5,
        colorType: i % 3 === 0 ? 'violet' : i % 3 === 1 ? 'blue' : 'cyan'
      });
    }

    let angleX = 0;
    let angleY = 0;

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Rotation speeds
      if (!prefersReducedMotion) {
        angleX += 0.003 + mouse.y * 0.1;
        angleY += 0.004 + mouse.x * 0.1;
      }

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // Project points
      const projected = [];
      const fov = 420;
      const centerX = width / 2;
      const centerY = height / 2;

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // 3D Rotation Matrix
        // Rotate around Y axis
        let x1 = p.origX * cosY - p.origZ * sinY;
        let z1 = p.origZ * cosY + p.origX * sinY;

        // Rotate around X axis
        let y1 = p.origY * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.origY * sinX;

        // Perspective projection
        const depth = z2 + radius * 1.5;
        if (depth > 0) {
          const scale = fov / depth;
          const px = centerX + x1 * scale;
          const py = centerY + y1 * scale;
          projected.push({
            x: px,
            y: py,
            z: z2,
            scale,
            colorType: p.colorType,
            size: p.baseSize * scale
          });
        }
      }

      // Draw connecting lines between close points
      const maxDist = isMobile ? 70 : 95;
      const isDark = theme === 'dark';

      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.35;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            
            if (isDark) {
              ctx.strokeStyle = `rgba(38, 139, 255, ${alpha})`;
            } else {
              ctx.strokeStyle = `rgba(2, 101, 210, ${alpha * 0.7})`;
            }
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw 3D nodes
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, p.size), 0, Math.PI * 2);

        if (isDark) {
          if (p.colorType === 'violet') {
            ctx.fillStyle = 'rgba(149, 102, 255, 0.85)';
            ctx.shadowColor = '#9566FF';
            ctx.shadowBlur = 8;
          } else if (p.colorType === 'cyan') {
            ctx.fillStyle = 'rgba(0, 229, 255, 0.85)';
            ctx.shadowColor = '#00E5FF';
            ctx.shadowBlur = 8;
          } else {
            ctx.fillStyle = 'rgba(38, 139, 255, 0.85)';
            ctx.shadowColor = '#268BFF';
            ctx.shadowBlur = 8;
          }
        } else {
          ctx.fillStyle = 'rgba(2, 101, 210, 0.7)';
          ctx.shadowBlur = 0;
        }

        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [prefersReducedMotion, theme]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-60 dark:opacity-60 light:opacity-30 transition-opacity duration-500"
      />
    </div>
  );
}
