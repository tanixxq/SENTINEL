
import { useEffect, useMemo, useState } from "react";
import {
    Activity,
    ArrowUpRight,
    CheckCircle2,
    Clock3,
    Server,
    AlertCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import {
    LineChart,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import api from "../services/api";

function Dashboard() {
    const [monitors, setMonitors] = useState([]);
    const [dashboards, setDashboards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await api.get("/monitors");
                const monitorList = response.data;

                setMonitors(monitorList);

                if (monitorList.length === 0) {
                    setDashboards([]);
                    return;
                }

                const dashboardResponses = await Promise.all(
                    monitorList.map((monitor) =>
                        api.get(`/monitors/${monitor._id}/dashboard`)
                    )
                );

                setDashboards(
                    dashboardResponses.map((response) => response.data)
                );
            } catch (error) {
                console.error(error);
                setError("Failed to load dashboard data.");
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, []);

    const stats = useMemo(() => {
        if (dashboards.length === 0) {
            return {
                uptime: 0,
                averageResponseTime: 0,
                activeIncidents: 0
            };
        }

        let totalChecks = 0;
        let successfulChecks = 0;
        let totalResponse = 0;
        let activeIncidents = 0;

        dashboards.forEach((dashboard) => {
            const metrics = dashboard.metrics;

            totalChecks += metrics.totalChecks;
            successfulChecks +=
                Math.round(
                    (metrics.uptime / 100) * metrics.totalChecks
                );

            totalResponse +=
                metrics.averageResponseTime * metrics.totalChecks;

            activeIncidents += dashboard.incidents.active;
        });

        return {
            uptime:
                totalChecks === 0
                    ? 0
                    : (successfulChecks / totalChecks) * 100,
            averageResponseTime:
                totalChecks === 0
                    ? 0
                    : totalResponse / totalChecks,
            activeIncidents
        };
    }, [dashboards]);

    const chartData = useMemo(() => {
        const checks = dashboards
            .flatMap((dashboard) => dashboard.recentChecks || [])
            .sort(
                (a, b) =>
                    new Date(a.checkedAt) - new Date(b.checkedAt)
            )
            .slice(-10);

        return checks.map((check) => ({
            time: new Date(check.checkedAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            }),
            responseTime: check.responseTime || 0
        }));
    }, [dashboards]);

    const recentActivity = useMemo(() => {
        return dashboards
            .flatMap((dashboard) =>
                (dashboard.recentChecks || []).map((check) => ({
                    ...check,
                    monitorName:
                        dashboard.monitor.name || dashboard.monitor.url
                }))
            )
            .sort(
                (a, b) =>
                    new Date(b.checkedAt) - new Date(a.checkedAt)
            )
            .slice(0, 5);
    }, [dashboards]);

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto h-5 w-5 animate-spin rounded-full border-2 border-zinc-700 border-t-emerald-400" />
                    <p className="mt-4 text-xs text-zinc-600">
                        Loading dashboard...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="text-center">
                    <AlertCircle
                        size={18}
                        className="mx-auto text-red-400/70"
                    />
                    <p className="mt-3 text-sm text-zinc-400">
                        {error}
                    </p>
                    <p className="mt-1 text-[11px] text-zinc-700">
                        Check that the backend is running and try again.
                    </p>
                </div>
            </div>
        );
    }

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
                    value={monitors.length}
                    icon={Server}
                    description={
                        monitors.length === 1
                            ? "1 service monitored"
                            : `${monitors.length} services monitored`
                    }
                />

                <StatCard
                    label="Uptime"
                    value={
                        dashboards.length === 0
                            ? "—"
                            : `${stats.uptime.toFixed(2)}%`
                    }
                    icon={Activity}
                    description="Across all checks"
                    positive={dashboards.length > 0 && stats.uptime >= 99}
                />

                <StatCard
                    label="Avg. response"
                    value={
                        dashboards.length === 0
                            ? "—"
                            : `${Math.round(stats.averageResponseTime)} ms`
                    }
                    icon={Clock3}
                    description="Across all checks"
                />

                <StatCard
                    label="Incidents"
                    value={stats.activeIncidents}
                    icon={CheckCircle2}
                    description={
                        stats.activeIncidents === 0
                            ? "No active incidents"
                            : "Active incidents"
                    }
                    positive={stats.activeIncidents === 0}
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
                                Latest monitor response times
                            </p>
                        </div>

                        <span className="text-[11px] text-zinc-600">
                            Latest checks
                        </span>
                    </div>

                    <div className="h-[280px] px-3 py-6">
                        {chartData.length === 0 ? (
                            <div className="flex h-full items-center justify-center">
                                <div className="text-center">
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
                                        Checks will appear here once monitoring
                                        begins.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData}>
                                    <XAxis
                                        dataKey="time"
                                        tick={{
                                            fill: "#52525b",
                                            fontSize: 10
                                        }}
                                        axisLine={false}
                                        tickLine={false}
                                    />

                                    <YAxis
                                        tick={{
                                            fill: "#52525b",
                                            fontSize: 10
                                        }}
                                        axisLine={false}
                                        tickLine={false}
                                        width={35}
                                    />

                                    <Tooltip
                                        contentStyle={{
                                            background: "#111318",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                            borderRadius: "8px",
                                            fontSize: "11px"
                                        }}
                                        labelStyle={{
                                            color: "#a1a1aa"
                                        }}
                                        formatter={(value) => [
                                            `${value} ms`,
                                            "Response"
                                        ]}
                                    />

                                    <Line
                                        type="monotone"
                                        dataKey="responseTime"
                                        stroke="#34d399"
                                        strokeWidth={2}
                                        dot={false}
                                        activeDot={{ r: 4 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0b0d10]">
                    <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
                        <div>
                            <h2 className="text-sm font-medium text-zinc-200">
                                Recent activity
                            </h2>

                            <p className="mt-1 text-[11px] text-zinc-600">
                                Latest monitor checks
                            </p>
                        </div>

                        <ArrowUpRight
                            size={15}
                            className="text-zinc-700"
                        />
                    </div>

                    {recentActivity.length === 0 ? (
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
                                    Your monitor checks and incidents will
                                    appear here.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="divide-y divide-white/[0.05]">
                            {recentActivity.map((activity, index) => (
                                <div
                                    key={`${activity.checkedAt}-${index}`}
                                    className="flex items-center justify-between px-5 py-4"
                                >
                                    <div className="flex min-w-0 items-center gap-3">
                                        <span
                                            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                                                activity.status === "UP"
                                                    ? "bg-emerald-400"
                                                    : "bg-red-400"
                                            }`}
                                        />

                                        <div className="min-w-0">
                                            <p className="truncate text-xs text-zinc-300">
                                                {activity.monitorName}
                                            </p>

                                            <p className="mt-1 text-[10px] text-zinc-700">
                                                {activity.status} ·{" "}
                                                {activity.responseTime ?? "—"} ms
                                            </p>
                                        </div>
                                    </div>

                                    <span className="ml-3 shrink-0 text-[10px] text-zinc-700">
                                        {formatRelativeTime(
                                            activity.checkedAt
                                        )}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
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
                        {monitors.length}{" "}
                        {monitors.length === 1 ? "monitor" : "monitors"}
                    </span>
                </div>

                {monitors.length === 0 ? (
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
                                Sentinel will continuously check its
                                availability and response time.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="divide-y divide-white/[0.05]">
                        {monitors.map((monitor) => (
                            <div
                                key={monitor._id}
                                className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div className="flex min-w-0 items-center gap-3">
                                    <span
                                        className={`h-2 w-2 shrink-0 rounded-full ${
                                            monitor.status === "UP"
                                                ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"
                                                : monitor.status === "DOWN"
                                                ? "bg-red-400"
                                                : "bg-amber-400"
                                        }`}
                                    />

                                    <div className="min-w-0">
                                        <p className="truncate text-xs font-medium text-zinc-300">
                                            {monitor.name || monitor.url}
                                        </p>

                                        <p className="mt-1 truncate text-[10px] text-zinc-700">
                                            {monitor.url}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 text-[10px]">
                                    <div>
                                        <p className="text-zinc-700">
                                            Status
                                        </p>
                                        <p
                                            className={`mt-1 ${
                                                monitor.status === "UP"
                                                    ? "text-emerald-400/70"
                                                    : monitor.status === "DOWN"
                                                    ? "text-red-400/70"
                                                    : "text-amber-400/70"
                                            }`}
                                        >
                                            {monitor.status}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-zinc-700">
                                            Response
                                        </p>
                                        <p className="mt-1 text-zinc-400">
                                            {monitor.responseTime != null
                                                ? `${monitor.responseTime} ms`
                                                : "—"}
                                        </p>
                                    </div>

                                    <div className="hidden sm:block">
                                        <p className="text-zinc-700">
                                            Last checked
                                        </p>
                                        <p className="mt-1 text-zinc-400">
                                            {monitor.lastCheckedAt
                                                ? formatRelativeTime(
                                                      monitor.lastCheckedAt
                                                  )
                                                : "Never"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
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

function formatRelativeTime(date) {
    if (!date) {
        return "Never";
    }

    const diff = Date.now() - new Date(date).getTime();
    const seconds = Math.floor(diff / 1000);

    if (seconds < 60) {
        return `${Math.max(seconds, 0)}s ago`;
    }

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) {
        return `${minutes}m ago`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
        return `${hours}h ago`;
    }

    const days = Math.floor(hours / 24);

    return `${days}d ago`;
}

export default Dashboard;

