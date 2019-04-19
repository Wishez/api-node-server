FROM node:10-alpine

LABEL maintainer="shiningfinger@list.ru"

WORKDIR ./app
COPY ./ ./

RUN npm i && npm i -g nodemon

EXPOSE 4080
ENTRYPOINT ["npm", "start"]