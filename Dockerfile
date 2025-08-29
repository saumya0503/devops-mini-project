# Use official Node image
FROM node:18

# Set working directory
WORKDIR /app

# Copy project files
COPY package*.json ./
RUN npm install

COPY . .

# Expose app port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
