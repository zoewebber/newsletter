FROM node:16

WORKDIR /app

COPY package*.json /app/
RUN npm install --prod
COPY . /app/

EXPOSE 3001
CMD ["npm", "run", "start"]