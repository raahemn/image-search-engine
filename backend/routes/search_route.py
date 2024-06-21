from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from google.cloud import storage, firestore
from pinecone_utils import initialize_pinecone
from middleware.authenticate_user import authenticate_user
import os
from dotenv import load_dotenv
from starlette import status
from utils import is_image
from predict_request_gapic import EmbeddingPredictionClient


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
    
    project_id = os.getenv('PROJECT_ID')
    client = EmbeddingPredictionClient(project=project_id)
    
    embedding_response = client.get_embedding(image_bytes=contents)

    query_embeddings = embedding_response.image_embedding
    
    #Perform similarity search in Pinecone
    query_results = index.query(
        vector=query_embeddings,
        
        top_k=5,  #Number of similar images to retrieve
        namespace="image_embeddings",  
        filter={
            "user": username  #Ensure it searches within the user's images
        }
    )
    
    
    #Fetch metadata for the similar images from Firestore
    similar_images_metadata = []
    for match in query_results.matches:
       
        doc_ref = firestore_client.collection("images").document(match.id)
        
        doc = doc_ref.get()
        
        if doc.exists:
            
            image_data = doc.to_dict()
            
            similar_images_metadata.append({
            "filename": image_data.get("filename"),
            "url": image_data.get("url"),
            "uploaded_at": image_data.get("uploaded_at"),
            "similarity_score": match.score
            })
    
    return {"success":True, "message": f'Top {len(similar_images_metadata)} results returned in order of similarity',"images": similar_images_metadata}
