import { useMemo, useState } from "react";

const initialPhilosophers = [
  {
    id: "socrates",
    name: "Sócrates",
    era: "Antigua",
    school: "Socratismo",
    rarity: "Legendaria",
    quote: "Solo sé que no sé nada.",
    bio: "Maestro ateniense que convirtió la pregunta crítica en un arte filosófico.",
    atk: 84,
    def: 78,
    wis: 95,
    strength: "Sofística",
    weakness: "Escepticismo",
    color: "#c08b5c",
    wins: 0,
  },
  {
    id: "plato",
    name: "Platón",
    era: "Antigua",
    school: "Idealismo",
    rarity: "Legendaria",
    quote: "El conocimiento verdadero reside en las ideas.",
    bio: "Discípulo de Sócrates y autor de diálogos fundamentales para Occidente.",
    atk: 88,
    def: 86,
    wis: 94,
    strength: "Materialismo",
    weakness: "Empirismo",
    color: "#a87f62",
    wins: 0,
  },
  {
    id: "aristotle",
    name: "Aristóteles",
    era: "Antigua",
    school: "Peripatetismo",
    rarity: "Legendaria",
    quote: "El hombre es un animal racional.",
    bio: "Pensador enciclopédico que sistematizó lógica, ética, política y metafísica.",
    atk: 90,
    def: 89,
    wis: 92,
    strength: "Idealismo",
    weakness: "Escepticismo",
    color: "#7f5539",
    wins: 0,
  },
  {
    id: "epicurus",
    name: "Epicuro",
    era: "Antigua",
    school: "Epicureísmo",
    rarity: "Rara",
    quote: "El placer es el principio y el fin de una vida feliz.",
    bio: "Defendió la serenidad, la amistad y la moderación como núcleo de la felicidad.",
    atk: 76,
    def: 83,
    wis: 85,
    strength: "Estoicismo",
    weakness: "Ascetismo",
    color: "#8f9779",
    wins: 0,
  },
  {
    id: "confucius",
    name: "Confucio",
    era: "Antigua",
    school: "Confucianismo",
    rarity: "Épica",
    quote: "Exígete mucho a ti mismo y espera poco de los demás.",
    bio: "Maestro de la armonía ética, el deber y el orden en las relaciones humanas.",
    atk: 80,
    def: 88,
    wis: 94,
    strength: "Caos político",
    weakness: "Individualismo radical",
    color: "#2a9d8f",
    wins: 0,
  },
  {
    id: "seneca",
    name: "Séneca",
    era: "Antigua",
    school: "Estoicismo",
    rarity: "Rara",
    quote: "No es pobre el que tiene poco, sino el que desea mucho.",
    bio: "Filósofo estoico centrado en la ética, el autocontrol y la serenidad interior.",
    atk: 78,
    def: 90,
    wis: 88,
    strength: "Epicureísmo",
    weakness: "Hedonismo",
    color: "#6c757d",
    wins: 0,
  },
  {
    id: "diogenes",
    name: "Diógenes",
    era: "Antigua",
    school: "Cinismo",
    rarity: "Común",
    quote: "Busco un hombre honesto.",
    bio: "Crítico radical de las convenciones sociales y defensor de la vida simple.",
    atk: 85,
    def: 70,
    wis: 86,
    strength: "Convencionalismo",
    weakness: "Institucionalismo",
    color: "#495057",
    wins: 0,
  },
  {
    id: "aquinas",
    name: "Tomás de Aquino",
    era: "Medieval",
    school: "Escolástica",
    rarity: "Épica",
    quote: "La fe y la razón no se contradicen.",
    bio: "Unió tradición cristiana y filosofía aristotélica en una síntesis monumental.",
    atk: 87,
    def: 91,
    wis: 90,
    strength: "Averroísmo",
    weakness: "Existencialismo",
    color: "#5d5f71",
    wins: 0,
  },
  {
    id: "hobbes",
    name: "Hobbes",
    era: "Moderna",
    school: "Contractualismo",
    rarity: "Rara",
    quote: "El hombre es un lobo para el hombre.",
    bio: "Teórico del Estado fuerte como respuesta al conflicto y la inseguridad.",
    atk: 86,
    def: 84,
    wis: 80,
    strength: "Anarquismo",
    weakness: "Humanismo",
    color: "#6d597a",
    wins: 0,
  },
  {
    id: "rousseau",
    name: "Rousseau",
    era: "Moderna",
    school: "Contractualismo",
    rarity: "Rara",
    quote: "El hombre nace libre, pero en todas partes está encadenado.",
    bio: "Crítico de la desigualdad y defensor de la voluntad general.",
    atk: 85,
    def: 79,
    wis: 88,
    strength: "Absolutismo",
    weakness: "Liberalismo",
    color: "#4d908e",
    wins: 0,
  },
  {
    id: "kant",
    name: "Kant",
    era: "Moderna",
    school: "Criticismo",
    rarity: "Legendaria",
    quote: "Obra solo según una máxima que puedas querer como ley universal.",
    bio: "Revolucionó la filosofía al estudiar las condiciones del conocimiento y la moral.",
    atk: 91,
    def: 88,
    wis: 96,
    strength: "Utilitarismo",
    weakness: "Nihilismo",
    color: "#457b9d",
    wins: 0,
  },
  {
    id: "bentham",
    name: "Bentham",
    era: "Moderna",
    school: "Utilitarismo",
    rarity: "Rara",
    quote: "La mayor felicidad para el mayor número.",
    bio: "Pensador reformista que midió la moral por sus consecuencias sociales.",
    atk: 82,
    def: 77,
    wis: 81,
    strength: "Dogmatismo",
    weakness: "Criticismo",
    color: "#577590",
    wins: 0,
  },
  {
    id: "descartes",
    name: "Descartes",
    era: "Moderna",
    school: "Racionalismo",
    rarity: "Épica",
    quote: "Pienso, luego existo.",
    bio: "Padre del racionalismo moderno, puso la razón como base del conocimiento.",
    atk: 89,
    def: 85,
    wis: 93,
    strength: "Empirismo",
    weakness: "Escepticismo",
    color: "#264653",
    wins: 0,
  },
  {
    id: "locke",
    name: "Locke",
    era: "Moderna",
    school: "Empirismo",
    rarity: "Rara",
    quote: "La mente es una tabla rasa.",
    bio: "Defensor del empirismo y del conocimiento basado en la experiencia.",
    atk: 83,
    def: 82,
    wis: 87,
    strength: "Racionalismo",
    weakness: "Idealismo",
    color: "#2a9d8f",
    wins: 0,
  },
  {
    id: "hume",
    name: "Hume",
    era: "Moderna",
    school: "Empirismo",
    rarity: "Rara",
    quote: "La razón es esclava de las pasiones.",
    bio: "Escéptico radical sobre la causalidad y el conocimiento seguro.",
    atk: 86,
    def: 78,
    wis: 91,
    strength: "Racionalismo",
    weakness: "Dogmatismo",
    color: "#577590",
    wins: 0,
  },
  {
    id: "hegel",
    name: "Hegel",
    era: "Moderna",
    school: "Idealismo",
    rarity: "Épica",
    quote: "Lo real es racional.",
    bio: "Desarrolló la dialéctica como motor de la historia y del pensamiento.",
    atk: 92,
    def: 88,
    wis: 94,
    strength: "Materialismo",
    weakness: "Empirismo",
    color: "#6d597a",
    wins: 0,
  },
  {
    id: "spinoza",
    name: "Spinoza",
    era: "Moderna",
    school: "Racionalismo",
    rarity: "Épica",
    quote: "Dios o la naturaleza.",
    bio: "Identificó a Dios con la naturaleza en una visión monista del mundo.",
    atk: 87,
    def: 90,
    wis: 92,
    strength: "Dualismo",
    weakness: "Empirismo",
    color: "#bc6c25",
    wins: 0,
  },
  {
    id: "marx",
    name: "Marx",
    era: "Contemporánea",
    school: "Materialismo",
    rarity: "Legendaria",
    quote: "De lo que se trata es de transformar el mundo.",
    bio: "Analizó la historia desde la lucha de clases y el conflicto económico.",
    atk: 93,
    def: 84,
    wis: 89,
    strength: "Idealismo",
    weakness: "Liberalismo",
    color: "#b23a48",
    wins: 0,
  },
  {
    id: "nietzsche",
    name: "Nietzsche",
    era: "Contemporánea",
    school: "Vitalismo",
    rarity: "Legendaria",
    quote: "Dios ha muerto.",
    bio: "Criticó radicalmente la moral tradicional y los valores heredados.",
    atk: 95,
    def: 74,
    wis: 90,
    strength: "Moral tradicional",
    weakness: "Escolástica",
    color: "#6a4c93",
    wins: 0,
  },
  {
    id: "sartre",
    name: "Sartre",
    era: "Contemporánea",
    school: "Existencialismo",
    rarity: "Épica",
    quote: "Estamos condenados a ser libres.",
    bio: "Puso la libertad y la responsabilidad en el centro de la existencia humana.",
    atk: 89,
    def: 76,
    wis: 87,
    strength: "Esencialismo",
    weakness: "Estructuralismo",
    color: "#9c6644",
    wins: 0,
  },
  {
    id: "camus",
    name: "Camus",
    era: "Contemporánea",
    school: "Absurdismo",
    rarity: "Rara",
    quote: "Hay que imaginar a Sísifo feliz.",
    bio: "Exploró el absurdo de la existencia y la dignidad de la rebelión.",
    atk: 83,
    def: 80,
    wis: 88,
    strength: "Nihilismo",
    weakness: "Dogmatismo",
    color: "#bc6c25",
    wins: 0,
  },
  {
    id: "debeauvoir",
    name: "Simone de Beauvoir",
    era: "Contemporánea",
    school: "Feminismo existencialista",
    rarity: "Épica",
    quote: "No se nace mujer: se llega a serlo.",
    bio: "Figura clave del feminismo contemporáneo y de la filosofía de la libertad.",
    atk: 90,
    def: 82,
    wis: 91,
    strength: "Patriarcado",
    weakness: "Esencialismo",
    color: "#e76f51",
    wins: 0,
  },
  {
    id: "arendt",
    name: "Hannah Arendt",
    era: "Contemporánea",
    school: "Teoría política",
    rarity: "Épica",
    quote: "El mal puede volverse banal.",
    bio: "Analizó el poder, el totalitarismo y la responsabilidad política moderna.",
    atk: 88,
    def: 87,
    wis: 93,
    strength: "Totalitarismo",
    weakness: "Cinismo",
    color: "#3d5a80",
    wins: 0,
  },
  {
    id: "foucault",
    name: "Foucault",
    era: "Contemporánea",
    school: "Postestructuralismo",
    rarity: "Épica",
    quote: "El poder está en todas partes.",
    bio: "Analizó las relaciones entre poder, saber y discurso.",
    atk: 91,
    def: 85,
    wis: 93,
    strength: "Humanismo",
    weakness: "Racionalismo",
    color: "#8d99ae",
    wins: 0,
  },
  {
    id: "derrida",
    name: "Derrida",
    era: "Contemporánea",
    school: "Deconstrucción",
    rarity: "Rara",
    quote: "No hay nada fuera del texto.",
    bio: "Cuestionó las estructuras del lenguaje y del significado.",
    atk: 88,
    def: 80,
    wis: 92,
    strength: "Estructuralismo",
    weakness: "Dogmatismo",
    color: "#adb5bd",
    wins: 0,
  },
  {
    id: "rawls",
    name: "Rawls",
    era: "Contemporánea",
    school: "Liberalismo",
    rarity: "Rara",
    quote: "La justicia es equidad.",
    bio: "Definió una teoría moderna de la justicia basada en la equidad.",
    atk: 85,
    def: 88,
    wis: 90,
    strength: "Utilitarismo",
    weakness: "Libertarianismo",
    color: "#4a4e69",
    wins: 0,
  },
];

