# Estágio de build
FROM node:22-slim AS builder

ARG DATABASE_URL
ENV NODE_ENV=production
ENV DATABASE_URL=$DATABASE_URL

WORKDIR /app

# Instalar dependências de desenvolvimento necessárias para o build
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copiar arquivos de dependências primeiro para melhor cache
COPY package*.json ./
COPY prisma ./prisma/

# Instalar todas as dependências (incluindo devDependencies para build)
RUN npm ci --legacy-peer-deps

# Copiar código fonte
COPY . .

# Gerar Prisma Client e fazer build
RUN npx prisma generate
RUN npm run build

# Estágio de produção
FROM node:22-slim AS production

ARG DATABASE_URL
ENV NODE_ENV=production
ENV DATABASE_URL=$DATABASE_URL

WORKDIR /app

# Instalar dependências de produção
COPY package*.json ./
RUN npm ci --only=production --legacy-peer-deps

# Copiar arquivos necessários
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist

# Gerar Prisma Client
RUN npx prisma generate

# Criar usuário não-root para segurança
RUN groupadd -r appuser && useradd -r -g appuser appuser
RUN chown -R appuser:appuser /app
USER appuser

EXPOSE 4000
CMD ["node", "dist/main.js"]