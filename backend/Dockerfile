FROM python:3.12.3-slim

# Set the working directory
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Copy Google Cloud credentials
COPY application_default_credentials.json /root/.config/gcloud/application_default_credentials.json

# Set environment variables
ENV GOOGLE_CLOUD_PROJECT=jetrr-raahem-nabeel-1

# Install any dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Expose the port FastAPI is running on
EXPOSE 8080

# Command to run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080", "--timeout-keep-alive", "0"]
