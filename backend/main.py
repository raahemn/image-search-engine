from fastapi import FastAPI
from dotenv import load_dotenv
from routes.upload_route import router as upload_router
from routes.auth_route import router as auth_router
from routes.search_route import router as search_router
from routes.view_route import router as view_router
from fastapi.middleware.cors import CORSMiddleware
from pinecone_utils import initialize_pinecone
import os


#Load environment variables from .env file
load_dotenv()

#Create a FastAPI instance
app = FastAPI()


#Initialize pinecone index
pc, index = initialize_pinecone()



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

#Include the search router
app.include_router(search_router, prefix="/api/search")

#Include the view router
app.include_router(view_router, prefix="/api/view")


if __name__ == "__main__":
    import uvicorn
    PORT = int(os.getenv("PORT", 8080))
   
    uvicorn.run(app, host="localhost", port=PORT)
    print("Server running on port 8080.")
    