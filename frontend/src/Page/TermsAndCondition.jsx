import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

// ─── Sidebar nav items ────────────────────────────────────────────────────────
const navItems = [
  {
    key: "penerimaan",
    icon: "bi bi-check-circle-fill",
    label: "Penerimaan Syarat",
  },
  { key: "akun", icon: "bi bi-person-badge-fill", label: "Akun & Pendaftaran" },
  {
    key: "penggunaan",
    icon: "bi bi-hand-index-thumb-fill",
    label: "Penggunaan Layanan",
  },
  {
    key: "konten",
    icon: "bi bi-file-earmark-text-fill",
    label: "Konten & Donasi",
  },
  {
    key: "larangan",
    icon: "bi bi-slash-circle-fill",
    label: "Larangan Penggunaan",
  },
  {
    key: "tanggung",
    icon: "bi bi-shield-exclamation",
    label: "Tanggung Jawab",
  },
  { key: "haki", icon: "bi bi-award-fill", label: "Hak Kekayaan Intelektual" },
  {
    key: "penghentian",
    icon: "bi bi-x-octagon-fill",
    label: "Penghentian Akun",
  },
  { key: "hukum", icon: "bi bi-bank2", label: "Hukum yang Berlaku" },
  { key: "kontak", icon: "bi bi-envelope-fill", label: "Hubungi Kami" },
];

const heroTags = [
  { icon: "bi bi-calendar3", text: "Berlaku: April 2026" },
  { icon: "bi bi-file-earmark-text", text: "Versi 1.0" },
  { icon: "bi bi-translate", text: "Bahasa Indonesia" },
];

const highlightItems = [
  { icon: "bi bi-people-fill", text: "Untuk semua pengguna" },
  { icon: "bi bi-heart-fill", text: "Platform nirlaba" },
  { icon: "bi bi-globe", text: "Berlaku di Indonesia" },
  { icon: "bi bi-patch-check-fill", text: "Diperbarui berkala" },
];

// ─── Section Components ───────────────────────────────────────────────────────

