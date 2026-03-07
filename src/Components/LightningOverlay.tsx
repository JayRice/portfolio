import { useEffect, useRef, useState } from "react";

interface Point {
    x: number;
    y: number;
}

interface Bolt {
    id: number;
    path: string;
    branches: string[];
    opacity: number;
    flashA: Point;
    flashB: Point;
    hueShift: number;
}


function distance(a: Point, b: Point) {
    return Math.hypot(b.x - a.x, b.y - a.y);
}

function midpointDisplace(
    p1: Point,
    p2: Point,
    roughness: number,
    depth: number
): Point[] {
    if (depth === 0) return [p1, p2];

    const mid: Point = {
        x: (p1.x + p2.x) / 2 + (Math.random() - 0.5) * roughness,
        y: (p1.y + p2.y) / 2 + (Math.random() - 0.5) * roughness,
    };

    const left = midpointDisplace(p1, mid, roughness / 1.8, depth - 1);
    const right = midpointDisplace(mid, p2, roughness / 1.8, depth - 1);

    return [...left.slice(0, -1), ...right];
}

function pointsToPath(points: Point[]) {
    return points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
}

function buildLightningPoints(p1: Point, p2: Point): Point[] {
    const d = distance(p1, p2);
    const roughness = Math.min(Math.max(d * 0.18, 18), 70);
    const depth = d > 250 ? 5 : 4;
    return midpointDisplace(p1, p2, roughness, depth);
}

function buildBranch(points: Point[]): string | null {
    if (points.length < 4) return null;
    const startIndex = Math.floor(Math.random() * (points.length - 2)) + 1;
    const start = points[startIndex];
    const next = points[Math.min(startIndex + 1, points.length - 1)];

    const dx = next.x - start.x;
    const dy = next.y - start.y;

    const perpX = -dy;
    const perpY = dx;
    const mag = Math.hypot(perpX, perpY) || 1;

    const dir = Math.random() > 0.5 ? 1 : -1;
    const length = 25 + Math.random() * 45;

    const end: Point = {
        x: start.x + (perpX / mag) * length * dir + (Math.random() - 0.5) * 20,
        y: start.y + (perpY / mag) * length * dir + (Math.random() - 0.5) * 20,
    };

    return pointsToPath(midpointDisplace(start, end, 12, 3));
}

