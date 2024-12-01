FROM node:20-alpine

WORKDIR /api

COPY . .

RUN npm install

EXPOSE 3001

CMD sh -c "if [ \"$ENV\" = 'development' ]; then \
    npx prisma migrate dev --schema=/api/prisma/schema.prisma && \
    npx prisma generate --schema=/api/prisma/schema.prisma && \
    npm run start:dev; \
    else \
    npx prisma migrate deploy --schema=/api/prisma/schema.prisma && \
    npx prisma generate --schema=/api/prisma/schema.prisma && \
    npm run build && \
    npm run start:prod; \
    fi"