# syntax=docker/dockerfile:1
FROM docker.io/node:18-alpine AS pnpm
RUN wget https://get.pnpm.io/v6.16.js -qO - | node - add --global pnpm@7


FROM pnpm AS deps
WORKDIR /app
COPY pnpm-lock.yaml ./
RUN pnpm fetch

FROM deps AS build
WORKDIR /app
ENV VITE_API_URL=api.codegrotto.dev
ADD . ./
RUN pnpm install --offline
RUN pnpm run build

FROM pnpm AS deps-prod
WORKDIR /app
COPY pnpm-lock.yaml ./
RUN pnpm fetch --prod

FROM deps-prod
WORKDIR /app

COPY --from=build /app/build ./build
COPY --from=build /app/package.json .

RUN pnpm install --offline --prod --ignore-scripts

EXPOSE 3000
ENV HOST=0.0.0.0
ENV PORT=3000
ENV ORIGIN=https://dtek.codegrotto.dev
CMD ["node", "build"]
