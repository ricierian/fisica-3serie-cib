/* ========== Questões estilo UFRGS: Mecânica (4 listas, 40 questões inéditas) ==========
   Inspiradas na lista impressa "Mecânica – UFRGS 2026" (o campo mod indica a questão de origem). */

/* ---------- Desenhos de apoio ---------- */
const AZ = '#3A7BD5', LJ = '#E8862A', VD = '#2E9E6B', VM = '#D9483B';
/* Rampa: triângulo com ângulo na esquerda; devolve {svg, px, py, ang} para posicionar objetos */
function rampaSVG(o){
  const x0 = o.x0 || 30, y0 = o.y0 || 170, L = o.L || 270, ang = o.ang, rad = ang * Math.PI / 180;
  const x1 = x0 + L, y1 = y0 - L * Math.tan(rad);
  let s = `<polygon points="${x0},${y0} ${x1},${y0} ${x1},${y1.toFixed(1)}" fill="var(--surface)" stroke="var(--ink)" stroke-width="2"/>`;
  s += `<path d="M${x0 + 46} ${y0} A46 46 0 0 0 ${(x0 + 46 * Math.cos(rad)).toFixed(1)} ${(y0 - 46 * Math.sin(rad)).toFixed(1)}" fill="none" stroke="var(--ink)" stroke-width="1.4"/>`;
  if (o.rot) s += `<text x="${x0 + 56}" y="${y0 - 8}" class="pt pt-strong">${o.rot}</text>`;
  return { svg: s, at: t => [x0 + t * L, y0 - t * L * Math.tan(rad)], rad };
}
/* Caixa apoiada na rampa, centrada no ponto t (0 a 1) da hipotenusa */
function caixaRampa(R, t, w, h, rotulo, cor){
  const [cx, cy] = R.at(t), a = -R.rad * 180 / Math.PI;
  return `<g transform="translate(${cx.toFixed(1)} ${cy.toFixed(1)}) rotate(${a.toFixed(1)})"><rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" fill="${cor || 'var(--surface)'}" stroke="var(--ink)" stroke-width="2"/>${rotulo ? `<text x="0" y="${-h / 2 + 4}" text-anchor="middle" class="pt pt-strong">${rotulo}</text>` : ''}</g>`;
}
const chao = (x1, x2, y) => `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="var(--ink)" stroke-width="2"/>` + Array.from({ length: Math.floor((x2 - x1) / 14) }, (_, k) => `<line x1="${x1 + 6 + k * 14}" y1="${y}" x2="${x1 + k * 14}" y2="${y + 7}" stroke="var(--muted)" stroke-width="1.2"/>`).join('');
const legenda = t => `<figcaption class="pt-cap">${t}</figcaption>`;
const figC = (vb, aria, inner, w, cap) => fig(vb, aria, inner, w).replace('</figure>', (cap ? legenda(cap) : '') + '</figure>');
const itens = arr => `<p>${arr.join('<br>')}</p>`;

/* ===================================================================== */
/* ======================= LISTA 1 · CINEMÁTICA ======================== */
/* ===================================================================== */
const TOOLS_U1 = [
  ['Velocidade média e relativa', `v<sub>m</sub> = ${f('Δs','Δt')}<br>mesmo sentido: v = v₁ + v₂`],
  ['MUV', `v = v₀ + a · t<br>s = s₀ + v₀ · t + ${f('a · t²','2')}<br>v² = v₀² + 2 · a · Δs`],
  ['Gráficos', `x × t: inclinação = velocidade<br>v × t: inclinação = aceleração<br>área = deslocamento<br>a × t: área = variação da velocidade`],
  ['Lançamentos (sem resistência do ar)', `horizontal: v<sub>x</sub> constante<br>vertical: aceleração g = 10 m/s², para baixo`],
  ['Componentes da velocidade', `v<sub>x</sub> = v · cos θ<br>v<sub>y</sub> = v · sen θ`]
];

const FIG_U1_ESCADA = (() => {
  const [d, mk] = seta(AZ), [d2, mk2] = seta('var(--ink)');
  return figC('0 0 340 190', 'Esquema de uma escada rolante inclinada, com 15 metros de comprimento, do início, embaixo à esquerda, ao fim, em cima à direita. Um estudante está sobre os degraus, e uma seta azul paralela à escada indica que ela sobe.',
  `${d}${d2}<line x1="40" y1="150" x2="290" y2="40" stroke="var(--muted)" stroke-width="8" stroke-linecap="round"/>
   ${chao(10, 330, 168)}
   <line x1="94" y1="102" x2="206" y2="53" stroke="${AZ}" stroke-width="3" marker-end="${mk}"/>
   <text x="36" y="48" class="pt pt-strong" style="fill:${AZ}">sentido da escada</text>
   <line x1="46" y1="163" x2="296" y2="53" stroke="var(--ink)" stroke-width="1.2" marker-start="${mk2}" marker-end="${mk2}"/>
   <text x="190" y="128" class="pt pt-strong">15 m</text>
   <circle cx="252" cy="26" r="6" fill="var(--ink)"/><line x1="252" y1="32" x2="252" y2="52" stroke="var(--ink)" stroke-width="3"/>
   <text x="14" y="140" class="pt">início</text><text x="300" y="30" class="pt">fim</text>`, 380, 'Esquema simplificado, fora de escala.');
})();

const GRAF_U1_CORRIDA = plot({aria:'Posição, em metros, em função do tempo, em segundos, de dois corredores. Ana, linha azul contínua: vai de 0 a 1 200 metros entre 0 e 200 segundos, fica em 1 200 metros até 400 segundos e chega a 2 400 metros em 800 segundos. Bruno, linha laranja tracejada: vai em linha reta de 0 a 2 400 metros entre 0 e 1 000 segundos.',
  xmin:0, xmax:1000, ymin:0, ymax:2400, xt:[0,200,400,600,800,1000], yt:[0,400,800,1200,1600,2000,2400], xl:'t (s)', yl:'x (m)', l:52,
  L:[{p:[[0,0],[200,1200],[400,1200],[800,2400]], c:AZ, lab:'Ana', lp:[330,1950]},
     {p:[[0,0],[1000,2400]], c:LJ, dash:'7 5', lab:'Bruno', lp:[760,1350]}]});

const GRAF_U1_ACEL = plot({aria:'Aceleração, em metros por segundo ao quadrado, em função do tempo, em segundos. Trecho I, de 0 a 10 segundos: aceleração constante de 2. Trecho II, de 10 a 20 segundos: aceleração nula. Trecho III, de 20 a 30 segundos: aceleração constante de menos 1.',
  xmin:0, xmax:30, ymin:-1.5, ymax:2.5, xt:[0,10,20,30], yt:[-1,0,1,2], xl:'t (s)', yl:'a (m/s²)', l:44,
  L:[{p:[[0,2],[10,2]], c:AZ},{p:[[10,0],[20,0]], c:AZ},{p:[[20,-1],[30,-1]], c:AZ},
     {p:[[10,2],[10,0]], c:'var(--muted)', dash:'4 4', w:1.4},{p:[[20,0],[20,-1]], c:'var(--muted)', dash:'4 4', w:1.4}],
  ann:[[5,2.18,'I'],[15,0.3,'II'],[25,-0.72,'III']]});

const FIG_U1_DRONE = (() => {
  const [d, mk] = seta(AZ), [d2, mk2] = seta('var(--ink)');
  let par = 'M62 62'; for (let k = 1; k <= 20; k++){ const x = 62 + k * 11, y = 62 + 118 * (k / 20) ** 2; par += ` L${x} ${y.toFixed(1)}`; }
  return figC('0 0 340 200', 'Esquema: um drone voa na horizontal, para a direita, a 15 metros por segundo, a 45 metros de altura, e solta um pacote. Uma linha tracejada indica, de forma qualitativa, o caminho do pacote até o solo.',
  `${d}${d2}<rect x="40" y="50" width="44" height="10" rx="4" fill="var(--ink)"/><line x1="36" y1="46" x2="56" y2="46" stroke="var(--ink)" stroke-width="3"/><line x1="68" y1="46" x2="88" y2="46" stroke="var(--ink)" stroke-width="3"/><line x1="46" y1="46" x2="46" y2="50" stroke="var(--ink)" stroke-width="2"/><line x1="78" y1="46" x2="78" y2="50" stroke="var(--ink)" stroke-width="2"/>
   <rect x="57" y="62" width="10" height="9" fill="${LJ}"/>
   <line x1="96" y1="54" x2="150" y2="54" stroke="${AZ}" stroke-width="3" marker-end="${mk}"/><text x="98" y="42" class="pt pt-strong" style="fill:${AZ}">15 m/s</text>
   <path d="${par}" fill="none" stroke="var(--muted)" stroke-width="1.6" stroke-dasharray="5 5"/>
   <line x1="24" y1="62" x2="24" y2="180" stroke="var(--ink)" stroke-width="1.2" marker-start="${mk2}" marker-end="${mk2}"/><text x="10" y="126" class="pt pt-strong" transform="rotate(-90 10 126)" text-anchor="middle">45 m</text>
   ${chao(14, 330, 182)}`, 380, 'Esquema fora de escala; a linha tracejada é apenas ilustrativa.');
})();

const FIG_U1_CHUTE = (() => {
  const [d, mk] = seta(AZ);
  let par = 'M40 170'; for (let k = 1; k <= 40; k++){ const x = 40 + k * 7, u = k / 40; par += ` L${x} ${(170 - 4 * 105 * u * (1 - u)).toFixed(1)}`; }
  return figC('0 0 340 200', 'Esquema: uma bola sai do gramado, à esquerda, com velocidade de 20 metros por segundo, numa direção que forma 37 graus com a horizontal. Uma linha tracejada mostra a trajetória curva até o gramado, com o ponto mais alto marcado no meio.',
  `${d}<path d="${par}" fill="none" stroke="var(--muted)" stroke-width="1.6" stroke-dasharray="5 5"/>
   <line x1="40" y1="170" x2="112" y2="116" stroke="${AZ}" stroke-width="3" marker-end="${mk}"/><text x="66" y="112" text-anchor="end" class="pt pt-strong" style="fill:${AZ}">20 m/s</text>
   <path d="M80 170 A40 40 0 0 0 72 146" fill="none" stroke="var(--ink)" stroke-width="1.4"/><text x="86" y="158" class="pt pt-strong">37°</text>
   <circle cx="40" cy="166" r="5" fill="var(--ink)"/><circle cx="180" cy="65" r="4" fill="var(--surface)" stroke="var(--ink)" stroke-width="1.6"/><text x="180" y="54" text-anchor="middle" class="pt">ponto mais alto</text>
   <line x1="10" y1="172" x2="330" y2="172" stroke="${VD}" stroke-width="3"/>`, 380, 'Esquema fora de escala.');
})();

const FIG_U1_MESA = (() => {
  const [d, mk] = seta(AZ), [d2, mk2] = seta('var(--ink)');
  let par = 'M118 56'; for (let k = 1; k <= 16; k++){ const u = k / 16; par += ` L${(118 + 70 * u).toFixed(1)} ${(56 + 118 * u * u).toFixed(1)}`; }
  return figC('0 0 340 200', 'Esquema: mesa vista de lado, com 1,25 metro de altura. Na borda direita estão duas bolinhas. A bolinha A cai a partir do repouso, junto à borda, por uma linha tracejada vertical. A bolinha B é lançada para a direita, na horizontal, a 2,0 metros por segundo, e segue uma linha tracejada curva.',
  `${d}${d2}<rect x="20" y="58" width="100" height="8" fill="var(--muted)"/><rect x="28" y="66" width="7" height="108" fill="var(--muted)"/><rect x="104" y="66" width="7" height="108" fill="var(--muted)"/>
   <circle cx="112" cy="52" r="6" fill="${LJ}"/><text x="98" y="40" class="pt pt-strong" style="fill:${LJ}">A</text>
   <circle cx="126" cy="52" r="6" fill="${AZ}"/><text x="130" y="40" class="pt pt-strong" style="fill:${AZ}">B</text>
   <line x1="134" y1="48" x2="176" y2="48" stroke="${AZ}" stroke-width="2.5" marker-end="${mk}"/><text x="180" y="52" class="pt pt-strong" style="fill:${AZ}">2,0 m/s</text>
   <line x1="122" y1="60" x2="122" y2="172" stroke="${LJ}" stroke-width="1.6" stroke-dasharray="5 5"/>
   <path d="${par}" fill="none" stroke="${AZ}" stroke-width="1.6" stroke-dasharray="5 5"/>
   <line x1="16" y1="62" x2="16" y2="174" stroke="var(--ink)" stroke-width="1.2" marker-start="${mk2}" marker-end="${mk2}"/><text x="10" y="118" class="pt pt-strong" transform="rotate(-90 10 118)" text-anchor="middle">1,25 m</text>
   ${chao(16, 330, 176)}`, 380, 'Esquema fora de escala; as linhas tracejadas são apenas ilustrativas.');
})();

const FIG_U1_TREM = (() => {
  const [d, mk] = seta(AZ), [d2, mk2] = seta(LJ);
  return figC('0 0 340 180', 'Esquema: vagão de trem visto de lado, movendo-se para a direita a 20 metros por segundo em relação aos trilhos. Dentro dele, um passageiro joga uma moeda verticalmente para cima. Na plataforma, à esquerda, uma pessoa parada observa.',
  `${d}${d2}<rect x="110" y="40" width="200" height="96" rx="8" fill="var(--surface)" stroke="var(--ink)" stroke-width="2"/>
   <rect x="120" y="54" width="44" height="30" fill="var(--surface)" stroke="var(--ink)" stroke-width="1.2"/><rect x="262" y="58" width="40" height="28" fill="var(--surface)" stroke="var(--ink)" stroke-width="1.2"/>
   <circle cx="140" cy="148" r="10" fill="var(--ink)"/><circle cx="280" cy="148" r="10" fill="var(--ink)"/>
   <circle cx="212" cy="84" r="6" fill="var(--ink)"/><line x1="212" y1="90" x2="212" y2="116" stroke="var(--ink)" stroke-width="3"/><line x1="212" y1="98" x2="222" y2="90" stroke="var(--ink)" stroke-width="2.5"/>
   <circle cx="224" cy="80" r="3.5" fill="${LJ}"/><line x1="224" y1="74" x2="224" y2="54" stroke="${LJ}" stroke-width="2" marker-end="${mk2}"/><text x="232" y="50" class="pt pt-strong" style="fill:${LJ}">3,0 m/s</text>
   <line x1="236" y1="28" x2="306" y2="28" stroke="${AZ}" stroke-width="3" marker-end="${mk}"/><text x="152" y="32" class="pt pt-strong" style="fill:${AZ}">20 m/s</text>
   <line x1="10" y1="160" x2="330" y2="160" stroke="var(--ink)" stroke-width="2.5"/>
   <rect x="6" y="128" width="80" height="32" fill="var(--line)"/><circle cx="46" cy="96" r="6" fill="var(--ink)"/><line x1="46" y1="102" x2="46" y2="128" stroke="var(--ink)" stroke-width="3"/><text x="46" y="174" text-anchor="middle" class="pt">plataforma</text>`, 380, 'Esquema fora de escala. A velocidade de 3,0 m/s da moeda é medida em relação ao passageiro.');
})();

