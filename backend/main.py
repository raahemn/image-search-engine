from typing import Union
from fastapi import FastAPI, UploadFile, File, HTTPException
from google.cloud import storage, firestore
import os
from dotenv import load_dotenv
from starlette import status
from utils import is_image


#Load environment variables from .env file
load_dotenv()

app = FastAPI()

#Initialize Google Cloud Storage client
storage_client = storage.Client()
bucket_name = os.getenv("BUCKET_NAME")

#Initialize Firestore client
firestore_client = firestore.Client()

#Root API
@app.get("/")
def read_root():
    return {"Helloooo": "World"}


#Upload Image API
@app.post("/upload/")
async def upload_image(file: UploadFile = File(...)):
    
    if not is_image(file.filename):
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
    
    blob = bucket.blob(filename)
    blob.upload_from_string(contents)
    
    #Store metadata in Firestore
    doc_ref = firestore_client.collection("images").document()
    doc_ref.set({
        "filename": filename,
        "bucket": bucket_name,
        "url": f"gs://{bucket_name}/{filename}",
        "uploaded_at": firestore.SERVER_TIMESTAMP
    })
    
    #Return a response
    return {"filename": filename, "message": "Image uploaded and metadata stored successfully"}



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)