const eras = ["Todas", "Antigua", "Medieval", "Moderna", "Contemporánea"];

function getRarityBonus(rarity) {
  if (rarity === "Legendaria") return 4;
  if (rarity === "Épica") return 2;
  if (rarity === "Rara") return 1;
  return 0;
}

function getAttackBonus(a, b) {
  if (!a || !b) return 0;
  if (a.strength === b.school) return 8;
  if (a.weakness === b.school) return -8;
  return 0;
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
          color: "#eef2ff",
        }}
      >
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <div
        style={{
          height: 8,
          background: "rgba(255,255,255,0.16)",
          borderRadius: 999,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${Math.min(value, 100)}%`,
            height: "100%",
            background: "linear-gradient(90deg, #ffd166, #f4a261)",
            borderRadius: 999,
          }}
        />
      </div>
    </div>
  );
}

function duel(a, b) {
  const rounds = [
    { key: "atk", label: "Argumento" },
    { key: "def", label: "Defensa" },
    { key: "wis", label: "Sabiduría" },
  ];

  let scoreA = 0;
  let scoreB = 0;
  const details = [];

  rounds.forEach((round) => {
    const attackBonusA = round.key === "atk" ? getAttackBonus(a, b) : 0;
    const attackBonusB = round.key === "atk" ? getAttackBonus(b, a) : 0;
    const rarityBonusA = getRarityBonus(a.rarity);
    const rarityBonusB = getRarityBonus(b.rarity);

    const totalA = a[round.key] + attackBonusA + rarityBonusA;
    const totalB = b[round.key] + attackBonusB + rarityBonusB;

    if (totalA > totalB) {
      scoreA += 1;
      details.push({
        label: round.label,
        winner: a.name,
        totalA,
        totalB,
        attackBonusA,
        attackBonusB,
        rarityBonusA,
        rarityBonusB,
      });
    } else if (totalB > totalA) {
      scoreB += 1;
      details.push({
        label: round.label,
        winner: b.name,
        totalA,
        totalB,
        attackBonusA,
        attackBonusB,
        rarityBonusA,
        rarityBonusB,
      });
    } else {
      scoreA += 1;
      scoreB += 1;
      details.push({
        label: round.label,
        winner: "Empate",
        totalA,
        totalB,
        attackBonusA,
        attackBonusB,
        rarityBonusA,
        rarityBonusB,
      });
    }
  });

  let winner = scoreA >= scoreB ? a : b;

  if (scoreA === scoreB) {
    const totalBaseA = a.atk + a.def + a.wis;
    const totalBaseB = b.atk + b.def + b.wis;
    winner = totalBaseA >= totalBaseB ? a : b;
  }

  const narration = [
    `En la arena del pensamiento, ${a.name} y ${b.name} se enfrentan en un duelo de ideas.`,
    ...details.map((d) => {
      if (d.label === "Argumento") {
        return `${d.label}: ${d.winner} domina la ronda (${d.totalA} vs ${d.totalB}). La afinidad doctrinal y la rareza de la carta inclinan el choque inicial.`;
      }
      return `${d.label}: ${d.winner} se impone (${d.totalA} vs ${d.totalB}) y gana terreno en la batalla filosófica.`;
    }),
    `Tras tres rondas, la victoria es para ${winner.name}. Su legado suma un nuevo triunfo.`,
  ];

  return { winner, scoreA, scoreB, details, narration };
}

function getCardStyle(selected, color) {
  return {
    background: `linear-gradient(180deg, ${color}, #1a1d28)`,
    color: "white",
    borderRadius: 22,
    padding: 18,
    cursor: "pointer",
    border: selected ? "3px solid #ffd166" : "2px solid rgba(255,255,255,0.08)",
    boxShadow: selected
      ? "0 0 0 3px rgba(255,209,102,0.22), 0 16px 30px rgba(0,0,0,0.35)"
      : "0 12px 24px rgba(0,0,0,0.24)",
    transform: selected ? "translateY(-4px) scale(1.01)" : "translateY(0)",
    transition: "all 0.2s ease",
    minHeight: 500,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };
}

function getRarityStyle(rarity) {
  if (rarity === "Legendaria") {
    return { background: "#ffd166", color: "#1b1b1b" };
  }
  if (rarity === "Épica") {
    return { background: "#c77dff", color: "#1b1b1b" };
  }
  if (rarity === "Rara") {
    return { background: "#7bdff2", color: "#1b1b1b" };
  }
  return { background: "rgba(255,255,255,0.16)", color: "white" };
}

export default function App() {
  const [philosophers, setPhilosophers] = useState(initialPhilosophers);
  const [eraFilter, setEraFilter] = useState("Todas");
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);
  const [result, setResult] = useState(null);

  const filteredPhilosophers = useMemo(() => {
    if (eraFilter === "Todas") return philosophers;
    return philosophers.filter((p) => p.era === eraFilter);
  }, [eraFilter, philosophers]);

  const ranking = useMemo(() => {
    return [...philosophers].sort((a, b) => b.wins - a.wins).slice(0, 5);
  }, [philosophers]);

  const fighterA = philosophers.find((p) => p.id === selectedA) || null;
  const fighterB = philosophers.find((p) => p.id === selectedB) || null;

  function pickPhilosopher(p) {
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
  }

  function pickRandomOpponent() {
    if (!selectedA) return;
    const available = philosophers.filter((p) => p.id !== selectedA);
    const random = available[Math.floor(Math.random() * available.length)];
    setSelectedB(random.id);
    setResult(null);
  }

  function startDuel() {
    if (!fighterA || !fighterB) return;
    const duelResult = duel(fighterA, fighterB);
    setResult(duelResult);
    setPhilosophers((prev) =>
      prev.map((p) =>
        p.id === duelResult.winner.id ? { ...p, wins: p.wins + 1 } : p
      )
    );
  }

  function resetSelection() {
    setSelectedA(null);
    setSelectedB(null);
    setResult(null);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #2b2d42 0%, #171923 38%, #0b0d12 100%)",
        color: "white",
        padding: 24,
        fontFamily:
          'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div style={{ maxWidth: 1420, margin: "0 auto" }}>
        <div
          style={{
            background: "linear-gradient(135deg, #1f2233, #2d3148)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 28,
            padding: 24,
            boxShadow: "0 18px 40px rgba(0,0,0,0.3)",
            marginBottom: 22,
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: 40,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
            }}
          >
            FiloCards ⚔️
          </h1>
          <p style={{ marginTop: 10, marginBottom: 0, color: "#d9deef", fontSize: 17 }}>
            El duelo de las ideas. Colecciona pensadores, filtra por épocas y
            enfrenta corrientes filosóficas en tres rondas.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.25fr 0.75fr",
            gap: 20,
            marginBottom: 22,
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
            <h2 style={{ marginTop: 0 }}>Preparación del duelo</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  background: "rgba(255,255,255,0.07)",
                  borderRadius: 18,
                  padding: 16,
                  minHeight: 96,
                }}
              >
                <div style={{ color: "#adb7d6", fontSize: 13, marginBottom: 8 }}>
                  Pensador A
                </div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>
                  {fighterA ? fighterA.name : "Sin seleccionar"}
                </div>
                {fighterA && (
                  <div style={{ color: "#dfe5ff", marginTop: 6 }}>
                    {fighterA.school} · {fighterA.rarity}
                  </div>
                )}
              </div>

              <div
                style={{
                  background: "rgba(255,255,255,0.07)",
                  borderRadius: 18,
                  padding: 16,
                  minHeight: 96,
                }}
              >
                <div style={{ color: "#adb7d6", fontSize: 13, marginBottom: 8 }}>
                  Pensador B
                </div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>
                  {fighterB ? fighterB.name : "Sin seleccionar"}
                </div>
                {fighterB && (
                  <div style={{ color: "#dfe5ff", marginTop: 6 }}>
                    {fighterB.school} · {fighterB.rarity}
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
              {eras.map((era) => (
                <button
                  key={era}
                  onClick={() => setEraFilter(era)}
                  style={{
                    background: eraFilter === era ? "#ffd166" : "rgba(255,255,255,0.08)",
                    color: eraFilter === era ? "#161616" : "white",
                    border: "none",
                    borderRadius: 999,
                    padding: "10px 14px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {era}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button
                onClick={startDuel}
                disabled={!fighterA || !fighterB}
                style={{
                  background: !fighterA || !fighterB ? "#666" : "#ffd166",
                  color: "#181818",
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
                onClick={pickRandomOpponent}
                disabled={!selectedA}
                style={{
                  background: !selectedA ? "#666" : "#7bdff2",
                  color: "#111",
                  border: "none",
                  borderRadius: 14,
                  padding: "12px 20px",
                  fontWeight: 700,
                  cursor: !selectedA ? "not-allowed" : "pointer",
                  fontSize: 15,
                }}
              >
                Rival aleatorio
              </button>

              <button
                onClick={resetSelection}
                style={{
                  background: "transparent",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.18)",
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
            <h2 style={{ marginTop: 0 }}>Ranking de victorias</h2>
            {ranking.map((p, index) => (
              <div
                key={p.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: 16,
                  padding: "12px 14px",
                  marginBottom: 10,
                }}
              >
                <div>
                  <div style={{ fontSize: 12, color: "#b7c1de" }}>#{index + 1}</div>
                  <div style={{ fontWeight: 700 }}>{p.name}</div>
                </div>
                <div
                  style={{
                    background: "#ffd166",
                    color: "#1a1a1a",
                    borderRadius: 999,
                    padding: "8px 12px",
                    fontWeight: 800,
                    minWidth: 44,
                    textAlign: "center",
                  }}
                >
                  {p.wins}
                </div>
              </div>
            ))}
          </div>
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
            }}
          >
            <h2 style={{ marginTop: 0 }}>
              Colección de cartas ({filteredPhilosophers.length})
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
                gap: 18,
              }}
            >
              {filteredPhilosophers.map((p) => {
                const selected = p.id === selectedA || p.id === selectedB;
                const rarityStyle = getRarityStyle(p.rarity);

                return (
                  <div
                    key={p.id}
                    onClick={() => pickPhilosopher(p)}
                    style={getCardStyle(selected, p.color)}
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: 12,
                          alignItems: "flex-start",
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
                              marginRight: 8,
                              marginBottom: 8,
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
                          color: "#fff1c6",
                          marginBottom: 8,
                        }}
                      >
                        {p.school}
                      </div>

                      <div
                        style={{
                          display: "inline-block",
                          fontSize: 12,
                          fontWeight: 800,
                          padding: "6px 10px",
                          borderRadius: 999,
                          marginBottom: 10,
                          ...rarityStyle,
                        }}
                      >
                        {p.rarity}
                      </div>

                      <div
                        style={{
                          fontSize: 14,
                          lineHeight: 1.5,
                          color: "#f5f5f5",
                          fontStyle: "italic",
                          marginBottom: 14,
                          minHeight: 42,
                        }}
                      >
                        “{p.quote}”
                      </div>

                      <div
                        style={{
                          fontSize: 13,
                          lineHeight: 1.45,
                          color: "#e8ecf8",
                          marginBottom: 14,
                          minHeight: 56,
                        }}
                      >
                        {p.bio}
                      </div>

                      {statBar("ATQ", p.atk)}
                      {statBar("DEF", p.def)}
                      {statBar("SAB", p.wis)}

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: 10,
                          marginTop: 14,
                        }}
                      >
                        <div
                          style={{
                            background: "rgba(16,185,129,0.16)",
                            borderRadius: 14,
                            padding: 10,
                          }}
                        >
                          <div style={{ fontSize: 12, fontWeight: 800, marginBottom: 4 }}>
                            Fortaleza
                          </div>
                          <div style={{ fontSize: 13 }}>{p.strength}</div>
                        </div>

                        <div
                          style={{
                            background: "rgba(239,68,68,0.16)",
                            borderRadius: 14,
                            padding: 10,
                          }}
                        >
                          <div style={{ fontSize: 12, fontWeight: 800, marginBottom: 4 }}>
                            Debilidad
                          </div>
                          <div style={{ fontSize: 13 }}>{p.weakness}</div>
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        marginTop: 14,
                        paddingTop: 12,
                        borderTop: "1px solid rgba(255,255,255,0.12)",
                        color: "#f7f7f7",
                        fontSize: 13,
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>Carta coleccionable</span>
                      <strong>🏆 {p.wins}</strong>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 24,
              padding: 20,
            }}
          >
            <h2 style={{ marginTop: 0 }}>Crónica del combate</h2>

            {!result ? (
              <div
                style={{
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 18,
                  padding: 18,
                  color: "#d7def4",
                  lineHeight: 1.6,
                }}
              >
                Selecciona dos pensadores y pulsa <strong>Iniciar duelo</strong>.
                La ronda de Argumento incorpora ventajas doctrinales y todas las
                rondas reciben bonus por rareza.
              </div>
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
                  <div style={{ fontSize: 13, fontWeight: 800, opacity: 0.85 }}>
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

                <div style={{ marginBottom: 16 }}>
                  {result.details.map((d, index) => (
                    <div
                      key={index}
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        borderRadius: 16,
                        padding: 14,
                        marginBottom: 10,
                      }}
                    >
                      <div style={{ fontWeight: 800, marginBottom: 6 }}>{d.label}</div>
                      <div style={{ color: "#e7ebff", fontSize: 14, lineHeight: 1.5 }}>
                        {fighterA?.name}: {d.totalA}
                        {"  "}
                        <span style={{ color: "#b9c5ea" }}>
                          (escuela {d.attackBonusA >= 0 ? "+" : ""}
                          {d.attackBonusA}, rareza +{d.rarityBonusA})
                        </span>
                        <br />
                        {fighterB?.name}: {d.totalB}
                        {"  "}
                        <span style={{ color: "#b9c5ea" }}>
                          (escuela {d.attackBonusB >= 0 ? "+" : ""}
                          {d.attackBonusB}, rareza +{d.rarityBonusB})
                        </span>
                        <br />
                        <strong>Vence: {d.winner}</strong>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: 18,
                    padding: 16,
                  }}
                >
                  <div style={{ fontWeight: 800, marginBottom: 10 }}>
                    Narración filosófica
                  </div>
                  {result.narration.map((line, index) => (
                    <div
                      key={index}
                      style={{
                        padding: "8px 0",
                        borderBottom:
                          index !== result.narration.length - 1
                            ? "1px solid rgba(255,255,255,0.08)"
                            : "none",
                        color: "#e9edfb",
                        lineHeight: 1.5,
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
      </div>
    </div>
  );
}