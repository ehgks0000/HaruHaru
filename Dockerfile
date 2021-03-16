FROM node:14 as base


ENV DOCKERIZE_VERSION v0.2.0
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \  
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

ENV NODE_ENV=development \
    TZ=Asia/Seoul

RUN npm install -g sequelize-cli
RUN npm install -g pm2
# RUN npm install -g sequelize
RUN npm install && npm cache clean --force


COPY . .

RUN chmod +x docker-entrypoint.sh  
ENTRYPOINT ./docker-entrypoint.sh

# Exports
EXPOSE 3001