import React, { useEffect, useRef } from 'react';

/**
 * Floating Golden Dust & Star Sparkles
 * Smooth, lightweight HTML5 Canvas ambient particle animation
 */
export default function BackgroundParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle pool: golden dust, tiny stars, soft warm orbs
    const particleCount = window.innerWidth < 768 ? 32 : 55;
    const particles = [];

    const colors = [
      'rgba(212, 175, 55, 0.7)',  // antique gold
      'rgba(245, 220, 153, 0.8)', // bright gold
      'rgba(255, 253, 245, 0.6)', // ivory star
      'rgba(236, 200, 105, 0.5)', // warm gold
      'rgba(244, 180, 26, 0.4)',  // marigold ember
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.4 + 0.6,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.35,
        vy: -0.2 - Math.random() * 0.45, // floating gently upwards
        alpha: Math.random() * 0.8 + 0.2,
        pulseSpeed: 0.015 + Math.random() * 0.02,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Pulse alpha
        const currentAlpha = Math.max(
          0.1,
          p.alpha * (0.6 + 0.4 * Math.sin(time * p.pulseSpeed * 100 + p.pulseOffset))
        );

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/g, `${currentAlpha})`);
        ctx.shadowBlur = p.size > 2 ? 8 : 4;
        ctx.shadowColor = '#d4af37';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
      style={{ mixBlendMode: 'screen' }}
      aria-hidden="true"
    />
  );
}
