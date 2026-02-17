import React from "react";

function TicketList({ tickets, refreshTickets }) {

    const deleteTicket = async (id) => {
        await fetch(`http://127.0.0.1:8000/api/tickets/${id}/`, {
            method: "DELETE",
        });

        refreshTickets();
    };

    return (
        <div>
            <h2>Tickets</h2>

            {tickets.length === 0 ? (
                <p>No tickets available</p>
            ) : (
                tickets.map((ticket) => (
                    <div
                        key={ticket.id}
                        style={{
                            border: "1px solid gray",
                            padding: "10px",
                            margin: "10px 0",
                        }}
                    >
                        <h3>{ticket.title}</h3>
                        <p>{ticket.description}</p>
                        <p><strong>Category:</strong> {ticket.category}</p>
                        <p><strong>Priority:</strong> {ticket.priority}</p>
                        <p><strong>Status:</strong> {ticket.status}</p>

                        <button onClick={() => deleteTicket(ticket.id)}>
                            Delete
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default TicketList;