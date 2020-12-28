FROM node:12-alpine

RUN mkdir -p /usr/src/vue-app
WORKDIR /usr/src/vue-app

COPY package.json /usr/src/vue-app/

COPY . /usr/src/vue-app

RUN npm install
RUN npm install @vue/cli

EXPOSE 8080
EXPOSE 80

CMD ["npm", "run", "serve"]