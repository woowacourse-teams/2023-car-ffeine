FROM arm64v8/node:18-alpine

WORKDIR /usr/src/app

COPY package.json package.json
COPY yarn.lock yarn.lock

ENV YARN_PROFILE $YARN_PROFILE

RUN yarn $YARN_PROFILE

COPY . .

EXPOSE 3000

RUN yarn build

RUN npm install -g serve

ENTRYPOINT ["serve","-l", "3000", "-s", "dist"]
