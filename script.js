// Redirect www to non-www
if (window.location.hostname === 'www.rajaforklift.id') {
    window.location.href = 'https://rajaforklift.id' + window.location.pathname + window.location.search + window.location.hash;
}

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');
const navLinks = document.querySelectorAll('.nav-link');

// Create overlay element
const overlay = document.createElement('div');
overlay.className = 'nav-overlay';
document.body.appendChild(overlay);

mobileMenuBtn.addEventListener('click', () => {
    const isActive = mainNav.classList.contains('active');
    mobileMenuBtn.classList.toggle('active');
    mainNav.classList.toggle('active');
    overlay.classList.toggle('active');
    
    if (!isActive) {
        document.body.classList.add('menu-open');
    } else {
        document.body.classList.remove('menu-open');
    }
});

// Close menu when clicking overlay
overlay.addEventListener('click', () => {
    mainNav.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('menu-open');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mainNav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Active Navigation on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Header Scroll Effect
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Lottie Animation (Simple placeholder - you can add lottie-web library for real animation)
const lottieContainer = document.getElementById('lottieAnimation');
if (lottieContainer) {
    // Create a simple forklift icon animation placeholder
    const iconSize = window.innerWidth <= 480 ? '90px' : window.innerWidth <= 768 ? '100px' : '120px';
    lottieContainer.innerHTML = `<i class="fas fa-forklift" style="font-size: ${iconSize}; color: white;"></i>`;
    
    // Add animation
    lottieContainer.style.animation = 'bounce 2s ease-in-out infinite';
    
    // Update size on resize
    window.addEventListener('resize', () => {
        const newSize = window.innerWidth <= 480 ? '90px' : window.innerWidth <= 768 ? '100px' : '120px';
        const icon = lottieContainer.querySelector('i');
        if (icon) icon.style.fontSize = newSize;
    });
}

// PDF Preview Renderer
function renderPDFPreview() {
    // Set worker path for PDF.js
    if (typeof pdfjsLib !== 'undefined') {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        
        const thumbnails = document.querySelectorAll('.katalog-thumbnail[data-pdf]');
        
        thumbnails.forEach(thumbnail => {
            const pdfPath = thumbnail.getAttribute('data-pdf');
            const canvas = thumbnail.querySelector('.pdf-canvas');
            const loading = thumbnail.querySelector('.pdf-loading');
            
            if (!canvas || !pdfPath) return;
            
            // Load PDF
            pdfjsLib.getDocument(pdfPath).promise.then(pdf => {
                // Get first page
                return pdf.getPage(1);
            }).then(page => {
                const viewport = page.getViewport({ scale: 1.5 });
                const context = canvas.getContext('2d');
                
                // Set canvas dimensions
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                
                // Render PDF page
                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                
                return page.render(renderContext).promise;
            }).then(() => {
                // Hide loading spinner
                thumbnail.classList.add('loaded');
            }).catch(error => {
                console.error('Error loading PDF:', error);
                // Show error icon
                thumbnail.innerHTML = '<i class="fas fa-file-pdf"></i>';
            });
        });
    }
}

// Image Lazy Loading with Blur Effect
function initImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading class initially
        img.classList.add('loading');
        
        // If image is already cached/loaded
        if (img.complete) {
            img.classList.remove('loading');
            img.classList.add('loaded');
        } else {
            // Add load event listener
            img.addEventListener('load', function() {
                this.classList.remove('loading');
                this.classList.add('loaded');
            });
            
            // Add error event listener
            img.addEventListener('error', function() {
                this.classList.remove('loading');
                this.classList.add('loaded');
            });
        }
    });
}

// Initialize PDF preview when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initImageLoading();
    renderPDFPreview();
});

// Katalog Carousel
const katalogTrack = document.getElementById('katalogTrack');
const prevKatalog = document.getElementById('prevKatalog');
const nextKatalog = document.getElementById('nextKatalog');

