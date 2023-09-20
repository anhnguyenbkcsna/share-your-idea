FROM node:20-alpine as build

WORKDIR /frontend
COPY ./frontend/package.json ./
COPY ./frontend/yarn.lock ./
# CD ./frontend
RUN yarn install
COPY ./frontend/ ./
RUN yarn build


FROM nginx:latest

# Export ports
EXPOSE 89 443

RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d
COPY --from=build /frontend/build /usr/share/nginx/html