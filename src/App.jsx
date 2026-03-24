import { useState } from "react";

const chains = [
  {
    id: "base", name: "Base", phase: "NOW", status: "Live Mainnet",
    buildTask: "Ship a small dApp to Base mainnet — a stripped-down Polymarket scanner or prediction tool. Then nominate for Builder Grant.",
    sessions: [
      { duration: "40min", label: "Setup Base wallet + deploy Hello World contract on Base Sepolia testnet" },
      { duration: "1hr", label: "Read Base Builder Grants docs + outline your project idea" },
      { duration: "2hr", label: "Build + deploy your MVP dApp to Base mainnet" },
    ],
    content: [
      { type: "Thread", platform: "X", title: "\"I just deployed my first dApp on Base — here's what I learned in 2 hours\"", hook: "Personal builder story, include screenshots" },
      { type: "Thread", platform: "X", title: "\"Base Builder Grants are real — here's how to qualify as a solo builder\"", hook: "Break down the grant tiers + your plan" },
      { type: "Short Post", platform: "LinkedIn", title: "\"Building on Base as a solo Web3 dev from Lagos — my honest experience\"", hook: "Authentic story, geographic angle lands well on LinkedIn" },
      { type: "Clip", platform: "X", title: "Screen record your deploy + tweet the clip with commentary", hook: "\"Shipped. Base mainnet. Solo builder.\"" },
    ],
  },
  {
    id: "genlayer", name: "GenLayer", phase: "SOON", status: "Incentivized Testnet",
    buildTask: "Join the testnet, write a Python Intelligent Contract that resolves a prediction using live web data. Target: sports result or crypto price.",
    sessions: [
      { duration: "40min", label: "Read GenLayer docs + understand Intelligent Contracts concept" },
      { duration: "1hr", label: "Set up local GenLayer studio + run example contract" },
      { duration: "2hr", label: "Write + deploy your own Intelligent Contract (prediction market resolver)" },
    ],
    content: [
      { type: "Thread", platform: "X", title: "\"GenLayer just made prediction markets smarter — no oracles, just AI\"", hook: "Explain Intelligent Contracts in plain terms" },
      { type: "Thread", platform: "X", title: "\"I wrote a Python contract that settles sports bets using live data — here's how\"", hook: "Builder thread with code snippets + screenshots" },
      { type: "Short Post", platform: "LinkedIn", title: "\"AI + Blockchain is real. I just built it on GenLayer testnet.\"", hook: "Professional tone, tag the GenLayer team" },
      { type: "Clip", platform: "X", title: "Screen record the contract resolving a real outcome", hook: "\"AI settled a bet on-chain. No oracle. No middleman.\"" },
    ],
  },
  {
    id: "opengradient", name: "OpenGradient", phase: "SOON", status: "Devnet Live",
    buildTask: "Deploy a verifiable AI inference model on devnet. Start with their LangChain integration or SolidML to call an AI model from a smart contract.",
    sessions: [
      { duration: "40min", label: "Read OpenGradient devnet docs + explore model registry" },
      { duration: "1hr", label: "Deploy a model inference call from a Solidity contract on devnet" },
      { duration: "2hr", label: "Build a simple AI trading signal tool or content-scoring tool using OG inference" },
    ],
    content: [
      { type: "Thread", platform: "X", title: "\"You can now call an AI model from a smart contract. OpenGradient just changed the game.\"", hook: "Explain the concept, use a clear analogy" },
      { type: "Thread", platform: "X", title: "\"I built an on-chain AI signal tool in 2 hours — here's the breakdown\"", hook: "Builder thread: problem → build → result" },
      { type: "Short Post", platform: "LinkedIn", title: "\"On-chain AI inference is live. I tested it. Here's what devs need to know.\"", hook: "Positioning as an informed early builder" },
      { type: "Clip", platform: "X", title: "Show the contract call returning an AI output on-chain", hook: "\"AI inference. On-chain. Verifiable.\"" },
    ],
  },
  {
    id: "arcium", name: "Arcium", phase: "WATCH", status: "Mainnet Alpha — Full TGE Q1 2026",
    buildTask: "Learn the Arcis language (Rust-based). Build a confidential computation proof-of-concept — a private wallet scanner or dark pool order concept.",
    sessions: [
      { duration: "40min", label: "Read Arcium whitepaper + understand MXEs (Multiparty Execution Environments)" },
      { duration: "1hr", label: "Set up Rust dev environment + run Arcium hello world" },
      { duration: "2hr", label: "Build a simple confidential compute demo — private score calculator or hidden balance aggregator" },
    ],
    content: [
      { type: "Thread", platform: "X", title: "\"Blockchains are transparent by default. Arcium makes them private by design.\"", hook: "Explain the privacy gap + Arcium's solution" },
      { type: "Thread", platform: "X", title: "\"I tried building on Arcium. Here's what confidential compute actually means for DeFi builders\"", hook: "Honest builder take — technical but accessible" },
      { type: "Short Post", platform: "LinkedIn", title: "\"Privacy-preserving computation on blockchain is closer than you think — my Arcium build log\"", hook: "Niche but strong signal for Web3 professionals" },
      { type: "Clip", platform: "X", title: "Explain Arcium MXEs in a 60-second screen + voice clip", hook: "\"Encrypted computation. Trustless. On-chain.\"" },
    ],
  },
  {
    id: "rialo", name: "Rialo", phase: "WATCH", status: "Pre-Mainnet — Whitelist Open",
    buildTask: "Join the builder whitelist now. When devnet opens, build a real-world data dApp — healthcare access tool or micro-lending app using native web connectivity.",
    sessions: [
      { duration: "40min", label: "Read Rialo docs + understand RISC-V contract architecture + web connectivity" },
      { duration: "1hr", label: "Join whitelist + engage with Rialo team on Discord/X — positioning matters at this stage" },
      { duration: "2hr", label: "Draft your dApp concept + write a public builder thread about what you plan to build on Rialo" },
    ],
    content: [
      { type: "Thread", platform: "X", title: "\"Rialo isn't a Layer 1 — and that's exactly why it's interesting\"", hook: "Decode the name + the vision. Early alpha content." },
      { type: "Thread", platform: "X", title: "\"5 dApps I want to build on Rialo when devnet drops\"", hook: "Speculative builder content — positions you as ecosystem-aware" },
      { type: "Short Post", platform: "LinkedIn", title: "\"Pantera + Coinbase backed this chain. I joined the whitelist. Here's why.\"", hook: "FOMO + credibility signal for LinkedIn audience" },
      { type: "Clip", platform: "X", title: "60-sec clip explaining what makes Rialo different from other L1s", hook: "\"No oracle. Native web access. Real-world data on-chain.\"" },
    ],
  },
];