class SectionPenerimaan extends Component {
  render() {
    return (
      <>
        <p
          className="outfit"
          style={{
            fontSize: 14,
            color: "var(--txt3)",
            lineHeight: 1.8,
            marginBottom: 16,
          }}
        >
          Dengan mengakses atau menggunakan platform FoodRescue — baik melalui
          aplikasi web maupun mobile — Anda menyatakan telah membaca, memahami,
          dan menyetujui seluruh Syarat dan Ketentuan yang berlaku.
        </p>
        <div className="d-flex flex-column gap-2">
          {[
            {
              icon: "bi bi-check2-circle",
              color: "var(--g1)",
              bg: "var(--g5)",
              title: "Pengguna Terdaftar",
              desc: "Pengguna yang mendaftar dan membuat akun di FoodRescue wajib menyetujui syarat ini sebelum menggunakan layanan.",
            },
            {
              icon: "bi bi-check2-circle",
              color: "var(--cr1)",
              bg: "var(--cr4)",
              title: "Pengunjung Tidak Terdaftar",
              desc: "Bahkan tanpa akun, mengakses atau menjelajahi platform berarti Anda setuju dengan syarat penggunaan yang berlaku.",
            },
            {
              icon: "bi bi-check2-circle",
              color: "#1e7ab8",
              bg: "rgba(30,122,184,0.08)",
              title: "Batas Usia Minimum",
              desc: "Layanan FoodRescue hanya diperuntukkan bagi individu yang telah berusia minimal 17 tahun atau memiliki izin orang tua/wali.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="card-basic rounded-3 p-3 d-flex gap-3 align-items-start"
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: item.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <i className={item.icon} style={{ color: item.color }} />
              </div>
              <div>
                <p
                  className="syne-h1"
                  style={{
                    fontSize: 13,
                    color: "var(--txt2)",
                    marginBottom: 3,
                  }}
                >
                  {item.title}
                </p>
                <p
                  className="outfit"
                  style={{
                    fontSize: 13,
                    color: "var(--txt3)",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

class SectionAkun extends Component {
  render() {
    const items = [
      {
        num: "01",
        title: "Akurasi Informasi",
        desc: "Anda wajib memberikan informasi yang akurat, lengkap, dan terkini saat mendaftar. Informasi palsu dapat menyebabkan penonaktifan akun.",
      },
      {
        num: "02",
        title: "Keamanan Akun",
        desc: "Anda bertanggung jawab penuh atas kerahasiaan kata sandi dan seluruh aktivitas yang terjadi di bawah akun Anda.",
      },
      {
        num: "03",
        title: "Satu Akun Per Pengguna",
        desc: "Setiap individu hanya diperbolehkan memiliki satu akun aktif. Pembuatan akun ganda untuk menghindari pembatasan tidak diizinkan.",
      },
      {
        num: "04",
        title: "Verifikasi Identitas",
        desc: "FoodRescue berhak meminta verifikasi tambahan kapan saja untuk memastikan keamanan platform dan seluruh penggunanya.",
      },
    ];
    return (
      <>
        <p
          className="outfit"
          style={{
            fontSize: 14,
            color: "var(--txt3)",
            lineHeight: 1.8,
            marginBottom: 16,
          }}
        >
          Untuk menggunakan fitur lengkap FoodRescue, Anda perlu membuat akun.
          Berikut adalah ketentuan yang mengatur pembuatan dan pengelolaan akun:
        </p>
        <div className="d-flex flex-column gap-2">
          {items.map((item) => (
            <div
              key={item.num}
              className="card-basic rounded-3 p-3 d-flex gap-3 align-items-start"
            >
              <span
                className="syne-h1"
                style={{
                  fontSize: 20,
                  fontWeight: 900,
                  color: "var(--g4)",
                  flexShrink: 0,
                  lineHeight: 1.2,
                }}
              >
                {item.num}
              </span>
              <div>
                <p
                  className="syne-h1"
                  style={{
                    fontSize: 13,
                    color: "var(--txt2)",
                    marginBottom: 4,
                  }}
                >
                  {item.title}
                </p>
                <p
                  className="outfit"
                  style={{
                    fontSize: 13,
                    color: "var(--txt3)",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

class SectionPenggunaan extends Component {
  render() {
    const cards = [
      {
        icon: "bi bi-gift-fill",
        title: "Donasi Makanan",
        desc: "Pengguna dapat mengunggah informasi makanan yang ingin didonasikan secara gratis kepada sesama.",
      },
      {
        icon: "bi bi-search",
        title: "Cari & Klaim",
        desc: "Pengguna dapat mencari donasi makanan yang tersedia dan mengklaimnya sesuai kebutuhan.",
      },
      {
        icon: "bi bi-chat-dots-fill",
        title: "Komunikasi",
        desc: "Platform menyediakan fitur pesan untuk koordinasi antara pemberi dan penerima donasi.",
      },
      {
        icon: "bi bi-people-fill",
        title: "Komunitas",
        desc: "Bergabung dan berkontribusi dalam komunitas untuk berbagi tips, pengalaman, dan inspirasi.",
      },
    ];
    return (
      <>
        <p
          className="outfit"
          style={{
            fontSize: 14,
            color: "var(--txt3)",
            lineHeight: 1.8,
            marginBottom: 16,
          }}
        >
          FoodRescue adalah platform nirlaba yang menghubungkan pemberi dan
          penerima donasi makanan. Layanan yang tersedia meliputi:
        </p>
        <div className="row g-3 mb-3">
          {cards.map((c) => (
            <div className="col-12 col-sm-6" key={c.title}>
              <div className="card-basic rounded-3 p-3 d-flex gap-3 align-items-start h-100">
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "var(--g5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <i className={c.icon} style={{ color: "var(--g1)" }} />
                </div>
                <div>
                  <p
                    className="syne-h1"
                    style={{
                      fontSize: 13,
                      color: "var(--txt2)",
                      marginBottom: 3,
                    }}
                  >
                    {c.title}
                  </p>
                  <p
                    className="outfit"
                    style={{
                      fontSize: 12,
                      color: "var(--txt4)",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {c.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="card-cream rounded-3 p-3 d-flex gap-2 align-items-start">
          <i
            className="bi bi-info-circle-fill"
            style={{ color: "var(--cr1)", marginTop: 2 }}
          />
          <p
            className="outfit"
            style={{
              fontSize: 13,
              color: "var(--txt3)",
              margin: 0,
              lineHeight: 1.7,
            }}
          >
            Seluruh layanan FoodRescue bersifat gratis untuk pengguna akhir.
            Kami tidak memungut biaya atas setiap transaksi donasi yang terjadi
            di platform.
          </p>
        </div>
      </>
    );
  }
}

class SectionKonten extends Component {
  render() {
    const rules = [
      {
        icon: "✅",
        title: "Informasi Akurat",
        desc: "Pastikan detail makanan yang diunggah akurat: nama, deskripsi, foto, jumlah, dan tanggal kedaluwarsa.",
      },
      {
        icon: "📸",
        title: "Foto Jelas",
        desc: "Unggah foto asli dan representatif dari makanan yang akan didonasikan, bukan gambar dari internet.",
      },
      {
        icon: "⏰",
        title: "Masa Berlaku",
        desc: "Makanan yang didonasikan harus masih layak konsumsi dan memiliki sisa masa simpan yang memadai.",
      },
      {
        icon: "🚫",
        title: "Tidak untuk Dijual",
        desc: "Donasi yang diambil dari platform tidak boleh dijual kembali. Platform hanya untuk keperluan berbagi.",
      },
    ];
    return (
      <>
        <p
          className="outfit"
          style={{
            fontSize: 14,
            color: "var(--txt3)",
            lineHeight: 1.8,
            marginBottom: 16,
          }}
        >
          Saat Anda mengunggah konten atau membuat posting donasi di FoodRescue,
          Anda setuju untuk mematuhi standar konten berikut:
        </p>
        <div className="d-flex flex-column gap-2">
          {rules.map((item) => (
            <div
              key={item.title}
              className="card-basic rounded-3 p-3 d-flex gap-3 align-items-start"
            >
              <span style={{ fontSize: 22 }}>{item.icon}</span>
              <div>
                <p
                  className="syne-h1"
                  style={{
                    fontSize: 13,
                    color: "var(--txt2)",
                    marginBottom: 3,
                  }}
                >
                  {item.title}
                </p>
                <p
                  className="outfit"
                  style={{
                    fontSize: 13,
                    color: "var(--txt3)",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

class SectionLarangan extends Component {
  render() {
    const items = [
      "Mengunggah informasi palsu, menyesatkan, atau konten yang menipu pengguna lain",
      "Menggunakan platform untuk tujuan komersial, promosi berbayar, atau iklan tanpa izin tertulis",
      "Menyebarkan konten yang mengandung ujaran kebencian, diskriminasi, atau pelecehan terhadap pihak lain",
      "Mencoba meretas, merusak, atau mengganggu sistem dan infrastruktur platform",
      "Membuat akun palsu atau menyamar sebagai pengguna atau pihak lain",
      "Mengambil, mengklaim, atau menimbun donasi yang tidak akan digunakan secara pribadi",
      "Melakukan tindakan yang melanggar hukum yang berlaku di Indonesia",
    ];
    return (
      <>
        <p
          className="outfit"
          style={{
            fontSize: 14,
            color: "var(--txt3)",
            lineHeight: 1.8,
            marginBottom: 16,
          }}
        >
          Untuk menjaga platform tetap aman dan bermanfaat, pengguna dilarang
          keras melakukan hal-hal berikut:
        </p>
        <div className="card-basic rounded-3 overflow-hidden">
          {items.map((item, i) => (
            <div
              key={i}
              className="d-flex align-items-start gap-3 px-3 py-3"
              style={{
                borderBottom:
                  i < items.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 7,
                  background: "rgba(220,53,69,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: 1,
                }}
              >
                <i
                  className="bi bi-x-lg"
                  style={{ fontSize: 10, color: "#dc3545" }}
                />
              </div>
              <p
                className="outfit"
                style={{
                  fontSize: 13,
                  color: "var(--txt3)",
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {item}
              </p>
            </div>
          ))}
        </div>
        <div
          className="card-basic rounded-3 p-3 d-flex gap-2 align-items-start mt-3"
          style={{ borderLeft: "3px solid #dc3545" }}
        >
          <i
            className="bi bi-exclamation-triangle-fill"
            style={{ color: "#dc3545", marginTop: 2 }}
          />
          <p
            className="outfit"
            style={{
              fontSize: 13,
              color: "var(--txt3)",
              margin: 0,
              lineHeight: 1.7,
            }}
          >
            Pelanggaran terhadap ketentuan di atas dapat mengakibatkan
            penonaktifan akun secara permanen tanpa pemberitahuan sebelumnya.
          </p>
        </div>
      </>
    );
  }
}

class SectionTanggung extends Component {
  render() {
    return (
      <>
        <p
          className="outfit"
          style={{
            fontSize: 14,
            color: "var(--txt3)",
            lineHeight: 1.8,
            marginBottom: 16,
          }}
        >
          FoodRescue berperan sebagai fasilitator antara pemberi dan penerima
          donasi. Berikut pembagian tanggung jawab yang perlu dipahami:
        </p>
        <div className="d-flex flex-column gap-3">
          {[
            {
              color: "var(--g1)",
              bg: "var(--g5)",
              border: "var(--g1)",
              icon: "bi bi-building",
              title: "Tanggung Jawab FoodRescue",
              items: [
                "Menyediakan dan memelihara platform yang aman dan fungsional",
                "Memproses data pengguna sesuai Kebijakan Privasi yang berlaku",
                "Menindaklanjuti laporan pelanggaran dari pengguna",
              ],
            },
            {
              color: "var(--cr1)",
              bg: "var(--cr4)",
              border: "var(--cr1)",
              icon: "bi bi-person-fill",
              title: "Tanggung Jawab Pengguna",
              items: [
                "Memastikan kebenaran dan keamanan pangan dari donasi yang diunggah",
                "Bertanggung jawab atas setiap interaksi dengan pengguna lain di platform",
                "Menjaga kerahasiaan akun dan segera melaporkan aktivitas mencurigakan",
              ],
            },
            {
              color: "#1e7ab8",
              bg: "rgba(30,122,184,0.08)",
              border: "#1e7ab8",
              icon: "bi bi-shield-x",
              title: "Batasan Tanggung Jawab",
              items: [
                "FoodRescue tidak bertanggung jawab atas kerugian akibat transaksi antar pengguna",
                "Kami tidak menjamin ketersediaan layanan 24/7 tanpa gangguan",
                "Keputusan untuk menerima atau memberikan donasi sepenuhnya ada pada pengguna",
              ],
            },
          ].map((section) => (
            <div
              key={section.title}
              className="card-basic rounded-3 p-3"
              style={{ borderLeft: `3px solid ${section.border}` }}
            >
              <div className="d-flex align-items-center gap-2 mb-3">
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 9,
                    background: section.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i
                    className={section.icon}
                    style={{ color: section.color }}
                  />
                </div>
                <p
                  className="syne-h1"
                  style={{ fontSize: 14, color: section.color, margin: 0 }}
                >
                  {section.title}
                </p>
              </div>
              <div className="d-flex flex-column gap-2">
                {section.items.map((txt, i) => (
                  <div key={i} className="d-flex gap-2 align-items-start">
                    <i
                      className="bi bi-dot"
                      style={{
                        color: section.color,
                        fontSize: 18,
                        marginTop: -2,
                        flexShrink: 0,
                      }}
                    />
                    <p
                      className="outfit"
                      style={{
                        fontSize: 13,
                        color: "var(--txt3)",
                        lineHeight: 1.65,
                        margin: 0,
                      }}
                    >
                      {txt}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

class SectionHaki extends Component {
  render() {
    return (
      <>
        <p
          className="outfit"
          style={{
            fontSize: 14,
            color: "var(--txt3)",
            lineHeight: 1.8,
            marginBottom: 16,
          }}
        >
          Semua elemen platform FoodRescue — termasuk logo, desain, kode, dan
          nama merek — dilindungi oleh hukum hak kekayaan intelektual Indonesia.
        </p>
        <div className="row g-3 mb-3">
          {[
            {
              icon: "bi bi-c-circle-fill",
              title: "Hak Cipta",
              desc: "Seluruh konten asli FoodRescue dilindungi hak cipta. Dilarang menyalin tanpa izin.",
            },
            {
              icon: "bi bi-badge-tm-fill",
              title: "Merek Dagang",
              desc: "Nama dan logo FoodRescue adalah merek terdaftar yang tidak boleh digunakan tanpa izin.",
            },
            {
              icon: "bi bi-code-square",
              title: "Kode Platform",
              desc: "Kode sumber platform bersifat proprietary dan tidak boleh didekompilasi atau dimodifikasi.",
            },
            {
              icon: "bi bi-image-fill",
              title: "Konten Pengguna",
              desc: "Anda mempertahankan hak atas konten yang Anda unggah, namun memberikan lisensi penggunaan kepada FoodRescue.",
            },
          ].map((c) => (
            <div className="col-6" key={c.title}>
              <div className="card-basic rounded-3 p-3 text-center h-100">
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "var(--g5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 10px",
                  }}
                >
                  <i
                    className={c.icon}
                    style={{ color: "var(--g1)", fontSize: 18 }}
                  />
                </div>
                <p
                  className="syne-h1"
                  style={{
                    fontSize: 13,
                    color: "var(--txt2)",
                    marginBottom: 4,
                  }}
                >
                  {c.title}
                </p>
                <p
                  className="outfit"
                  style={{
                    fontSize: 12,
                    color: "var(--txt4)",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {c.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

class SectionPenghentian extends Component {
  render() {
    return (
      <>
        <p
          className="outfit"
          style={{
            fontSize: 14,
            color: "var(--txt3)",
            lineHeight: 1.8,
            marginBottom: 16,
          }}
        >
          Akun dapat dihentikan baik atas permintaan pengguna maupun oleh
          FoodRescue dalam kondisi tertentu.
        </p>
        <div className="d-flex flex-column gap-2 mb-3">
          {[
            {
              icon: "bi bi-person-x-fill",
              color: "var(--g1)",
              bg: "var(--g5)",
              title: "Penghentian oleh Pengguna",
              desc: "Anda dapat menonaktifkan atau menghapus akun kapan saja melalui menu pengaturan profil. Data akan dihapus sesuai Kebijakan Privasi kami.",
            },
            {
              icon: "bi bi-shield-fill-x",
              color: "var(--cr1)",
              bg: "var(--cr4)",
              title: "Penghentian oleh FoodRescue",
              desc: "Kami berhak menangguhkan atau menghapus akun yang terbukti melanggar Syarat dan Ketentuan, melakukan penipuan, atau merugikan pengguna lain.",
            },
            {
              icon: "bi bi-archive-fill",
              color: "#1e7ab8",
              bg: "rgba(30,122,184,0.08)",
              title: "Efek Penghentian",
              desc: "Setelah akun dihapus, akses ke platform dan seluruh data terkait akan dihentikan. Sisa data yang bersifat agregat mungkin tetap disimpan untuk keperluan statistik.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="card-basic rounded-3 p-3 d-flex gap-3 align-items-start"
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: item.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <i className={item.icon} style={{ color: item.color }} />
              </div>
              <div>
                <p
                  className="syne-h1"
                  style={{
                    fontSize: 13,
                    color: "var(--txt2)",
                    marginBottom: 3,
                  }}
                >
                  {item.title}
                </p>
                <p
                  className="outfit"
                  style={{
                    fontSize: 13,
                    color: "var(--txt3)",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

class SectionHukum extends Component {
  render() {
    return (
      <>
        <p
          className="outfit"
          style={{
            fontSize: 14,
            color: "var(--txt3)",
            lineHeight: 1.8,
            marginBottom: 16,
          }}
        >
          Syarat dan Ketentuan ini diatur dan ditafsirkan berdasarkan hukum yang
          berlaku di Republik Indonesia.
        </p>
        <div className="d-flex flex-column gap-2">
          {[
            {
              icon: "🏛️",
              title: "Yurisdiksi",
              desc: "Segala sengketa yang timbul sehubungan dengan penggunaan platform ini tunduk pada yurisdiksi eksklusif pengadilan yang berwenang di Indonesia.",
            },
            {
              icon: "🤝",
              title: "Penyelesaian Sengketa",
              desc: "Para pihak sepakat untuk terlebih dahulu menyelesaikan sengketa melalui musyawarah mufakat sebelum menempuh jalur hukum formal.",
            },
            {
              icon: "📜",
              title: "Peraturan Berlaku",
              desc: "Platform ini beroperasi sesuai dengan Undang-Undang ITE, Peraturan Perlindungan Data Pribadi, dan regulasi relevan lainnya di Indonesia.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="card-basic rounded-3 p-3 d-flex gap-3 align-items-start"
            >
              <span style={{ fontSize: 22 }}>{item.icon}</span>
              <div>
                <p
                  className="syne-h1"
                  style={{
                    fontSize: 13,
                    color: "var(--txt2)",
                    marginBottom: 3,
                  }}
                >
                  {item.title}
                </p>
                <p
                  className="outfit"
                  style={{
                    fontSize: 13,
                    color: "var(--txt3)",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

class SectionKontak extends Component {
  render() {
    const contacts = [
      {
        icon: "bi bi-envelope-fill",
        color: "var(--g1)",
        bg: "var(--g5)",
        border: "1px solid var(--g3)",
        label: "Email Legal",
        value: "foodrescue.indonesia@gmail.com",
        note: "Respons dalam 2×24 jam kerja",
      },
      {
        icon: "bi bi-whatsapp",
        color: "var(--cr1)",
        bg: "var(--cr4)",
        border: "1px solid var(--cr3)",
        label: "WhatsApp Support",
        value: "+62 822-7419-7020",
        note: "Senin–Jumat, 08.00–17.00 WIB",
      },
    ];
    return (
      <>
        <p
          className="outfit"
          style={{
            fontSize: 14,
            color: "var(--txt3)",
            lineHeight: 1.8,
            marginBottom: 16,
          }}
        >
          Jika Anda memiliki pertanyaan seputar Syarat dan Ketentuan ini,
          silakan hubungi tim kami melalui:
        </p>
        <div className="d-flex flex-column gap-3 mb-3">
          {contacts.map((c) => (
            <div
              key={c.label}
              className="rounded-3 d-flex align-items-center gap-3 p-3"
              style={{ background: c.bg, border: c.border }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "var(--surface)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  color: c.color,
                  flexShrink: 0,
                  boxShadow: "var(--shadow)",
                }}
              >
                <i className={c.icon} />
              </div>
              <div>
                <p
                  className="outfit"
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "var(--txt4)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 2,
                  }}
                >
                  {c.label}
                </p>
                <p
                  className="syne-h1"
                  style={{ fontSize: 15, color: "var(--txt)", marginBottom: 2 }}
                >
                  {c.value}
                </p>
                <p
                  className="outfit"
                  style={{ fontSize: 12, color: "var(--txt3)", margin: 0 }}
                >
                  {c.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

// ─── Accordion Item ───────────────────────────────────────────────────────────
class AccordionItem extends Component {
  render() {
    const { section, isOpen, isRead, onToggle } = this.props;
    return (
      <div
        style={{
          background: "var(--surface)",
          border: `1.5px solid ${isOpen ? "var(--g2)" : "var(--border)"}`,
          borderRadius: 18,
          marginBottom: 14,
          overflow: "hidden",
          boxShadow: isOpen ? "var(--shadow2)" : "var(--shadow)",
          transition: "border-color 0.25s, box-shadow 0.25s",
        }}
      >
        <div
          onClick={onToggle}
          className="d-flex align-items-center gap-3 px-4"
          style={{
            padding: "20px 24px",
            cursor: "pointer",
            background: isOpen ? "var(--g5)" : "var(--surface)",
            transition: "background 0.2s",
          }}
        >
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 13,
              background: section.iconBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              color: section.iconColor,
              flexShrink: 0,
            }}
          >
            <i className={section.icon} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className={`faq-tag ${section.tagCls}`}>
                {section.tagLabel}
              </span>
              {isRead && !isOpen && (
                <span
                  className="outfit"
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "var(--g1)",
                    background: "var(--g5)",
                    border: "1px solid var(--g3)",
                    borderRadius: 20,
                    padding: "2px 8px",
                  }}
                >
                  ✓ Sudah dibaca
                </span>
              )}
            </div>
            <p
              className="syne-h1"
              style={{
                fontSize: 15,
                color: isOpen ? "var(--g1)" : "var(--txt)",
                margin: 0,
              }}
            >
              {section.title}
            </p>
          </div>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 9,
              background: isOpen ? "var(--g1)" : "var(--surf2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "all 0.3s",
              transform: isOpen ? "rotate(180deg)" : "none",
            }}
          >
            <i
              className="bi bi-chevron-down"
              style={{ fontSize: 13, color: isOpen ? "#fff" : "var(--txt4)" }}
            />
          </div>
        </div>
        <div
          style={{
            maxHeight: isOpen ? 2000 : 0,
            overflow: "hidden",
            transition: "max-height 0.4s ease",
          }}
        >
          <div
            style={{
              padding: "24px 28px 28px",
              borderTop: "1px solid var(--border)",
            }}
          >
            {section.content}
          </div>
        </div>
      </div>
    );
  }
}

// ─── Main Component ───────────────────────────────────────────────────────────
class TermsAndConditions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSection: null,
      openSection: null,
      readSections: new Set(),
    };
  }

  selectSection = (key) => {
    this.setState((prev) => {
      const readSections = new Set(prev.readSections);
      readSections.add(key);
      return { activeSection: key, openSection: key, readSections };
    });
    setTimeout(() => {
      const el = document.getElementById(key);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  showAll = () => {
    this.setState({ activeSection: null, openSection: null });
    setTimeout(() => {
      const firstSection = document.getElementById(navItems[0].key);
      if (firstSection)
        firstSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  toggleAccordion = (key) => {
    this.setState((prev) => {
      const readSections = new Set(prev.readSections);
      readSections.add(key);
      return {
        openSection: prev.openSection === key ? null : key,
        readSections,
      };
    });
  };

  render() {
    const { activeSection, openSection, readSections } = this.state;
    const totalSections = navItems.length;
    const readCount = readSections.size;
    const readProgress = Math.round((readCount / totalSections) * 100);

    const sections = [
      {
        key: "penerimaan",
        icon: "bi bi-check-circle-fill",
        iconBg: "var(--g5)",
        iconColor: "var(--g1)",
        title: "Penerimaan Syarat dan Ketentuan",
        tagLabel: "Persetujuan",
        tagCls: "tag-g",
        content: <SectionPenerimaan />,
      },
      {
        key: "akun",
        icon: "bi bi-person-badge-fill",
        iconBg: "var(--cr4)",
        iconColor: "var(--cr1)",
        title: "Akun dan Pendaftaran",
        tagLabel: "Akun",
        tagCls: "tag-cr",
        content: <SectionAkun />,
      },
      {
        key: "penggunaan",
        icon: "bi bi-hand-index-thumb-fill",
        iconBg: "rgba(30,122,184,0.08)",
        iconColor: "#1e7ab8",
        title: "Penggunaan Layanan",
        tagLabel: "Layanan",
        tagCls: "tag-g",
        content: <SectionPenggunaan />,
      },
      {
        key: "konten",
        icon: "bi bi-file-earmark-text-fill",
        iconBg: "var(--g5)",
        iconColor: "var(--g1)",
        title: "Konten dan Donasi",
        tagLabel: "Konten",
        tagCls: "tag-g",
        content: <SectionKonten />,
      },
      {
        key: "larangan",
        icon: "bi bi-slash-circle-fill",
        iconBg: "rgba(220,53,69,0.08)",
        iconColor: "#dc3545",
        title: "Larangan Penggunaan",
        tagLabel: "Larangan",
        tagCls: "tag-cr",
        content: <SectionLarangan />,
      },
      {
        key: "tanggung",
        icon: "bi bi-shield-exclamation",
        iconBg: "var(--cr4)",
        iconColor: "var(--cr1)",
        title: "Batasan Tanggung Jawab",
        tagLabel: "Tanggung Jawab",
        tagCls: "tag-cr",
        content: <SectionTanggung />,
      },
      {
        key: "haki",
        icon: "bi bi-award-fill",
        iconBg: "rgba(30,122,184,0.08)",
        iconColor: "#1e7ab8",
        title: "Hak Kekayaan Intelektual",
        tagLabel: "HAKI",
        tagCls: "tag-g",
        content: <SectionHaki />,
      },
      {
        key: "penghentian",
        icon: "bi bi-x-octagon-fill",
        iconBg: "rgba(220,53,69,0.08)",
        iconColor: "#dc3545",
        title: "Penghentian Akun",
        tagLabel: "Akun",
        tagCls: "tag-cr",
        content: <SectionPenghentian />,
      },
      {
        key: "hukum",
        icon: "bi bi-bank2",
        iconBg: "var(--g5)",
        iconColor: "var(--g1)",
        title: "Hukum yang Berlaku",
        tagLabel: "Hukum",
        tagCls: "tag-g",
        content: <SectionHukum />,
      },
      {
        key: "kontak",
        icon: "bi bi-envelope-fill",
        iconBg: "var(--cr4)",
        iconColor: "var(--cr1)",
        title: "Hubungi Kami",
        tagLabel: "Kontak",
        tagCls: "tag-cr",
        content: <SectionKontak />,
      },
    ];

    const visibleSections = activeSection
      ? sections.filter((s) => s.key === activeSection)
      : sections;

    return (
      <div className="main-bg-color" style={{ minHeight: "100vh" }}>
        {/* ── Hero ── */}
        <section className="about-hero position-relative">
          <div
            className="grid-detail-light position-absolute"
            style={{ inset: 0 }}
          />

          {/* Tombol Kembali — selalu tampil, terutama berguna saat belum login */}
          <button
            onClick={() => this.props.navigate(-1)}
            className="outfit"
            style={{
              position: "absolute",
              top: 18,
              right: 20,
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.3)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              borderRadius: 10,
              padding: "7px 14px",
              fontSize: 13,
              fontWeight: 600,
              color: "#fff",
              cursor: "pointer",
              transition: "background 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.25)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.15)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
            }}
          >
            <i className="bi bi-arrow-left" style={{ fontSize: 12 }} />
            Kembali
          </button>

          <div className="container about-hero__inner py-0 px-4 px-md-5">
            <div className="row align-items-center g-3">
              {/* Left */}
              <div className="col-lg-8">
                <div className="about-hero-badge mb-2">
                  <i className="bi bi-file-earmark-text-fill" />
                  <span>Syarat & Ketentuan</span>
                </div>
                <h1
                  className="syne-h1"
                  style={{
                    fontSize: "clamp(26px, 4vw, 44px)",
                    color: "#fff",
                    lineHeight: 1.15,
                    marginBottom: 10,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Aturan Bersama untuk
                  <br />
                  <span
                    style={{
                      background: "linear-gradient(135deg,#fff,var(--cr3))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Platform yang Lebih Baik
                  </span>
                </h1>
                <p
                  className="outfit"
                  style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.75)",
                    lineHeight: 1.75,
                    maxWidth: 520,
                    marginBottom: 16,
                  }}
                >
                  Dokumen ini mengatur hubungan antara Anda dan FoodRescue dalam
                  menggunakan platform. Harap baca dengan seksama sebelum mulai
                  menggunakan layanan kami.
                </p>
                <div className="d-flex flex-wrap gap-2">
                  {heroTags.map((tag) => (
                    <span key={tag.text} className="about-hero__tag outfit">
                      <i className={tag.icon} style={{ fontSize: 11 }} />
                      {tag.text}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right */}
              <div className="col-lg-4">
                <div className="card-transparent rounded-4 p-3">
                  <p
                    className="outfit"
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.55)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      marginBottom: 10,
                    }}
                  >
                    Informasi Dokumen
                  </p>
                  {highlightItems.map((item, i) => (
                    <div
                      key={item.text}
                      className="d-flex align-items-center gap-3"
                      style={{
                        padding: "8px 0",
                        borderBottom:
                          i < highlightItems.length - 1
                            ? "1px solid rgba(255,255,255,0.1)"
                            : "none",
                      }}
                    >
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 8,
                          background: "rgba(255,255,255,0.15)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 13,
                          color: "#fff",
                          flexShrink: 0,
                        }}
                      >
                        <i className={item.icon} />
                      </div>
                      <span
                        className="outfit"
                        style={{
                          fontSize: 13,
                          color: "rgba(255,255,255,0.85)",
                          fontWeight: 600,
                        }}
                      >
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Body ── */}
        <div
          className="container px-3 px-md-4"
          style={{ padding: "48px 0 80px" }}
        >
          <div className="row g-4 align-items-start">
            {/* ── Sidebar ── */}
            <div
              className="col-lg-3 d-none d-lg-block"
              style={{
                position: "sticky",
                top: 100,
                alignSelf: "flex-start",
                height: "fit-content",
              }}
            >
              <aside className="faq-sidebar">
                <p
                  className="outfit"
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "var(--txt4)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginBottom: 10,
                    padding: "0 4px",
                  }}
                >
                  Daftar Isi
                </p>

                {/* Progress */}
                <div className="card-basic rounded-3 p-3 mb-3">
                  <div className="d-flex justify-content-between mb-2">
                    <span
                      className="outfit"
                      style={{ fontSize: 11, color: "var(--txt4)" }}
                    >
                      Progress baca
                    </span>
                    <span
                      className="syne-h1"
                      style={{ fontSize: 11, color: "var(--g1)" }}
                    >
                      {readCount}/{totalSections}
                    </span>
                  </div>
                  <div className="pw-str">
                    <div
                      className="pw-fill"
                      style={{
                        width: `${readProgress}%`,
                        background:
                          "linear-gradient(90deg, var(--g1), var(--g2))",
                      }}
                    />
                  </div>
                  <p className="outfit pw-hint" style={{ marginBottom: 0 }}>
                    {readProgress === 100
                      ? "🎉 Semua sudah dibaca!"
                      : `${readCount} dari ${totalSections} bagian dibaca`}
                  </p>
                </div>

                {/* Tampilkan Semua */}
                <button
                  onClick={this.showAll}
                  className="outfit"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 700,
                    color: activeSection === null ? "var(--g1)" : "var(--txt3)",
                    marginBottom: 6,
                    border:
                      activeSection === null
                        ? "1px solid rgba(95,139,76,.2)"
                        : "1px solid transparent",
                    background: activeSection === null ? "var(--g5)" : "none",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s",
                    boxSizing: "border-box",
                  }}
                >
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 7,
                      background:
                        activeSection === null ? "var(--g1)" : "var(--surf2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      flexShrink: 0,
                      color: activeSection === null ? "#fff" : "var(--txt4)",
                    }}
                  >
                    <i className="bi bi-grid-fill" />
                  </div>
                  <span style={{ flex: 1 }}>Tampilkan Semua</span>
                </button>

                <div
                  style={{
                    height: 1,
                    background: "var(--border)",
                    margin: "6px 4px 8px",
                  }}
                />

                {navItems.map((item) => {
                  const isRead = readSections.has(item.key);
                  const isActive = activeSection === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => this.selectSection(item.key)}
                      className="outfit"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        width: "100%",
                        padding: "9px 12px",
                        borderRadius: 10,
                        fontSize: 13,
                        fontWeight: 600,
                        color: isActive ? "var(--g1)" : "var(--txt3)",
                        marginBottom: 2,
                        border: isActive
                          ? "1px solid rgba(95,139,76,.2)"
                          : "1px solid transparent",
                        background: isActive ? "var(--g5)" : "none",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.2s",
                        boxSizing: "border-box",
                      }}
                    >
                      <div
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: 7,
                          background: isActive
                            ? "var(--g1)"
                            : isRead
                              ? "var(--g4)"
                              : "var(--surf2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 12,
                          flexShrink: 0,
                          color: isActive
                            ? "#fff"
                            : isRead
                              ? "var(--g1)"
                              : "var(--txt4)",
                        }}
                      >
                        <i
                          className={
                            isRead && !isActive ? "bi bi-check-lg" : item.icon
                          }
                        />
                      </div>
                      <span style={{ flex: 1 }}>{item.label}</span>
                    </button>
                  );
                })}

                {/* Link ke Privacy Policy */}
                <div
                  style={{
                    height: 1,
                    background: "var(--border)",
                    margin: "10px 4px 10px",
                  }}
                />
                <button
                  onClick={() => this.props.navigate("/privacy-policy")}
                  className="outfit"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--txt3)",
                    border: "1px solid transparent",
                    background: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 7,
                      background: "var(--surf2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      flexShrink: 0,
                      color: "var(--txt4)",
                    }}
                  >
                    <i className="bi bi-shield-lock-fill" />
                  </div>
                  <span style={{ flex: 1 }}>Kebijakan Privasi</span>
                  <i
                    className="bi bi-arrow-right"
                    style={{ fontSize: 11, color: "var(--txt4)" }}
                  />
                </button>
              </aside>
            </div>

            {/* ── Main content ── */}
            <div className="col-lg-9">
              <div id="top" />
              {/* Info banner */}
              <div
                className="card-green rounded-3 d-flex gap-3 align-items-start mb-4"
                style={{ padding: "20px 24px" }}
              >
                <i
                  className="bi bi-info-circle-fill"
                  style={{
                    color: "var(--g1)",
                    fontSize: 20,
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                />
                <div>
                  <p
                    className="syne-h1"
                    style={{
                      fontSize: 14,
                      color: "var(--txt2)",
                      marginBottom: 4,
                    }}
                  >
                    Sebelum Anda mulai membaca
                  </p>
                  <p
                    className="outfit"
                    style={{
                      fontSize: 13,
                      color: "var(--txt3)",
                      lineHeight: 1.75,
                      margin: 0,
                    }}
                  >
                    Syarat dan Ketentuan ini berlaku untuk seluruh layanan
                    FoodRescue. Pilih bagian di sebelah kiri untuk membaca satu
                    topik, atau klik{" "}
                    <strong style={{ color: "var(--g1)" }}>
                      Tampilkan Semua
                    </strong>{" "}
                    untuk melihat keseluruhan. Dokumen ini dibaca bersama dengan{" "}
                    <span
                      style={{
                        color: "var(--g1)",
                        cursor: "pointer",
                        fontWeight: 600,
                        textDecoration: "underline",
                      }}
                      onClick={() => this.props.navigate("/privacy-policy")}
                    >
                      Kebijakan Privasi
                    </span>{" "}
                    kami.
                  </p>
                </div>
              </div>

              {/* Breadcrumb saat single section */}
              {activeSection && (
                <div className="d-flex align-items-center gap-2 mb-3">
                  <button
                    onClick={this.showAll}
                    className="outfit"
                    style={{
                      background: "var(--surf2)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      padding: "5px 12px",
                      fontSize: 12,
                      color: "var(--txt3)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <i className="bi bi-arrow-left" /> Tampilkan Semua
                  </button>
                  <span
                    className="outfit"
                    style={{ fontSize: 12, color: "var(--txt4)" }}
                  >
                    / {navItems.find((n) => n.key === activeSection)?.label}
                  </span>
                </div>
              )}

              {/* Accordion sections */}
              {visibleSections.map((section) => (
                <div id={section.key} className="faq-main" key={section.key}>
                  <AccordionItem
                    section={section}
                    isOpen={
                      activeSection
                        ? section.key === activeSection
                        : openSection === section.key
                    }
                    isRead={readSections.has(section.key)}
                    onToggle={() => {
                      if (activeSection) {
                        this.showAll();
                      } else {
                        this.toggleAccordion(section.key);
                      }
                    }}
                  />
                </div>
              ))}

              {/* CTA bottom */}
              <div
                className="about-impact position-relative overflow-hidden rounded-4 text-center mt-4"
                style={{ padding: "48px 36px" }}
              >
                <div
                  className="grid-detail-light position-absolute"
                  style={{ inset: 0 }}
                />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 16,
                      background: "rgba(255,255,255,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 26,
                      color: "#fff",
                      margin: "0 auto 16px",
                    }}
                  >
                    <i className="bi bi-file-earmark-check-fill" />
                  </div>
                  <h3 className="syne-h1 about-impact__title">
                    Bergabung & Berkontribusi Bersama
                  </h3>
                  <p
                    className="outfit about-impact__subtitle mx-auto mb-4"
                    style={{ maxWidth: 480 }}
                  >
                    Dengan menggunakan FoodRescue, Anda turut berkontribusi
                    mengurangi pemborosan makanan dan membantu sesama. Terima
                    kasih telah membaca Syarat dan Ketentuan kami.
                  </p>
                  <div className="d-flex gap-3 justify-content-center flex-wrap">
                    <button
                      className="faq-help-box__btn-primary outfit"
                      onClick={() => this.props.navigate("/contact")}
                    >
                      <i className="bi bi-envelope" /> Hubungi Kami
                    </button>
                    <button
                      className="outfit"
                      onClick={() => this.props.navigate("/privacy-policy")}
                      style={{
                        background: "rgba(255,255,255,0.15)",
                        border: "1px solid rgba(255,255,255,0.3)",
                        borderRadius: 10,
                        padding: "10px 20px",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      <i className="bi bi-shield-lock" /> Kebijakan Privasi
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function TermsAndConditionsWrapper(props) {
  const navigate = useNavigate();
  const { user } = useAuth();
  return <TermsAndConditions {...props} navigate={navigate} user={user} />;
}

export default TermsAndConditionsWrapper;
