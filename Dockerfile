#Primera Etapa
FROM node:22-alpine AS build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

#Segunda Etapa
FROM nginx:stable-alpine
COPY --from=build-step /app/dist/patient-monitoring /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf