
from pinecone import Pinecone, ServerlessSpec

PINECONE_API_KEY = "7abec5af-0f32-443e-b9dd-376f17591c26"


pc = Pinecone(api_key=PINECONE_API_KEY)

index_name = "docs-quickstart-index"

if index_name not in pc.list_indexes().names():
    pc.create_index(
    name="quickstart",
    dimension=8, # Replace with your model dimensions
    metric="euclidean", # Replace with your model metric
    spec=ServerlessSpec(
        cloud="aws",
        region="us-east-1"
    ) 
)

#try upserting test vectors
vectors = [
    (f"doc{i}", [i for i in range(8)]) for i in range(10)
]

index = pc.index(index_name)


index.upsert(
    vectors=[
        {
            "id": "vec1", 
            "values": [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1], 
            "metadata": {"genre": "drama"}
        }, {
            "id": "vec2", 
            "values": [0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2], 
            "metadata": {"genre": "action"}
        }, {
            "id": "vec3", 
            "values": [0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3], 
            "metadata": {"genre": "drama"}
        }, {
            "id": "vec4", 
            "values": [0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4], 
            "metadata": {"genre": "action"}
        }
    ],
    namespace= "ns1"
)