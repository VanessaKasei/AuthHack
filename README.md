# AuthHackathon - Authentication API

A simple backend authentication API using Node.js, Express, JWT, bcrypt, and JSON file storage.

---

## Setup Instructions

1. **Clone the repository**

   - `git clone <your-repo-url>`
   - `cd AuthHackathon`

2. **Install dependencies**

   - `npm install`

3. **Create `.env` file** in the project root with the following variables:

   - PORT=3004
   - JWT_SECRET=your_secret_key
   - JWT_EXPIRES_IN=1h

4. **Prepare JSON storage**

   - Create `db` folder if it doesn't exist
   - Create `users.json` file inside `db` and initialize with an empty array: `[]`

5. **Start the server**

   - `node server.js`  

   Server should run on port 3004.

6. **Project is ready for testing** with your API client (e.g., Postman).

---
