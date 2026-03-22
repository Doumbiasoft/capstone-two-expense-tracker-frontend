FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Vite's default dev port is 5173
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
