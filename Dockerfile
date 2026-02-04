FROM node:20-alpine AS base
WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copiar código
COPY . .

# Build con más memoria
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm run build || npm run build -- --verbose

# Producción con Nginx
FROM nginx:alpine
COPY --from=base /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
