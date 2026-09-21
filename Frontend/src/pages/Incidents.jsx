
import { useEffect, useState } from "react";
import {
    AlertCircle,
    CheckCircle2,
    Clock3,
    ShieldAlert
} from "lucide-react";
import api from "../services/api";

function Incidents() {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadIncidents = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await api.get("/incidents");

                setIncidents(response.data);
            } catch (error) {
                console.error(error);
                setError("Failed to load incidents.");
            } finally {
                setLoading(false);
            }
        };

        loadIncidents();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto h-5 w-5 animate-spin rounded-full border-2 border-zinc-700 border-t-emerald-400" />
                    <p className="mt-4 text-xs text-zinc-600">
                        Loading incidents...
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
            <section>
                <div className="mb-3 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-400/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
                    System history
                </div>

                <h1 className="text-3xl font-semibold tracking-[-0.03em] text-zinc-100">
                    Incidents
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">
                    Track service outages, recoveries and their duration.
                </p>
            </section>

            <section className="grid gap-3 sm:grid-cols-3">
                <StatCard
                    label="Total incidents"
                    value={incidents.length}
                    icon={ShieldAlert}
                />

                <StatCard
                    label="Ongoing"
                    value={
                        incidents.filter(
                            (incident) => incident.status === "ONGOING"
                        ).length
                    }
                    icon={AlertCircle}
                    active={
                        incidents.some(
                            (incident) => incident.status === "ONGOING"
                        )
                    }
                />

                <StatCard
                    label="Resolved"
                    value={
                        incidents.filter(
                            (incident) => incident.status === "RESOLVED"
                        ).length
                    }
                    icon={CheckCircle2}
                    positive
                />
            </section>

            <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0b0d10]">
                <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
                    <div>
                        <h2 className="text-sm font-medium text-zinc-200">
                            Incident history
                        </h2>
                        <p className="mt-1 text-[11px] text-zinc-600">
                            Service interruptions detected by Sentinel
                        </p>
                    </div>

                    <span className="rounded-md border border-white/[0.06] bg-white/[0.025] px-2 py-1 text-[10px] text-zinc-600">
                        {incidents.length}{" "}
                        {incidents.length === 1
                            ? "incident"
                            : "incidents"}
                    </span>
                </div>

                {incidents.length === 0 ? (
                    <div className="flex min-h-[260px] items-center justify-center px-6">
                        <div className="text-center">
                            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.025]">
                                <CheckCircle2
                                    size={17}
                                    className="text-emerald-400/60"
                                />
                            </div>

                            <p className="text-xs font-medium text-zinc-400">
                                No incidents recorded
                            </p>

                            <p className="mx-auto mt-1 max-w-[250px] text-[11px] leading-5 text-zinc-700">
                                Sentinel hasn't detected any service
                                interruptions yet.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="divide-y divide-white/[0.05]">
                        {incidents.map((incident) => (
                            <IncidentRow
                                key={incident._id}
                                incident={incident}
                            />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

function IncidentRow({ incident }) {
    const isOngoing = incident.status === "ONGOING";

    return (
        <div className="px-5 py-5">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex min-w-0 items-start gap-3">
                    <span
                        className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                            isOngoing
                                ? "bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.5)]"
                                : "bg-zinc-600"
                        }`}
                    />

                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <p className="text-xs font-medium text-zinc-300">
                                {incident.monitor?.name ||
                                    incident.monitor?.url ||
                                    "Unknown monitor"}
                            </p>

                            <span
                                className={`rounded-md border px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.12em] ${
                                    isOngoing
                                        ? "border-red-400/10 bg-red-400/[0.05] text-red-400/70"
                                        : "border-white/[0.06] bg-white/[0.025] text-zinc-600"
                                }`}
                            >
                                {incident.status}
                            </span>
                        </div>

                        <p className="mt-1 truncate text-[10px] text-zinc-700">
                            {incident.monitor?.url}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-6 text-[10px] lg:min-w-[360px]">
                    <IncidentDetail
                        label="Started"
                        value={formatDate(incident.startedAt)}
                    />

                    <IncidentDetail
                        label="Resolved"
                        value={
                            incident.resolvedAt
                                ? formatDate(incident.resolvedAt)
                                : "Ongoing"
                        }
                    />

                    <IncidentDetail
                        label="Duration"
                        value={formatDuration(incident.duration)}
                    />
                </div>
            </div>
        </div>
    );
}

function IncidentDetail({ label, value }) {
    return (
        <div>
            <p className="text-zinc-700">{label}</p>
            <div className="mt-1 flex items-center gap-1.5">
                <Clock3 size={11} className="text-zinc-700" />
                <p className="text-zinc-400">{value}</p>
            </div>
        </div>
    );
}

function StatCard({
    label,
    value,
    icon: Icon,
    positive,
    active
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
                        active
                            ? "text-red-400/70"
                            : positive
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
                        active
                            ? "text-red-400/60"
                            : positive
                              ? "text-emerald-400/60"
                              : "text-zinc-700"
                    }`}
                >
                    {active
                        ? "Service interruption active"
                        : positive
                          ? "Services recovered"
                          : "Recorded by Sentinel"}
                </p>
            </div>
        </div>
    );
}

function formatDate(date) {
    if (!date) {
        return "—";
    }

    return new Date(date).toLocaleString([], {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

function formatDuration(duration) {
    if (duration == null) {
        return "Ongoing";
    }

    const totalSeconds = Math.floor(duration / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (days > 0) {
        return `${days}d ${hours}h`;
    }

    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    }

    if (minutes > 0) {
        return `${minutes}m ${seconds}s`;
    }

    return `${seconds}s`;
}

export default Incidents;

