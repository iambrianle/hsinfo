# Use the official Node.js image as the base image
FROM node:lts

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm ci

# Copy the rest of the app to the working directory
COPY . .

# Expose the default React.js port
EXPOSE 3000

# Start the development server
CMD ["npm", "start"]