FROM node:alpine
COPY /root/builds/react/individual ./
RUN npm run