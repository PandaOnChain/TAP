FROM node:23 AS build-stage

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY ./ /app/



RUN npm run build
RUN npm run export

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1

 

COPY --from=build-stage /app/out/ /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# COPY ./nginx-backend-not-found.conf /etc/nginx/extra-conf.d/backend-not-found.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]