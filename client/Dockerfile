FROM node:18.12.1-alpine3.17 as build
# Setup working directory
WORKDIR /app
# Copy package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy source code
COPY . .
# Build app
RUN npm run build

# Stage 2 - the production environment
FROM nginx:1.21.3-alpine
# Copy build from build stage
COPY --from=build /app/build /usr/share/nginx/html
# Expose port 80
EXPOSE 80
# Run nginx
CMD ["nginx", "-g", "daemon off;"]