const Q_U1 = [
{ src: 'Inédita', nivel: 'básico',
  mod: 'Inspirada na esteira do aeroporto (Ufrgs; questão 2 da lista Mecânica UFRGS 2026): escada rolante, outros números.',
  text: `<p>Em uma estação de metrô, uma escada rolante de 15 m de comprimento leva 30 s para transportar uma pessoa parada sobre os degraus, do início ao fim. Com pressa, um estudante sobe caminhando sobre os degraus, no mesmo sentido do movimento da escada, e percorre todo o trecho em 10 s.</p>${FIG_U1_ESCADA}<p>Qual é o módulo da velocidade do estudante em relação aos degraus da escada?</p>`,
  opts: ['0,50 m/s.','0,75 m/s.','1,0 m/s.','1,5 m/s.','2,0 m/s.'], ans: 2,
  hint: 'Calcule primeiro duas velocidades em relação ao chão da estação: a da escada e a do estudante. Como as duas têm o mesmo sentido, como elas se relacionam?',
  steps: [['Velocidade da escada', `<p>Quem fica parado nos degraus anda junto com a escada:</p><div class="eq">v<sub>e</sub> = ${f('15 m','30 s')}</div><div class="eq">v<sub>e</sub> = 0,50 m/s</div>`],
          ['Velocidade do estudante em relação ao chão', `<div class="eq">v = ${f('15 m','10 s')}</div><div class="eq">v = 1,5 m/s</div>`],
          ['Em relação aos degraus', `<p>Em relação ao chão, a velocidade do estudante é a dele em relação aos degraus somada à da escada:</p><div class="eq">v = v<sub>rel</sub> + v<sub>e</sub></div><div class="eq">1,5 = v<sub>rel</sub> + 0,50</div><div class="eq">v<sub>rel</sub> = <span class="hl">1,0 m/s</span></div>`]],
  alt: 'Pense em quanto cada um “leva” o estudante: em 10 s, a escada sozinha o desloca 5,0 m (0,50 m/s × 10 s). Os outros 10 m ele andou com as próprias pernas: 10 m em 10 s, ou seja, 1,0 m/s.',
  warn: erros([['A) 0,50 m/s:','é a velocidade da escada, não a do estudante em relação a ela.'],['B) 0,75 m/s:','dividiu 15 m pela diferença dos tempos (30 s − 10 s); tempos de movimentos diferentes não se subtraem assim.'],['D) 1,5 m/s:','é a velocidade do estudante em relação ao chão; faltou descontar a da escada.'],['E) 2,0 m/s:','somou a velocidade da escada (1,5 + 0,50) em vez de descontá-la.']]) },

{ src: 'Inédita', nivel: 'básico',
  mod: 'Inspirada no atleta que corre 100 m em 10 s (Ufrgs; questão 3 da lista 2026): metrô, dados em tabela, afirmações novas.',
  text: `<p>Um trem de metrô parte do repouso de uma estação e acelera de forma constante em um trecho retilíneo. A tabela mostra a posição do trem, medida a partir do ponto de partida, em três instantes.</p>${tabela(['t (s)','0','10','20'], [['x (m)','0','50','200']])}<p>Considere as seguintes afirmações sobre os primeiros 20 s do movimento.</p>${itens(['I. A velocidade média do trem é de 36 km/h.','II. O módulo da aceleração do trem é de 0,50 m/s².','III. No instante t = 20 s, a velocidade do trem é de 20 m/s.'])}<p>Quais estão corretas?</p>`,
  opts: ['Apenas I.','Apenas III.','Apenas I e II.','Apenas I e III.','Apenas II e III.'], ans: 3,
  hint: 'Partindo do repouso, s = a · t²/2: use um ponto da tabela para achar a. E atenção: velocidade média e velocidade final não são a mesma coisa.',
  steps: [['I. Velocidade média', `<div class="eq">v<sub>m</sub> = ${f('200 m','20 s')}</div><div class="eq">v<sub>m</sub> = 10 m/s = 36 km/h</div><p>Correta.</p>`],
          ['II. Aceleração', `<p>Partindo do repouso, s = a · t²/2. Com o ponto (20 s; 200 m):</p><div class="eq">200 = ${f('a · 20²','2')}</div><div class="eq">a = 1,0 m/s²</div><p>Confere com (10 s; 50 m): 1,0 · 10²/2 = 50 m. Incorreta.</p>`],
          ['III. Velocidade em 20 s', `<div class="eq">v = a · t = 1,0 · 20</div><div class="eq">v = 20 m/s</div><p>Correta. Estão corretas <span class="hl">apenas I e III</span>.</p>`]],
  alt: 'No MUV que parte do repouso, a velocidade final é o dobro da média: 2 × 10 m/s = 20 m/s. Repare também na tabela: o tempo dobra (10 s → 20 s) e a posição fica quatro vezes maior (50 m → 200 m), a marca de s proporcional a t².',
  warn: erros([['A) Apenas I:','tomou a velocidade final igual à média (10 m/s); partindo do repouso, ela é o dobro.'],['B) Apenas III:','esqueceu de converter: 10 m/s × 3,6 = 36 km/h, então a I também está correta.'],['C) Apenas I e II:','calculou a aceleração dividindo a velocidade média pelo tempo (10/20) e, com ela, a velocidade final daria 10 m/s; a velocidade variou 20 m/s, e a = 1,0 m/s².'],['E) Apenas II e III:','a II está errada (0,50 m/s² sai de v<sub>m</sub>/t; o correto é 1,0 m/s²), e a I está certa, pois 10 m/s = 36 km/h.']]) },

{ src: 'Inédita', nivel: 'básico',
  mod: 'Inspirada no gráfico da aceleração da pedra (Ufrgs; questão 1) e no lançamento oblíquo (questão 5): lacunas sobre o lançamento vertical.',
  text: `<p>No vôlei, o levantador às vezes joga a bola verticalmente para cima, para que o atacante tenha tempo de chegar e cortá-la. Despreze a resistência do ar.</p><p>Assinale a alternativa que preenche corretamente as lacunas do enunciado abaixo, na ordem em que aparecem.</p><p>No ponto mais alto da trajetória, a velocidade da bola é __________, e sua aceleração é __________. Na descida, o módulo da aceleração da bola, comparado ao da subida, é __________.</p>`,
  opts: ['nula — igual a g, para baixo — igual.','nula — nula — igual.','nula — igual a g, para cima — menor.','máxima — igual a g, para baixo — maior.','nula — nula — maior.'], ans: 0,
  hint: 'No ponto mais alto, a bola fica parada por um instante. Isso quer dizer que nenhuma força age sobre ela? Que força continua puxando a bola o tempo todo?',
  steps: [['Velocidade no topo', '<p>A bola sobe perdendo velocidade até parar por um instante e começar a descer: no ponto mais alto, v = 0.</p>'],
          ['Aceleração no topo', '<p>Sem resistência do ar, a única força sobre a bola é o peso, que não some em nenhum momento. Então a aceleração é g, vertical e para baixo, também no ponto mais alto.</p>'],
          ['Subida e descida', '<p>Como o peso é o mesmo na subida e na descida, a aceleração é a mesma: <span class="hl">nula — igual a g, para baixo — igual</span>.</p>']],
  alt: 'Se a aceleração fosse nula no ponto mais alto, a velocidade deixaria de mudar a partir dali: a bola ficaria parada no ar. Ela só começa a descer porque a aceleração continua agindo justamente no instante em que v = 0.',
  warn: erros([['B) nula — nula — igual:','confundiu velocidade nula com aceleração nula; a gravidade não “desliga” no ponto mais alto.'],['C) para cima — menor:','a aceleração da gravidade aponta para baixo na subida e na descida, e não muda de valor.'],['D) máxima — maior:','no ponto mais alto, a velocidade é mínima (nula, no lançamento vertical), e g não aumenta na descida.'],['E) nula — nula — maior:','achou que a bola “ganha” aceleração ao descer; sem resistência do ar, a aceleração é g o tempo todo.']]) },

{ src: 'Inédita', nivel: 'intermediário',
  mod: 'Inspirada em Pedro e Paulo de bicicleta (Ufrgs; questão 4): corrida de rua, afirmações novas com cálculo.',
  text: `<p>Dois amigos disputam uma corrida de rua de 2 400 m. O gráfico mostra a posição de cada um em função do tempo: Ana é a linha azul contínua, e Bruno é a linha laranja tracejada. Os dois largam juntos, no instante t = 0.</p>${GRAF_U1_CORRIDA}<p>Considere as seguintes afirmações.</p>${itens(['I. A velocidade média de Ana na prova foi maior que a de Bruno.','II. Ana ficou parada durante 200 s.','III. No instante t = 400 s, Ana estava 240 m à frente de Bruno.'])}<p>Quais estão corretas?</p>`,
  opts: ['Apenas I.','Apenas II.','Apenas I e II.','Apenas II e III.','I, II e III.'], ans: 4,
  hint: 'Os dois percorrem os mesmos 2 400 m: compare os tempos de chegada. Onde o gráfico de Ana fica horizontal? E para a posição de Bruno em 400 s, use a velocidade dele, que é constante.',
  steps: [['I. Velocidades médias', `<div class="eq">v<sub>Ana</sub> = ${f('2 400 m','800 s')} = 3,0 m/s</div><div class="eq">v<sub>Bruno</sub> = ${f('2 400 m','1 000 s')} = 2,4 m/s</div><p>Correta.</p>`],
          ['II. Parada', '<p>De 200 s a 400 s, a posição de Ana fica em 1 200 m (trecho horizontal): ela ficou parada 200 s. Correta.</p>'],
          ['III. Posições em 400 s', `<div class="eq">x<sub>Bruno</sub> = 2,4 · 400 = 960 m</div><div class="eq">x<sub>Ana</sub> = 1 200 m</div><p>Diferença: 1 200 − 960 = 240 m. Correta. Estão corretas <span class="hl">I, II e III</span>.</p>`]],
  alt: 'No gráfico x × t, a inclinação é a velocidade. Ana corre mais rápido que Bruno nos dois trechos em que se move (6,0 m/s e 3,0 m/s, contra 2,4 m/s). Por isso, mesmo parando 200 s, ela chega 200 s antes dele.',
  warn: erros([['A) Apenas I:','esqueceu que trecho horizontal no gráfico x × t é repouso e não calculou a posição de Bruno em 400 s.'],['B) Apenas II:','achou que a parada faz Ana perder na média; ela chega 200 s antes de Bruno.'],['C) Apenas I e II:','leu a posição de Bruno em 400 s na grade (perto de 800 m ou 1 000 m) em vez de calcular 2,4 × 400 = 960 m.'],['D) Apenas II e III:','comparou só os trechos finais; a velocidade média usa o deslocamento e o tempo totais de cada um.']]) },

{ src: 'Inédita', nivel: 'intermediário',
  mod: 'Inspirada no gráfico a × t do móvel (Ufrgs; questão 10): pede o valor da velocidade final em vez do gráfico v × t.',
  text: `<p>Em um teste de pista, um carro elétrico parte do repouso e se move em linha reta. O gráfico mostra a aceleração do carro, na direção do movimento, durante 30 s.</p>${GRAF_U1_ACEL}<p>Ao final dos 30 s, o módulo da velocidade do carro é de</p>`,
  opts: ['1,0 m/s.','5,0 m/s.','10 m/s.','20 m/s.','30 m/s.'], ans: 2,
  hint: 'No gráfico a × t, o que representa a área entre a linha e o eixo do tempo? E qual é o sinal da área no trecho III?',
  steps: [['Área = variação da velocidade', '<p>Em cada trecho, a aceleração é constante, e Δv = a · Δt é a área do retângulo entre a linha e o eixo t.</p>'],
          ['Trecho a trecho', `<div class="eq">I: Δv = 2 · 10 = +20 m/s</div><div class="eq">II: Δv = 0 · 10 = 0</div><div class="eq">III: Δv = −1 · 10 = −10 m/s</div>`],
          ['Velocidade final', `<p>Partindo do repouso:</p><div class="eq">v = 0 + 20 + 0 − 10</div><div class="eq">v = <span class="hl">10 m/s</span></div>`]],
  alt: 'Em palavras: o carro ganha 2 m/s a cada segundo durante 10 s (chega a 20 m/s), mantém 20 m/s por mais 10 s e depois perde 1 m/s a cada segundo durante 10 s. Sobram 10 m/s.',
  warn: erros([['A) 1,0 m/s:','leu o valor da aceleração no último trecho, não calculou a velocidade.'],['B) 5,0 m/s:','calculou as áreas como triângulos (com o ½); os trechos são retângulos.'],['D) 20 m/s:','parou no fim do trecho II e não descontou o efeito do trecho III.'],['E) 30 m/s:','somou a área do trecho III como positiva; aceleração contrária ao movimento diminui a velocidade.']]) },

{ src: 'Inédita', nivel: 'intermediário',
  mod: 'Inspirada no avião que solta uma carga (Ufrgs; questão 8): drone, trajetórias nos dois referenciais e velocidade em relação ao solo.',
  text: `<p>Um drone de entregas voa em linha reta, na horizontal, a 15 m/s e a 45 m de altura, quando solta um pacote, e continua voando com a mesma velocidade. Despreze a resistência do ar e considere g = 10 m/s².</p>${FIG_U1_DRONE}<p>Assinale a alternativa que preenche corretamente as lacunas do enunciado abaixo, na ordem em que aparecem.</p><p>Em relação ao drone, o pacote descreve uma __________; em relação a uma pessoa parada no solo, descreve uma __________. Dois segundos após ser solto, o módulo da velocidade do pacote em relação ao solo é de __________.</p>`,
  opts: ['parábola — parábola — 25 m/s.','reta vertical — parábola — 25 m/s.','parábola — reta vertical — 25 m/s.','reta vertical — parábola — 35 m/s.','parábola — reta vertical — 20 m/s.'], ans: 1,
  hint: 'Depois de solto, o pacote perde a velocidade horizontal que tinha junto com o drone? Pense nos movimentos horizontal e vertical separadamente e lembre que velocidades perpendiculares não se somam como números comuns.',
  steps: [['Horizontal', '<p>Sem resistência do ar, nenhuma força horizontal age no pacote: ele mantém os 15 m/s do drone. Em relação ao drone, então, ele não se afasta para os lados, só cai: <b>reta vertical</b>. Para quem está no solo, o pacote avança 15 m/s enquanto cai: <b>parábola</b>.</p>'],
          ['Vertical, após 2,0 s', `<p>Em 2,0 s, o pacote cai 10 · 2,0²/2 = 20 m, menos que os 45 m de altura: ainda está no ar.</p><div class="eq">v<sub>y</sub> = g · t = 10 · 2,0</div><div class="eq">v<sub>y</sub> = 20 m/s</div>`],
          ['Módulo da velocidade', `<p>As componentes são perpendiculares:</p><div class="eq">v = √(15² + 20²)</div><div class="eq">v = <span class="hl">25 m/s</span></div>`]],
  alt: 'Os números 15, 20 e 25 formam um triângulo retângulo 3-4-5 ampliado 5 vezes. Na prática, o pacote cai sempre logo abaixo do drone: por isso aviões de socorro soltam a carga antes de passar sobre o alvo.',
  warn: erros([['A) parábola — parábola:','em relação ao drone, o pacote não se afasta na horizontal, porque os dois têm a mesma velocidade horizontal.'],['C) referenciais trocados:','trocou os referenciais: quem vê a reta vertical é o drone.'],['D) 35 m/s:','somou 15 + 20 como números; as componentes são perpendiculares, e o módulo sai do teorema de Pitágoras.'],['E) 20 m/s:','deu só a componente vertical da velocidade e ainda trocou os referenciais.']]) },

{ src: 'Inédita', nivel: 'intermediário',
  mod: 'Inspirada no lançamento oblíquo (Ufrgs; questão 5): cobrança de falta, versão numérica.',
  text: `<p>Em uma cobrança de falta, a bola sai do gramado com velocidade de 20 m/s, numa direção que forma 37° com a horizontal. Despreze a resistência do ar e use g = 10 m/s², sen 37° = 0,60 e cos 37° = 0,80.</p>${FIG_U1_CHUTE}<p>Assinale a alternativa que preenche corretamente as lacunas do enunciado abaixo, na ordem em que aparecem.</p><p>No ponto mais alto da trajetória, o módulo da velocidade da bola é __________, e a altura máxima atingida é __________.</p>`,
  opts: ['nula — 20 m.','12 m/s — 7,2 m.','12 m/s — 20 m.','16 m/s — 7,2 m.','16 m/s — 12,8 m.'], ans: 3,
  hint: 'Decomponha a velocidade inicial. No ponto mais alto, qual componente deixa de existir e qual continua igual? Para a altura, só uma delas importa.',
  steps: [['Componentes', `<div class="eq">v<sub>x</sub> = 20 · 0,80 = 16 m/s</div><div class="eq">v<sub>y</sub> = 20 · 0,60 = 12 m/s</div>`],
          ['Ponto mais alto', '<p>A componente vertical vai a zero, e a horizontal se mantém (não há força horizontal): v = v<sub>x</sub> = 16 m/s.</p>'],
          ['Altura máxima', `<p>Na vertical, a bola se comporta como num lançamento vertical com 12 m/s:</p><div class="eq">h = ${f('v<sub>y</sub>²','2g')} = ${f('12²','20')}</div><div class="eq">h = 7,2 m</div><p>Resposta: <span class="hl">16 m/s — 7,2 m</span>.</p>`]],
  alt: 'Pense na sombra da bola num muro lateral: ela sobe e desce como uma bola jogada para cima a 12 m/s, chegando a 7,2 m em 1,2 s. Enquanto isso, a sombra no chão anda 16 m/s sem parar.',
  warn: erros([['A) nula — 20 m:','tratou como lançamento vertical: no oblíquo, a componente horizontal continua no topo, e a altura depende só de v<sub>y</sub>.'],['B) 12 m/s — 7,2 m:','no topo, quem zera é a componente vertical (12 m/s); a que fica é a horizontal (16 m/s).'],['C) 12 m/s — 20 m:','trocou as componentes e usou os 20 m/s inteiros na altura.'],['E) 16 m/s — 12,8 m:','usou a componente horizontal (16 m/s) no cálculo da altura.']]) },

{ src: 'Inédita', nivel: 'avançado',
  mod: 'Inspirada nos objetos na borda da mesa (Ufrgs; questão 6) e nos projéteis (questão 9): bolinhas de gude, afirmações com cálculo.',
  text: `<p>Duas bolinhas de gude, A e B, estão na borda de uma mesa de 1,25 m de altura. No mesmo instante, A é abandonada da borda e cai, enquanto B é lançada horizontalmente com velocidade de 2,0 m/s, como mostra o esquema. Despreze a resistência do ar e considere g = 10 m/s².</p>${FIG_U1_MESA}<p>Considere as seguintes afirmações.</p>${itens(['I. As duas bolinhas atingem o chão no mesmo instante, 0,50 s depois de deixarem a mesa.','II. A bolinha B atinge o chão a 1,0 m do pé da mesa.','III. As duas bolinhas atingem o chão com velocidades de mesmo módulo.'])}<p>Quais estão corretas?</p>`,
  opts: ['Apenas I.','Apenas II.','Apenas III.','Apenas I e III.','Apenas I e II.'], ans: 4,
  hint: 'Na vertical, as duas partem com velocidade zero, da mesma altura. Ao chegar ao chão, o que B tem de velocidade que A não tem?',
  steps: [['I. Tempo de queda', `<p>Na vertical, as duas partem do repouso:</p><div class="eq">h = ${f('g · t²','2')}</div><div class="eq">1,25 = 5 · t²</div><div class="eq">t = 0,50 s</div><p>O mesmo para A e B. Correta.</p>`],
          ['II. Alcance de B', `<div class="eq">x = v<sub>x</sub> · t = 2,0 · 0,50</div><div class="eq">x = 1,0 m</div><p>Correta.</p>`],
          ['III. Velocidades ao chegar', `<p>As duas chegam com v<sub>y</sub> = 10 · 0,50 = 5,0 m/s. Mas B ainda tem 2,0 m/s na horizontal:</p><div class="eq">v<sub>B</sub> = √(2,0² + 5,0²)</div><div class="eq">v<sub>B</sub> ≈ 5,4 m/s</div><p>Maior que 5,0 m/s. Incorreta. Estão corretas <span class="hl">apenas I e II</span>.</p>`]],
  alt: 'Pela energia: as duas descem a mesma altura e ganham a mesma energia cinética por quilograma, mas B já começa com energia cinética (a da velocidade horizontal). Então chega mais rápida.',
  warn: erros([['A) Apenas I:','não calculou o alcance de B: x = v · t = 2,0 × 0,50 = 1,0 m.'],['B) Apenas II:','achou que a bolinha lançada demora mais para cair; a velocidade horizontal não interfere na queda.'],['C) Apenas III:','olhou só a componente vertical da velocidade final, que é igual; B ainda tem 2,0 m/s na horizontal.'],['D) Apenas I e III:','mesmo engano da C: componentes verticais iguais não garantem velocidades de mesmo módulo.']]) },

{ src: 'Inédita', nivel: 'avançado',
  mod: 'Inspirada no móvel que percorre 100 m em 5 s e mais 100 m em 3 s (Ufrgs; questão 12): sensores de pista, outros números.',
  text: `<p>Em uma pista de testes, sensores registram a passagem de um carro que acelera em linha reta, com aceleração constante. O carro passa pelo primeiro sensor já em movimento, leva 4,0 s para percorrer os 60 m até o segundo sensor e apenas 2,0 s para percorrer os 60 m seguintes, até o terceiro.</p><p>O módulo da aceleração do carro é de</p>`,
  opts: ['3,8 m/s².','5,0 m/s².','6,7 m/s².','7,5 m/s².','10 m/s².'], ans: 1,
  hint: 'Escreva s = v₀ · t + a · t²/2 para dois intervalos que começam no primeiro sensor: 60 m em 4,0 s e 120 m em 6,0 s. São duas equações e duas incógnitas.',
  steps: [['Duas equações', `<p>Medindo a partir do primeiro sensor:</p><div class="eq">60 = 4v₀ + 8a</div><div class="eq">120 = 6v₀ + 18a</div>`],
          ['Isolando v₀', `<p>Da primeira equação:</p><div class="eq">v₀ = 15 − 2a</div>`],
          ['Substituindo', `<div class="eq">120 = 6(15 − 2a) + 18a</div><div class="eq">120 = 90 + 6a</div><div class="eq">a = <span class="hl">5,0 m/s²</span></div><p>E v₀ = 5,0 m/s no primeiro sensor.</p>`]],
  alt: 'Confira o resultado: com v₀ = 5,0 m/s e a = 5,0 m/s², o carro passa pelo segundo sensor a 25 m/s e pelo terceiro a 35 m/s. No segundo trecho, a velocidade média é (25 + 35)/2 = 30 m/s, e 30 m/s × 2,0 s = 60 m.',
  deep: ['A velocidade média é a velocidade do instante do meio', `<p>No MUV, a velocidade varia por igual a cada segundo. Por isso, a velocidade média num intervalo é a média das velocidades inicial e final, que é exatamente a velocidade no instante do meio do intervalo:</p>
<div class="eq">v(t<sub>meio</sub>) = v<sub>i</sub> + a · ${f('Δt','2')}</div>
<div class="eq">v(t<sub>meio</sub>) = ${f('v<sub>i</sub> + v<sub>f</sub>','2')} = v<sub>m</sub></div>
<p>Aplicando aos dois trechos:</p>
<div class="eq">1º trecho: v<sub>m</sub> = ${f('60','4,0')} = 15 m/s</div>
<div class="eq">2º trecho: v<sub>m</sub> = ${f('60','2,0')} = 30 m/s</div>
<p>15 m/s é a velocidade em t = 2,0 s (meio do 1º trecho), e 30 m/s é a velocidade em t = 5,0 s (meio do 2º trecho, que vai de 4,0 s a 6,0 s). Entre esses instantes passam 3,0 s:</p>
<div class="eq">a = ${f('30 − 15','3,0')} = 5,0 m/s²</div>
<p>Repare que o intervalo certo é 3,0 s: dividir por 4,0 s, por 2,0 s ou por 6,0 s é justamente de onde vêm algumas alternativas erradas. Com essa ideia, qualquer problema de MUV com dois trechos seguidos se resolve em duas linhas.</p>`],
  warn: erros([['A) 3,8 m/s²:','dividiu a diferença das velocidades médias (15 m/s) por 4,0 s; elas valem nos meios dos trechos, separados por 3,0 s.'],['C) 6,7 m/s²:','supôs que o carro partiu do repouso no primeiro sensor (120 = a · 6²/2); ele já estava em movimento.'],['D) 7,5 m/s²:','dividiu a diferença das velocidades médias por 2,0 s.'],['E) 10 m/s²:','tomou 30 m/s como a variação da velocidade e dividiu por 3,0 s.']]) },

{ src: 'Inédita', nivel: 'avançado',
  mod: 'Inspirada no garoto de skate que joga a bolinha para cima (Ufrgs; questão 7): trem, alternativas em texto.',
  text: `<p>Dentro de um trem que se move em linha reta, na horizontal, com velocidade constante de 20 m/s em relação aos trilhos, um passageiro joga uma moeda verticalmente para cima, com velocidade de 3,0 m/s em relação a ele, e a apanha de volta na mesma altura. Despreze a resistência do ar e considere g = 10 m/s².</p>${FIG_U1_TREM}<p>Para uma pessoa parada na plataforma, a trajetória da moeda, do lançamento até ser apanhada, é</p>`,
  opts: ['uma parábola, com 0,45 m de altura e 12 m de alcance.','uma reta vertical, com 0,90 m de altura.','uma parábola, com 0,90 m de altura e 6,0 m de alcance.','uma parábola, com 0,90 m de altura e 12 m de alcance.','uma parábola, com 0,45 m de altura e 6,0 m de alcance.'], ans: 0,
  hint: 'Separe os movimentos. Na vertical, a pessoa na plataforma vê o mesmo que o passageiro? E na horizontal, a moeda acompanha o trem?',
  steps: [['Vertical (igual para os dois observadores)', `<div class="eq">h = ${f('v²','2g')} = ${f('3,0²','20')}</div><div class="eq">h = 0,45 m</div><div class="eq">t<sub>subida</sub> = ${f('3,0','10')} = 0,30 s</div><p>Tempo total no ar: 0,60 s.</p>`],
          ['Horizontal (vista da plataforma)', `<p>A moeda tem a velocidade horizontal do trem, 20 m/s, e a mantém (não há força horizontal):</p><div class="eq">x = 20 · 0,60</div><div class="eq">x = 12 m</div>`],
          ['Trajetória', '<p>Para quem está na plataforma, a moeda avança enquanto sobe e desce: <span class="hl">uma parábola com 0,45 m de altura e 12 m de alcance</span>. O passageiro vê uma reta vertical porque anda junto com a moeda.</p>']],
  alt: 'É a mesma física do drone que solta o pacote, vista ao contrário: lá, quem acompanha o objeto vê uma reta vertical e quem fica parado vê uma parábola. Aqui também.',
  deep: ['A equação da trajetória: por que é uma parábola', `<p>Para a pessoa na plataforma, tome a origem no ponto de lançamento. Os dois movimentos, em função do tempo:</p>
<div class="eq">x = 20 · t</div>
<div class="eq">y = 3,0 · t − 5 · t²</div>
<p>Da primeira equação, t = x/20. Substituindo na segunda, o tempo desaparece:</p>
<div class="eq">y = 3,0 · ${f('x','20')} − 5 · ${f('x²','400')}</div>
<div class="eq">y = 0,15 · x − ${f('x²','80')}</div>
<p>Uma função do 2º grau em x, com o termo de x² negativo: é uma parábola com concavidade para baixo. Ela vale zero em x = 0 e em x = 12 m (o alcance), e o vértice fica no meio, em x = 6,0 m:</p>
<div class="eq">y = 0,15 · 6 − ${f('36','80')} = 0,45 m</div>
<p>É a altura máxima, como na resolução. Para o passageiro, x fica sempre 0: a mesma equação vira uma reta vertical. O formato da trajetória depende do referencial; a física (a aceleração g) é a mesma para os dois.</p>`],
  warn: erros([['B) reta vertical, 0,90 m:','descreveu o que o passageiro vê, não a plataforma, e ainda calculou h = v²/g, sem o 2.'],['C) 0,90 m e 6,0 m:','esqueceu o 2 em h = v²/(2g) e usou só o tempo de subida (0,30 s) no alcance.'],['D) 0,90 m e 12 m:','acertou o alcance, mas esqueceu o 2 em h = v²/(2g).'],['E) 0,45 m e 6,0 m:','usou o tempo de subida (0,30 s) no lugar do tempo total no ar (0,60 s).']]) }
];

