from app.crud.user import (
    get_user_by_email,
    get_user_by_username,
    get_user_by_id,
    create_user,
    authenticate_user,
    update_user,
    deactivate_user
)

from app.crud.discussions import (
    create_discussion,
    get_all_discussions,
    get_discussion,
    update_discussion,
    delete_discussion,
    get_user_discussions,
    search_discussions
)

# Export everything so it can be imported as crud.create_discussion
__all__ = [
    "get_user_by_email",
    "get_user_by_username",
    "get_user_by_id",
    "create_user",
    "authenticate_user",
    "update_user",
    "deactivate_user",
    "create_discussion",
    "get_all_discussions",
    "get_discussion",
    "update_discussion",
    "delete_discussion",
    "get_user_discussions",
    "search_discussions"
]