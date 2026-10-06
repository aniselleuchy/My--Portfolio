import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAdminDashboard } from "../../services/api";

function Dashboard() {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("access_token");

        if (!token) {
            setError("Not authenticated");
            return;
        }

        getAdminDashboard(token)
            .then((result) => {
                setData(result);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to load dashboard");
            });
    }, []);

    if (error) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <p>Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-8">
            <div className="max-w-7xl mx-auto">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold">
                        Admin Dashboard
                    </h1>

                    <p className="mt-2 text-white/50">
                        Manage your portfolio
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                    <Link
                        to="/admin/projects"
                        className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
                    >
                        <h2 className="text-lg font-semibold">
                            Projects
                        </h2>

                        <p className="mt-3 text-4xl font-bold">
                            {data.projects}
                        </p>
                    </Link>

                    <Link
                        to="/admin/skills"
                        className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
                    >
                        <h2 className="text-lg font-semibold">
                            Skills
                        </h2>

                        <p className="mt-3 text-4xl font-bold">
                            {data.skills}
                        </p>
                    </Link>

                    <Link
                        to="/admin/experience"
                        className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
                    >
                        <h2 className="text-lg font-semibold">
                            Experience
                        </h2>

                        <p className="mt-3 text-4xl font-bold">
                            {data.experience}
                        </p>
                    </Link>

                    <Link
                        to="/admin/messages"
                        className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
                    >
                        <h2 className="text-lg font-semibold">
                            Messages
                        </h2>

                        <p className="mt-3 text-4xl font-bold">
                            {data.messages}
                        </p>
                    </Link>

                    <Link
                        to="/admin/messages"
                        className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-6 transition hover:bg-blue-500/20"
                    >
                        <h2 className="text-lg font-semibold">
                            Unread Messages
                        </h2>

                        <p className="mt-3 text-4xl font-bold text-blue-400">
                            {data.unread_messages}
                        </p>
                    </Link>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                        <h2 className="text-lg font-semibold">
                            Users
                        </h2>

                        <p className="mt-3 text-4xl font-bold">
                            {data.users}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Dashboard;