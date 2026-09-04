import { useEffect, useRef } from "react";

interface Point { x: number; y: number; radius: number; speed: number }

export function BackgroundField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    let points: Point[] = [];
    let frame = 0;

    const resize = () => {
      const ratio = Math.min(devicePixelRatio, 2);
      canvas.width = innerWidth * ratio;
      canvas.height = innerHeight * ratio;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      points = Array.from({ length: Math.min(55, Math.floor(innerWidth / 24)) }, () => ({
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
        radius: Math.random() * 1.2 + 0.2,
        speed: Math.random() * 0.1 + 0.03,
      }));
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, innerWidth, innerHeight);
      context.fillStyle = "rgba(204,255,51,.25)";
      points.forEach(point => {
        point.y -= point.speed;
        if (point.y < -3) point.y = innerHeight + 3;
        context.globalAlpha = 0.25 + Math.sin(time * 0.001 + point.x) * 0.16;
        context.beginPath();
        context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        context.fill();
      });
      frame = requestAnimationFrame(draw);
    };

    addEventListener("resize", resize);
    resize();
    frame = requestAnimationFrame(draw);
    return () => {
      removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas id="field" ref={canvasRef} aria-hidden="true" />;
}
