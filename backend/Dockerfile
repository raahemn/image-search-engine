FROM python:3.12.3-slim

#Set the working directory
WORKDIR /app

#Copy the requirements file into the container
COPY requirements.txt .

#Install any dependencies
RUN pip install --no-cache-dir -r requirements.txt

#Copy the rest of the application code into the container
COPY . .

#Expose the port FastAPI is running on

# COPY application_default_credentials.json /app

#Command to run the application
# CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
CMD uvicorn main:app --host=0.0.0.0 --port=8080