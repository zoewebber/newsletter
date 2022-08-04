FROM node:16 as builder

WORKDIR /app

COPY . /app/
RUN npm ci
RUN npm run build

FROM nginx

COPY --from=builder /app/dist /usr/share/nginx/html
