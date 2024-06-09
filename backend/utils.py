import os 

#Check if the provided file is an image
def is_image(filename: str) -> bool:
    allowed_extensions = {'jpg', 'jpeg', 'png', 'gif'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions

#Generate a unique filename for the image
def generate_unique_filename(filename: str, bucket):
    base, ext = os.path.splitext(filename)      #Split the filename into base and extension
    new_filename = filename
    suffix = 1
    
    # heck if the filename already exists in the bucket
    blob = bucket.blob(new_filename)
    
    while blob.exists():
        new_filename = f"{base}_{suffix}{ext}"
        blob = bucket.blob(new_filename)
        suffix += 1
    
    return new_filename