/* ===================================================================== */
/* ======================== LISTA 2 · DINÂMICA ========================= */
/* ===================================================================== */
const TOOLS_U2 = [
  ['Leis de Newton', `F<sub>R</sub> = m · a<br>ação e reação: mesmo módulo, sentidos opostos, em corpos diferentes`],
  ['Peso e plano inclinado', `P = m · g<br>P<sub>x</sub> = P · sen θ<br>P<sub>y</sub> = P · cos θ`],
  ['Atrito', `estático: f<sub>e</sub> ≤ μ<sub>e</sub> · N<br>cinético: f<sub>c</sub> = μ<sub>c</sub> · N`],
  ['Corpos ligados por fio ideal', `mesma tração nas duas pontas<br>mesma aceleração para os corpos`],
  ['Elevador e balança', `a balança indica a normal N<br>N − P = m · a (a para cima, positiva)`]
];

const FIG_U2_RAMPA30 = (() => { const R = rampaSVG({ang:30, rot:'30°'}); return figC('0 0 340 190', 'Esquema: rampa lisa inclinada de 30 graus com a horizontal, com uma caixa apoiada no meio da rampa.', `${R.svg}${caixaRampa(R, 0.55, 46, 30, 'caixa')}`, 380, 'Esquema fora de escala.'); })();

const FIG_U2_CAIXA = (() => { const [d, mk] = seta(AZ);
  return figC('0 0 340 140', 'Esquema: caixa apoiada no piso, empurrada para a direita por uma força horizontal de 120 newtons.',
  `${d}<rect x="150" y="54" width="90" height="66" fill="var(--surface)" stroke="var(--ink)" stroke-width="2"/><text x="195" y="92" text-anchor="middle" class="pt pt-strong">40 kg</text>
   <line x1="60" y1="87" x2="146" y2="87" stroke="${AZ}" stroke-width="3.5" marker-end="${mk}"/><text x="64" y="76" class="pt pt-strong" style="fill:${AZ}">F = 120 N</text>${chao(30, 320, 120)}`, 360); })();

const FIG_U2_MALA = (() => { const [d, mk] = seta(AZ);
  return figC('0 0 340 170', 'Esquema: mala de rodinhas sobre o piso, puxada pela alça com uma força de 40 newtons que forma 60 graus com a horizontal.',
  `${d}<rect x="70" y="64" width="110" height="70" rx="8" fill="var(--surface)" stroke="var(--ink)" stroke-width="2"/><circle cx="90" cy="142" r="8" fill="var(--ink)"/><circle cx="160" cy="142" r="8" fill="var(--ink)"/>
   <line x1="180" y1="76" x2="222" y2="4" stroke="var(--ink)" stroke-width="3" transform="translate(0 30)"/>
   <line x1="180" y1="106" x2="216" y2="44" stroke="${AZ}" stroke-width="3.5" marker-end="${mk}"/><text x="226" y="58" class="pt pt-strong" style="fill:${AZ}">F = 40 N</text>
   <line x1="180" y1="106" x2="250" y2="106" stroke="var(--muted)" stroke-width="1.4" stroke-dasharray="4 4"/>
   <path d="M210 106 A30 30 0 0 0 195 80" fill="none" stroke="var(--ink)" stroke-width="1.4"/><text x="214" y="96" class="pt pt-strong">60°</text>${chao(30, 320, 150)}`, 360, 'Esquema fora de escala.'); })();

const FIG_U2_CAIXAS = (() => { const [d, mk] = seta(AZ);
  return figC('0 0 340 140', 'Esquema: três caixas encostadas sobre uma superfície horizontal lisa: A, de 4,0 quilos, B, de 3,0 quilos, e C, de 1,0 quilo, nessa ordem da esquerda para a direita. Uma força horizontal de 24 newtons empurra a caixa A para a direita.',
  `${d}<line x1="20" y1="90" x2="76" y2="90" stroke="${AZ}" stroke-width="3.5" marker-end="${mk}"/><text x="22" y="78" class="pt pt-strong" style="fill:${AZ}">24 N</text>
   <rect x="80" y="50" width="80" height="70" fill="var(--surface)" stroke="var(--ink)" stroke-width="2"/><text x="120" y="82" text-anchor="middle" class="pt pt-strong">A</text><text x="120" y="100" text-anchor="middle" class="pt">4,0 kg</text>
   <rect x="160" y="64" width="70" height="56" fill="var(--surface)" stroke="var(--ink)" stroke-width="2"/><text x="195" y="90" text-anchor="middle" class="pt pt-strong">B</text><text x="195" y="107" text-anchor="middle" class="pt">3,0 kg</text>
   <rect x="230" y="78" width="62" height="42" fill="var(--surface)" stroke="var(--ink)" stroke-width="2"/><text x="261" y="96" text-anchor="middle" class="pt pt-strong">C</text><text x="261" y="112" text-anchor="middle" class="pt">1,0 kg</text>${chao(20, 320, 120)}`, 360); })();

const FIG_U2_MESA = (() => figC('0 0 340 200', 'Esquema: carrinho de 8,0 quilos sobre uma mesa horizontal, preso por um fio que passa por uma roldana na borda direita da mesa e sustenta um bloco de 2,0 quilos pendurado.',
  `<rect x="20" y="60" width="240" height="10" fill="var(--muted)"/><rect x="34" y="70" width="8" height="110" fill="var(--muted)"/><rect x="238" y="70" width="8" height="110" fill="var(--muted)"/>
   <rect x="70" y="26" width="80" height="26" rx="3" fill="var(--surface)" stroke="var(--ink)" stroke-width="2"/><circle cx="86" cy="56" r="4" fill="var(--ink)"/><circle cx="134" cy="56" r="4" fill="var(--ink)"/><text x="110" y="44" text-anchor="middle" class="pt pt-strong">8,0 kg</text>
   <line x1="150" y1="38" x2="270" y2="38" stroke="var(--ink)" stroke-width="1.6"/><circle cx="270" cy="50" r="12" fill="none" stroke="var(--ink)" stroke-width="2"/><line x1="262" y1="58" x2="258" y2="66" stroke="var(--ink)" stroke-width="2"/>
   <line x1="282" y1="50" x2="282" y2="112" stroke="var(--ink)" stroke-width="1.6"/><rect x="264" y="112" width="36" height="30" fill="var(--surface)" stroke="var(--ink)" stroke-width="2"/><text x="282" y="160" text-anchor="middle" class="pt pt-strong">2,0 kg</text>
   ${chao(14, 330, 182)}`, 380))();

const FIG_U2_OBRA = (() => { const [d, mk] = seta(VM);
  return figC('0 0 340 220', 'Esquema: roldana fixa no alto. De um lado do cabo, uma carga de 300 quilos, que desce; do outro lado, um contrapeso de 200 quilos.',
  `${d}<line x1="110" y1="14" x2="230" y2="14" stroke="var(--ink)" stroke-width="4"/><line x1="170" y1="14" x2="170" y2="36" stroke="var(--ink)" stroke-width="2"/>
   <circle cx="170" cy="50" r="22" fill="var(--surface)" stroke="var(--ink)" stroke-width="2.5"/><circle cx="170" cy="50" r="3" fill="var(--ink)"/>
   <line x1="148" y1="50" x2="148" y2="150" stroke="var(--ink)" stroke-width="1.8"/><line x1="192" y1="50" x2="192" y2="100" stroke="var(--ink)" stroke-width="1.8"/>
   <rect x="116" y="150" width="64" height="50" fill="var(--surface)" stroke="var(--ink)" stroke-width="2"/><text x="148" y="174" text-anchor="middle" class="pt pt-strong">carga</text><text x="148" y="190" text-anchor="middle" class="pt">300 kg</text>
   <rect x="174" y="100" width="40" height="34" fill="var(--line)" stroke="var(--ink)" stroke-width="2"/><text x="244" y="114" class="pt pt-strong">contrapeso</text><text x="244" y="130" class="pt">200 kg</text>
   <line x1="96" y1="150" x2="96" y2="196" stroke="${VM}" stroke-width="3" marker-end="${mk}"/><text x="60" y="176" class="pt pt-strong" style="fill:${VM}">desce</text>`, 360, 'Esquema fora de escala.'); })();

const GRAF_U2_CARRO = plot({aria:'Velocidade, em metros por segundo, em função do tempo, em segundos, de um carro. Intervalo I, de 0 a 10 segundos: a velocidade sobe em linha reta de 0 a 20. Intervalo II, de 10 a 30 segundos: velocidade constante de 20. Intervalo III, de 30 a 35 segundos: a velocidade cai em linha reta de 20 a 0.',
  xmin:0, xmax:35, ymin:0, ymax:25, xt:[0,5,10,15,20,25,30,35], yt:[0,5,10,15,20], xl:'t (s)', yl:'v (m/s)', l:40,
  L:[{p:[[0,0],[10,20],[30,20],[35,0]], c:VD},{p:[[10,0],[10,25]], c:'var(--muted)', dash:'4 4', w:1.4},{p:[[30,0],[30,25]], c:'var(--muted)', dash:'4 4', w:1.4}],
  ann:[[5,23,'I'],[20,23,'II'],[32.5,23,'III']]});

const FIG_U2_RAMPA37 = (() => { const R = rampaSVG({ang:37, rot:'37°', L:240}); return figC('0 0 340 220', 'Esquema: rampa inclinada de 37 graus com a horizontal, com um bloco apoiado nela, descendo.', `<g transform="translate(0 30)">${R.svg}${caixaRampa(R, 0.6, 44, 30, 'bloco')}</g>`, 360, 'Esquema fora de escala.'); })();

const GRAF_U2_ELEV = plot({aria:'Velocidade do elevador, em metros por segundo, em função do tempo, em segundos. De 0 a 2 segundos, a velocidade sobe em linha reta de 0 a 4. De 2 a 8 segundos, fica constante em 4. De 8 a 12 segundos, cai em linha reta de 4 a 0.',
  xmin:0, xmax:12, ymin:0, ymax:5, xt:[0,2,4,6,8,10,12], yt:[0,1,2,3,4], xl:'t (s)', yl:'v (m/s)', l:40,
  L:[{p:[[0,0],[2,4],[8,4],[12,0]], c:AZ}]});

