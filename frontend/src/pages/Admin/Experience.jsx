import { useEffect, useState } from "react";
import {
    getExperience,
    createExperience,
    updateExperience,
    deleteExperience
} from "../../services/api";

function Experience() {
    const [experiences, setExperiences] = useState([]);

    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const token = localStorage.getItem("access_token");

    async function loadExperience() {
        try {
            setError("");

            const data = await getExperience();

            setExperiences(data);
        } catch (err) {
            console.error(err);
            setError("Failed to load experience");
        }
    }

    useEffect(() => {
        loadExperience();
    }, []);

    function resetForm() {
        setCompany("");
        setPosition("");
        setDescription("");
        setStartDate("");
        setEndDate("");
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
            company,
            position,
            description,
            start_date: startDate || null,
            end_date: endDate || null
        };

        try {
            if (editingId) {
                await updateExperience(token, editingId, data);
                setSuccess("Experience updated successfully");
            } else {
                await createExperience(token, data);
                setSuccess("Experience created successfully");
            }

            resetForm();
            await loadExperience();
        } catch (err) {
            console.error(err);
            setError("Failed to save experience");
        } finally {
            setLoading(false);
        }
    }

    function handleEdit(experience) {
        setEditingId(experience.id);
        setCompany(experience.company || "");
        setPosition(experience.position || "");
        setDescription(experience.description || "");
        setStartDate(
            experience.start_date
                ? String(experience.start_date).slice(0, 10)
                : ""
        );
        setEndDate(
            experience.end_date
                ? String(experience.end_date).slice(0, 10)
                : ""
        );

        setError("");
        setSuccess("");

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
            "Are you sure you want to delete this experience?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");
            setSuccess("");

            await deleteExperience(token, id);

            setSuccess("Experience deleted successfully");

            if (editingId === id) {
                resetForm();
            }

            await loadExperience();
        } catch (err) {
            console.error(err);
            setError("Failed to delete experience");
        }
    }

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">
                    {editingId
                        ? "Edit Experience"
                        : "Experience Management"}
                </h1>

                {error && (
                    <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-400">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-4 rounded-lg border border-green-500/20 bg-green-500/10 p-4 text-green-400">
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
                                Company
                            </label>

                            <input
                                type="text"
                                value={company}
                                onChange={(e) =>
                                    setCompany(e.target.value)
                                }
                                placeholder="Google"
                                required
                                className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white outline-none"
                            />
                        </div>

                        <div>
                            <label className="block mb-2">
                                Position
                            </label>

                            <input
                                type="text"
                                value={position}
                                onChange={(e) =>
                                    setPosition(e.target.value)
                                }
                                placeholder="Backend Developer"
                                required
                                className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white outline-none"
                            />
                        </div>

                        <div>
                            <label className="block mb-2">
                                Description
                            </label>

                            <textarea
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }
                                placeholder="Worked on backend APIs and databases..."
                                rows="5"
                                className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white outline-none resize-none"
                            />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="block mb-2">
                                    Start Date
                                </label>

                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) =>
                                        setStartDate(e.target.value)
                                    }
                                    className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white outline-none"
                                />
                            </div>

                            <div>
                                <label className="block mb-2">
                                    End Date
                                </label>

                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) =>
                                        setEndDate(e.target.value)
                                    }
                                    className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white outline-none"
                                />
                            </div>
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
                                ? "Update Experience"
                                : "Create Experience"}
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

                <div className="grid gap-4">
                    {experiences.length === 0 && (
                        <div className="rounded-xl border border-white/10 p-6 text-white/60">
                            No experience found.
                        </div>
                    )}

                    {experiences.map((experience) => (
                        <div
                            key={experience.id}
                            className="rounded-2xl border border-white/10 bg-white/5 p-6"
                        >
                            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold">
                                        {experience.position}
                                    </h2>

                                    <p className="mt-1 text-white/60">
                                        {experience.company}
                                    </p>

                                    {experience.description && (
                                        <p className="mt-4 text-white/80 whitespace-pre-line">
                                            {experience.description}
                                        </p>
                                    )}

                                    <div className="mt-4 text-sm text-white/50">
                                        {experience.start_date
                                            ? String(
                                                  experience.start_date
                                              ).slice(0, 10)
                                            : "No start date"}

                                        {" — "}

                                        {experience.end_date
                                            ? String(
                                                  experience.end_date
                                              ).slice(0, 10)
                                            : "Present"}
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleEdit(experience)
                                        }
                                        className="rounded-lg border border-white/20 px-4 py-2"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDelete(experience.id)
                                        }
                                        className="rounded-lg bg-red-500 px-4 py-2"
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

export default Experience;