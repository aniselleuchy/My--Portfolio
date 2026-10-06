import { useEffect, useState } from "react";
import {
    getProjects,
    getSkills,
    getExperience
} from "../../services/api";

function Dashboard() {
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [experience, setExperience] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadDashboard() {
            try {
                setError("");

                const [projectsData, skillsData, experienceData] =
                    await Promise.all([
                        getProjects(),
                        getSkills(),
                        getExperience()
                    ]);

                setProjects(projectsData);
                setSkills(skillsData);
                setExperience(experienceData);
            } catch (err) {
                console.error(err);
                setError("Failed to load client dashboard");
            } finally {
                setLoading(false);
            }
        }

        loadDashboard();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <p>Loading dashboard...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-8">
            <div className="max-w-7xl mx-auto">

                <div className="mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold">
                        Client Dashboard
                    </h1>

                    <p className="mt-2 text-white/50">
                        Explore portfolio information
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-10">

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                        <h2 className="text-lg text-white/60">
                            Projects
                        </h2>

                        <p className="mt-3 text-4xl font-bold">
                            {projects.length}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                        <h2 className="text-lg text-white/60">
                            Skills
                        </h2>

                        <p className="mt-3 text-4xl font-bold">
                            {skills.length}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                        <h2 className="text-lg text-white/60">
                            Experience
                        </h2>

                        <p className="mt-3 text-4xl font-bold">
                            {experience.length}
                        </p>
                    </div>

                </div>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold mb-5">
                        Projects
                    </h2>

                    {projects.length === 0 ? (
                        <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white/50">
                            No projects available.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="rounded-2xl border border-white/10 bg-white/5 p-6"
                                >
                                    <h3 className="text-xl font-semibold">
                                        {project.title}
                                    </h3>

                                    <p className="mt-3 text-white/60">
                                        {project.description ||
                                            "No description available."}
                                    </p>

                                    <div className="flex flex-wrap gap-3 mt-5">
                                        {project.github_url && (
                                            <a
                                                href={project.github_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10"
                                            >
                                                GitHub
                                            </a>
                                        )}

                                        {project.demo_url && (
                                            <a
                                                href={project.demo_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black"
                                            >
                                                Live Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-bold mb-5">
                        Skills
                    </h2>

                    {skills.length === 0 ? (
                        <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white/50">
                            No skills available.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {skills.map((skill) => (
                                <div
                                    key={skill.id}
                                    className="rounded-xl border border-white/10 bg-white/5 p-5"
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <div>
                                            <h3 className="font-semibold">
                                                {skill.name}
                                            </h3>

                                            <p className="mt-1 text-sm text-white/50">
                                                {skill.category ||
                                                    "General"}
                                            </p>
                                        </div>

                                        {skill.level !== null &&
                                            skill.level !== undefined && (
                                                <span className="text-sm text-white/60">
                                                    {skill.level}%
                                                </span>
                                            )}
                                    </div>

                                    {skill.level !== null &&
                                        skill.level !== undefined && (
                                            <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
                                                <div
                                                    className="h-full bg-white rounded-full"
                                                    style={{
                                                        width: `${skill.level}%`
                                                    }}
                                                />
                                            </div>
                                        )}
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-5">
                        Experience
                    </h2>

                    {experience.length === 0 ? (
                        <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white/50">
                            No experience available.
                        </div>
                    ) : (
                        <div className="grid gap-5">
                            {experience.map((item) => (
                                <div
                                    key={item.id}
                                    className="rounded-2xl border border-white/10 bg-white/5 p-6"
                                >
                                    <h3 className="text-xl font-semibold">
                                        {item.position}
                                    </h3>

                                    <p className="mt-1 text-white/60">
                                        {item.company}
                                    </p>

                                    {item.description && (
                                        <p className="mt-4 text-white/80 whitespace-pre-line">
                                            {item.description}
                                        </p>
                                    )}

                                    <p className="mt-4 text-sm text-white/40">
                                        {item.start_date
                                            ? String(
                                                  item.start_date
                                              ).slice(0, 10)
                                            : "Unknown"}

                                        {" — "}

                                        {item.end_date
                                            ? String(
                                                  item.end_date
                                              ).slice(0, 10)
                                            : "Present"}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

            </div>
        </div>
    );
}

export default Dashboard;