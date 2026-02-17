Support Ticket System

A full-stack Support Ticket Management System built using Django (DRF), React, PostgreSQL, and Docker.

Tech Stack
Backend

Python

Django

Django REST Framework

PostgreSQL

Docker

Frontend

React

Fetch API

Docker

✨ Features

Create support tickets

View ticket list

Delete tickets

Update ticket status (PATCH API)

Search tickets

Filter by:

Category

Priority

Status

Dockerized full-stack setup

📂 Project Structure
SupportTicketSystem/
│
├── backend/        # Django backend
├── frontend/       # React frontend
├── docker-compose.yml
└── README.md

⚙️ How to Run the Project
Clone the Repository
git clone https://github.com/Vardhini36/SupportTicketSystem.git
cd SupportTicketSystem

Add Environment Variables

Create a .env file in root directory:

OPENAI_API_KEY=your_api_key_here

Run with Docker
docker compose up --build

Access the Application

Frontend:

http://localhost:3000


Backend API:

http://localhost:8000/api/tickets/

API Endpoints
Method	Endpoint	Description
GET	/api/tickets/	List all tickets
POST	/api/tickets/	Create ticket
PATCH	/api/tickets/{id}/	Update ticket
DELETE	/api/tickets/{id}/	Delete ticket
Docker Setup

The project uses:

Docker

Docker Compose

PostgreSQL container

Backend container

Frontend container

Author

Vardhini

GitHub:
https://github.com/Vardhini36

Notes

.env file is excluded from version control.

Designed for internship technical assessment.

Follows RESTful API practices.