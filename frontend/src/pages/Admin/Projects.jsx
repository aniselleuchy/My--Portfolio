import { useEffect, useState } from "react";

import {
    getProjects,
    createProject,
    updateProject,
    deleteProject
} from "../../services/api";


function Projects() {
    const [projects, setProjects] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [githubUrl, setGithubUrl] = useState("");
    const [demoUrl, setDemoUrl] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const token = localStorage.getItem("access_token");


    async function loadProjects() {
        try {
            setError("");

            const data = await getProjects();

            setProjects(data);
        } catch (err) {
            setError("Failed to load projects");
            console.error(err);
        }
    }


    useEffect(() => {
        loadProjects();
    }, []);


    function resetForm() {
        setTitle("");
        setDescription("");
        setImageUrl("");
        setGithubUrl("");
        setDemoUrl("");
        setEditingId(null);
    }


    async function handleSubmit(event) {
        event.preventDefault();

        if (!token) {
            setError("Not authenticated");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        const data = {
            title,
            description: description || null,
            image_url: imageUrl || null,
            github_url: githubUrl || null,
            demo_url: demoUrl || null
        };


        try {
            if (editingId) {
                await updateProject(
                    token,
                    editingId,
                    data
                );

                setSuccess(
                    "Project updated successfully"
                );

            } else {
                await createProject(
                    token,
                    data
                );

                setSuccess(
                    "Project created successfully"
                );
            }

            resetForm();

            await loadProjects();

        } catch (err) {
            setError(
                "Failed to save project"
            );

            console.error(err);

        } finally {
            setLoading(false);
        }
    }


    function handleEdit(project) {
        setEditingId(project.id);

        setTitle(project.title || "");
        setDescription(
            project.description || ""
        );
        setImageUrl(
            project.image_url || ""
        );
        setGithubUrl(
            project.github_url || ""
        );
        setDemoUrl(
            project.demo_url || ""
        );

        setSuccess("");
        setError("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    async function handleDelete(id) {
        if (!token) {
            setError("Not authenticated");
            return;
        }

        const confirmed = window.confirm(
            "Are you sure you want to delete this project?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");
            setSuccess("");

            await deleteProject(
                token,
                id
            );

            setSuccess(
                "Project deleted successfully"
            );

            if (editingId === id) {
                resetForm();
            }

            await loadProjects();

        } catch (err) {
            setError(
                "Failed to delete project"
            );

            console.error(err);
        }
    }


    return (
        <div className="min-h-screen bg-black text-white p-8">

            <div className="max-w-6xl mx-auto">

                <h1 className="text-3xl font-bold mb-8">
                    {editingId
                        ? "Edit Project"
                        : "Projects Management"}
                </h1>


                {error && (
                    <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-red-400">
                        {error}
                    </div>
                )}


                {success && (
                    <div className="mb-4 rounded-lg bg-green-500/10 border border-green-500/20 p-4 text-green-400">
                        {success}
                    </div>
                )}


                <form
                    onSubmit={handleSubmit}
                    className="mb-10 rounded-2xl border border-white/10 bg-white/5 p-6"
                >

                    <div className="grid gap-4">

                        <div>
                            <label className="block mb-2">
                                Title
                            </label>

                            <input
                                value={title}
                                onChange={(event) =>
                                    setTitle(
                                        event.target.value
                                    )
                                }
                                placeholder="Project title"
                                required
                                className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white"
                            />
                        </div>


                        <div>
                            <label className="block mb-2">
                                Description
                            </label>

                            <textarea
                                value={description}
                                onChange={(event) =>
                                    setDescription(
                                        event.target.value
                                    )
                                }
                                placeholder="Project description"
                                rows="4"
                                className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white"
                            />
                        </div>


                        <div>
                            <label className="block mb-2">
                                Image URL
                            </label>

                            <input
                                value={imageUrl}
                                onChange={(event) =>
                                    setImageUrl(
                                        event.target.value
                                    )
                                }
                                placeholder="https://..."
                                className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white"
                            />
                        </div>


                        <div>
                            <label className="block mb-2">
                                GitHub URL
                            </label>

                            <input
                                value={githubUrl}
                                onChange={(event) =>
                                    setGithubUrl(
                                        event.target.value
                                    )
                                }
                                placeholder="https://github.com/..."
                                className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white"
                            />
                        </div>


                        <div>
                            <label className="block mb-2">
                                Demo URL
                            </label>

                            <input
                                value={demoUrl}
                                onChange={(event) =>
                                    setDemoUrl(
                                        event.target.value
                                    )
                                }
                                placeholder="https://..."
                                className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white"
                            />
                        </div>

                    </div>


                    <div className="flex gap-3 mt-6">

                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-lg bg-white px-6 py-3 font-semibold text-black disabled:opacity-50"
                        >
                            {loading
                                ? "Saving..."
                                : editingId
                                    ? "Update Project"
                                    : "Create Project"}
                        </button>


                        {editingId && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="rounded-lg border border-white/20 px-6 py-3"
                            >
                                Cancel
                            </button>
                        )}

                    </div>

                </form>


                <div className="grid gap-5">

                    {projects.length === 0 && (
                        <div className="rounded-xl border border-white/10 p-6 text-white/60">
                            No projects found.
                        </div>
                    )}


                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="rounded-2xl border border-white/10 bg-white/5 p-6"
                        >

                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">

                                <div className="flex-1">

                                    <h2 className="text-2xl font-semibold">
                                        {project.title}
                                    </h2>

                                    <p className="mt-2 text-white/60">
                                        {project.description}
                                    </p>


                                    {project.github_url && (
                                        <a
                                            href={project.github_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-block mt-4 mr-4 underline"
                                        >
                                            GitHub
                                        </a>
                                    )}


                                    {project.demo_url && (
                                        <a
                                            href={project.demo_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-block mt-4 underline"
                                        >
                                            Demo
                                        </a>
                                    )}

                                </div>


                                <div className="flex gap-3">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleEdit(project)
                                        }
                                        className="rounded-lg border border-white/20 px-4 py-2"
                                    >
                                        Edit
                                    </button>


                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDelete(
                                                project.id
                                            )
                                        }
                                        className="rounded-lg bg-red-500 px-4 py-2 text-white"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        </div>
                    ))}

                </div>

            </div>

        </div>
    );
}


export default Projects;