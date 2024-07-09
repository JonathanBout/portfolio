# Use the node image from official Docker Hub
FROM node:lts-alpine AS build-stage
# set the working directory
WORKDIR /app
# Copy the working directory in the container
COPY package*.json ./

# Install the project dependencies
RUN npm install
# Copy the rest of the project files to the container
COPY . .

# Build the Vue.js application to dist folder
ENV IN_CONTAIER=true
RUN npm run build


# Use the lightweight Nginx image from the previous stage for the nginx container
FROM nginx:stable-alpine AS production-stage
WORKDIR /app
# Copy the build application from the previous stage to the Nginx container
COPY --from=build-stage /app/dist ./
# Copy the nginx configuration file
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# Expose the ports 80 and 81 to the host machine
EXPOSE 80
EXPOSE 81
# Start Nginx to serve the application
CMD ["nginx", "-g", "daemon off;"]