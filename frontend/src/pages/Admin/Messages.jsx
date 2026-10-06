import { useEffect, useState } from "react";
import {
    getMessages,
    updateMessageReadStatus,
    deleteMessage
} from "../../services/api";

function Messages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const token = localStorage.getItem("access_token");

    async function loadMessages() {
        if (!token) {
            setError("Not authenticated");
            setLoading(false);
            return;
        }

        try {
            setError("");

            const data = await getMessages(token);

            setMessages(data);
        } catch (err) {
            console.error(err);
            setError("Failed to load messages");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadMessages();
    }, []);

    async function handleReadStatus(id, isRead) {
        if (!token) {
            setError("Not authenticated");
            return;
        }

        try {
            setError("");
            setSuccess("");

            await updateMessageReadStatus(token, id, isRead);

            setSuccess(
                isRead
                    ? "Message marked as read"
                    : "Message marked as unread"
            );

            await loadMessages();
        } catch (err) {
            console.error(err);
            setError("Failed to update message status");
        }
    }

    async function handleDelete(id) {
        if (!token) {
            setError("Not authenticated");
            return;
        }

        const confirmed = window.confirm(
            "Are you sure you want to delete this message?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");
            setSuccess("");

            await deleteMessage(token, id);

            setSuccess("Message deleted successfully");

            await loadMessages();
        } catch (err) {
            console.error(err);
            setError("Failed to delete message");
        }
    }

    function formatDate(date) {
        if (!date) {
            return "Unknown date";
        }

        return new Date(date).toLocaleString();
    }

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">
                    Messages Management
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

                {loading ? (
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/60">
                        Loading messages...
                    </div>
                ) : messages.length === 0 ? (
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/60">
                        No messages found.
                    </div>
                ) : (
                    <div className="grid gap-5">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`rounded-2xl border p-6 ${
                                    message.is_read
                                        ? "border-white/10 bg-white/5"
                                        : "border-blue-500/30 bg-blue-500/10"
                                }`}
                            >
                                <div className="flex flex-col gap-5">
                                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                        <div>
                                            <div className="flex flex-wrap items-center gap-3">
                                                <h2 className="text-xl font-semibold">
                                                    {message.name}
                                                </h2>

                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs ${
                                                        message.is_read
                                                            ? "bg-white/10 text-white/60"
                                                            : "bg-blue-500/20 text-blue-400"
                                                    }`}
                                                >
                                                    {message.is_read
                                                        ? "Read"
                                                        : "Unread"}
                                                </span>
                                            </div>

                                            <a
                                                href={`mailto:${message.email}`}
                                                className="mt-2 inline-block text-white/60 hover:text-white"
                                            >
                                                {message.email}
                                            </a>
                                        </div>

                                        <div className="text-sm text-white/40">
                                            {formatDate(message.created_at)}
                                        </div>
                                    </div>

                                    <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                                        <p className="whitespace-pre-line text-white/80">
                                            {message.message}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        {message.is_read ? (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleReadStatus(
                                                        message.id,
                                                        false
                                                    )
                                                }
                                                className="rounded-lg border border-white/20 px-4 py-2"
                                            >
                                                Mark Unread
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleReadStatus(
                                                        message.id,
                                                        true
                                                    )
                                                }
                                                className="rounded-lg bg-white px-4 py-2 font-semibold text-black"
                                            >
                                                Mark Read
                                            </button>
                                        )}

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDelete(message.id)
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
                )}
            </div>
        </div>
    );
}

export default Messages;