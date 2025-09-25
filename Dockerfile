# Estágio de build
FROM node:22 AS builder

# ⬇️ RECEBE O ARGUMENTO DO DOCKER-COMPOSE ⬇️
ARG DATABASE_URL
# Torna a variável disponível para os comandos RUN
ENV DATABASE_URL=$DATABASE_URL

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install --legacy-peer-deps

COPY . .

# Agora o Prisma terá acesso à DATABASE_URL
#RUN npx prisma generate
RUN npm run build


# Estágio de produção
FROM node:22 AS production

# ⬇️ É NECESSÁRIO DECLARAR DE NOVO NO NOVO ESTÁGIO ⬇️
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist

# Garante compatibilidade no ambiente final
# RUN npx prisma generate

EXPOSE 4000

# Se o seu start:prod usa o "dist/main.js", o CMD pode ser mais direto
CMD ["sh", "-c", "npx prisma generate && npm run start:prod"]