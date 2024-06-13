import os
from dotenv import load_dotenv
from pinecone import Pinecone, ServerlessSpec

load_dotenv()


def initialize_pinecone():
    api_key = os.getenv("PINECONE_API_KEY")
    index_name = os.getenv("PINECONE_INDEX_NAME")
    
    pc = Pinecone(api_key=api_key)
    
    if index_name not in pc.list_indexes().names():
        pc.create_index(
            name=index_name,
            dimension=1000, 
            metric="cosine", 
            spec=ServerlessSpec(
                cloud="aws",
                region="us-east-1"
            ) 
        )
    
    index = pc.Index(index_name)
    
    return pc, index
