import { useState, useEffect } from "react";

const F="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;900&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=JetBrains+Mono:wght@400;600&display=swap";

// ══════════════════════════════════════════════
// 40 CARDS
// ══════════════════════════════════════════════
const ALL=[
  // ANTIGUA (8)
  {id:1,n:"Sócrates",era:"Antigua",yr:"470-399 a.C.",sch:"Mayéutica",q:"Solo sé que no sé nada",ic:"🏛️",a:6,d:9,w:10,wk:"Sofistas",st:"Dogmatismo",cl:"#C4956A",bio:"Enseñaba en las plazas con preguntas. Condenado a beber cicuta. Nunca escribió nada."},
  {id:2,n:"Platón",era:"Antigua",yr:"427-347 a.C.",sch:"Idealismo",q:"El cuerpo es la cárcel del alma",ic:"📜",a:7,d:8,w:9,wk:"Empirismo",st:"Relativismo",cl:"#6B8EB4",bio:"Fundó la Academia de Atenas. Creía en un mundo de Ideas perfectas más allá de los sentidos."},
  {id:3,n:"Aristóteles",era:"Antigua",yr:"384-322 a.C.",sch:"Ética de la virtud",q:"La virtud está en el justo medio",ic:"⚖️",a:8,d:8,w:9,wk:"Existencialismo",st:"Extremismo",cl:"#7B6345",bio:"Maestro de Alejandro Magno. Fundó el Liceo. Abarcó lógica, ética, política, biología y poesía."},
  {id:4,n:"Epicuro",era:"Antigua",yr:"341-270 a.C.",sch:"Hedonismo racional",q:"La muerte no es nada para nosotros",ic:"🌿",a:4,d:7,w:8,wk:"Estoicismo",st:"Miedo",cl:"#5B7E23",bio:"El placer verdadero no es el exceso, sino la ausencia de dolor y la serenidad del alma."},
  {id:5,n:"Confucio",era:"Antigua",yr:"551-479 a.C.",sch:"Confucianismo",q:"No hagas a otros lo que no quieras para ti",ic:"☯️",a:5,d:9,w:10,wk:"Individualismo",st:"Caos social",cl:"#BD7D3F",bio:"Sabio chino. Enseñó virtud, respeto a los mayores y armonía social durante 2500 años de influencia."},
  {id:6,n:"Séneca",era:"Antigua",yr:"4 a.C.-65 d.C.",sch:"Estoicismo",q:"No es que tengamos poco tiempo, es que perdemos mucho",ic:"🔥",a:6,d:8,w:9,wk:"Hedonismo racional",st:"Ansiedad",cl:"#8B5E3C",bio:"Estoico romano, tutor de Nerón. La virtud y el autocontrol son el camino a la felicidad."},
  {id:7,n:"Buda",era:"Antigua",yr:"563-483 a.C.",sch:"Budismo",q:"El dolor es inevitable, el sufrimiento es opcional",ic:"🪷",a:4,d:10,w:10,wk:"Materialismo",st:"Apego",cl:"#DAA520",bio:"Siddhartha Gautama. Enseñó las Cuatro Nobles Verdades y el camino medio para superar el sufrimiento."},
  {id:8,n:"Lao-Tsé",era:"Antigua",yr:"s. VI a.C.",sch:"Taoísmo",q:"El sabio actúa sin actuar",ic:"🌊",a:3,d:9,w:10,wk:"Autoritarismo",st:"Rigidez",cl:"#5F9EA0",bio:"Autor legendario del Tao Te Ching. El camino (Tao) no se impone: fluye como el agua."},

  // MEDIEVAL (6)
  {id:9,n:"Tomás de Aquino",era:"Medieval",yr:"1225-1274",sch:"Escolástica",q:"La fe y la razón no se contradicen",ic:"✝️",a:7,d:9,w:9,wk:"Ateísmo",st:"Irracionalismo",cl:"#8B6914",bio:"Unió a Aristóteles con la teología cristiana. Sus 5 vías para probar la existencia de Dios son célebres."},
  {id:10,n:"Averroes",era:"Medieval",yr:"1126-1198",sch:"Aristotelismo islámico",q:"La ignorancia lleva al miedo, el miedo al odio",ic:"🌙",a:7,d:7,w:9,wk:"Dogmatismo",st:"Superstición",cl:"#2E8B57",bio:"Filósofo andalusí de Córdoba. Recuperó a Aristóteles para Europa. Filosofía y religión buscan la misma verdad."},
  {id:11,n:"Maimónides",era:"Medieval",yr:"1138-1204",sch:"Racionalismo judío",q:"Enséñale a pescar y no tendrá hambre jamás",ic:"✡️",a:6,d:8,w:9,wk:"Misticismo",st:"Literalismo",cl:"#4169E1",bio:"Filósofo judío de Córdoba. Médico, teólogo y jurista. Armonizó fe judía con filosofía aristotélica."},
  {id:12,n:"Agustín de Hipona",era:"Medieval",yr:"354-430",sch:"Patrística",q:"Nos hiciste para ti y nuestro corazón está inquieto",ic:"📖",a:7,d:8,w:9,wk:"Pelagianismo",st:"Pecado",cl:"#8B4513",bio:"De vida disoluta a padre de la Iglesia. La gracia divina es necesaria para la salvación. Escribió las Confesiones."},
  {id:13,n:"Hildegarda de Bingen",era:"Medieval",yr:"1098-1179",sch:"Mística cristiana",q:"El alma es una sinfonía",ic:"🎵",a:5,d:8,w:9,wk:"Racionalismo",st:"Fragmentación",cl:"#9370DB",bio:"Monja, teóloga, compositora y científica. Primera mujer Doctora de la Iglesia. Visionaria y polímata."},
  {id:14,n:"Al-Farabi",era:"Medieval",yr:"872-950",sch:"Neoplatonismo islámico",q:"La ciudad virtuosa es gobernada por el filósofo",ic:"🕌",a:6,d:7,w:9,wk:"Tiranía",st:"Ignorancia",cl:"#006400",bio:"Llamado 'el Segundo Maestro' (después de Aristóteles). Propuso una ciudad ideal gobernada por la razón."},

  // MODERNA (8)
  {id:15,n:"Descartes",era:"Moderna",yr:"1596-1650",sch:"Racionalismo",q:"Pienso, luego existo",ic:"🧮",a:8,d:7,w:8,wk:"Empirismo",st:"Escepticismo",cl:"#5F6B8A",bio:"Padre de la filosofía moderna. Su método de la duda buscaba una verdad segura: el yo pensante."},
  {id:16,n:"Kant",era:"Moderna",yr:"1724-1804",sch:"Deontología",q:"Obra según el imperativo categórico",ic:"📐",a:9,d:9,w:10,wk:"Utilitarismo",st:"Relativismo moral",cl:"#4A6FA5",bio:"Revolucionó la ética. Las acciones morales se basan en el deber y en principios universalizables."},
  {id:17,n:"Hobbes",era:"Moderna",yr:"1588-1679",sch:"Contractualismo",q:"El hombre es un lobo para el hombre",ic:"🐺",a:8,d:7,w:7,wk:"Rousseau",st:"Anarquía",cl:"#36454F",bio:"Sin un poder fuerte, la vida sería brutal y corta. Defendió el Estado absoluto como garante de paz."},
  {id:18,n:"Rousseau",era:"Moderna",yr:"1712-1778",sch:"Naturalismo",q:"El hombre nace libre pero está encadenado",ic:"🌳",a:6,d:6,w:8,wk:"Hobbes",st:"Tiranía",cl:"#228B22",bio:"El ser humano es bueno por naturaleza pero la sociedad lo corrompe. Inspiró la Revolución Francesa."},
  {id:19,n:"Hume",era:"Moderna",yr:"1711-1776",sch:"Empirismo",q:"La razón es esclava de las pasiones",ic:"👁️",a:7,d:6,w:8,wk:"Racionalismo",st:"Idealismo",cl:"#708090",bio:"Despertó a Kant de su 'sueño dogmático'. Todo conocimiento viene de la experiencia sensible."},
  {id:20,n:"Bentham",era:"Moderna",yr:"1748-1832",sch:"Utilitarismo",q:"El mayor bien para el mayor número",ic:"📊",a:7,d:6,w:7,wk:"Deontología",st:"Egoísmo",cl:"#4682B4",bio:"Fundador del utilitarismo. Propuso calcular la felicidad midiendo placer y dolor de cada acción."},
  {id:21,n:"Spinoza",era:"Moderna",yr:"1632-1677",sch:"Panteísmo racionalista",q:"Dios y la Naturaleza son una misma cosa",ic:"♾️",a:6,d:8,w:10,wk:"Dualismo",st:"Superstición",cl:"#4B0082",bio:"Expulsado de la sinagoga por sus ideas. Dios no es un ser separado: es la totalidad de la naturaleza."},
  {id:22,n:"Mary Wollstonecraft",era:"Moderna",yr:"1759-1797",sch:"Protofeminismo",q:"No deseo que las mujeres tengan poder sobre los hombres, sino sobre sí mismas",ic:"🗝️",a:7,d:6,w:8,wk:"Tradicionalismo",st:"Desigualdad",cl:"#B22222",bio:"Pionera del feminismo. Vindicación de los derechos de la mujer (1792): educación igualitaria como base de la libertad."},

  // CONTEMPORÁNEA (18)
  {id:23,n:"Marx",era:"Contemporánea",yr:"1818-1883",sch:"Materialismo histórico",q:"Filósofos han interpretado el mundo; hay que transformarlo",ic:"🔨",a:9,d:5,w:8,wk:"Liberalismo",st:"Explotación",cl:"#CC0000",bio:"Analizó la lucha de clases y la explotación del trabajador. Su obra cambió la historia del siglo XX."},
  {id:24,n:"Nietzsche",era:"Contemporánea",yr:"1844-1900",sch:"Vitalismo",q:"Dios ha muerto",ic:"⚡",a:10,d:4,w:8,wk:"Ética del cuidado",st:"Conformismo",cl:"#8B0000",bio:"Crítico radical de la moral. Propuso al 'superhombre' que crea valores propios sin muletas."},
  {id:25,n:"Sartre",era:"Contemporánea",yr:"1905-1980",sch:"Existencialismo",q:"El hombre está condenado a ser libre",ic:"🚪",a:7,d:5,w:9,wk:"Estructuralismo",st:"Mala fe",cl:"#2F4F4F",bio:"No hay naturaleza humana fija. Cada persona se define por lo que elige. Libertad total = responsabilidad total."},
  {id:26,n:"S. de Beauvoir",era:"Contemporánea",yr:"1908-1986",sch:"Feminismo existencialista",q:"No se nace mujer: se llega a serlo",ic:"✊",a:8,d:7,w:9,wk:"Determinismo",st:"Sexismo",cl:"#C71585",bio:"Los roles de género son construcciones sociales. El segundo sexo es un pilar del pensamiento feminista."},
  {id:27,n:"H. Arendt",era:"Contemporánea",yr:"1906-1975",sch:"Filosofía política",q:"La banalidad del mal",ic:"🕊️",a:7,d:8,w:10,wk:"Autoritarismo",st:"Totalitarismo",cl:"#556B2F",bio:"El mal extremo puede venir de gente normal que obedece sin pensar. Concepto acuñado tras el juicio de Eichmann."},
  {id:28,n:"Camus",era:"Contemporánea",yr:"1913-1960",sch:"Absurdismo",q:"Hay que imaginar a Sísifo feliz",ic:"🪨",a:6,d:6,w:9,wk:"Nihilismo",st:"Desesperación",cl:"#D2691E",bio:"Nobel de Literatura. La vida no tiene sentido trascendente, pero la rebeldía y la solidaridad nos dignifican."},
  {id:29,n:"Rawls",era:"Contemporánea",yr:"1921-2002",sch:"Justicia como equidad",q:"Tras el velo de ignorancia elegiríamos justicia",ic:"⚖️",a:7,d:8,w:8,wk:"Libertarismo",st:"Desigualdad",cl:"#4A7C59",bio:"Si no supieras tu lugar en la sociedad, ¿qué reglas elegirías? Así fundamentó su teoría de la justicia."},
  {id:30,n:"Levinas",era:"Contemporánea",yr:"1906-1995",sch:"Ética de la alteridad",q:"El rostro del otro me interpela",ic:"👤",a:5,d:8,w:10,wk:"Individualismo",st:"Indiferencia",cl:"#6A5ACD",bio:"La ética nace del encuentro cara a cara con el otro. Antes que pensar, somos responsables del prójimo."},
  {id:31,n:"Nussbaum",era:"Contemporánea",yr:"1947-",sch:"Enfoque de capacidades",q:"La dignidad exige poder desarrollar capacidades",ic:"🌍",a:7,d:7,w:9,wk:"Relativismo cultural",st:"Pobreza",cl:"#B8860B",bio:"La justicia se mide por las capacidades reales que las personas pueden ejercer. Filósofa clave del siglo XXI."},
  {id:32,n:"Foucault",era:"Contemporánea",yr:"1926-1984",sch:"Postestructuralismo",q:"Donde hay poder, hay resistencia",ic:"🔍",a:8,d:5,w:9,wk:"Positivismo",st:"Normalización",cl:"#800080",bio:"Estudió cómo las instituciones (cárceles, hospitales, escuelas) ejercen poder y control sobre los individuos."},
  {id:33,n:"Judith Butler",era:"Contemporánea",yr:"1956-",sch:"Teoría queer",q:"El género es performativo",ic:"🎭",a:7,d:5,w:8,wk:"Esencialismo",st:"Binarismo",cl:"#FF69B4",bio:"El género no es algo que somos, sino algo que hacemos. Su teoría de la performatividad revolucionó los estudios de género."},
  {id:34,n:"Peter Singer",era:"Contemporánea",yr:"1946-",sch:"Utilitarismo preferencial",q:"Si está en tu mano evitar el sufrimiento, hazlo",ic:"🐾",a:7,d:5,w:8,wk:"Deontología",st:"Especismo",cl:"#2E8B57",bio:"Filósofo australiano. Defiende los derechos de los animales y la obligación moral de ayudar a los más pobres."},
  {id:35,n:"Byung-Chul Han",era:"Contemporánea",yr:"1959-",sch:"Crítica cultural",q:"Hoy nos explotamos a nosotros mismos",ic:"📱",a:7,d:6,w:8,wk:"Tecno-optimismo",st:"Autoexplotación",cl:"#483D8B",bio:"Filósofo surcoreano. Analiza la sociedad del cansancio, la hipertransparencia y la autoexplotación digital."},
  {id:36,n:"Adela Cortina",era:"Contemporánea",yr:"1947-",sch:"Ética cívica",q:"La aporofobia es el rechazo al pobre, no al extranjero",ic:"🤝",a:6,d:7,w:9,wk:"Populismo",st:"Aporofobia",cl:"#CD853F",bio:"Filósofa valenciana. Acuñó 'aporofobia'. Defiende una ética de mínimos compartida por toda la ciudadanía."},
  {id:37,n:"Zygmunt Bauman",era:"Contemporánea",yr:"1925-2017",sch:"Modernidad líquida",q:"En la modernidad líquida no hay vínculos sólidos",ic:"💧",a:6,d:6,w:9,wk:"Tradicionalismo",st:"Consumismo",cl:"#4169E1",bio:"Sociólogo polaco. Describió una sociedad donde todo es temporal: relaciones, trabajo, identidad. Todo fluye y se disuelve."},
  {id:38,n:"Donna Haraway",era:"Contemporánea",yr:"1944-",sch:"Tecnofeminismo",q:"Prefiero ser cyborg que diosa",ic:"🤖",a:7,d:5,w:8,wk:"Naturalismo",st:"Dualismo",cl:"#20B2AA",bio:"Pensadora estadounidense. Su Manifiesto Cyborg cuestiona las fronteras entre humano, animal y máquina."},
  {id:39,n:"Slavoj Žižek",era:"Contemporánea",yr:"1949-",sch:"Psicoanálisis político",q:"La ideología no es ilusión: es la realidad misma",ic:"🌶️",a:8,d:4,w:8,wk:"Liberalismo",st:"Cinismo",cl:"#DC143C",bio:"Filósofo esloveno provocador. Mezcla a Marx, Lacan y la cultura pop para analizar la ideología contemporánea."},
  {id:40,n:"Marina Garcés",era:"Contemporánea",yr:"1973-",sch:"Filosofía inacabada",q:"Pensar no es un lujo, es una necesidad vital",ic:"💡",a:6,d:7,w:8,wk:"Tecnocracia",st:"Pasividad",cl:"#DB7093",bio:"Filósofa catalana. Defiende que la filosofía debe salir de la academia y ser una práctica colectiva y transformadora."},
];

