import os 
import uuid


#Check if the provided file is an image
def is_image(filename: str) -> bool:
    allowed_extensions = {'jpg', 'jpeg', 'png', 'gif'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions

#Generate a unique filename for the image so that it doesnt get overwritten in the bucket
def generate_unique_filename(filename: str):
    base, ext = os.path.splitext(filename)  
    unique_id = uuid.uuid4().hex           
    new_filename = f"{base}_{unique_id}{ext}"  
    return new_filename
