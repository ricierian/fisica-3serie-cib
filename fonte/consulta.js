/* ===== Consulta rápida: formulário, prefixos, grandezas e unidades, constantes e conversões =====
   Formulário: "Essenciais" = fórmulas destacadas no material "Fórmulas de Física" entregue aos alunos
   (o terceiro item, a, não é mais exibido). "Para ir além" = demais fórmulas do material e complementares. */
const FORMULARIO = [
  { nome: 'Cinemática',
    ess: [
      ['Velocidade e aceleração médias', `v<sub>m</sub> = ${f('Δs','Δt')} &nbsp;;&nbsp; a<sub>m</sub> = ${f('Δv','Δt')}`, true],
      ['Movimento uniforme', `s = s₀ + v · t`, true],
      ['Movimento uniformemente variado', `v = v₀ + a · t<br>s = s₀ + v₀ · t + ${f('a · t²','2')}<br>v² = v₀² + 2 · a · Δs`, true],
      ['Movimento circular', `ω = ${f('Δφ','Δt')} = 2π · f &nbsp;;&nbsp; v = ω · R = 2π · R · f<br><small>f = 1/T</small>`, true],
      ['Transmissão por correia ou corrente', `v<sub>A</sub> = v<sub>B</sub> → f<sub>A</sub> · R<sub>A</sub> = f<sub>B</sub> · R<sub>B</sub><br>engrenagens: f₁ · N₁ = f₂ · N₂ <small>(N = nº de dentes)</small>`, true]],
    ext: [
      ['Lançamento vertical e oblíquo', `h<sub>máx</sub> = ${f('v<sub>0y</sub>²','2g')} &nbsp;;&nbsp; t<sub>subida</sub> = ${f('v<sub>0y</sub>','g')}<br>alcance: A = ${f('v₀² · sen(2θ)','g')}`],
      ['Queda livre', `v = g · t &nbsp;;&nbsp; h = ${f('g · t²','2')}`],
      ['Movimento circular variado', `φ = φ₀ + ω₀ · t + ${f('α · t²','2')}<br>ω² = ω₀² + 2 · α · Δφ`],
      ['Transmissão por eixo', `ω<sub>A</sub> = ω<sub>B</sub> → ${f('v<sub>A</sub>','R<sub>A</sub>')} = ${f('v<sub>B</sub>','R<sub>B</sub>')}`]] },

  { nome: 'Dinâmica e energia',
    ess: [
      ['2ª lei de Newton e peso', `F<sub>R</sub> = m · a &nbsp;;&nbsp; P = m · g`, true],
      ['Lei de Hooke', `F = k · x`],
      ['Atrito', `F<sub>at</sub> = μ · N`, true],
      ['Resultante centrípeta', `F<sub>cp</sub> = m · a<sub>cp</sub> &nbsp;;&nbsp; a<sub>cp</sub> = ${f('v²','R')}`],
      ['Trabalho', `τ = F · d · cos θ &nbsp;;&nbsp; τ = ΔE`],
      ['Potência e rendimento', `P = ${f('τ','Δt')} = ${f('ΔE','Δt')} &nbsp;;&nbsp; η = ${f('P<sub>útil</sub>','P<sub>total</sub>')}`, true],
      ['Energias', `E<sub>c</sub> = ${f('m · v²','2')} &nbsp;;&nbsp; E<sub>p</sub> = m · g · h<br>E<sub>el</sub> = ${f('k · x²','2')} &nbsp;;&nbsp; E<sub>M</sub> = E<sub>c</sub> + E<sub>p</sub><br><small>sem atrito, a energia mecânica se conserva</small>`, true],
      ['Quantidade de movimento e impulso', `Q = m · v &nbsp;;&nbsp; I = F · Δt = ΔQ<br><small>sistema isolado: Q se conserva</small>`],
      ['Momento de uma força (torque)', `M = F · d<br><small>equilíbrio: soma dos momentos nula</small>`, true]],
    ext: [
      ['Atrito estático', `F<sub>at,e</sub> ≤ μ<sub>e</sub> · N`],
      ['Potência e velocidade', `P = F · v`],
      ['Plano inclinado', `P<sub>x</sub> = P · sen θ &nbsp;;&nbsp; P<sub>y</sub> = P · cos θ`],
      ['Coeficiente de restituição', `e = ${f('|v<sub>afastamento</sub>|','|v<sub>aproximação</sub>|')}<br><small>e = 1: elástica; e = 0: perfeitamente inelástica</small>`],
      ['Centro de massa', `x<sub>CM</sub> = ${f('m₁x₁ + m₂x₂ + … + m<sub>n</sub>x<sub>n</sub>','m₁ + m₂ + … + m<sub>n</sub>')}`]] },

  { nome: 'Gravitação',
    ess: [
      ['Lei da gravitação universal', `F = G · ${f('M · m','d²')}`],
      ['3ª lei de Kepler', `T² = k · r³ <small>(${f('T²','r³')} é constante)</small>`]],
    ext: [
      ['Velocidade de um satélite', `v = √${f('G · M','r')}`],
      ['Gravidade na superfície', `g = ${f('G · M','R²')}`]] },

  { nome: 'Fluidos',
    ess: [
      ['Pressão e densidade', `p = ${f('F','A')} &nbsp;;&nbsp; d = ${f('m','V')}`, true],
      ['Princípio de Pascal (prensa hidráulica)', `${f('F₁','A₁')} = ${f('F₂','A₂')}`, true],
      ['Lei de Stevin', `p = p₀ + d · g · h`, true],
      ['Empuxo', `E = d<sub>líq</sub> · V<sub>imerso</sub> · g`, true]],
    ext: [
      ['Vasos comunicantes', `d<sub>A</sub> · h<sub>A</sub> = d<sub>B</sub> · h<sub>B</sub>`],
      ['Peso aparente', `P<sub>ap</sub> = P − E`],
      ['Corpo flutuando', `d<sub>corpo</sub> · V<sub>corpo</sub> = d<sub>líq</sub> · V<sub>imerso</sub>`],
      ['Vazão e continuidade', `Z = ${f('V','Δt')} = A · v &nbsp;;&nbsp; A₁ · v₁ = A₂ · v₂`]] },

  { nome: 'Termologia',
    ess: [
      ['Escalas termométricas', `${f('θ<sub>C</sub>','5')} = ${f('θ<sub>F</sub> − 32','9')} = ${f('T − 273','5')}`, true],
      ['Dilatação', `ΔL = L₀ · α · ΔT<br><small>β ≅ 2α &nbsp;;&nbsp; γ ≅ 3α</small>`, true],
      ['Calor sensível', `Q = m · c · ΔT &nbsp;;&nbsp; c = ${f('C','m')}`, true],
      ['Calor latente', `Q = m · L`, true],
      ['Potência térmica e condução', `P = ${f('Q','Δt')} = ${f('k · A · ΔT','e')}`, true],
      ['Gases ideais', `${f('p₀V₀','T₀')} = ${f('p · V','T')} &nbsp;;&nbsp; p · V = n · R · T<br><small>T sempre em kelvin</small>`, true],
      ['1ª lei da termodinâmica', `Q = τ + ΔU`],
      ['Máquinas térmicas', `Q₁ = τ + Q₂ &nbsp;;&nbsp; η = ${f('τ','Q₁')} = 1 − ${f('Q₂','Q₁')}`, true],
      ['Máquina de Carnot', `${f('Q₂','Q₁')} = ${f('T₂','T₁')} → η = 1 − ${f('T<sub>fria</sub>','T<sub>quente</sub>')}`, true]],
    ext: [
      ['Capacidade térmica', `C = ${f('Q','ΔT')}`],
      ['Equilíbrio térmico', `Q₁ + Q₂ + … = 0<br><small>calor recebido positivo; cedido negativo</small>`],
      ['Dilatação superficial e volumétrica', `ΔA = A₀ · β · ΔT &nbsp;;&nbsp; ΔV = V₀ · γ · ΔT`],
      ['Dilatação de líquidos', `ΔV<sub>real</sub> = ΔV<sub>aparente</sub> + ΔV<sub>recipiente</sub>`],
      ['Escala qualquer (x) e escala y', `${f('T<sub>x</sub> − F<sub>x</sub>','E<sub>x</sub> − F<sub>x</sub>')} = ${f('T<sub>y</sub> − F<sub>y</sub>','E<sub>y</sub> − F<sub>y</sub>')}`],
      ['Transformações gasosas', `isobárica: τ = p · ΔV<br>isotérmica: ΔU = 0 → τ = Q<br>isométrica: τ = 0 → ΔU = Q<br>adiabática: Q = 0 → ΔU = −τ<br>cíclica: ΔU = 0 → τ = Q = Q₁ − Q₂`]] },

  { nome: 'Óptica',
    ess: [
      ['Equação de Gauss (lentes e espelhos)', `${f('1','f')} = ${f('1','p')} + ${f('1','p′')}<br><small>f &gt; 0: convergente ou côncavo; f &lt; 0: divergente ou convexo; p′ &lt; 0: imagem virtual</small>`, true],
      ['Aumento da imagem', `A = ${f('i','o')} = −${f('p′','p')}`, true],
      ['Índice de refração', `n = ${f('c','v')}`, true],
      ['Lei de Snell', `n₁ · sen θ₁ = n₂ · sen θ₂<br>${f('sen θ₁','sen θ₂')} = ${f('n₂','n₁')} = ${f('v₁','v₂')} = ${f('λ₁','λ₂')}`, true],
      ['Vergência, o “grau”', `V = ${f('1','f')} <small>(V em dioptrias, f em metros)</small>`, true],
      ['Defeitos da visão', `Miopia (não vê bem de longe) → lente divergente<br>Hipermetropia e presbiopia (não vê bem de perto) → lente convergente<br>Astigmatismo → lente cilíndrica`, true]],
    ext: [
      ['Associação de espelhos planos', `N = ${f('360°','α')} − 1`],
      ['Espelhos esféricos', `f = ${f('R','2')}`],
      ['Reflexão total (ângulo limite)', `sen L = ${f('n<sub>menor</sub>','n<sub>maior</sub>')}`],
      ['Lâmina de faces paralelas', `d = e · ${f('sen(i − r)','cos r')}`],
      ['Desvio num prisma', `δ = i + i′ − A`],
      ['Câmara escura', `${f('i','o')} = ${f('p′','p')}`],
      ['Lentes justapostas', `V = V₁ + V₂`]] },

  { nome: 'Ondulatória',
    ess: [
      ['Equação fundamental', `v = λ · f = ${f('λ','T')}<br><small>luz: c = λ · f</small>`, true],
      ['Corda vibrante', `f<sub>n</sub> = ${f('n · v','2L')} <small>(harmônico n)</small>`, true]],
    ext: [
      ['Velocidade numa corda', `v = √${f('F','μ')} <small>(μ: massa por comprimento)</small>`],
      ['Tubos sonoros', `aberto: f<sub>n</sub> = ${f('n · v','2L')} &nbsp;;&nbsp; fechado: f<sub>n</sub> = ${f('n · v','4L')} <small>(n ímpar)</small>`],
      ['Intensidade e nível sonoro', `I = ${f('P','A')} &nbsp;;&nbsp; β = 10 · log ${f('I','I₀')} <small>(dB)</small>`],
      ['Efeito Doppler', `f′ = f · ${f('v ± v<sub>o</sub>','v ∓ v<sub>f</sub>')}<br><small>sinais de cima: observador e fonte se aproximando</small>`],
      ['Experiência de Young', `λ = ${f('d · y','D')} <small>(y: distância entre franjas)</small>`],
      ['MHS', `x = A · cos(ω · t + θ₀)<br>massa-mola: T = 2π√${f('m','k')} &nbsp;;&nbsp; pêndulo: T = 2π√${f('L','g')}`]] },

  { nome: 'Eletrostática',
    ess: [
      ['Carga elétrica', `Q = n · e <small>(e = 1,6 × 10⁻¹⁹ C)</small>`],
      ['Lei de Coulomb', `F = k · ${f('|Q₁| · |Q₂|','d²')}`, true],
      ['Esferas condutoras em contato', `iguais: Q′ = ${f('Q<sub>A</sub> + Q<sub>B</sub>','2')}<br>raios diferentes: ${f('Q′<sub>A</sub>','R<sub>A</sub>')} = ${f('Q′<sub>B</sub>','R<sub>B</sub>')}`, true]],
    ext: [
      ['Campo elétrico', `E = ${f('F','|q|')} &nbsp;;&nbsp; E = k · ${f('|Q|','d²')}`],
      ['Potencial e energia potencial', `V = k · ${f('Q','d')} &nbsp;;&nbsp; E<sub>p</sub> = k · ${f('Q · q','d')}`],
      ['Trabalho e campo uniforme', `τ = q · U &nbsp;;&nbsp; U = E · d`],
      ['Capacitores', `C = ${f('Q','U')} &nbsp;;&nbsp; E<sub>armazenada</sub> = ${f('Q · U','2')}<br>placas paralelas: C = ε · ${f('A','d')}`]] },

  { nome: 'Eletrodinâmica',
    ess: [
      ['Corrente elétrica', `i = ${f('ΔQ','Δt')}`],
      ['Leis de Ohm', `U = R · i &nbsp;;&nbsp; R = ρ · ${f('L','A')}`, true],
      ['Potência elétrica', `P = U · i = R · i² = ${f('U²','R')}`, true],
      ['Energia elétrica', `E = P · Δt <small>(kWh: P em kW, Δt em h)</small>`, true],
      ['Associação de resistores', `série: R<sub>eq</sub> = R₁ + R₂ + …<br>paralelo: ${f('1','R<sub>eq</sub>')} = ${f('1','R₁')} + ${f('1','R₂')} + …`, true],
      ['Gerador', `U = ε − r · i &nbsp;;&nbsp; ε<sub>eq</sub> = ε₁ + ε₂ <small>(em série)</small><br>P<sub>útil</sub> = U · i &nbsp;;&nbsp; P<sub>total</sub> = ε · i &nbsp;;&nbsp; P<sub>dissipada</sub> = r · i²`, true]],
    ext: [
      ['Efeito Joule', `Q = R · i² · Δt`],
      ['Rendimento do gerador', `η = ${f('U','ε')}`],
      ['Receptor', `U = ε′ + r′ · i &nbsp;;&nbsp; η′ = ${f('ε′','U')}`],
      ['Circuito gerador–receptor', `i = ${f('ε − ε′','r + r′ + R')}`],
      ['Custo da energia', `custo = E × tarifa <small>(E em kWh; tarifa em R$/kWh)</small>`]] },

  { nome: 'Magnetismo',
    ess: [
      ['Força magnética', `sobre carga: F = |q| · v · B · sen θ<br>sobre fio: F = B · i · L · sen θ`],
      ['Fluxo magnético', `Φ = B · A · cos θ <small>(θ entre B e a normal)</small>`, true],
      ['Lei de Faraday', `ε = −N · ${f('ΔΦ','Δt')}`, true],
      ['Transformador ideal', `${f('U₁','U₂')} = ${f('N₁','N₂')} = ${f('i₂','i₁')}<br><small>U₁ · i₁ = U₂ · i₂</small>`, true]],
    ext: [
      ['Campo de um fio longo', `B = ${f('μ · i','2π · d')}`],
      ['Campo no centro de espira e bobina', `espira: B = ${f('μ · i','2R')} &nbsp;;&nbsp; bobina: B = N · ${f('μ · i','2R')}`],
      ['Campo num solenoide', `B = μ · ${f('N','L')} · i`],
      ['Força entre fios paralelos', `F = ${f('μ · i₁ · i₂ · L','2π · d')}`],
      ['fem de movimento', `ε = B · L · v`],
      ['Lei de Lenz', `<small>a corrente induzida se opõe à variação do fluxo que a produziu</small>`]] },

  { nome: 'Física moderna',
    ess: [
      ['Energia de um fóton', `E = h · f <small>(h = 6,6 × 10⁻³⁴ J·s)</small>`, true]],
    ext: [
      ['Efeito fotoelétrico', `E<sub>c,máx</sub> = h · f − W <small>(W: função trabalho)</small>`],
      ['Massa e energia', `E = m · c²`],
      ['Meia-vida', `m = ${f('m₀','2ⁿ')} <small>(n: número de meias-vidas)</small>`]] }
];

