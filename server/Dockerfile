FROM node:21-alpine3.18

WORKDIR /app/backend/

COPY package.json .

RUN yarn install

COPY . .

CMD [ "yarn", "run", "dev" ]