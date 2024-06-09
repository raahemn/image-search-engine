from fastapi import FastAPI
from google.cloud import storage, firestore
from dotenv import load_dotenv
from routes.upload_route import router as upload_router


#Load environment variables from .env file
load_dotenv()


#Create a FastAPI instance
app = FastAPI()


#Root API for testing purposes
@app.get("/")
def read_root():
    return {"Helloooo": "World"}


#Include the upload router
app.include_router(upload_router)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)