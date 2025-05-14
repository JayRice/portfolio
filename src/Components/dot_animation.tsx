import { useEffect, useRef, useState} from 'react'
import {yui} from "globals";

interface Props {
    count: number,
    velocity: number,
    stopDistance: number,
    mouseFadeDistance: number,
}
type Particle  = {
    id: number
    x: number
    y: number
    vx: number
    vy: number
    color: string
    radius: number
}
export default function DotAnimation({count, velocity, stopDistance, mouseFadeDistance} : Props) {

    const canvasref = useRef<HTMLCanvasElement>(null);
    const screenWidth = document.documentElement.clientWidth;
    const screenHeight = document.documentElement.clientHeight;
    const [boundaries, setBoundaries] = useState<[number, number]>([screenWidth, screenHeight]);

    const [particles, setParticles] = useState<Particle[]>([]);
    let mousePos = [screenWidth/2,screenHeight/2]
    let mouseInit = false;

    useEffect(() => {
        const canvas = canvasref.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        for (let i = 0; i < count; i++) {

            particles.push({
                id: i,
                x: Math.random() * boundaries[0],
                y: Math.random() * boundaries[1],
                vx: (Math.random() * velocity) - (velocity / 2) + (Math.random() < 0.5 ? 1:-1),
                vy: (Math.random() * velocity) - (velocity / 2) + (Math.random()  < 0.5 ? 1:-1),
                color: Math.random() < 0.9 ? "#16a0ff":"#fd1818",
                radius: 4
            })
            const particle = particles[particles.length - 1];
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x,particle.y, particle.radius,0, Math.PI * 2);
            ctx.fill();
        }
        // Mouse particle
        particles.push({
            id: -1,
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            color: Math.random() < 0.9 ? "#16a0ff":"#fd1818",
            radius: 4
        });

        setInterval(() => {
            const canvas = canvasref.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (mouseInit){
                const mouseParticle = particles[particles.length - 1];
                mouseParticle.x = mousePos[0];
                mouseParticle.y = mousePos[1];
            }
            for (let particle of particles) {

                particle.x += particle.vx;
                particle.y += particle.vy;
                ctx.fillStyle = particle.color;
                ctx.beginPath();
                ctx.arc(particle.x,particle.y, particle.radius,0, Math.PI * 2);
                ctx.fill();
                if (particle.id == -1) {continue};
                if (particle.x < 0){
                    particle.x = canvas.width;
                }
                if (particle.y < 0){
                    particle.y = canvas.height;
                }
                if (particle.x > canvas.width){
                    particle.x =  0;
                }
                if (particle.y > canvas.height){
                    particle.y = 0;
                }

            }


            for (let particle of particles) {
                if(particle.id == -1) {continue}
                for (let otherParticle of particles) {
                    if ( particle.id === otherParticle.id) {continue}

                    if(otherParticle.id == -1  && !mouseInit){continue}

                    const distance = Math.sqrt(Math.pow(particle.x - otherParticle.x, 2) +
                        Math.pow(particle.y - otherParticle.y, 2));
                    if ( distance < stopDistance ){
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = "white";
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }

                }
            }

        }, 10)




    }, []);




    return <canvas ref={canvasref} width={boundaries[0]} onMouseMove={(e) => {
        const canvas = canvasref.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mousePos = [x,y]
        mouseInit = true;

    }} height={boundaries[1]}/>;

}