/* ----- Resumo de símbolos e unidades no fim de cada assunto do formulário: símbolo | significado | unidade no SI ----- */
const RESUMO_TXT = {
  'Cinemática': `s, s₀ | posição e posição inicial | m
Δs | deslocamento | m
t, Δt | tempo e intervalo de tempo | s
v, v₀ | velocidade e velocidade inicial | m/s
v<sub>m</sub> | velocidade média | m/s
v<sub>0y</sub> | componente vertical da velocidade inicial | m/s
Δv | variação da velocidade | m/s
a, a<sub>m</sub> | aceleração e aceleração média | m/s²
g | aceleração da gravidade | m/s²
h, h<sub>máx</sub> | altura e altura máxima | m
A | alcance horizontal | m
θ | ângulo de lançamento com a horizontal | ° (grau)
R | raio da trajetória ou da polia | m
φ, φ₀ | posição angular e posição angular inicial | rad
Δφ | deslocamento angular | rad
ω, ω₀ | velocidade angular e velocidade angular inicial | rad/s
α | aceleração angular | rad/s²
f | frequência | Hz (também rpm)
T | período | s
N | número de dentes da engrenagem | sem unidade`,
  'Dinâmica e energia': `m | massa | kg
a | aceleração | m/s²
g | aceleração da gravidade | m/s²
F, F<sub>R</sub> | força e força resultante | N
P | peso | N
P<sub>x</sub>, P<sub>y</sub> | componentes do peso paralela e perpendicular ao plano | N
N | força normal | N
F<sub>at</sub>, F<sub>at,e</sub> | força de atrito e força de atrito estático | N
μ, μ<sub>e</sub> | coeficientes de atrito | sem unidade
k | constante elástica da mola | N/m
x | deformação da mola | m
F<sub>cp</sub> | resultante centrípeta | N
a<sub>cp</sub> | aceleração centrípeta | m/s²
v | velocidade | m/s
R | raio da curva | m
τ | trabalho | J
d | deslocamento (no trabalho) ou braço da força (no momento) | m
θ | ângulo entre a força e o deslocamento, ou inclinação do plano | ° (grau)
E<sub>c</sub> | energia cinética | J
E<sub>p</sub> | energia potencial gravitacional | J
E<sub>el</sub> | energia potencial elástica | J
E<sub>M</sub> | energia mecânica | J
ΔE | energia transformada | J
h | altura | m
P | potência | W
Δt | intervalo de tempo | s
η | rendimento | sem unidade (ou %)
Q | quantidade de movimento | kg·m/s
I | impulso | N·s
e | coeficiente de restituição | sem unidade
M | momento de uma força (torque) | N·m
x<sub>CM</sub> | posição do centro de massa | m`,
  'Gravitação': `F | força gravitacional | N
G | constante da gravitação universal (6,67 × 10⁻¹¹) | N·m²/kg²
M, m | massas (M: astro central ou planeta) | kg
d | distância entre os centros | m
T | período da órbita | s
r | raio da órbita | m
k | constante da 3ª lei de Kepler | s²/m³
v | velocidade orbital | m/s
g | aceleração da gravidade na superfície | m/s²
R | raio do planeta | m`,
  'Fluidos': `p, p₀ | pressão e pressão na superfície do líquido | Pa (N/m²)
F | força (F₁ e F₂: nos êmbolos da prensa) | N
A | área (A₁ e A₂: dos êmbolos; na vazão, da seção do tubo) | m²
d | densidade (d<sub>líq</sub>: do líquido; d<sub>corpo</sub>: do corpo) | kg/m³
m | massa | kg
V | volume (V<sub>imerso</sub>: parte do corpo dentro do líquido) | m³
g | aceleração da gravidade | m/s²
h | profundidade ou altura da coluna de líquido | m
E | empuxo | N
P, P<sub>ap</sub> | peso e peso aparente | N
Z | vazão | m³/s
Δt | intervalo de tempo | s
v | velocidade do fluido | m/s`,
  'Termologia': `θ<sub>C</sub>, θ<sub>F</sub> | temperaturas em Celsius e em Fahrenheit | °C, °F
T | temperatura absoluta | K
T₁, T₂ | temperaturas das fontes quente e fria | K
ΔT | variação de temperatura | K (vale o mesmo em °C)
ΔL, L₀ | variação do comprimento e comprimento inicial | m
ΔA, A₀ | variação da área e área inicial | m²
ΔV, V₀ | variação do volume e volume inicial | m³
α, β, γ | coeficientes de dilatação linear, superficial e volumétrica | °C⁻¹ (ou K⁻¹)
Q | quantidade de calor | J (também cal)
m | massa | kg (também g)
c | calor específico | J/(kg·K) (também cal/(g·°C))
C | capacidade térmica | J/K
L | calor latente | J/kg (também cal/g)
P | potência térmica (fluxo de calor) | W
Δt | intervalo de tempo | s
k | condutividade térmica | W/(m·K)
A | área | m²
e | espessura | m
p | pressão | Pa
V | volume | m³
n | quantidade de matéria | mol
R | constante dos gases (8,31) | J/(mol·K)
τ | trabalho do gás | J
ΔU | variação da energia interna | J
Q₁, Q₂ | calor recebido da fonte quente e calor cedido à fonte fria | J
η | rendimento | sem unidade (ou %)
T<sub>x</sub>, F<sub>x</sub>, E<sub>x</sub> | temperatura, ponto de fusão e ponto de ebulição numa escala x | unidade da escala`,
  'Óptica': `f | distância focal | m
p, p′ | distâncias do objeto e da imagem (na câmara escura, p′ é a profundidade) | m
i, o | tamanhos da imagem e do objeto | m
A | aumento linear | sem unidade
V | vergência (o “grau”) | di (1/m)
R | raio de curvatura do espelho | m
n, n₁, n₂ | índices de refração | sem unidade
c | velocidade da luz no vácuo (3,0 × 10⁸) | m/s
v | velocidade da luz no meio | m/s
λ | comprimento de onda | m
θ₁, θ₂ | ângulos com a normal | ° (grau)
L | ângulo limite | ° (grau)
N | número de imagens | sem unidade
α | ângulo entre os espelhos | ° (grau)
d, e | desvio lateral e espessura da lâmina | m
i, r | ângulos de incidência e de refração (lâmina e prisma) | ° (grau)
i′ | ângulo de emergência (prisma) | ° (grau)
δ | desvio (prisma) | ° (grau)
A | ângulo de abertura do prisma | ° (grau)`,
  'Ondulatória': `v | velocidade de propagação da onda | m/s
λ | comprimento de onda | m
f | frequência | Hz
T | período | s
c | velocidade da luz no vácuo (3,0 × 10⁸) | m/s
f<sub>n</sub> | frequência do harmônico n | Hz
n | número do harmônico | sem unidade
L | comprimento da corda, do tubo ou do pêndulo | m
F | força de tração na corda | N
μ | densidade linear da corda | kg/m
I, I₀ | intensidade sonora e intensidade de referência (10⁻¹²) | W/m²
P | potência da fonte | W
A | área atravessada pela onda | m²
β | nível sonoro | dB
f′ | frequência percebida (Doppler) | Hz
v<sub>o</sub>, v<sub>f</sub> | velocidades do observador e da fonte | m/s
d | distância entre as fendas | m
y | distância entre franjas vizinhas | m
D | distância das fendas ao anteparo | m
x | elongação no MHS | m
A | amplitude do MHS | m
ω | pulsação | rad/s
θ₀ | fase inicial | rad
t | tempo | s
m | massa | kg
k | constante elástica | N/m
g | aceleração da gravidade | m/s²`,
  'Eletrostática': `Q, q | carga elétrica (q: carga de prova) | C
n | número de elétrons em excesso ou em falta | sem unidade
e | carga elementar (1,6 × 10⁻¹⁹) | C
Q′ | carga depois do contato | C
F | força elétrica | N
k | constante eletrostática (9,0 × 10⁹ no vácuo) | N·m²/C²
d | distância | m
R<sub>A</sub>, R<sub>B</sub> | raios das esferas | m
E | campo elétrico | N/C (= V/m)
V | potencial elétrico | V
E<sub>p</sub> | energia potencial elétrica | J
τ | trabalho da força elétrica | J
U | diferença de potencial (tensão) | V
C | capacitância | F
E<sub>armazenada</sub> | energia armazenada no capacitor | J
ε | permissividade do meio | F/m
A | área das placas | m²`,
  'Eletrodinâmica': `i | corrente elétrica | A
ΔQ | carga que atravessa o fio | C
Δt | intervalo de tempo | s
U | tensão (diferença de potencial) | V
R, R<sub>eq</sub> | resistência e resistência equivalente | Ω
ρ | resistividade do material | Ω·m
L | comprimento do fio | m
A | área da seção do fio | m²
P | potência | W
E | energia elétrica | J (também kWh = 3,6 × 10⁶ J)
Q | calor dissipado (efeito Joule) | J
ε | força eletromotriz do gerador | V
ε′ | força contraeletromotriz do receptor | V
r, r′ | resistências internas do gerador e do receptor | Ω
η, η′ | rendimentos do gerador e do receptor | sem unidade (ou %)
tarifa | preço de cada kWh | R$/kWh`,
  'Magnetismo': `B | campo magnético | T
F | força magnética | N
q | carga | C
v | velocidade | m/s
θ | ângulo entre v (ou o fio) e B; no fluxo, entre B e a normal à espira | ° (grau)
i | corrente | A
L | comprimento do fio, da barra ou do solenoide | m
μ | permeabilidade magnética do meio (vácuo: 4π × 10⁻⁷) | T·m/A
d | distância ao fio ou entre os fios | m
R | raio da espira | m
N | número de espiras (N₁, N₂: do primário e do secundário) | sem unidade
Φ, ΔΦ | fluxo magnético e variação do fluxo | Wb (T·m²)
A | área da espira | m²
ε | força eletromotriz induzida | V
Δt | intervalo de tempo | s
U₁, U₂ | tensões no primário e no secundário | V`,
  'Física moderna': `E | energia | J
h | constante de Planck (6,6 × 10⁻³⁴) | J·s
f | frequência da radiação | Hz
E<sub>c,máx</sub> | energia cinética máxima dos elétrons emitidos | J
W | função trabalho do metal | J
c | velocidade da luz no vácuo (3,0 × 10⁸) | m/s
m, m₀ | massa restante e massa inicial | kg
n | número de meias-vidas | sem unidade`
};
const RESUMO = Object.fromEntries(Object.entries(RESUMO_TXT).map(([k, v]) => [k, v.split('\n').map(l => l.split(' | '))]));

