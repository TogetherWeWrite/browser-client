FROM node:alpine
COPY . ./
RUN npm start build