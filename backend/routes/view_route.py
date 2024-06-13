from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from middleware.authenticate_user import authenticate_user
from google.cloud import storage, firestore
from middleware.authenticate_user import authenticate_user
from dotenv import load_dotenv
import os
from starlette import status
import datetime

load_dotenv()

#Initialize Google Cloud Storage client
storage_client = storage.Client()
bucket_name = os.getenv("BUCKET_NAME")

#Initialize Firestore client
firestore_client = firestore.Client()

#Create a router
router = APIRouter()

@router.get("/my-images")
async def get_user_images(username: str = Depends(authenticate_user)):
    user_ref = firestore_client.collection("users").document(username)
    images_ref = firestore_client.collection("images")
    
    #Query to get images uploaded by the user
    query = images_ref.where("user", "==", user_ref)
    docs = query.stream()
    
    #Create a list to store the image metadata
    images = []
    for doc in docs:
        image_data = doc.to_dict()
        #Generate a signed URL that the user can use to access the images
        # bucket = storage_client.bucket(bucket_name)
        # blob = bucket.blob(image_data.get("filename"))
        # signed_url = blob.generate_signed_url(expiration=datetime.timedelta(minutes=60))
        
        images.append({
            "filename": image_data.get("filename"),
            "url": image_data.get("url"),
            "uploaded_at": image_data.get("uploaded_at")
        })
    
    print("Images", images)
    
    return {"success":True, "images": images}