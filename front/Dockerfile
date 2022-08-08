FROM node:16 as builder

ARG VITE_BACKEND_URL

WORKDIR /app

COPY . /app/
RUN npm ci
RUN VITE_BACKEND_URL=$VITE_BACKEND_URL npm run build

FROM nginx

COPY --from=builder /app/dist /usr/share/nginx/html
