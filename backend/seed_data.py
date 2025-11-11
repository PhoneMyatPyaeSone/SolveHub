"""
Seed script to populate database with realistic test data.
Creates users, discussions, and blogs with random content.

Run this script from the backend directory:
    python3 seed_data.py
"""

import random
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine, Base
from app.models import User, Discussion, Blog, Vote
from app.utils.auth import get_password_hash
import json

# Sample data
SAMPLE_NAMES = [
    ("Alice Johnson", "alice_johnson"),
    ("Bob Smith", "bob_smith"),
    ("Charlie Davis", "charlie_davis"),
    ("Diana Wilson", "diana_wilson"),
    ("Eve Martinez", "eve_martinez"),
    ("Frank Brown", "frank_brown"),
    ("Grace Lee", "grace_lee"),
    ("Henry Taylor", "henry_taylor"),
    ("Ivy Anderson", "ivy_anderson"),
    ("Jack Thompson", "jack_thompson"),
]

SAMPLE_EMAILS = [
    "alice@example.com",
    "bob@example.com",
    "charlie@example.com",
    "diana@example.com",
    "eve@example.com",
    "frank@example.com",
    "grace@example.com",
    "henry@example.com",
    "ivy@example.com",
    "jack@example.com",
]

DISCUSSION_TITLES = [
    "Best practices for REST API design",
    "How to optimize database queries in Python",
    "JavaScript async/await vs Promises",
    "Docker containerization for beginners",
    "Machine learning tips and tricks",
    "Mobile app development trends 2025",
    "DevOps automation with Kubernetes",
    "Web security best practices",
    "Performance optimization techniques",
    "Microservices architecture patterns",
    "Cloud computing essentials",
    "AI and machine learning in 2025",
    "Frontend frameworks comparison",
    "Database design principles",
    "API authentication methods",
    "React vs Vue vs Angular: Which to choose?",
    "Building scalable systems at scale",
    "Testing strategies for backend applications",
    "CSS Grid vs Flexbox for layouts",
    "Git best practices for teams",
    "Serverless architecture advantages",
    "NoSQL vs SQL databases",
    "GraphQL vs REST APIs",
    "Caching strategies for performance",
    "Load balancing techniques",
    "Containerization vs Virtual Machines",
    "CI/CD pipeline setup guide",
    "Monitoring and logging best practices",
    "Security vulnerabilities to watch for",
    "Code review best practices",
    "Refactoring legacy code safely",
    "Technical debt management",
    "API rate limiting strategies",
    "Error handling patterns",
    "Logging best practices",
    "Unit testing fundamentals",
    "Integration testing strategies",
    "End-to-end testing with automation",
    "Performance profiling guide",
    "Memory leak detection",
    "Thread safety in concurrent systems",
    "Distributed systems challenges",
    "Consensus algorithms explained",
    "Message queues for async processing",
    "Event-driven architecture",
    "SOLID principles in practice",
    "Design patterns everyone should know",
    "Clean code principles",
    "Documentation that matters",
    "Code comments best practices",
]

DISCUSSION_CONTENT = [
    "This is a detailed discussion about modern software development practices and how to implement them effectively in your projects.",
    "I wanted to share some insights I've gained from years of experience in web development and system design.",
    "Let's discuss the pros and cons of different architectural approaches in today's digital landscape.",
    "Here's my personal take on what makes a successful technology project and team.",
    "After working on numerous projects, I've learned several key lessons that I'd like to share with the community.",
    "This topic has been crucial in my recent projects, and I believe it's worth discussing in detail.",
    "Based on industry trends and my experience, here's what I think about the future of this technology.",
    "I'd love to hear your thoughts and experiences on this matter as well.",
    "This is something that has significantly improved my workflow and productivity.",
    "Join me as we explore the intricacies of this fascinating subject.",
]

DISCUSSION_CATEGORIES = [
    "General",
    "Technology",
    "Education",
    "Health",
    "Business",
]

DISCUSSION_TAGS = [
    ["programming", "python", "backend"],
    ["javascript", "frontend", "react"],
    ["database", "sql", "optimization"],
    ["devops", "docker", "deployment"],
    ["api", "rest", "architecture"],
    ["security", "authentication", "encryption"],
    ["performance", "optimization", "scaling"],
    ["testing", "quality", "ci-cd"],
    ["cloud", "aws", "infrastructure"],
    ["ai", "machine-learning", "data-science"],
]

