#Primera Etapa
FROM node:14-alpine3.16 as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

#Segunda Etapa
FROM nginx:1.23.3-alpine
COPY --from=build-step /app/dist/patient-monitoring /usr/share/nginx/html