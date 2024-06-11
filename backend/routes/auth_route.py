#This file contains the routes for the authentication of the user including login and signup functionality
from fastapi import APIRouter, HTTPException
from models.user_models import SignupUser, LoginUser
from google.cloud import firestore
from passlib.context import CryptContext
from jose import jwt
from fastapi.responses import JSONResponse, Response
from datetime import datetime, timedelta, timezone
from dotenv import load_dotenv
import os


#Load environment variables from .env file
load_dotenv()

router = APIRouter()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

#Firestore client setup
db = firestore.Client()

#Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


#Sign Up Route
@router.post("/signup/")
async def sign_up(user_data: SignupUser):
    print("Signup request", user_data)
    
    user_ref = db.collection('users').document(user_data.username)
    document = user_ref.get()
    
    #Check if user already exists
    if document.exists:
        raise HTTPException(status_code=400, detail="User already exists")
    
    #Hash the password
    hashed_password = pwd_context.hash(user_data.password)
    
    # Create the user
    user_ref.set({
        'username': user_data.username,
        'hashed_password': hashed_password,
        'name': user_data.name
    })
    
    return {"success":True, "msg": "User created successfully"}


#Login Route
@router.post("/login/")
async def login(user_data: LoginUser):
    print("Login request", user_data)
    
    user_ref = db.collection('users').document(user_data.username)      #Get the user document
    document = user_ref.get()
    
    userid = document.id
    print("User ID", userid)
    
    print("user")
    
    if not document.exists:
        raise HTTPException(status_code=400, detail="User does not exist")      #Check if user exists
    
    user = document.to_dict()
    
    if not verify_password(user_data.password, user['hashed_password']):        #Check if the password is correct
        raise HTTPException(status_code=400, detail="Invalid password")
    
    #JWT payload containing user information
    jwt_payload = {
        "username": user_data.username,
        "exp": datetime.now(timezone.utc) + timedelta(hours=1)   #Token expires in 1 hour
    }
    
    #Generate the JWT token
    try:
        token = jwt.encode(jwt_payload, SECRET_KEY, algorithm=ALGORITHM)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")
    
    del user['hashed_password']     #Remove the hashed password from the user data
    # print("Sending user", user, "token", token)
    
    response_data = {"success": True, "msg": "Login successful", "user": user, "token": token}
    
    return JSONResponse(content=response_data)