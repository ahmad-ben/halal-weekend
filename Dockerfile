FROM node:18.15.0 as node
WORKDIR /app
COPY . .
RUN npm install -g npm@9.6.2
RUN npm install --force

# Bundle app source
COPY . /usr/src/app

EXPOSE 4200
CMD npm run start:docker;

# docker build -t gas-project .

# docker run -it -p 80:80 --name  gas-apiv0 gas-apiv0

#docker tag 6297cb2b40b5 gcr.io/gas-project/test

#heroku container:push web --app young-earth-36055