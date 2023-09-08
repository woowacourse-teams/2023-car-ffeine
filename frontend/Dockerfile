FROM arm64v8/node:18-alpine AS builder

WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn --production

COPY . .

RUN yarn build

FROM nginx

RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
