# syntax=docker/dockerfile:1
FROM docker.io/node:18-alpine AS pnpm
RUN wget https://get.pnpm.io/v6.16.js -qO - | node - add --global pnpm@7


FROM pnpm AS deps
WORKDIR /app
COPY pnpm-lock.yaml ./
RUN pnpm fetch

FROM pnpm AS deps-prod
COPY pnpm-lock.yaml ./
RUN pnpm fetch --prod

FROM deps AS build

ADD . ./
RUN pnpm install --offline
RUN pnpm run build

FROM gcr.io/distroless/nodejs:18

COPY --from=deps-prod /node_modules ./
COPY --from=build /app/build ./
COPY --from=build /app/package.json .

EXPOSE 3000
ENV HOST=0.0.0.0
ENV PORT=3000
ENV ORIGIN=https://dtek.codegrotto.dev
CMD ["node", "build"]
