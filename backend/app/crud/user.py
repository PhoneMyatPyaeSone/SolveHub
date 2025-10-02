from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate
from app.utils.auth import get_password_hash, verify_password
from typing import Optional

def get_user_by_email(db: Session, email: str) -> Optional[User]:
    """Get user by email"""
    return db.query(User).filter(User.email == email).first()

def get_user_by_username(db: Session, username: str) -> Optional[User]:
    """Get user by username"""
    return db.query(User).filter(User.username == username).first()

def get_user_by_id(db: Session, user_id: int) -> Optional[User]:
    """Get user by ID"""
    return db.query(User).filter(User.id == user_id).first()

def create_user(db: Session, user: UserCreate) -> User:
    """Create a new user"""
    hashed_password = get_password_hash(user.password)
    db_user = User(
        email=user.email,
        username=user.username,
        full_name=user.full_name,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, username_or_email: str, password: str) -> Optional[User]:
    """Authenticate user with username/email and password"""
    # Try to find user by email first
    user = get_user_by_email(db, username_or_email)
    
    # If not found by email, try by username
    if not user:
        user = get_user_by_username(db, username_or_email)
    
    # If still not found, authentication failed
    if not user:
        return None
        
    # Verify password
    if not verify_password(password, user.hashed_password):
        return None
        
    return user

def update_user(db: Session, user_id: int, user_update: UserUpdate) -> Optional[User]:
    """Update user information"""
    db_user = get_user_by_id(db, user_id)
    if not db_user:
        return None
    
    update_data = user_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_user, field, value)
    
    db.commit()
    db.refresh(db_user)
    return db_user

def deactivate_user(db: Session, user_id: int) -> Optional[User]:
    """Deactivate a user"""
    db_user = get_user_by_id(db, user_id)
    if not db_user:
        return None
    
    db_user.is_active = False
    db.commit()
    db.refresh(db_user)
    return db_user