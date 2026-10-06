from pydantic import BaseModel, EmailStr


class AdminRegister(BaseModel):
    username: str
    email: EmailStr
    password: str
    admin_key: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str


class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    role: str
    is_active: bool

    class Config:
        from_attributes = True