BLOG_TITLES = [
    "Getting Started with FastAPI: A Comprehensive Guide",
    "React Hooks: Deep Dive into State Management",
    "PostgreSQL Query Optimization Tips and Tricks",
    "Building Scalable Microservices Architecture",
    "Introduction to Docker and Containerization",
    "Advanced TypeScript Patterns for Enterprise Applications",
    "API Security: Authentication and Authorization",
    "Database Normalization: Best Practices",
    "Frontend Performance Optimization Techniques",
    "DevOps Pipeline: CI/CD with GitHub Actions",
    "Cloud Security Best Practices",
    "Building RESTful APIs with Python",
    "React Performance: Code Splitting and Lazy Loading",
    "SQL Query Optimization Guide",
    "Modern JavaScript: ES2024 Features",
    "Kubernetes Deployment Strategies",
    "Vue.js Composition API Guide",
    "MongoDB Schema Design Patterns",
    "Node.js Streaming for Large Files",
    "WebSocket Implementation Best Practices",
    "Redis Caching Strategies",
    "AWS Lambda Functions Tutorial",
    "Docker Compose for Multi-Container Applications",
    "Terraform Infrastructure as Code",
    "Prometheus Monitoring Setup",
    "ELK Stack for Log Analysis",
    "Machine Learning with Python: sklearn Tutorial",
    "Deep Learning with TensorFlow",
    "Computer Vision Basics",
    "Natural Language Processing Fundamentals",
    "Time Series Forecasting Methods",
    "Data Visualization with D3.js",
    "Animation Performance in Web Apps",
    "Progressive Web Apps Development",
    "Mobile-First Design Principles",
    "Responsive Design Techniques",
    "Accessibility Standards and Guidelines",
    "SEO Optimization for Developers",
    "Web Performance Metrics Explained",
    "Browser Caching Strategies",
    "Content Delivery Networks (CDN)",
    "DDoS Protection Mechanisms",
    "Zero Trust Security Model",
    "OAuth2 and OpenID Connect",
    "JWT Token Security",
    "Encryption Algorithms Explained",
    "SSL/TLS Certificate Management",
    "Penetration Testing Basics",
    "Software Supply Chain Security",
    "Dependency Management Best Practices",
]

BLOG_CONTENT = [
    """
    In this comprehensive guide, we'll explore the fundamentals and advanced concepts of modern web development.
    
    ## Introduction
    Web development has evolved significantly over the past decade. Today's applications require sophisticated architecture,
    robust security measures, and excellent performance optimization.
    
    ## Key Concepts
    - Scalability: Building systems that grow with demand
    - Reliability: Ensuring uptime and data consistency
    - Maintainability: Writing clean, understandable code
    
    ## Best Practices
    1. Follow SOLID principles in your architecture
    2. Write comprehensive tests for critical functionality
    3. Document your code thoroughly
    4. Use version control effectively
    
    ## Conclusion
    By implementing these practices, you can build robust and maintainable applications that serve users effectively.
    """,
    """
    This article covers advanced patterns and techniques used in enterprise-level applications.
    
    ## Overview
    When building large-scale applications, it's crucial to follow established patterns and best practices.
    This ensures consistency, maintainability, and scalability across your codebase.
    
    ## Advanced Patterns
    - Factory Pattern: Creating objects without specifying their exact classes
    - Observer Pattern: Implementing event-driven architecture
    - Strategy Pattern: Defining interchangeable algorithms
    
    ## Real-World Applications
    These patterns are used in production systems at major tech companies. Understanding them will make you a better engineer.
    """,
    """
    Performance optimization is crucial for modern web applications. Users expect fast, responsive experiences.
    
    ## Performance Metrics
    - First Contentful Paint (FCP): 1.8s or less
    - Largest Contentful Paint (LCP): 2.5s or less
    - Cumulative Layout Shift (CLS): 0.1 or less
    
    ## Optimization Techniques
    1. Code splitting and lazy loading
    2. Image optimization and lazy loading
    3. CSS and JavaScript minification
    4. Caching strategies
    
    ## Tools and Monitoring
    Use tools like Lighthouse, Web Vitals, and Chrome DevTools to monitor performance.
    """,
]

BLOG_CATEGORIES = [
    "Programming",
    "Web Development",
    "DevOps",
    "Database",
    "Security",
]

BLOG_TAGS = [
    ["python", "fastapi", "backend"],
    ["react", "javascript", "frontend"],
    ["postgresql", "database", "sql"],
    ["microservices", "architecture", "scaling"],
    ["docker", "devops", "deployment"],
    ["typescript", "programming", "patterns"],
    ["security", "api", "authentication"],
    ["database", "normalization", "optimization"],
    ["performance", "frontend", "optimization"],
    ["ci-cd", "devops", "automation"],
]


def create_users(db: Session, count: int = 10) -> list:
    """Create sample users in the database."""
    print(f"\n📝 Creating {count} users...")
    users = []
    
    for i in range(min(count, len(SAMPLE_NAMES))):
        full_name, username = SAMPLE_NAMES[i]
        email = SAMPLE_EMAILS[i]
        
        # Check if user already exists
        existing_user = db.query(User).filter(User.email == email).first()
        if existing_user:
            print(f"  ⏭️  User {email} already exists, skipping...")
            users.append(existing_user)
            continue
        
        user = User(
            email=email,
            username=username,
            full_name=full_name,
            hashed_password=get_password_hash("password123"),
            is_active=True
        )
        db.add(user)
        db.flush()  # Flush to get the user ID
        users.append(user)
        print(f"  ✅ Created user: {full_name} ({username})")
    
    db.commit()
    return users


