FROM node:16.15.0

MAINTAINER 17<852104785@qq.com>
COPY ./ /app
WORKDIR /app
RUN npm install
RUN npm run build
FROM nginx

RUN mkdir /app

COPY --from=0 /app/dist /app

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
