FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps --omit=dev
COPY --from=builder /app/dist ./dist
EXPOSE 5173
CMD ["npx", "vite", "preview", "--host", "--port", "5173"]
