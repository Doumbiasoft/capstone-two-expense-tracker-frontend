# FROM node:18-alpine AS builder
# WORKDIR /app
# COPY package*.json ./
# RUN npm ci --legacy-peer-deps
# COPY . .
# RUN npm run build

# FROM node:18-alpine
# WORKDIR /app
# COPY package*.json ./
# RUN npm ci --legacy-peer-deps
# COPY --from=builder /app/dist ./dist
# COPY vite.config.js ./
# EXPOSE 5173
# CMD ["node_modules/.bin/vite", "preview", "--host", "--port", "5173"]
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Temporary workaround
RUN npm install

COPY . .

RUN npm run build


# ---------- Production Stage ----------
FROM nginx:stable-alpine AS production

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

