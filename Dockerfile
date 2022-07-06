FROM registry.access.redhat.com/ubi8/nodejs-16:latest as build

WORKDIR /opt/app-root/app
COPY package.json .
RUN npm install

COPY . .
RUN npm run build

FROM registry.access.redhat.com/ubi8/nodejs-16:latest

WORKDIR /opt/app-root/app
RUN npm install node-static
COPY --from=build  /opt/app-root/app/dist /opt/app-root/app/dist
COPY --from=build  /opt/app-root/app//server.js /opt/app-root/app/server.js
EXPOSE 9000

WORKDIR /opt/app-root/app
CMD ["node", "server.js"]

