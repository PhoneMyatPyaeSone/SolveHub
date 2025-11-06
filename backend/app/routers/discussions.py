from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app import crud, schemas
from app.database import get_db
from app.dependencies import get_current_user

router = APIRouter(prefix="/discussions", tags=["Discussions"])

@router.post("/", response_model=schemas.DiscussionOut, status_code=status.HTTP_201_CREATED)
def create_discussion(
    discussion: schemas.DiscussionCreate, 
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_user)
):
    """Create a new discussion (requires authentication)"""
    return crud.create_discussion(db, discussion, user_id=current_user.id)

@router.get("/", response_model=List[schemas.DiscussionOut])
def get_discussions(db: Session = Depends(get_db), skip: int = 0, limit: int = 20):
    """Get all discussions with pagination"""
    return crud.get_all_discussions(db, skip=skip, limit=limit)

@router.get("/{discussion_id}", response_model=schemas.DiscussionOut)
def get_discussion(discussion_id: int, db: Session = Depends(get_db)):
    """Get a single discussion by ID (increments view count)"""
    discussion = crud.get_discussion(db, discussion_id)
    if not discussion:
        raise HTTPException(status_code=404, detail="Discussion not found")
    return discussion

@router.put("/{discussion_id}", response_model=schemas.DiscussionOut)
def update_discussion(
    discussion_id: int, 
    update_data: schemas.DiscussionUpdate, 
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_user)
):
    """Update a discussion (only by the author)"""
    updated = crud.update_discussion(db, discussion_id, update_data, user_id=current_user.id)
    if not updated:
        raise HTTPException(status_code=403, detail="Not authorized or discussion not found")
    return updated

@router.delete("/{discussion_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_discussion(
    discussion_id: int, 
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_user)
):
    """Delete a discussion (only by the author)"""
    success = crud.delete_discussion(db, discussion_id, user_id=current_user.id)
    if not success:
        raise HTTPException(status_code=403, detail="Not authorized or discussion not found")
    return None