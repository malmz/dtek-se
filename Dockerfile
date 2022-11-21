FROM node:18-alpine as deps
WORKDIR /app

RUN apk add --no-cache curl && \
	curl -fsSL "https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64" -o /bin/pnpm; chmod +x /bin/pnpm

RUN node -v && pnpm -v

COPY pnpm-lock.yaml ./
RUN pnpm fetch

FROM deps as builder

ADD . ./
RUN pnpm install --offline

RUN pnpm run build

FROM deps
WORKDIR /app
EXPOSE 3000
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./

RUN pnpm install --offline --dev

CMD ["node", "build"]
