FROM python:3.12.3-slim

RUN apt-get update && apt-get install -y \
    build-essential \
    libssl-dev \
    libffi-dev \
    libpq-dev \
    libjpeg-dev \
    zlib1g-dev \
    && apt-get clean

#Set the working directory
WORKDIR /app

#Copy the requirements file into the container
COPY requirements.txt .

#Copy Google Cloud credentials
COPY application_default_credentials.json /root/.config/gcloud/application_default_credentials.json

#Set Project ID
# ENV GOOGLE_CLOUD_PROJECT=jetrr-raahem-nabeel-1

# RUN pip install --upgrade pip setuptools==65.5.0

#Install any dependencies
RUN pip install --no-cache-dir -r requirements.txt

#Copy the rest of the application code into the container
COPY . .

#Expose the port FastAPI is running on
EXPOSE 8080

#Command to run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080", "--timeout-keep-alive", "0"]
