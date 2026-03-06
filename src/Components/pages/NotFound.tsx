import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"

export default function NotFound() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
            {/* Subtle grid background */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                    backgroundSize: "64px 64px",
                }}
            />

            <div className="relative text-center max-w-md mx-auto">
                {/* Big 404 */}
                <div className="relative mb-6">
          <span
              className="text-[180px] font-black leading-none select-none"
              style={{
                  background: "linear-gradient(135deg, #27272a 0%, #3f3f46 50%, #27272a 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "-0.05em",
              }}
          >
            404
          </span>
                    {/* Accent line */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 h-[2px] w-24 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
                </div>

                {/* Message */}
                <h1 className="text-white text-2xl font-semibold tracking-tight mb-3">
                    Page not found
                </h1>
                <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                    The page you're looking for doesn't exist or has been moved.
                </p>

                {/* Actions */}
                <div className="flex items-center justify-center gap-3">
                    <Button
                        onClick={() => navigate(-1)}
                        variant="outline"
                        className="border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all"
                    >
                        Go back
                    </Button>
                    <Button
                        onClick={() => navigate("/")}
                        className="bg-orange-500 hover:bg-orange-400 text-white transition-all"
                    >
                        Go home
                    </Button>
                </div>
            </div>
        </div>
    )
}