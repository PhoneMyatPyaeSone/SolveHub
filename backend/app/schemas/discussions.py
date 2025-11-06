from pydantic import BaseModel, field_validator
from typing import List, Optional
from datetime import datetime
import json

class DiscussionBase(BaseModel):
    title: str
    content: str
    category: Optional[List[str]] = None
    tags: Optional[List[str]] = None

class DiscussionCreate(DiscussionBase):
    pass

class DiscussionUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    category: Optional[List[str]] = None
    tags: Optional[List[str]] = None

class DiscussionOut(BaseModel):
    id: int
    title: str
    content: str
    category: Optional[List[str]] = None
    tags: Optional[List[str]] = None
    user_id: int
    votes: int
    views: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    @field_validator('category', mode='before')
    @classmethod
    def parse_category(cls, v):
        """Convert JSON string to list"""
        if isinstance(v, str):
            try:
                return json.loads(v)
            except:
                return []
        return v if v else []

    @field_validator('tags', mode='before')
    @classmethod
    def parse_tags(cls, v):
        """Convert JSON string to list"""
        if isinstance(v, str):
            try:
                return json.loads(v)
            except:
                return []
        return v if v else []

    class Config:
        from_attributes = True