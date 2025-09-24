# Estágio de build
FROM node:20-slim AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install --legacy-peer-deps

COPY . .

RUN npx prisma generate
RUN npm run build


# Estágio de produção
FROM node:20-slim AS production

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist

# Gera o cliente do Prisma novamente (garante compatibilidade no container final)
RUN npx prisma generate

EXPOSE 4000

CMD ["npm", "run", "start:prod"]
