import { useEffect, useState } from "react";

import {
    getSkills,
    createSkill,
    updateSkill,
    deleteSkill
} from "../../services/api";


function Skills() {
    const [skills, setSkills] = useState([]);

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [level, setLevel] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const token = localStorage.getItem("access_token");


    async function loadSkills() {
        try {
            setError("");

            const data = await getSkills();

            setSkills(data);
        } catch (err) {
            console.error(err);
            setError("Failed to load skills");
        }
    }


    useEffect(() => {
        loadSkills();
    }, []);


    function resetForm() {
        setName("");
        setCategory("");
        setLevel("");
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
            name,
            category: category || null,
            level: level === "" ? null : Number(level)
        };


        try {
            if (editingId) {
                await updateSkill(
                    token,
                    editingId,
                    data
                );

                setSuccess(
                    "Skill updated successfully"
                );
            } else {
                await createSkill(
                    token,
                    data
                );

                setSuccess(
                    "Skill created successfully"
                );
            }

            resetForm();

            await loadSkills();

        } catch (err) {
            console.error(err);
            setError("Failed to save skill");

        } finally {
            setLoading(false);
        }
    }


    function handleEdit(skill) {
        setEditingId(skill.id);

        setName(skill.name || "");
        setCategory(skill.category || "");
        setLevel(
            skill.level !== null &&
            skill.level !== undefined
                ? String(skill.level)
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
            "Are you sure you want to delete this skill?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");
            setSuccess("");

            await deleteSkill(
                token,
                id
            );

            setSuccess(
                "Skill deleted successfully"
            );

            if (editingId === id) {
                resetForm();
            }

            await loadSkills();

        } catch (err) {
            console.error(err);
            setError("Failed to delete skill");
        }
    }


    return (
        <div className="min-h-screen bg-black text-white p-8">

            <div className="max-w-5xl mx-auto">

                <h1 className="text-3xl font-bold mb-8">
                    {editingId
                        ? "Edit Skill"
                        : "Skills Management"}
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
                                Skill Name
                            </label>

                            <input
                                type="text"
                                value={name}
                                onChange={(event) =>
                                    setName(
                                        event.target.value
                                    )
                                }
                                placeholder="Python"
                                required
                                className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white outline-none"
                            />
                        </div>


                        <div>
                            <label className="block mb-2">
                                Category
                            </label>

                            <input
                                type="text"
                                value={category}
                                onChange={(event) =>
                                    setCategory(
                                        event.target.value
                                    )
                                }
                                placeholder="Programming Languages"
                                className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white outline-none"
                            />
                        </div>


                        <div>
                            <label className="block mb-2">
                                Level
                            </label>

                            <input
                                type="number"
                                min="0"
                                max="100"
                                value={level}
                                onChange={(event) =>
                                    setLevel(
                                        event.target.value
                                    )
                                }
                                placeholder="90"
                                className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white outline-none"
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
                                    ? "Update Skill"
                                    : "Create Skill"}
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

                    {skills.length === 0 && (
                        <div className="rounded-xl border border-white/10 p-6 text-white/60">
                            No skills found.
                        </div>
                    )}


                    {skills.map((skill) => (
                        <div
                            key={skill.id}
                            className="rounded-2xl border border-white/10 bg-white/5 p-6"
                        >

                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                                <div>

                                    <h2 className="text-xl font-semibold">
                                        {skill.name}
                                    </h2>

                                    <p className="mt-1 text-white/60">
                                        {skill.category || "No category"}
                                    </p>

                                    {skill.level !== null &&
                                        skill.level !== undefined && (
                                            <p className="mt-2 text-white/80">
                                                Level: {skill.level}%
                                            </p>
                                        )}

                                </div>


                                <div className="flex gap-3">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleEdit(skill)
                                        }
                                        className="rounded-lg border border-white/20 px-4 py-2"
                                    >
                                        Edit
                                    </button>


                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDelete(skill.id)
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


export default Skills;