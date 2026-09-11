FROM node:22-alpine

RUN apk add --no-cache python3 make g++ ca-certificates

WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages ./packages

RUN corepack enable && pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

ENV NODE_ENV=production
EXPOSE 3001

CMD ["node", "dist/main"]