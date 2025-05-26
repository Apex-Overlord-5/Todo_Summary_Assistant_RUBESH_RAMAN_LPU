# Todo Summary Assistant

Todo Summary Assistant is a full-stack application that lets users manage their personal to-dos, generate a smart summary using Cohere's LLM, and instantly send it to a Slack channel. It’s built with a modern Supabase + ERN stack (Express, React, Node.js) and is super lightweight, responsive, and functional.

---

## 🚀 About the Project

This project allows users to:
- Add, edit, and delete personal to-do items.
- View the list of all current to-dos.
- Click a button to generate a meaningful summary of pending tasks using Cohere's LLM.
- Automatically send the generated summary to a configured Slack channel.

---

## 🔧 Technologies Used

- Frontend: React
- Backend: Node.js (Express)
- LLM Integration: Cohere API
- Slack Integration: Slack Incoming Webhook
- Database: Supabase (PostgreSQL)
- Hosting: On-Progress(Link Will be Updated soon)

---

## 📁 Project Structure

client/ → React frontend
server/ → Node.js + Express backend
supabase/ → Supabase PostgreSQL database (online)

ENTRY IN PROJECT STRUCTURE
cd todo-summary-assistant


**1. Setup the Backend**
- 1.1 cd server
- 1.2 npm install
- 1.3 node index.js

**2. Setup the Frontend**

- 2.1 cd client
- 2.2 npm install
- 2.3 npm start


Features Summary
Real-time to-do management

Cohere LLM for natural summaries

One-click Slack integration

Supabase PostgreSQL for secure data storage


Slack Setup Instructions
Go to your Slack workspace.

Navigate to Slack Incoming Webhooks.

Create a webhook and select a channel.

Copy the webhook URL and paste it into your .env as SLACK_WEBHOOK_URL.

💡 LLM Setup Instructions (Cohere)
Sign up at Cohere.

Go to the API Keys section in your dashboard.

Generate an API key and add it to your .env as COHERE_API_KEY.

⚙️ Supabase Setup
Sign in at Supabase.

Create a new project and get your project URL and API key.


👤 Author
All rights reserved by Rubesh Raman
Email: rubeshraman@gmail.com
GitHub: Apex-Overlord-5


📄 License
This project is licensed. All rights reserved by Rubesh Raman.