const ERAS=["Antigua","Medieval","Moderna","Contemporánea"];
const EIC={"Antigua":"🏛️","Medieval":"⛪","Moderna":"🔭","Contemporánea":"🌐"};
const ECL={"Antigua":"#C4956A","Medieval":"#8B6914","Moderna":"#4A6FA5","Contemporánea":"#556B2F"};

function mu(x,y){if(x.st&&y.sch&&y.sch.toLowerCase().includes(x.st.toLowerCase()))return"s";if(x.wk&&y.sch&&y.sch.toLowerCase().includes(x.wk.toLowerCase()))return"w";if(x.st===y.n)return"s";if(x.wk===y.n)return"w";return"n"}
const ld=(k,d)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch{return d}};
const sv=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}};
const sh=a=>{const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b};

const css=`@import url('${F}');
:root{--bg:#13100C;--c1:#1E1A14;--c2:#2A241C;--gd:#D4A574;--gb:#F0C080;--pm:#F5E6C8;--mt:#7B6B5B;--bd:#3D3225;--fd:'Cinzel',serif;--fb:'Crimson Text',serif;--fm:'JetBrains Mono',monospace}
*{margin:0;padding:0;box-sizing:border-box}body,html,#root{background:var(--bg);color:var(--pm);font-family:var(--fb);min-height:100vh}
.app{min-height:100vh;background:var(--bg);background-image:url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4A574' fill-opacity='.02'%3E%3Cpath d='M20 0L0 20h8l12-12 12 12h8z'/%3E%3C/g%3E%3C/svg%3E")}
.hd{text-align:center;padding:20px 16px 4px}.hd h1{font-family:var(--fd);font-size:clamp(1.5rem,5vw,2.4rem);font-weight:900;color:var(--gb);letter-spacing:3px;text-shadow:0 2px 12px rgba(212,165,116,.3)}.hd p{font-style:italic;color:var(--mt);font-size:.8rem;margin-top:2px}
.nv{display:flex;justify-content:center;gap:4px;padding:8px 10px;flex-wrap:wrap}.nb{padding:6px 12px;border-radius:7px;border:1px solid var(--bd);background:var(--c1);color:var(--mt);font-family:var(--fd);font-size:.6rem;font-weight:700;cursor:pointer;transition:all .2s;letter-spacing:1px;text-transform:uppercase}.nb:hover{border-color:var(--gd);color:var(--gd)}.nb.a{border-color:var(--gd);color:var(--gb);background:rgba(212,165,116,.08)}
.ct{padding:0 8px 60px;max-width:960px;margin:0 auto}.sc{font-family:var(--fd);font-size:.9rem;font-weight:700;color:var(--gb);text-align:center;letter-spacing:2px;margin:8px 0;text-transform:uppercase}
.gr{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:8px}
.fc{border-radius:9px;padding:2px;cursor:pointer;transition:all .3s}.fc:hover{transform:translateY(-3px) scale(1.02)}.fi{background:var(--c1);border-radius:8px;padding:10px 8px 8px;min-height:175px;display:flex;flex-direction:column;position:relative;overflow:hidden}
.fe{font-family:var(--fm);font-size:.45rem;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;padding:1px 6px;border-radius:3px;display:inline-block;margin-bottom:5px;align-self:flex-start}
.fic{font-size:1.8rem;text-align:center;margin:2px 0 4px}.fn{font-family:var(--fd);font-size:.75rem;font-weight:700;text-align:center;line-height:1.15;margin-bottom:1px}.fsc{font-size:.52rem;text-align:center;color:var(--mt);font-style:italic;margin-bottom:5px}
.fs{display:flex;justify-content:space-around;margin-top:auto;padding-top:5px;border-top:1px solid var(--bd)}.st{text-align:center}.stv{font-family:var(--fm);font-size:.8rem;font-weight:600}.stl{font-size:.4rem;text-transform:uppercase;letter-spacing:1px;color:var(--mt)}
.wb{position:absolute;top:5px;right:5px;background:rgba(212,165,116,.12);border:1px solid var(--gd);border-radius:4px;padding:1px 4px;font-size:.45rem;font-family:var(--fm);color:var(--gd)}
.mo{position:fixed;inset:0;background:rgba(0,0,0,.78);z-index:100;display:flex;align-items:center;justify-content:center;padding:10px;backdrop-filter:blur(4px)}.md{background:var(--c1);border:1px solid var(--bd);border-radius:12px;max-width:440px;width:100%;max-height:90vh;overflow-y:auto}.mx{position:absolute;top:8px;right:10px;background:none;border:none;color:var(--mt);font-size:1.2rem;cursor:pointer;z-index:2}.mx:hover{color:var(--pm)}
.mh{padding:16px 18px 10px;text-align:center;position:relative}.mi{font-size:2.5rem;margin-bottom:4px}.mn{font-family:var(--fd);font-size:1.2rem;font-weight:900;color:var(--gb)}.my{font-family:var(--fm);font-size:.65rem;color:var(--mt);margin-top:2px}
.mbo{padding:0 18px 18px}.mq{font-style:italic;color:var(--gd);text-align:center;padding:8px 12px;margin:4px 0 10px;border-left:2px solid var(--gd);border-right:2px solid var(--gd);font-size:.85rem}.mbi{font-size:.8rem;line-height:1.5;margin-bottom:10px;opacity:.9}
.mss{display:grid;grid-template-columns:1fr 1fr 1fr;gap:5px;margin:8px 0}.msi{text-align:center;padding:7px;border-radius:6px;background:rgba(212,165,116,.04);border:1px solid var(--bd)}.msi .sv{font-family:var(--fm);font-size:1.1rem;font-weight:600}.msi .sl{font-size:.5rem;text-transform:uppercase;letter-spacing:1px;color:var(--mt)}
.bar{width:100%;height:4px;background:rgba(255,255,255,.06);border-radius:2px;overflow:hidden;margin-top:2px}.brf{height:100%;border-radius:2px;transition:width .4s}
.mmu{display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-top:6px}.mup{padding:6px 8px;border-radius:6px;font-size:.65rem}.mup.s{background:rgba(34,139,34,.07);border:1px solid rgba(34,139,34,.18);color:#6BBF6B}.mup.w{background:rgba(139,0,0,.07);border:1px solid rgba(139,0,0,.18);color:#CD5C5C}
.btn{display:inline-flex;align-items:center;gap:6px;padding:9px 18px;border-radius:8px;border:1px solid var(--gd);background:rgba(212,165,116,.08);color:var(--gb);font-family:var(--fd);font-weight:700;font-size:.75rem;cursor:pointer;transition:all .2s;letter-spacing:1px}.btn:hover{background:rgba(212,165,116,.15);transform:translateY(-1px)}.btn:disabled{opacity:.3;pointer-events:none}.btn-s{padding:5px 10px;font-size:.65rem}
.pin{width:100%;max-width:220px;padding:9px 12px;border-radius:7px;border:1px solid var(--bd);background:var(--c2);color:var(--pm);font-family:var(--fb);font-size:.9rem;text-align:center}.pin:focus{outline:none;border-color:var(--gd)}.pin::placeholder{color:var(--mt)}
.ep{padding:10px;border-radius:9px;border:2px solid var(--bd);background:var(--c1);cursor:pointer;text-align:center;transition:all .2s}.ep:hover{border-color:var(--gd);transform:translateY(-2px)}.ep.sel{border-color:var(--gd);background:rgba(212,165,116,.07)}.ep .epi{font-size:1.5rem}.ep .epn{font-family:var(--fd);font-size:.7rem;font-weight:700;margin-top:3px;letter-spacing:1px}.ep .epc{font-family:var(--fm);font-size:.5rem;color:var(--mt);margin-top:1px}
.dp{padding:7px 3px;border-radius:6px;border:1px solid var(--bd);background:var(--c2);cursor:pointer;text-align:center;transition:all .2s;font-size:.6rem}.dp:hover{border-color:var(--gd);transform:scale(1.05)}.dp.tk{opacity:.2;pointer-events:none}.dp .dpi{font-size:1.1rem}.dp .dpn{font-family:var(--fd);font-size:.5rem;margin-top:1px;font-weight:700;line-height:1.1}
.hc{padding:7px 5px;border-radius:6px;border:2px solid var(--bd);background:var(--c2);text-align:center;cursor:pointer;transition:all .2s;min-width:55px}.hc:hover{border-color:var(--gd);transform:translateY(-3px)}.hc .hci{font-size:1.1rem}.hc .hcn{font-family:var(--fd);font-size:.45rem;font-weight:700;margin-top:1px;line-height:1.1}.hc .hcs{font-family:var(--fm);font-size:.45rem;color:var(--mt)}
.bfc{background:var(--c1);border:2px solid var(--bd);border-radius:10px;padding:12px;text-align:center;min-height:140px;display:flex;flex-direction:column;align-items:center;justify-content:center;transition:all .4s}.bfc.win{border-color:#6BBF6B;box-shadow:0 0 15px rgba(34,139,34,.12)}.bfc.lose{border-color:#8B0000;opacity:.45}
.vs{font-family:var(--fd);font-size:1.4rem;font-weight:900;color:var(--gd);text-shadow:0 0 12px rgba(212,165,116,.25)}
.blg{background:var(--c1);border:1px solid var(--bd);border-radius:8px;padding:10px 12px;margin:8px auto;max-width:500px}.ll{font-size:.72rem;line-height:1.5;margin-bottom:2px}.ll b{color:var(--gb)}
.sco{display:flex;justify-content:center;gap:20px;margin:8px 0}.scb{text-align:center}.scb .sn{font-family:var(--fd);font-size:.75rem;font-weight:700;letter-spacing:1px}.scb .ss{font-family:var(--fm);font-size:1.8rem;font-weight:600;color:var(--gb)}
.tb{text-align:center;padding:8px;border-radius:7px;margin:6px auto;max-width:380px;font-family:var(--fd);font-size:.8rem;letter-spacing:1px}
.trn{display:flex;flex-direction:column;gap:6px;margin:10px 0}.trm{display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:8px;background:var(--c1);border:1px solid var(--bd)}.trm.act{border-color:var(--gd);background:rgba(212,165,116,.06)}.trm.done{opacity:.5}.trp{font-family:var(--fd);font-size:.7rem;min-width:50px;letter-spacing:1px;color:var(--mt)}.trn1{flex:1;font-family:var(--fd);font-size:.75rem;font-weight:700;letter-spacing:1px}.trv{font-family:var(--fd);font-size:.6rem;color:var(--gd)}.trn2{flex:1;font-family:var(--fd);font-size:.75rem;font-weight:700;letter-spacing:1px;text-align:right}.trs{font-family:var(--fm);font-size:.7rem;color:var(--gb);min-width:50px;text-align:center}
@keyframes fu{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}.fu{animation:fu .35s ease forwards}
@keyframes gl{0%,100%{box-shadow:0 0 6px rgba(212,165,116,.12)}50%{box-shadow:0 0 16px rgba(212,165,116,.25)}}.gla{animation:gl 1.5s ease infinite}`;

