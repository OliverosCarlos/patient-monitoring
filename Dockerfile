#Primera Etapa
FROM node:22-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

#Segunda Etapa
FROM nginx:1.25
COPY --from=build-step /app/dist/patient-monitoring /usr/share/nginx/html