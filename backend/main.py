from fastapi import FastAPI
from google.cloud import storage, firestore
from dotenv import load_dotenv
from routes.upload_route import router as upload_router
from routes.auth_route import router as auth_router
from fastapi.middleware.cors import CORSMiddleware
import os


#Load environment variables from .env file
load_dotenv()

#Create a FastAPI instance
app = FastAPI()

#Initialize Pinecone
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

index_name = os.getenv("PINECONE_INDEX_NAME")

if index_name not in pc.list_indexes().names():
    pc.create_index(
    name="quickstart",
    dimension=8, 
    metric="cosine", 
    spec=ServerlessSpec(
        cloud="aws",
        region="us-east-1"
    ) 
)
    
index = pc.index(index_name)



#CORS middleware to allow requests from all origins
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


#Root API for testing purposes
@app.get("/")
def read_root():
    return {"Helloooo": "World"}



#Include the authentication router
app.include_router(auth_router, prefix="/api/auth")

#Include the upload router
app.include_router(upload_router, prefix="/api/upload")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)
    print("Server running on port 8000.")
    