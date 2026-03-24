import { useState } from "react";

const chains = [
  {
    id: "base", name: "Base", phase: "NOW", status: "Mainnet / L2",
    buildTask: "Focus on 'Onchain Summer' vibes. Deploy to Base Sepolia (Testnet) first to keep it $0.",
    suggestions: [
      "Based Feedback: A simple dApp where users sign a message to leave feedback for a brand.",
      "Micro-Tip Jar: A smart contract that allows anyone to send 0.0001 ETH tips on testnet.",
      "Frame-ready Poll: A simple voting contract designed to be turned into a Farcaster Frame."
    ],
    sessions: [
      { duration: "30min", label: "Get Base Sepolia ETH from faucet + deploy first contract" },
      { duration: "1hr", label: "Integrate OnchainKit for easy 'Connect Wallet' button" },
      { duration: "2hr", label: "Build a frontend that reads data from your Base contract" },
    ],
    content: [
      { type: "Thread", platform: "X", title: "Why I'm building on Base as a solo dev", hook: "Low fees, high builder energy." },
      { type: "Clip", platform: "TikTok", title: "My 2-hour Base build speedrun", hook: "Fastest deployment in L2 history." },
    ],
  },
  {
    id: "genlayer", name: "GenLayer", phase: "SOON", status: "Incentivized Testnet",
    buildTask: "Use 'Intelligent Contracts' (Python) to connect the web to the blockchain for free.",
    suggestions: [
      "Weather Bet: A contract that settles based on the temperature in Lagos today (via OpenWeather API).",
      "X-Post Verifier: A contract that only releases 'points' if it finds a specific tweet/post.",
      "AI News Judge: A contract that reads a news headline and uses an LLM to decide if it's 'Bullish' or 'Bearish'."
    ],
    sessions: [
      { duration: "45min", label: "Run GenLayer Studio locally using Docker" },
      { duration: "1hr", label: "Write a Python contract that uses 'gl.get_webpage'" },
      { duration: "2hr", label: "Deploy a 'Web-to-Chain' resolver on the incentivized testnet" },
    ],
    content: [
      { type: "Thread", platform: "X", title: "Blockchain without Oracles? Testing GenLayer", hook: "The internet is now a data source." },
      { type: "Short Post", platform: "LinkedIn", title: "The rise of Intelligent Contracts", hook: "Python meets Blockchain." },
    ],
  },
  {
    id: "opengradient", name: "OpenGradient", phase: "SOON", status: "Devnet",
    buildTask: "Build 'On-Chain AI' tools using their free devnet resources.",
    suggestions: [
      "AI Sentiment Tracker: A tool that takes a crypto ticker and returns an AI sentiment score on-chain.",
      "Verifiable Prompt: A dApp where you input a prompt and get a signed AI response on-chain.",
      "Code Auditor Bot: A simple AI model call that checks a Solidity snippet for obvious bugs."
    ],
    sessions: [
      { duration: "40min", label: "Explore the OpenGradient Model Registry" },
      { duration: "1hr", label: "Call an AI model inference from a Solidity script" },
      { duration: "2hr", label: "Build a UI that displays the 'Verifiable AI' result" },
    ],
    content: [
      { type: "Clip", platform: "X", title: "Running AI models on-chain (No joke)", hook: "Verifiable inference is finally here." },
      { type: "Thread", platform: "X", title: "OpenGradient vs. Centralized AI", hook: "Why decentralized AI matters for the future." },
    ],
  },
];

const themes = {
  dark: {
    bg: "#0A0A0A", surface: "#141414", border: "#222", 
    text: "#E5E5E5", textMid: "#888", accent: "#3B82F6",
    card: "#1A1A1A",
  }
};

export default function BuilderRoadmap() {
  const [active, setActive] = useState("base");
  const [tab, setTab] = useState("build");
  const t = themes.dark;
  const current = chains.find(c => c.id === active);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: t.bg, color: t.text, fontFamily: "Inter, sans-serif" }}>
      
      {/* Sidebar */}
      <aside style={{ width: "260px", borderRight: `1px solid ${t.border}`, padding: "40px 20px" }}>
        <h2 style={{ fontSize: "14px", letterSpacing: "2px", color: t.textMid, marginBottom: "40px" }}>COMMAND CENTER</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {chains.map(c => (
            <button 
              key={c.id}
              onClick={() => setActive(c.id)}
              style={{
                textAlign: "left", padding: "12px 16px", borderRadius: "8px", cursor: "pointer",
                background: active === c.id ? t.card : "transparent",
                border: "none", color: active === c.id ? t.accent : t.textMid,
                fontWeight: active === c.id ? "600" : "400", transition: "0.2s"
              }}
            >
              {c.name} <span style={{ fontSize: "10px", opacity: 0.6 }}>— {c.phase}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "60px", maxWidth: "900px" }}>
        <header style={{ marginBottom: "40px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: "800", marginBottom: "8px" }}>{current.name}</h1>
          <p style={{ color: t.textMid, fontSize: "16px" }}>{current.status} • {current.buildTask}</p>
        </header>

        {/* Suggestions Section */}
        <section style={{ marginBottom: "40px", background: t.card, padding: "24px", borderRadius: "12px", border: `1px solid ${t.border}` }}>
          <h3 style={{ fontSize: "14px", color: t.accent, marginBottom: "16px" }}>$0 BUILD SUGGESTIONS</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {current.suggestions.map((s, i) => (
              <li key={i} style={{ marginBottom: "12px", fontSize: "14px", display: "flex", gap: "10px" }}>
                <span style={{ color: t.accent }}>•</span> {s}
              </li>
            ))}
          </ul>
        </section>

        {/* Tab Switcher */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "30px", borderBottom: `1px solid ${t.border}` }}>
          {["build", "content"].map(type => (
            <button 
              key={type}
              onClick={() => setTab(type)}
              style={{
                background: "none", border: "none", color: tab === type ? t.text : t.textMid,
                paddingBottom: "12px", cursor: "pointer", borderBottom: tab === type ? `2px solid ${t.accent}` : "none",
                textTransform: "uppercase", fontSize: "12px", fontWeight: "600"
              }}
            >
              {type === "build" ? "Execution Plan" : "Social Content"}
            </button>
          ))}
        </div>

        {/* Action Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {(tab === "build" ? current.sessions : current.content).map((item, i) => (
            <div key={i} style={{ background: t.card, padding: "20px", borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "15px", fontWeight: "500", marginBottom: "4px" }}>{item.label || item.title}</div>
                <div style={{ fontSize: "12px", color: t.textMid }}>{item.duration || item.platform} — {item.hook || "Focus on quality."}</div>
              </div>
              <div style={{ width: "20px", height: "20px", borderRadius: "4px", border: `2px solid ${t.border}` }} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}