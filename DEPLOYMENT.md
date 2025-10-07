# Deployment Guide - Indonesia Forklift Website

Panduan lengkap untuk deploy website Indonesia Forklift ke berbagai platform hosting.

## 📋 Prerequisites

- File website sudah siap (HTML, CSS, JS)
- Akun hosting/platform deployment
- Domain (opsional, bisa pakai subdomain gratis)

## 🚀 Deployment Options

### 1. GitHub Pages (Gratis)

#### Langkah-langkah:
1. **Buat Repository di GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/username/indonesiaforklift.git
   git push -u origin main
   ```

2. **Aktifkan GitHub Pages**
   - Buka repository di GitHub
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: main → / (root)
   - Save

3. **Akses Website**
   - URL: `https://username.github.io/indonesiaforklift/`
   - Custom domain bisa diatur di Settings → Pages

#### Kelebihan:
- ✅ Gratis selamanya
- ✅ SSL otomatis
- ✅ CDN global
- ✅ Easy deployment

#### Kekurangan:
- ❌ Hanya untuk static site
- ❌ Tidak ada backend support

---

### 2. Netlify (Gratis)

#### Langkah-langkah:
1. **Buat Akun di Netlify**
   - Kunjungi https://netlify.com
   - Sign up dengan GitHub/Email

2. **Deploy dari GitHub**
   - New site from Git
   - Connect to GitHub
   - Pilih repository
   - Deploy!

3. **Atau Deploy Manual**
   - Drag & drop folder project ke Netlify
   - Otomatis deploy

4. **Custom Domain**
   - Site settings → Domain management
   - Add custom domain

#### Kelebihan:
- ✅ Gratis 100GB bandwidth/bulan
- ✅ Auto deploy dari Git
- ✅ SSL gratis
- ✅ Form handling
- ✅ Serverless functions

#### Kekurangan:
- ❌ Limit bandwidth untuk free tier

---

### 3. Vercel (Gratis)

#### Langkah-langkah:
1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd forklift
   vercel
   ```

3. **Atau Deploy dari Dashboard**
   - Import Git repository
   - Auto deploy

#### Kelebihan:
- ✅ Gratis unlimited bandwidth
- ✅ Edge network global
- ✅ Auto SSL
- ✅ Instant rollback

---

### 4. Cloudflare Pages (Gratis)

#### Langkah-langkah:
1. **Buat Akun Cloudflare**
2. **Pages → Create a project**
3. **Connect Git repository**
4. **Deploy**

#### Kelebihan:
- ✅ Unlimited bandwidth
- ✅ Unlimited requests
- ✅ CDN global terbaik
- ✅ DDoS protection

---

### 5. Firebase Hosting (Gratis)

#### Langkah-langkah:
1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login & Init**
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Deploy**
   ```bash
   firebase deploy
   ```

#### Kelebihan:
- ✅ 10GB storage gratis
- ✅ SSL otomatis
- ✅ CDN global
- ✅ Easy rollback

---

### 6. Shared Hosting (Berbayar)

Untuk hosting tradisional seperti Niagahoster, Hostinger, dll:

#### Langkah-langkah:
1. **Beli Hosting & Domain**
2. **Upload via FTP/cPanel**
   - Login ke cPanel
   - File Manager
   - Upload semua file ke `public_html`
3. **Set Permissions**
   - Files: 644
   - Folders: 755

#### Recommended Hosting Indonesia:
- **Niagahoster** - Rp 10k/bulan
- **Hostinger** - Rp 15k/bulan
- **IDCloudHost** - Rp 15k/bulan
- **Dewaweb** - Rp 20k/bulan

---

## 🔧 Pre-Deployment Checklist

### 1. Optimasi File
```bash
# Minify CSS (gunakan online tool atau)
# https://cssminifier.com/

# Minify JavaScript
# https://javascript-minifier.com/

# Compress Images
# https://tinypng.com/
```

### 2. Update URLs
- Ganti semua URL placeholder dengan URL production
- Update sitemap.xml dengan domain asli
- Update robots.txt dengan domain asli

### 3. Test Cross-Browser
- Chrome
- Firefox
- Safari
- Edge

### 4. Test Responsive
- Desktop (1920px, 1366px)
- Tablet (768px, 1024px)
- Mobile (375px, 414px)

### 5. SEO Check
- Meta tags lengkap ✅
- Open Graph tags ✅
- Twitter cards ✅
- Sitemap.xml ✅
- Robots.txt ✅

---

## 📊 Performance Optimization

### 1. Enable Compression
Tambahkan `.htaccess` untuk Apache:
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>
```

### 2. Browser Caching
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

### 3. CDN Setup
- Cloudflare (Gratis)
- BunnyCDN (Berbayar)
- KeyCDN (Berbayar)

---

## 🔒 Security

### 1. SSL Certificate
- Let's Encrypt (Gratis) - auto di Netlify/Vercel
- Cloudflare SSL (Gratis)
- Paid SSL dari hosting provider

### 2. Security Headers
Tambahkan di `.htaccess`:
```apache
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
</IfModule>
```

---

## 📈 Analytics Setup

### Google Analytics
1. Buat akun di https://analytics.google.com
2. Tambahkan tracking code sebelum `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Google Search Console
1. Verify ownership
2. Submit sitemap.xml
3. Monitor indexing

---

## 🐛 Troubleshooting

### Issue: CSS/JS tidak load
**Solution:**
- Check file paths (relative vs absolute)
- Check file permissions (644)
- Clear browser cache

### Issue: Form tidak submit
**Solution:**
- Implementasi backend (PHP/Node.js)
- Atau gunakan service: Formspree, Netlify Forms

### Issue: Slow loading
**Solution:**
- Compress images
- Minify CSS/JS
- Enable caching
- Use CDN

---

## 📞 Support

Untuk bantuan deployment, hubungi:
- Email: support@indonesiaforklift.com
- WhatsApp: +62 812 3456 7890

---

## 🎯 Recommended: Netlify

Untuk kemudahan dan fitur terbaik, kami rekomendasikan **Netlify**:

1. **Gratis & Mudah**
2. **Auto deploy dari Git**
3. **SSL gratis**
4. **Form handling built-in**
5. **CDN global**

### Quick Deploy ke Netlify:
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

---

**Happy Deploying! 🚀**

*Last Updated: January 2025*
