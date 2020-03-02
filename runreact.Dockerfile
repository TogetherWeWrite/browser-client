FROM node:alpine
COPY ~/builds/react/individual ./
RUN npm run