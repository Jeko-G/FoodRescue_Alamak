import React from "react";
import api from "../utils/api";
import { AuthContext } from "../Context/AuthContext";
import { getBadge } from "../utils/badgeHelper";

class Leaderboard extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      national: [],
      city: [],
      myRank: null,
      activeTab: "national",
      loading: true,
    };
  }

  async componentDidMount() {
    try {
      const [natRes, meRes] = await Promise.all([
        api.get("/leaderboard?type=national&limit=10"),
        api.get("/leaderboard/me"),
      ]);
      this.setState({ national: natRes.data, myRank: meRes.data });

      if (meRes.data.city) {
        const cityRes = await api.get(
          `/leaderboard?type=city&city=${encodeURIComponent(meRes.data.city)}&limit=10`,
        );
        this.setState({ city: cityRes.data });
      }
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({ loading: false });
    }
  }

  renderRow = (user, index) => {
    const badge = getBadge(user.total_points || 0);
    const isMe = user._id === (this.context.user?.id || this.context.user?._id);
    const rankEmoji =
      index === 0
        ? "🥇"
        : index === 1
          ? "🥈"
          : index === 2
            ? "🥉"
            : `#${index + 1}`;

    return (
      <div
        key={user._id}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "12px 16px",
          borderRadius: 12,
          background: isMe ? "rgba(95,139,76,0.1)" : "var(--surface)",
          border: `1px solid ${isMe ? "rgba(95,139,76,0.4)" : "var(--border)"}`,
          marginBottom: 8,
          transition: "all 0.2s",
        }}
      >
        {/* Rank */}
        <div
          style={{
            width: 36,
            textAlign: "center",
            fontSize: index < 3 ? 20 : 13,
            fontWeight: 700,
            color: "var(--txt3)",
            flexShrink: 0,
          }}
        >
          {rankEmoji}
        </div>

        {/* Avatar */}
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: "var(--g1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          {user.avatar_url ? (
            <img
              src={user.avatar_url}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <i
              className="bi bi-person-fill"
              style={{ color: "#fff", fontSize: 18 }}
            />
          )}
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                fontWeight: 700,
                fontSize: 14,
                color: "var(--txt)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {user.first_name} {user.last_name}
            </span>
            <span title={badge.level} style={{ fontSize: 14, flexShrink: 0 }}>
              {badge.emoji}
            </span>
            {isMe && (
              <span
                style={{
                  fontSize: 10,
                  background: "var(--g2)",
                  color: "#fff",
                  borderRadius: 999,
                  padding: "1px 7px",
                  fontWeight: 700,
                }}
              >
                Kamu
              </span>
            )}
          </div>
          <div style={{ fontSize: 11, color: "var(--txt4)" }}>
            {user.role === "food_provider" ? "🍱 Provider" : "🙏 Seeker"} ·{" "}
            {user.city || "—"}
          </div>
        </div>

        {/* Points */}
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div
            className="syne-h1"
            style={{ fontSize: 18, color: "var(--g1)", lineHeight: 1 }}
          >
            {user.total_points}
          </div>
          <div style={{ fontSize: 10, color: "var(--txt4)" }}>poin</div>
        </div>
      </div>
    );
  };

  render() {
    const { national, city, myRank, activeTab, loading } = this.state;
    const list = activeTab === "national" ? national : city;
    const myBadge = myRank ? getBadge(myRank.total_points || 0) : null;

    return (
      <div
        className="container-md outfit py-4 py-md-5 px-4 px-md-5"
        style={{ maxWidth: 700 }}
      >
        <h3 className="syne-h1 text-green1 mb-1">🏆 Leaderboard</h3>
        <p className="text-green3 outfit fw-light mb-4">
          Pengguna FoodRescue paling aktif
        </p>

        {/* My Rank Card */}
        {myRank && myBadge && (
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(95,139,76,0.12), rgba(184,105,74,0.08))",
              border: "1px solid rgba(95,139,76,0.3)",
              borderRadius: 16,
              padding: "16px 20px",
              marginBottom: 24,
              display: "flex",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <div style={{ fontSize: 40 }}>{myBadge.emoji}</div>
            <div style={{ flex: 1 }}>
              <p
                className="outfit mb-0"
                style={{ fontWeight: 700, fontSize: 15, color: "var(--txt)" }}
              >
                {myBadge.level} · {myRank.total_points} poin
              </p>
              <p
                className="outfit mb-0"
                style={{ fontSize: 12, color: "var(--txt3)" }}
              >
                Rank #{myRank.nationalRank} Nasional
                {myRank.cityRank &&
                  ` · Rank #${myRank.cityRank} di ${myRank.city}`}
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, color: "var(--txt4)" }}>Level</div>
              <div
                style={{ fontWeight: 700, color: myBadge.color, fontSize: 15 }}
              >
                {myBadge.level}
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {["national", "city"].map((tab) => (
            <button
              key={tab}
              onClick={() => this.setState({ activeTab: tab })}
              className="outfit"
              style={{
                padding: "7px 18px",
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                border:
                  activeTab === tab
                    ? "1px solid var(--g2)"
                    : "1px solid var(--border)",
                background: activeTab === tab ? "var(--g5)" : "transparent",
                color: activeTab === tab ? "var(--g1)" : "var(--txt3)",
                transition: "all 0.2s",
              }}
            >
              {tab === "national"
                ? "🌍 Nasional"
                : `📍 ${myRank?.city || "Kota"}`}
            </button>
          ))}
        </div>

        {/* Poin legend */}
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: 20,
          }}
        >
          {[
            { emoji: "🥉", label: "Bronze", range: "0–499" },
            { emoji: "🥈", label: "Silver", range: "500–1999" },
            { emoji: "🥇", label: "Gold", range: "2000+" },
          ].map((b) => (
            <span
              key={b.label}
              style={{
                fontSize: 11,
                color: "var(--txt4)",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              {b.emoji} {b.label} ({b.range})
            </span>
          ))}
        </div>

        {/* List */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border" style={{ color: "var(--g2)" }} />
          </div>
        ) : list.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-trophy display-4 text-green4"></i>
            <p className="text-green4 mt-2">Belum ada data leaderboard</p>
          </div>
        ) : (
          list.map((user, i) => this.renderRow(user, i))
        )}
      </div>
    );
  }
}

export default Leaderboard;