/* ----- Prefixos ----- */
const PREFIXOS = [
  ['tera','T','10¹²','HD de 1 TB'],
  ['giga','G','10⁹','Wi-Fi de 2,4 GHz'],
  ['mega','M','10⁶','usina de 40 MW'],
  ['quilo','k','10³','1 km = 1 000 m'],
  ['hecto','h','10²','1 hPa = 100 Pa (meteorologia)'],
  ['deca','da','10¹','pouco usado'],
  ['deci','d','10⁻¹','1 dm³ = 1 L'],
  ['centi','c','10⁻²','1 cm = 0,01 m'],
  ['mili','m','10⁻³','choque de 20 mA'],
  ['micro','µ','10⁻⁶','fio de cabelo: dezenas de µm'],
  ['nano','n','10⁻⁹','laser do Blu-ray: 405 nm'],
  ['pico','p','10⁻¹²','capacitores de pF']
];

/* ----- Grandezas e unidades (SI) ----- */
const GRANDEZAS_FUND = [
  ['Comprimento','metro','m'],['Massa','quilograma','kg'],['Tempo','segundo','s'],['Corrente elétrica','ampère','A'],
  ['Temperatura','kelvin','K'],['Quantidade de matéria','mol','mol'],['Intensidade luminosa','candela','cd']
];
const GRANDEZAS_DERIV = [
  ['Área','metro quadrado','m²',''],['Volume','metro cúbico','m³','1 m³ = 1 000 L'],['Ângulo','radiano','rad','180° = π rad'],
  ['Densidade','quilograma por metro cúbico','kg/m³','1 g/cm³ = 1 000 kg/m³'],['Velocidade','metro por segundo','m/s',''],
  ['Aceleração','metro por segundo ao quadrado','m/s²',''],['Força','newton','N','1 N = 1 kg·m/s²'],['Pressão','pascal','Pa','1 Pa = 1 N/m²'],
  ['Trabalho, energia, calor','joule','J','1 J = 1 N·m'],['Potência','watt','W','1 W = 1 J/s'],['Frequência','hertz','Hz','1 Hz = 1 s⁻¹ (ciclos por segundo)'],
  ['Intensidade sonora','watt por metro quadrado','W/m²',''],['Nível sonoro','decibel','dB',''],['Vergência','dioptria','di','1 di = 1 m⁻¹'],
  ['Carga elétrica','coulomb','C','1 C = 1 A·s'],['Tensão (ddp)','volt','V','1 V = 1 J/C'],['Resistência elétrica','ohm','Ω','1 Ω = 1 V/A'],
  ['Capacitância','farad','F','1 F = 1 C/V'],['Campo magnético','tesla','T','1 T = 1 N/(A·m)'],['Fluxo magnético','weber','Wb','1 Wb = 1 T·m²']
];

