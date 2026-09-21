
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, RefreshCw } from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import api from "../services/api";

function MonitorDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [monitor, setMonitor] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchMonitorDetails = async () => {
        try {
            setLoading(true);
            setError("");

            const [monitorResponse, historyResponse] = await Promise.all([
                api.get(`/monitors/${id}`),
                api.get(`/monitors/${id}/history`)
            ]);

            setMonitor(monitorResponse.data);
            setHistory(historyResponse.data);
        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to load monitor details."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMonitorDetails();
    }, [id]);

    const chartData = [...history]
        .reverse()
        .map((check) => ({
            time: new Date(check.checkedAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            }),
            responseTime: check.responseTime
        }));

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-700 border-t-emerald-400" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-5">
                <button
                    onClick={() => navigate("/monitors")}
                    className="inline-flex items-center gap-2 text-xs text-zinc-500 transition hover:text-zinc-200"
                >
                    <ArrowLeft size={14} />
                    Back to monitors
                </button>

                <div className="rounded-xl border border-red-400/10 bg-red-400/[0.04] px-4 py-3 text-xs text-red-400/70">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <section>
                <button
                    onClick={() => navigate("/monitors")}
                    className="mb-6 inline-flex items-center gap-2 text-xs text-zinc-600 transition hover:text-zinc-300"
                >
                    <ArrowLeft size={14} />
                    Back to monitors
                </button>

                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                    <div>
                        <div className="mb-3 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-400/70">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
                            Monitor
                        </div>

                        <h1 className="text-3xl font-semibold tracking-[-0.03em] text-zinc-100">
                            {monitor.name || "Unnamed monitor"}
                        </h1>

                        <p className="mt-2 max-w-xl truncate text-sm text-zinc-500">
                            {monitor.url}
                        </p>
                    </div>

                    <button
                        onClick={fetchMonitorDetails}
                        className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.025] px-3 text-[11px] font-medium text-zinc-400 transition hover:border-white/[0.12] hover:bg-white/[0.05] hover:text-zinc-200"
                    >
                        <RefreshCw size={12} />
                        Refresh
                    </button>
                </div>
            </section>

            <section className="grid gap-4 sm:grid-cols-3">
                <StatCard
                    label="Status"
                    value={monitor.status}
                    valueClass={
                        monitor.status === "UP"
                            ? "text-emerald-400/80"
                            : monitor.status === "DOWN"
                            ? "text-red-400/80"
                            : "text-amber-400/80"
                    }
                />

                <StatCard
                    label="Response"
                    value={
                        monitor.responseTime != null
                            ? `${monitor.responseTime} ms`
                            : "—"
                    }
                />

                <StatCard
                    label="Checks recorded"
                    value={history.length}
                />
            </section>

            <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0b0d10]">
                <div className="border-b border-white/[0.06] px-5 py-4">
                    <h2 className="text-sm font-medium text-zinc-200">
                        Response time
                    </h2>

                    <p className="mt-1 text-[11px] text-zinc-600">
                        Response time across recent health checks
                    </p>
                </div>

                {chartData.length === 0 ? (
                    <div className="flex min-h-[280px] items-center justify-center">
                        <p className="text-xs text-zinc-600">
                            No response-time data available
                        </p>
                    </div>
                ) : (
                    <div className="h-[300px] w-full px-4 py-5">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="rgba(255,255,255,0.05)"
                                />

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
                                    unit=" ms"
                                />

                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#111318",
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
                                    connectNulls={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </section>

            <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0b0d10]">
                <div className="border-b border-white/[0.06] px-5 py-4">
                    <h2 className="text-sm font-medium text-zinc-200">
                        Recent checks
                    </h2>

                    <p className="mt-1 text-[11px] text-zinc-600">
                        Historical health checks for this monitor
                    </p>
                </div>

                {history.length === 0 ? (
                    <div className="flex min-h-[220px] items-center justify-center px-6">
                        <div className="text-center">
                            <p className="text-xs font-medium text-zinc-400">
                                No checks recorded
                            </p>

                            <p className="mt-1 text-[11px] text-zinc-700">
                                Run a check to start building monitor history.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="divide-y divide-white/[0.05]">
                        {history.map((check) => (
                            <div
                                key={check._id}
                                className="grid grid-cols-3 gap-4 px-5 py-4 sm:grid-cols-4"
                            >
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.12em] text-zinc-700">
                                        Time
                                    </p>

                                    <p className="mt-1 text-[11px] text-zinc-400">
                                        {formatDate(check.checkedAt)}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.12em] text-zinc-700">
                                        Status
                                    </p>

                                    <p
                                        className={`mt-1 text-[11px] ${
                                            check.status === "UP"
                                                ? "text-emerald-400/70"
                                                : "text-red-400/70"
                                        }`}
                                    >
                                        {check.status}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.12em] text-zinc-700">
                                        Response
                                    </p>

                                    <p className="mt-1 text-[11px] text-zinc-400">
                                        {check.responseTime != null
                                            ? `${check.responseTime} ms`
                                            : "—"}
                                    </p>
                                </div>

                                <div className="hidden sm:block">
                                    <p className="text-[10px] uppercase tracking-[0.12em] text-zinc-700">
                                        Status code
                                    </p>

                                    <p className="mt-1 text-[11px] text-zinc-400">
                                        {check.statusCode ?? "—"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

function StatCard({ label, value, valueClass = "text-zinc-200" }) {
    return (
        <div className="rounded-2xl border border-white/[0.07] bg-[#0b0d10] p-5">
            <p className="text-[10px] uppercase tracking-[0.12em] text-zinc-700">
                {label}
            </p>

            <p className={`mt-2 text-xl font-medium ${valueClass}`}>
                {value}
            </p>
        </div>
    );
}

function formatDate(date) {
    return new Date(date).toLocaleString([], {
        dateStyle: "medium",
        timeStyle: "short"
    });
}

export default MonitorDetails;

