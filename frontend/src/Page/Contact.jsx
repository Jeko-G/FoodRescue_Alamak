import React, { Component } from "react";

// Sisipin titik potong (word break opportunity) di tempat yang enak diliat,
// biar kalau kepanjangan & harus wrap, motongnya abis "@" bukan asal tengah kata
const breakable = (text) => {
  const parts = String(text).split(/([@.])/);
  return parts.map((part, i) =>
    part === "@" || part === "." ? (
      <React.Fragment key={i}>
        {part}
        <wbr />
      </React.Fragment>
    ) : (
      part
    ),
  );
};

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: "",
        email: "",
        subject: "",
        category: "general",
        message: "",
      },
      errors: {},
      submitted: false,
      loading: false,
      activeInfo: null,
      focusedField: null,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prev) => ({
      form: { ...prev.form, [name]: value },
      errors: { ...prev.errors, [name]: "" },
    }));
  };

  handleFocus = (field) => {
    this.setState({ focusedField: field });
  };

  handleBlur = () => {
    this.setState({ focusedField: null });
  };

  validate = () => {
    const { name, email, subject, message } = this.state.form;
    const errors = {};
    if (!name.trim()) errors.name = "Nama tidak boleh kosong.";
    if (!email.trim()) errors.email = "Email tidak boleh kosong.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "Format email tidak valid.";
    if (!subject.trim()) errors.subject = "Subjek tidak boleh kosong.";
    if (!message.trim()) errors.message = "Pesan tidak boleh kosong.";
    else if (message.trim().length < 20)
      errors.message = "Pesan minimal 20 karakter.";
    return errors;
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const errors = this.validate();
    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    this.setState({ loading: true });

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.form),
      });

      const data = await res.json();

      if (res.ok) {
        this.setState({
          submitted: true,
          loading: false,
          form: {
            name: "",
            email: "",
            subject: "",
            category: "general",
            message: "",
          },
        });
      } else {
        this.setState({ loading: false });
        alert(data.message);
      }
    } catch (err) {
      this.setState({ loading: false });
      alert("Server error");
    }
  };

  handleReset = () => {
    this.setState({
      form: {
        name: "",
        email: "",
        subject: "",
        category: "general",
        message: "",
      },
      errors: {},
      submitted: false,
      loading: false,
    });
  };

  toggleInfo = (key) => {
    this.setState((prev) => ({
      activeInfo: prev.activeInfo === key ? null : key,
    }));
  };

  render() {
    const { form, errors, submitted, loading, activeInfo, focusedField } =
      this.state;

    // Hanya Email & WhatsApp — tanpa lokasi kantor
    const contactCards = [
      {
        key: "email",
        icon: "bi bi-envelope-fill",
        color: "var(--g1)",
        bgColor: "var(--g5)",
        borderColor: "var(--g3)",
        label: "Email Kami",
        value: "foodrescue.indonesia@gmail.com",
        sub: "Balas dalam 24 jam",
        detail:
          "Kirimkan pertanyaan, laporan, atau kerja sama melalui email resmi kami. Tim support kami siap membantu setiap hari kerja.",
      },
      {
        key: "whatsapp",
        icon: "bi bi-whatsapp",
        color: "var(--cr1)",
        bgColor: "var(--cr4)",
        borderColor: "var(--cr3)",
        label: "WhatsApp",
        value: "+62 822-7419-7020",
        sub: "Sen–Jum, 08.00–17.00",
        detail:
          "Chat langsung dengan tim kami melalui WhatsApp untuk respon yang lebih cepat pada jam kerja.",
      },
    ];

    const faqs = [
      {
        q: "Berapa lama waktu respons?",
        a: "Tim kami biasanya merespons dalam 1×24 jam di hari kerja.",
      },
      {
        q: "Apakah layanan konsultasi gratis?",
        a: "Ya! Konsultasi awal sepenuhnya gratis untuk semua pengguna terdaftar.",
      },
      {
        q: "Bagaimana cara melaporkan bug?",
        a: "Gunakan formulir ini dengan kategori 'Bug Report' dan sertakan detail lengkap.",
      },
    ];

    const categories = [
      { value: "general", label: "💬 Pertanyaan Umum" },
      { value: "partnership", label: "🤝 Kerja Sama" },
      { value: "bug", label: "🐛 Bug Report" },
      { value: "feature", label: "✨ Saran Fitur" },
      { value: "billing", label: "💳 Pembayaran" },
    ];

    return (
      <div style={{ backgroundColor: "var(--bg)", minHeight: "100vh" }}>
        <section
          style={{
            background:
              "linear-gradient(155deg,#2e5220 0%,var(--g1) 45%,var(--cr2) 100%)",
            padding: "72px 0 60px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            className="grid-detail-light"
            style={{ position: "absolute", inset: 0 }}
          />
          <div
            className="container"
            style={{ position: "relative", zIndex: 1 }}
          >
            <div className="row align-items-center g-4">
              <div className="col-lg-7">
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "rgba(255,255,255,0.14)",
                    border: "1px solid rgba(255,255,255,0.28)",
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.09em",
                    textTransform: "uppercase",
                    padding: "5px 16px",
                    borderRadius: 999,
                    marginBottom: 18,
                  }}
                >
                  <i className="bi bi-chat-dots-fill" />
                  Hubungi Kami
                </span>

                <h1
                  className="syne-h1"
                  style={{
                    fontSize: "clamp(32px,5vw,56px)",
                    color: "#fff",
                    lineHeight: 1.1,
                    letterSpacing: "-0.025em",
                    marginBottom: 14,
                  }}
                >
                  Ada yang bisa
                  <br />
                  <span
                    style={{
                      background: "linear-gradient(135deg,#fff,var(--cr3))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    kami bantu?
                  </span>
                </h1>

                <p
                  className="outfit"
                  style={{
                    color: "rgba(255,255,255,0.75)",
                    fontSize: 15,
                    lineHeight: 1.8,
                    maxWidth: 500,
                    marginBottom: 28,
                  }}
                >
                  Tim AgriHub siap membantu petani, penyedia jasa, dan mitra
                  bisnis. Sampaikan pertanyaan, laporan, atau ide Anda — kami
                  akan merespons secepatnya.
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {[
                    "🕐 Respons ≤ 24 Jam",
                    "🌾 Untuk Petani & Mitra",
                    "💬 WhatsApp & Email",
                  ].map((tag) => (
                    <span
                      key={tag}
                      style={{
                        background: "rgba(255,255,255,0.12)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        color: "#fff",
                        fontSize: 12,
                        padding: "5px 14px",
                        borderRadius: 20,
                        fontWeight: 600,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="col-lg-5">
                <div
                  className="card-transparent"
                  style={{ borderRadius: 20, padding: "28px 24px" }}
                >
                  <p
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.55)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      marginBottom: 16,
                    }}
                  >
                    Statistik Layanan
                  </p>
                  {[
                    { num: "2.400+", lbl: "Pertanyaan diselesaikan" },
                    { num: "< 8 Jam", lbl: "Rata-rata waktu respons" },
                    { num: "98%", lbl: "Tingkat kepuasan pengguna" },
                  ].map((s, i) => (
                    <div
                      key={s.lbl}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        padding: "12px 0",
                        borderBottom:
                          i < 2 ? "1px solid rgba(255,255,255,0.1)" : "none",
                      }}
                    >
                      <span
                        className="syne-h1"
                        style={{ fontSize: 22, color: "#fff", minWidth: 90 }}
                      >
                        {s.num}
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          color: "rgba(255,255,255,0.65)",
                        }}
                      >
                        {s.lbl}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: "56px 0 0" }}>
          <div className="container">
            <div className="row g-4 justify-content-center">
              {contactCards.map((card) => (
                <div key={card.key} className="col-lg-5 col-md-6">
                  <div
                    onClick={() => this.toggleInfo(card.key)}
                    className="h-100"
                    style={{
                      background:
                        activeInfo === card.key
                          ? card.bgColor
                          : "var(--surface)",
                      border: `1.5px solid ${activeInfo === card.key ? card.borderColor : "var(--border)"}`,
                      borderRadius: 18,
                      padding: "28px 24px",
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                      boxShadow:
                        activeInfo === card.key
                          ? "var(--shadow2)"
                          : "var(--shadow)",
                      transform:
                        activeInfo === card.key ? "translateY(-4px)" : "none",
                    }}
                  >
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: 14,
                        background: card.bgColor,
                        border: `1px solid ${card.borderColor}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 22,
                        color: card.color,
                        marginBottom: 16,
                      }}
                    >
                      <i className={card.icon} />
                    </div>
                    <p
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: "var(--txt4)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: 4,
                      }}
                    >
                      {card.label}
                    </p>
                    <p
                      className="syne-h1 contact-value-text"
                      style={{
                        color: "var(--txt)",
                        marginBottom: 4,
                        overflowWrap: "break-word",
                        wordBreak: "break-word",
                      }}
                    >
                      {breakable(card.value)}
                    </p>
                    <p
                      style={{
                        fontSize: 12,
                        color: "var(--txt3)",
                        marginBottom: 0,
                      }}
                    >
                      {card.sub}
                    </p>

                    <div
                      style={{
                        maxHeight: activeInfo === card.key ? 120 : 0,
                        overflow: "hidden",
                        transition: "max-height 0.35s ease",
                      }}
                    >
                      <p
                        style={{
                          fontSize: 13,
                          color: "var(--txt3)",
                          lineHeight: 1.7,
                          marginTop: 14,
                          paddingTop: 14,
                          borderTop: "1px solid var(--border)",
                        }}
                      >
                        {card.detail}
                      </p>
                    </div>

                    <div
                      style={{
                        marginTop: 12,
                        fontSize: 11,
                        color: card.color,
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      {activeInfo === card.key ? "Sembunyikan" : "Lihat detail"}
                      <i
                        className={`bi bi-chevron-${activeInfo === card.key ? "up" : "down"}`}
                        style={{ fontSize: 10 }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: "56px 0 80px" }}>
          <div className="container">
            <div className="row g-5 align-items-start">
              <div className="col-lg-7">
                <div
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 24,
                    padding: "40px 36px",
                    boxShadow: "var(--shadow2)",
                  }}
                >
                  <div style={{ marginBottom: 28 }}>
                    <span className="about-badge">
                      <i className="bi bi-send-fill" /> Kirim Pesan
                    </span>
                    <h2 className="syne-h1 about-title">Formulir Kontak</h2>
                    <p
                      style={{
                        fontSize: 13,
                        color: "var(--txt3)",
                        lineHeight: 1.7,
                      }}
                    >
                      Isi formulir di bawah ini dan kami akan menghubungi Anda
                      segera.
                    </p>
                  </div>

                  {submitted ? (
                    <div style={{ textAlign: "center", padding: "40px 20px" }}>
                      <div
                        className="success-badge"
                        style={{ margin: "0 auto 20px" }}
                      >
                        <i className="bi bi-check-lg" />
                      </div>
                      <h3 className="syne-h1 success-title">Pesan Terkirim!</h3>
                      <p className="success-text" style={{ marginBottom: 28 }}>
                        Terima kasih telah menghubungi kami. Tim kami akan
                        membalas pesan Anda dalam 1×24 jam kerja.
                      </p>
                      <button
                        className="btn-green-gradient btn px-4 py-2 rounded-3"
                        onClick={this.handleReset}
                      >
                        <i className="bi bi-arrow-counterclockwise me-2" />
                        Kirim Pesan Lain
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="row g-3 mb-3">
                        <div className="col-md-6">
                          <label
                            style={{
                              fontSize: 12,
                              fontWeight: 600,
                              color: "var(--txt2)",
                              marginBottom: 6,
                              display: "block",
                            }}
                          >
                            Nama Lengkap{" "}
                            <span style={{ color: "var(--sa1)" }}>*</span>
                          </label>
                          <div style={{ position: "relative" }}>
                            <input
                              type="text"
                              name="name"
                              value={form.name}
                              onChange={this.handleChange}
                              onFocus={() => this.handleFocus("name")}
                              onBlur={this.handleBlur}
                              placeholder="Budi Santoso"
                              className={`form-control input-green ${errors.name ? "input-error" : ""}`}
                              style={{ borderRadius: 10, paddingLeft: 40 }}
                            />
                            <i
                              className="bi bi-person"
                              style={{
                                position: "absolute",
                                left: 13,
                                top: "50%",
                                transform: "translateY(-50%)",
                                color:
                                  focusedField === "name"
                                    ? "var(--g1)"
                                    : "var(--txt4)",
                                transition: "color 0.2s",
                              }}
                            />
                          </div>
                          {errors.name && (
                            <p
                              style={{
                                fontSize: 11,
                                color: "var(--error-color)",
                                marginTop: 4,
                              }}
                            >
                              {errors.name}
                            </p>
                          )}
                        </div>

                        <div className="col-md-6">
                          <label
                            style={{
                              fontSize: 12,
                              fontWeight: 600,
                              color: "var(--txt2)",
                              marginBottom: 6,
                              display: "block",
                            }}
                          >
                            Alamat Email{" "}
                            <span style={{ color: "var(--sa1)" }}>*</span>
                          </label>
                          <div style={{ position: "relative" }}>
                            <input
                              type="email"
                              name="email"
                              value={form.email}
                              onChange={this.handleChange}
                              onFocus={() => this.handleFocus("email")}
                              onBlur={this.handleBlur}
                              placeholder="budi@email.com"
                              className={`form-control input-green ${errors.email ? "input-error" : ""}`}
                              style={{ borderRadius: 10, paddingLeft: 40 }}
                            />
                            <i
                              className="bi bi-envelope"
                              style={{
                                position: "absolute",
                                left: 13,
                                top: "50%",
                                transform: "translateY(-50%)",
                                color:
                                  focusedField === "email"
                                    ? "var(--g1)"
                                    : "var(--txt4)",
                                transition: "color 0.2s",
                              }}
                            />
                          </div>
                          {errors.email && (
                            <p
                              style={{
                                fontSize: 11,
                                color: "var(--error-color)",
                                marginTop: 4,
                              }}
                            >
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="mb-3">
                        <label
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: "var(--txt2)",
                            marginBottom: 6,
                            display: "block",
                          }}
                        >
                          Kategori
                        </label>
                        <div style={{ position: "relative" }}>
                          <select
                            name="category"
                            value={form.category}
                            onChange={this.handleChange}
                            className="form-select input-green"
                            style={{ borderRadius: 10, paddingLeft: 40 }}
                          >
                            {categories.map((c) => (
                              <option key={c.value} value={c.value}>
                                {c.label}
                              </option>
                            ))}
                          </select>
                          <i
                            className="bi bi-tag"
                            style={{
                              position: "absolute",
                              left: 13,
                              top: "50%",
                              transform: "translateY(-50%)",
                              color: "var(--txt4)",
                              pointerEvents: "none",
                            }}
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <label
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: "var(--txt2)",
                            marginBottom: 6,
                            display: "block",
                          }}
                        >
                          Subjek <span style={{ color: "var(--sa1)" }}>*</span>
                        </label>
                        <div style={{ position: "relative" }}>
                          <input
                            type="text"
                            name="subject"
                            value={form.subject}
                            onChange={this.handleChange}
                            onFocus={() => this.handleFocus("subject")}
                            onBlur={this.handleBlur}
                            placeholder="Topik pesan Anda..."
                            className={`form-control input-green ${errors.subject ? "input-error" : ""}`}
                            style={{ borderRadius: 10, paddingLeft: 40 }}
                          />
                          <i
                            className="bi bi-chat-square-text"
                            style={{
                              position: "absolute",
                              left: 13,
                              top: "50%",
                              transform: "translateY(-50%)",
                              color:
                                focusedField === "subject"
                                  ? "var(--g1)"
                                  : "var(--txt4)",
                              transition: "color 0.2s",
                            }}
                          />
                        </div>
                        {errors.subject && (
                          <p
                            style={{
                              fontSize: 11,
                              color: "var(--error-color)",
                              marginTop: 4,
                            }}
                          >
                            {errors.subject}
                          </p>
                        )}
                      </div>

                      <div className="mb-4">
                        <label
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: "var(--txt2)",
                            marginBottom: 6,
                            display: "block",
                          }}
                        >
                          Pesan <span style={{ color: "var(--sa1)" }}>*</span>
                        </label>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={this.handleChange}
                          onFocus={() => this.handleFocus("message")}
                          onBlur={this.handleBlur}
                          placeholder="Tuliskan pesan Anda secara detail di sini..."
                          rows={5}
                          className={`form-control input-green ${errors.message ? "input-error" : ""}`}
                          style={{ borderRadius: 10, resize: "vertical" }}
                        />
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: 4,
                          }}
                        >
                          {errors.message ? (
                            <p
                              style={{
                                fontSize: 11,
                                color: "var(--error-color)",
                              }}
                            >
                              {errors.message}
                            </p>
                          ) : (
                            <span />
                          )}
                          <span
                            style={{
                              fontSize: 11,
                              color:
                                form.message.length < 20
                                  ? "var(--txt4)"
                                  : "var(--g1)",
                            }}
                          >
                            {form.message.length} karakter
                          </span>
                        </div>
                      </div>

                      <button
                        className="btn-green-gradient btn w-100 py-3 rounded-3"
                        onClick={this.handleSubmit}
                        disabled={loading}
                        style={{ fontSize: 14, fontWeight: 700 }}
                      >
                        {loading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                            />
                            Mengirim...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-send-fill me-2" />
                            Kirim Pesan
                          </>
                        )}
                      </button>

                      <p
                        style={{
                          fontSize: 11,
                          color: "var(--txt4)",
                          textAlign: "center",
                          marginTop: 12,
                        }}
                      >
                        <i className="bi bi-shield-lock me-1" />
                        Data Anda aman dan tidak akan disebarluaskan.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="col-lg-5">
                <div
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 20,
                    padding: "28px 24px",
                    boxShadow: "var(--shadow)",
                    marginBottom: 24,
                  }}
                >
                  <h5
                    className="syne-h1"
                    style={{
                      fontSize: 15,
                      color: "var(--txt)",
                      marginBottom: 16,
                    }}
                  >
                    <i
                      className="bi bi-clock me-2"
                      style={{ color: "var(--g1)" }}
                    />
                    Jam Operasional
                  </h5>
                  {[
                    {
                      day: "Senin – Jumat",
                      hours: "08.00 – 17.00 WIB",
                      active: true,
                    },
                    { day: "Sabtu", hours: "09.00 – 14.00 WIB", active: true },
                    {
                      day: "Minggu & Hari Libur",
                      hours: "Tutup",
                      active: false,
                    },
                  ].map((row, i) => (
                    <div
                      key={row.day}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px 0",
                        borderBottom:
                          i < 2 ? "1px solid var(--border)" : "none",
                      }}
                    >
                      <span style={{ fontSize: 13, color: "var(--txt3)" }}>
                        {row.day}
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: row.active ? "var(--g1)" : "var(--sa1)",
                          background: row.active ? "var(--g5)" : "var(--sa5)",
                          padding: "3px 10px",
                          borderRadius: 20,
                        }}
                      >
                        {row.hours}
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 20,
                    padding: "28px 24px",
                    boxShadow: "var(--shadow)",
                  }}
                >
                  <h5
                    className="syne-h1"
                    style={{
                      fontSize: 15,
                      color: "var(--txt)",
                      marginBottom: 16,
                    }}
                  >
                    <i
                      className="bi bi-question-circle me-2"
                      style={{ color: "var(--cr1)" }}
                    />
                    Pertanyaan Umum
                  </h5>
                  {faqs.map((faq, i) => (
                    <div
                      key={i}
                      style={{
                        borderBottom:
                          i < faqs.length - 1
                            ? "1px solid var(--border)"
                            : "none",
                      }}
                    >
                      <div
                        onClick={() => this.toggleInfo(`faq-${i}`)}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "14px 0",
                          cursor: "pointer",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color:
                              activeInfo === `faq-${i}`
                                ? "var(--g1)"
                                : "var(--txt)",
                            flex: 1,
                            paddingRight: 12,
                          }}
                        >
                          {faq.q}
                        </span>
                        <div
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: 8,
                            background:
                              activeInfo === `faq-${i}`
                                ? "var(--g1)"
                                : "var(--surf2)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            transition: "all 0.25s",
                          }}
                        >
                          <i
                            className={`bi bi-chevron-${activeInfo === `faq-${i}` ? "up" : "down"}`}
                            style={{
                              fontSize: 11,
                              color:
                                activeInfo === `faq-${i}`
                                  ? "#fff"
                                  : "var(--txt4)",
                            }}
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          maxHeight: activeInfo === `faq-${i}` ? 200 : 0,
                          overflow: "hidden",
                        }}
                      >
                        <p
                          style={{
                            fontSize: 13,
                            color: "var(--txt3)",
                            lineHeight: 1.7,
                            paddingBottom: 14,
                          }}
                        >
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact-bottom"
          style={{
            background:
              "linear-gradient(155deg,#2e5220 0%,var(--g1) 45%,var(--cr2) 100%)",
            padding: "60px 0",
          }}
        >
          <div className="container text-center">
            <h2
              className="syne-h1"
              style={{
                fontSize: "clamp(22px,4vw,36px)",
                color: "#fff",
                marginBottom: 10,
              }}
            >
              Belum menemukan jawaban?
            </h2>
            <p
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.7)",
                maxWidth: 460,
                margin: "0 auto 28px",
                lineHeight: 1.8,
              }}
            >
              Kunjungi halaman FAQ lengkap kami atau hubungi tim support secara
              langsung.
            </p>
            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                className="faq-help-box__btn-primary"
                style={{ fontSize: 13 }}
                onClick={() => (window.location.href = "/faq")}
              >
                <i className="bi bi-question-circle" /> Lihat FAQ
              </button>
              <button
                className="faq-help-box__btn-secondary"
                style={{ fontSize: 13 }}
                onClick={() => {
                  const message = encodeURIComponent(
                    "Halo FoodRescue, Saya ingin bertanya",
                  );

                  window.location.href = `https://wa.me/6282274197020?text=${message}`;
                }}
              >
                <i className="bi bi-whatsapp" /> WhatsApp Kami
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Contact;
