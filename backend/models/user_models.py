from pydantic import BaseModel
from typing import Union

class User(BaseModel):
    username: str

class SignupUser(User):
    name: str
    password: str

class LoginUser(User):
    password:str
    

class UserInDB(User):
    hashed_password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Union[str, None] = None