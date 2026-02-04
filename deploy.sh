#!/bin/bash

# Script de despliegue para VPS
# Uso: ./deploy.sh

echo "🚀 Iniciando despliegue..."

# Variables (ajusta según tu configuración)
VPS_USER="root"
VPS_HOST="tu-ip-vps"
VPS_PATH="/var/www/agenterag"
DOMAIN="agenterag.com"

# Build local
echo "📦 Construyendo proyecto..."
npm run build

# Subir archivos al VPS
echo "📤 Subiendo archivos al VPS..."
rsync -avz --delete ./dist/ $VPS_USER@$VPS_HOST:$VPS_PATH/

# Configurar Nginx en el VPS (ejecutar una sola vez)
echo "⚙️  Configurando Nginx..."
ssh $VPS_USER@$VPS_HOST << 'EOF'
cat > /etc/nginx/sites-available/agenterag << 'NGINX'
server {
    listen 80;
    server_name agenterag.com www.agenterag.com;
    root /var/www/agenterag;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Caché para assets estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
NGINX

ln -sf /etc/nginx/sites-available/agenterag /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

# Instalar SSL con Certbot
certbot --nginx -d agenterag.com -d www.agenterag.com --non-interactive --agree-tos -m tu@email.com
EOF

echo "✅ Despliegue completado!"
