from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from google.cloud import storage, firestore
from starlette import status
import os
from utils import is_image, generate_unique_filename
from middleware.authenticate_user import authenticate_user
from pinecone_utils import initialize_pinecone
import datetime
from predict_request_gapic import EmbeddingPredictionClient


#Initialize Google Cloud Storage client 
storage_client = storage.Client()
bucket_name = os.getenv("BUCKET_NAME")

#Initialize Firestore client
firestore_client = firestore.Client()

#Initialize pinecone index
pc, index = initialize_pinecone()

#Create a router
router = APIRouter()

#Upload Image API
@router.post("/")
async def upload_image(username:str = Depends(authenticate_user) ,file: UploadFile = File(...)):
    
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
    
    #Generate a unique filename to prevent overwriting pre-existing images in the bucket
    filename = generate_unique_filename(filename)
    
    #Create a blob object
    blob = bucket.blob(filename)
    
    #Upload the file contents to the blob
    blob.upload_from_string(contents)
    
    #Store metadata in Firestore in the images collection
    doc_ref = firestore_client.collection("images").document()
    
    #Get the automatically generated ID
    generated_id = doc_ref.id
    # print(f"Generated document ID: {generated_id}")

    user_ref = firestore_client.collection("users").document(username)      #Get the user document
    
    doc_ref.set({
        "user": user_ref,    #Reference to the user document
        "filename": filename,
        "bucket": bucket_name,
        "url": f"https://storage.googleapis.com/{bucket_name}/{filename}",
        "uploaded_at": firestore.SERVER_TIMESTAMP
    })
    
    #Create Embeddings
    project_id = os.getenv('PROJECT_ID')
    client = EmbeddingPredictionClient(project=project_id)
    
    embedding_response = client.get_embedding(image_bytes=contents)
    embeddings = embedding_response.image_embedding
    
    # print("Embeddings generated successfully", embeddings[:5])
    # print("dimension", len(embeddings))
    
    #Store embeddings in Pinecone index
    index.upsert(
        vectors=[{
            "id": generated_id,     
            "values": embeddings,
            "metadata": {
                "user": username,       #Username of the user who uploaded the image
                "filename": file.filename,
                "uploaded_at": datetime.datetime.now().isoformat()
            }
        }],
        namespace="image_embeddings"  #Namespace for storing image embeddings
    )
    
    #Return a response
    return {"filename": filename, "message": "Image uploaded and metadata stored successfully"}

