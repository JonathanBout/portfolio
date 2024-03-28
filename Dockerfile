# Use the node image from official Docker Hub
FROM node:lts-alpine as build-stage
# set the working directory
WORKDIR /app
# Copy the working directory in the container
COPY package*.json ./

# Install the project dependencies
RUN npm install
# Copy the rest of the project files to the container
COPY . .
COPY .git ./.git

RUN echo $(ls -a .git)
# put the git hash in a file and remove the now redundant .git folder
RUN cat ./.git/ORIG_HEAD > ./public/version-hash.txt
RUN rm -rf .git

# Build the Vue.js application to the production mode to dist folder
RUN npm run build


# Use the lightweight Nginx image from the previous stage for the nginx container
FROM nginx:stable-alpine as production-stage
WORKDIR /app
# Copy the build application from the previous stage to the Nginx container
COPY --from=build-stage /app/dist ./
# Copy the nginx configuration file
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# Expose the port 80
EXPOSE 80
# Start Nginx to serve the application
CMD ["nginx", "-g", "daemon off;"]