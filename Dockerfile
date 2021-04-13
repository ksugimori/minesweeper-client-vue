FROM node:14.16.0-alpine3.10 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/docs /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;"]