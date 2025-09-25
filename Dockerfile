# Estágio de build
FROM node:22 AS builder

WORKDIR /app

RUN apt-get update \
    && apt-get install -y openssl \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
COPY prisma ./prisma/
COPY .env .env

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build


# Estágio de produção
FROM node:22 AS production

WORKDIR /app

RUN apt-get update \
    && apt-get install -y openssl \
    && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.env .env
COPY --from=builder /app/dist ./dist

EXPOSE 4000

CMD ["sh", "-c", "npx prisma generate && npm run start:prod"]
