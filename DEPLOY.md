# 🚀 VPS Deploy Yo'riqnomasi — Duv-Duv Gap

## Talablar

VPS da quyidagilar o'rnatilgan bo'lishi kerak:
- Docker (`apt install docker.io`)
- Docker Compose (`apt install docker-compose`)
- Git

---

## 1. Kodni VPS ga olish

```bash
# Birinchi marta
git clone https://github.com/YOUR_USERNAME/duvduv-gap.git /var/www/duvduv-gap
cd /var/www/duvduv-gap/duvduv-next

# Keyingi yangilanishlar uchun
git pull origin main
```

---

## 2. Environment Variables sozlash

```bash
# .env.example dan nusxa olish
cp .env.example .env.local

# Haqiqiy qiymatlarni kiritish
nano .env.local
```

`.env.local` quyidagicha bo'lishi kerak:
```
GOOGLE_SERVICE_ACCOUNT_EMAIL="duv-duv-lidlar@duv-duv-maktab.iam.gserviceaccount.com"
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID="1yRGp3W2m1oDkhZQ2KDdCVerKGfCu0AcEn8zXK1X8N88"
```

> ⚠️ `.env.local` fayli git'ga tushmaydi (`.gitignore` da bor). VPS da qo'lda yaratilishi kerak.

---

## 3. Docker bilan ishga tushirish

```bash
cd /var/www/duvduv-gap/duvduv-next

# Build va ishga tushirish
docker-compose up -d --build

# Loglarni ko'rish
docker-compose logs -f

# Holatni tekshirish
docker-compose ps
```

Ilova `http://YOUR_VPS_IP:3000` da ishlaydi.

---

## 4. Nginx orqali domain ulash (ixtiyoriy)

```bash
apt install nginx
```

`/etc/nginx/sites-available/duvduv-gap`:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
ln -s /etc/nginx/sites-available/duvduv-gap /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

---

## 5. SSL (HTTPS) — Let's Encrypt

```bash
apt install certbot python3-certbot-nginx
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## 6. Yangilanish (Update)

```bash
cd /var/www/duvduv-gap
git pull origin main
cd duvduv-next
docker-compose up -d --build
```

---

## Foydali buyruqlar

```bash
# Containerni to'xtatish
docker-compose down

# Loglarni ko'rish
docker-compose logs -f app

# Containerni qayta ishga tushirish
docker-compose restart

# Docker image o'lchamini ko'rish
docker images | grep duvduv
```

---

## Portlar

| Port | Maqsad |
|------|--------|
| 3000 | Next.js server (ichki) |
| 80   | HTTP (Nginx) |
| 443  | HTTPS (Nginx + SSL) |
