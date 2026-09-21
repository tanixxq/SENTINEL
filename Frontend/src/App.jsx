
import { Routes, Route, Navigate, Link } from "react-router-dom";

import {
    Activity,
    ArrowRight,
    ArrowUpRight,
    CheckCircle2,
    Clock3,
    Server,
    ShieldCheck
} from "lucide-react";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoutes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuth } from "./context/AuthContext";

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
                                                style={{ height: `${height}%` }}
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

function Dashboard() {
    return (
        <div className="space-y-8">
            <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                    <div className="mb-3 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-400/70">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
                        Live overview
                    </div>

                    <h1 className="text-3xl font-semibold tracking-[-0.03em] text-zinc-100">
                        Good morning.
                    </h1>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">
                        Keep an eye on your services, uptime and incidents from
                        one place.
                    </p>
                </div>

                <Link
                    to="/monitors"
                    className="flex h-10 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.05] px-4 text-xs font-medium text-zinc-200 transition hover:border-white/15 hover:bg-white/[0.08]"
                >
                    <Server size={14} />
                    Add monitor
                </Link>
            </section>

            <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    label="Monitors"
                    value="0"
                    icon={Server}
                    description="No monitors yet"
                />

                <StatCard
                    label="Uptime"
                    value="—"
                    icon={Activity}
                    description="Last 30 days"
                />

                <StatCard
                    label="Avg. response"
                    value="—"
                    icon={Clock3}
                    description="Across all monitors"
                />

                <StatCard
                    label="Incidents"
                    value="0"
                    icon={CheckCircle2}
                    description="No active incidents"
                    positive
                />
            </section>

            <section className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
                <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0b0d10]">
                    <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
                        <div>
                            <h2 className="text-sm font-medium text-zinc-200">
                                Response time
                            </h2>

                            <p className="mt-1 text-[11px] text-zinc-600">
                                Average latency across your monitors
                            </p>
                        </div>

                        <button className="text-[11px] text-zinc-600 transition hover:text-zinc-300">
                            Last 24h
                        </button>
                    </div>

                    <div className="relative flex h-[280px] items-center justify-center overflow-hidden">
                        <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-white/[0.045]" />
                        <div className="absolute inset-y-0 left-1/4 border-l border-dashed border-white/[0.035]" />
                        <div className="absolute inset-y-0 left-1/2 border-l border-dashed border-white/[0.035]" />
                        <div className="absolute inset-y-0 left-3/4 border-l border-dashed border-white/[0.035]" />

                        <div className="relative text-center">
                            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.025]">
                                <Activity
                                    size={17}
                                    className="text-zinc-600"
                                />
                            </div>

                            <p className="text-xs font-medium text-zinc-400">
                                No monitoring data
                            </p>

                            <p className="mt-1 text-[11px] text-zinc-700">
                                Add a monitor to start collecting data
                            </p>
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0b0d10]">
                    <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
                        <div>
                            <h2 className="text-sm font-medium text-zinc-200">
                                Recent activity
                            </h2>

                            <p className="mt-1 text-[11px] text-zinc-600">
                                Latest monitor events
                            </p>
                        </div>

                        <ArrowUpRight
                            size={15}
                            className="text-zinc-700"
                        />
                    </div>

                    <div className="flex h-[280px] items-center justify-center px-6">
                        <div className="text-center">
                            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.025]">
                                <CheckCircle2
                                    size={17}
                                    className="text-zinc-600"
                                />
                            </div>

                            <p className="text-xs font-medium text-zinc-400">
                                Nothing here yet
                            </p>

                            <p className="mx-auto mt-1 max-w-[220px] text-[11px] leading-5 text-zinc-700">
                                Your monitor checks and incidents will appear
                                here.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0b0d10]">
                <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
                    <div>
                        <h2 className="text-sm font-medium text-zinc-200">
                            Monitors
                        </h2>

                        <p className="mt-1 text-[11px] text-zinc-600">
                            Services currently being watched
                        </p>
                    </div>

                    <span className="rounded-md border border-white/[0.06] bg-white/[0.025] px-2 py-1 text-[10px] text-zinc-600">
                        0 monitors
                    </span>
                </div>

                <div className="flex min-h-[170px] items-center justify-center">
                    <div className="text-center">
                        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.025]">
                            <Server
                                size={17}
                                className="text-zinc-600"
                            />
                        </div>

                        <p className="text-xs font-medium text-zinc-400">
                            Start monitoring your first service
                        </p>

                        <p className="mt-1 text-[11px] text-zinc-700">
                            Sentinel will continuously check its availability
                            and response time.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

function StatCard({
    label,
    value,
    icon: Icon,
    description,
    positive
}) {
    return (
        <div className="group rounded-2xl border border-white/[0.07] bg-[#0b0d10] p-5 transition-all duration-200 hover:border-white/[0.11] hover:bg-[#0d0f12]">
            <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-600">
                    {label}
                </span>

                <Icon
                    size={15}
                    className={
                        positive
                            ? "text-emerald-400/70"
                            : "text-zinc-700 group-hover:text-zinc-500"
                    }
                />
            </div>

            <div className="mt-5">
                <p className="text-3xl font-semibold tracking-[-0.04em] text-zinc-100">
                    {value}
                </p>

                <p
                    className={`mt-2 text-[11px] ${
                        positive
                            ? "text-emerald-400/60"
                            : "text-zinc-700"
                    }`}
                >
                    {description}
                </p>
            </div>
        </div>
    );
}

function Placeholder({ title }) {
    return (
        <div className="flex min-h-[60vh] items-center justify-center">
            <div className="text-center">
                <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-700">
                    Sentinel
                </p>

                <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-zinc-200">
                    {title}
                </h1>

                <p className="mt-2 text-sm text-zinc-600">
                    This section is being built.
                </p>
            </div>
        </div>
    );
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomeRedirect />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/monitors"
                        element={<Placeholder title="Monitors" />}
                    />

                    <Route
                        path="/incidents"
                        element={<Placeholder title="Incidents" />}
                    />

                    <Route
                        path="/settings"
                        element={<Placeholder title="Settings" />}
                    />
                </Route>
            </Route>

            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />
        </Routes>
    );
}

export default App;

