FROM node:16 as mystage1

ARG VITE_BACKEND_URL

WORKDIR /app

COPY . /app/
RUN npm ci
RUN VITE_BACKEND_URL=$VITE_BACKEND_URL npm run build

FROM nginx as mystage2

COPY --from=mystage1 /app/dist /usr/share/nginx/html
