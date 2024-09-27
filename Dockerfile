# Use the official Node.js image as the base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy server and client package.json separately to leverage Docker caching for node_modules
COPY server/package*.json ./server/
COPY client/package*.json ./client/
COPY package*.json /app/


# Install global dependencies
WORKDIR /app
RUN npm install

# Install server dependencies
WORKDIR /app/server
RUN npm install

# Create the my-upload directory for storing uploaded files
RUN mkdir -p my-upload
RUN chmod -R 755 /app/server/my-upload


# Install client dependencies
WORKDIR /app/client
RUN npm install

# Copy the server and client code to their respective directories
COPY server /app/server
COPY client /app/client


# Set the working directory back to the server
WORKDIR /app

# Expose the port that the server listens on
EXPOSE 8080 5000

# Start both the server and the client using npm or PM2 (if applicable)
CMD ["npm", "start"]
