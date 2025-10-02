from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth_router, users_router
from app.database import engine
from app.models import user

# Create database tables
user.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="SolveHub API",
    description="Backend API for SolveHub application",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Add your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router)
app.include_router(users_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to SolveHub API"}