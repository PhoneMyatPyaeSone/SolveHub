from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func, desc, text
from typing import List, Optional
from app import crud, schemas
from app.database import get_db
from app.dependencies import get_current_user
from app.models.discussions import Discussion
from app.models.votes import Vote
from app.crud import votes as vote_crud

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
def get_discussions(
    category: Optional[str] = None,
    db: Session = Depends(get_db), 
    skip: int = 0, 
    limit: int = 20
):
    """Get all discussions with optional category filter and pagination"""
    query = db.query(Discussion)
    
    if category:
        query = query.filter(Discussion.category.contains(f'"{category}"'))
    
    discussions = query.order_by(Discussion.created_at.desc()).offset(skip).limit(limit).all()
    return discussions

@router.get("/stats/popular-tags")
def get_popular_tags(db: Session = Depends(get_db), limit: int = 10):
    """Get most popular tags"""
    discussions = db.query(Discussion).all()
    tag_counts = {}
    
    for discussion in discussions:
        if discussion.tags:
            tags = discussion.get_tags()
            for tag in tags:
                tag_counts[tag] = tag_counts.get(tag, 0) + 1
    
    popular_tags = sorted(tag_counts.items(), key=lambda x: x[1], reverse=True)[:limit]
    return [{"tag": tag, "count": count} for tag, count in popular_tags]

@router.get("/stats/top-contributors")
def get_top_contributors(db: Session = Depends(get_db), limit: int = 5):
    """Get users with most discussions"""
    result = db.execute(
        text("""
            SELECT u.id as user_id, u.name, u.email, COUNT(d.id) as post_count
            FROM users u
            JOIN discussions d ON u.id = d.user_id
            GROUP BY u.id, u.name, u.email
            ORDER BY post_count DESC
            LIMIT :limit
        """),
        {"limit": limit}
    )
    
    contributors = []
    for row in result:
        contributors.append({
            "user_id": row.user_id,
            "name": row.name,
            "email": row.email,
            "post_count": row.post_count
        })
    
    return contributors

@router.get("/{discussion_id}", response_model=schemas.DiscussionOut)
def get_discussion(discussion_id: int, db: Session = Depends(get_db)):
    """Get a single discussion by ID (increments view count)"""
    discussion = crud.get_discussion(db, discussion_id)
    if not discussion:
        raise HTTPException(status_code=404, detail="Discussion not found")
    return discussion

@router.get("/{discussion_id}/vote-status")
def get_vote_status(
    discussion_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Get current user's vote status on a discussion"""
    vote = vote_crud.get_user_vote(db, current_user.id, discussion_id)
    if vote:
        return {"voted": True, "vote_type": vote.vote_type}
    return {"voted": False, "vote_type": None}

@router.post("/{discussion_id}/vote/{vote_type}")
def vote_discussion(
    discussion_id: int,
    vote_type: str,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Upvote or downvote a discussion"""
    if vote_type not in ["upvote", "downvote"]:
        raise HTTPException(status_code=400, detail="Invalid vote type. Use 'upvote' or 'downvote'")
    
    # Check if discussion exists
    discussion = db.query(Discussion).filter(Discussion.id == discussion_id).first()
    if not discussion:
        raise HTTPException(status_code=404, detail="Discussion not found")
    
    # Check if user already voted
    existing_vote = vote_crud.get_user_vote(db, current_user.id, discussion_id)
    
    if existing_vote:
        if existing_vote.vote_type == vote_type:
            # User clicked same vote - remove vote
            vote_crud.delete_vote(db, existing_vote)
            message = "Vote removed"
        else:
            # User changed vote
            vote_crud.update_vote(db, existing_vote, vote_type)
            message = "Vote updated"
    else:
        # New vote
        vote_crud.create_vote(db, current_user.id, discussion_id, vote_type)
        message = "Vote added"
    
    # Refresh discussion to get updated vote count
    db.refresh(discussion)
    
    # Get current vote status
    current_vote = vote_crud.get_user_vote(db, current_user.id, discussion_id)
    
    return {
        "votes": discussion.votes,
        "message": message,
        "user_vote": current_vote.vote_type if current_vote else None
    }

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