def create_discussions(db: Session, users: list, count: int = 20) -> list:
    """Create sample discussions in the database."""
    print(f"\n💬 Creating {count} discussions...")
    discussions = []
    
    # Get existing discussion count to avoid duplicates
    existing_count = db.query(Discussion).count()
    
    for i in range(count):
        user = random.choice(users)
        title = DISCUSSION_TITLES[i % len(DISCUSSION_TITLES)]
        content = random.choice(DISCUSSION_CONTENT)
        category = random.choice(DISCUSSION_CATEGORIES)
        tags = random.choice(DISCUSSION_TAGS)
        
        # Create with random timestamp within last 30 days
        days_ago = random.randint(0, 30)
        hours_ago = random.randint(0, 23)
        created_at = datetime.now() - timedelta(days=days_ago, hours=hours_ago)
        
        discussion = Discussion(
            title=f"{title} #{i + 1}",
            content=content,
            upvotes=random.randint(0, 50),
            downvotes=random.randint(0, 10),
            views=random.randint(10, 500),
            user_id=user.id,
            created_at=created_at,
            updated_at=created_at
        )
        # Use the model's methods to set category and tags as JSON
        discussion.set_category([category])
        discussion.set_tags(tags)
        
        db.add(discussion)
        db.flush()
        discussions.append(discussion)
        print(f"  ✅ Created discussion: {discussion.title[:50]}... by {user.username}")
    
    db.commit()
    return discussions


def create_blogs(db: Session, users: list, count: int = 15) -> list:
    """Create sample blogs in the database."""
    print(f"\n📚 Creating {count} blogs...")
    blogs = []
    
    for i in range(min(count, len(BLOG_TITLES))):
        user = random.choice(users)
        title = BLOG_TITLES[i]
        content = BLOG_CONTENT[i % len(BLOG_CONTENT)]
        category = random.choice(BLOG_CATEGORIES)
        tags = random.choice(BLOG_TAGS)
        is_published = random.choice([True, True, True, False])  # 75% published
        
        # Create with random timestamp within last 60 days
        days_ago = random.randint(0, 60)
        hours_ago = random.randint(0, 23)
        created_at = datetime.now() - timedelta(days=days_ago, hours=hours_ago)
        
        blog = Blog(
            title=title,
            content=content,
            is_published=is_published,
            user_id=user.id,
            created_at=created_at,
            updated_at=created_at
        )
        # Use the model's methods to set category and tags as JSON
        blog.set_category([category])
        blog.set_tags(tags)
        
        db.add(blog)
        db.flush()
        blogs.append(blog)
        status = "published" if is_published else "draft"
        print(f"  ✅ Created blog ({status}): {blog.title[:50]}... by {user.username}")
    
    db.commit()
    return blogs


def create_votes(db: Session, users: list, discussions: list, votes_per_discussion: int = 3) -> None:
    """Create sample votes on discussions."""
    print(f"\n👍 Creating votes on discussions...")
    vote_count = 0
    
    for discussion in discussions:
        # Randomly select 1-5 users to vote on this discussion
        num_voters = random.randint(1, min(votes_per_discussion, len(users)))
        voters = random.sample(users, num_voters)
        
        for voter in voters:
            # Check if this user has already voted on this discussion
            existing_vote = db.query(Vote).filter(
                Vote.user_id == voter.id,
                Vote.discussion_id == discussion.id
            ).first()
            
            if existing_vote:
                continue
            
            vote_type = random.choice([1, -1])  # 1 for upvote, -1 for downvote
            vote = Vote(
                user_id=voter.id,
                discussion_id=discussion.id,
                vote_type=vote_type
            )
            db.add(vote)
            vote_count += 1
    
    db.commit()
    print(f"  ✅ Created {vote_count} votes")


def main():
    """Main function to seed the database."""
    print("=" * 60)
    print("🌱 SolveHub Database Seeding Script")
    print("=" * 60)
    
    # Create tables if they don't exist
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        # Create users
        users = create_users(db, count=10)
        
        # Create discussions - increased to 150 for pagination testing
        discussions = create_discussions(db, users, count=150)
        
        # Create blogs - increased to 50 for pagination testing
        blogs = create_blogs(db, users, count=50)
        
        # Create votes
        create_votes(db, users, discussions, votes_per_discussion=5)
        
        print("\n" + "=" * 60)
        print("✨ Database seeding completed successfully!")
        print("=" * 60)
        print(f"📊 Summary:")
        print(f"  • Users created: {len(users)}")
        print(f"  • Discussions created: {len(discussions)}")
        print(f"  • Blogs created: {len(blogs)}")
        print(f"  • Votes created: varies per discussion")
        print("\n📄 Pagination Testing Guide:")
        print(f"  • Total discussions: {len(discussions)}")
        print(f"  • Discussions per page: 50")
        print(f"  • Expected pages: {(len(discussions) + 49) // 50}")
        print(f"  • Page 1 should show: Discussions 1-50")
        print(f"  • Page 2 should show: Discussions 51-100")
        print(f"  • Page 3 should show: Discussions 101-150")
        print("\n💡 Test Login Credentials:")
        print("  Email: alice@example.com")
        print("  Password: password123")
        print("=" * 60 + "\n")
        
    except Exception as e:
        print(f"\n❌ Error during seeding: {str(e)}")
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    main()
