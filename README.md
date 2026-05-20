<div align="center">
  <br/>
  <img src="https://images.unsplash.com/vector-1778639108685-395007c80714?w=200&auto=format&fit=crop&q=80" alt="Saverish Logo" width="120" style="border-radius: 24px;" />
  <br/><br/>

  <h1 align="center" style="font-size: 3.5rem; font-weight: 900; letter-spacing: -0.04em; line-height: 1; text-transform: uppercase;">
    Saverish
  </h1>

  <p align="center" style="font-size: 1.2rem; font-weight: 700; color: #F28F3B;">
    Rescue Delicious Food. Save Our Planet.
  </p>

  <p align="center" style="font-size: 0.85rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: #888;">
    SEFEST 2026 Web Design Competition Entry<br/>
    Gen-Z TechPreneur: Digital Solutions for a Sustainable Future
  </p>

  <br/>

  <!-- BADGES -->
  <p align="center">
    <img src="https://img.shields.io/badge/Next.js%2016-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 16" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind%20CSS%204-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
    <img src="https://img.shields.io/badge/Framer%20Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
    <img src="https://img.shields.io/badge/React%2019-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
    <img src="https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP" />
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" />
    <img src="https://img.shields.io/badge/Lucide%20Icons-F56565?style=for-the-badge&logo=lucide&logoColor=white" alt="Lucide Icons" />
    <img src="https://img.shields.io/badge/Phosphor%20Icons-3B82F6?style=for-the-badge&logo=phosphoricons&logoColor=white" alt="Phosphor Icons" />
  </p>

  <br/>

  <!-- LIVE DEMO LINK -->
  <div style="background-color: #F28F3B; border-radius: 14px; padding: 3px; display: inline-block;">
    <div style="background-color: #F4F3EE; border-radius: 12px; padding: 16px 40px; text-align: center;">
      <a href="https://saverish.web.id" target="_blank" style="font-size: 1.4rem; font-weight: 900; color: #2D2A26; text-decoration: none; border-bottom: 3px solid #F28F3B; padding-bottom: 2px;">
        saverish.web.id
      </a>
    </div>
  </div>

  <br/>
</div>

---

## Daftar Isi

