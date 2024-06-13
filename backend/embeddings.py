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
     image = Image.open(io.BytesIO(image_bytes))
     #Apply transformations
     image = transform(image).unsqueeze(0)  
     
     #Generate embeddings using ResNet-50
     with torch.no_grad():
          embeddings = resnet_model(image)
          
     return embeddings.squeeze().numpy() 
     
    