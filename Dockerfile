# Estágio de build
FROM node:22 AS builder

# ⬇️ ADICIONE ESTAS LINHAS ⬇️
# Argumento que será recebido durante o build
ARG DATABASE_URL
# Torna o argumento uma variável de ambiente disponível para os comandos RUN
ENV DATABASE_URL=$DATABASE_URL

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install --legacy-peer-deps

COPY . .

# Agora este comando terá acesso à DATABASE_URL
RUN npm run build

# Estágio de produção
FROM node:22 AS production

# ⬇️ ADICIONE ESTAS LINHAS TAMBÉM AQUI ⬇️
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist

# Garante que o cliente seja gerado para o ambiente final
#RUN npx prisma generate

EXPOSE 4000

CMD ["sh", "-c", "npx prisma generate && npm run start:prod"]