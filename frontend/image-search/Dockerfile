# Use a newer version of Node.js
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./


# Install dependencies
RUN npm install


# Copy the rest of the application code
COPY . .

RUN npm run build

# Expose the port that Vite will run on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