const Q_U2 = [
{ src: 'Inédita', nivel: 'básico',
  mod: 'Inspirada no bloco no plano inclinado (Ufrgs; questão 13, literal): versão numérica.',
  text: `<p>Uma caixa de 20 kg desliza por uma rampa lisa, inclinada de 30° em relação à horizontal. Use g = 10 m/s², sen 30° = 0,50 e cos 30° = 0,87.</p>${FIG_U2_RAMPA30}<p>Assinale a alternativa que preenche corretamente as lacunas do enunciado abaixo, na ordem em que aparecem.</p><p>A componente do peso da caixa paralela à rampa tem módulo __________, e a força normal que a rampa exerce sobre a caixa tem módulo __________.</p>`,
  opts: ['10 N — 17 N.','174 N — 200 N.','100 N — 200 N.','174 N — 100 N.','100 N — 174 N.'], ans: 4,
  hint: 'O peso é vertical. Qual das duas componentes fica “deitada” ao longo da rampa e qual aponta para dentro dela? A força normal equilibra qual delas?',
  steps: [['Peso', `<div class="eq">P = m · g = 20 · 10</div><div class="eq">P = 200 N</div>`],
          ['Componentes', `<p>O ângulo entre o peso e a perpendicular à rampa é igual ao ângulo da rampa:</p><div class="eq">P<sub>x</sub> = P · sen 30° = 100 N</div><div class="eq">P<sub>y</sub> = P · cos 30° = 174 N</div>`],
          ['Normal', '<p>Não há movimento na direção perpendicular à rampa: a normal equilibra P<sub>y</sub>. Resposta: <span class="hl">100 N — 174 N</span>.</p>']],
  alt: 'Teste os extremos: com a rampa na horizontal (θ = 0°), a componente paralela some e N = P; com a rampa na vertical (θ = 90°), a normal some e o peso fica inteiro ao longo da rampa. O seno cresce de 0 a 1 e o cosseno cai de 1 a 0: exatamente esse comportamento.',
  warn: erros([['A) 10 N — 17 N:','usou a massa (20 kg) no lugar do peso (200 N).'],['B) 174 N — 200 N:','trocou seno por cosseno na componente paralela e ainda tomou a normal igual ao peso.'],['C) 100 N — 200 N:','acertou a componente paralela, mas a normal só é igual ao peso em superfície horizontal.'],['D) 174 N — 100 N:','trocou seno e cosseno: em 30°, a componente paralela é a menor das duas.']]) },

{ src: 'Inédita', nivel: 'básico',
  mod: 'Inspirada no gráfico do atrito estático (Ufrgs; questão 14): valor numérico do atrito com a caixa parada.',
  text: `<p>Uma caixa de 40 kg está em repouso no piso de um depósito. O coeficiente de atrito estático entre a caixa e o piso é 0,50. Um funcionário empurra a caixa com uma força horizontal de 120 N, mas ela não se move. Use g = 10 m/s².</p>${FIG_U2_CAIXA}<p>Nessa situação, a força de atrito que o piso exerce sobre a caixa tem módulo de</p>`,
  opts: ['0 N.','80 N.','120 N.','200 N.','320 N.'], ans: 2,
  hint: 'A caixa está parada: o que isso diz sobre a resultante das forças horizontais? E o produto μ · N é o atrito que sempre age ou um limite?',
  steps: [['Limite do atrito estático', `<div class="eq">f<sub>máx</sub> = μ<sub>e</sub> · N = 0,50 · 400</div><div class="eq">f<sub>máx</sub> = 200 N</div><p>Esse é o maior valor que o atrito estático consegue atingir.</p>`],
          ['Equilíbrio', '<p>A caixa continua em repouso: a resultante horizontal é nula, e o atrito equilibra exatamente a força aplicada, que ainda não chegou ao limite: f = <span class="hl">120 N</span>.</p>']],
  alt: 'Empurre com 50 N, 120 N e 190 N: o atrito responde com 50 N, 120 N e 190 N, e a caixa continua parada. Só a partir de 200 N ela começa a deslizar. O atrito estático “se ajusta” à força aplicada, até o limite μ · N.',
  warn: erros([['A) 0 N:','achou que, sem movimento, não há atrito; é justamente o atrito que segura a caixa.'],['B) 80 N:','subtraiu 120 de 200: o atrito não é o que “falta” para chegar ao limite.'],['D) 200 N:','usou μ · N, que é o valor máximo do atrito estático, não o valor nessa situação.'],['E) 320 N:','somou o limite do atrito com a força aplicada.']]) },

{ src: 'Inédita', nivel: 'básico',
  mod: 'Inspirada nos blocos A e B com força inclinada (Ufrgs; questão 15): mala de rodinhas.',
  text: `<p>Um viajante puxa uma mala de rodinhas de 8,0 kg por um saguão plano, aplicando na alça uma força de 40 N que forma 60° com a horizontal. Despreze os atritos e use g = 10 m/s², cos 60° = 0,50 e sen 60° = 0,87.</p>${FIG_U2_MALA}<p>O módulo da aceleração da mala é de</p>`,
  opts: ['0,25 m/s².','2,5 m/s².','4,3 m/s².','5,0 m/s².','20 m/s².'], ans: 1,
  hint: 'Só a parte da força que aponta na direção do movimento acelera a mala. Qual componente é essa, e que função do ângulo a dá?',
  steps: [['Componente horizontal', `<div class="eq">F<sub>x</sub> = F · cos 60° = 40 · 0,50</div><div class="eq">F<sub>x</sub> = 20 N</div><p>A componente vertical (cerca de 35 N) só diminui a força com que o piso empurra as rodinhas para cima.</p>`],
          ['Segunda lei', `<div class="eq">a = ${f('F<sub>x</sub>','m')} = ${f('20','8,0')}</div><div class="eq">a = <span class="hl">2,5 m/s²</span></div>`]],
  alt: 'Por isso, para acelerar, é melhor puxar com a alça mais “deitada”: a 30°, a componente horizontal seria 40 × 0,87 ≈ 35 N. A alça mais alta, por outro lado, alivia o peso apoiado nas rodinhas.',
  warn: erros([['A) 0,25 m/s²:','dividiu pelo peso da mala (80 N) em vez da massa (8,0 kg).'],['C) 4,3 m/s²:','usou o seno; para um ângulo medido a partir da horizontal, a componente horizontal é F · cos θ.'],['D) 5,0 m/s²:','usou a força inteira, como se a alça estivesse na horizontal.'],['E) 20 m/s²:','parou na componente da força (20 N); faltou dividir pela massa.']]) },

{ src: 'Inédita', nivel: 'intermediário',
  mod: 'Inspirada nos três blocos empurrados (Ufrgs; questão 26): massas, força e afirmações novas, sem a parte de energia.',
  text: `<p>Em uma linha de montagem, um braço mecânico empurra três caixas encostadas, A, B e C, de massas 4,0 kg, 3,0 kg e 1,0 kg, com uma força horizontal de 24 N aplicada em A. As caixas deslizam sobre uma superfície horizontal lisa.</p>${FIG_U2_CAIXAS}<p>Considere as seguintes afirmações.</p>${itens(['I. As três caixas têm aceleração de módulo 3,0 m/s².','II. A força que A exerce sobre B tem módulo de 24 N.','III. A força resultante sobre a caixa B tem módulo de 9,0 N.'])}<p>Quais estão corretas?</p>`,
  opts: ['Apenas I.','Apenas II.','Apenas I e II.','Apenas I e III.','Apenas II e III.'], ans: 3,
  hint: 'Primeiro, trate as três caixas como um corpo só para achar a aceleração. Depois, para a força de A sobre B, pergunte-se: quanta massa essa força precisa acelerar?',
  steps: [['I. Aceleração do conjunto', `<div class="eq">a = ${f('24','4,0 + 3,0 + 1,0')}</div><div class="eq">a = 3,0 m/s²</div><p>Correta.</p>`],
          ['II. Força de A sobre B', `<p>Essa força empurra B e C juntas:</p><div class="eq">F<sub>AB</sub> = (3,0 + 1,0) · 3,0</div><div class="eq">F<sub>AB</sub> = 12 N</div><p>Incorreta.</p>`],
          ['III. Resultante em B', `<div class="eq">F<sub>R,B</sub> = 3,0 · 3,0 = 9,0 N</div><p>Confere: A empurra B com 12 N e C empurra B de volta com 1,0 · 3,0 = 3,0 N; 12 − 3,0 = 9,0 N. Correta. Estão corretas <span class="hl">apenas I e III</span>.</p>`]],
  alt: 'A força de 24 N “se reparte” ao longo da fila: A fica com 12 N de resultante (4,0 kg × 3,0 m/s²) e passa 12 N adiante; B fica com 9,0 N e passa 3,0 N para C. Quanto mais perto do fim da fila, menor a força de contato.',
  warn: erros([['A) Apenas I:','a III também está certa: a resultante sobre B é m<sub>B</sub> · a = 9,0 N.'],['B) Apenas II:','a força aplicada em A não chega inteira em B: parte dela acelera a própria caixa A.'],['C) Apenas I e II:','mesmo engano da B: F<sub>AB</sub> vale 12 N, não 24 N.'],['E) Apenas II e III:','a II é falsa (24 N sobre B e C juntas dariam 6,0 m/s²), e a I é verdadeira: as três caixas aceleram juntas, a 3,0 m/s².']]) },

{ src: 'Inédita', nivel: 'intermediário',
  mod: 'Inspirada no bloco puxado por bloco suspenso (Ufrgs; questão 17): carrinho de laboratório, outras massas.',
  text: `<p>Em um laboratório, um carrinho de 8,0 kg desliza sem atrito sobre uma mesa horizontal. Ele está preso por um fio leve, que passa por uma roldana ideal na borda da mesa, a um bloco de 2,0 kg suspenso. O sistema é liberado a partir do repouso. Use g = 10 m/s².</p>${FIG_U2_MESA}<p>Durante o movimento, a tração no fio tem módulo de</p>`,
  opts: ['16 N.','20 N.','24 N.','80 N.','100 N.'], ans: 0,
  hint: 'A tração é igual ao peso do bloco suspenso? Se fosse, qual seria a resultante sobre o bloco, e ele aceleraria?',
  steps: [['Aceleração do sistema', `<p>Quem move o conjunto é o peso do bloco suspenso (20 N); a massa total é 10 kg:</p><div class="eq">a = ${f('20','8,0 + 2,0')}</div><div class="eq">a = 2,0 m/s²</div>`],
          ['Tração', `<p>No carrinho, a tração é a única força horizontal:</p><div class="eq">T = 8,0 · 2,0</div><div class="eq">T = <span class="hl">16 N</span></div><p>Conferindo no bloco suspenso: 20 − 16 = 2,0 · 2,0. Certo.</p>`]],
  alt: 'A tração fica sempre entre 0 e o peso do bloco suspenso. Com um carrinho levíssimo, T ficaria perto de zero e o bloco cairia quase em queda livre; com um carrinho pesadíssimo, T ficaria perto de 20 N e tudo andaria muito devagar.',
  warn: erros([['B) 20 N:','tomou a tração igual ao peso do bloco suspenso; aí a resultante nele seria zero, e ele não aceleraria.'],['C) 24 N:','escreveu T − P = m · a para o bloco suspenso, com o sinal trocado: ele acelera para baixo.'],['D) 80 N:','usou o peso do carrinho, que é equilibrado pela normal da mesa e não puxa o fio.'],['E) 100 N:','somou os pesos dos dois corpos.']]) },

{ src: 'Inédita', nivel: 'intermediário',
  mod: 'Inspirada na máquina de Atwood (Ufrgs; questão 18, literal): versão numérica com tração.',
  text: `<p>Em uma obra, uma carga de 300 kg é baixada por um cabo que passa por uma roldana fixa no alto; na outra ponta do cabo, há um contrapeso de 200 kg. Considere o cabo e a roldana ideais, despreze os atritos e use g = 10 m/s².</p>${FIG_U2_OBRA}<p>Assinale a alternativa que preenche corretamente as lacunas do enunciado abaixo, na ordem em que aparecem.</p><p>Durante a descida, o módulo da aceleração da carga é __________, e a tração no cabo tem módulo __________.</p>`,
  opts: ['2,0 m/s² — 2 000 N.','2,0 m/s² — 2 400 N.','3,3 m/s² — 2 400 N.','3,3 m/s² — 3 000 N.','10 m/s² — 2 000 N.'], ans: 1,
  hint: 'Os dois corpos se movem juntos, com acelerações de mesmo módulo. Que força “sobra” para acelerar o conjunto, e qual é a massa total que ela acelera?',
  steps: [['Aceleração', `<p>O peso da carga (3 000 N) puxa para um lado; o do contrapeso (2 000 N), para o outro:</p><div class="eq">a = ${f('3 000 − 2 000','300 + 200')}</div><div class="eq">a = 2,0 m/s²</div>`],
          ['Tração', `<p>O contrapeso sobe acelerando:</p><div class="eq">T − 2 000 = 200 · 2,0</div><div class="eq">T = 2 400 N</div><p>Conferindo na carga: 3 000 − 2 400 = 300 · 2,0. Resposta: <span class="hl">2,0 m/s² — 2 400 N</span>.</p>`]],
  alt: 'Sem o contrapeso, a carga cairia com 10 m/s². O contrapeso “segura” a descida para 2,0 m/s², por meio da tração: 2 400 N, menos que o peso da carga e mais que o do contrapeso, como tem de ser para um descer e o outro subir acelerando.',
  deep: ['Os casos limite da máquina de Atwood', `<p>Com massas M (a maior) e m quaisquer, as mesmas duas equações dão:</p>
<div class="eq">a = ${f('(M − m) · g','M + m')}</div>
<div class="eq">T = ${f('2 · M · m · g','M + m')}</div>
<p>Conferindo: T = 2 · 300 · 200 · 10/500 = 2 400 N. Agora, os extremos:</p>
<p><b>Contrapeso muito leve (m → 0):</b> a → g e T → 0. A carga cai praticamente em queda livre.</p>
<p><b>Contrapeso quase igual à carga (m → M):</b> a → 0 e T → M · g. O sistema quase se equilibra, e o cabo sustenta praticamente todo o peso. É o princípio dos elevadores: o contrapeso tem massa próxima à da cabina, e o motor só precisa vencer a pequena diferença.</p>
<p><b>Uso histórico:</b> George Atwood criou essa máquina no século XVIII justamente para “desacelerar” a queda dos corpos e conseguir medi-la com os relógios da época. Com massas parecidas, a aceleração fica pequena, e os tempos, fáceis de medir.</p>`],
  warn: erros([['A) 2,0 m/s² — 2 000 N:','acertou a aceleração, mas tomou a tração igual ao peso do contrapeso; aí ele não subiria acelerando.'],['C) 3,3 m/s² — 2 400 N:','dividiu a força resultante (1 000 N) só pela massa da carga; os dois corpos aceleram juntos.'],['D) 3,3 m/s² — 3 000 N:','dividiu só pela massa da carga e tomou a tração igual ao peso dela.'],['E) 10 m/s² — 2 000 N:','tratou a carga como em queda livre, como se o contrapeso não puxasse o cabo.']]) },

{ src: 'Inédita', nivel: 'intermediário',
  mod: 'Inédita, a partir da ideia de leitura de gráficos (Ufrgs; questões 10 e 11): segunda lei com gráfico v × t.',
  text: `<p>O gráfico mostra a velocidade de um carro de 1 000 kg em um trecho reto de estrada, em três intervalos: I (arrancada), II (velocidade constante) e III (freada).</p>${GRAF_U2_CARRO}<p>Os módulos da força resultante sobre o carro nos intervalos I, II e III são, respectivamente,</p>`,
  opts: ['2 000 N, 0 e 4 000 N.','2 000 N, 2 000 N e 4 000 N.','4 000 N, 0 e 2 000 N.','4 000 N, 4 000 N e 2 000 N.','20 000 N, 20 000 N e 0.'], ans: 0,
  hint: 'No gráfico v × t, a inclinação é a aceleração. Calcule a de cada intervalo. E, para manter a velocidade constante, é preciso força resultante?',
  steps: [['Acelerações', `<p>Intervalo I:</p><div class="eq">a = ${f('20','10')} = 2,0 m/s²</div><p>Intervalo II: a = 0.</p><p>Intervalo III (freando):</p><div class="eq">a = ${f('20','5,0')} = 4,0 m/s²</div>`],
          ['Forças resultantes', `<div class="eq">I: F<sub>R</sub> = 1 000 · 2,0</div><div class="eq">I: F<sub>R</sub> = 2 000 N</div><div class="eq">II: F<sub>R</sub> = 0</div><div class="eq">III: F<sub>R</sub> = 1 000 · 4,0</div><div class="eq">III: F<sub>R</sub> = 4 000 N</div><p>Resposta: <span class="hl">2 000 N, 0 e 4 000 N</span>.</p>`]],
  alt: 'No intervalo II, o motor continua fazendo força: ela só equilibra o atrito e a resistência do ar. Resultante nula não quer dizer “nenhuma força”, e sim forças que se cancelam (1ª lei de Newton).',
  warn: erros([['B) 2 000 N no intervalo II:','achou que é preciso força resultante para manter a velocidade; com v constante, a resultante é nula.'],['C) 4 000 N, 0 e 2 000 N:','trocou as inclinações: a freada (em 5 s) é mais brusca que a arrancada (em 10 s).'],['D) 4 000 N no intervalo II:','trocou as acelerações dos intervalos I e III e ainda pôs força resultante no intervalo II.'],['E) 20 000 N:','multiplicou a massa pela velocidade: m · v é quantidade de movimento, não força.']]) },

{ src: 'Inédita', nivel: 'avançado',
  mod: 'Inspirada no cabo de guerra (Ufrgs; questão 16): conceitual sobre 3ª lei e atrito, com corda leve.',
  text: `<p>No início de um cabo de guerra, as equipes A e B estão paradas, puxando a corda. Em seguida, a equipe A começa a arrastar a equipe B, e o conjunto passa a se mover, a partir do repouso, para o lado de A. Considere a corda leve (de massa desprezível) e horizontal.</p><p>Considere as seguintes afirmações sobre o início desse movimento.</p>${itens(['I. A força que a equipe A exerce sobre a corda e a força que a corda exerce sobre a equipe A têm o mesmo módulo.','II. A equipe A vence porque puxa a corda com uma força maior do que a força com que a equipe B a puxa.','III. A equipe A vence porque o chão exerce sobre os pés de seus integrantes uma força de atrito maior do que a que exerce sobre os pés da equipe B.'])}<p>Quais estão corretas?</p>`,
  opts: ['Apenas I.','Apenas III.','Apenas I e II.','Apenas II e III.','Apenas I e III.'], ans: 4,
  hint: 'Quais forças externas agem sobre o conjunto equipe A + corda + equipe B? A tração é interna a esse conjunto. E, pela 3ª lei, o que se pode dizer dos pares de forças?',
  steps: [['I. Ação e reação', '<p>A força da equipe A na corda e a da corda na equipe A formam um par ação-reação: mesmo módulo, sentidos opostos. Correta.</p>'],
          ['II. Corda leve', '<p>Para a corda, F<sub>R</sub> = m · a com m praticamente nula: as forças nas duas pontas têm de ter o mesmo módulo. Se fossem diferentes, a corda, sem massa, teria aceleração enorme. Incorreta.</p>'],
          ['III. Quem decide é o chão', '<p>No conjunto A + corda + B, as forças horizontais externas são os atritos do chão nos pés de cada equipe. O conjunto acelera para o lado de A: o atrito sobre A é maior que o atrito sobre B. Correta. Estão corretas <span class="hl">apenas I e III</span>.</p>']],
  alt: 'É por isso que equipes de cabo de guerra usam calçados de boa aderência e se inclinam para trás: o objetivo é conseguir mais atrito com o chão, e não “puxar mais forte” a corda.',
  warn: erros([['A) Apenas I:','a III também está certa: a força externa que faz o conjunto acelerar vem do chão.'],['B) Apenas III:','a I também está certa: é um par ação-reação.'],['C) Apenas I e II:','a II supõe forças diferentes nas pontas de uma corda sem massa, o que daria a ela aceleração enorme.'],['D) Apenas II e III:','com a corda leve, a tração é a mesma nas duas pontas, então a II é falsa; e a I é verdadeira (ação e reação).']]) },

{ src: 'Inédita', nivel: 'avançado',
  mod: 'Inédita, ligada ao corpo que desce o plano com velocidade constante (Ufrgs; questão 22): aqui pela dinâmica, com cálculo de μ.',
  text: `<p>Para testar o atrito de um piso novo, um técnico coloca um bloco de 5,0 kg sobre uma rampa revestida com o material, inclinada de 37° em relação à horizontal, e dá um leve empurrão inicial. A partir daí, o bloco desce a rampa com velocidade constante. Use g = 10 m/s², sen 37° = 0,60 e cos 37° = 0,80.</p>${FIG_U2_RAMPA37}<p>Assinale a alternativa que preenche corretamente as lacunas do enunciado abaixo, na ordem em que aparecem.</p><p>Durante a descida, a força de atrito sobre o bloco tem módulo __________, e o coeficiente de atrito cinético entre o bloco e a rampa vale __________.</p>`,
  opts: ['0 — 0.','30 N — 0,60.','30 N — 0,75.','40 N — 0,75.','40 N — 1,33.'], ans: 2,
  hint: 'Velocidade constante: quanto vale a resultante? Na direção da rampa, quais forças precisam se equilibrar? E o coeficiente de atrito compara o atrito com qual força?',
  steps: [['Componentes do peso', `<div class="eq">P = 5,0 · 10 = 50 N</div><div class="eq">P<sub>x</sub> = 50 · 0,60 = 30 N</div><div class="eq">P<sub>y</sub> = 50 · 0,80 = 40 N</div>`],
          ['Atrito', '<p>Com velocidade constante, a resultante é nula. Ao longo da rampa, o atrito equilibra a componente paralela do peso: f = 30 N. Perpendicularmente, N = P<sub>y</sub> = 40 N.</p>'],
          ['Coeficiente', `<div class="eq">μ = ${f('f','N')} = ${f('30','40')}</div><div class="eq">μ = 0,75</div><p>Resposta: <span class="hl">30 N — 0,75</span>.</p>`]],
  alt: 'Na prática, é assim que se mede μ: inclina-se a rampa aos poucos até o bloco descer sem acelerar. Num piso molhado (menos atrito), o bloco aceleraria a 37°, e a inclinação de teste teria de ser menor.',
  deep: ['De onde vem μ = tg θ (e o ângulo de repouso)', `<p>Refaça a conta com letras, para qualquer massa e qualquer ângulo em que o bloco desça com velocidade constante:</p>
<div class="eq">f = P · sen θ</div>
<div class="eq">N = P · cos θ</div>
<div class="eq">μ = ${f('P · sen θ','P · cos θ')} = tg θ</div>
<p>O peso se cancela: <b>a massa do bloco não importa</b>. Aqui, tg 37° = 0,60/0,80 = 0,75, o mesmo valor da resolução. Um bloco de 50 kg do mesmo material desceria a 37° também com velocidade constante.</p>
<p><b>Ângulo de repouso.</b> A mesma ideia explica por que montes de areia, grãos ou brita não ficam com encostas tão inclinadas quanto se queira: os grãos da superfície deslizam até a encosta atingir um ângulo máximo, ligado ao atrito entre eles. Por isso a areia úmida, cujos grãos “grudam” mais, permite castelos com paredes bem mais inclinadas que a areia seca.</p>`],
  warn: erros([['A) 0 — 0:','achou que velocidade constante dispensa atrito; sem atrito, o bloco aceleraria com g · sen θ = 6,0 m/s².'],['B) 30 N — 0,60:','acertou o atrito, mas dividiu pelo peso (50 N) em vez da normal (40 N).'],['D) 40 N — 0,75:','usou o cosseno para a componente paralela do peso; ela é P · sen θ.'],['E) 40 N — 1,33:','trocou seno e cosseno nas duas componentes.']]) },

{ src: 'Inédita', nivel: 'avançado',
  mod: 'Inspirada no estudante na balança do elevador (Ufrgs; questão 19): versão numérica a partir do gráfico v × t.',
  text: `<p>Uma pessoa de 60 kg está sobre uma balança, no piso de um elevador que sobe de um andar a outro. O gráfico mostra a velocidade do elevador em função do tempo. Use g = 10 m/s².</p>${GRAF_U2_ELEV}<p>Durante essa viagem, as indicações máxima e mínima da balança são, respectivamente,</p>`,
  opts: ['600 N e 600 N.','660 N e 540 N.','720 N e 480 N.','720 N e 540 N.','840 N e 360 N.'], ans: 3,
  hint: 'A balança mede a força normal, não o peso. Em que trecho a aceleração aponta para cima e em qual aponta para baixo? Calcule cada uma pela inclinação do gráfico.',
  steps: [['Acelerações', `<p>De 0 a 2 s, acelerando para cima:</p><div class="eq">a = ${f('4','2')} = 2,0 m/s²</div><p>De 2 s a 8 s: a = 0.</p><p>De 8 s a 12 s, freando (aceleração para baixo):</p><div class="eq">a = ${f('4','4')} = 1,0 m/s²</div>`],
          ['Normal em cada trecho', `<div class="eq">N<sub>1</sub> = 60 · (10 + 2,0) = 720 N</div><div class="eq">N<sub>2</sub> = 60 · 10 = 600 N</div><div class="eq">N<sub>3</sub> = 60 · (10 − 1,0) = 540 N</div><p>Máxima e mínima: <span class="hl">720 N e 540 N</span>.</p>`]],
  alt: 'É por isso que nos sentimos “mais pesados” quando o elevador arranca para cima e “mais leves” quando ele freia na chegada. Se o elevador caísse em queda livre (a = g para baixo), a balança marcaria zero.',
  warn: erros([['A) 600 N e 600 N:','supôs que a balança sempre indica o peso; ela indica a normal, que muda com a aceleração.'],['B) 660 N e 540 N:','usou a aceleração da freada (1,0 m/s²) também na arrancada.'],['C) 720 N e 480 N:','usou 2,0 m/s² também na freada; ela dura 4 s, então a = 1,0 m/s².'],['E) 840 N e 360 N:','usou a velocidade (4 m/s) como se fosse a aceleração.']]) }
];

