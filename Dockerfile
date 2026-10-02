#1 -> Build angular application
FROM node:22-alpine as build 

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

#2-> Serve angular application
FROM nginx:alpine

COPY --from=build /app/dist/bankloan /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
