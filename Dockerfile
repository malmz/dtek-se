# syntax=docker/dockerfile:1
FROM docker.io/node:18-alpine AS build
WORKDIR /app

RUN wget https://get.pnpm.io/v6.16.js -qO - | node - add --global pnpm@7

COPY pnpm-lock.yaml ./

RUN pnpm fetch
ADD . ./
RUN pnpm install --offline
RUN pnpm run build

RUN rm -rf node_modules

RUN pnpm install --prod --ignore-scripts --frozen-lockfile

FROM gcr.io/distroless/nodejs:18

COPY --from=build /app/node_modules ./
COPY --from=build /app/build ./
COPY --from=build /app/package.json .

EXPOSE 3000
ENV HOST=0.0.0.0
ENV PORT=3000
ENV ORIGIN=https://dtek.codegrotto.dev
CMD ["node", "build"]
