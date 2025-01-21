FROM node:18.15.0 as node
WORKDIR /app
COPY . .
RUN npm install -g npm@9.6.2
RUN npm install --force

# Bundle app source
COPY . /usr/src/app

# Build the Angular application
RUN npm run build --prod

FROM node:18.15.0

WORKDIR /app

# Copy the built Angular application from the previous stage
COPY --from=node /app/dist /app/dist

# Install a minimal HTTP server to serve the Angular app
RUN npm install -g http-server


EXPOSE 4200

# Start the HTTP server to serve the Angular app
CMD ["http-server", "dist", "-p", "4200"]

# docker build -t gas-project .

# docker run -it -p 80:80 --name  gas-apiv0 gas-apiv0

#docker tag 6297cb2b40b5 gcr.io/gas-project/test

#heroku container:push web --app young-earth-36055