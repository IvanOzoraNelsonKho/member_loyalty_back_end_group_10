## LoyaltyApp - Backend API (Kelompok 10)

## Pembagian Tugas & Tanggung Jawab:

1. **Andrian Hartono (Autentikasi & Identitas)**
   - Implementasi registrasi, dan manajemen profil user.
2. **Ivan Ozora Nelson Kho (Saldo & Engagement)**
   - Manajemen wallet (saldo/poin) dan sistem absensi harian (attendance).
3. **Josephine Asnat (Etalase Produk & Aktivitas)**
   - Katalog produk/merchandise dan riwayat aktivitas transaksi.
4. **Kenny Martin Holiem (Core Bisnis Loyalty)**
   - Sistem penukaran poin (redeem) dan manajemen voucher pengguna.
5. **Diana (Informasi Pendukung)**
   - Lokasi outlet terdekat dan manajemen banner promo.

---

## Dokumentasi Endpoint API

**Base URL:** `http://localhost:5000/api`

### 1. Autentikasi (Andrian Hartono)

| Method | Endpoint                          | Deskripsi                            |
| :----- | :-------------------------------- | :----------------------------------- |
| POST   | `/auth/register/verify-otp`       | Verifikasi kode OTP pendaftaran      |
| POST   | `/auth/register/complete-profile` | Melengkapi profil setelah OTP sukses |
| GET    | `/auth/profile/basic/:userId`     | Mengambil data profil dasar user     |

### 2. Wallet & Attendance (Ivan Ozora Nelson Kho)

| Method | Endpoint           | Deskripsi                       |
| :----- | :----------------- | :------------------------------ |
| PATCH  | `/wallet/:user_id` | Update saldo (topup/deduct)     |
| GET    | `/wallet/:user_id` | Cek saldo/poin user             |
| POST   | `/attendance`      | Pencatatan login harian (absen) |

### 3. Catalogs & Activities (Josephine Asnat)

| Method | Endpoint        | Deskripsi                                   |
| :----- | :-------------- | :------------------------------------------ |
| GET    | `/catalogs`     | Melihat semua katalog produk                |
| GET    | `/catalogs/:id` | Melihat detail satu produk                  |
| GET    | `/activities`   | Melihat riwayat aktivitas (query: `userId`) |
| POST   | `/activities`   | Mencatat aktivitas transaksi baru           |

### 4. Vouchers & Redeem (Kenny Martin Holiem)

| Method | Endpoint               | Deskripsi                                  |
| :----- | :--------------------- | :----------------------------------------- |
| GET    | `/vouchers`            | Daftar voucher yang tersedia untuk ditukar |
| POST   | `/redeem`              | Penukaran poin menjadi voucher             |
| GET    | `/my-vouchers`         | Melihat daftar voucher milik user          |
| PUT    | `/my-vouchers/:id/use` | Menggunakan voucher                        |

### 5. Outlets & Banners (Diana)

| Method | Endpoint   | Deskripsi                         |
| :----- | :--------- | :-------------------------------- |
| GET    | `/outlets` | Melihat daftar lokasi outlet      |
| POST   | `/outlets` | Menambahkan data outlet baru      |
| GET    | `/banners` | Melihat daftar banner promo aktif |
| POST   | `/banners` | Menambahkan data banner baru      |
