import React, { useState, useEffect } from "react";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";

function App() {
  const [tickets, setTickets] = useState([]);

  const [filters, setFilters] = useState({
    category: "",
    priority: "",
    status: "",
    search: ""
  });

  const fetchTickets = async () => {
    let query = new URLSearchParams(filters).toString();
    const response = await fetch(
      `http://127.0.0.1:8000/api/tickets/?${query}`
    );
    const data = await response.json();
    setTickets(data);
  };

  useEffect(() => {
    fetchTickets();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Support Ticket System</h1>

      {/* Search Bar */}
      <input
        type="text"
        name="search"
        placeholder="Search tickets..."
        value={filters.search}
        onChange={handleFilterChange}
      />

      {/* Filters */}
      <div style={{ marginTop: "10px" }}>
        <select name="category" onChange={handleFilterChange}>
          <option value="">All Categories</option>
          <option value="billing">billing</option>
          <option value="technical">technical</option>
          <option value="account">account</option>
          <option value="general">general</option>
        </select>

        <select name="priority" onChange={handleFilterChange}>
          <option value="">All Priorities</option>
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
          <option value="critical">critical</option>
        </select>

        <select name="status" onChange={handleFilterChange}>
          <option value="">All Status</option>
          <option value="open">open</option>
          <option value="in_progress">in_progress</option>
          <option value="resolved">resolved</option>
          <option value="closed">closed</option>
        </select>
      </div>

      <TicketForm refreshTickets={fetchTickets} />
      <TicketList tickets={tickets} refreshTickets={fetchTickets} />
    </div>
  );
}

export default App;