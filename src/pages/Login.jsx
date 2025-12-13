import React, { useEffect, useState } from "react";
import { getUsers } from "../api";
import { Link, useLocation, useNavigate } from "react-router-dom";


export default function Login() {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState("");
    const [authError, setAuthError] = useState("");
    const location = useLocation();
    const nav = useNavigate();

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setLoadError("");
        getUsers()
            .then(res => {
                if (cancelled) return;
                setUsers(res.data || []);
            })
            .catch(err => {
                console.error(err);
                if (cancelled) return;
                setLoadError("Unable to load users. Make sure the API server is running.");
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => { cancelled = true; };
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        setAuthError("");
        const trimmedUser = username.trim().toLowerCase();
        const trimmedPass = password.trim();
        if (!trimmedUser || !trimmedPass) {
            setAuthError("Please enter both username and password.");
            return;
        }

        const matched = users.find(u => {
            const byUsername = u.username && u.username.toLowerCase() === trimmedUser;
            const byEmail = u.email && u.email.toLowerCase() === trimmedUser;
            return byUsername || byEmail;
        });

        if (!matched) {
            setAuthError("Invalid username or password.");
            return;
        }
        if (!matched.password || matched.password !== trimmedPass) {
            setAuthError("Invalid username or password.");
            return;
        }

        const { password: _pw, ...safeUser } = matched;
        localStorage.setItem("loggedUser", JSON.stringify(safeUser));
        nav("/news");
    };

    return (
        <div className="card login-card">
            <h2>Welcome to NewsApp</h2>
            <p className="subtle">Sign in with your username and password.</p>
            {location.state?.message && (
                <div className="alert">{location.state.message}</div>
            )}
            {loading && <p>Loading users...</p>}
            {loadError && (
                <div className="alert">
                    {loadError}
                    <div className="hint">Tip: run json-server on port 3000 with /users and /news endpoints.</div>
                    <button className="btn btn-ghost" onClick={() => window.location.reload()}>Retry</button>
                </div>
            )}
            {!loading && !loadError && (
                <form onSubmit={handleLogin}>
                    <label htmlFor="username">Username or email</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="username"
                        autoComplete="username"
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                        autoComplete="current-password"
                    />

                    {authError && <div className="alert">{authError}</div>}

                    <button className="btn" type="submit" disabled={!username || !password}>Login</button>
                </form>
            )}
            <p align="center" className="subtle">Don't have an account? <Link to="/register">Create one</Link>.</p>
        </div>
    );
}