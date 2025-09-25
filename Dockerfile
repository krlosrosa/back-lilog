# Estágio de build
FROM node:22-slim AS builder

ARG DATABASE_URL
ENV NODE_ENV=development
ENV DATABASE_URL=$DATABASE_URL

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install --legacy-peer-deps

COPY . .

# Prisma Client precisa existir antes do build
RUN npx prisma generate
RUN npm run build

# Estágio de produção
FROM node:22-slim AS production

ARG DATABASE_URL
ENV NODE_ENV=production
ENV DATABASE_URL=$DATABASE_URL

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.env .env
COPY --from=builder /app/dist ./dist

# Prisma Client no container final
RUN npx prisma generate

EXPOSE 4000
CMD ["npm", "run", "start:prod"]
