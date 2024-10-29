# Use the node image from official Docker Hub
FROM node:lts-bookworm-slim AS build-stage
# set the working directory
WORKDIR /app

# Copy the working directory in the container
COPY package*.json ./

# Remove the puppeteer and jest dependencies from the package.json file,
# as they are not needed in the production environment and are very large in size
# (puppeteer downloads a full version of Chromium and jest is a testing library)
# Install the project dependencies
RUN sed -i '/\"jest\":/d' package.json \
    && sed -i '/\"puppeteer\":/d' package.json \
    && sed -i '/\"jest-puppeteer\":/d' package.json \
    && npm ci \
    && npm cache clean --force

# Copy the rest of the project files to the container
COPY . .

# Build the Vue.js application to dist folder
ENV IN_CONTAIER=true
RUN npm run build-only

# use flashspys/nginx-static image as the base image as it's way smaller than the official Nginx image
FROM flashspys/nginx-static AS production-stage

WORKDIR /app

# Copy the build application from the previous stage to the Nginx container
COPY --from=build-stage /app/dist ./

# remove the default Nginx configuration file and copy our own
RUN rm -rf /etc/nginx/conf.d/default.conf 
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx /etc/nginx


# Expose the ports 80 and 81 to the host machine and run the Nginx server
EXPOSE 80
EXPOSE 81

CMD ["nginx", "-g", "daemon off;"]