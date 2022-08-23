# syntax=docker/dockerfile:1
FROM node:18-alpine as builder
WORKDIR /app
ENV VITE_API_URL=api.codegrotto.dev

COPY package*.json ./
RUN npm ci
ADD . ./
RUN npm run build

FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/build ./build
COPY --from=builder /app/package*.json ./

RUN npm install

EXPOSE 3000
ENV HOST=0.0.0.0
ENV PORT=3000
ENV ORIGIN=https://dtek.codegrotto.dev
CMD ["node", "build"]
