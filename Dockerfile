FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./

RUN chown -R node:node /app

USER root

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
