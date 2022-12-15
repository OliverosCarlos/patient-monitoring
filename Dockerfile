#First step
FROM ubuntu:latest as build-step

LABEL maintainer="oliveros.carlos.ro@gmail.com"

#env vars
ARG NODE_VER
ENV NODE_VERSION=$NODE_VER
ARG PROJECT_PATH=/home/app

RUN apt update && yes y | apt upgrade
RUN apt install \
make \
sudo \
nano \
wget -y

############################################NodeJS#####################################################
RUN echo installing node version: ${NODE_VER}
RUN wget https://nodejs.org/dist/v${NODE_VER}/node-v${NODE_VER}-linux-x64.tar.gz
RUN tar --strip-components 1 -xzf node-v* -C /usr/local
RUN node --version

RUN mkdir $PROJECT_PATH
#Copy all project to Path Automation Directory
COPY . $PROJECT_PATH

#INSTALL NODE PROJECT DEPENDENCIES
RUN npm install --prefix ${PROJECT_PATH} && npm install -g @angular/cli@13.0.4

WORKDIR $PROJECT_PATH

RUN ng build

#Second step
FROM nginx:1.23.3-alpine

COPY --from=build-step /home/app/dist/patient-monitoring /usr/share/nginx/html