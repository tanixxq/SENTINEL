
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
    Activity,
    ArrowUpRight,
    CheckCircle2,
    Clock3,
    Server
} from "lucide-react";
import Layout from "./components/Layout";

function Dashboard() {
    return (
        <div className="space-y-8">
            <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                    <div className="mb-3 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-400/70">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Live overview
                    </div>

                    <h1 className="text-3xl font-semibold tracking-[-0.03em] text-zinc-100">
                        Good morning.
                    </h1>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">
                        Keep an eye on your services, uptime and incidents
                        from one place.
                    </p>
                </div>

                <button className="flex h-10 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.05] px-4 text-xs font-medium text-zinc-200 transition hover:border-white/15 hover:bg-white/[0.08]">
                    <Server size={14} />
                    Add monitor
                </button>
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

function StatCard({ label, value, icon: Icon, description, positive }) {
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
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Dashboard />} />
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
            </Routes>
        </BrowserRouter>
    );
}

export default App;