/* ----- Constantes e conversões ----- */
const CONSTANTES = [
  ['Velocidade da luz no vácuo','c','3,0 × 10⁸ m/s'],
  ['Velocidade do som no ar (≈ 20 °C)','v<sub>som</sub>','≈ 340 m/s'],
  ['Aceleração da gravidade (Terra)','g','≈ 10 m/s² <small>(9,8 m/s²)</small>'],
  ['Carga elementar','e','1,6 × 10⁻¹⁹ C'],
  ['Massa do elétron','m<sub>e</sub>','9,1 × 10⁻³¹ kg'],
  ['Constante eletrostática (vácuo)','k','9,0 × 10⁹ N·m²/C²'],
  ['Permissividade elétrica do vácuo','ε₀','8,85 × 10⁻¹² C²/(N·m²)'],
  ['Permeabilidade magnética do vácuo','μ₀','4π × 10⁻⁷ T·m/A'],
  ['Constante da gravitação universal','G','6,67 × 10⁻¹¹ N·m²/kg²'],
  ['Constante de Planck','h','6,63 × 10⁻³⁴ J·s'],
  ['Constante dos gases','R','8,31 J/(mol·K) = 0,082 atm·L/(mol·K) ≈ 2 cal/(mol·K)'],
  ['Número de Avogadro','N<sub>A</sub>','6,02 × 10²³ mol⁻¹'],
  ['Unidade de massa atômica','u','1,66 × 10⁻²⁷ kg']
];
const CONVERSOES = [
  ['Velocidade','1 m/s = 3,6 km/h <small>(km/h ÷ 3,6 = m/s)</small>'],
  ['Tempo','1 h = 60 min = 3 600 s'],
  ['Volume','1 L = 1 dm³ = 1 000 cm³ = 1 000 mL<br>1 m³ = 1 000 L'],
  ['Área e volume com prefixo','1 cm² = 10⁻⁴ m² &nbsp;;&nbsp; 1 cm³ = 10⁻⁶ m³<br><small>o prefixo também vai ao quadrado ou ao cubo</small>'],
  ['Pressão','1 atm = 760 mmHg ≈ 1,0 × 10⁵ Pa<br><small>≈ coluna de 10 m de água</small>'],
  ['Energia','1 cal ≈ 4,2 J &nbsp;;&nbsp; 1 kcal = 1 000 cal<br>1 kWh = 3,6 × 10⁶ J'],
  ['Temperatura','T (K) = θ (°C) + 273<br><small>variações: Δ1 °C = Δ1 K = Δ1,8 °F</small>'],
  ['Densidade','1 g/cm³ = 1 kg/L = 1 000 kg/m³'],
  ['Ângulo','180° = π rad']
];