/* ===================================================================== */
/* ===================== LISTA 3 · TRABALHO E ENERGIA ================== */
/* ===================================================================== */
const TOOLS_U3 = [
  ['Trabalho', `força constante: τ = F · d · cos θ<br>peso: τ<sub>P</sub> = ± m · g · h (+ descendo, − subindo)`],
  ['Energias', `E<sub>c</sub> = ${f('m · v²','2')}<br>E<sub>p</sub> = m · g · h<br>E<sub>el</sub> = ${f('k · x²','2')}`],
  ['Teorema da energia cinética', `τ<sub>total</sub> = ΔE<sub>c</sub>`],
  ['Energia mecânica', `sem atrito: E<sub>m</sub> = E<sub>c</sub> + E<sub>p</sub> constante<br>com atrito: energia dissipada = |τ<sub>atrito</sub>|`],
  ['Gráfico F × x e lei de Hooke', `área = trabalho<br>mola: F = k · x`]
];

const FIG_U3_CAMINHOS = (() => {
  const [d2, mk2] = seta('var(--ink)');
  let esp = 'M70 40'; for (let k = 1; k <= 60; k++){ const u = k / 60; esp += ` L${(70 + 240 * u).toFixed(1)} ${(40 + 130 * u + 16 * Math.sin(u * 4 * Math.PI)).toFixed(1)}`; }
  return figC('0 0 340 200', 'Esquema: do alto de um brinquedo, à esquerda, a 2,5 metros acima do chão, saem três caminhos até o chão, à direita: 1, um escorregador reto, de 3,0 metros; 2, um tobogã curvo, de 4,0 metros; 3, um tobogã sinuoso, de 5,0 metros.',
  `${d2}<rect x="40" y="34" width="34" height="8" fill="var(--muted)"/><rect x="44" y="42" width="6" height="128" fill="var(--muted)"/>
   <line x1="74" y1="40" x2="190" y2="170" stroke="${AZ}" stroke-width="3"/><text x="118" y="100" class="pt pt-strong" style="fill:${AZ}">1</text>
   <path d="M74 40 Q110 160 250 170" fill="none" stroke="${LJ}" stroke-width="3" stroke-dasharray="8 5"/><text x="168" y="150" class="pt pt-strong" style="fill:${LJ}">2</text>
   <path d="${esp}" fill="none" stroke="${VD}" stroke-width="3" stroke-dasharray="2 4"/><text x="262" y="132" class="pt pt-strong" style="fill:${VD}">3</text>
   <line x1="22" y1="40" x2="22" y2="170" stroke="var(--ink)" stroke-width="1.2" marker-start="${mk2}" marker-end="${mk2}"/><text x="12" y="105" class="pt pt-strong" transform="rotate(-90 12 105)" text-anchor="middle">2,5 m</text>
   ${chao(14, 330, 172)}`, 380, 'Esquema fora de escala. Comprimentos: caminho 1, 3,0 m; caminho 2, 4,0 m; caminho 3, 5,0 m.');
})();

const FIG_U3_RAMPA = (() => { const R = rampaSVG({ang:36.87, L:240}); const [d, mk] = seta(AZ), [d2, mk2] = seta('var(--ink)');
  const p1 = R.at(0.18), p2 = R.at(0.32);
  return figC('0 0 340 230', 'Esquema: rampa com 5,0 metros de comprimento que vence uma altura de 3,0 metros, até a carroceria de um caminhão, à direita. Uma caixa está na rampa, empurrada rampa acima por uma força paralela a ela.',
  `${d}${d2}<g transform="translate(0 40)">${R.svg}${caixaRampa(R, 0.42, 40, 28, '')}
   <line x1="${(p1[0] - 8).toFixed(1)}" y1="${(p1[1] - 12).toFixed(1)}" x2="${(p2[0] - 8).toFixed(1)}" y2="${(p2[1] - 12).toFixed(1)}" stroke="${AZ}" stroke-width="3.5" marker-end="${mk}"/>
   <text x="${(p1[0] - 6).toFixed(1)}" y="${(p1[1] - 26).toFixed(1)}" class="pt pt-strong" style="fill:${AZ}">F</text>
   <rect x="270" y="-10" width="64" height="12" fill="var(--muted)"/>
   <line x1="288" y1="2" x2="288" y2="170" stroke="var(--ink)" stroke-width="1.2" marker-start="${mk2}" marker-end="${mk2}"/><text x="296" y="94" class="pt pt-strong">3,0 m</text>
   <text x="170" y="112" class="pt pt-strong" transform="rotate(-36.87 170 112)">5,0 m</text></g>`, 380, 'Esquema fora de escala.'); })();

const GRAF_U3_FX = plot({aria:'Força, em newtons, em função da posição, em metros. De 0 a 2 metros, a força é constante e vale 8 newtons. De 2 a 6 metros, cai em linha reta de 8 newtons até zero.',
  xmin:0, xmax:6, ymin:0, ymax:10, xt:[0,1,2,3,4,5,6], yt:[0,2,4,6,8], xl:'x (m)', yl:'F (N)', l:40,
  L:[{p:[[0,8],[2,8],[6,0]], c:LJ}]});

const GRAF_U3_DRONE = plot({aria:'Altura do drone, em metros, em função do tempo, em segundos. Pontos medidos em 0, 2, 4 e 6 segundos, com alturas 0, 2, 8 e 18 metros, ligados por uma curva que se ajusta à função y igual a 0,5 vezes t ao quadrado.',
  xmin:0, xmax:6, ymin:0, ymax:20, xt:[0,1,2,3,4,5,6], yt:[0,2,4,6,8,10,12,14,16,18], xl:'t (s)', yl:'y (m)', l:40,
  L:[{p:Array.from({length:31}, (_, k) => [k * 0.2, +(0.5 * (k * 0.2) ** 2).toFixed(3)]), c:AZ, w:2}], pts:[[2,2],[4,8],[6,18]]});

const FIG_U3_ESCORREGA = (() => { const R = rampaSVG({ang:30, L:260}); const [d2, mk2] = seta('var(--ink)');
  return figC('0 0 340 210', 'Esquema: caixote descendo uma rampa de carga, do alto, a 3,0 metros de altura, à esquerda, até o piso, à direita.',
  `${d2}<g transform="translate(340 30) scale(-1 1)">${R.svg}${caixaRampa(R, 0.7, 40, 28, '')}</g>
   <line x1="22" y1="50" x2="22" y2="200" stroke="var(--ink)" stroke-width="1.2" marker-start="${mk2}" marker-end="${mk2}"/><text x="14" y="125" class="pt pt-strong" transform="rotate(-90 14 125)" text-anchor="middle">3,0 m</text>`, 380, 'Esquema fora de escala.'); })();

const FIG_U3_ESTILINGUE = (() => { const [d2, mk2] = seta('var(--ink)');
  return figC('0 0 340 170', 'Esquema simplificado de um estilingue visto de cima: a forquilha à direita, com o elástico preso nas duas pontas e puxado para a esquerda, com uma pedrinha no meio. A linha tracejada mostra o elástico relaxado; a pedrinha foi recuada 20 centímetros a partir dessa linha.',
  `${d2}<path d="M250 30 L250 110 M250 70 L326 70" fill="none" stroke="var(--ink)" stroke-width="7" stroke-linecap="round"/>
   <line x1="250" y1="30" x2="250" y2="110" stroke="var(--muted)" stroke-width="2" stroke-dasharray="4 4" transform="translate(-8 0)"/>
   <path d="M250 30 L152 70 L250 110" fill="none" stroke="${LJ}" stroke-width="3"/><circle cx="146" cy="70" r="8" fill="var(--muted)"/>
   <line x1="146" y1="132" x2="242" y2="132" stroke="var(--ink)" stroke-width="1.2" marker-start="${mk2}" marker-end="${mk2}"/><text x="194" y="152" text-anchor="middle" class="pt pt-strong">x = 20 cm</text>
   <text x="120" y="52" text-anchor="middle" class="pt pt-strong">pedrinha</text><text x="296" y="96" text-anchor="middle" class="pt">forquilha</text>`, 360, 'Esquema simplificado, visto de cima e fora de escala.'); })();

const FIG_U3_MASSAMOLA = (() => { const [d, mk] = seta(AZ), [d2, mk2] = seta('var(--ink)');
  let mola = 'M24 80'; for (let k = 1; k <= 14; k++) mola += ` L${24 + k * 9} ${k % 2 ? 70 : 90}`; mola += ' L150 80';
  return figC('0 0 340 170', 'Esquema: carrinho preso a uma mola horizontal, presa a uma parede à esquerda. O carrinho oscila entre duas posições extremas, tracejadas, a 10 centímetros de cada lado da posição de equilíbrio O. Em O, o carrinho passa com velocidade de 0,50 metro por segundo.',
  `${d}${d2}<rect x="10" y="40" width="14" height="80" fill="var(--muted)"/><path d="${mola}" fill="none" stroke="var(--ink)" stroke-width="2"/>
   <rect x="150" y="60" width="50" height="40" fill="var(--surface)" stroke="var(--ink)" stroke-width="2"/><text x="175" y="85" text-anchor="middle" class="pt pt-strong">2,0 kg</text>
   <rect x="100" y="60" width="50" height="40" fill="none" stroke="var(--muted)" stroke-width="1.4" stroke-dasharray="4 4"/><rect x="200" y="60" width="50" height="40" fill="none" stroke="var(--muted)" stroke-width="1.4" stroke-dasharray="4 4"/>
   <line x1="175" y1="102" x2="175" y2="128" stroke="var(--ink)" stroke-width="1.2"/><text x="175" y="142" text-anchor="middle" class="pt pt-strong">O</text>
   <line x1="125" y1="120" x2="175" y2="120" stroke="var(--ink)" stroke-width="1.2" marker-start="${mk2}" marker-end="${mk2}"/><text x="150" y="114" text-anchor="middle" class="pt">10 cm</text>
   <line x1="175" y1="120" x2="225" y2="120" stroke="var(--ink)" stroke-width="1.2" marker-start="${mk2}" marker-end="${mk2}"/><text x="200" y="114" text-anchor="middle" class="pt">10 cm</text>
   <line x1="180" y1="48" x2="230" y2="48" stroke="${AZ}" stroke-width="3" marker-end="${mk}"/><text x="236" y="44" class="pt pt-strong" style="fill:${AZ}">0,50 m/s em O</text>
   <line x1="10" y1="100" x2="330" y2="100" stroke="var(--ink)" stroke-width="2"/>`, 380, 'Esquema fora de escala; os contornos tracejados são as posições extremas.'); })();

const FIG_U3_TUBOS = (() => {
  const mola = (x, y0, h) => { let s = `M${x} ${y0}`; const n = 10; for (let k = 1; k <= n; k++) s += ` L${x + (k % 2 ? -12 : 12)} ${y0 - k * h / n}`; return `<path d="${s} L${x} ${y0 - h}" fill="none" stroke="var(--ink)" stroke-width="2"/>`; };
  return figC('0 0 340 200', 'Esquema: dois tubos verticais com uma mola no fundo de cada um. No tubo I, uma bolinha de massa m comprime a mola de x. No tubo II, uma bolinha de massa 2m comprime a mesma mola de 3x.',
  `<rect x="60" y="20" width="60" height="160" fill="none" stroke="var(--ink)" stroke-width="2"/><rect x="220" y="20" width="60" height="160" fill="none" stroke="var(--ink)" stroke-width="2"/>
   ${mola(90, 180, 70)}${mola(250, 180, 40)}
   <circle cx="90" cy="98" r="12" fill="${AZ}"/><text x="90" y="102" text-anchor="middle" class="pt pt-car">m</text>
   <circle cx="250" cy="124" r="16" fill="${LJ}"/><text x="250" y="128" text-anchor="middle" class="pt pt-car">2m</text>
   <text x="134" y="150" class="pt pt-strong">x</text><text x="294" y="166" class="pt pt-strong">3x</text>
   <text x="90" y="196" text-anchor="middle" class="pt pt-strong">I</text><text x="250" y="196" text-anchor="middle" class="pt pt-strong">II</text>`, 360, 'Esquema fora de escala. Mesma mola nos dois tubos: comprimida de x no tubo I e de 3x no tubo II.'); })();

