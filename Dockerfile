FROM registry.access.redhat.com/ubi8/nodejs-14:latest as build

WORKDIR /app
COPY package.json /app
RUN npm install

COPY . /app/
RUN npm run build

FROM registry.access.redhat.com/ubi8/nodejs-14:latest

WORKDIR /app
RUN npm install node-static
COPY --from=build  /app/dist /app/dist
COPY --from=build  /app/server.js /app/server.js
EXPOSE 9000

WORKDIR /app
CMD ["node", "server.js"]

