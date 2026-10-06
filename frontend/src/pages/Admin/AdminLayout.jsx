import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

function AdminLayout() {
    const location = useLocation();
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("access_token");
        navigate("/admin/login");
    }

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="border-b border-white/10 bg-white/5">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <Link
                            to="/admin/dashboard"
                            className="text-xl font-bold"
                        >
                            Admin Panel
                        </Link>

                        <div className="flex flex-wrap items-center gap-2">
                            <Link
                                to="/admin/dashboard"
                                className={`rounded-lg px-4 py-2 text-sm ${
                                    isActive("/admin/dashboard")
                                        ? "bg-white text-black font-semibold"
                                        : "text-white/70 hover:bg-white/10 hover:text-white"
                                }`}
                            >
                                Dashboard
                            </Link>

                            <Link
                                to="/admin/projects"
                                className={`rounded-lg px-4 py-2 text-sm ${
                                    isActive("/admin/projects")
                                        ? "bg-white text-black font-semibold"
                                        : "text-white/70 hover:bg-white/10 hover:text-white"
                                }`}
                            >
                                Projects
                            </Link>

                            <Link
                                to="/admin/skills"
                                className={`rounded-lg px-4 py-2 text-sm ${
                                    isActive("/admin/skills")
                                        ? "bg-white text-black font-semibold"
                                        : "text-white/70 hover:bg-white/10 hover:text-white"
                                }`}
                            >
                                Skills
                            </Link>

                            <Link
                                to="/admin/experience"
                                className={`rounded-lg px-4 py-2 text-sm ${
                                    isActive("/admin/experience")
                                        ? "bg-white text-black font-semibold"
                                        : "text-white/70 hover:bg-white/10 hover:text-white"
                                }`}
                            >
                                Experience
                            </Link>

                            <Link
                                to="/admin/messages"
                                className={`rounded-lg px-4 py-2 text-sm ${
                                    isActive("/admin/messages")
                                        ? "bg-white text-black font-semibold"
                                        : "text-white/70 hover:bg-white/10 hover:text-white"
                                }`}
                            >
                                Messages
                            </Link>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default AdminLayout;