const phaseOrder = { NOW: 0, SOON: 1, WATCH: 2 };
const phaseLabel = { NOW: "Build Now", SOON: "Build Soon", WATCH: "Watch & Position" };

const themes = {
  light: {
    bg: "#f5f5f0",
    surface: "#ffffff",
    border: "#e5e5e0",
    borderStrong: "#d0d0c8",
    text: "#111",
    textMid: "#555",
    textFaint: "#999",
    accent: "#2563eb",
    accentFaint: "#eff4ff",
    accentBorder: "#bfdbfe",
    toggleBg: "#e5e5e0",
    progressBg: "#e5e5e0",
    sessionBg: "#fafaf8",
    doneBg: "#f5f5f0",
  },
  dark: {
    bg: "#000",
    surface: "#050505",
    border: "#1a1a1a",
    borderStrong: "#222",
    text: "#fff",
    textMid: "#666",
    textFaint: "#333",
    accent: "#2563eb",
    accentFaint: "#0a1628",
    accentBorder: "#1e3a5f",
    toggleBg: "#111",
    progressBg: "#111",
    sessionBg: "#080808",
    doneBg: "#0a0a0a",
  },
};

export default function BuilderRoadmap() {
  const [active, setActive] = useState("base");
  const [tab, setTab] = useState("build");
  const [completed, setCompleted] = useState({});
  const [isDark, setIsDark] = useState(false);

  const t = isDark ? themes.dark : themes.light;
  const current = chains.find(c => c.id === active);
  const sorted = [...chains].sort((a, b) => phaseOrder[a.phase] - phaseOrder[b.phase]);
  const toggle = (key) => setCompleted(prev => ({ ...prev, [key]: !prev[key] }));

  const getProgress = (chain) => {
    const total = chain.sessions.length + chain.content.length;
    const done =
      chain.sessions.filter((_, i) => completed[`${chain.id}-build-${i}`]).length +
      chain.content.filter((_, i) => completed[`${chain.id}-content-${i}`]).length;
    return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: t.bg, minHeight: "100vh", color: t.text, transition: "background 0.2s, color 0.2s" }}>

      {/* Layout */}
      <div style={{ display: "flex", minHeight: "100vh" }}>

        {/* Sidebar */}
        <div style={{ width: 220, flexShrink: 0, borderRight: `1px solid ${t.border}`, display: "flex", flexDirection: "column", padding: "24px 0" }}>
          <div style={{ padding: "0 20px 20px", borderBottom: `1px solid ${t.border}` }}>
            <div style={{ fontSize: 10, color: t.textFaint, letterSpacing: "0.15em", marginBottom: 6 }}>SIMON PROSPER</div>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Builder Roadmap</div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              {["NOW", "SOON", "WATCH"].map(p => (
                <div key={p} style={{
                  fontSize: 9, letterSpacing: "0.1em", padding: "3px 8px",
                  border: `1px solid ${p === "NOW" ? t.accent : t.border}`,
                  borderRadius: 4, color: p === "NOW" ? t.accent : t.textMid,
                }}>{p}</div>
              ))}
            </div>
          </div>

          {/* Chain list */}
          <div style={{ flex: 1, padding: "12px 0" }}>
            {sorted.map(chain => {
              const isActive = active === chain.id;
              return (
                <button key={chain.id} onClick={() => { setActive(chain.id); setTab("build"); }} style={{
                  width: "100%", background: isActive ? t.accentFaint : "none",
                  border: "none", borderLeft: `2px solid ${isActive ? t.accent : "transparent"}`,
                  padding: "10px 20px", cursor: "pointer", display: "flex",
                  justifyContent: "space-between", alignItems: "center",
                  color: isActive ? t.text : t.textMid, fontSize: 13,
                  fontWeight: isActive ? 600 : 400, fontFamily: "inherit",
                  transition: "all 0.15s",
                }}>
                  {chain.name}
                  <span style={{
                    fontSize: 9, letterSpacing: "0.08em",
                    color: chain.phase === "NOW" ? t.accent : chain.phase === "SOON" ? t.textMid : t.textFaint,
                  }}>{chain.phase}</span>
                </button>
              );
            })}
          </div>

          {/* Progress + toggle */}
          <div style={{ padding: "16px 20px", borderTop: `1px solid ${t.border}` }}>
            <div style={{ fontSize: 10, color: t.textFaint, letterSpacing: "0.12em", marginBottom: 10 }}>PROGRESS</div>
            {sorted.map(chain => {
              const { pct } = getProgress(chain);
              return (
                <div key={chain.id} style={{ marginBottom: 7 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 10, color: active === chain.id ? t.text : t.textFaint }}>{chain.name}</span>
                    <span style={{ fontSize: 10, color: t.textFaint }}>{pct}%</span>
                  </div>
                  <div style={{ background: t.progressBg, borderRadius: 2, height: 3, overflow: "hidden" }}>
                    <div style={{ width: `${pct}%`, height: "100%", background: t.accent, borderRadius: 2, transition: "width 0.4s" }} />
                  </div>
                </div>
              );
            })}

            {/* Dark/light toggle */}
            <button onClick={() => setIsDark(!isDark)} style={{
              marginTop: 16, width: "100%", background: t.toggleBg,
              border: `1px solid ${t.border}`, borderRadius: 6, padding: "8px 12px",
              cursor: "pointer", color: t.textMid, fontSize: 11,
              fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              transition: "all 0.2s",
            }}>
              {isDark ? "☀ Light Mode" : "☾ Dark Mode"}
            </button>
          </div>
        </div>

        {/* Main panel */}
        <div style={{ flex: 1, padding: "28px 32px", overflowY: "auto" }}>

          {/* Chain header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>{current.name}</div>
              <div style={{ fontSize: 12, color: t.textMid }}>{current.status}</div>
            </div>
            <div style={{
              fontSize: 11, border: `1px solid ${current.phase === "NOW" ? t.accent : t.border}`,
              borderRadius: 5, padding: "7px 14px",
              color: current.phase === "NOW" ? t.accent : t.textMid,
              background: current.phase === "NOW" ? t.accentFaint : "none",
            }}>
              {phaseLabel[current.phase]}
            </div>
          </div>

          <div style={{ fontSize: 13, color: t.textMid, lineHeight: 1.7, marginBottom: 24, paddingBottom: 20, borderBottom: `1px solid ${t.border}` }}>
            {current.buildTask}
          </div>

          {/* Sub-tabs */}
          <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
            {[{ id: "build", label: "Build Sessions" }, { id: "content", label: "Content Queue" }].map(tb => (
              <button key={tb.id} onClick={() => setTab(tb.id)} style={{
                background: tab === tb.id ? t.accent : "none",
                border: `1px solid ${tab === tb.id ? t.accent : t.border}`,
                borderRadius: 6, padding: "8px 18px",
                cursor: "pointer", color: tab === tb.id ? "#fff" : t.textMid,
                fontSize: 12, fontFamily: "inherit", fontWeight: tab === tb.id ? 600 : 400,
                transition: "all 0.15s",
              }}>
                {tb.label}
              </button>
            ))}
          </div>

          {/* Build sessions */}
          {tab === "build" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {current.sessions.map((s, i) => {
                const key = `${current.id}-build-${i}`;
                const done = completed[key];
                return (
                  <div key={i} onClick={() => toggle(key)} style={{
                    display: "flex", alignItems: "flex-start", gap: 16,
                    background: done ? t.doneBg : t.sessionBg,
                    border: `1px solid ${t.border}`,
                    borderRadius: 8, padding: "16px 18px",
                    cursor: "pointer", opacity: done ? 0.4 : 1,
                    transition: "opacity 0.2s",
                  }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flexShrink: 0 }}>
                      <div style={{
                        width: 24, height: 24, borderRadius: "50%",
                        border: `1.5px solid ${done ? t.border : t.accent}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 10, color: done ? t.textFaint : t.accent,
                      }}>
                        {done ? "✓" : i + 1}
                      </div>
                      <div style={{
                        background: t.accent, borderRadius: 3,
                        padding: "2px 7px", fontSize: 9, color: "#fff", letterSpacing: "0.06em",
                      }}>
                        {s.duration}
                      </div>
                    </div>
                    <div style={{ fontSize: 13, color: done ? t.textFaint : t.text, lineHeight: 1.65, paddingTop: 4 }}>
                      {s.label}
                    </div>
                  </div>
                );
              })}
              <div style={{ fontSize: 11, color: t.textFaint, textAlign: "center", marginTop: 6 }}>Click a session to mark complete</div>
            </div>
          )}

          {/* Content queue */}
          {tab === "content" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {current.content.map((c, i) => {
                const key = `${current.id}-content-${i}`;
                const done = completed[key];
                return (
                  <div key={i} style={{
                    background: t.sessionBg, border: `1px solid ${t.border}`,
                    borderRadius: 8, padding: "16px 18px",
                    opacity: done ? 0.35 : 1, transition: "opacity 0.2s",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
                      <span style={{
                        fontSize: 10, border: `1px solid ${t.accentBorder}`,
                        borderRadius: 3, padding: "2px 8px", color: t.accent,
                        background: t.accentFaint, letterSpacing: "0.06em",
                      }}>{c.type}</span>
                      <span style={{
                        fontSize: 10, border: `1px solid ${t.border}`,
                        borderRadius: 3, padding: "2px 8px", color: t.textMid, letterSpacing: "0.06em",
                      }}>{c.platform}</span>
                      <button onClick={() => toggle(key)} style={{
                        marginLeft: "auto", background: "none",
                        border: `1px solid ${done ? t.border : t.accent}`,
                        borderRadius: 5, padding: "4px 12px", fontSize: 10,
                        color: done ? t.textFaint : t.accent, cursor: "pointer", fontFamily: "inherit",
                      }}>
                        {done ? "Undo" : "Mark Posted"}
                      </button>
                    </div>
                    <div style={{ fontSize: 13, color: t.text, fontWeight: 500, marginBottom: 8, lineHeight: 1.6 }}>
                      {c.title}
                    </div>
                    <div style={{ fontSize: 11, color: t.textMid, lineHeight: 1.6, borderTop: `1px solid ${t.border}`, paddingTop: 10 }}>
                      {c.hook}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: 36, fontSize: 10, color: t.textFaint, letterSpacing: "0.2em" }}>
            LEARNING → RELEARNING → GROWING
          </div>
        </div>
      </div>
    </div>
  );
}