export default function FiloCards(){
  const [vw,setVw]=useState("menu");
  const [sel,setSel]=useState(null);
  const [flt,setFlt]=useState("all");
  const [col,setCol]=useState(()=>ld("fc-col2",{}));

  // Game
  const [names,setNames]=useState(["",""]);
  const [era,setEra]=useState(null);
  const [pool,setPool]=useState([]);
  const [hands,setHands]=useState([[],[]]);
  const [dt,setDt]=useState(0);
  const [picks,setPicks]=useState([null,null]);
  const [rnd,setRnd]=useState(0);
  const [scr,setScr]=useState([0,0]);
  const [log,setLog]=useState([]);
  const [rr,setRr]=useState(null);
  const [over,setOver]=useState(false);
  const [tp,setTp]=useState(0);
  const [tr,setTr]=useState(3);

  // Tournament
  const [tMode,setTMode]=useState(false);
  const [tPlayers,setTPlayers]=useState([]);
  const [tName,setTName]=useState("");
  const [tBracket,setTBracket]=useState([]);
  const [tRound,setTRound]=useState(0);
  const [tMatch,setTMatch]=useState(0);
  const [tStarted,setTStarted]=useState(false);
  const [tEra,setTEra]=useState(null);

  useEffect(()=>{sv("fc-col2",col)},[col]);

  const filtered=flt==="all"?ALL:ALL.filter(c=>c.era===flt);

  // ── SETUP ──
  const goSetup=(tournament)=>{setNames(["",""]);setEra(null);setTMode(tournament);if(tournament){setTPlayers([]);setTName("");setTBracket([]);setTRound(0);setTMatch(0);setTStarted(false);setTEra(null)}setVw("setup")};

  const startDraft=(n1,n2,e)=>{
    const cards=ALL.filter(c=>c.era===e);
    setPool(cards.map(c=>({...c,tk:false})));
    setHands([[],[]]);setDt(0);setRnd(0);setScr([0,0]);setLog([]);setRr(null);setOver(false);setPicks([null,null]);setTp(0);
    const r=Math.min(3,Math.floor(cards.length/2));setTr(r);
    setNames([n1,n2]);setEra(e);setVw("draft");
  };

  const draftPick=c=>{
    const nh=[...hands];nh[dt]=[...nh[dt],c];setHands(nh);
    setPool(p=>p.map(x=>x.id===c.id?{...x,tk:true}:x));
    setDt(dt===0?1:0);
  };

  const canBattle=hands[0].length>=tr&&hands[1].length>=tr;
  const startBattle=()=>{setRnd(0);setScr([0,0]);setLog([]);setRr(null);setOver(false);setPicks([null,null]);setTp(0);setVw("battle")};

  const playCard=(c,p)=>{
    if(p===0&&tp===0){setPicks([c,picks[1]]);setTp(1)}
    else if(p===1&&tp===1){setPicks([picks[0],c]);setTp(2)}
  };

  useEffect(()=>{if(tp===2&&picks[0]&&picks[1]){const t=setTimeout(()=>resolve(),500);return()=>clearTimeout(t)}},[tp]);

  const resolve=()=>{
    const[x,y]=picks;const lines=[];let s1=0,s2=0;
    const m1=mu(x,y),m2=mu(y,x);
    let a1=x.a+(m1==="s"?2:m1==="w"?-2:0)+Math.floor(Math.random()*3);
    let a2=y.a+(m2==="s"?2:m2==="w"?-2:0)+Math.floor(Math.random()*3);
    if(a1>a2){s1++;lines.push(`⚔️ <b>${x.n}</b> argumenta con más fuerza (${a1} vs ${a2})`)}
    else if(a2>a1){s2++;lines.push(`⚔️ <b>${y.n}</b> contraataca mejor (${a2} vs ${a1})`)}
    else{s1++;s2++;lines.push(`⚔️ Empate en argumentación (${a1})`)}
    if(m1==="s")lines.push(`💪 <b>${x.n}</b> es fuerte vs ${y.sch}`);
    if(m2==="s")lines.push(`💪 <b>${y.n}</b> es fuerte vs ${x.sch}`);
    if(m1==="w")lines.push(`😰 <b>${x.n}</b> es débil frente a ${y.sch}`);
    if(m2==="w")lines.push(`😰 <b>${y.n}</b> es débil frente a ${x.sch}`);
    let d1=x.d+Math.floor(Math.random()*3),d2=y.d+Math.floor(Math.random()*3);
    if(d1>d2){s1++;lines.push(`🛡️ <b>${x.n}</b> resiste mejor (${d1} vs ${d2})`)}else if(d2>d1){s2++;lines.push(`🛡️ <b>${y.n}</b> aguanta más (${d2} vs ${d1})`)}else{s1++;s2++;lines.push(`🛡️ Empate en defensa (${d1})`)}
    let w1=x.w+Math.floor(Math.random()*3),w2=y.w+Math.floor(Math.random()*3);
    if(w1>w2){s1++;lines.push(`🧠 <b>${x.n}</b> muestra más sabiduría (${w1} vs ${w2})`)}else if(w2>w1){s2++;lines.push(`🧠 <b>${y.n}</b> ilumina más (${w2} vs ${w1})`)}else{s1++;s2++;lines.push(`🧠 Empate en sabiduría (${w1})`)}
    let winner=null;
    if(s1>s2){winner=0;lines.push(`🏆 <b>${x.n}</b> gana ${s1}-${s2}`)}
    else if(s2>s1){winner=1;lines.push(`🏆 <b>${y.n}</b> gana ${s2}-${s1}`)}
    else lines.push(`🤝 Empate ${s1}-${s2}`);
    const ns=[...scr];if(winner===0)ns[0]++;if(winner===1)ns[1]++;setScr(ns);
    setLog(l=>[...l,...lines,""]);setRr({winner,s1,s2,c1:x,c2:y});
    if(winner===0)setCol(c=>({...c,[x.id]:(c[x.id]||0)+1}));
    if(winner===1)setCol(c=>({...c,[y.id]:(c[y.id]||0)+1}));
    const nr=rnd+1;setRnd(nr);if(nr>=tr)setOver(true);
  };

  const nextRound=()=>{
    setRr(null);const nh=[[...hands[0].filter(c=>c.id!==picks[0].id)],[...hands[1].filter(c=>c.id!==picks[1].id)]];setHands(nh);setPicks([null,null]);setTp(0);
  };

  // ── TOURNAMENT ──
  const addPlayer=()=>{if(tName.trim()&&tPlayers.length<16&&!tPlayers.includes(tName.trim())){setTPlayers([...tPlayers,tName.trim()]);setTName("")}};
  const startTournament=()=>{
    if(tPlayers.length<2||!tEra)return;
    let players=sh([...tPlayers]);
    // Pad to power of 2
    while(players.length&(players.length-1)){players.push("BYE")}
    const bracket=[];
    for(let i=0;i<players.length;i+=2)bracket.push({p1:players[i],p2:players[i+1],winner:null,s1:0,s2:0});
    setTBracket(bracket);setTRound(1);setTMatch(0);setTStarted(true);
    // Start first non-BYE match
    const first=bracket.findIndex(m=>m.p1!=="BYE"&&m.p2!=="BYE");
    if(first===-1){/* all BYEs */}
    else{
      // Handle BYEs first
      const nb=bracket.map(m=>{if(m.p1==="BYE")return{...m,winner:m.p2};if(m.p2==="BYE")return{...m,winner:m.p1};return m});
      setTBracket(nb);setTMatch(nb.findIndex(m=>!m.winner));
      if(nb.findIndex(m=>!m.winner)===-1){advanceTournamentRound(nb)}
    }
  };

  const advanceTournamentRound=(bracket)=>{
    const winners=bracket.map(m=>m.winner).filter(Boolean);
    if(winners.length<=1){/* tournament over */return}
    const nb=[];
    for(let i=0;i<winners.length;i+=2){
      if(i+1<winners.length)nb.push({p1:winners[i],p2:winners[i+1],winner:null,s1:0,s2:0});
      else nb.push({p1:winners[i],p2:"BYE",winner:winners[i],s1:0,s2:0});
    }
    setTBracket(nb);setTRound(r=>r+1);setTMatch(nb.findIndex(m=>!m.winner));
  };

  const startTournamentMatch=()=>{
    const m=tBracket[tMatch];
    if(!m||m.winner)return;
    startDraft(m.p1,m.p2,tEra);
  };

  const finishTournamentMatch=(winner)=>{
    const nb=[...tBracket];nb[tMatch]={...nb[tMatch],winner,s1:scr[0],s2:scr[1]};setTBracket(nb);
    const nextUnplayed=nb.findIndex(m=>!m.winner);
    if(nextUnplayed===-1){
      const winners=nb.map(m=>m.winner);
      if(winners.length<=1){setVw("tournament")}
      else{advanceTournamentRound(nb)}
    }else{setTMatch(nextUnplayed)}
    setVw("tournament");
  };

  const tWinner=tBracket.length===1&&tBracket[0].winner?tBracket[0].winner:null;

  const Bar=({v,mx=10,cl})=><div className="bar"><div className="brf" style={{width:`${(v/mx)*100}%`,background:cl}}/></div>;

  return(<><style>{css}</style><div className="app">
  <div className="hd"><h1>FiloCards</h1><p>El duelo de las ideas · {tMode?"Torneo":"Multijugador"}</p></div>

  <div className="nv">
    <button className={`nb ${vw==="menu"?"a":""}`} onClick={()=>setVw("menu")}>🏠</button>
    <button className={`nb ${vw==="collection"?"a":""}`} onClick={()=>setVw("collection")}>📚 Colección</button>
    <button className={`nb ${vw==="setup"&&!tMode?"a":""}`} onClick={()=>goSetup(false)}>⚔️ Duelo</button>
    <button className={`nb ${(vw==="setup"&&tMode)||vw==="tournament"?"a":""}`} onClick={()=>goSetup(true)}>🏆 Torneo</button>
  </div>

  <div className="ct">

  {/* MENU */}
  {vw==="menu"&&<div className="fu" style={{textAlign:"center",padding:"24px 0"}}>
    <div style={{fontSize:"3.5rem",marginBottom:8}}>🎴</div>
    <h2 style={{fontFamily:"var(--fd)",fontSize:"1.2rem",color:"var(--gb)",letterSpacing:2,marginBottom:6}}>Bienvenidos al duelo</h2>
    <p style={{color:"var(--mt)",maxWidth:400,margin:"0 auto 20px",lineHeight:1.5,fontSize:".85rem"}}>40 pensadores, 4 épocas. Drafta tu mazo, desafía a tu rival y colecciona victorias.</p>
    <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
      <button className="btn" onClick={()=>goSetup(false)}>⚔️ Duelo 1vs1</button>
      <button className="btn" onClick={()=>goSetup(true)}>🏆 Torneo de clase</button>
    </div>
    <div style={{marginTop:20,display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6,maxWidth:360,margin:"20px auto 0"}}>
      {ERAS.map(e=>{const cnt=ALL.filter(c=>c.era===e).length;return<div key={e} style={{textAlign:"center",padding:"8px 4px",borderRadius:7,background:"var(--c1)",border:"1px solid var(--bd)"}}>
        <div style={{fontSize:"1.2rem"}}>{EIC[e]}</div>
        <div style={{fontFamily:"var(--fd)",fontSize:".5rem",fontWeight:700,marginTop:3,letterSpacing:1,color:ECL[e]}}>{e}</div>
        <div style={{fontFamily:"var(--fm)",fontSize:".5rem",color:"var(--mt)",marginTop:1}}>{cnt} cartas</div>
      </div>})}
    </div>
    <div style={{marginTop:16,fontSize:".75rem",color:"var(--mt)"}}>📚 {ALL.length} cartas · 🏆 {Object.values(col).reduce((a,b)=>a+b,0)} victorias totales</div>
  </div>}

  {/* COLLECTION */}
  {vw==="collection"&&<>
    <div style={{display:"flex",gap:4,margin:"6px 0 10px",flexWrap:"wrap",justifyContent:"center"}}>
      <button className={`nb ${flt==="all"?"a":""}`} onClick={()=>setFlt("all")} style={{fontSize:".55rem"}}>Todas ({ALL.length})</button>
      {ERAS.map(e=><button key={e} className={`nb ${flt===e?"a":""}`} onClick={()=>setFlt(e)} style={{fontSize:".55rem"}}>{EIC[e]} {e}</button>)}
    </div>
    <div className="gr">{filtered.map(c=><div key={c.id} className="fc fu" style={{background:`linear-gradient(135deg,${c.cl}30,${c.cl}10)`}} onClick={()=>setSel(c)}>
      <div className="fi" style={{borderTop:`3px solid ${c.cl}`}}>
        <span className="fe" style={{background:`${c.cl}20`,color:c.cl}}>{c.era}</span>
        <div className="fic">{c.ic}</div><div className="fn">{c.n}</div><div className="fsc">{c.sch}</div>
        <div className="fs">
          <div className="st"><div className="stv" style={{color:"#CD5C5C"}}>{c.a}</div><div className="stl">ATQ</div></div>
          <div className="st"><div className="stv" style={{color:"#6BBF6B"}}>{c.d}</div><div className="stl">DEF</div></div>
          <div className="st"><div className="stv" style={{color:"#6B9FD4"}}>{c.w}</div><div className="stl">SAB</div></div>
        </div>
        {col[c.id]&&<div className="wb">🏆{col[c.id]}</div>}
      </div>
    </div>)}</div>
  </>}

  {/* SETUP */}
  {vw==="setup"&&<div className="fu">
    <div className="sc">{tMode?"Configurar torneo":"Configurar duelo"}</div>
    <div style={{background:"var(--c1)",border:"1px solid var(--bd)",borderRadius:10,padding:16,textAlign:"center"}}>

      {!tMode?<>
        <p style={{fontSize:".75rem",color:"var(--mt)",marginBottom:8}}>Nombres:</p>
        <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap",marginBottom:14}}>
          <input className="pin" placeholder="Jugador 1" value={names[0]} onChange={e=>setNames([e.target.value,names[1]])} maxLength={15}/>
          <input className="pin" placeholder="Jugador 2" value={names[1]} onChange={e=>setNames([names[0],e.target.value])} maxLength={15}/>
        </div>
      </>:<>
        <p style={{fontSize:".75rem",color:"var(--mt)",marginBottom:8}}>Añade jugadores (2-16):</p>
        <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:8}}>
          <input className="pin" placeholder="Nombre del alumno" value={tName} onChange={e=>setTName(e.target.value)} maxLength={15} onKeyDown={e=>e.key==="Enter"&&addPlayer()}/>
          <button className="btn btn-s" onClick={addPlayer}>+ Añadir</button>
        </div>
        {tPlayers.length>0&&<div style={{display:"flex",gap:4,flexWrap:"wrap",justifyContent:"center",marginBottom:12}}>
          {tPlayers.map((p,i)=><span key={i} style={{padding:"3px 8px",borderRadius:5,background:"rgba(212,165,116,.08)",border:"1px solid var(--bd)",fontSize:".7rem",fontFamily:"var(--fd)",letterSpacing:1,display:"flex",alignItems:"center",gap:4}}>
            {p}<span style={{cursor:"pointer",color:"var(--mt)",fontSize:".8rem"}} onClick={()=>setTPlayers(tPlayers.filter((_,j)=>j!==i))}>✕</span>
          </span>)}
        </div>}
        <p style={{fontSize:".6rem",color:"var(--mt)",marginBottom:8}}>{tPlayers.length} jugadores inscritos</p>
      </>}

      <p style={{fontSize:".75rem",color:"var(--mt)",marginBottom:6}}>Elige época:</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:7,maxWidth:360,margin:"0 auto"}}>
        {ERAS.map(e=>{const cnt=ALL.filter(c=>c.era===e).length;return<div key={e} className={`ep ${(tMode?tEra:era)===e?"sel":""}`} onClick={()=>tMode?setTEra(e):setEra(e)}>
          <div className="epi">{EIC[e]}</div><div className="epn" style={{color:ECL[e]}}>{e}</div><div className="epc">{cnt} pensadores</div>
        </div>})}
      </div>

      {!tMode&&names[0].trim()&&names[1].trim()&&era&&<div style={{marginTop:12}}><button className="btn" onClick={()=>startDraft(names[0],names[1],era)}>Ir al draft 🎴</button></div>}
      {tMode&&tPlayers.length>=2&&tEra&&<div style={{marginTop:12}}><button className="btn" onClick={startTournament}>🏆 Iniciar torneo</button></div>}
    </div>
  </div>}

  {/* TOURNAMENT BRACKET */}
  {vw==="tournament"&&<div className="fu">
    <div className="sc">🏆 Torneo · Ronda {tRound}</div>
    {tWinner?<div style={{textAlign:"center",padding:"20px 0"}}>
      <div style={{fontSize:"3rem",marginBottom:8}}>🏆</div>
      <h2 style={{fontFamily:"var(--fd)",fontSize:"1.4rem",color:"var(--gb)",letterSpacing:2}}>{tWinner} es el campeón/a</h2>
      <p style={{color:"var(--mt)",fontSize:".8rem",marginTop:6}}>¡Ha demostrado ser la mejor voz filosófica de la clase!</p>
      <div style={{display:"flex",gap:8,justifyContent:"center",marginTop:16}}>
        <button className="btn" onClick={()=>goSetup(true)}>Nuevo torneo 🏆</button>
        <button className="btn" onClick={()=>setVw("menu")} style={{opacity:.7}}>🏠 Inicio</button>
      </div>
    </div>:<>
      <div className="trn">
        {tBracket.map((m,i)=><div key={i} className={`trm ${i===tMatch&&!m.winner?"act":""} ${m.winner?"done":""}`}>
          <div className="trp">#{i+1}</div>
          <div className="trn1" style={{color:m.winner===m.p1?"#6BBF6B":"var(--pm)"}}>{m.p1}</div>
          <div className="trs">{m.winner?`${m.s1}-${m.s2}`:"vs"}</div>
          <div className="trn2" style={{color:m.winner===m.p2?"#6BBF6B":"var(--pm)"}}>{m.p2}</div>
          {m.winner&&<div className="trv">🏆 {m.winner}</div>}
        </div>)}
      </div>
      {tMatch<tBracket.length&&!tBracket[tMatch]?.winner&&<div style={{textAlign:"center",marginTop:12}}>
        <p style={{fontSize:".8rem",color:"var(--gd)",marginBottom:8,fontFamily:"var(--fd)",letterSpacing:1}}>
          Siguiente: <b>{tBracket[tMatch].p1}</b> vs <b>{tBracket[tMatch].p2}</b>
        </p>
        <button className="btn gla" onClick={startTournamentMatch}>⚔️ Jugar este duelo</button>
      </div>}
    </>}
  </div>}

  {/* DRAFT */}
  {vw==="draft"&&<div className="fu">
    <div className="sc">Draft · {era}</div>
    <div className="tb" style={{background:dt===0?"rgba(212,165,116,.06)":"rgba(86,107,47,.06)",border:`1px solid ${dt===0?"var(--gd)":"var(--gn)"}`}}>
      Turno de <b>{names[dt]}</b>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,margin:"8px 0"}}>
      {[0,1].map(p=><div key={p} style={{background:"var(--c1)",border:"1px solid var(--bd)",borderRadius:7,padding:8}}>
        <div style={{fontFamily:"var(--fd)",fontSize:".65rem",textAlign:"center",marginBottom:5,letterSpacing:1,color:p===0?"var(--gd)":"var(--gn)"}}>{names[p]} ({hands[p].length}/{tr})</div>
        <div style={{display:"flex",gap:4,flexWrap:"wrap",justifyContent:"center",minHeight:36}}>
          {hands[p].map(c=><div key={c.id} style={{textAlign:"center",fontSize:".5rem"}}><div style={{fontSize:"1rem"}}>{c.ic}</div><div style={{fontFamily:"var(--fd)",fontWeight:700}}>{c.n}</div></div>)}
        </div>
      </div>)}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(65px,1fr))",gap:5,marginTop:8}}>
      {pool.map(c=><div key={c.id} className={`dp ${c.tk?"tk":""}`} onClick={()=>!c.tk&&draftPick(c)}>
        <div className="dpi">{c.ic}</div><div className="dpn">{c.n}</div>
        <div style={{fontFamily:"var(--fm)",fontSize:".45rem",color:"var(--mt)",marginTop:1}}>{c.a}/{c.d}/{c.w}</div>
      </div>)}
    </div>
    {canBattle&&<div style={{textAlign:"center",marginTop:14}}><button className="btn gla" onClick={startBattle}>⚔️ ¡Comenzar!</button></div>}
  </div>}

  {/* BATTLE */}
  {vw==="battle"&&<div className="fu">
    <div className="sco">
      <div className="scb"><div className="sn" style={{color:"var(--gd)"}}>{names[0]}</div><div className="ss">{scr[0]}</div></div>
      <div style={{fontFamily:"var(--fd)",fontSize:".6rem",color:"var(--mt)",alignSelf:"center",letterSpacing:1}}>R{Math.min(rnd+1,tr)}/{tr}</div>
      <div className="scb"><div className="sn" style={{color:"var(--gn)"}}>{names[1]}</div><div className="ss">{scr[1]}</div></div>
    </div>

    {!over&&!rr&&<>
      <div className="tb gla" style={{background:tp===0?"rgba(212,165,116,.06)":"rgba(86,107,47,.06)",border:`1px solid ${tp===0?"var(--gd)":"var(--gn)"}`}}>
        {tp===0?`${names[0]}, elige tu carta`:tp===1?<>{names[1]}, elige tu carta<br/><span style={{fontSize:".6rem",color:"var(--mt)"}}>({names[0]} ya eligió)</span></>:"Revelando..."}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:6,alignItems:"center",margin:"10px 0"}}>
        <div className="bfc" style={{borderColor:picks[0]?"var(--gd)":"var(--bd)"}}>
          {picks[0]?<>{tp>=1?<div style={{fontSize:"2rem"}}>❓</div>:<div style={{fontSize:"2rem"}}>{picks[0].ic}</div>}<div style={{fontFamily:"var(--fd)",fontSize:".85rem",fontWeight:700,marginTop:3}}>{tp>=1?"Elegido":picks[0].n}</div></>
          :<div style={{color:"var(--mt)",fontFamily:"var(--fd)",fontSize:".7rem"}}>Esperando</div>}
        </div>
        <div className="vs">VS</div>
        <div className="bfc" style={{borderColor:picks[1]?"var(--gn)":"var(--bd)"}}>
          {picks[1]?<><div style={{fontSize:"2rem"}}>{picks[1].ic}</div><div style={{fontFamily:"var(--fd)",fontSize:".85rem",fontWeight:700,marginTop:3}}>{picks[1].n}</div></>
          :<div style={{color:"var(--mt)",fontFamily:"var(--fd)",fontSize:".7rem"}}>Esperando</div>}
        </div>
      </div>
      {tp<2&&<div style={{marginTop:6}}>
        <p style={{textAlign:"center",fontSize:".65rem",color:tp===0?"var(--gd)":"var(--gn)",marginBottom:5,fontFamily:"var(--fd)",letterSpacing:1}}>Mano de {names[tp]}:</p>
        <div style={{display:"flex",gap:5,flexWrap:"wrap",justifyContent:"center"}}>
          {hands[tp].map(c=><div key={c.id} className="hc" onClick={()=>playCard(c,tp)}>
            <div className="hci">{c.ic}</div><div className="hcn">{c.n}</div><div className="hcs">{c.a}/{c.d}/{c.w}</div>
          </div>)}
        </div>
      </div>}
    </>}

    {rr&&<div className="fu">
      <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:6,alignItems:"center",margin:"8px 0"}}>
        <div className={`bfc ${rr.winner===0?"win":rr.winner===1?"lose":""}`}>
          {rr.winner===0&&<div style={{fontSize:".6rem",color:"#6BBF6B",fontFamily:"var(--fd)",letterSpacing:1,marginBottom:3}}>🏆 GANA</div>}
          <div style={{fontSize:"2rem"}}>{rr.c1.ic}</div>
          <div style={{fontFamily:"var(--fd)",fontSize:".85rem",fontWeight:700,marginTop:3}}>{rr.c1.n}</div>
          <div style={{fontFamily:"var(--fm)",fontSize:"1.1rem",color:"var(--gb)",marginTop:3}}>{rr.s1}</div>
        </div>
        <div className="vs">VS</div>
        <div className={`bfc ${rr.winner===1?"win":rr.winner===0?"lose":""}`}>
          {rr.winner===1&&<div style={{fontSize:".6rem",color:"#6BBF6B",fontFamily:"var(--fd)",letterSpacing:1,marginBottom:3}}>🏆 GANA</div>}
          <div style={{fontSize:"2rem"}}>{rr.c2.ic}</div>
          <div style={{fontFamily:"var(--fd)",fontSize:".85rem",fontWeight:700,marginTop:3}}>{rr.c2.n}</div>
          <div style={{fontFamily:"var(--fm)",fontSize:"1.1rem",color:"var(--gb)",marginTop:3}}>{rr.s2}</div>
        </div>
      </div>
      <div className="blg">{log.slice(-7).map((l,i)=>l?<div key={i} className="ll" dangerouslySetInnerHTML={{__html:l}}/>:<div key={i} style={{height:3}}/>)}</div>
      <div style={{textAlign:"center",marginTop:10}}>
        {!over?<button className="btn" onClick={nextRound}>Siguiente ronda →</button>
        :<div className="fu">
          <div className="tb" style={{background:"rgba(212,165,116,.08)",border:"2px solid var(--gd)",fontSize:".95rem",padding:14}}>
            {scr[0]>scr[1]?`🏆 ¡${names[0]} gana ${scr[0]}-${scr[1]}!`:scr[1]>scr[0]?`🏆 ¡${names[1]} gana ${scr[1]}-${scr[0]}!`:`🤝 ¡Empate ${scr[0]}-${scr[1]}!`}
          </div>
          <div style={{display:"flex",gap:6,justifyContent:"center",marginTop:10,flexWrap:"wrap"}}>
            {tMode?<button className="btn" onClick={()=>finishTournamentMatch(scr[0]>=scr[1]?names[0]:names[1])}>Volver al torneo 🏆</button>
            :<><button className="btn" onClick={()=>goSetup(false)}>Nuevo duelo ⚔️</button><button className="btn" onClick={()=>setVw("menu")} style={{opacity:.7}}>🏠</button></>}
          </div>
        </div>}
      </div>
    </div>}
  </div>}

  </div>

  {/* MODAL */}
  {sel&&<div className="mo" onClick={()=>setSel(null)}>
    <div className="md fu" onClick={e=>e.stopPropagation()}>
      <button className="mx" onClick={()=>setSel(null)}>✕</button>
      <div className="mh" style={{borderBottom:`3px solid ${sel.cl}`}}>
        <div className="mi">{sel.ic}</div><div className="mn">{sel.n}</div>
        <div className="my">{sel.yr} · {sel.era}</div>
        <span className="fe" style={{background:`${sel.cl}20`,color:sel.cl,marginTop:5}}>{sel.sch}</span>
      </div>
      <div className="mbo">
        <div className="mq">"{sel.q}"</div>
        <div className="mbi">{sel.bio}</div>
        <div className="mss">
          <div className="msi"><div className="sv" style={{color:"#CD5C5C"}}>{sel.a}</div><Bar v={sel.a} cl="#CD5C5C"/><div className="sl">Argumento</div></div>
          <div className="msi"><div className="sv" style={{color:"#6BBF6B"}}>{sel.d}</div><Bar v={sel.d} cl="#6BBF6B"/><div className="sl">Defensa</div></div>
          <div className="msi"><div className="sv" style={{color:"#6B9FD4"}}>{sel.w}</div><Bar v={sel.w} cl="#6B9FD4"/><div className="sl">Sabiduría</div></div>
        </div>
        <div className="mmu">
          <div className="mup s">💪 Fuerte vs: <b>{sel.st}</b></div>
          <div className="mup w">😰 Débil vs: <b>{sel.wk}</b></div>
        </div>
        {col[sel.id]&&<div style={{textAlign:"center",marginTop:8,padding:5,borderRadius:6,background:"rgba(212,165,116,.05)",border:"1px solid var(--bd)"}}>
          <span style={{fontFamily:"var(--fm)",fontSize:".7rem",color:"var(--gd)"}}>🏆 {col[sel.id]} victoria{col[sel.id]>1?"s":""}</span>
        </div>}
      </div>
    </div>
  </div>}

  </div></>);
}
