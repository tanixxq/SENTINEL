import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
    Activity,
    AlertTriangle,
    ChevronRight,
    LayoutDashboard,
    LogOut,
    Plus,
    Server,
    Settings,
    ShieldCheck
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const navItems = [
    {
        name: "Overview",
        path: "/dashboard",
        icon: LayoutDashboard
    },
    {
        name: "Monitors",
        path: "/monitors",
        icon: Server
    },
    {
        name: "Incidents",
        path: "/incidents",
        icon: AlertTriangle
    }
];

const pageNames = {
    "/dashboard": "Overview",
    "/monitors": "Monitors",
    "/incidents": "Incidents",
    "/settings": "Settings"
};

function Layout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const pageName = pageNames[location.pathname] || "Overview";

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <div className="min-h-screen bg-[#070809] text-zinc-100">
            <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />

            <aside className="fixed inset-y-0 left-0 z-40 flex w-[248px] flex-col border-r border-white/[0.07] bg-[#090a0c]/90 backdrop-blur-xl">
                <div className="flex h-[72px] items-center border-b border-white/[0.07] px-5">
                    <div className="flex items-center gap-3">
                        <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] shadow-[0_0_30px_rgba(255,255,255,0.04)]">
                            <Activity
                                size={18}
                                strokeWidth={2}
                                className="text-zinc-100"
                            />

                            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                        </div>

                        <div>
                            <p className="text-[13px] font-semibold tracking-[0.2em] text-zinc-100">
                                SENTINEL
                            </p>

                            <p className="mt-0.5 text-[9px] uppercase tracking-[0.18em] text-zinc-600">
                                Reliability
                            </p>
                        </div>
                    </div>
                </div>

                <div className="px-4 pt-7">
                    <div className="mb-3 flex items-center justify-between px-2">
                        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-600">
                            Workspace
                        </span>

                        <span className="text-[10px] text-zinc-700">
                            ⌘ K
                        </span>
                    </div>

                    <nav className="space-y-1">
                        {navItems.map(({ name, path, icon: Icon }) => (
                            <NavLink
                                key={path}
                                to={path}
                                className={({ isActive }) =>
                                    `group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] transition-all duration-200 ${
                                        isActive
                                            ? "bg-white/[0.07] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
                                            : "text-zinc-500 hover:bg-white/[0.035] hover:text-zinc-200"
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && (
                                            <span className="absolute left-0 h-5 w-[2px] rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.6)]" />
                                        )}

                                        <Icon
                                            size={16}
                                            strokeWidth={1.8}
                                            className={
                                                isActive
                                                    ? "text-zinc-200"
                                                    : "text-zinc-600 group-hover:text-zinc-400"
                                            }
                                        />

                                        <span>{name}</span>

                                        {isActive && (
                                            <ChevronRight
                                                size={13}
                                                className="ml-auto text-zinc-600"
                                            />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                <div className="mt-auto px-4 pb-4">
                    <NavLink
                        to="/monitors"
                        className="group mb-4 flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.025] p-3 transition-all duration-200 hover:border-white/[0.12] hover:bg-white/[0.045]"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/[0.08]">
                                <Plus
                                    size={15}
                                    className="text-emerald-400"
                                />
                            </div>

                            <div>
                                <p className="text-xs font-medium text-zinc-300">
                                    Add monitor
                                </p>

                                <p className="mt-0.5 text-[10px] text-zinc-600">
                                    Start monitoring a URL
                                </p>
                            </div>
                        </div>

                        <ChevronRight
                            size={14}
                            className="text-zinc-700 transition-transform group-hover:translate-x-0.5"
                        />
                    </NavLink>

                    <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] transition ${
                                isActive
                                    ? "bg-white/[0.06] text-zinc-200"
                                    : "text-zinc-600 hover:bg-white/[0.035] hover:text-zinc-300"
                            }`
                        }
                    >
                        <Settings
                            size={16}
                            strokeWidth={1.8}
                        />

                        Settings
                    </NavLink>

                    <div className="mt-3 border-t border-white/[0.06] pt-3">
                        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-[11px] font-medium text-zinc-300">
                                T
                            </div>

                            <div className="min-w-0">
                                <p className="truncate text-xs font-medium text-zinc-300">
                                    Sentinel User
                                </p>

                                <p className="mt-0.5 truncate text-[10px] text-zinc-600">
                                    Personal workspace
                                </p>
                            </div>

                            <div className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        </div>

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="group mt-2 flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-[12px] text-zinc-600 transition hover:bg-red-400/[0.05] hover:text-red-400/80"
                        >
                            <LogOut
                                size={15}
                                strokeWidth={1.8}
                                className="transition group-hover:text-red-400/80"
                            />

                            <span>Log out</span>
                        </button>
                    </div>
                </div>
            </aside>

            <main className="relative ml-[248px] min-h-screen">
                <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-white/[0.07] bg-[#070809]/80 px-8 backdrop-blur-xl">
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-zinc-600">
                            Sentinel
                        </span>

                        <ChevronRight
                            size={13}
                            className="text-zinc-700"
                        />

                        <span className="text-xs text-zinc-300">
                            {pageName}
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/[0.045] px-3 py-1.5 sm:flex">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />

                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            </span>

                            <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-emerald-400/80">
                                All systems operational
                            </span>
                        </div>

                        <div className="hidden h-5 w-px bg-white/[0.08] sm:block" />

                        <div className="flex items-center gap-2 text-zinc-600">
                            <ShieldCheck size={15} />

                            <span className="text-[10px] uppercase tracking-[0.12em]">
                                Protected
                            </span>
                        </div>
                    </div>
                </header>

                <div className="relative mx-auto max-w-[1500px] p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default Layout;