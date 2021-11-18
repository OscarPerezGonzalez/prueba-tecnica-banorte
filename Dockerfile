FROM node:lts-alpine3.12

COPY . /app

WORKDIR /app

RUN npm install

EXPOSE 8090

CMD [ "npm", "run", "start" ]

