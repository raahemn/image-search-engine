from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from google.cloud import storage, firestore
from pinecone_utils import initialize_pinecone
from embeddings import generate_embeddings
from middleware.authenticate_user import authenticate_user
import os
from dotenv import load_dotenv
from starlette import status
from utils import is_image

load_dotenv()

#Initialize Google Cloud Storage client
storage_client = storage.Client()
bucket_name = os.getenv("BUCKET_NAME")

#Initialize Firestore client
firestore_client = firestore.Client()

#Initialize pinecone index
pc, index = initialize_pinecone()

#Create a router
router = APIRouter()

@router.post("/")
async def search_similar_images(username:str = Depends(authenticate_user), file: UploadFile = File(...)):
    if not is_image(file.filename):     #Check if the file is an image
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only image files are allowed",
        )
        
    #Read file contents
    contents = await file.read()
    
    #Generate embeddings for the query image
    query_embeddings = generate_embeddings(contents)
    
    #Perform similarity search in Pinecone
    query_results = index.query(
        vector=query_embeddings.tolist(),
        
        top_k=5,  #Number of similar images to retrieve
        namespace="image_embeddings",  
        filter={
            "user": username  #Ensure it searches within the user's images
        }
    )
    
    print("query_results matches",query_results.matches)
    
    #Fetch metadata for the similar images from Firestore
    similar_images_metadata = []
    for match in query_results.matches:
        print("match id",match.id)
        doc_ref = firestore_client.collection("images").document(match.id)
        
        doc = doc_ref.get()
        
        print("doc",doc)
        
        if doc.exists:
            print("doc exists")
            similar_images_metadata.append(doc.to_dict())
    
    print("returning",similar_images_metadata)
    return {"images": similar_images_metadata}
