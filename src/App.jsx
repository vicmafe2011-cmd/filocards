import { useMemo, useState } from "react";

const philosophersData = [
  {
    id: "socrates",
    name: "Sócrates",
    era: "Antigua",
    school: "Socratismo",
    quote: "Solo sé que no sé nada.",
    atk: 84,
    def: 78,
    wis: 95,
    color: "#d4a373",
  },
  {
    id: "plato",
    name: "Platón",
    era: "Antigua",
    school: "Idealismo",
    quote: "El conocimiento verdadero reside en las ideas.",
    atk: 88,
    def: 86,
    wis: 94,
    color: "#b08968",
  },
  {
    id: "aristotle",
    name: "Aristóteles",
    era: "Antigua",
    school: "Peripatetismo",
    quote: "El hombre es un animal racional.",
    atk: 90,
    def: 89,
    wis: 92,
    color: "#7f5539",
  },
  {
    id: "kant",
    name: "Kant",
    era: "Moderna",
    school: "Criticismo",
    quote: "Obra solo según una máxima universal.",
    atk: 91,
    def: 88,
    wis: 96,
    color: "#457b9d",
  },
  {
    id: "marx",
    name: "Marx",
    era: "Contemporánea",
    school: "Materialismo",
    quote: "De lo que se trata es de transformar el mundo.",
    atk: 93,
    def: 84,
    wis: 89,
    color: "#b23a48",
  },
  {
    id: "nietzsche",
    name: "Nietzsche",
    era: "Contemporánea",
    school: "Vitalismo",
    quote: "Dios ha muerto.",
    atk: 95,
    def: 74,
    wis: 90,
    color: "#6a4c93",
  },
  {
    id: "debeauvoir",
    name: "Simone de Beauvoir",
    era: "Contemporánea",
    school: "Feminismo existencialista",
    quote: "No se nace mujer: se llega a serlo.",
    atk: 90,
    def: 82,
    wis: 91,
    color: "#e76f51",
  },
  {
    id: "confucius",
    name: "Confucio",
    era: "Antigua",
    school: "Confucianismo",
    quote: "Exígete mucho a ti mismo.",
    atk: 80,
    def: 88,
    wis: 94,
    color: "#2a9d8f",
  },
];

function duel(a, b) {
  const rounds = [
    { key: "atk", label: "Argumento" },
    { key: "def", label: "Defensa" },
    { key: "wis", label: "Sabiduría" },
  ];

  let scoreA = 0;
  let scoreB = 0;
  const details = [];

  for (const round of rounds) {
    if (a[round.key] > b[round.key]) {
      scoreA++;
      details.push(`${round.label}: gana ${a.name} (${a[round.key]} vs ${b[round.key]})`);
    } else if (b[round.key] > a[round.key]) {
      scoreB++;
      details.push(`${round.label}: gana ${b.name} (${b[round.key]} vs ${a[round.key]})`);
    } else {
      details.push(`${round.label}: empate (${a[round.key]} vs ${b[round.key]})`);
    }
  }

  const winner = scoreA >= scoreB ? a : b;

  return {
    winner,
    scoreA,
    scoreB,
    details,
  };
}

