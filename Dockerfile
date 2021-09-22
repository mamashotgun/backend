FROM node:latest
ENV NODE_ENV=production
COPY . /src
WORKDIR /src
RUN npm install --production
ENTRYPOINT [ "node", "index.js" ]