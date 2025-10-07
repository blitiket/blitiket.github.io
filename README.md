# Raja Forklift Website

Website company profile untuk distributor dan supplier forklift di Indonesia. Dibuat menggunakan native HTML, CSS, dan JavaScript tanpa framework atau library tambahan (kecuali Font Awesome untuk icons).

## 🚀 Features

### 1. **Responsive Design**
- Fully responsive untuk semua device (desktop, tablet, mobile)
- Mobile-first approach dengan breakpoints optimal
- Hamburger menu untuk mobile navigation

### 2. **Hero Slider**
- Auto-sliding banner dengan 3 slides
- Manual navigation dengan prev/next buttons
- Dot indicators untuk navigasi langsung
- Pause on hover functionality
- Smooth transitions

### 3. **Product Showcase**
- Product categories dengan icon dan deskripsi
- Featured products grid dengan badge (New, Popular)
- Product specifications display
- Hover effects untuk better UX

### 4. **Services Section**
- 6 layanan utama dengan icon
- Grid layout responsive
- Hover animations

### 5. **Why Choose Us**
- Animated statistics counter
- Feature list dengan icons
- Gradient background design

### 6. **Articles/Blog**
- Latest articles grid
- Article metadata (date, author)
- Placeholder untuk featured images

### 7. **Contact Section**
- Contact information cards
- Contact form dengan validation
- Email dan phone number validation
- Form submission handling

### 8. **Interactive Elements**
- Smooth scroll navigation
- Active menu highlighting on scroll
- Scroll to top button
- Animate on scroll effects
- Counter animations
- Hover effects pada cards

## 📁 File Structure

```
forklift/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # All JavaScript functionality
└── README.md           # Documentation
```

## 🎨 Design Features

### Color Scheme
- Primary Color: `#ff6b00` (Orange)
- Secondary Color: `#1a1a1a` (Dark)
- Accent Color: `#ffa500` (Light Orange)
- Background: `#f8f9fa` (Light Gray)

### Typography
- Font Family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- Responsive font sizes
- Clear hierarchy

### Components
- Modern card designs
- Gradient backgrounds
- Box shadows untuk depth
- Border radius untuk smooth edges
- Smooth transitions

## 🔧 JavaScript Functionality

### 1. Mobile Menu
```javascript
- Toggle hamburger menu
- Close menu on link click
- Smooth animations
```

### 2. Hero Slider
```javascript
- Auto-slide every 5 seconds
- Manual navigation (prev/next)
- Dot navigation
- Pause on hover
- Smooth transitions
```

### 3. Navigation
```javascript
- Active link highlighting on scroll
- Smooth scroll to sections
- Mobile menu toggle
```

### 4. Scroll Effects
```javascript
- Scroll to top button (appears after 300px)
- Header shadow on scroll
- Animate on scroll for cards
```

### 5. Form Validation
```javascript
- Required fields validation
- Email format validation
- Phone number validation (Indonesian format)
- Success message
```

### 6. Animations
```javascript
- Counter animation untuk statistics
- Intersection Observer untuk scroll animations
- Hover effects untuk cards
- Icon rotation effects
```

## 📱 Responsive Breakpoints

- **Desktop**: > 992px
- **Tablet**: 768px - 992px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## 📦 Dependencies

- **Font Awesome 6.4.0** - untuk icons
- CDN: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css`

## 🚀 How to Use

1. **Clone atau Download** project ini
2. **Buka** `index.html` di browser
3. **Atau** gunakan local server:
   ```bash
   # Menggunakan Python
   python -m http.server 8000
   
   # Menggunakan Node.js (http-server)
   npx http-server
   
   # Menggunakan PHP
   php -S localhost:8000
   ```
4. Akses di browser: `http://localhost:8000`

## 🎯 Sections Overview

### 1. Header
- Logo dan tagline
- Navigation menu (6 items)
- Mobile hamburger menu
- Sticky header dengan scroll effect

### 2. Hero Section
- 3 slides dengan gradient backgrounds
- Call-to-action buttons
- Auto-sliding functionality
- Navigation controls

### 3. Product Categories
- 4 kategori utama:
  - Electric Forklift
  - Diesel Forklift
  - Warehouse Truck
  - Wheel Loader

### 4. Featured Products
- 4 produk unggulan
- Product badges (New, Popular)
- Specifications display
- View details button

### 5. Services
- 6 layanan:
  - Sales
  - Rental
  - Service & Maintenance
  - Spare Parts
  - Attachment
  - Training

### 6. Why Choose Us
- 6 keunggulan
- 4 statistik dengan counter animation:
  - 15+ Years Experience
  - 500+ Happy Clients
  - 1000+ Units Sold
  - 24/7 Support

### 7. Articles
- 3 artikel terbaru
- Article metadata
- Read more links

### 8. Contact
- 4 info cards:
  - Address
  - Phone
  - Email
  - Working Hours
- Contact form dengan validation

### 9. Footer
- Company info dengan social media links
- Products links
- Services links
- Company links
- Copyright notice

## 🎨 Customization

### Mengubah Warna
Edit di `styles.css`:
```css
:root {
    --primary-color: #ff6b00;    /* Warna utama */
    --secondary-color: #1a1a1a;  /* Warna gelap */
    --accent-color: #ffa500;     /* Warna aksen */
}
```

### Mengubah Konten
Edit di `index.html`:
- Ganti teks sesuai kebutuhan
- Update contact information
- Tambah/kurangi produk atau services

### Menambah Gambar
1. Simpan gambar di folder `images/`
2. Ganti placeholder dengan:
```html
<img src="images/your-image.jpg" alt="Description">
```

### Mengubah Slider Speed
Edit di `script.js`:
```javascript
slideInterval = setInterval(nextSlide, 5000); // 5000ms = 5 detik
```

## 🔍 SEO Ready

- Semantic HTML5 tags
- Meta description
- Proper heading hierarchy
- Alt text untuk images (siap ditambahkan)
- Clean URL structure

## ⚡ Performance

- Minimal dependencies
- Optimized CSS
- Efficient JavaScript
- Lazy loading ready
- Fast load time

## 📝 TODO / Future Enhancements

- [ ] Tambahkan real images untuk products dan articles
- [ ] Implementasi backend untuk contact form
- [ ] Tambahkan product detail pages
- [ ] Implementasi blog system
- [ ] Tambahkan search functionality
- [ ] Integrasi dengan WhatsApp Business API
- [ ] Tambahkan language switcher (ID/EN)
- [ ] Implementasi dark mode
- [ ] Tambahkan testimonials section
- [ ] Integrasi dengan Google Maps untuk location

## 📄 License

Free to use for personal and commercial projects.

## 👨‍💻 Developer Notes

Website ini dibuat dengan fokus pada:
- **Clean Code**: Kode yang mudah dibaca dan maintain
- **Best Practices**: Mengikuti standar web development
- **Performance**: Optimasi untuk loading speed
- **Accessibility**: Struktur yang accessible
- **Responsiveness**: Mobile-first approach

## 🤝 Contributing

Jika ingin berkontribusi:
1. Fork repository
2. Buat branch baru
3. Commit changes
4. Push ke branch
5. Create Pull Request

## 📞 Support

Untuk pertanyaan atau support, silakan hubungi melalui contact form di website.

---

**Built with ❤️ using Native HTML, CSS, and JavaScript**

*Last Updated: January 2025*
