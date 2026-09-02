from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials, OAuth2PasswordBearer
from sqlalchemy.orm import Session
import jwt
from app.core.security import decode_access_token, oauth2_scheme
from app.db.postgres import get_db
from app.models.user import User

bearer_scheme = HTTPBearer(auto_error=False)

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    oauth_token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> User:
    token = None
    if credentials and credentials.credentials:
        token = credentials.credentials
    elif oauth_token:
        token = oauth_token

    credentials_error = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or missing authentication token",
        headers={"WWW-Authenticate": "Bearer"}
    )

    if not token:
        raise credentials_error

    try:
        payload = decode_access_token(token)
        if not payload:
            raise credentials_error
        
        subject = payload.get("sub")
        email = payload.get("email")
        if subject:
            try:
                user = db.get(User, int(subject))
                if user and user.is_active:
                    return user
            except (ValueError, TypeError):
                pass
        if email:
            user = db.query(User).filter(User.email == email).first()
            if user and user.is_active:
                return user
    except Exception:
        raise credentials_error

    raise credentials_error

def require_roles(*roles):
    def dependency(current_user: User = Depends(get_current_user)):
        user_role = getattr(current_user.role, "value", current_user.role)
        if user_role not in roles and current_user.role not in roles:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions")
        return current_user
    return dependency

require_role = require_roles
