FROM node:16

WORKDIR /app

COPY ./ ./

RUN yarn add

CMD ["yarn", "start"]
