FROM node:20-alpine

WORKDIR /api

COPY . .

RUN npm install

EXPOSE 3001

CMD sh -c "npx prisma migrate deploy --schema=/api/prisma/schema.prisma && \
    npx prisma generate --schema=/api/prisma/schema.prisma && \
    npm run build && \
    if [ \"$ENV\" = \"production\" ]; then npm run start:prod; else bun run start:dev; fi"