- [Gambaran Proyek & Keselarasan SDG](#gambaran-proyek--keselarasan-sdg)
- [Tech Stack & Prasyarat](#tech-stack--prasyarat)
- [Panduan Instalasi Langkah demi Langkah](#panduan-instalasi-langkah-demi-langkah)
- [Alur Kerja Sistem](#alur-kerja-sistem)
- [Struktur Direktori Proyek](#struktur-direktori-proyek)
- [Standar Kode & Skalabilitas](#standar-kode--skalabilitas)
- [Kontributor Proyek](#kontributor-proyek)

---

## Gambaran Proyek & Keselarasan SDG

### Apa itu Saverish?

**Saverish** adalah platform digital berbasis Next.js yang **menyelamatkan makanan surplus** dari restoran, toko roti, dan kafe lokal -- lalu menawarkannya kepada pengguna dengan **harga flash sale**. Dibangun untuk **Gen-Z TechPreneur**, Saverish mengubah krisis limbah makanan harian menjadi pengalaman menyelamatkan makanan dan membeli dengan harga paling murah.

Daripada membiarkan makanan yang masih layak terbuang di akhir hari, Saverish bertindak sebagai jembatan real-time antara **merchant** dengan **konsumen** yang ingin mencari makanan dengan harga terjangkau + secara tidak langsung berkontribusi dalam mengurangi limbah makanan.

### Keselarasan dengan SDG 12 - Sustainable Development Goal

| Target SDG | Kontribusi Saverish |
|---|---|
| **12.3** -- Mengurangi separuh limbah makanan per kapita global di tingkat ritel & konsumen | Setiap Surplus Box yang dibeli = satu makanan lebih sedikit yang berakhir di tempat pembuangan. Metrik real-time (offset CO2, kg diselamatkan) membuat dampak terukur. |
| **12.5** -- Mengurangi secara substansial pembuangan limbah melalui pencegahan, pengurangan, daur ulang & penggunaan ulang | Saverish mengalihkan makanan surplus yang masih layak dari pembuangan ke konsumsi, memperpanjang siklus hidup makanan yang telah disiapkan. |
| **12.8** -- Memastikan semua orang memiliki informasi & kesadaran yang relevan untuk pembangunan berkelanjutan | Dashboard Impact Analytics memvisualisasikan performa keberlanjutan, mengedukasi pengguna tentang kontribusi lingkungan pribadi mereka. |

---

## Tech Stack & Prasyarat

### Teknologi Inti

| Lapisan | Teknologi | Fungsi |
|---|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) | Routing berbasis file, hybrid SSR/CSR, bundler Turbopack |
| **Bahasa** | [TypeScript 5](https://www.typescriptlang.org/) | Tipe statis, mode strict, props & state yang type-safe |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) | CSS utility-first, `@tailwindcss/postcss`, zero-runtime |
| **Animasi** | [Framer Motion 12](https://www.framer.com/motion/) | Animasi spring deklaratif, transisi `AnimatePresence` |
| **Animasi** | [GSAP 3](https://gsap.com/) + [Lenis](https://lenis.darkroom.engineering/) | Animasi scroll-triggered berkinerja tinggi & smooth scrolling |
| **Ikon** | [Lucide React](https://lucide.dev/) + [Phosphor Icons](https://phosphoricons.com/) | Ikonografi konsisten di seluruh dashboard & landing page |
| **Font** | Inter + Plus Jakarta Sans (via `next/font`) | Font variabel dengan zero CLS -- self-hosted yang dioptimalkan |
| **Linting** | [ESLint 9](https://eslint.org/) + `eslint-config-next` | Aturan lint ketat, gaya kode konsisten |

### Prasyarat

Pastikan hal-hal berikut terinstal di sistem Anda sebelum melanjutkan:

- **Node.js** `>= 20.x` (disarankan versi LTS)
- **npm** `>= 10.x` (atau **yarn** `>= 1.22` / **pnpm** `>= 8.x`)

Verifikasi dengan:

```bash
node -v   # v20.x atau lebih tinggi
npm -v    # v10.x atau lebih tinggi
```

---

## Panduan Instalasi Langkah demi Langkah

### 1 -- Klon Repositori

```bash
https://github.com/Marvellbrazil/SEFEST26WEBDESIGN_LosTresDisenadores.git
```

### 2 -- Masuk ke Direktori Proyek

```bash
cd SEFEST26WEBDESIGN_LosTresDisenadores
```

### 3 -- Instal Dependensi

```bash
npm install
```

Perintah ini akan menginstal semua dependensi runtime dan development yang terdefinisi di `package.json`, termasuk Next.js, React 19, Tailwind CSS 4, Framer Motion, GSAP, Lenis, Lucide React, Phosphor Icons, dan TypeScript.

### 4 -- Jalankan Development Server

```bash
npm run dev
```

Terminal akan menampilkan:

```
▲ next dev
   Local:        http://localhost:3000
```

### 5 -- Buka di Browser

Buka **[http://localhost:3000](http://localhost:3000)** di peramban Anda untuk melihat Saverish secara langsung.

> **Tips:** Untuk pengalaman terbaik, gunakan peramban modern (Chrome, Edge, atau Firefox) dengan akselerasi perangkat keras diaktifkan agar dapat sepenuhnya menikmati animasi scroll GSAP dan kursor kustom.

---

## Alur Kerja Sistem

Saverish mengadopsi alur penyelamatan makanan yang terintegrasi dari eksplorasi hingga pengambilan fisik:

```
[1. Eksplorasi] ──> Kunjungi Landing Page ──> Lihat animasi intro, statistik dampak, & penjelasan misi Saverish
       │
[2. Autentikasi] ──> Masuk ke Halaman Login ──> Pilih mode Sign In atau Sign Up ──> Transisi animasi geser dinamis
       │
[3. Dashboard] ──> Masuk ke Ruang Kendali ──> Lihat grafik dampak lingkungan, metrik penyelamatan, & penawaran terdekat
       │
[4. Pemesanan] ─> Pilih Surplus Box dari merchant ──> Tambahkan ke keranjang ──> Lanjut ke Checkout
       │
[5. Pembayaran] ─> Pilih metode pembayaran di Halaman Payment ──> Review ringkasan pesanan ──> Konfirmasi & Bayar
       │
[6. Pengambilan] ──> Ikuti panduan pickup 3 langkah di Halaman Pickup Guide ──> Datang ke merchant ──> Tunjukkan Order ID ──> Tandai "Collected"
       │
[7. Pembaruan Dampak] ──> Kembali ke Dashboard ──> Eco-Points bertambah ─> CO2 Offset ter-update ──> Goal progress meningkat
```

---

## Struktur Direktori Proyek

```
SEFEST26WEBDESIGN_LosTresDisenadores/
├── .git/
├── .gitignore
── .hintrc
├── .next/
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts              # Konfigurasi Next.js (pola gambar remote untuk Unsplash)
├── package-lock.json
├── package.json                # Script: dev, build, start, lint
├── postcss.config.mjs
├── tsconfig.json               # TypeScript strict, target ES2017, bundler moduleResolution
├── tsconfig.tsbuildinfo
├── README.md
│
├── public/                     # Aset statis
│   ├── assets/
│   ├── font/
│   ├── favicon.svg
│   ├── Hero.png
│   ├── HD.png
│   ├── waste.png
│   ├── SaSVG.svg
│   └── ...
│
├── src/                        # Logika bersama, tipe, konstanta, hooks
│   ├── components/             # Komponen UI yang dapat digunakan ulang
│   │   ├── footer/
│   │   ├── hero/
│   │   └── navbar/
│   ├── constants/              # Koleksi data statis
│   │   ├── footer.ts
│   │   ├── hero.ts
│   │   └── navbar.ts
│   ├── hooks/                  # Custom React hooks
│   │   ├── index.ts
│   │   ├── useFooter.ts
│   │   ├── useGSAP.ts
│   │   ├── useLenis.ts
│   │   └── useNavbar.ts
│   ├── types/                  # Definisi interface TypeScript
│   │   ├── footer.ts
│   │   ├── hero.ts
│   │   └── navbar.ts
│   └── utils/                  # Fungsi utilitas
│       ├── animation.ts
│       ── device.ts
│
└── app/                        # Next.js App Router -- semua rute & halaman
    ├── globals.css             # CSS global (direktif Tailwind, variabel CSS)
    ├── layout.tsx              # Layout root (font, metadata, tag OG)
    ├── page.tsx                # Landing page (Intro -> Hero -> Section -> FAQ -> Footer)
    │
    ├── components/             # Komponen khusus Landing Page
    │   ├── data/               # File data statis
    │   │   ├── howItWorks.ts
│   │   ├── impactData.ts
│   │   ├── index.ts
│   │   └── problemCards.ts
    │   ├── CustomCursor.tsx
    │   ├── FAQ.tsx
    │   ├── Footer.tsx
    │   ├── Intro.tsx
    │   ├── LoadingBar.tsx
    │   ├── RescuedMeals.tsx
    │   ├── Section2.tsx ... Section6.tsx
    │   ├── SmoothScroll.tsx
    │   ├── Testimonials.tsx
    │   └── WhySaverish.tsx
    │
    ├── login/                  # Rute: /login
    │   ├── page.tsx            # Auth split-screen dengan animasi spring clip-path
    │   └── components/
    │       └── ForgotPasswordModal.tsx
    │
    ├── dashboard/              # Rute: /dashboard
    │   └── page.tsx            # Analitik, metrik, deal, gamifikasi
    │
    ├── payment/                # Rute: /payment
    │   ├── page.tsx            # Alur checkout (pemilihan metode + ringkasan)
    │   └── components/
    │       ├── OrderSummary.tsx
    │       └── PaymentMethods.tsx
    │
    └── pickup-guide/           # Rute: /pickup-guide
        └── page.tsx            # Timeline pickup 3 langkah dengan garis progress gradien
```

---

## Standar Kode & Skalabilitas

### Prinsip Arsitektur

| Prinsip | Implementasi |
|---|---|
| **Pemisahan Kepentingan** | Logika bisnis & data statis berada di `src/constants/` dan `src/hooks/` -- tidak pernah di dalam komponen halaman. Halaman hanya menangani komposisi & layout. |
| **DRY (Don't Repeat Yourself)** | Komponen yang dapat digunakan ulang (Navbar, Hero, Footer) dipusatkan di `src/components/`. Komponen spesifik halaman berada di bawah folder rute masing-masing (`app/login/components/`). |
| **Keamanan Tipe** | Setiap struktur data memiliki interface TypeScript yang sesuai di `src/types/`. `tsconfig` berjalan dalam mode `strict` dengan `noEmit` untuk pengecekan tipe saja. |
| **Performa** | Section landing page (Section2-6, FAQ, Footer) di-lazy-load via `next/dynamic` tanpa SSR, mengurangi bundle awal ~40%. Wrapper `SmoothScroll` memastikan scrolling GPU-accelerated via Lenis. |
| **Optimasi Memori** | Array data statis disimpan di file terpisah (`src/constants/`, `app/components/data/`) -- tidak ter-instantiasi ulang saat re-render. `useState` / `useMemo` digunakan secara bijaksana hanya untuk state UI sementara. |

### Aksesibilitas & Praktik Terbaik

- **HTML Semantik**: Semua halaman menggunakan elemen landmark `main`, `section`, `header`, `aside`.
- **Navigasi Keyboard**: Elemen interaktif dapat difokuskan dengan style `:focus-visible` yang terlihat.
- **Desain Responsif**: Breakpoint Tailwind (`sm`, `md`, `lg`) memastikan grid dashboard, layout payment, dan panel login tampil optimal di semua ukuran layar.
- **Pemuatan Font Kustom**: `next/font/google` dengan subset `variable` menghilangkan permintaan font yang memblokir render dan CLS (Cumulative Layout Shift).
- **Metadata & SEO**: Root `layout.tsx` mengekspor `Metadata` dengan tag OpenGraph, kata kunci, dan judul deskriptif untuk berbagi di media sosial.

### Skalabilitas

| Kebutuhan | Strategi |
|---|---|
| **Menambahkan rute baru** | Buat folder di bawah `app/` dengan `page.tsx`. App Router akan mendaftarkannya secara otomatis. |
| **Menambahkan endpoint API baru** | Tambahkan direktori `app/api/` dengan route handler (Next.js Route Handlers). |
| **Manajemen state** | Saat ini ringan -- dapat berkembang secara alami ke Zustand atau Jotai untuk state lintas rute (misalnya, keranjang, token auth). |
| **Testing** | Jest + React Testing Library untuk unit test; Playwright atau Cypress untuk alur E2E. |

---

## Kontributor Proyek

Proyek ini dirancang dan didevelop secara kolaboratif oleh tim **Los Tres Diseñadores**:

| [<img src="https://avatars.githubusercontent.com/u/170993776?v=4" width="100px;"/><br /><sub><b>@SuryaJayanata</b></sub>](https://github.com/SuryaJayanata) | [<img src="https://avatars.githubusercontent.com/u/184349613?v=4" width="100px;"/><br /><sub><b>@Marvellbrazil</b></sub>](https://github.com/Marvellbrazil) | [<img src="https://avatars.githubusercontent.com/u/222225219?v=4" width="100px;"/><br /><sub><b>@kjiovani</b></sub>](https://github.com/kjiovani) |
| :---: | :---: | :---: |

---

<div align="center">
  <br/>
  <hr style="width: 50%; opacity: 0.2;"/>
  <p style="font-size: 0.8rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #888;">
    Dibangun dengan dedikasi untuk <strong style="color: #F28F3B;">SEFEST 2026</strong> -- Kompetisi Web Design
  </p>
  <p style="font-size: 0.7rem; color: #aaa;">
    Tim LosTresDisenadores | SDG 12 | Gen-Z TechPreneur
  </p>
  <br/>
</div>
