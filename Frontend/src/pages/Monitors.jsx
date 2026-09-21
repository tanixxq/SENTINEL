
import { useEffect, useState } from "react";
import {
    Plus,
    Server,
    X,
    RefreshCw,
    Trash2
} from "lucide-react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Monitors() {
    const [monitors, setMonitors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [creating, setCreating] = useState(false);
    const [checkingId, setCheckingId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        url: ""
    });

    const fetchMonitors = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/monitors");

            setMonitors(response.data);
        } catch (error) {
            console.error(error);
            setError("Failed to load monitors.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMonitors();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.name.trim() || !formData.url.trim()) {
            setError("Name and URL are required.");
            return;
        }

        try {
            setCreating(true);
            setError("");

            await api.post("/monitors", {
                name: formData.name.trim(),
                url: formData.url.trim()
            });

            setFormData({
                name: "",
                url: ""
            });

            setShowForm(false);

            await fetchMonitors();
        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to create monitor."
            );
        } finally {
            setCreating(false);
        }
    };

    const handleCheck = async (monitorId) => {
        try {
            setCheckingId(monitorId);
            setError("");

            await api.get(`/monitors/${monitorId}/check`);

            await fetchMonitors();
        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to check monitor."
            );
        } finally {
            setCheckingId(null);
        }
    };

    const handleDelete = async (monitorId) => {
        const confirmed = window.confirm(
            "Delete this monitor and all of its history and incidents?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setDeletingId(monitorId);
            setError("");

            await api.delete(`/monitors/${monitorId}`);

            await fetchMonitors();
        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to delete monitor."
            );
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="space-y-8">
            <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                    <div className="mb-3 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-400/70">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
                        Monitoring
                    </div>

                    <h1 className="text-3xl font-semibold tracking-[-0.03em] text-zinc-100">
                        Monitors
                    </h1>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">
                        Keep track of your websites, APIs and services.
                    </p>
                </div>

                <button
                    onClick={() => {
                        setShowForm(true);
                        setError("");
                    }}
                    className="flex h-10 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.05] px-4 text-xs font-medium text-zinc-200 transition hover:border-white/15 hover:bg-white/[0.08]"
                >
                    <Plus size={14} />
                    Add monitor
                </button>
            </section>

            {error && (
                <div className="rounded-lg border border-red-400/10 bg-red-400/[0.04] px-4 py-3 text-xs text-red-400/70">
                    {error}
                </div>
            )}

            {showForm && (
                <section className="rounded-2xl border border-white/[0.07] bg-[#0b0d10] p-5">
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h2 className="text-sm font-medium text-zinc-200">
                                Add monitor
                            </h2>

                            <p className="mt-1 text-[11px] text-zinc-600">
                                Start monitoring a website or API.
                            </p>
                        </div>

                        <button
                            onClick={() => {
                                setShowForm(false);
                                setError("");
                            }}
                            className="text-zinc-600 transition hover:text-zinc-300"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="grid gap-4 sm:grid-cols-2"
                    >
                        <div>
                            <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-600">
                                Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="My Portfolio"
                                className="h-10 w-full rounded-lg border border-white/[0.08] bg-white/[0.025] px-3 text-xs text-zinc-200 outline-none placeholder:text-zinc-700 focus:border-emerald-400/30"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-600">
                                URL
                            </label>

                            <input
                                type="url"
                                name="url"
                                value={formData.url}
                                onChange={handleChange}
                                placeholder="https://example.com"
                                className="h-10 w-full rounded-lg border border-white/[0.08] bg-white/[0.025] px-3 text-xs text-zinc-200 outline-none placeholder:text-zinc-700 focus:border-emerald-400/30"
                            />
                        </div>

                        <div className="flex justify-end sm:col-span-2">
                            <button
                                type="submit"
                                disabled={creating}
                                className="h-10 rounded-lg bg-emerald-400 px-4 text-xs font-medium text-zinc-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {creating
                                    ? "Creating..."
                                    : "Create monitor"}
                            </button>
                        </div>
                    </form>
                </section>
            )}

            <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0b0d10]">
                <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
                    <div>
                        <h2 className="text-sm font-medium text-zinc-200">
                            Your monitors
                        </h2>

                        <p className="mt-1 text-[11px] text-zinc-600">
                            Services currently being watched
                        </p>
                    </div>

                    <span className="rounded-md border border-white/[0.06] bg-white/[0.025] px-2 py-1 text-[10px] text-zinc-600">
                        {monitors.length}{" "}
                        {monitors.length === 1
                            ? "monitor"
                            : "monitors"}
                    </span>
                </div>

                {loading ? (
                    <div className="flex min-h-[220px] items-center justify-center">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-700 border-t-emerald-400" />
                    </div>
                ) : monitors.length === 0 ? (
                    <div className="flex min-h-[260px] items-center justify-center px-6">
                        <div className="text-center">
                            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.025]">
                                <Server
                                    size={17}
                                    className="text-zinc-600"
                                />
                            </div>

                            <p className="text-xs font-medium text-zinc-400">
                                No monitors yet
                            </p>

                            <p className="mx-auto mt-1 max-w-[260px] text-[11px] leading-5 text-zinc-700">
                                Add your first website or API to start
                                monitoring its availability and response time.
                            </p>

                            <button
                                onClick={() => setShowForm(true)}
                                className="mt-4 inline-flex h-9 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.05] px-3 text-[11px] font-medium text-zinc-300 transition hover:bg-white/[0.08]"
                            >
                                <Plus size={13} />
                                Add monitor
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="divide-y divide-white/[0.05]">
                        {monitors.map((monitor) => (
                            <div
                                key={monitor._id}
                                className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between"
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
                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/monitors/${monitor._id}`
                                                )
                                            }
                                            className="truncate text-left text-xs font-medium text-zinc-300 transition hover:text-emerald-400"
                                        >
                                            {monitor.name ||
                                                "Unnamed monitor"}
                                        </button>

                                        <p className="mt-1 truncate text-[10px] text-zinc-700">
                                            {monitor.url}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-6">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-[0.12em] text-zinc-700">
                                            Status
                                        </p>

                                        <p
                                            className={`mt-1 text-[11px] ${
                                                monitor.status === "UP"
                                                    ? "text-emerald-400/70"
                                                    : monitor.status ===
                                                        "DOWN"
                                                      ? "text-red-400/70"
                                                      : "text-amber-400/70"
                                            }`}
                                        >
                                            {monitor.status}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[10px] uppercase tracking-[0.12em] text-zinc-700">
                                            Response
                                        </p>

                                        <p className="mt-1 text-[11px] text-zinc-400">
                                            {monitor.responseTime != null
                                                ? `${monitor.responseTime} ms`
                                                : "—"}
                                        </p>
                                    </div>

                                    <div className="hidden md:block">
                                        <p className="text-[10px] uppercase tracking-[0.12em] text-zinc-700">
                                            Last checked
                                        </p>

                                        <p className="mt-1 text-[11px] text-zinc-400">
                                            {monitor.lastCheckedAt
                                                ? formatRelativeTime(
                                                      monitor.lastCheckedAt
                                                  )
                                                : "Never"}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() =>
                                            handleCheck(monitor._id)
                                        }
                                        disabled={
                                            checkingId === monitor._id ||
                                            deletingId === monitor._id
                                        }
                                        className="inline-flex h-8 items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.025] px-3 text-[10px] font-medium text-zinc-400 transition hover:border-emerald-400/20 hover:bg-white/[0.05] hover:text-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <RefreshCw
                                            size={12}
                                            className={
                                                checkingId === monitor._id
                                                    ? "animate-spin"
                                                    : ""
                                            }
                                        />

                                        {checkingId === monitor._id
                                            ? "Checking..."
                                            : "Check now"}
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(monitor._id)
                                        }
                                        disabled={
                                            deletingId === monitor._id ||
                                            checkingId === monitor._id
                                        }
                                        className="inline-flex h-8 items-center gap-2 rounded-lg border border-red-400/10 bg-red-400/[0.03] px-3 text-[10px] font-medium text-red-400/60 transition hover:border-red-400/20 hover:bg-red-400/[0.06] hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <Trash2
                                            size={12}
                                            className={
                                                deletingId === monitor._id
                                                    ? "animate-pulse"
                                                    : ""
                                            }
                                        />

                                        {deletingId === monitor._id
                                            ? "Deleting..."
                                            : "Delete"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

function formatRelativeTime(date) {
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

    return `${Math.floor(hours / 24)}d ago`;
}

export default Monitors;

