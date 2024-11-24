FROM node:20-alpine

WORKDIR /api

COPY ./package.json ./

RUN npm install

EXPOSE 3001

CMD sh -c "npx prisma generate --schema=./prisma/schema.prisma && \
    if [ \"$ENV\" = \"production\" ]; then npm run start:prod; else bun run start:dev; fi"
