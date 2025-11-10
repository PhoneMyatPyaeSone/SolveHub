from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth_router, users_router, discussions_router, blogs_router, comments_router
from app.database import engine, Base

# Import models so SQLAlchemy knows about them
from app.models.user import User
from app.models.discussions import Discussion
from app.models.blogs import Blog

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="SolveHub API",
    description="Backend API for SolveHub application",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router)
app.include_router(users_router)
app.include_router(discussions_router)
app.include_router(blogs_router)
app.include_router(comments_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to SolveHub API"}