# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle your app source code into the container
COPY . .

# Expose the port your app runs on
EXPOSE 3003

# Command to run your Node.js application
CMD ["node", "--loader", "ts-node/esm", "src/app.ts"]
