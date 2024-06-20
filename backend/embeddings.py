import torch
import torchvision.transforms as transforms
from torchvision.models import resnet50
from PIL import Image
import io
from torchvision.models import ResNet50_Weights


def generate_embeddings(image_bytes):
     #Load pre-trained ResNet-50 model
     resnet_model = resnet50(weights=ResNet50_Weights.IMAGENET1K_V1)
     resnet_model.eval()
     
     #Define image transformations
     transform = transforms.Compose([
          transforms.Resize((224, 224)),  #Resize image to fit ResNet-50 input size
          transforms.ToTensor(),           #Convert image to tensor
          transforms.Normalize(            #Normalize pixel values
               mean=[0.485, 0.456, 0.406],
               std=[0.229, 0.224, 0.225]
          )
     ])
     
     #Load image from bytes
     image = Image.open(io.BytesIO(image_bytes)).convert("RGB") 
     #Apply transformations
     image = transform(image).unsqueeze(0)  
     
     #Generate embeddings using ResNet-50
     with torch.no_grad():
          embeddings = resnet_model(image)
          
     return embeddings.squeeze().numpy() 
     
from google.cloud import firestore

# Initialize Firestore client
db = firestore.Client()

def delete_user_images_from_firestore(user_id):
    user_ref = db.collection("users").document(user_id)
    images_ref = db.collection("images")
    
    #Query to get images uploaded by the user
    query = images_ref.where("user", "==", user_ref)
    docs = query.stream()
    

    # Delete each document found
    for doc in docs:
        doc.reference.delete()

# Example usage
user_id_to_delete = 'a'
delete_user_images_from_firestore(user_id_to_delete)


from google.cloud import storage

# Initialize Cloud Storage client
storage_client = storage.Client()

def delete_user_images_from_storage(user_id, bucket_name):
    bucket = storage_client.bucket(bucket_name)
    
    # List all blobs (objects) in the bucket
    blobs = bucket.list_blobs()

    # Iterate over each blob and delete those that belong to the user
    for blob in blobs:
        if user_id in blob.name:
            blob.delete()

# Example usage
user_id_to_delete = 'a'
bucket_name = 'image_store_p1'
delete_user_images_from_storage(user_id_to_delete, bucket_name)
