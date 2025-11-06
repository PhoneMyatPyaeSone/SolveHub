from sqlalchemy.orm import Session
from app.models.discussions import Discussion
from app.schemas.discussions import DiscussionCreate, DiscussionUpdate
from typing import List, Optional
import json

def create_discussion(db: Session, discussion: DiscussionCreate, user_id: int) -> Discussion:
    """Create a new discussion"""
    db_discussion = Discussion(
        title=discussion.title,
        content=discussion.content,
        user_id=user_id
    )
    db_discussion.set_category(discussion.category)
    db_discussion.set_tags(discussion.tags)

    db.add(db_discussion)
    db.commit()
    db.refresh(db_discussion)
    return db_discussion

def get_discussion(db: Session, discussion_id: int) -> Optional[Discussion]:
    """Get a single discussion by ID"""
    discussion = db.query(Discussion).filter(Discussion.id == discussion_id).first()
    if discussion:
        # Increment view count
        discussion.views += 1
        db.commit()
        db.refresh(discussion)
    return discussion

def get_all_discussions(db: Session, skip: int = 0, limit: int = 20) -> List[Discussion]:
    """Get all discussions with pagination"""
    return db.query(Discussion).order_by(Discussion.created_at.desc()).offset(skip).limit(limit).all()

def update_discussion(db: Session, discussion_id: int, update_data: DiscussionUpdate, user_id: int) -> Optional[Discussion]:
    """Update a discussion (only by the author)"""
    discussion = db.query(Discussion).filter(Discussion.id == discussion_id).first()
    
    if not discussion or discussion.user_id != user_id:
        return None
    
    update_dict = update_data.dict(exclude_unset=True)

    if "category" in update_dict and isinstance(update_dict["category"], list):
        update_dict["category"] = json.dumps(update_dict["category"])
    if "tags" in update_dict and isinstance(update_dict["tags"], list):
        update_dict["tags"] = json.dumps(update_dict["tags"])

    for key, value in update_dict.items():
        setattr(discussion, key, value)
    
    db.commit()
    db.refresh(discussion)
    return discussion

def delete_discussion(db: Session, discussion_id: int, user_id: int) -> bool:
    """Delete a discussion (only by the author)"""
    discussion = db.query(Discussion).filter(Discussion.id == discussion_id).first()
    
    if not discussion or discussion.user_id != user_id:
        return False
    
    db.delete(discussion)
    db.commit()
    return True

def get_user_discussions(db: Session, user_id: int, skip: int = 0, limit: int = 20) -> List[Discussion]:
    """Get all discussions by a specific user"""
    return db.query(Discussion).filter(Discussion.user_id == user_id).order_by(Discussion.created_at.desc()).offset(skip).limit(limit).all()

def search_discussions(db: Session, query: str, skip: int = 0, limit: int = 20) -> List[Discussion]:
    """Search discussions by title or content"""
    search = f"%{query}%"
    return db.query(Discussion).filter(
        (Discussion.title.like(search)) | (Discussion.content.like(search))
    ).order_by(Discussion.created_at.desc()).offset(skip).limit(limit).all()