# Use a Node.js base image
FROM node:20-alpine


# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the backend port
EXPOSE 4000

# Start the backend server
CMD ["npm", "run", "start"]
