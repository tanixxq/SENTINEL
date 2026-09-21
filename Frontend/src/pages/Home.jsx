
import {
    Activity,
    ArrowRight,
    ArrowUpRight,
    CheckCircle2,
    Clock3,
    ShieldCheck
} from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
    return (
        <div className="min-h-screen bg-[#070809] text-zinc-100">
            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.06),transparent_38%)]" />
            <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />

            <header className="relative z-10 flex h-[76px] items-center justify-between border-b border-white/[0.07] px-6 sm:px-10">
                <Link to="/" className="flex items-center gap-3">
                    <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]">
                        <Activity size={18} className="text-zinc-100" />
                        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                    </div>

                    <div>
                        <p className="text-[13px] font-semibold tracking-[0.2em]">
                            SENTINEL
                        </p>

                        <p className="mt-0.5 text-[9px] uppercase tracking-[0.18em] text-zinc-600">
                            Reliability
                        </p>
                    </div>
                </Link>

                <div className="flex items-center gap-3">
                    <Link
                        to="/login"
                        className="rounded-lg px-3 py-2 text-xs text-zinc-500 transition hover:text-zinc-200"
                    >
                        Sign in
                    </Link>

                    <Link
                        to="/register"
                        className="flex items-center gap-2 rounded-lg bg-zinc-100 px-4 py-2.5 text-xs font-medium text-black transition hover:bg-white"
                    >
                        Get started
                        <ArrowRight size={14} />
                    </Link>
                </div>
            </header>

            <main className="relative z-10 mx-auto flex min-h-[calc(100vh-76px)] max-w-6xl items-center px-6 py-20 sm:px-10">
                <div className="grid w-full items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
                    <section>
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/[0.045] px-3 py-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />

                            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-emerald-400/80">
                                Website reliability monitoring
                            </span>
                        </div>

                        <h1 className="max-w-2xl text-5xl font-semibold leading-[1.05] tracking-[-0.055em] text-zinc-100 sm:text-7xl">
                            Know when your
                            <span className="block text-zinc-500">
                                services go quiet.
                            </span>
                        </h1>

                        <p className="mt-7 max-w-xl text-base leading-7 text-zinc-500 sm:text-lg">
                            Sentinel continuously monitors your websites,
                            tracks response times, detects incidents and
                            alerts you when something goes wrong.
                        </p>

                        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                            <Link
                                to="/register"
                                className="group flex h-12 items-center justify-center gap-2 rounded-lg bg-zinc-100 px-6 text-sm font-medium text-black transition hover:bg-white"
                            >
                                Start monitoring
                                <ArrowRight
                                    size={16}
                                    className="transition-transform group-hover:translate-x-0.5"
                                />
                            </Link>

                            <Link
                                to="/login"
                                className="flex h-12 items-center justify-center rounded-lg border border-white/[0.09] bg-white/[0.025] px-6 text-sm font-medium text-zinc-300 transition hover:border-white/[0.16] hover:bg-white/[0.05]"
                            >
                                Sign in to dashboard
                            </Link>
                        </div>

                        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[11px] text-zinc-600">
                            <div className="flex items-center gap-2">
                                <CheckCircle2
                                    size={14}
                                    className="text-emerald-400/70"
                                />
                                Scheduled checks
                            </div>

                            <div className="flex items-center gap-2">
                                <CheckCircle2
                                    size={14}
                                    className="text-emerald-400/70"
                                />
                                Incident alerts
                            </div>

                            <div className="flex items-center gap-2">
                                <CheckCircle2
                                    size={14}
                                    className="text-emerald-400/70"
                                />
                                Response analytics
                            </div>
                        </div>
                    </section>

                    <section className="relative">
                        <div className="absolute -inset-10 rounded-full bg-emerald-400/[0.025] blur-3xl" />

                        <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0b0d10] shadow-[0_30px_100px_rgba(0,0,0,0.3)]">
                            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />

                                    <span className="text-[11px] font-medium text-zinc-300">
                                        System overview
                                    </span>
                                </div>

                                <span className="text-[10px] uppercase tracking-[0.12em] text-zinc-700">
                                    Live
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-px bg-white/[0.06]">
                                <div className="bg-[#0b0d10] p-5">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] uppercase tracking-[0.14em] text-zinc-600">
                                            Uptime
                                        </span>

                                        <Activity
                                            size={14}
                                            className="text-emerald-400/60"
                                        />
                                    </div>

                                    <p className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-zinc-100">
                                        99.99%
                                    </p>

                                    <p className="mt-2 text-[10px] text-emerald-400/60">
                                        Within expected range
                                    </p>
                                </div>

                                <div className="bg-[#0b0d10] p-5">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] uppercase tracking-[0.14em] text-zinc-600">
                                            Response
                                        </span>

                                        <Clock3
                                            size={14}
                                            className="text-zinc-600"
                                        />
                                    </div>

                                    <p className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-zinc-100">
                                        142
                                        <span className="ml-1 text-sm font-normal text-zinc-600">
                                            ms
                                        </span>
                                    </p>

                                    <p className="mt-2 text-[10px] text-zinc-600">
                                        Average latency
                                    </p>
                                </div>
                            </div>

                            <div className="p-5">
                                <div className="mb-5 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-medium text-zinc-300">
                                            Service health
                                        </p>

                                        <p className="mt-1 text-[10px] text-zinc-600">
                                            Recent monitoring activity
                                        </p>
                                    </div>

                                    <ShieldCheck
                                        size={16}
                                        className="text-emerald-400/60"
                                    />
                                </div>

                                <div className="flex h-32 items-end gap-1.5">
                                    {[42, 55, 48, 68, 60, 78, 72, 88, 76, 94, 82, 96, 90, 100, 92, 100, 96, 100].map(
                                        (height, index) => (
                                            <div
                                                key={index}
                                                className="flex-1 rounded-sm bg-emerald-400/40 transition hover:bg-emerald-400/70"
                                                style={{
                                                    height: `${height}%`
                                                }}
                                            />
                                        )
                                    )}
                                </div>

                                <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-4">
                                    <div className="flex items-center gap-2">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                                        <span className="text-[10px] text-zinc-500">
                                            All systems operational
                                        </span>
                                    </div>

                                    <ArrowUpRight
                                        size={14}
                                        className="text-zinc-700"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

function HomeRedirect() {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Home />;
}

export default HomeRedirect;

