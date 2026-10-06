# Anis Elleuchy Portfolio — React + FastAPI

This frontend is configured to use the FastAPI backend.

## Start React

```bash
npm install
npm run dev
```

React runs on the Vite dev server, usually:

http://localhost:5173

## Start FastAPI

From the backend project:

```bash
python -m uvicorn src.backend.main:app --reload
```

FastAPI:

http://127.0.0.1:8000

Swagger:

http://127.0.0.1:8000/docs

## API connection

The frontend uses:

```text
VITE_API_URL=http://127.0.0.1:8000/api
```

The following frontend sections now use FastAPI:

- Projects → `GET /api/projects`
- Skills → `GET /api/skills`
- Journey → `GET /api/experience`
- Contact form → `POST /api/messages`
- AI chat → `POST /api/ai/chat`
- Admin login → `POST /api/auth/login`
- Admin dashboard helper → `GET /api/admin/dashboard`

The old Node `server/` folder has been removed because FastAPI is the backend for this project.