/* Páginas da Consulta rápida */
const CONSULTA = [
  { id: 'formulario', ico: 'ƒ', nome: 'Formulário', resumo: 'As fórmulas por assunto: as essenciais em destaque e, em cada assunto, as complementares para ir além.' },
  { id: 'prefixos', ico: 'µ', nome: 'Prefixos e potências de 10', resumo: 'De tera a pico, com exemplos e as armadilhas das conversões de área e volume.' },
  { id: 'grandezas', ico: 'SI', nome: 'Grandezas e unidades', resumo: 'As 7 grandezas fundamentais do SI e as derivadas que mais aparecem nas provas.' },
  { id: 'constantes', ico: 'c', nome: 'Constantes e conversões', resumo: 'Valores para usar nos cálculos e as conversões de unidades mais cobradas.' },
  { id: 'pistas', ico: '→', nome: 'Pistas do enunciado', resumo: 'Palavras e situações do texto que indicam o conceito cobrado: calor, ondas e circuitos.' },
  { id: 'pegadinhas', ico: '!', nome: 'Pegadinhas clássicas', resumo: 'Os erros que mais derrubam em calor, ondas e circuitos, e como evitar cada um.' }
];

/* Pistas do enunciado: [o que aparece no texto, o que pensar] */
const PISTAS = [
  { nome: 'Calor e temperatura', itens: [
    ['“no vácuo”, “do Sol até a Terra”, cor escura ou clara, superfície espelhada', '<b>Irradiação</b>. Bom absorvedor é bom emissor.'],
    ['“o metal parece mais frio”, maçaneta, piso × tapete, cabo de madeira', '<b>Condução</b>. A pele sente o fluxo de calor (k), não a temperatura.'],
    ['“o ar quente sobe”, congelador no alto, brisa, reservatório, aquecedor solar', '<b>Convecção</b>. Fluido quente fica menos denso e sobe.'],
    ['garrafa térmica, isopor, cobertor, porta fechada, iglu', '<b>Isolamento</b>. Reduz a perda de calor; não existe “entrada de frio”.'],
    ['litoral × deserto, amplitude térmica, concreto × água', '<b>Calor específico</b>. c alto → ΔT pequeno (Q = m · c · ΔT).'],
    ['ferver, derreter, evaporar, condensar, patamar no gráfico', '<b>Calor latente</b>. Q = m · L, com temperatura constante.'],
    ['panela de pressão, altitude, leite UHT', '<b>Pressão e ebulição</b>. Mais pressão → ferve a uma temperatura maior.'],
    ['suor, moringa de barro, sair da piscina com vento', '<b>Evaporação resfria</b>. A água retira calor latente do que está em volta.'],
    ['freio, frenagem, objeto que para, descida com velocidade constante', '<b>Energia mecânica vira calor</b>. E<sub>c</sub> ou E<sub>p</sub> = Q.'],
    ['W/m², coletor, painel, refletor solar', '<b>Potência</b> = intensidade × área × rendimento.'],
    ['BTU, kWh, kcal do rótulo', '<b>Unidades</b>. BTU e kWh são energia; BTU/h e W são potência.'],
    ['geladeira, ar-condicionado, compressor', '<b>Refrigerador</b>. Q₁ (liberado fora) = Q₂ (retirado de dentro) + W.'],
    ['lâmina bimetálica, trilho, junta de dilatação, tampa presa', '<b>Dilatação</b>. ΔL = L₀ · α · ΔT; maior α dilata mais.']] },
  { nome: 'Ondas', itens: [
    ['eco, sonar, morcego, ultrassonografia, sensor de estacionamento', '<b>Reflexão</b>. d = v · Δt / 2 (ida e volta).'],
    ['“ouve atrás do muro”, “contorna”, fenda, rádio AM atrás do morro', '<b>Difração</b>. Forte quando λ é parecido com o obstáculo.'],
    ['muda de meio, ar → água, onda chegando paralela à praia', '<b>Refração</b>. A frequência não muda; v e λ mudam juntos.'],
    ['quebra a taça, sintonizar a rádio, frequência natural, estrutura que balança', '<b>Ressonância</b>. Frequência recebida = frequência natural.'],
    ['bolha de sabão colorida, CD, cancelamento de ruído', '<b>Interferência</b>. Ondas se reforçam ou se anulam.'],
    ['óculos polarizados, óculos 3D, filtro', '<b>Polarização</b>. Só ondas transversais (o som no ar não).'],
    ['ambulância, radar, “se aproxima”, “se afasta”, desvio para o vermelho', '<b>Efeito Doppler</b>. Aproximação → f maior; afastamento → f menor.'],
    ['agudo ou grave', '<b>Altura</b> → frequência.'],
    ['forte ou fraco, volume, decibéis', '<b>Intensidade</b> → amplitude; +10 dB = 10 vezes mais intenso.'],
    ['“reconhecer o instrumento”, “reconhecer a voz”', '<b>Timbre</b> → forma da onda (harmônicos).'],
    ['chocolate no micro-ondas, nós e ventres, corda presa, flauta, garrafa soprada', '<b>Onda estacionária</b>. Distância entre nós = λ/2.'],
    ['ondas sísmicas, “não atravessa líquidos”', '<b>Transversal × longitudinal</b>. Transversais (ondas S) não passam por líquidos.'],
    ['ionizante, raios X, ultravioleta, 5G, Wi-Fi, controle remoto', '<b>Espectro eletromagnético</b>. Maior frequência → maior energia.']] },
  { nome: 'Circuitos', itens: [
    ['“uma lâmpada queima e todas apagam”', '<b>Série</b>. Em casa, os aparelhos ficam em paralelo.'],
    ['fio mais grosso ou mais fino, extensão que esquenta', '<b>Resistência do fio</b>. R = ρ · L / A.'],
    ['ligar em 127 V ou 220 V, “aparelho de outra cidade”', '<b>P = U² / R</b> com R fixa. 127 → 220 V: potência cerca de 3 vezes maior.'],
    ['chave verão/inverno, seletora, duas resistências', '<b>Com U fixa</b>, menor R → maior potência.'],
    ['mAh, Ah, autonomia, bateria', '<b>Carga</b> (Q = i · Δt). Energia em Wh = V × Ah.'],
    ['conta de luz, kWh, consumo', '<b>Energia</b>. E = P · Δt.'],
    ['disjuntor, fusível, “desarma”', '<b>Corrente máxima</b>. i = P / U.'],
    ['“os faróis enfraquecem na partida”, resistência interna', '<b>Gerador real</b>. U = ε − r · i.'],
    ['galvanômetro zerado, ponte', '<b>Ponte de Wheatstone</b>. Produtos dos braços opostos são iguais.'],
    ['amperímetro, voltímetro, “medir a corrente”', '<b>Amperímetro</b> em série; <b>voltímetro</b> em paralelo.']] }
];

