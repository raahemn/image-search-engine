from typing import Union
from fastapi import APIRouter, UploadFile, File, HTTPException
from google.cloud import storage, firestore
from starlette import status
import os
from utils import is_image, generate_unique_filename

#Initialize Google Cloud Storage client
storage_client = storage.Client()
bucket_name = os.getenv("BUCKET_NAME")

#Initialize Firestore client
firestore_client = firestore.Client()

#Create a router
router = APIRouter()

#Upload Image API
@router.post("/upload/")
async def upload_image(file: UploadFile = File(...)):
    
    if not is_image(file.filename):     #Check if the file is an image
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only image files are allowed",
        )
        
    #Read file contents
    contents = await file.read()
    
    #Get the filename
    filename = file.filename
    
    #Upload the image to Google Cloud Storage
    bucket = storage_client.bucket(bucket_name)
    
    # Generate a unique filename if the file already exists
    filename = generate_unique_filename(filename, bucket)
    
    #Create a blob object
    blob = bucket.blob(filename)
    
    #Upload the file contents to the blob
    blob.upload_from_string(contents)
    
    #Store metadata in Firestore in the images collection
    doc_ref = firestore_client.collection("images").document()
    doc_ref.set({
        "filename": filename,
        "bucket": bucket_name,
        "url": f"gs://{bucket_name}/{filename}",
        "uploaded_at": firestore.SERVER_TIMESTAMP
    })
    
    #Return a response
    return {"filename": filename, "message": "Image uploaded and metadata stored successfully"}

