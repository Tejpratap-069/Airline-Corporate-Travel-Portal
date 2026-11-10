# SkyCorp Travel - Backend API

A real **Node.js + Express** REST API for the SkyCorp Travel frontend.
It replaces the json-server mock: it serves the same routes on the same
port (`http://localhost:3001`), so the frontend works unchanged — just
start this server instead of json-server.

## Run

```bash
cd backend
npm install
npm start
```

Server starts at **http://localhost:3001** (set `PORT` to change it).
For auto-restart while developing: `npm run dev`.

## Data

All data lives in `data/db.json` (seeded from the project's original
`db.json`). Every create / update / delete is written back to that file,
so changes survive server restarts.

## Endpoints

Full CRUD for every collection:

| Method | Route              | Description        |
| ------ | ------------------ | ------------------ |
| GET    | `/users`           | List all           |
| GET    | `/users/:id`       | Get one            |
| POST   | `/users`           | Create (201)       |
| PATCH  | `/users/:id`       | Partial update     |
| PUT    | `/users/:id`       | Full replace       |
| DELETE | `/users/:id`       | Delete             |

Collections: `users`, `employees`, `trips`, `bookings`, `companies`,
`departments`, `expenses`, `calendar`, `notifications`, `reports`,
`analytics`, `settings`.

List endpoints also support simple equality filters, e.g.
`GET /trips?status=Approved`. New records get the next id in the
collection's own style (`TRIP015`, `BOOK003`, ...). `GET /` returns the
API status and the list of available resources.
