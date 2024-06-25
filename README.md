# Image Search Engine

URL: https://imsfrontend-ujhoe434ua-uc.a.run.app

<h3>Overview</h3>
In this project, I built an application that allows users to register and use their credentials to login, after which they can upload images, view their uploaded images, and upload an image to do a similarity search with the images present in their library. This project utilizes the concept of image embeddings, which allow the information within images to be encoded into a latent, high dimensional information space in the form of vectors. We can then use measures like cosine similarity (which I have used in this project) to compute similarity between images based on their embeddings. I deployed this application using Google Cloud Run. 

<h3>Client Side</h3>
At the frontend, I used React Typescript since it allows type safety while developing the application's frontend. For design, I used Material UI which allowed me to create a clean, user-friendly design with well-designed and responsive components. Furthermore, I used vite as a building tool since it allows faster server starts which helps during local testing and development as well a good DX (Developer Experience).

<h3>Server Side</h3>
At the backend, I used FastAPI due to its fast performance (especially amongst Python-based frameworks) and relatively simple syntax. I used Firestore to store user data and image metadata and stored the actual images in a bucket. 

<h5>Embedding Generation and Storage:</h5>
To generate embeddings, I used the multimodal embeddings API provided by GCP. To store these images, I utilized a managed vector database called Pinecone. It had an excellent client library which made the process of uploading new embeddings, doing similarity searches, and retrieving the metadata of similar images quite smooth. I used cosine similarity due to its great real-world results and its neat range of values between 0 and 1. 


<h3>Deployment</h3>
I set up a CICD pipeline through GitHub Actions using a GCP service account. The workflow dockerizes the frontend and backend using the available Dockerfiles, pushes the images to GCP and then deploys them to Google Cloud Run seamlessly.

<h3>API Documentation</h3>
Another benefit of using FastAPI was effortless OpenAPI documentation for my endpoints, which you can find here: https://imsbackend-ujhoe434ua-uc.a.run.app/openapi.json

