import { useState } from "react";
import {
Activity,
ArrowRight,
LockKeyhole,
Mail,
UserRound
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
const navigate = useNavigate();


const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
});

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
        ...prev,
        [name]: value
    }));
};

const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.password) {
        setError("Please fill in all fields.");
        return;
    }

    try {
        setLoading(true);

        await api.post("/auth/register", formData);

        navigate("/login");
    } catch (error) {
        setError(
            error.response?.data?.message ||
            "Registration failed. Please try again."
        );
    } finally {
        setLoading(false);
    }
};

return (
    <div className="min-h-screen bg-[#070809] text-zinc-100">
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.055),transparent_35%)]" />

        <div className="relative flex min-h-screen items-center justify-center px-6 py-12">
            <div className="w-full max-w-[420px]">
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] shadow-[0_0_35px_rgba(255,255,255,0.04)]">
                        <Activity
                            size={19}
                            className="text-zinc-200"
                        />
                    </div>

                    <p className="text-[11px] font-semibold tracking-[0.22em] text-zinc-300">
                        SENTINEL
                    </p>

                    <h1 className="mt-5 text-2xl font-semibold tracking-[-0.03em]">
                        Create your workspace
                    </h1>

                    <p className="mt-2 text-sm text-zinc-600">
                        Start monitoring your services in minutes.
                    </p>
                </div>

                <div className="rounded-2xl border border-white/[0.08] bg-[#0b0d10] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >
                        <div>
                            <label className="mb-2 block text-[11px] font-medium text-zinc-400">
                                Name
                            </label>

                            <div className="relative">
                                <UserRound
                                    size={15}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600"
                                />

                                <input
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                    className="h-11 w-full rounded-lg border border-white/[0.08] bg-white/[0.025] pl-10 pr-3 text-sm text-zinc-200 outline-none transition placeholder:text-zinc-700 focus:border-white/20 focus:bg-white/[0.04]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-[11px] font-medium text-zinc-400">
                                Email
                            </label>

                            <div className="relative">
                                <Mail
                                    size={15}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600"
                                />

                                <input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className="h-11 w-full rounded-lg border border-white/[0.08] bg-white/[0.025] pl-10 pr-3 text-sm text-zinc-200 outline-none transition placeholder:text-zinc-700 focus:border-white/20 focus:bg-white/[0.04]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-[11px] font-medium text-zinc-400">
                                Password
                            </label>

                            <div className="relative">
                                <LockKeyhole
                                    size={15}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600"
                                />

                                <input
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="h-11 w-full rounded-lg border border-white/[0.08] bg-white/[0.025] pl-10 pr-3 text-sm text-zinc-200 outline-none transition placeholder:text-zinc-700 focus:border-white/20 focus:bg-white/[0.04]"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="rounded-lg border border-red-400/10 bg-red-400/[0.05] px-3 py-2.5 text-xs text-red-400/80">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="group flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-zinc-100 text-sm font-medium text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Creating account..." : "Create account"}

                            {!loading && (
                                <ArrowRight
                                    size={15}
                                    className="transition-transform group-hover:translate-x-0.5"
                                />
                            )}
                        </button>
                    </form>
                </div>

                <p className="mt-6 text-center text-xs text-zinc-600">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-zinc-300 transition hover:text-white"
                    >
                        Sign in
                    </Link>
                </p>

                <div className="mt-8 flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.15em] text-zinc-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
                    Sentinel infrastructure protected
                </div>
            </div>
        </div>
    </div>
);


}

export default Register;
