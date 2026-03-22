FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY --from=builder /app/dist ./dist
COPY vite.config.js ./
EXPOSE 5173
CMD ["node_modules/.bin/vite", "preview", "--host", "--port", "5173"]