export function LightningOverlay({
                                     containerRef,
                                 }: {
    containerRef: React.RefObject<HTMLElement | null>;
}) {
    const svgRef = useRef<SVGSVGElement>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const extraTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

    const [bolts, setBolts] = useState<Bolt[]>([]);
    const [screenFlash, setScreenFlash] = useState(0);

    useEffect(() => {
        let boltId = 0;

        const spawnBolt = () => {
            const container = containerRef.current;
            const svg = svgRef.current;
            if (!container || !svg) return;

            const icons = container.querySelectorAll<HTMLElement>("[data-skill]");
            if (icons.length < 2) return;

            const rect = svg.getBoundingClientRect();
            const arr = Array.from(icons);

            const a = arr[Math.floor(Math.random() * arr.length)];
            let b = arr[Math.floor(Math.random() * arr.length)];
            while (b === a) {
                b = arr[Math.floor(Math.random() * arr.length)];
            }

            const ra = a.getBoundingClientRect();
            const rb = b.getBoundingClientRect();

            const p1: Point = {
                x: ra.left - rect.left + ra.width / 2,
                y: ra.top - rect.top + ra.height / 2,
            };

            const p2: Point = {
                x: rb.left - rect.left + rb.width / 2,
                y: rb.top - rect.top + rb.height / 2,
            };

            const points = buildLightningPoints(p1, p2);
            const path = pointsToPath(points);

            const branchCount = Math.floor(Math.random() * 3);
            const branches = Array.from({ length: branchCount })
                .map(() => buildBranch(points))
                .filter(Boolean) as string[];

            const id = boltId++;
            const hueShift = Math.floor(Math.random() * 18) - 9;

            setBolts((prev) => [
                ...prev,
                {
                    id,
                    path,
                    branches,
                    opacity: 1,
                    flashA: p1,
                    flashB: p2,
                    hueShift,
                },
            ]);

            setScreenFlash(0.18 + Math.random() * 0.12);

            const flicker1 = setTimeout(() => {
                setBolts((prev) =>
                    prev.map((b) =>
                        b.id === id ? { ...b, opacity: 0.45 + Math.random() * 0.35 } : b
                    )
                );
            }, 70);

            const flicker2 = setTimeout(() => {
                setBolts((prev) =>
                    prev.map((b) =>
                        b.id === id ? { ...b, opacity: 0.9 } : b
                    )
                );
            }, 130);

            const fadeTimeout = setTimeout(() => {
                setBolts((prev) =>
                    prev.map((b) => (b.id === id ? { ...b, opacity: 0 } : b))
                );
                setScreenFlash(0);
            }, 260);

            const removeTimeout = setTimeout(() => {
                setBolts((prev) => prev.filter((b) => b.id !== id));
            }, 520);

            extraTimeoutsRef.current.push(
                flicker1,
                flicker2,
                fadeTimeout,
                removeTimeout
            );
        };

        const loop = () => {
            spawnBolt();
            timeoutRef.current = setTimeout(loop, 500 + Math.random() * 900);
        };

        timeoutRef.current = setTimeout(loop, 400);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            extraTimeoutsRef.current.forEach(clearTimeout);
            extraTimeoutsRef.current = [];
        };
    }, [containerRef]);

    return (
        <>
            <div
                className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-150"
                style={{
                    opacity: screenFlash,
                    background:
                        "radial-gradient(circle at center, rgba(180,220,255,0.22), rgba(120,170,255,0.08) 30%, transparent 70%)",
                }}
            />

            <svg
                ref={svgRef}
                className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible"
            >
                <defs>
                    <filter id="lightning-blur-lg">
                        <feGaussianBlur stdDeviation="8" />
                    </filter>

                    <filter id="lightning-blur-md">
                        <feGaussianBlur stdDeviation="3" />
                    </filter>
                </defs>

                {bolts.map((bolt) => {
                    const outer = `hsl(${210 + bolt.hueShift} 100% 72%)`;
                    const mid = `hsl(${205 + bolt.hueShift} 100% 82%)`;
                    const core = `hsl(${215 + bolt.hueShift} 100% 95%)`;

                    return (
                        <g key={bolt.id}>
                            <circle
                                cx={bolt.flashA.x}
                                cy={bolt.flashA.y}
                                r={14}
                                fill={outer}
                                opacity={bolt.opacity * 0.22}
                                filter="url(#lightning-blur-lg)"
                            />
                            <circle
                                cx={bolt.flashB.x}
                                cy={bolt.flashB.y}
                                r={14}
                                fill={outer}
                                opacity={bolt.opacity * 0.22}
                                filter="url(#lightning-blur-lg)"
                            />

                            <path
                                d={bolt.path}
                                stroke={outer}
                                strokeWidth={10}
                                fill="none"
                                opacity={bolt.opacity * 0.18}
                                filter="url(#lightning-blur-lg)"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d={bolt.path}
                                stroke={mid}
                                strokeWidth={5}
                                fill="none"
                                opacity={bolt.opacity * 0.35}
                                filter="url(#lightning-blur-md)"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d={bolt.path}
                                stroke={outer}
                                strokeWidth={2.2}
                                fill="none"
                                opacity={bolt.opacity}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d={bolt.path}
                                stroke={core}
                                strokeWidth={1}
                                fill="none"
                                opacity={bolt.opacity}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />

                            {bolt.branches.map((branch, i) => (
                                <g key={i}>
                                    <path
                                        d={branch}
                                        stroke={outer}
                                        strokeWidth={5}
                                        fill="none"
                                        opacity={bolt.opacity * 0.12}
                                        filter="url(#lightning-blur-md)"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d={branch}
                                        stroke={mid}
                                        strokeWidth={1.4}
                                        fill="none"
                                        opacity={bolt.opacity * 0.8}
                                        strokeLinecap="round"
                                    />
                                </g>
                            ))}
                        </g>
                    );
                })}
            </svg>
        </>
    );
}