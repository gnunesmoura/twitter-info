FROM node:10 as build
WORKDIR /usr/src/app
COPY . .
COPY ./config.json ./config.json
RUN npm ci --only=production

FROM node:10 as tests
WORKDIR /usr/src/app
COPY --from=build /usr/src/app .
RUN npm install
RUN npm run test

FROM node:10
WORKDIR /usr/src/app
COPY --from=build /usr/src/app .
CMD [ "npm", "run", "start" ]