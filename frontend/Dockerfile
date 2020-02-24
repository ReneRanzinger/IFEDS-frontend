FROM alpine/git as clone 
WORKDIR /app
RUN git clone https://github.com/ReneRanzinger/IFEDS-frontend.git
RUN cd /app/IFEDS-frontend/frontend; git checkout master

# build environment
FROM node:12.2.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY --from=clone /app/IFEDS-frontend/frontend/package.json /app/package.json
RUN npm install --silent
#RUN npm ls webpack
RUN npm install webpack@4.40.2 
RUN npm install react-scripts@3.1.2 -g 
COPY --from=clone /app/IFEDS-frontend/frontend/. /app
RUN npm run build

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /var/www
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
