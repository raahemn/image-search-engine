# Use a newer version of Node.js
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./



# Install Vite globally
# RUN npm install -g vite

# Install dependencies
RUN npm install

RUN npm install -g typescript


# Copy the rest of the application code
COPY . .

RUN npm run build

# Expose the port that Vite will run on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