/* Pegadinhas clássicas: [erro, como evitar] */
const PEGADINHAS = [
  { nome: 'Calor e temperatura', itens: [
    ['Usar a temperatura final no lugar de ΔT', 'ΔT = T<sub>final</sub> − T<sub>inicial</sub>. Em °C ou em K, a variação tem o mesmo valor.'],
    ['Esquecer conversões', 'km/h ÷ 3,6 → m/s<br>min × 60 → s &nbsp;·&nbsp; h × 3 600 → s<br>J/g × 1 000 → J/kg &nbsp;·&nbsp; 1 cal ≈ 4,2 J'],
    ['Esquecer o ½ da energia cinética', 'E<sub>c</sub> = m · v² / 2. Sem o ½, a resposta dobra (e costuma estar nas alternativas).'],
    ['Esquecer o rendimento', 'Se o texto dá um “%”, só essa parte aquece o sistema.'],
    ['Esquecer um corpo', 'Tigela, recipiente e calorímetro também recebem calor.'],
    ['Pular o patamar', 'Chegar a 0 °C ou a 100 °C não basta: mudar de fase exige Q = m · L.'],
    ['Confundir volume com massa', '“Mesmo volume” não é “mesma massa”: use m = ρ · V.'],
    ['Acreditar em “frio”', 'Calor é que flui, do quente para o frio. Isolante só reduz a perda de calor.'],
    ['Calor latente por mol', 'Converta mols em gramas com a massa molar (água: 18 g/mol).'],
    ['Geladeira e cozinha', 'A cozinha recebe Q₂ + W: mais calor do que foi retirado de dentro.']] },
  { nome: 'Ondas', itens: [
    ['Eco sem dividir por 2', 'O som vai e volta: d = v · Δt / 2. No trovão, o som só vai: não divida.'],
    ['Achar que a frequência muda na refração', 'A frequência é da fonte. Na mudança de meio, v e λ mudam na mesma proporção.'],
    ['Distância entre nós', 'Entre dois nós (ou dois ventres) consecutivos cabe λ/2, não λ.'],
    ['Tubo aberto × fechado', 'Fechado: L = λ/4 no modo fundamental. Aberto: L = λ/2.'],
    ['Tarraxa × braço do violão', 'Apertar a tarraxa muda a velocidade (tensão). Apertar no braço muda o comprimento de onda.'],
    ['“Som alto”', 'Em Física, alto é agudo (frequência). Volume é intensidade (amplitude).'],
    ['Decibéis lineares', '+10 dB = 10 vezes a intensidade; +20 dB = 100 vezes. Não divida decibéis.'],
    ['Potências de 10', 'GHz = 10⁹ Hz · MHz = 10⁶ Hz · kHz = 10³ Hz. Confira antes de usar λ = v / f.'],
    ['Doppler invertido', 'Aproximação → f maior. Quem se move junto com a fonte ouve a frequência real.'],
    ['Polarizar o som', 'Só ondas transversais se polarizam. O som no ar é longitudinal.']] },
  { nome: 'Circuitos', itens: [
    ['“Mais resistência, mais calor”', 'Com a tensão fixa (tomada), é o contrário: P = U² / R, menor R → maior P.'],
    ['Esquecer o quadrado da tensão', 'De 127 V para 220 V, a potência vira cerca de 3 vezes, não 1,7.'],
    ['Ah como energia', 'Ah é carga. Energia (Wh) = tensão × Ah.'],
    ['Pilhas em série', 'Em série soma a tensão, não a duração. A mesma corrente passa por todas.'],
    ['kW × kWh', 'kW é potência; kWh é energia (potência × tempo).'],
    ['Corrente total fixa', 'Ao tirar ou pôr um aparelho, a resistência equivalente muda: recalcule a corrente total.'],
    ['Gerador ideal', 'Com corrente alta, a tensão nos terminais cai: U = ε − r · i.'],
    ['Amperímetro em paralelo', 'É um curto-circuito. Amperímetro em série; voltímetro em paralelo.'],
    ['Ponte de Wheatstone', 'Multiplique os braços opostos, não os vizinhos.']] }
];
