# Use the official Node.js runtime as the base image
FROM node:20-alpine AS base

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD yarn dev