const Q_U3 = [
{ src: 'Inédita', nivel: 'básico',
  mod: 'Inspirada nos trabalhos do peso nas trajetórias 1, 2 e 3 (Ufrgs; questão 20): brinquedo de parque, valores numéricos.',
  text: `<p>Em um parque, uma criança de 30 kg pode ir do alto de um brinquedo até o chão por três caminhos: um escorregador reto (1), um tobogã curvo (2) e um tobogã sinuoso (3), com 3,0 m, 4,0 m e 5,0 m de comprimento, respectivamente. O ponto de partida fica 2,5 m acima do ponto de chegada. Use g = 10 m/s².</p>${FIG_U3_CAMINHOS}<p>O trabalho realizado pelo peso da criança, do alto até o chão, é de</p>`,
  opts: ['−750 J nos três caminhos.','750 J nos três caminhos.','750 J, 1 000 J e 1 250 J, respectivamente.','900 J, 1 200 J e 1 500 J, respectivamente.','zero nos três caminhos.'], ans: 1,
  hint: 'O peso é vertical. Que parte do deslocamento conta para o trabalho dele: o comprimento do caminho ou outra medida da figura? E o peso ajuda ou atrapalha a descida?',
  steps: [['Só o desnível conta', '<p>O peso é vertical: em cada trechinho do caminho, só a parte vertical do deslocamento conta para o trabalho dele. Somando tudo, sobra o desnível total, 2,5 m, qualquer que seja o caminho (o peso é uma força conservativa).</p>'],
          ['Cálculo', `<p>A criança desce, no mesmo sentido do peso: o trabalho é positivo.</p><div class="eq">τ<sub>P</sub> = m · g · h = 30 · 10 · 2,5</div><div class="eq">τ<sub>P</sub> = <span class="hl">750 J</span> nos três caminhos</div>`]],
  alt: 'Num trecho reto e inclinado, τ = P · d · cos θ, e d · cos θ (com θ medido entre o peso e o caminho) é exatamente quanto a criança desceu. Num caminho mais longo, o peso age por mais metros, mas cada metro é mais “deitado”: as duas coisas se compensam.',
  warn: erros([['A) −750 J:','o peso aponta para baixo e a criança desce: o trabalho do peso é positivo (motor).'],['C) cresce com o caminho:','achou que o trabalho cresce com o comprimento do caminho; só o desnível importa.'],['D) peso × comprimento:','multiplicou o peso pelo comprimento de cada caminho, como se o peso tivesse a direção do caminho.'],['E) zero:','confundiu o trabalho do peso com o trabalho total; se a criança chega parada embaixo, é porque o atrito “gastou” os 750 J.']]) },

{ src: 'Inédita', nivel: 'básico',
  mod: 'Inspirada na energia cinética da bolinha de gude (Ufrgs; questão 25): patinete, com foco na proporção E ∝ v².',
  text: '<p>Um estudante e seu patinete elétrico têm, juntos, 80 kg. Em uma ciclovia plana, ele aumenta a velocidade de 5,0 m/s para 10 m/s.</p><p>Ao final, a energia cinética do conjunto é de</p>',
  opts: ['800 J.','2 000 J.','3 000 J.','4 000 J.','8 000 J.'], ans: 3,
  hint: 'A velocidade dobrou. A energia cinética também só dobra? Olhe como a velocidade aparece na fórmula.',
  steps: [['Energia cinética final', `<div class="eq">E<sub>c</sub> = ${f('m · v²','2')} = ${f('80 · 10²','2')}</div><div class="eq">E<sub>c</sub> = <span class="hl">4 000 J</span></div>`],
          ['Comparando', `<p>No início, E<sub>c</sub> = 80 · 5,0²/2 = 1 000 J. A velocidade dobrou, e a energia ficou <b>quatro</b> vezes maior, porque depende de v².</p>`]],
  alt: 'Dobrar a velocidade quadruplica a energia cinética. É por isso que, com o mesmo atrito, a 10 m/s o patinete precisa de quatro vezes mais distância para frear do que a 5 m/s: há quatro vezes mais energia para dissipar.',
  warn: erros([['A) 800 J:','calculou m · v (80 × 10), que é a quantidade de movimento, em kg · m/s.'],['B) 2 000 J:','supôs que a energia dobra junto com a velocidade.'],['C) 3 000 J:','calculou a variação da energia cinética (4 000 − 1 000), não o valor final.'],['E) 8 000 J:','esqueceu o ½ da fórmula.']]) },

{ src: 'Inédita', nivel: 'básico',
  mod: 'Inspirada na caixa empurrada no plano inclinado 3-4-5 (Ufrgs; questão 21): rampa de caminhão, outros números, lacunas.',
  text: `<p>Para colocar uma caixa de 40 kg na carroceria de um caminhão, um carregador a empurra rampa acima com uma força de 300 N, paralela à rampa. A rampa tem 5,0 m de comprimento e vence uma altura de 3,0 m. Use g = 10 m/s².</p>${FIG_U3_RAMPA}<p>Assinale a alternativa que preenche corretamente as lacunas do enunciado abaixo, na ordem em que aparecem.</p><p>Do início ao fim da rampa, o trabalho realizado pela força do carregador é __________, e o trabalho realizado pelo peso da caixa é __________.</p>`,
  opts: ['900 J — −1 200 J.','1 200 J — −2 000 J.','1 200 J — 1 200 J.','1 500 J — −2 000 J.','1 500 J — −1 200 J.'], ans: 4,
  hint: 'A força do carregador tem a direção do deslocamento ao longo da rampa. O peso é vertical: que parte do deslocamento conta para ele? E ele ajuda ou atrapalha a subida?',
  steps: [['Força do carregador', `<p>Paralela ao deslocamento de 5,0 m:</p><div class="eq">τ<sub>F</sub> = 300 · 5,0</div><div class="eq">τ<sub>F</sub> = 1 500 J</div>`],
          ['Peso', `<p>Só a subida de 3,0 m conta, e o peso é contrário a ela:</p><div class="eq">τ<sub>P</sub> = −40 · 10 · 3,0</div><div class="eq">τ<sub>P</sub> = −1 200 J</div><p>Resposta: <span class="hl">1 500 J — −1 200 J</span>.</p>`]],
  alt: 'Os dois trabalhos não se anulam: sobram 300 J, que viram energia cinética da caixa ou são dissipados por atrito (o enunciado não informa). A rampa não economiza energia; ela permite usar uma força menor que o peso (400 N), em troca de um caminho maior.',
  warn: erros([['A) 900 J — −1 200 J:','multiplicou a força do carregador pela altura; ela é paralela à rampa e age ao longo dos 5,0 m.'],['B) 1 200 J — −2 000 J:','trocou os deslocamentos: usou a distância horizontal (4,0 m) para a força e o comprimento da rampa para o peso.'],['C) 1 200 J — 1 200 J:','usou a distância horizontal para a força e esqueceu o sinal do trabalho do peso, que é resistente na subida.'],['D) 1 500 J — −2 000 J:','multiplicou o peso pelo comprimento da rampa; para o peso, só conta a altura.']]) },

{ src: 'Inédita', nivel: 'intermediário',
  mod: 'Inspirada nas questões do gráfico F × x (Ufrgs; questões 23 e 24): trapézio, trabalho e velocidade.',
  text: `<p>Em um trilho de testes horizontal e sem atrito, um carrinho de 4,0 kg parte do repouso, empurrado por um motor cuja força, na direção do movimento, varia com a posição conforme o gráfico.</p>${GRAF_U3_FX}<p>Assinale a alternativa que preenche corretamente as lacunas do enunciado abaixo, na ordem em que aparecem.</p><p>Do início até x = 6,0 m, o trabalho realizado pela força é __________, e, em x = 6,0 m, o módulo da velocidade do carrinho é __________.</p>`,
  opts: ['16 J — 2,8 m/s.','24 J — 3,5 m/s.','32 J — 4,0 m/s.','32 J — 16 m/s.','48 J — 4,9 m/s.'], ans: 2,
  hint: 'O trabalho é a área sob o gráfico: divida-a em figuras simples. Depois, como o trabalho se relaciona com a energia cinética de quem partiu do repouso?',
  steps: [['Área sob o gráfico', `<p>Retângulo, de 0 a 2 m:</p><div class="eq">8 · 2 = 16 J</div><p>Triângulo, de 2 m a 6 m:</p><div class="eq">${f('4 · 8','2')} = 16 J</div><div class="eq">τ = 16 + 16 = 32 J</div>`],
          ['Teorema da energia cinética', `<p>Partindo do repouso, τ = E<sub>c</sub>:</p><div class="eq">32 = ${f('4,0 · v²','2')}</div><div class="eq">v² = 16</div><div class="eq">v = 4,0 m/s</div><p>Resposta: <span class="hl">32 J — 4,0 m/s</span>.</p>`]],
  alt: 'Mesmo depois de x = 2 m, quando a força começa a diminuir, o carrinho continua ganhando velocidade: enquanto a força tiver o sentido do movimento, o trabalho dela é positivo. A velocidade só para de crescer em x = 6 m, quando a força chega a zero.',
  deep: ['A área sob o F × x de uma mola: de onde vem k · x²/2', `<p>Para esticar ou comprimir uma mola, a força não é constante: pela lei de Hooke, ela começa em zero e cresce junto com a deformação, F = k · x. No gráfico F × x, isso é uma reta que sai da origem.</p>
<p>O trabalho para deformar a mola até x é a área do triângulo sob essa reta, com base x e altura k · x:</p>
<div class="eq">τ = ${f('x · (k · x)','2')}</div>
<div class="eq">τ = ${f('k · x²','2')}</div>
<p>Esse trabalho fica guardado na mola como energia potencial elástica. Por isso a fórmula tem o ½: ele vem do triângulo, porque a força média durante a deformação é metade da força final.</p>
<p>Exemplo: uma mola de k = 400 N/m comprimida 0,10 m faz, no fim, força de 40 N, mas armazena 0,10 · 40/2 = 2,0 J, e não 0,10 · 40 = 4,0 J. É a mesma ideia de dividir esta questão em retângulo e triângulo, e você vai usá-la de novo nas questões com estilingue e com massa-mola desta lista.</p>`],
  warn: erros([['A) 16 J — 2,8 m/s:','contou só o retângulo (0 a 2 m) e esqueceu o triângulo.'],['B) 24 J — 3,5 m/s:','calculou um triângulo só, de base 6 m e altura 8 N, como se a força começasse a cair em x = 0.'],['D) 32 J — 16 m/s:','acertou o trabalho, mas parou em v² = 16 e esqueceu a raiz.'],['E) 48 J — 4,9 m/s:','multiplicou 8 N por 6 m, como se a força fosse constante o tempo todo.']]) },

{ src: 'Inédita', nivel: 'intermediário',
  mod: 'Inspirada no foguete Saturno V com y = 1,25t² (Ufrgs; questão 28): drone, gráfico com pontos e distratores de energia.',
  text: `<p>Um drone de 2,0 kg decola verticalmente a partir do repouso. Sensores registram sua altura em vários instantes, e os pontos medidos se ajustam à função y = 0,5 · t², com y em metros e t em segundos, como mostra o gráfico.</p>${GRAF_U3_DRONE}<p>No instante t = 6,0 s, a energia cinética do drone é de</p>`,
  opts: ['36 J.','72 J.','324 J.','360 J.','396 J.'], ans: 0,
  hint: 'Compare y = 0,5 · t² com a função horária de quem parte do repouso com aceleração constante, y = a · t²/2. Qual é a aceleração? E a velocidade em 6,0 s?',
  steps: [['Aceleração', `<p>Comparando y = 0,5 · t² com y = a · t²/2:</p><div class="eq">${f('a','2')} = 0,5</div><div class="eq">a = 1,0 m/s²</div>`],
          ['Velocidade em 6,0 s', `<div class="eq">v = a · t = 1,0 · 6,0</div><div class="eq">v = 6,0 m/s</div>`],
          ['Energia cinética', `<div class="eq">E<sub>c</sub> = ${f('2,0 · 6,0²','2')}</div><div class="eq">E<sub>c</sub> = <span class="hl">36 J</span></div>`]],
  alt: 'Sem a função: de 0 a 6,0 s, a velocidade média é 18 m/6,0 s = 3,0 m/s. Partindo do repouso com aceleração constante, a velocidade final é o dobro da média: 6,0 m/s.',
  warn: erros([['B) 72 J:','esqueceu o ½ da energia cinética.'],['C) 324 J:','usou a altura em 6,0 s (18 m) como se fosse a velocidade.'],['D) 360 J:','calculou a energia potencial (m · g · h = 2,0 · 10 · 18), outra grandeza.'],['E) 396 J:','somou as energias cinética e potencial (energia mecânica); a pergunta é só a cinética.']]) },

{ src: 'Inédita', nivel: 'intermediário',
  mod: 'Inspirada no corpo que desce o plano com velocidade constante (Ufrgs; questão 22): valores numéricos e energia dissipada.',
  text: `<p>Em uma transportadora, um caixote de 20 kg desce uma rampa de carga com velocidade constante, de uma altura de 3,0 m até o piso. Use g = 10 m/s².</p>${FIG_U3_ESCORREGA}<p>Assinale a alternativa que preenche corretamente as lacunas do enunciado abaixo, na ordem em que aparecem.</p><p>Na descida, o trabalho do peso do caixote é __________, o trabalho da força de atrito é __________, e a energia mecânica dissipada é __________.</p>`,
  opts: ['60 J — −60 J — 60 J.','−600 J — 600 J — zero.','−600 J — 600 J — 600 J.','600 J — −600 J — zero.','600 J — −600 J — 600 J.'], ans: 4,
  hint: 'Velocidade constante: quanto vale a variação da energia cinética? Pelo teorema da energia cinética, como ficam os trabalhos? E para onde vai a energia potencial que o caixote perde?',
  steps: [['Trabalho do peso', `<p>O caixote desce, no sentido do peso:</p><div class="eq">τ<sub>P</sub> = 20 · 10 · 3,0 = +600 J</div>`],
          ['Trabalho do atrito', `<p>A velocidade é constante, então ΔE<sub>c</sub> = 0. A normal não realiza trabalho (é perpendicular ao movimento):</p><div class="eq">τ<sub>P</sub> + τ<sub>at</sub> = 0</div><div class="eq">τ<sub>at</sub> = −600 J</div>`],
          ['Energia dissipada', '<p>A energia potencial caiu 600 J e a cinética não mudou: a energia mecânica diminuiu 600 J, transformados em energia térmica. Resposta: <span class="hl">600 J — −600 J — 600 J</span>.</p>']],
  alt: 'Se a rampa fosse lisa, os mesmos 600 J virariam energia cinética, e o caixote chegaria ao piso a cerca de 7,7 m/s. Com o atrito, ele chega com a mesma velocidade com que começou, e a rampa e o caixote esquentam um pouco.',
  warn: erros([['A) 60 J:','usou a massa (20 kg) sem multiplicar por g.'],['B) −600 J — 600 J — zero:','trocou os sinais (o peso ajuda a descida) e ainda achou que a energia mecânica se conserva.'],['C) −600 J — 600 J — 600 J:','trocou os sinais: na descida, o peso realiza trabalho positivo, e o atrito, negativo.'],['D) zero:','acertou os trabalhos, mas a energia mecânica não se conserva quando há atrito: ela diminuiu 600 J.']]) },

{ src: 'Inédita', nivel: 'intermediário',
  mod: 'Inspirada no arco e flecha (Ufrgs; questão 27): estilingue modelado como mola, outros números.',
  text: `<p>Em um modelo simplificado de estilingue, o elástico se comporta como uma mola: para esticá-lo 20 cm, é preciso aplicar uma força de 80 N. Uma pedrinha de 40 g é colocada no elástico, que é esticado 20 cm e solto. Suponha que toda a energia armazenada no elástico seja transferida para a pedrinha.</p>${FIG_U3_ESTILINGUE}<p>A pedrinha sai do estilingue com velocidade de módulo</p>`,
  opts: ['0,63 m/s.','14 m/s.','20 m/s.','28 m/s.','400 m/s.'], ans: 2,
  hint: 'Primeiro, a constante elástica, pela lei de Hooke. A energia armazenada não é F · x: a força não foi 80 N durante todo o esticamento. E cuidado com as unidades.',
  steps: [['Constante elástica', `<div class="eq">k = ${f('F','x')} = ${f('80','0,20')}</div><div class="eq">k = 400 N/m</div>`],
          ['Energia armazenada', `<div class="eq">E<sub>el</sub> = ${f('400 · 0,20²','2')}</div><div class="eq">E<sub>el</sub> = 8,0 J</div>`],
          ['Velocidade', `<p>Com m = 40 g = 0,040 kg:</p><div class="eq">8,0 = ${f('0,040 · v²','2')}</div><div class="eq">v² = 400</div><div class="eq">v = <span class="hl">20 m/s</span></div>`]],
  alt: 'Atalho pela força média: durante o esticamento, a força vai de 0 a 80 N, com média de 40 N. 40 N × 0,20 m = 8,0 J, a mesma energia.',
  warn: erros([['A) 0,63 m/s:','usou a massa em gramas (40) em vez de quilogramas (0,040).'],['B) 14 m/s:','esqueceu o ½ da energia cinética.'],['D) 28 m/s:','calculou a energia como F · x = 16 J, como se a força fosse 80 N o tempo todo.'],['E) 400 m/s:','parou em v² = 400 e esqueceu a raiz.']]) },

{ src: 'Inédita', nivel: 'avançado',
  mod: 'Inspirada no sistema massa-mola (Ufrgs; questão 29): trilho de ar, valores novos, lacunas.',
  text: `<p>Em um trilho de ar, um carrinho de 2,0 kg preso a uma mola oscila na horizontal, sem atrito. Uma câmera mostra que ele se afasta, no máximo, 10 cm da posição de equilíbrio (O), para cada lado, e passa por O com velocidade de 0,50 m/s.</p>${FIG_U3_MASSAMOLA}<p>Assinale a alternativa que preenche corretamente as lacunas do enunciado abaixo, na ordem em que aparecem.</p><p>A energia mecânica do sistema é de __________, e a constante elástica da mola vale __________.</p>`,
  opts: ['0,25 J — 25 N/m.','0,25 J — 50 N/m.','0,50 J — 5,0 N/m.','0,50 J — 50 N/m.','0,50 J — 100 N/m.'], ans: 1,
  hint: 'Em que ponto do movimento toda a energia é cinética, e em que ponto ela é toda elástica? Use cada um desses pontos para uma das lacunas.',
  steps: [['Energia em O', `<p>Na posição de equilíbrio, a mola não está deformada: toda a energia é cinética.</p><div class="eq">E = ${f('2,0 · 0,50²','2')}</div><div class="eq">E = 0,25 J</div>`],
          ['Energia no extremo', `<p>A 10 cm de O, o carrinho para por um instante: toda a energia é elástica.</p><div class="eq">${f('k · 0,10²','2')} = 0,25</div><div class="eq">k = 50 N/m</div><p>Resposta: <span class="hl">0,25 J — 50 N/m</span>.</p>`]],
  alt: 'No extremo, a velocidade é zero, mas a aceleração é máxima: a mola puxa com F = k · x = 50 × 0,10 = 5,0 N, e a = 5,0/2,0 = 2,5 m/s², apontando para O.',
  warn: erros([['A) 0,25 J — 25 N/m:','acertou a energia, mas, ao isolar k, esqueceu o 2: k = 2E/x².'],['C) 0,50 J — 5,0 N/m:','esqueceu o ½ da energia cinética e não elevou a deformação ao quadrado (k = E/x).'],['D) 0,50 J — 50 N/m:','esqueceu o ½ nas duas energias: os dois erros se cancelam no k, mas a energia sai o dobro.'],['E) 0,50 J — 100 N/m:','esqueceu o ½ da energia cinética; com a energia dobrada, o k também sai o dobro.']]) },

{ src: 'Inédita', nivel: 'avançado',
  mod: 'Inspirada no lançador de mola com massa 2m e compressão 2X (Ufrgs; questão 30): massa 2m e compressão 3x.',
  text: `<p>Um brinquedo lança bolinhas verticalmente para cima por meio de uma mola comprimida dentro de um tubo. Com uma bolinha de massa m e a mola comprimida de x, a bolinha sobe até uma altura h, medida a partir do ponto em que é liberada. Em seguida, usa-se uma bolinha de massa 2m, com a mesma mola comprimida de 3x. Despreze atritos, a resistência do ar e a variação de altura durante a distensão da mola.</p>${FIG_U3_TUBOS}<p>Nesse segundo lançamento, a bolinha sobe até a altura</p>`,
  opts: ['0,5 h.','1,5 h.','2,25 h.','4,5 h.','9 h.'], ans: 3,
  hint: 'Iguale a energia elástica à energia potencial no ponto mais alto e isole a altura. Depois, veja o que acontece com essa expressão quando x vira 3x e m vira 2m.',
  steps: [['Primeiro lançamento', `<div class="eq">${f('k · x²','2')} = m · g · h</div><div class="eq">h = ${f('k · x²','2 · m · g')}</div>`],
          ['Segundo lançamento', `<div class="eq">H = ${f('k · (3x)²','2 · (2m) · g')}</div><div class="eq">H = ${f('9','2')} · ${f('k · x²','2 · m · g')}</div><div class="eq">H = <span class="hl">4,5 h</span></div>`]],
  alt: 'Por partes: triplicar a compressão multiplica a energia por 9 (o x está ao quadrado); dobrar a massa faz cada metro de subida “custar” o dobro, e a altura cai pela metade. 9 ÷ 2 = 4,5.',
  warn: erros([['A) 0,5 h:','considerou só a massa dobrada e esqueceu a compressão maior.'],['B) 1,5 h:','tratou a energia elástica como proporcional a x, sem o quadrado (3 ÷ 2).'],['C) 2,25 h:','dividiu pelo quadrado da massa (9 ÷ 4); a altura é inversamente proporcional a m, não a m².'],['E) 9 h:','considerou só a compressão e esqueceu que a bolinha é mais pesada.']]) },

{ src: 'Inédita', nivel: 'avançado',
  mod: 'Inspirada no lançamento na Terra e na Lua (Ufrgs; questão 31): Terra e Marte, com tempo de subida e energia mecânica.',
  text: '<p>Em um experimento pensado para uma futura base em Marte, uma mesma pedra é lançada verticalmente para cima com velocidade de 8,0 m/s, na Terra e em Marte. Considere g = 10 m/s² na Terra e g = 4,0 m/s² em Marte (valor aproximado) e despreze a resistência do ar. Tome o ponto de lançamento como nível de referência da energia potencial.</p><p>Considere as seguintes afirmações.</p><p>I. Em Marte, a pedra sobe 2,5 vezes mais alto do que na Terra.<br>II. A pedra leva o mesmo tempo para atingir o ponto mais alto nos dois planetas.<br>III. A energia mecânica da pedra em Marte é menor que na Terra, porque lá a gravidade é mais fraca.</p><p>Quais estão corretas?</p>',
  opts: ['Apenas I.','Apenas II.','Apenas III.','Apenas I e II.','Apenas I e III.'], ans: 0,
  hint: 'Escreva a altura máxima e o tempo de subida em função de g. E, com a referência no ponto de lançamento, quanto vale a energia mecânica da pedra logo no início, nos dois planetas?',
  steps: [['I. Alturas', `<div class="eq">h = ${f('v²','2g')}</div><div class="eq">Terra: h = ${f('64','20')} = 3,2 m</div><div class="eq">Marte: h = ${f('64','8,0')} = 8,0 m</div><p>8,0/3,2 = 2,5. Correta.</p>`],
          ['II. Tempos de subida', `<div class="eq">t = ${f('v','g')}</div><div class="eq">Terra: 0,80 s ; Marte: 2,0 s</div><p>Incorreta.</p>`],
          ['III. Energia mecânica', `<p>No lançamento, E<sub>p</sub> = 0 e a energia mecânica é toda cinética, m · 8,0²/2, igual nos dois planetas. Sem resistência do ar, ela se conserva. Incorreta. Está correta <span class="hl">apenas a I</span>.</p>`]],
  alt: 'Nos dois planetas, a pedra troca a mesma energia cinética inicial por energia potencial. Em Marte, cada metro de subida custa menos energia (g menor), então ela sobe mais metros, e demora mais para fazer isso.',
  warn: erros([['B) Apenas II:','o tempo de subida é v/g: com g menor, a pedra demora mais (2,0 s contra 0,80 s).'],['C) Apenas III:','a energia mecânica depende da energia cinética inicial, que é a mesma; g só muda como ela se transforma em altura.'],['D) Apenas I e II:','a II é falsa: o tempo de subida só seria igual com a mesma gravidade.'],['E) Apenas I e III:','a III é falsa: com a referência no ponto de lançamento, a energia mecânica é a mesma nos dois planetas.']]) }
];