if (katalogTrack && prevKatalog && nextKatalog) {
    let currentPosition = 0;
    const itemWidth = katalogTrack.querySelector('.katalog-item').offsetWidth + 20; // width + gap
    const visibleItems = 4;
    const totalItems = katalogTrack.querySelectorAll('.katalog-item').length;
    const maxPosition = -(totalItems - visibleItems) * itemWidth;

    nextKatalog.addEventListener('click', () => {
        if (currentPosition > maxPosition) {
            currentPosition -= itemWidth;
            katalogTrack.style.transform = `translateX(${currentPosition}px)`;
        }
    });

    prevKatalog.addEventListener('click', () => {
        if (currentPosition < 0) {
            currentPosition += itemWidth;
            katalogTrack.style.transform = `translateX(${currentPosition}px)`;
        }
    });
}

// WhatsApp Modal
const whatsappModal = document.getElementById('whatsappModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const openModalButtons = document.querySelectorAll('.open-whatsapp-modal');

// Open modal
openModalButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        whatsappModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close modal
function closeModal() {
    whatsappModal.classList.remove('active');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && whatsappModal.classList.contains('active')) {
        closeModal();
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if href is just "#" or empty
        if (href === '#' || href.length <= 1) {
            return;
        }
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// WhatsApp Float Button
const whatsappFloat = document.getElementById('whatsappFloat');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        whatsappFloat.classList.add('visible');
    } else {
        whatsappFloat.classList.remove('visible');
    }
});

// Contact Form removed - no form handling needed

// Animate on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Elements to animate
const animateElements = document.querySelectorAll('.category-card, .product-card, .service-card, .article-card, .stat-card, .info-card');

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Counter Animation for Stats
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (element) => {
    const target = element.textContent;
    const isPlus = target.includes('+');
    const number = parseInt(target.replace(/\D/g, ''));
    const duration = 2000;
    const increment = number / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < number) {
            element.textContent = Math.floor(current) + (isPlus ? '+' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            animateCounter(entry.target);
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// Product Card Hover Effect
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Category Card Hover Effect
const categoryCards = document.querySelectorAll('.category-card');

categoryCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.category-icon');
        icon.style.transform = 'rotate(360deg) scale(1.1)';
        icon.style.transition = 'transform 0.6s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.category-icon');
        icon.style.transform = 'rotate(0deg) scale(1)';
    });
});

// Remove duplicate header scroll effect (already added above)

// Lazy Loading for Images (if images are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// Article Modal
const articleModal = document.getElementById('articleModal');
const articleModalOverlay = document.getElementById('articleModalOverlay');
const articleModalClose = document.getElementById('articleModalClose');
const articleReadMoreButtons = document.querySelectorAll('.article-read-more');

