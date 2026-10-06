from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.backend.routers.auth import router as auth_router
from src.backend.routers.projects import router as projects_router
from src.backend.routers.skills import router as skills_router
from src.backend.routers.experience import router as experience_router
from src.backend.routers.messages import router as messages_router
from src.backend.routers.admin import router as admin_router
from src.backend.routers.ai import router as ai_router


app = FastAPI(
    title="Anis Elleuchy Portfolio API",
    description="Backend for Portfolio, Admin Panel, Client Dashboard and AI Agent",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router)
app.include_router(projects_router)
app.include_router(skills_router)
app.include_router(experience_router)
app.include_router(messages_router)
app.include_router(admin_router)
app.include_router(ai_router)


@app.get("/")
def root():
    return {
        "message": "Portfolio API is running"
    }


@app.get("/api/health")
def health():
    return {
        "status": "ok"
    }