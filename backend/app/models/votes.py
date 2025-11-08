from sqlalchemy import Column, Integer, String, Text, DateTime, func
from sqlalchemy.orm import relationship
from app.database import Base
import json
from datetime import datetime

class Discussion(Base):
    __tablename__ = "discussions"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    user_id = Column(Integer, nullable=False)
    category = Column(String, nullable=True)
    tags = Column(String, nullable=True)
    votes = Column(Integer, default=0)
    views = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Add relationship to votes
    vote_records = relationship("Vote", back_populates="discussion", cascade="all, delete-orphan")

    def set_category(self, category_list):
        """Convert list to JSON string"""
        if category_list:
            self.category = json.dumps(category_list)

    def get_category(self):
        """Convert JSON string to list"""
        if self.category:
            try:
                return json.loads(self.category)
            except:
                return []
        return []

    def set_tags(self, tags_list):
        """Convert list to JSON string"""
        if tags_list:
            self.tags = json.dumps(tags_list)

    def get_tags(self):
        """Convert JSON string to list"""
        if self.tags:
            try:
                return json.loads(self.tags)
            except:
                return []
        return []