// Article data
const articlesData = {
    1: {
        category: 'SCISSOR LIFT',
        title: 'Panduan Lengkap Memilih Scissor Lift yang Tepat untuk Proyek Anda',
        content: `
            <p>Scissor lift adalah jenis alat angkat vertikal yang digunakan untuk mengangkat orang atau barang ke ketinggian tertentu. Alat ini dinamakan "scissor lift" karena mekanisme pengangkatannya menggunakan sistem lipatan silang seperti gunting (scissors) yang saling tumpang tindih. Sistem ini memungkinkan platform alat ini untuk naik atau turun secara vertikal.</p>
            
            <p>Memilih scissor lift yang tepat sangat penting untuk memastikan efisiensi dan keselamatan saat digunakan. Berikut adalah tutorial langkah demi langkah tentang cara memilih scissor lift yang sesuai dengan kebutuhan Anda:</p>
            
            <h3>1. Tentukan Kebutuhan Akses dan Pekerjaan</h3>
            <p>Pertimbangkan tinggi maksimal yang diperlukan untuk pekerjaan Anda, serta jenis pekerjaan yang akan dilakukan. Scissor lift umumnya digunakan untuk pekerjaan yang memerlukan akses vertikal, seperti pengecatan, perawatan, instalasi listrik, dan pengangkutan barang.</p>
            
            <h4>Langkah-langkah:</h4>
            <ul>
                <li><strong>Tinggi kerja:</strong> Tentukan seberapa tinggi Anda perlu menjangkau. Scissor lift biasanya memiliki ketinggian kerja antara 6 meter hingga 20 meter atau lebih. Pastikan memilih yang sesuai dengan ketinggian yang Anda perlukan, termasuk faktor keamanan dan margin ekstra.</li>
                <li><strong>Ukuran platform:</strong> Pilih scissor lift dengan ukuran platform yang sesuai dengan jumlah orang dan peralatan yang perlu diangkut. Beberapa model memiliki platform kecil, sedangkan yang lainnya lebih luas.</li>
            </ul>
            
            <h3>2. Pilih Jenis Scissor Lift</h3>
            <p>Ada beberapa jenis scissor lift, masing-masing dengan fitur yang berbeda, seperti:</p>
            <ul>
                <li><strong>Electric Scissor Lift:</strong> Ideal untuk pekerjaan di dalam ruangan, dengan emisi rendah dan lebih ramah lingkungan.</li>
                <li><strong>Rough Terrain Scissor Lift:</strong> Didesain untuk digunakan di luar ruangan dan di medan yang kasar. Dilengkapi dengan ban besar dan kemampuan untuk mengatasi permukaan tidak rata.</li>
                <li><strong>Diesel Scissor Lift:</strong> Dikenal dengan daya dan kemampuan menanjaknya, cocok untuk digunakan di luar ruangan dengan medan yang lebih sulit dan di tempat yang tidak ada sumber listrik.</li>
            </ul>
            
            <h3>3. Pertimbangkan Kapasitas Beban</h3>
            <p>Pastikan kapasitas angkat scissor lift cukup untuk pekerjaan yang akan dilakukan. Kapasitas ini berkisar antara 250 kg hingga lebih dari 1000 kg, tergantung pada model dan ukuran.</p>
            
            <h4>Langkah-langkah:</h4>
            <ul>
                <li>Tentukan total berat orang dan peralatan yang akan diangkat.</li>
                <li>Pilih model dengan kapasitas beban yang sedikit lebih tinggi daripada total beban untuk meningkatkan margin keamanan.</li>
            </ul>
            
            <h3>4. Cek Fitur Keamanan</h3>
            <p>Scissor lift harus memiliki fitur keamanan untuk melindungi penggunanya. Beberapa fitur yang penting termasuk:</p>
            <ul>
                <li><strong>Sensor penurunan beban:</strong> Memastikan lift tidak terangkat lebih tinggi dari kapasitas beban yang ditentukan.</li>
                <li><strong>Kunci pengaman:</strong> Untuk menghindari penggunaan lift yang tidak disengaja.</li>
                <li><strong>Batasan ketinggian:</strong> Untuk mencegah pengangkatan terlalu tinggi yang bisa membahayakan.</li>
            </ul>
            
            <h3>5. Tentukan Sumber Daya dan Lokasi Penggunaan</h3>
            <p>Apakah scissor lift akan digunakan di luar ruangan atau di dalam ruangan? Apakah ada akses ke sumber listrik atau apakah Anda perlu memilih model berbahan bakar?</p>
            
            <h4>Langkah-langkah:</h4>
            <ul>
                <li><strong>Penggunaan dalam ruangan:</strong> Pilih model elektrik yang bebas emisi dan lebih aman di area tertutup.</li>
                <li><strong>Penggunaan luar ruangan:</strong> Jika digunakan di medan kasar, pilih rough terrain atau model diesel.</li>
            </ul>
            
            <h3>6. Pertimbangkan Kualitas dan Biaya</h3>
            <p>Cari scissor lift yang menawarkan keseimbangan terbaik antara kualitas dan harga. Pertimbangkan biaya pemeliharaan dan perawatan jangka panjang, serta pilihan penyewaan jika anggaran terbatas.</p>
            
            <h3>7. Cek Sertifikasi dan Standar Keamanan</h3>
            <p>Pastikan bahwa scissor lift yang dipilih memenuhi standar keselamatan dan memiliki sertifikasi yang sesuai dengan regulasi lokal. Ini penting untuk memastikan bahwa lift aman digunakan di tempat kerja Anda.</p>
            
            <h3>8. Uji Coba</h3>
            <p>Jika memungkinkan, lakukan uji coba sebelum membeli atau menyewa scissor lift. Pastikan bahwa semua fungsi bekerja dengan baik dan bahwa Anda merasa nyaman menggunakan peralatan tersebut.</p>
            
            <p>Dengan mengikuti langkah-langkah ini, Anda dapat memilih scissor lift yang sesuai dengan kebutuhan Anda, baik untuk pekerjaan dalam ruangan maupun luar ruangan, dengan kapasitas dan fitur yang tepat.</p>
            
            <p>Beberapa model utama scissor lift dari Mantall mencakup V Series (elektrik dalam ruangan), A Series (untuk medan kasar), M Series (mini dan kompak), dan S Series (hidrolik). Model-model ini bervariasi dalam hal kapasitas, ketinggian angkat, dan jenis penggerak, memberikan pilihan yang sesuai dengan kebutuhan spesifik seperti pekerjaan dalam ruangan, luar ruangan, atau di ruang terbatas.</p>
        `
    },
    2: {
        category: 'INFORMATION',
        title: 'Memilih Alat Angkut yang Tepat untuk Gudang Cold Storage',
        content: `
            <p>Untuk kebutuhan Pemindahan barang yang cocok untuk cold storage, Heli menawarkan berbagai model yang dirancang khusus untuk dapat beroperasi dalam suhu rendah, seperti di gudang pendingin atau ruang penyimpanan beku. Model-model ini dirancang untuk memastikan efisiensi dan daya tahan dalam kondisi suhu ekstrem, di bawah nol derajat Celsius.</p>
            
            <p>Berikut adalah beberapa model forklift Heli yang sering digunakan dalam lingkungan cold storage:</p>
            
            <h3>1. Forklift Heli Electric (Model 1-5 Ton)</h3>
            <h4>Fitur Utama:</h4>
            <ul>
                <li>Daya tahan baterai lebih baik di suhu rendah berkat penggunaan teknologi baterai khusus untuk cold storage.</li>
                <li>Kabin yang dilengkapi pemanas untuk kenyamanan operator dalam suhu ekstrem.</li>
                <li>Konstruksi yang tahan lama dan bahan yang tahan terhadap korosi, penting untuk menjaga kinerja dalam suhu dingin yang berisiko merusak peralatan.</li>
            </ul>
            
            <h4>Model yang sering digunakan:</h4>
            <ul>
                <li>CPCD30 (model dengan kapasitas angkat sekitar 3 ton).</li>
                <li>CPD30 (forklift yang bisa digunakan untuk operasi di cold storage dengan kapasitas beban yang bervariasi).</li>
            </ul>
            
            <h3>2. Forklift Reach Truck Heli (Electric)</h3>
            <h4>Fitur Utama:</h4>
            <ul>
                <li>Desain tinggi dan ramping, ideal untuk bekerja di lorong sempit di cold storage.</li>
                <li>Kontrol suhu dan sistem pemanas untuk menjaga sistem agar tetap berfungsi dengan baik.</li>
                <li>Menggunakan baterai khusus untuk cold storage yang tetap memberikan kinerja optimal pada suhu ekstrem.</li>
            </ul>
            
            <h4>Model yang sering digunakan:</h4>
            <ul>
                <li>R series (Reach Trucks) Heli, cocok untuk rak tinggi dan ruang terbatas di gudang beku.</li>
            </ul>
            
            <h3>3. Forklift Heli Internal Combustion (IC)</h3>
            <h4>Fitur Utama:</h4>
            <ul>
                <li>Cocok untuk area cold storage dengan ventilasi yang baik karena menggunakan mesin pembakaran dalam yang lebih kuat untuk medan yang berat.</li>
                <li>Mesin dan komponen dilindungi dengan lapisan anti-karat agar tetap bertahan dalam lingkungan lembab atau beku.</li>
            </ul>
            
            <h4>Model yang sering digunakan:</h4>
            <ul>
                <li>CPCD series untuk kapasitas angkat lebih besar dan daya tahan mesin yang tinggi.</li>
            </ul>
            
            <h3>4. Pallet Truck dan Stacker Electric Heli</h3>
            <h4>Fitur Utama:</h4>
            <ul>
                <li>Pallet truck dan stacker elektrik ini digunakan di area cold storage dengan medan terbatas dan pengangkutan barang yang lebih ringan.</li>
                <li>Tahan terhadap suhu ekstrem dan dilengkapi dengan sistem pemanas pada kontrol dan baterai.</li>
            </ul>
            
            <h4>Model yang sering digunakan:</h4>
            <ul>
                <li>Pallet truck (CPT series) dan Electric stacker (CSE series).</li>
            </ul>
            
            <h3>Tips Memilih Forklift Heli untuk Cold Storage:</h3>
            <ul>
                <li><strong>Perhatikan jenis bahan bakar:</strong> Untuk cold storage, forklift electric sering menjadi pilihan terbaik karena tidak mengeluarkan gas berbahaya dan lebih efisien di ruang tertutup. Namun, forklift dengan mesin pembakaran dalam juga dapat dipilih jika ada ventilasi yang baik dan membutuhkan daya angkat lebih besar.</li>
                <li><strong>Sistem pemanas dan baterai yang sesuai</strong> sangat penting untuk memastikan forklift tetap beroperasi dengan baik pada suhu rendah.</li>
                <li><strong>Tahan terhadap korosi:</strong> Pilih forklift dengan lapisan yang tahan terhadap kelembapan dan salju beku.</li>
            </ul>
            
            <p>Heli memiliki banyak model yang dapat disesuaikan dengan kebutuhan spesifik cold storage. Pastikan untuk memilih model yang sesuai dengan kapasitas angkat yang diperlukan, ukuran lorong, dan fitur tahan suhu dingin untuk mendapatkan kinerja optimal.</p>
        `
    },
    3: {
        category: 'FORKLIFT',
        title: 'HELI Rajanya Forklift Diesel – Kekuatan dan Keandalan dalam Dunia Industri',
        content: `
            <p>HELI Forklift diesel telah menjadi pilihan utama di berbagai sektor industri, terutama di area yang memerlukan angkutan material berat dan operasi di luar ruangan. Forklift ini sering disebut sebagai "rajanya" forklift karena kemampuannya untuk menangani tugas berat dengan efisiensi tinggi. Dalam artikel ini, kita akan membahas keunggulan HELI forklift diesel, alasan mengapa ia menjadi pilihan utama dalam dunia industri, serta cara merawatnya untuk memastikan kinerja optimal.</p>
            
            <h3>Keunggulan HELI Forklift Diesel</h3>
            
            <h4>Kekuatan Mesin yang Luar Biasa</h4>
            <p>HELI Forklift diesel terkenal dengan daya angkut yang sangat tinggi. Mesin diesel memiliki torsi besar, yang memungkinkan forklift ini untuk mengangkat beban lebih berat dibandingkan dengan forklift berbahan bakar lainnya, seperti forklift listrik atau gas. Ini menjadikannya pilihan utama untuk lingkungan kerja yang menuntut daya angkat tinggi, seperti gudang besar, pabrik, dan pelabuhan.</p>
            
            <h4>Efisiensi Bahan Bakar</h4>
            <p>Diesel merupakan bahan bakar yang lebih efisien dibandingkan dengan bensin atau gas, sehingga forklift diesel dapat beroperasi lebih lama tanpa harus sering mengisi ulang. Ini penting di lingkungan industri yang membutuhkan operasi terus-menerus dalam waktu yang lama, mengurangi waktu henti dan meningkatkan produktivitas.</p>
            
            <h4>Daya Tahan yang Tinggi</h4>
            <p>Mesin diesel dikenal karena daya tahannya yang luar biasa. Forklift diesel dapat bekerja dalam berbagai kondisi ekstrem, baik di dalam ruangan yang padat maupun di luar ruangan yang kasar, seperti di area terbuka dengan permukaan yang tidak rata. Dengan perawatan yang tepat, forklift diesel dapat bertahan selama bertahun-tahun.</p>
            
            <h4>Kemampuan di Berbagai Kondisi Cuaca</h4>
            <p>Forklift diesel unggul dalam kondisi cuaca yang sulit, seperti hujan, salju, atau panas yang ekstrem. Karena mesin diesel lebih tahan terhadap suhu dingin dibandingkan dengan mesin bensin, forklift diesel ideal untuk digunakan di luar ruangan dalam berbagai kondisi cuaca.</p>
            
            <h4>Biaya Pemeliharaan yang Wajar</h4>
            <p>Meskipun biaya awal untuk membeli forklift diesel mungkin lebih tinggi dibandingkan dengan forklift listrik, biaya operasional dan pemeliharaan dalam jangka panjang cenderung lebih rendah. Diesel lebih mudah untuk ditemukan di banyak lokasi dan memiliki biaya bahan bakar yang lebih rendah, memberikan nilai lebih untuk investasi jangka panjang.</p>
            
            <h3>Kapan Forklift Diesel Diperlukan?</h3>
            <p>HELI Forklift diesel sangat ideal untuk digunakan dalam aplikasi di luar ruangan, seperti:</p>
            <ul>
                <li><strong>Konstruksi:</strong> Tempat kerja yang membutuhkan peralatan untuk bergerak di atas permukaan kasar dan membawa beban berat.</li>
                <li><strong>Pelabuhan dan Gudang:</strong> Di area yang memerlukan kapasitas angkat besar dan operasi 24 jam.</li>
                <li><strong>Pabrik dengan Beban Berat:</strong> Di pabrik atau fasilitas yang memproduksi barang dengan bobot besar, forklift diesel sangat membantu untuk proses pengangkutan material yang lebih besar dan berat.</li>
            </ul>
            
            <h3>Tips Merawat Forklift Diesel</h3>
            <p>Agar forklift diesel tetap berfungsi dengan baik dan memiliki umur panjang, penting untuk mengikuti beberapa langkah perawatan dasar:</p>
            
            <h4>Periksa Rutin Mesin dan Sistem Bahan Bakar</h4>
            <p>Pastikan mesin diesel berfungsi dengan baik dengan melakukan pemeriksaan rutin pada sistem bahan bakar, filter udara, dan komponen mesin lainnya.</p>
            
            <h4>Gantilah Oli Secara Berkala</h4>
            <p>Penggantian oli secara berkala adalah kunci untuk menjaga kinerja mesin forklift diesel. Pastikan Anda mengikuti jadwal penggantian oli yang disarankan oleh pabrik.</p>
            
            <h4>Periksa dan Jaga Sistem Pendingin</h4>
            <p>Mesin diesel menghasilkan banyak panas, jadi sistem pendinginan harus dijaga dengan baik untuk mencegah overheating. Periksa cairan pendingin secara teratur.</p>
            
            <h4>Perawatan Rem dan Transmisi</h4>
            <p>Rem dan transmisi harus diperiksa dan diservis secara berkala untuk memastikan forklift bekerja dengan aman dan efisien.</p>
            
            <h4>Bersihkan Mesin Secara Teratur</h4>
            <p>Debu dan kotoran yang menempel pada mesin dapat mengurangi kinerja forklift. Pastikan untuk membersihkan mesin secara berkala agar tidak ada komponen yang tersumbat atau rusak.</p>
            
            <h3>Kesimpulan</h3>
            <p>Forklift diesel adalah pilihan yang sangat baik untuk tugas angkut material berat di lingkungan industri yang menuntut daya dan ketahanan. Keunggulannya dalam kekuatan, efisiensi bahan bakar, dan kemampuan bertahan dalam kondisi sulit menjadikannya "rajanya" forklift. Dengan pemeliharaan yang tepat, forklift diesel dapat memberikan kinerja luar biasa dan bertahan lama, meningkatkan produktivitas di tempat kerja dan menjadi alat yang sangat berharga di industri manapun.</p>
        `
    }
};

