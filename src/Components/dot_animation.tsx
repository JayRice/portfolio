import { useEffect, useRef, useState } from 'react';

type Color = { r: number; g: number; b: number };
type Particle = {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    color: string;
    radius: number;
};

type Props = {
    id?: string;
    className?: string;
    mode?: 'interactive' | 'uninteractive';
    stopDistance?: number;
    mouseFadeDistanceParticle?: number;
    mouseFadeDistanceLine?: number;
};

export default function ParticleCanvas({
                                           id,
                                           className = 'fixed top-0 left-0 w-screen h-screen z-[-1]',
                                           mode = 'interactive',
                                           stopDistance = 100,
                                           mouseFadeDistanceParticle = 250,
                                           mouseFadeDistanceLine = 250,
                                       }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mousePosRef = useRef<[number, number]>([window.innerWidth / 2, window.innerHeight / 2]);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const drawIntervalRef = useRef<NodeJS.Timer | null>(null);
    const initialAnimationTimeoutRef = useRef(800);
    const [, forceUpdate] = useState(0);

    const primaryColor: Color = { r: 116, g: 171, b: 255 };
    const secondaryColor: Color = { r: 255, g: 80, b: 120 };

    const resetDotAnimation = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const particles: Particle[] = [];

        const total = Math.floor((width * height) / 9000);

        for (let i = 0; i < total; i++) {
            const color = Math.random() < 0.5 ? 'blue' : 'pink';
            particles.push({
                id: i,
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() < 0.5 ? -1 : 1) * 0.1,
                vy: (Math.random() < 0.5 ? -1 : 1) * 0.1,
                color,
                radius: 2,
            });
        }

        if (mode === 'interactive') {
            particles.push({
                id: -1,
                x: 0,
                y: 0,
                vx: 0,
                vy: 0,
                color: 'blue',
                radius: 1,
            });
        }

        return particles;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;


        if(initialAnimationTimeoutRef.current <= 0) {return;}
        const interval = setInterval(() => {
            initialAnimationTimeoutRef.current -= 50;
            if (initialAnimationTimeoutRef.current <= 0) clearInterval(interval);
        }, 10);


        const resize = () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                particlesRef.current = resetDotAnimation();
                forceUpdate(n => n + 1);
            }, 1000);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            mousePosRef.current = [x+8, y+2];



        };

        const draw = () => {
            if (!canvasRef.current) return;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const particles = particlesRef.current;
            const [mouseX, mouseY] = mousePosRef.current;

            if (mode === 'interactive') {
                const mouseParticle = particles[particles.length - 1];
                mouseParticle.x = mouseX;
                mouseParticle.y = mouseY;
            }

            for (let particle of particles) {
                let alpha = 0.5;

                if (mode === 'interactive') {
                    const dist = Math.hypot(particle.x - mouseX, particle.y - mouseY);
                    const d = dist - initialAnimationTimeoutRef.current;
                    alpha = d < mouseFadeDistanceParticle ? 1 - d / mouseFadeDistanceParticle : 0;
                }

                const color = particle.color === 'blue'
                    ? `rgba(${primaryColor.r},${primaryColor.g},${primaryColor.b},${alpha})`
                    : `rgba(${secondaryColor.r},${secondaryColor.g},${secondaryColor.b},${alpha})`;

                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;

                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fill();
            }

            if (mode !== 'interactive') return;

            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];
                if (p1.id === -1) continue;

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    if (p2.id === -1) continue;

                    const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                    if (dist > stopDistance) continue;

                    const mouseDist = Math.hypot(mouseX - p1.x, mouseY - p1.y) - initialAnimationTimeoutRef.current;
                    const lineAlpha = mouseDist < mouseFadeDistanceLine ? 1 - mouseDist / mouseFadeDistanceLine : 0;

                    const stroke = `rgba(${primaryColor.r},${primaryColor.g},${primaryColor.b},${lineAlpha - 0.5})`;

                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = stroke;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        };

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particlesRef.current = resetDotAnimation();
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);

        drawIntervalRef.current = setInterval(draw, 10);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            if (drawIntervalRef.current) clearInterval(drawIntervalRef.current);
        };
    }, [mode]);

    return (
        <canvas ref={canvasRef} id={id} className={className} />
    );
}