/* ===================================================================== */
/* ============= LISTA 4 · COLISÕES, IMPULSO E CENTRO DE MASSA ========= */
/* ===================================================================== */
const TOOLS_U4 = [
  ['Quantidade de movimento', `Q = m · v (vetor)<br>sistema isolado: Q<sub>antes</sub> = Q<sub>depois</sub>`],
  ['Impulso', `I = F · Δt = ΔQ<br>gráfico F × t: área = impulso`],
  ['Colisões', `elástica: a energia cinética se conserva<br>perfeitamente inelástica: os corpos seguem juntos (maior perda de E<sub>c</sub>)`],
  ['Centro de massa', `v<sub>CM</sub> = ${f('m₁ · v₁ + m₂ · v₂','m₁ + m₂')}<br>sem força externa: v<sub>CM</sub> constante`],
  ['Energias', `E<sub>c</sub> = ${f('m · v²','2')} = ${f('Q²','2m')}<br>E<sub>el</sub> = ${f('k · x²','2')}`]
];

const carrinho = (x, y, w, rot, cor) => `<rect x="${x}" y="${y}" width="${w}" height="34" rx="4" fill="${cor || 'var(--eq-bg)'}" stroke="var(--ink)" stroke-width="2"/><circle cx="${x + 12}" cy="${y + 38}" r="5" fill="var(--ink)"/><circle cx="${x + w - 12}" cy="${y + 38}" r="5" fill="var(--ink)"/><text x="${x + w / 2}" y="${y + 22}" text-anchor="middle" class="pt pt-strong">${rot}</text>`;

const FIG_U4_CARRINHOS = (() => { const [d, mk] = seta(AZ), [d2, mk2] = seta(LJ);
  return figC('0 0 340 130', 'Esquema: trilho horizontal. À esquerda, o carrinho A, de 2,0 quilos, move-se para a direita a 6,0 metros por segundo. À direita, o carrinho B, de 1,0 quilo, move-se para a esquerda a 3,0 metros por segundo.',
  `${d}${d2}${carrinho(40, 60, 80, 'A · 2,0 kg')}${carrinho(220, 60, 80, 'B · 1,0 kg')}
   <line x1="60" y1="44" x2="120" y2="44" stroke="${AZ}" stroke-width="3" marker-end="${mk}"/><text x="60" y="34" class="pt pt-strong" style="fill:${AZ}">6,0 m/s</text>
   <line x1="280" y1="44" x2="236" y2="44" stroke="${LJ}" stroke-width="3" marker-end="${mk2}"/><text x="236" y="34" class="pt pt-strong" style="fill:${LJ}">3,0 m/s</text>
   <line x1="10" y1="104" x2="330" y2="104" stroke="var(--ink)" stroke-width="2"/>`, 360); })();

const FIG_U4_VAGOES = (() => { const [d, mk] = seta(AZ);
  return figC('0 0 340 120', 'Esquema antes do choque: nos mesmos trilhos, o vagão 1, de 2 000 quilos, move-se para a direita a 3,0 metros por segundo em direção ao vagão 2, de 1 000 quilos, parado.',
  `${d}${carrinho(30, 50, 110, '1 · 2 000 kg')}${carrinho(220, 50, 90, '2 · 1 000 kg')}
   <line x1="50" y1="36" x2="120" y2="36" stroke="${AZ}" stroke-width="3" marker-end="${mk}"/><text x="50" y="26" class="pt pt-strong" style="fill:${AZ}">3,0 m/s</text><text x="265" y="34" text-anchor="middle" class="pt">parado</text>
   <line x1="10" y1="94" x2="330" y2="94" stroke="var(--ink)" stroke-width="2"/><line x1="10" y1="98" x2="330" y2="98" stroke="var(--muted)" stroke-width="1"/>`, 360, 'Esquema antes do choque, fora de escala.'); })();

const GRAF_U4_CHUTE = plot({aria:'Força do pé sobre a bola, em newtons, em função do tempo, em milissegundos. A força cresce em linha reta de zero, em 0, até 2 400 newtons, em 5 milissegundos, e volta em linha reta a zero em 10 milissegundos, formando um triângulo.',
  xmin:0, xmax:10, ymin:0, ymax:2800, xt:[0,1,2,3,4,5,6,7,8,9,10], yt:[0,600,1200,1800,2400], xl:'t (ms)', yl:'F (N)', l:50,
  L:[{p:[[0,0],[5,2400],[10,0]], c:VM}]});

const FIG_U4_DISCOS = (() => { const [d, mk] = seta(AZ), [d2, mk2] = seta(LJ);
  return figC('0 0 340 120', 'Esquema: mesa de ar vista de cima. O disco A, de 2,0 quilos, move-se para a direita a 3,0 metros por segundo; o disco B, de 2,0 quilos, move-se para a esquerda a 1,0 metro por segundo, um em direção ao outro.',
  `${d}${d2}<rect x="8" y="8" width="324" height="104" rx="10" fill="none" stroke="var(--muted)" stroke-width="1.5"/>
   <circle cx="90" cy="70" r="24" fill="var(--surface)" stroke="var(--ink)" stroke-width="2"/><text x="90" y="75" text-anchor="middle" class="pt pt-strong">A</text>
   <circle cx="250" cy="70" r="24" fill="var(--surface)" stroke="var(--ink)" stroke-width="2"/><text x="250" y="75" text-anchor="middle" class="pt pt-strong">B</text>
   <line x1="70" y1="40" x2="140" y2="40" stroke="${AZ}" stroke-width="3" marker-end="${mk}"/><text x="70" y="28" class="pt pt-strong" style="fill:${AZ}">3,0 m/s</text>
   <line x1="270" y1="40" x2="226" y2="40" stroke="${LJ}" stroke-width="3" marker-end="${mk2}"/><text x="226" y="28" class="pt pt-strong" style="fill:${LJ}">1,0 m/s</text>`, 360, 'Vista de cima; cada disco tem 2,0 kg.'); })();

const FIG_U4_TRILHO = (() => { const [d, mk] = seta(VM);
  let mola = 'M270 70'; for (let k = 1; k <= 10; k++) mola += ` L${270 + k * 5} ${k % 2 ? 60 : 80}`; mola += ' L326 70';
  return figC('0 0 340 120', 'Esquema: trilho de ar horizontal. À esquerda, um carrinho de 0,50 quilo recebe uma batida rápida para a direita. No fim do trilho, à direita, há uma mola presa a um batente.',
  `${d}${carrinho(60, 52, 70, '0,50 kg')}<line x1="18" y1="69" x2="54" y2="69" stroke="${VM}" stroke-width="4" marker-end="${mk}"/><text x="14" y="50" class="pt pt-strong" style="fill:${VM}">batida</text>
   <path d="${mola}" fill="none" stroke="var(--ink)" stroke-width="2"/><rect x="326" y="40" width="10" height="56" fill="var(--muted)"/><text x="292" y="40" text-anchor="middle" class="pt">mola</text>
   <line x1="10" y1="96" x2="330" y2="96" stroke="var(--ink)" stroke-width="2"/>`, 360, 'Esquema fora de escala.'); })();

const FIG_U4_PATINS = (() => figC('0 0 340 120', 'Esquema: pista de gelo. Ana, de 50 quilos, e Bruno, de 75 quilos, estão parados, um de frente para o outro, com as mãos encostadas.',
  `<circle cx="140" cy="30" r="10" fill="${AZ}"/><line x1="140" y1="40" x2="140" y2="76" stroke="${AZ}" stroke-width="5"/><line x1="140" y1="52" x2="166" y2="52" stroke="${AZ}" stroke-width="4"/><line x1="140" y1="76" x2="130" y2="100" stroke="${AZ}" stroke-width="4"/><line x1="140" y1="76" x2="150" y2="100" stroke="${AZ}" stroke-width="4"/>
   <circle cx="196" cy="26" r="12" fill="${LJ}"/><line x1="196" y1="38" x2="196" y2="76" stroke="${LJ}" stroke-width="6"/><line x1="196" y1="52" x2="168" y2="52" stroke="${LJ}" stroke-width="4"/><line x1="196" y1="76" x2="186" y2="100" stroke="${LJ}" stroke-width="4"/><line x1="196" y1="76" x2="206" y2="100" stroke="${LJ}" stroke-width="4"/>
   <text x="92" y="60" text-anchor="middle" class="pt pt-strong" style="fill:${AZ}">Ana · 50 kg</text><text x="256" y="60" text-anchor="middle" class="pt pt-strong" style="fill:${LJ}">Bruno · 75 kg</text>
   <line x1="20" y1="102" x2="320" y2="102" stroke="#7FB6D9" stroke-width="3"/>`, 360, 'Esquema antes do empurrão.'))();

const FIG_U4_CRUZ = (() => { const [d, mk] = seta(AZ), [d2, mk2] = seta(LJ), [d3, mk3] = seta('var(--ink)');
  return figC('0 0 340 220', 'Esquema visto de cima de um cruzamento. O carro A, de 1 200 quilos, vem do sul rumo ao norte a 10 metros por segundo. O carro B, de 800 quilos, vem do oeste rumo ao leste a 15 metros por segundo. Os dois se encontram no centro do cruzamento.',
  `${d}${d2}${d3}<rect x="140" y="10" width="60" height="200" fill="var(--line)"/><rect x="10" y="80" width="320" height="60" fill="var(--line)"/>
   <rect x="156" y="160" width="28" height="44" rx="5" fill="${AZ}"/><text x="210" y="196" class="pt pt-strong" style="fill:${AZ}">A · 1 200 kg</text>
   <line x1="170" y1="156" x2="170" y2="120" stroke="${AZ}" stroke-width="3" marker-end="${mk}"/><text x="210" y="178" class="pt pt-strong" style="fill:${AZ}">10 m/s</text>
   <rect x="20" y="96" width="44" height="28" rx="5" fill="${LJ}"/><text x="18" y="160" class="pt pt-strong" style="fill:${LJ}">B · 800 kg</text>
   <line x1="68" y1="110" x2="126" y2="110" stroke="${LJ}" stroke-width="3" marker-end="${mk2}"/><text x="70" y="74" class="pt pt-strong" style="fill:${LJ}">15 m/s</text>
   <line x1="300" y1="56" x2="300" y2="22" stroke="var(--ink)" stroke-width="2" marker-end="${mk3}"/><text x="300" y="70" text-anchor="middle" class="pt pt-strong">N</text>`, 360, 'Vista de cima, fora de escala.'); })();

const FIG_U4_BARCO = (() => { const [d2, mk2] = seta('var(--ink)');
  return figC('0 0 340 150', 'Esquema: barco visto de lado, parado na água. O pescador está na popa, à esquerda, e vai caminhar 4,0 metros em relação ao barco, até a proa, à direita.',
  `${d2}<path d="M30 80 L310 80 L280 116 L60 116 Z" fill="var(--surface)" stroke="var(--ink)" stroke-width="2"/>
   <circle cx="66" cy="36" r="7" fill="var(--ink)"/><line x1="66" y1="43" x2="66" y2="66" stroke="var(--ink)" stroke-width="3"/><line x1="66" y1="66" x2="60" y2="80" stroke="var(--ink)" stroke-width="3"/><line x1="66" y1="66" x2="72" y2="80" stroke="var(--ink)" stroke-width="3"/>
   <line x1="66" y1="22" x2="276" y2="22" stroke="var(--ink)" stroke-width="1.2" marker-start="${mk2}" marker-end="${mk2}"/><text x="171" y="16" text-anchor="middle" class="pt pt-strong">4,0 m (em relação ao barco)</text>
   <text x="56" y="100" class="pt">popa</text><text x="264" y="100" class="pt">proa</text>
   <path d="M10 118 Q30 112 50 118 T90 118 T130 118 T170 118 T210 118 T250 118 T290 118 T330 118" fill="none" stroke="#7FB6D9" stroke-width="2.5"/>`, 380, 'Esquema fora de escala; pescador de 60 kg e barco de 140 kg.'); })();