// Open article modal
articleReadMoreButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const articleId = button.getAttribute('data-article-id');
        const article = articlesData[articleId];
        
        if (article) {
            document.getElementById('articleModalCategory').textContent = article.category;
            document.getElementById('articleModalTitle').textContent = article.title;
            document.getElementById('articleModalText').innerHTML = article.content;
            
            articleModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close article modal
function closeArticleModal() {
    articleModal.classList.remove('active');
    document.body.style.overflow = '';
}

articleModalClose.addEventListener('click', closeArticleModal);
articleModalOverlay.addEventListener('click', closeArticleModal);

// Close article modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && articleModal.classList.contains('active')) {
        closeArticleModal();
    }
});

// Product Detail Modal
const productModal = document.getElementById('productModal');
const productModalClose = document.getElementById('productModalClose');
const productModalOverlay = document.getElementById('productModalOverlay');
const productModalCategory = document.getElementById('productModalCategory');
const productModalTitle = document.getElementById('productModalTitle');
const productModalText = document.getElementById('productModalText');

// Products data
const productsData = {
    1: {
        category: 'Scissor Lift',
        title: 'Scissor Lift LCM',
        content: `
            <p>Scissorlift merupakan alat yang bisa digunakan untuk aplikasi pekerjaan pada ketinggian tertentu seperti perawatan gedung, proyek konstruksi mechanical & electrical, warehouse, pabrik dan bangunan retail. Scissorlift bergerak vertikal seperti gunting atau biasa disebut "pentograph" disertai platform untuk pijakan membawa pekerja, operator serta material peralatan yang diperlukan sesuai rekomendasi alat.</p>
            <p>Sehingga pekerjaan menjadi lebih aman, efektif, efisien dan aplikatif. Namun lebih utama lagi, pembelian equipment tersebut harus dengan harga yang kompetitif.</p>
        `
    },
    2: {
        category: 'Forklift Diesel',
        title: 'Forklift Big 5-10 Ton',
        content: `
            <p>Forklift HELI adalah merk Forklift nomor 1 di China dan nomor 7 di Top ranking 20 besar jajaran Forklift dunia.</p>
            <p>Di semua lini kegiatan industri, tentunya memerlukan alat angkat untuk mempermudah kegiatan loading-unloading sehingga operasional pekerjaan tersebut menjadi Efektif, Efisien, Aplikatif dan yang lebih utama lagi, pembelian equipment tersebut harus dengan harga yang kompetitif.</p>
        `
    },
    3: {
        category: 'Forklift Diesel',
        title: 'Forklift Rought Terain 3.5 Ton 4WD',
        content: `
            <p>Forklift HELI adalah merk Forklift nomor 1 di China dan nomor 7 di Top ranking 20 besar jajaran Forklift dunia.</p>
            <p>Di semua lini kegiatan industri, tentunya memerlukan alat angkat untuk mempermudah kegiatan loading-unloading sehingga operasional pekerjaan tersebut menjadi Efektif, Efisien, Aplikatif dan yang lebih utama lagi, pembelian equipment tersebut harus dengan harga yang kompetitif.</p>
        `
    },
    4: {
        category: 'Wheel Loader',
        title: 'Wheel Loader LCM917',
        content: `
            <p>Wheel Loader adalah alat berat yang digunakan untuk mengangkut, memindahkan material, pasir, tanah, batu bara atau puing-puing dari satu tempat ke tempat lainnya. Seperti sebuah traktor tetapi didepannya dipasang bucket berukuran besar. Bucket ini dihubungkan ke dua lengan di bagian samping. Bisa dipasang secara permanen atau knock down.</p>
            <p>Alat ini bisa bervariasi bergantung pada kebutuhan. Alat Berat Loader ini bisa dipasang forklift juga. Hal ini bisa membantu untuk memindahkan material dari permukaan tanah.</p>
        `
    },
    5: {
        category: 'Forklift Electric',
        title: 'Forklift Electric Battery Acid 1,5-3 Ton',
        content: `
            <p>Forklift HELI adalah merk Forklift nomor 1 di China dan nomor 7 dalam Top ranking 20 besar jajaran forklift dunia.</p>
            <p>Di semua lini kegiatan industri, tentunya memerlukan alat angkat untuk mempermudah kegiatan loading-unloading sehingga operasional pekerjaan tersebut menjadi Efektif, Efisien, Aplikatif dan yang lebih utama lagi, pembelian equipment tersebut harus dengan harga yang kompetitif.</p>
        `
    }
};

// Open product detail modal
document.querySelectorAll('.product-detail-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const productId = button.getAttribute('data-product-id');
        const product = productsData[productId];
        
        if (product) {
            productModalCategory.textContent = product.category;
            productModalTitle.textContent = product.title;
            productModalText.innerHTML = product.content;
            productModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close product modal
function closeProductModal() {
    productModal.classList.remove('active');
    document.body.style.overflow = '';
}

productModalClose.addEventListener('click', closeProductModal);
productModalOverlay.addEventListener('click', closeProductModal);

// Close product modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && productModal.classList.contains('active')) {
        closeProductModal();
    }
});

// Console welcome message
console.log('%c Welcome to Raja Forklift Website! ', 'background: #ff6b00; color: white; font-size: 16px; padding: 10px;');
console.log('%c Built with ❤️ using Native HTML, CSS, and JavaScript ', 'color: #666; font-size: 12px;');

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
});
