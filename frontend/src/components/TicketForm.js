import React, { useState } from "react";

function TicketForm({ refreshTickets }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("billing");
    const [priority, setPriority] = useState("low");
    const [loading, setLoading] = useState(false);

    const classifyDescription = async () => {
        if (!description) return;

        setLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:8000/api/tickets/classify/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ description }),
            });

            const data = await response.json();

            if (data.suggested_category) setCategory(data.suggested_category);
            if (data.suggested_priority) setPriority(data.suggested_priority);
        } catch (error) {
            console.error("LLM error:", error);
        }

        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetch("http://127.0.0.1:8000/api/tickets/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title,
                description,
                category,
                priority,
                status: "open",
            }),
        });

        setTitle("");
        setDescription("");
        setCategory("billing");
        setPriority("low");

        refreshTickets();
    };

    return (
        <div>
            <h2>Create Ticket</h2>

            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Title"
                    value={title}
                    maxLength="200"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                />

                <br />

                <textarea
                    placeholder="Description"
                    value={description}
                    required
                    onBlur={classifyDescription}
                    onChange={(e) => setDescription(e.target.value)}
                />

                {loading && <p>Getting AI suggestion...</p>}

                <br />

                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="billing">Billing</option>
                    <option value="technical">Technical</option>
                    <option value="account">Account</option>
                    <option value="general">General</option>
                </select>

                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                </select>

                <br />
                <button type="submit">Submit Ticket</button>
            </form>
        </div>
    );
}

export default TicketForm;