function statBar(label, value) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 13,
          marginBottom: 4,
          color: "#eaeaea",
        }}
      >
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <div
        style={{
          height: 8,
          background: "rgba(255,255,255,0.18)",
          borderRadius: 999,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${value}%`,
            height: "100%",
            background: "linear-gradient(90deg, #ffd166, #f4a261)",
            borderRadius: 999,
          }}
        />
      </div>
    </div>
  );
}

function cardStyle(selected, color) {
  return {
    background: `linear-gradient(180deg, ${color}, #1f1f1f)`,
    color: "white",
    borderRadius: 22,
    padding: 18,
    cursor: "pointer",
    border: selected ? "3px solid #ffd166" : "2px solid rgba(255,255,255,0.08)",
    boxShadow: selected
      ? "0 0 0 3px rgba(255,209,102,0.25), 0 14px 30px rgba(0,0,0,0.35)"
      : "0 10px 24px rgba(0,0,0,0.22)",
    transform: selected ? "translateY(-4px) scale(1.01)" : "translateY(0)",
    transition: "all 0.2s ease",
    minHeight: 320,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };
}

export default function App() {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);
  const [result, setResult] = useState(null);

  const philosophers = useMemo(() => philosophersData, []);
  const fighterA = philosophers.find((p) => p.id === selectedA) || null;
  const fighterB = philosophers.find((p) => p.id === selectedB) || null;

  const pickPhilosopher = (p) => {
    if (!selectedA) {
      setSelectedA(p.id);
      setResult(null);
      return;
    }
    if (!selectedB && p.id !== selectedA) {
      setSelectedB(p.id);
      setResult(null);
      return;
    }
    if (p.id === selectedA) {
      setSelectedA(null);
      setResult(null);
      return;
    }
    if (p.id === selectedB) {
      setSelectedB(null);
      setResult(null);
      return;
    }
    setSelectedA(p.id);
    setSelectedB(null);
    setResult(null);
  };

  const startDuel = () => {
    if (fighterA && fighterB) {
      setResult(duel(fighterA, fighterB));
    }
  };

  const resetAll = () => {
    setSelectedA(null);
    setSelectedB(null);
    setResult(null);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #2b2d42 0%, #1b1d2a 35%, #0f1117 100%)",
        color: "white",
        padding: 24,
        fontFamily:
          'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <div
          style={{
            background: "linear-gradient(135deg, #1f2233, #2d3148)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 28,
            padding: 24,
            boxShadow: "0 16px 40px rgba(0,0,0,0.3)",
            marginBottom: 24,
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: 42,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            FiloCards ⚔️
          </h1>
          <p
            style={{
              marginTop: 10,
              marginBottom: 0,
              color: "#d7d9e3",
              fontSize: 17,
            }}
          >
            El duelo de las ideas. Elige dos pensadores y enfréntalos en una batalla
            filosófica de tres rondas.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: 20,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 24,
              padding: 20,
              backdropFilter: "blur(8px)",
            }}
          >
            <h2 style={{ marginTop: 0 }}>Seleccionados para el duelo</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              <div
                style={{
                  background: "rgba(255,255,255,0.07)",
                  borderRadius: 18,
                  padding: 16,
                  minHeight: 90,
                }}
              >
                <div style={{ color: "#aab1c8", fontSize: 13, marginBottom: 8 }}>
                  Pensador A
                </div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>
                  {fighterA ? fighterA.name : "Sin seleccionar"}
                </div>
                {fighterA && (
                  <div style={{ color: "#d7d9e3", marginTop: 6 }}>{fighterA.school}</div>
                )}
              </div>

              <div
                style={{
                  background: "rgba(255,255,255,0.07)",
                  borderRadius: 18,
                  padding: 16,
                  minHeight: 90,
                }}
              >
                <div style={{ color: "#aab1c8", fontSize: 13, marginBottom: 8 }}>
                  Pensador B
                </div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>
                  {fighterB ? fighterB.name : "Sin seleccionar"}
                </div>
                {fighterB && (
                  <div style={{ color: "#d7d9e3", marginTop: 6 }}>{fighterB.school}</div>
                )}
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
              <button
                onClick={startDuel}
                disabled={!fighterA || !fighterB}
                style={{
                  background: !fighterA || !fighterB ? "#666" : "#ffd166",
                  color: "#1a1a1a",
                  border: "none",
                  borderRadius: 14,
                  padding: "12px 20px",
                  fontWeight: 700,
                  cursor: !fighterA || !fighterB ? "not-allowed" : "pointer",
                  fontSize: 15,
                }}
              >
                Iniciar duelo
              </button>

              <button
                onClick={resetAll}
                style={{
                  background: "transparent",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 14,
                  padding: "12px 20px",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontSize: 15,
                }}
              >
                Reiniciar
              </button>
            </div>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 24,
              padding: 20,
              backdropFilter: "blur(8px)",
            }}
          >
            <h2 style={{ marginTop: 0 }}>Resultado</h2>

            {!result ? (
              <p style={{ color: "#d7d9e3", lineHeight: 1.6 }}>
                Selecciona dos cartas y pulsa <strong>Iniciar duelo</strong>.
              </p>
            ) : (
              <>
                <div
                  style={{
                    background: "linear-gradient(135deg, #ffd166, #f4a261)",
                    color: "#1b1b1b",
                    borderRadius: 18,
                    padding: 18,
                    marginBottom: 16,
                    boxShadow: "0 10px 24px rgba(0,0,0,0.25)",
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 700, opacity: 0.85 }}>
                    GANADOR
                  </div>
                  <div style={{ fontSize: 28, fontWeight: 800, marginTop: 4 }}>
                    {result.winner.name}
                  </div>
                  <div style={{ marginTop: 8, fontWeight: 600 }}>
                    Marcador: {fighterA?.name} {result.scoreA} - {result.scoreB}{" "}
                    {fighterB?.name}
                  </div>
                </div>

                <div
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: 18,
                    padding: 16,
                  }}
                >
                  <div style={{ fontWeight: 700, marginBottom: 10 }}>
                    Crónica del combate
                  </div>
                  {result.details.map((line, index) => (
                    <div
                      key={index}
                      style={{
                        padding: "8px 0",
                        borderBottom:
                          index !== result.details.length - 1
                            ? "1px solid rgba(255,255,255,0.08)"
                            : "none",
                        color: "#e7e9f2",
                      }}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 18,
          }}
        >
          {philosophers.map((p) => {
            const selected = p.id === selectedA || p.id === selectedB;

            return (
              <div
                key={p.id}
                onClick={() => pickPhilosopher(p)}
                style={cardStyle(selected, p.color)}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 12,
                      alignItems: "start",
                      marginBottom: 12,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 24,
                          fontWeight: 800,
                          lineHeight: 1.1,
                          marginBottom: 6,
                        }}
                      >
                        {p.name}
                      </div>
                      <div
                        style={{
                          display: "inline-block",
                          fontSize: 12,
                          fontWeight: 700,
                          background: "rgba(255,255,255,0.16)",
                          padding: "6px 10px",
                          borderRadius: 999,
                        }}
                      >
                        {p.era}
                      </div>
                    </div>

                    {selected && (
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 800,
                          background: "#ffd166",
                          color: "#1a1a1a",
                          padding: "6px 10px",
                          borderRadius: 999,
                        }}
                      >
                        SELECCIONADA
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#fff3d6",
                      marginBottom: 10,
                    }}
                  >
                    {p.school}
                  </div>

                  <div
                    style={{
                      fontSize: 14,
                      lineHeight: 1.5,
                      color: "#f2f2f2",
                      fontStyle: "italic",
                      marginBottom: 18,
                      minHeight: 42,
                    }}
                  >
                    “{p.quote}”
                  </div>

                  {statBar("ATQ", p.atk)}
                  {statBar("DEF", p.def)}
                  {statBar("SAB", p.wis)}
                </div>

                <div
                  style={{
                    marginTop: 14,
                    paddingTop: 12,
                    borderTop: "1px solid rgba(255,255,255,0.12)",
                    color: "#f8f8f8",
                    fontSize: 13,
                    opacity: 0.9,
                  }}
                >
                  Carta filosófica coleccionable
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}