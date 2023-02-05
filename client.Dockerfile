FROM node:alpine

WORKDIR /code

COPY ./client/package.json ./

RUN npm install

COPY ./client .

EXPOSE 3000

ENTRYPOINT ["npm", "run", "dev"]
