from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
import jwt
from app.core.security import decode_access_token, oauth2_scheme
from app.db.postgres import get_db
from app.models.user import User

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    credentials_error = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or missing authentication token", headers={"WWW-Authenticate": "Bearer"})
    try:
        payload = decode_access_token(token)
        subject = payload.get("sub")
        if not subject or payload.get("type") != "access":
            raise credentials_error
    except jwt.InvalidTokenError:
        raise credentials_error
    user = db.get(User, int(subject))
    if not user or not user.is_active:
        raise credentials_error
    return user

def require_roles(*roles):
    def dependency(current_user: User = Depends(get_current_user)):
        if current_user.role not in roles:
            raise HTTPException(status_code=403, detail="Insufficient permissions")
        return current_user
    return dependency
