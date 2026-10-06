import json

from google import genai
from google.genai import types
from sqlalchemy.orm import Session

from src.backend.core.config import settings
from src.backend.models.experience import Experience
from src.backend.models.project import Project
from src.backend.models.skill import Skill


if not settings.GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY is not configured")


client = genai.Client(
    api_key=settings.GEMINI_API_KEY
)


SYSTEM_INSTRUCTION = """
You are the AI assistant for Anis Elleuchy's developer portfolio.

You answer questions about the public portfolio.

You can use tools to retrieve:
- projects
- skills
- experience

Rules:
- Use tools when the question asks about portfolio data.
- Never invent projects, skills, experience, or other portfolio facts.
- If data is not available, say so.
- Never reveal passwords, tokens, API keys, database credentials, or private user information.
- Answer in the same language as the user when possible.
- Be concise and professional.
"""


def get_projects(db: Session):
    projects = (
        db.query(Project)
        .order_by(Project.created_at.desc())
        .all()
    )

    return [
        {
            "id": project.id,
            "title": project.title,
            "description": project.description,
            "image_url": project.image_url,
            "github_url": project.github_url,
            "demo_url": project.demo_url
        }
        for project in projects
    ]


def get_skills(db: Session):
    skills = (
        db.query(Skill)
        .order_by(Skill.id.asc())
        .all()
    )

    return [
        {
            "id": skill.id,
            "name": skill.name,
            "category": skill.category,
            "level": skill.level
        }
        for skill in skills
    ]


def get_experience(db: Session):
    experience = (
        db.query(Experience)
        .order_by(Experience.start_date.desc())
        .all()
    )

    return [
        {
            "id": item.id,
            "company": item.company,
            "position": item.position,
            "description": item.description,
            "start_date": (
                item.start_date.isoformat()
                if item.start_date
                else None
            ),
            "end_date": (
                item.end_date.isoformat()
                if item.end_date
                else None
            )
        }
        for item in experience
    ]


def execute_tool(
    tool_name: str,
    db: Session
):
    if tool_name == "get_projects":
        return get_projects(db)

    if tool_name == "get_skills":
        return get_skills(db)

    if tool_name == "get_experience":
        return get_experience(db)

    return {
        "error": "Unknown tool"
    }


TOOLS = [
    types.Tool(
        function_declarations=[
            {
                "name": "get_projects",
                "description": "Get all public portfolio projects.",
                "parameters": {
                    "type": "object",
                    "properties": {}
                }
            },
            {
                "name": "get_skills",
                "description": "Get all public portfolio skills.",
                "parameters": {
                    "type": "object",
                    "properties": {}
                }
            },
            {
                "name": "get_experience",
                "description": "Get all public portfolio experience.",
                "parameters": {
                    "type": "object",
                    "properties": {}
                }
            }
        ]
    )
]


def run_ai_agent(
    message: str,
    db: Session
) -> str:
    contents = [
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(
                    text=message
                )
            ]
        )
    ]

    config = types.GenerateContentConfig(
        system_instruction=SYSTEM_INSTRUCTION,
        tools=TOOLS
    )

    for _ in range(3):
        response = client.models.generate_content(
            model=settings.AI_MODEL,
            contents=contents,
            config=config
        )

        function_calls = response.function_calls

        if not function_calls:
            return response.text

        contents.append(
            response.candidates[0].content
        )

        for function_call in function_calls:
            result = execute_tool(
                tool_name=function_call.name,
                db=db
            )

            function_response = types.Part.from_function_response(
                name=function_call.name,
                response={
                    "result": result
                },
                id=function_call.id
            )

            contents.append(
                types.Content(
                    role="user",
                    parts=[function_response]
                )
            )

    return "I could not complete the request."