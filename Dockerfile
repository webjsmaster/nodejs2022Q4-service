FROM node:18.6-alpine

WORKDIR /usr/app

COPY package.json ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./

RUN npm install && npm cache clean --force

RUN npm i nodemon -g

RUN npm run build

COPY . .

EXPOSE ${PORT}

CMD  ["npm", "run", "start:dev"]

#FROM node:18-alpine as development
#
## Create app directory
#WORKDIR /usr/app
#
#COPY package*.json .
#
## Install dev dependencies
#RUN npm install
#COPY . .
#COPY .env.example .env
#RUN npm run build
#
#FROM node:18-alpine as production
#ARG NODE_ENV=production
#ENV NODE_ENV=${NODE_ENV}
#
#WORKDIR /usr/app
#COPY package*.json .
#
#RUN npm ci --production
#
#COPY --from=development /usr/app/dist dist
#COPY --from=development /usr/app/node_modules node_modules
#
#EXPOSE ${PORT}
#CMD ["npm", "run", "start:dev"]