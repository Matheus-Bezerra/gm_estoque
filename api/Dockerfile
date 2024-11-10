FROM node:20-alpine

WORKDIR /api

COPY ./package.json ./

RUN npm install

EXPOSE 3001

CMD sh -c "npx prisma generate && npm run start:dev"