const Q_U4 = [
{ src: 'Inédita', nivel: 'básico',
  mod: 'Inspirada na esfera em queda (Ufrgs; questão 32, literal): manga, valores numéricos.',
  text: '<p>Uma manga de 0,40 kg se solta do galho e cai, a partir do repouso, durante 1,5 s até atingir o chão. Despreze a resistência do ar e use g = 10 m/s².</p><p>Ao atingir o chão, o módulo da quantidade de movimento da manga é de</p>',
  opts: ['3,0 kg·m/s.','6,0 kg·m/s.','9,0 kg·m/s.','15 kg·m/s.','45 kg·m/s.'], ans: 1,
  hint: 'Primeiro, a velocidade de chegada, que depende do tempo de queda. Depois, a quantidade de movimento é a massa vezes o quê?',
  steps: [['Velocidade ao chegar', `<div class="eq">v = g · t = 10 · 1,5</div><div class="eq">v = 15 m/s</div>`],
          ['Quantidade de movimento', `<div class="eq">Q = m · v = 0,40 · 15</div><div class="eq">Q = <span class="hl">6,0 kg·m/s</span></div>`]],
  alt: 'Pelo teorema do impulso: o peso da manga (4,0 N) age durante 1,5 s, com impulso de 4,0 × 1,5 = 6,0 N·s, que é exatamente a quantidade de movimento que ela ganha.',
  warn: erros([['A) 3,0 kg·m/s:','usou a velocidade média da queda (7,5 m/s) em vez da velocidade ao chegar ao chão.'],['C) 9,0 kg·m/s:','elevou o tempo ao quadrado (m · g · t²), como na fórmula da posição.'],['D) 15 kg·m/s:','parou na velocidade e esqueceu de multiplicar pela massa.'],['E) 45 kg·m/s:','calculou a energia cinética (m · v²/2), que é outra grandeza, em joules.']]) },

{ src: 'Inédita', nivel: 'básico',
  mod: 'Inspirada no centro de massa das partículas A e B (Ufrgs; questão 33): carrinhos em sentidos opostos, cálculo numérico.',
  text: `<p>Em um trilho de ar, o carrinho A, de 2,0 kg, move-se para a direita a 6,0 m/s, enquanto o carrinho B, de 1,0 kg, move-se para a esquerda a 3,0 m/s.</p>${FIG_U4_CARRINHOS}<p>O módulo da velocidade do centro de massa do sistema formado pelos dois carrinhos é de</p>`,
  opts: ['3,0 m/s.','4,5 m/s.','5,0 m/s.','6,0 m/s.','9,0 m/s.'], ans: 0,
  hint: 'A velocidade do centro de massa é uma média ponderada pelas massas. E as velocidades de sentidos opostos entram na conta com que sinal?',
  steps: [['Sinais', '<p>Adote positivo para a direita: v<sub>A</sub> = +6,0 m/s e v<sub>B</sub> = −3,0 m/s.</p>'],
          ['Média ponderada', `<div class="eq">v<sub>CM</sub> = ${f('2,0 · 6,0 + 1,0 · (−3,0)','2,0 + 1,0')}</div><div class="eq">v<sub>CM</sub> = ${f('9,0','3,0')} = <span class="hl">3,0 m/s</span></div><p>Para a direita.</p>`]],
  alt: 'O centro de massa se move como se toda a massa do sistema (3,0 kg) estivesse concentrada nele, com a quantidade de movimento total: 9,0 kg·m/s para a direita. Como não há força externa horizontal, isso vale antes, durante e depois de uma eventual colisão.',
  warn: erros([['B) 4,5 m/s:','fez a média simples das velocidades, sem pesar as massas e sem o sinal: (6,0 + 3,0)/2.'],['C) 5,0 m/s:','somou as quantidades de movimento sem considerar o sentido de B: (12 + 3,0)/3,0.'],['D) 6,0 m/s:','tomou a velocidade do carrinho mais pesado como a do centro de massa.'],['E) 9,0 m/s:','calculou a quantidade de movimento total e não dividiu pela massa total.']]) },

{ src: 'Inédita', nivel: 'básico',
  mod: 'Inspirada na colisão frontal com recuo (Ufrgs; questão 34): vagões, e aqui a colisão é elástica.',
  text: `<p>Em um pátio ferroviário, um vagão de 2 000 kg, a 3,0 m/s, choca-se com outro, de 1 000 kg, parado nos mesmos trilhos retilíneos. Logo após o choque, o primeiro vagão continua no mesmo sentido, a 1,0 m/s. Despreze os atritos durante o choque.</p>${FIG_U4_VAGOES}<p>Assinale a alternativa que preenche corretamente as lacunas do enunciado abaixo, na ordem em que aparecem.</p><p>Logo após o choque, o segundo vagão se move com velocidade de módulo __________, e a colisão é __________.</p>`,
  opts: ['2,0 m/s — inelástica.','4,0 m/s — inelástica.','4,0 m/s — elástica.','6,0 m/s — elástica.','8,0 m/s — inelástica.'], ans: 2,
  hint: 'A conservação da quantidade de movimento dá a velocidade. Depois, compare a energia cinética total antes e depois do choque: não suponha que toda colisão perde energia.',
  steps: [['Quantidade de movimento', `<p>Antes, só o primeiro vagão se move; depois, ele segue a 1,0 m/s (valores em kg·m/s):</p><div class="eq">Q<sub>antes</sub> = 2 000 · 3,0 = 6 000</div><div class="eq">Q<sub>depois</sub> = 2 000 + 1 000 · v</div><div class="eq">6 000 = 2 000 + 1 000 · v</div><div class="eq">v = 4,0 m/s</div>`],
          ['Energias cinéticas', `<div class="eq">antes: ${f('2 000 · 3,0²','2')} = 9 000 J</div><div class="eq">vagão 1: ${f('2 000 · 1,0²','2')} = 1 000 J</div><div class="eq">vagão 2: ${f('1 000 · 4,0²','2')} = 8 000 J</div><div class="eq">depois: 9 000 J</div><p>A energia cinética se conservou: <span class="hl">4,0 m/s — elástica</span>.</p>`]],
  alt: 'Confira pela velocidade relativa: antes, os vagões se aproximavam a 3,0 m/s; depois, se afastam a 4,0 − 1,0 = 3,0 m/s. Velocidade de afastamento igual à de aproximação (coeficiente de restituição 1) é a marca da colisão elástica.',
  warn: erros([['A) 2,0 m/s:','subtraiu as velocidades do primeiro vagão (3,0 − 1,0) sem levar em conta as massas.'],['B) 4,0 m/s — inelástica:','acertou a velocidade, mas não comparou as energias; aqui elas são iguais.'],['D) 6,0 m/s:','esqueceu que o primeiro vagão continua andando depois do choque e fica com parte da quantidade de movimento.'],['E) 8,0 m/s:','trocou o sinal da quantidade de movimento final do primeiro vagão (6 000 + 2 000).']]) },

{ src: 'Inédita', nivel: 'intermediário',
  mod: 'Inspirada no gráfico F × t do motor a jato (Ufrgs; questão 37): chute, impulso pela área e velocidade.',
  text: `<p>Um sensor na chuteira de um jogador registrou a força que o pé exerce sobre uma bola de 0,40 kg, inicialmente parada, durante o chute. O gráfico mostra o modelo simplificado dessa força, que dura 10 ms.</p>${GRAF_U4_CHUTE}<p>Desprezando outras forças durante o contato, a bola sai do pé com velocidade de módulo</p>`,
  opts: ['4,8 m/s.','12 m/s.','15 m/s.','30 m/s.','60 m/s.'], ans: 3,
  hint: 'A área sob o gráfico F × t é o impulso, e o impulso muda a quantidade de movimento da bola. Atenção à unidade do tempo.',
  steps: [['Impulso (área do triângulo)', `<p>Com 10 ms = 0,010 s:</p><div class="eq">I = ${f('0,010 · 2 400','2')}</div><div class="eq">I = 12 N·s</div>`],
          ['Velocidade', `<p>A bola partiu do repouso: I = m · v.</p><div class="eq">v = ${f('12','0,40')}</div><div class="eq">v = <span class="hl">30 m/s</span></div>`]],
  alt: 'A força média do chute é 1 200 N (metade do pico), cerca de 300 vezes o peso da bola. Quanto mais curto o contato, maior a força necessária para o mesmo impulso.',
  warn: erros([['A) 4,8 m/s:','multiplicou o impulso pela massa em vez de dividir.'],['B) 12 m/s:','parou no impulso (12 N·s) e o tomou como velocidade.'],['C) 15 m/s:','calculou a área só até o pico da força (5 ms), metade do contato.'],['E) 60 m/s:','calculou a área como a de um retângulo (2 400 N × 10 ms), sem o ½ do triângulo.']]) },

{ src: 'Inédita', nivel: 'intermediário',
  mod: 'Inspirada nos corpos X e Y em colisão elástica e perfeitamente inelástica (Ufrgs; questão 36): discos de mesa de ar.',
  text: `<p>Em uma mesa de hóquei de ar, dois discos de 2,0 kg cada movem-se um em direção ao outro: A, a 3,0 m/s, para a direita, e B, a 1,0 m/s, para a esquerda. Considere duas situações: na primeira, a colisão é elástica; na segunda, os discos ficam grudados após o choque. Despreze os atritos.</p>${FIG_U4_DISCOS}<p>Assinale a alternativa que preenche corretamente as lacunas do enunciado abaixo, na ordem em que aparecem.</p><p>Logo após a colisão, a energia cinética total do sistema vale __________ na primeira situação e __________ na segunda.</p>`,
  opts: ['8,0 J — 2,0 J.','8,0 J — 8,0 J.','10 J — 2,0 J.','10 J — 5,0 J.','20 J — 4,0 J.'], ans: 2,
  hint: 'Na colisão elástica, o que se conserva além da quantidade de movimento? Na segunda situação, os discos seguem juntos: com que velocidade? Cuidado com os sentidos opostos.',
  steps: [['Energia antes', `<div class="eq">E<sub>c</sub> = ${f('2,0 · 3,0²','2')} + ${f('2,0 · 1,0²','2')}</div><div class="eq">E<sub>c</sub> = 9,0 + 1,0 = 10 J</div><p>Na colisão elástica, ela se conserva: 10 J.</p>`],
          ['Discos grudados', `<p>Positivo para a direita:</p><div class="eq">Q = 2,0 · 3,0 − 2,0 · 1,0</div><div class="eq">Q = 4,0 kg·m/s</div><div class="eq">v = ${f('4,0','4,0')} = 1,0 m/s</div><div class="eq">E<sub>c</sub> = ${f('4,0 · 1,0²','2')} = 2,0 J</div><p>Resposta: <span class="hl">10 J — 2,0 J</span>.</p>`]],
  alt: 'Na colisão perfeitamente inelástica, a energia que resta é a do movimento do centro de massa (v<sub>CM</sub> = 1,0 m/s). Ela não pode ser perdida, porque a quantidade de movimento total tem de continuar existindo. Por isso esse é o tipo de colisão que mais perde energia.',
  warn: erros([['A) 8,0 J — 2,0 J:','subtraiu as energias cinéticas por causa dos sentidos opostos; energia cinética não tem sentido e sempre se soma.'],['B) 8,0 J — 8,0 J:','subtraiu as energias e, na segunda situação, somou as quantidades de movimento sem sinal (v = 2,0 m/s).'],['D) 10 J — 5,0 J:','supôs que a colisão inelástica sempre perde metade da energia; a perda depende das massas e das velocidades.'],['E) 20 J — 4,0 J:','esqueceu o ½ da energia cinética nas duas situações.']]) },

{ src: 'Inédita', nivel: 'intermediário',
  mod: 'Inspirada no corpo que recebe um impulso e oscila preso à mola (Ufrgs; questão 38): trilho de ar e compressão máxima.',
  text: `<p>Em um trilho de ar horizontal, um carrinho de 0,50 kg, inicialmente parado, recebe uma batida rápida que lhe aplica um impulso de 1,0 N·s. Em seguida, ele vai de encontro a uma mola de constante elástica 200 N/m presa no fim do trilho. Despreze os atritos.</p>${FIG_U4_TRILHO}<p>A compressão máxima da mola é de</p>`,
  opts: ['0,50 cm.','1,0 cm.','5,0 cm.','7,1 cm.','10 cm.'], ans: 4,
  hint: 'São duas etapas: o impulso dá a velocidade do carrinho; depois, a energia cinética vira energia elástica. Ao isolar x, não esqueça a raiz.',
  steps: [['Velocidade após a batida', `<div class="eq">I = m · v</div><div class="eq">v = ${f('1,0','0,50')} = 2,0 m/s</div>`],
          ['Energia cinética', `<div class="eq">E<sub>c</sub> = ${f('0,50 · 2,0²','2')} = 1,0 J</div>`],
          ['Compressão máxima', `<div class="eq">${f('200 · x²','2')} = 1,0</div><div class="eq">x² = 0,010</div><div class="eq">x = 0,10 m = <span class="hl">10 cm</span></div>`]],
  alt: 'Atalho: E<sub>c</sub> = Q²/(2m) = 1,0²/(2 × 0,50) = 1,0 J, direto do impulso, sem calcular a velocidade.',
  warn: erros([['A) 0,50 cm:','igualou a força da mola ao impulso (k · x = 1,0); impulso não é força.'],['B) 1,0 cm:','parou em x² = 0,010 e leu 0,010 m, esquecendo a raiz.'],['C) 5,0 cm:','tomou o impulso (1,0) como se fosse a velocidade, sem dividir pela massa.'],['D) 7,1 cm:','esqueceu o ½ da energia elástica (k · x² = 1,0).']]) },

{ src: 'Inédita', nivel: 'intermediário',
  mod: 'Inédita, ligada à questão das forças internas e externas (Ufrgs; questão 35, Dart): patinadores que se empurram.',
  text: `<p>Em uma pista de gelo, Ana (50 kg) e Bruno (75 kg) estão parados, um de frente para o outro. Eles se empurram com as mãos, e Ana passa a deslizar para trás a 3,0 m/s. Despreze o atrito com o gelo.</p>${FIG_U4_PATINS}<p>Considere as seguintes afirmações.</p>${itens(['I. Bruno passa a deslizar a 2,0 m/s, em sentido oposto ao de Ana.','II. Durante o empurrão, Bruno exerce sobre Ana uma força maior do que a que recebe dela, já que é ela quem sai mais rápido.','III. A energia cinética total do sistema se conserva no empurrão.'])}<p>Quais estão corretas?</p>`,
  opts: ['Apenas I.','Apenas II.','Apenas III.','Apenas I e II.','Apenas I e III.'], ans: 0,
  hint: 'Antes do empurrão, quanto vale a quantidade de movimento do sistema? Pela 3ª lei, como são as forças entre os dois? E de onde vem a energia cinética que eles ganham?',
  steps: [['I. Quantidade de movimento', `<p>Antes, Q = 0. Sem atrito, o sistema é isolado na horizontal:</p><div class="eq">0 = 50 · (−3,0) + 75 · v</div><div class="eq">v = +2,0 m/s</div><p>Sentido oposto ao de Ana. Correta.</p>`],
          ['II. Ação e reação', '<p>As forças do empurrão formam um par ação-reação: mesmo módulo, sentidos opostos, durante o mesmo tempo. Ana sai mais rápida porque tem menos massa, não porque recebe mais força. Incorreta.</p>'],
          ['III. Energia', `<p>Antes, a energia cinética era zero; depois:</p><div class="eq">${f('50 · 3,0²','2')} + ${f('75 · 2,0²','2')} = 375 J</div><p>Ela aumentou, à custa da energia química dos músculos. Incorreta. Está correta <span class="hl">apenas a I</span>.</p>`]],
  alt: 'O centro de massa dos dois continua parado: a cada segundo, Ana se afasta 3,0 m para um lado e Bruno 2,0 m para o outro, e 50 × 3,0 = 75 × 2,0. O “ponto de equilíbrio” entre eles não sai do lugar.',
  warn: erros([['B) Apenas II:','as forças do empurrão têm o mesmo módulo (ação e reação); Ana sai mais rápida por ter menos massa.'],['C) Apenas III:','a energia cinética não se conserva: era zero e passou a 375 J, vinda dos músculos.'],['D) Apenas I e II:','a II é falsa pelo mesmo motivo: ação e reação têm o mesmo módulo.'],['E) Apenas I e III:','a III é falsa: num “anticolisão” como esse, a energia cinética aumenta.']]) },

{ src: 'Inédita', nivel: 'avançado',
  mod: 'Inspirada nos objetos A e B que colidem e ficam colados (Ufrgs; questão 40): cruzamento, energia dissipada.',
  text: `<p>Em um cruzamento, um carro A, de 1 200 kg, a 10 m/s rumo ao norte, colide com um carro B, de 800 kg, a 15 m/s rumo ao leste. Após o choque, os carros seguem presos um ao outro. Considere o sistema isolado durante a colisão.</p>${FIG_U4_CRUZ}<p>A energia cinética dissipada na colisão é de</p>`,
  opts: ['0 kJ.','6,0 kJ.','72 kJ.','78 kJ.','150 kJ.'], ans: 3,
  hint: 'A quantidade de movimento é um vetor: as duas são perpendiculares, então use o teorema de Pitágoras. Com ela, calcule a energia cinética logo após o choque e compare com a de antes.',
  steps: [['Quantidades de movimento', `<p>Em kg·m/s, A para o norte e B para o leste:</p><div class="eq">Q<sub>A</sub> = 1 200 · 10 = 12 000</div><div class="eq">Q<sub>B</sub> = 800 · 15 = 12 000</div><div class="eq">Q² = 12 000² + 12 000²</div>`],
          ['Energia logo após o choque', `<p>Os carros seguem juntos, com massa de 2 000 kg:</p><div class="eq">E<sub>c</sub> = ${f('Q²','2M')} = ${f('2,88 × 10⁸','4 000')}</div><div class="eq">E<sub>c</sub> = 72 000 J</div>`],
          ['Energia dissipada', `<div class="eq">antes: 60 000 + 90 000</div><div class="eq">antes: 150 000 J</div><div class="eq">dissipada: 150 − 72 = <span class="hl">78 kJ</span></div>`]],
  alt: 'Como as duas quantidades de movimento são iguais, os carros saem a 45°, rumo ao nordeste, com cerca de 8,5 m/s. Peritos de trânsito fazem o caminho inverso: pelas marcas no asfalto depois da batida, estimam as velocidades de antes.',
  warn: erros([['A) 0 kJ:','supôs que a energia cinética se conserva; quando os corpos seguem juntos, a perda é a maior possível.'],['B) 6,0 kJ:','somou as quantidades de movimento como números (24 000 kg·m/s), sem considerar que são perpendiculares.'],['C) 72 kJ:','calculou a energia cinética que sobrou depois do choque, não a dissipada.'],['E) 150 kJ:','tomou toda a energia cinética inicial como dissipada; depois do choque, os carros ainda se movem.']]) },

{ src: 'Inédita', nivel: 'avançado',
  mod: 'Inspirada no centro de massa do bloco e do plano inclinado (Ufrgs; questão 39): pescador no barco, valor numérico.',
  text: `<p>Um pescador de 60 kg está parado na popa de um barco de 140 kg, também parado, em um lago de águas calmas. Ele caminha 4,0 m em relação ao barco, até a proa, e para. Despreze o atrito da água com o barco.</p>${FIG_U4_BARCO}<p>Em relação à margem, o barco se desloca</p>`,
  opts: ['0 m.','1,2 m.','1,7 m.','2,8 m.','4,0 m.'], ans: 1,
  hint: 'Sem forças externas horizontais, o centro de massa pescador + barco, que estava parado, continua parado. Se o pescador anda para a frente, o barco faz o quê? E os 4,0 m são o deslocamento de quem, em relação a quê?',
  steps: [['Centro de massa parado', '<p>Sem atrito com a água, não há força externa horizontal: o centro de massa do sistema continua no lugar. O pescador vai para a frente e o barco recua, de modo que m<sub>p</sub> · d<sub>p</sub> = m<sub>b</sub> · d<sub>b</sub> (deslocamentos em relação à margem).</p>'],
          ['Deslocamentos', `<p>Os 4,0 m são em relação ao barco: d<sub>p</sub> + d<sub>b</sub> = 4,0.</p><div class="eq">60 · d<sub>p</sub> = 140 · d<sub>b</sub></div><div class="eq">60 · (4,0 − d<sub>b</sub>) = 140 · d<sub>b</sub></div><div class="eq">240 = 200 · d<sub>b</sub></div><div class="eq">d<sub>b</sub> = <span class="hl">1,2 m</span></div><p>O barco recua 1,2 m, e o pescador avança 2,8 m em relação à margem.</p>`]],
  alt: 'É o mesmo recuo que se sente ao pular de um barco pequeno para o cais: o barco vai para trás. Quanto mais leve o barco em relação à pessoa, maior o recuo.',
  deep: ['A regra m₁ · d₁ = m₂ · d₂, sem passar pelas velocidades', `<p>A posição do centro de massa é uma média ponderada das posições:</p>
<div class="eq">x<sub>CM</sub> = ${f('m₁ · x₁ + m₂ · x₂','m₁ + m₂')}</div>
<p>Se x<sub>CM</sub> não muda, a soma m₁ · Δx₁ + m₂ · Δx₂ tem de ser zero: os deslocamentos têm sentidos opostos e m₁ · |d₁| = m₂ · |d₂|.</p>
<p>O bonito é que isso não depende de <b>como</b> o pescador anda: rápido, devagar, aos trancos, parando no meio. Seja qual for o movimento, o barco termina recuado 1,2 m quando ele chega à proa. Por isso não foi preciso calcular nenhuma velocidade.</p>
<p>Com d₁ + d₂ = L (o comprimento percorrido em relação ao barco), dá para escrever o recuo direto:</p>
<div class="eq">d<sub>b</sub> = ${f('m<sub>p</sub>','m<sub>p</sub> + m<sub>b</sub>')} · L</div><p>(p: pescador; b: barco)</p>
<p>Aqui, 60/200 = 30% de 4,0 m. Num barco de 540 kg, o recuo cairia para 10% de 4,0 m, ou seja, 0,40 m. A mesma ideia vale para um bloco que desliza num plano inclinado apoiado num chão liso: sem forças externas horizontais, o centro de massa do conjunto só pode se mover na vertical.</p>`],
  warn: erros([['A) 0 m:','achou que o barco fica parado; sem atrito com a água, para o pescador ir para a frente, o barco precisa ir para trás.'],['C) 1,7 m:','usou 60 × 4,0 = 140 × d, tomando os 4,0 m como deslocamento do pescador em relação à margem; eles são em relação ao barco.'],['D) 2,8 m:','é o deslocamento do pescador em relação à margem, não o do barco.'],['E) 4,0 m:','supôs que o barco recua tudo o que o pescador anda.']]) },

{ src: 'Inédita', nivel: 'avançado',
  mod: 'Inspirada na sonda Dart e no par Dídimo-Dimorfo (Ufrgs; questão 35): impacto de uma sonda, com cálculo da variação de velocidade.',
  text: '<p>Em uma missão de defesa planetária, uma sonda de 500 kg, a 6,0 km/s, atinge um pequeno asteroide de 5,0 × 10⁹ kg e fica cravada nele. Considere o asteroide inicialmente em repouso no referencial adotado e o sistema sonda + asteroide isolado durante o impacto.</p><p>Considere as seguintes afirmações.</p><p>I. A colisão é perfeitamente inelástica.<br>II. A quantidade de movimento do sistema sonda + asteroide é a mesma antes e logo depois do impacto.<br>III. Após o impacto, a velocidade do asteroide passa a ser de cerca de 0,6 mm/s.</p><p>Quais estão corretas?</p>',
  opts: ['Apenas I.','Apenas II.','Apenas I e II.','Apenas II e III.','I, II e III.'], ans: 4,
  hint: 'A sonda e o asteroide seguem juntos: que tipo de colisão é essa? No impacto, as forças entre eles são internas ou externas ao sistema? Para a III, iguale as quantidades de movimento antes e depois e cuide das unidades.',
  steps: [['I e II', '<p>A sonda fica cravada: os dois seguem juntos, o caso perfeitamente inelástico (I correta). As forças do impacto são internas ao sistema sonda + asteroide, que é isolado: a quantidade de movimento se conserva (II correta).</p>'],
          ['III. Velocidade depois do impacto', `<p>Com 6,0 km/s = 6 000 m/s, e a massa da sonda desprezível perto da do asteroide:</p><div class="eq">500 · 6 000 = 5,0 × 10⁹ · v</div><div class="eq">v = 6,0 × 10⁻⁴ m/s</div><div class="eq">v = 0,6 mm/s</div><p>Correta. Estão corretas <span class="hl">I, II e III</span>.</p>`]],
  alt: '0,6 mm/s parece nada, mas se acumula: em 10 anos (cerca de 3 × 10⁸ s), o asteroide fica cerca de 190 km fora da posição em que estaria sem o impacto. Por isso um desvio desses precisa ser feito com muita antecedência.',
  warn: erros([['A) Apenas I:','a II também vale: as forças do impacto são internas ao sistema sonda + asteroide.'],['B) Apenas II:','a I também vale: ficar cravada é seguir junto, o caso perfeitamente inelástico.'],['C) Apenas I e II:','achou a III exagerada ou errou a conversão; com 6,0 km/s = 6 000 m/s, a conta dá 6 × 10⁻⁴ m/s = 0,6 mm/s.'],['D) Apenas II e III:','a I está correta: corpos que seguem juntos após o choque caracterizam a colisão perfeitamente inelástica.']]) }
];
