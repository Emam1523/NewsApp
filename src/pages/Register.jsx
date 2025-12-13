import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser, getUsers } from "../api";

export default function Register() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        name: "",
        username: "",
        email: "",
        password: ""
    });
    const nav = useNavigate();

    useEffect(() => {
        let cancelled = false;
        getUsers()
            .then(res => {
                if (cancelled) return;
                setUsers(res.data || []);
            })
            .catch(err => {
                console.error(err);
                if (cancelled) return;
                setError("Unable to load users. Make sure the API server is running.");
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => { cancelled = true; };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const name = form.name.trim();
        const username = form.username.trim().toLowerCase();
        const email = form.email.trim().toLowerCase();
        const password = form.password.trim();

        if (!name || !username || !email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        const usernameTaken = users.some(u => u.username && u.username.toLowerCase() === username);
        if (usernameTaken) {
            setError("That username is already taken.");
            return;
        }

        const emailUsed = users.some(u => u.email && u.email.toLowerCase() === email);
        if (emailUsed) {
            setError("That email is already registered.");
            return;
        }

        try {
            await createUser({ name, username, email, password });
            nav("/", { state: { message: "Account created. Please log in." } });
        } catch (err) {
            console.error(err);
            setError("Unable to create account. Please try again.");
        }
    };

    return (
        <div className="card login-card">
            <h2>Create your account</h2>
            <p className="subtle">Join to post and comment.</p>
            {loading && <p>Loading...</p>}
            {!loading && (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Full name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        autoComplete="name"
                    />

                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={form.username}
                        onChange={handleChange}
                        placeholder="yourusername"
                        autoComplete="username"
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="example@gmail.com"
                        autoComplete="email"
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Set your password"
                        autoComplete="new-password"
                    />

                    {error && <div className="alert">{error}</div>}

                    <button className="btn" type="submit" disabled={loading}>Create account</button>
                </form>
            )}
            <p align="center" className="subtle">Already have an account? <Link to="/">Back to login</Link>.</p>
        </div>
    );
}
