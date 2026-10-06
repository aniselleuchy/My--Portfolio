import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCurrentUser, login } from "../../services/api";


function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    async function handleSubmit(event) {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            const tokenData = await login(
                email,
                password
            );

            const token = tokenData.access_token;

            localStorage.setItem(
                "access_token",
                token
            );

            const user = await getCurrentUser(token);

            if (user.role !== "admin") {
                localStorage.removeItem(
                    "access_token"
                );

                throw new Error(
                    "Admin access required"
                );
            }

            navigate("/admin/dashboard");

        } catch (error) {
            localStorage.removeItem(
                "access_token"
            );

            setError(
                error.message === "Admin access required"
                    ? "Admin access required"
                    : "Invalid email or password"
            );

        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl">

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-white">
                        Admin Login
                    </h1>

                    <p className="mt-2 text-white/60">
                        Sign in to your portfolio dashboard
                    </p>
                </div>


                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>
                        <label className="mb-2 block text-sm text-white/70">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            placeholder="admin@example.com"
                            required
                            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-white/30"
                        />
                    </div>


                    <div>
                        <label className="mb-2 block text-sm text-white/70">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            placeholder="••••••••"
                            required
                            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-white/30"
                        />
                    </div>


                    {error && (
                        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                            {error}
                        </div>
                    )}


                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-white px-4 py-3 font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading
                            ? "Logging in..."
                            : "Login"
                        }
                    </button>

                </form>

            </div>
        </div>
    );
}


export default Login;