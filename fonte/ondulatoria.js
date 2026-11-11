/* ---------- Ondulatória · 3 listas (30 questões inéditas, modelos que caem no ENEM) ---------- */

const TOOLS_OND1 = [
  ['Tipos de onda', `Mecânica: precisa de meio (som, ondas na água, sismos)<br>Eletromagnética: também se propaga no vácuo (luz, rádio, micro-ondas)<br>Transversal: vibra perpendicular à propagação · Longitudinal: vibra na direção da propagação`],
  ['Fenômenos', `Reflexão: a onda volta (eco)<br>Refração: muda de meio, muda a velocidade (a frequência não muda)<br>Difração: contorna obstáculos de tamanho parecido com λ<br>Interferência: ondas se somam ou se anulam`],
  ['Mais fenômenos', `Ressonância: a frequência recebida coincide com a natural<br>Polarização: só ondas transversais<br>Efeito Doppler: aproximação → f percebida maior; afastamento → menor`]
];

const TOOLS_OND2 = [
  ['Equação fundamental', `v = λ · f &nbsp;·&nbsp; T = ${f('1','f')}<br>Som no ar ≈ 340 m/s · Luz: c = 3,0 × 10⁸ m/s`],
  ['Qualidades do som', `Altura ↔ frequência (agudo/grave)<br>Intensidade ↔ amplitude (forte/fraco)<br>Timbre ↔ forma da onda`],
  ['Decibéis', `+10 dB = intensidade 10 vezes maior<br>+20 dB = 100 vezes · +30 dB = 1 000 vezes`],
  ['Eco', `d = ${f('v · Δt','2')} (o som vai e volta)`],
  ['Espectro (frequência crescente)', `rádio → micro-ondas → infravermelho → luz visível → ultravioleta → raios X → raios gama`]
];

const TOOLS_OND3 = [
  ['Ondas estacionárias', `Distância entre nós (ou entre ventres) = ${f('λ','2')}<br>Corda: f<sub>n</sub> = ${f('n · v','2L')} &nbsp;·&nbsp; v = √(T/μ)`],
  ['Tubos sonoros', `Aberto: f<sub>n</sub> = ${f('n · v','2L')}<br>Fechado: f = ${f('v','4L')} (e só harmônicos ímpares)`],
  ['Efeito Doppler (fonte em movimento)', `f′ = f · ${f('v','v ∓ v<sub>f</sub>')} (− na aproximação, + no afastamento)`],
  ['Intensidade sonora', `I ∝ ${f('1','r²')} · cada fator 10 na intensidade = 10 dB`],
  ['Interferência', `Construtiva: Δd = 0, λ, 2λ… · Destrutiva: Δd = ${f('λ','2')}, ${f('3λ','2')}…`],
  ['Refração', `A frequência não muda; v e λ mudam na mesma proporção`]
];

/* ===== Figuras ===== */
const lorentz = (f0, g, a, b) => { const p = []; for (let k = 0; k <= 100; k++){ const x = a + (b - a) * k / 100; p.push([+x.toFixed(1), +(1 / (1 + ((x - f0) / g) ** 2)).toFixed(4)]); } return p; };

const FIG_PRAIA = (() => {
  const frente = y0 => { let x = 0, y = y0, d = ''; while (x <= 340 && y < 166){ const inc = Math.min(0.75, 0.04 + 0.6 * Math.max(0, 1 - y / 166)); if (y > -2) d += (d ? ' L' : 'M') + `${x} ${y.toFixed(1)}`; x += 3; y += inc * 3; } return d ? `<path d="${d}" fill="none" stroke="#3A7BD5" stroke-width="2.5"/>` : ''; };
  const [df, mk] = seta('var(--ink)');
  return fig('0 0 340 210', 'Vista de cima de uma praia. Em águas profundas, as frentes de onda são retas e inclinadas em relação à praia. Ao passar para águas rasas, perto da areia, elas se dobram e ficam quase paralelas à linha da praia.',
  `${df}<rect x="0" y="170" width="340" height="40" fill="#E9C46A" opacity=".55"/>
   <path d="M0 170 H340" stroke="var(--ink)" stroke-width="1.5"/>
      ${[-300,-240,-185,-135,-90,-50,-15,18,48,76,102,126,148].map(frente).join('')}
   <line x1="70" y1="40" x2="52" y2="78" stroke="var(--ink)" stroke-width="2" marker-end="${mk}"/>
   <text x="6" y="14" class="pt">águas profundas</text>
   <text x="334" y="160" text-anchor="end" class="pt">águas rasas</text>
   <text x="170" y="196" text-anchor="middle" class="pt pt-strong">areia</text>`, 380);
})();

const FIG_CHOCOLATE = fig('0 0 340 130', 'Barra de chocolate vista de cima, com quatro pontos derretidos alinhados; a distância entre dois pontos derretidos consecutivos é de 6,0 cm.',
  `<rect x="20" y="40" width="300" height="44" rx="4" fill="#7B4A2D"/>
   ${[60,140,220,300].map(x => `<ellipse cx="${x - 10}" cy="62" rx="13" ry="10" fill="#C8956C"/>`).join('')}
   <line x1="50" y1="100" x2="130" y2="100" stroke="var(--ink)" stroke-width="1.5"/><path d="M50 95 v10 M130 95 v10" stroke="var(--ink)" stroke-width="1.5"/>
   <text x="90" y="118" text-anchor="middle" class="pt pt-strong">6,0 cm</text>
   <text x="170" y="28" text-anchor="middle" class="pt">pontos derretidos</text>`, 380);

const FIG_GARRAFA = fig('0 0 200 230', 'Garrafa de 34 cm de altura com água até a metade: a coluna de ar acima da água mede 17 cm. Uma pessoa sopra na boca da garrafa.',
  `<path d="M80 20 H120 V60 Q150 75 150 100 V215 H50 V100 Q50 75 80 60 Z" fill="none" stroke="var(--ink)" stroke-width="2.5"/>
   <path d="M52 140 H148 V213 H52 Z" fill="#3A7BD5" opacity=".45"/>
   <path d="M160 20 V140" stroke="var(--ink)" stroke-width="1.4"/><path d="M155 20 h10 M155 140 h10" stroke="var(--ink)" stroke-width="1.4"/>
   <text x="168" y="84" class="pt pt-strong">17 cm</text>
   <path d="M30 20 V215" stroke="var(--muted)" stroke-width="1.2" stroke-dasharray="4 3"/>
   <text x="24" y="120" text-anchor="end" class="pt" transform="rotate(-90 24 120)">34 cm</text>
   <text x="100" y="182" text-anchor="middle" class="pt">água</text>
   <text x="100" y="100" text-anchor="middle" class="pt">ar</text>`, 240);

const FIG_ALTOFALANTES = fig('0 0 340 190', 'Dois alto-falantes, A e B, ligados ao mesmo aparelho e emitindo em fase. Um ouvinte no ponto P está a 3,00 m de A e a uma distância d de B.',
  `<rect x="20" y="30" width="34" height="40" rx="4" fill="var(--line)" stroke="var(--ink)" stroke-width="2"/><text x="37" y="56" text-anchor="middle" class="pt pt-strong">A</text>
   <rect x="20" y="130" width="34" height="40" rx="4" fill="var(--line)" stroke="var(--ink)" stroke-width="2"/><text x="37" y="156" text-anchor="middle" class="pt pt-strong">B</text>
   <circle cx="300" cy="80" r="7" fill="var(--ink)"/><text x="314" y="84" class="pt pt-strong">P</text>
   <line x1="56" y1="50" x2="294" y2="78" stroke="var(--ink)" stroke-width="1.5" stroke-dasharray="6 4"/>
   <line x1="56" y1="150" x2="294" y2="84" stroke="var(--ink)" stroke-width="1.5" stroke-dasharray="6 4"/>
   <text x="170" y="52" text-anchor="middle" class="pt pt-strong">3,00 m</text>
   <text x="170" y="138" text-anchor="middle" class="pt pt-strong">d</text>`, 380);

/* Muro da quadra (Lista 1, questão 4) */
const pessoa = (x, y, lab) => `<circle cx="${x}" cy="${y-52}" r="9" fill="none" stroke="var(--ink)" stroke-width="2"/><path d="M${x} ${y-43} V${y-18} M${x-12} ${y-34} H${x+12} M${x} ${y-18} L${x-9} ${y} M${x} ${y-18} L${x+9} ${y}" fill="none" stroke="var(--ink)" stroke-width="2" stroke-linecap="round"/>${lab ? `<text x="${x}" y="${y+16}" text-anchor="middle" class="pt">${lab}</text>` : ''}`;
const FIG_MURO = fig('0 0 340 190', 'Vista lateral: dois colegas conversam de um lado de um muro alto; do outro lado, um estudante. A linha de visão entre o estudante e os colegas é bloqueada pelo muro.',
  `<line x1="10" y1="160" x2="330" y2="160" stroke="var(--ink)" stroke-width="2"/>
   <rect x="168" y="40" width="18" height="120" fill="var(--line)" stroke="var(--ink)" stroke-width="2"/>
   <text x="177" y="30" text-anchor="middle" class="pt pt-strong">muro</text>
   ${pessoa(52, 160, '')}${pessoa(92, 160, '')}${pessoa(278, 160, '')}
   <text x="80" y="178" text-anchor="middle" class="pt">colegas conversando</text>
   <text x="278" y="178" text-anchor="middle" class="pt">estudante</text>
   <line x1="270" y1="108" x2="186" y2="104" stroke="var(--muted)" stroke-width="1.6" stroke-dasharray="5 4"/>
   <text x="232" y="96" text-anchor="middle" class="pt">linha de visão</text>
   <text x="200" y="110" text-anchor="middle" class="pt pt-strong" style="fill:#D64A3B">✕</text>`, 380);

/* Emissora, morro e bairro (Lista 1, questão 10) */
const FIG_MORRO = fig('0 0 340 180', 'Uma emissora de rádio à esquerda, um morro no meio e um bairro do outro lado do morro. A linha reta que sai da antena e passa rente ao topo do morro passa acima do bairro.',
  `<line x1="10" y1="150" x2="330" y2="150" stroke="var(--ink)" stroke-width="2"/>
   <path d="M30 150 L42 60 L54 150 M35 110 H49 M33 130 H51" fill="none" stroke="var(--ink)" stroke-width="2"/>
   <circle cx="42" cy="56" r="4" fill="var(--ink)"/>
   <text x="42" y="168" text-anchor="middle" class="pt">emissora</text>
   <path d="M110 150 Q170 20 230 150 Z" fill="#7FA36B" stroke="var(--ink)" stroke-width="1.5" opacity=".85"/>
   <text x="170" y="168" text-anchor="middle" class="pt">morro</text>
   <line x1="46" y1="58" x2="330" y2="120" stroke="var(--muted)" stroke-width="1.6" stroke-dasharray="5 4"/>
   ${[262,288,312].map(x => `<path d="M${x-9} 150 V136 L${x} 127 L${x+9} 136 V150 Z" fill="var(--surface)" stroke="var(--ink)" stroke-width="1.6"/>`).join('')}
   <text x="288" y="168" text-anchor="middle" class="pt">bairro</text>
   <text x="96" y="54" class="pt">linha reta rente ao topo</text>`, 380);

/* ===================== LISTA 1 · Fenômenos ondulatórios ===================== */
const Q_OND1 = [
{ src: 'Inédita', nivel: 'básico',
  text: '<p>Em jogos de futebol, é comum a torcida fazer a “ola”: cada torcedor se levanta e se senta logo depois do vizinho, e uma ondulação percorre a arquibancada em volta do estádio. Quem assiste pela TV vê a ola dar a volta completa, mas cada torcedor continua no seu lugar.</p><p>Essa situação ilustra uma característica de toda onda: ela</p>',
  opts: ['transporta matéria de um ponto a outro da arquibancada.','transporta energia sem transportar matéria.','só se propaga em meios sólidos, como a arquibancada.','tem velocidade igual à velocidade de cada torcedor.','depende do vento para se deslocar ao longo de todo o estádio.'], ans: 1,
  hint: 'Os torcedores saem do lugar? Então o que é que realmente “anda” pela arquibancada?',
  steps: [['O que se move', '<p>Cada torcedor só sobe e desce no próprio lugar. Quem dá a volta no estádio é a <b>perturbação</b>, o movimento passado de um para o outro.</p>'],
          ['Conclusão', '<p>Toda onda transporta <b>energia</b> (e informação) de um ponto a outro <b>sem transportar a matéria</b> do meio.</p>']],
  alt: 'Uma boia no mar sobe e desce quando a onda passa, mas não é levada até a praia. O mesmo vale para o ar, quando o som passa: as moléculas oscilam em volta de onde estão.',
  warn: erros([['A)','os torcedores não mudam de lugar; o que se desloca é a perturbação.'],['C)','ondas se propagam em sólidos, líquidos e gases (e as eletromagnéticas, até no vácuo).'],['D)','cada torcedor só sobe e desce; a velocidade da ola é outra coisa.'],['E)','a ola é feita pelas pessoas, não pelo vento.']]) },

{ src: 'Inédita', nivel: 'básico',
  text: '<p>Morcegos caçam insetos no escuro emitindo sons de frequência muito alta (ultrassons). Pelo tempo que o som leva para voltar e pelas mudanças que ele sofre, o morcego localiza a presa com grande precisão. A mesma ideia é usada nos sonares de navios e nos sensores de estacionamento dos carros.</p><p>O fenômeno ondulatório essencial para esse tipo de localização é a</p>',
  opts: ['refração.','difração.','interferência.','reflexão.','polarização.'], ans: 3,
  hint: 'O morcego ouve o próprio som depois que ele “bate” no inseto. Que fenômeno faz a onda voltar?',
  steps: [['O que acontece com o som', '<p>O ultrassom bate no inseto (ou no obstáculo) e <b>volta</b> para o morcego: é um eco.</p>'],
          ['Fenômeno', '<p>A volta da onda ao encontrar um obstáculo é a <b>reflexão</b>. Pelo tempo de ida e volta, o morcego estima a distância (ecolocalização).</p>']],
  alt: 'Sempre que o enunciado falar em eco, sonar, ecolocalização ou ultrassonografia, a primeira pista é reflexão. Os outros fenômenos podem aparecer junto, mas sem a onda voltar não há eco.',
  warn: erros([['A)','refração é a mudança de velocidade ao trocar de meio, não a volta da onda.'],['B)','difração é contornar obstáculos; aqui o som precisa voltar.'],['C)','interferência é a soma de duas ondas; não é o que permite localizar a presa.'],['E)','o som no ar é longitudinal e nem pode ser polarizado.']]) },

{ src: 'Inédita', nivel: 'básico',
  text: `<p>Em um programa de TV, uma cantora quebra uma taça de cristal apenas com a voz, sem tocá-la. Antes, um técnico bateu de leve na taça com uma colher e mediu o som produzido. O gráfico mostra como a amplitude de vibração da taça varia com a frequência do som que chega até ela.</p>
${plot({aria:'Amplitude de vibração da taça, em unidades arbitrárias, em função da frequência do som, de 600 a 1 160 Hz. A curva tem um pico estreito em 880 Hz.', xmin:600, xmax:1160, ymin:0, ymax:1.15, xt:[600,740,880,1020,1160], yt:[], xl:'f (Hz)', yl:'amplitude', L:[{p:lorentz(880, 25, 600, 1160), c:'#0B6477'}], ann:[[880,1.08,'880 Hz']]})}
<p>A cantora consegue quebrar a taça quando sustenta uma nota de cerca de 880 Hz porque</p>`,
  opts: ['a frequência da voz coincide com a frequência natural da taça.','a voz humana tem amplitude maior que a de qualquer instrumento.','o som de 880 Hz é um ultrassom, que o cristal não suporta.','a onda sonora sofre refração ao entrar no cristal e se concentra no centro.','a velocidade do som no cristal é maior que no ar, e a energia fica presa dentro da taça.'], ans: 0,
  hint: 'Olhe o gráfico: em que frequência a taça vibra muito mais do que nas outras? O que essa frequência tem de especial?',
  steps: [['Leitura do gráfico', '<p>A taça vibra pouco na maioria das frequências e muito perto de 880 Hz: é a sua <b>frequência natural</b> (o mesmo som que ela faz ao ser batida com a colher).</p>'],
          ['Fenômeno', '<p>Quando a frequência que chega coincide com a natural, a taça absorve energia a cada ciclo, e a amplitude cresce até o cristal se romper: <b>ressonância</b>.</p>']],
  alt: 'É como empurrar alguém num balanço: empurrões pequenos, mas no ritmo certo, fazem a amplitude crescer muito. Fora do ritmo, não adianta empurrar com força.',
  warn: erros([['B)','não é a força da voz, e sim a frequência certa; fora de 880 Hz, a taça quase não vibra.'],['C)','880 Hz é um som audível (ultrassom é acima de 20 000 Hz).'],['D)','refração não explica o aumento da vibração justo em uma frequência.'],['E)','a velocidade no cristal não “prende” energia; o que importa é a coincidência de frequências.']]) },

{ src: 'Inédita', nivel: 'básico',
  text: `<p>Durante um intervalo, um estudante está atrás do muro da quadra e ouve claramente a conversa de dois colegas do outro lado, mas não consegue vê-los, como no esquema. Tanto o som quanto a luz são ondas, mas eles se comportam de modo diferente diante do muro.</p>
${FIG_MURO}
<p>Ele ouve sem ver porque</p>`,
  opts: ['o som se propaga mais rápido que a luz.','a luz sofre difração ao passar pelo muro, e o som não.','o som, de comprimento de onda bem maior, contorna o muro por difração.','o som é refletido pelo chão e chega por cima do muro com mais intensidade que a luz.','a luz é uma onda mecânica e precisa de um meio para se propagar.'], ans: 2,
  hint: 'Compare os comprimentos de onda: o da voz é da ordem de centímetros a metros; o da luz, de centenésimos de milésimo de milímetro. Qual deles “enxerga” o muro como um obstáculo pequeno?',
  steps: [['Comprimentos de onda', '<p>Voz humana: λ de algumas dezenas de centímetros a alguns metros. Luz visível: λ ≈ 0,0000005 m (500 nm).</p>'],
          ['Difração', '<p>Uma onda contorna bem obstáculos e bordas com tamanho parecido com o seu comprimento de onda. O som, com λ comparável ao muro, <b>difrata</b> e chega ao outro lado; a luz praticamente não.</p>']],
  alt: 'O mesmo vale para a porta entreaberta: você ouve a TV da sala no corredor, mas só vê a tela se estiver alinhado com a abertura.',
  warn: erros([['A)','a luz é cerca de um milhão de vezes mais rápida que o som.'],['B)','é o contrário: o som é que difrata de forma perceptível.'],['D)','reflexões podem ajudar, mas não explicam a diferença entre som e luz.'],['E)','a luz é eletromagnética: atravessa até o vácuo.']]) },

{ src: 'Inédita', nivel: 'intermediário',
  text: `<p>Fotos aéreas de praias mostram que, longe da costa, as ondas do mar podem vir em várias direções, mas, ao se aproximarem da areia, as frentes de onda se curvam e chegam quase paralelas à linha da praia, como no esquema.</p>
${FIG_PRAIA}
<p>Esse comportamento se deve à</p>`,
  opts: ['reflexão, pois as ondas batem no fundo e voltam.','difração, pois as ondas contornam as pedras da praia.','interferência, pois as ondas se somam perto da areia.','polarização, pois só uma direção de vibração chega à praia.','refração, pois a velocidade da onda diminui na água rasa.'], ans: 4,
  hint: 'A velocidade das ondas na superfície da água depende da profundidade. O que acontece com a direção de uma onda quando a velocidade muda?',
  steps: [['Velocidade e profundidade', '<p>Em águas rasas, as ondas do mar ficam mais lentas.</p>'],
          ['Curvatura', '<p>A parte da frente de onda que chega antes à água rasa freia primeiro; o resto “alcança”, e a frente gira até ficar paralela à praia. Mudança de velocidade com mudança de direção é <b>refração</b>.</p>']],
  alt: 'É como uma fila de pessoas de braços dados chegando, de lado, a um trecho de areia fofa: quem pisa primeiro na areia anda mais devagar, e a fila gira.',
  warn: erros([['A)','as ondas não voltam: elas mudam de direção e seguem para a praia.'],['B)','difração é contornar obstáculos; aqui o efeito acontece mesmo sem pedras.'],['C)','interferência não muda a direção de propagação das frentes.'],['D)','ondas na água não “escolhem” direção de vibração ao chegar à praia.']]) },

{ src: 'Inédita', nivel: 'intermediário',
  text: '<p>Bolhas de sabão e manchas finas de óleo no asfalto molhado exibem faixas coloridas que mudam conforme o ângulo de observação, mesmo sendo iluminadas por luz branca e sem nenhum corante. Parte da luz é refletida na face de cima da película e parte na face de baixo, e as duas se encontram no olho do observador.</p><p>As cores aparecem por causa da</p>',
  opts: ['dispersão da luz, como no arco-íris.','interferência entre a luz refletida nas duas faces da película.','absorção seletiva das cores pelos pigmentos do sabão.','polarização da luz ao atravessar a película de água e sabão.','difração da luz pelas moléculas de sabão, que funcionam como pequenas fendas.'], ans: 1,
  hint: 'O enunciado diz que duas partes da luz se encontram no olho. Duas ondas que se encontram podem se reforçar ou se anular...',
  steps: [['Dois caminhos', '<p>A luz refletida na face de baixo percorre um caminho um pouco maior que a refletida na face de cima.</p>'],
          ['Interferência', '<p>Para cada espessura, algumas cores (comprimentos de onda) se reforçam (interferência construtiva) e outras se anulam (destrutiva). Por isso aparecem faixas coloridas que mudam com a espessura e com o ângulo.</p>']],
  alt: 'O mesmo efeito explica as cores de um CD, das asas de algumas borboletas e da película antirreflexo dos óculos.',
  warn: erros([['A)','dispersão separa cores na refração (prisma, arco-íris); aqui as cores vêm de duas reflexões.'],['C)','o enunciado diz que não há corante, e o sabão é transparente.'],['D)','polarização não cria cores na luz branca refletida.'],['E)','moléculas são pequenas demais para funcionar como fendas para a luz visível.']]) },

{ src: 'Inédita', nivel: 'intermediário',
  text: '<p>Óculos de sol polarizados reduzem o ofuscamento causado pela luz refletida na água e no asfalto, porque bloqueiam a luz que vibra em uma certa direção. Animado com a ideia, um estudante propõe fabricar protetores de ouvido com “filtros polarizadores para som”, que bloqueariam o barulho do trânsito.</p><p>A proposta não funciona porque</p>',
  opts: ['o som do trânsito tem frequência baixa demais para ser filtrado.','os filtros polarizadores só funcionam no vácuo.','o som é uma onda eletromagnética, como a luz, mas de menor energia.','o som no ar é longitudinal, e só ondas transversais são polarizáveis.','a polarização reduz só a frequência da onda, e não a intensidade, então o barulho não ficaria mais baixo.'], ans: 3,
  hint: 'Polarizar é “escolher” uma direção de vibração perpendicular à propagação. Em que direção vibram as moléculas do ar quando o som passa?',
  steps: [['Luz', '<p>A luz é transversal: o campo elétrico vibra perpendicular à direção de propagação, em várias direções. O filtro deixa passar só uma delas.</p>'],
          ['Som', '<p>No ar, o som é uma onda <b>longitudinal</b>: as moléculas vibram na mesma direção em que a onda se propaga. Não há “direções de vibração” para escolher, então o som <b>não pode ser polarizado</b>.</p>']],
  alt: 'Polarização é o teste clássico para saber se uma onda é transversal. Foi assim que se confirmou que a luz é transversal.',
  warn: erros([['A)','a frequência não tem relação com a possibilidade de polarizar.'],['B)','polarizadores funcionam no ar (os óculos de sol, por exemplo).'],['C)','o som é uma onda mecânica, não eletromagnética.'],['E)','polarização não muda a frequência; ela seleciona uma direção de vibração.']]) },

{ src: 'Inédita', nivel: 'intermediário',
  text: '<p>No exame de ultrassom com Doppler, usado para avaliar a circulação, um aparelho emite ultrassom de frequência conhecida em direção a uma artéria. As hemácias em movimento refletem a onda de volta, e o aparelho compara a frequência recebida com a emitida para calcular a velocidade do sangue.</p><p>Quando o sangue se move em direção ao aparelho, o fenômeno envolvido e a relação entre as frequências são:</p>',
  opts: ['efeito Doppler; a frequência refletida é maior que a emitida.','efeito Doppler; a frequência refletida é menor que a emitida.','ressonância; a frequência refletida é igual à emitida.','refração; a frequência refletida é maior que a emitida.','difração; a frequência refletida é menor, porque o sangue absorve parte da energia.'], ans: 0,
  hint: 'O nome do exame já dá metade da resposta. Para a outra metade: lembre do som de uma ambulância que se aproxima.',
  steps: [['Fenômeno', '<p>A mudança de frequência causada pelo movimento relativo entre a fonte (ou o refletor) e o receptor é o <b>efeito Doppler</b>.</p>'],
          ['Sentido', '<p>Com as hemácias se aproximando, as frentes de onda refletidas chegam mais juntas ao aparelho: comprimento de onda menor e <b>frequência maior</b> que a emitida.</p>']],
  alt: 'O radar de trânsito usa a mesma ideia com micro-ondas: a diferença entre a frequência emitida e a refletida pelo carro dá a velocidade dele.',
  warn: erros([['B)','acerta o fenômeno, mas inverte o sentido: na aproximação, a frequência aumenta.'],['C)','ressonância é coincidência com a frequência natural; aqui a frequência muda.'],['D)','refração muda a velocidade da onda, mas não a frequência.'],['E)','absorção reduz a intensidade, não a frequência.']]) },

{ src: 'Inédita', nivel: 'avançado',
  text: `<p>Em um terremoto, partem do foco dois tipos principais de onda sísmica, com as características do quadro.</p>
${tabela(['Onda','Tipo de vibração','Meios em que se propaga'],[['P (primária)','longitudinal','sólidos, líquidos e gases'],['S (secundária)','transversal','apenas sólidos']])}
<p>Sismógrafos espalhados pelo planeta mostram que, do lado oposto ao foco, chegam ondas P, mas não chegam ondas S. Com base no quadro, essa observação indica que</p>`,
  opts: ['as ondas S são mais lentas e se perdem antes de chegar.','o núcleo da Terra é totalmente sólido e reflete todas as ondas S.','as ondas P são transversais e por isso atravessam qualquer meio.','as ondas S são absorvidas pela atmosfera antes de alcançar os sismógrafos do outro lado do planeta.','há uma camada líquida no interior da Terra, e as ondas S não a atravessam.'], ans: 4,
  hint: 'Para chegar ao outro lado, as ondas atravessam o interior da Terra. O quadro diz em que meio a onda S não consegue se propagar.',
  steps: [['O que o quadro diz', '<p>Ondas S são transversais e só se propagam em sólidos. Ondas P, longitudinais, atravessam também líquidos.</p>'],
          ['Conclusão', '<p>Se as P chegam ao lado oposto e as S não, no caminho existe uma região que as S não atravessam: uma <b>camada líquida</b> (o núcleo externo da Terra).</p>']],
  alt: 'Líquidos não “resistem” a ser cisalhados (deformados de lado), por isso não sustentam vibração transversal. Já a compressão (vibração longitudinal) passa por qualquer meio material.',
  warn: erros([['A)','a lentidão não impede a chegada; o problema é o meio que elas atravessam.'],['B)','se o núcleo fosse todo sólido, as ondas S o atravessariam.'],['C)','o quadro diz que as ondas P são longitudinais.'],['D)','as ondas sísmicas viajam pelo interior da Terra, não pela atmosfera.']]) },

{ src: 'Inédita', nivel: 'avançado',
  text: `<p>Em uma cidade cercada por morros, os moradores dos bairros atrás dos morros captam bem as rádios AM, mas quase não captam as rádios FM, que chegam com muito chiado. O esquema mostra a situação, e o quadro mostra as faixas usadas por esses dois tipos de transmissão.</p>
${tabela(['Faixa','Frequência','Comprimento de onda (aprox.)'],[['AM','540 kHz a 1 600 kHz','190 m a 560 m'],['FM','88 MHz a 108 MHz','2,8 m a 3,4 m']])}
${FIG_MORRO}
<p>A diferença na recepção atrás dos morros se explica porque</p>`,
  opts: ['as ondas FM têm frequência menor e perdem energia mais depressa.','as ondas AM são mecânicas e se propagam pelo solo dos morros.','as ondas AM, de comprimento de onda maior, contornam os morros por difração.','as ondas FM se propagam mais devagar que as AM e não chegam a tempo.','as ondas FM sofrem polarização ao passar pelos morros e, por isso, não podem mais ser captadas pelos rádios comuns.'], ans: 2,
  hint: 'Compare os comprimentos de onda com o tamanho dos morros. Qual onda “enxerga” o morro como um obstáculo contornável?',
  steps: [['Mesma velocidade', '<p>AM e FM são ondas eletromagnéticas: viajam à velocidade da luz. Pelo quadro, as ondas AM têm λ de centenas de metros; as FM, de cerca de 3 m.</p>'],
          ['Difração', '<p>A difração é mais intensa quando o comprimento de onda é comparável ao obstáculo. As ondas AM contornam os morros; as FM se propagam quase em linha reta e deixam uma “sombra” atrás deles.</p>']],
  alt: 'Pela equação v = λ · f, com a mesma velocidade, frequência menor significa comprimento de onda maior. Por isso a “vantagem” da AM está na frequência baixa, que é justamente o que A inverte.',
  warn: erros([['A)','as ondas FM têm frequência maior, não menor.'],['B)','AM e FM são ondas eletromagnéticas.'],['D)','as duas se propagam à velocidade da luz.'],['E)','polarização não impede a recepção atrás dos morros.']]) }
];

/* Escala de decibéis (Lista 2, questão 4) */
const FIG_DB = (() => {
  const y = d => 196 - 1.4 * d;
  const marcas = [[40,'Biblioteca'],[60,'Conversa normal'],[80,'Trânsito intenso'],[110,'Show de rock']];
  return fig('0 0 340 214', 'Escala vertical de nível sonoro, de 0 a 120 decibéis. Biblioteca: 40 dB. Conversa normal: 60 dB. Trânsito intenso: 80 dB. Show de rock: 110 dB.',
  `<defs><linearGradient id="gdb" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#2FA463"/><stop offset=".55" stop-color="#F2B705"/><stop offset="1" stop-color="#D9553B"/></linearGradient></defs>
   <rect x="70" y="${y(120)}" width="20" height="${1.4*120}" rx="4" fill="url(#gdb)" stroke="var(--ink)" stroke-width="1.5"/>
   ${[0,20,40,60,80,100,120].map(d => `<line x1="64" y1="${y(d)}" x2="70" y2="${y(d)}" stroke="var(--ink)" stroke-width="1.4"/><text x="58" y="${y(d)+4}" text-anchor="end" class="pt">${d}</text>`).join('')}
   <text x="80" y="16" text-anchor="middle" class="pt pt-strong">nível sonoro (dB)</text>
   ${marcas.map(([d, t]) => `<line x1="90" y1="${y(d)}" x2="124" y2="${y(d)}" stroke="var(--ink)" stroke-width="1.4"/><circle cx="124" cy="${y(d)}" r="3.5" fill="var(--ink)"/><text x="132" y="${y(d)+4}" class="pt pt-strong">${t}: ${d} dB</text>`).join('')}`, 360);
})();

/* Sonar (Lista 2, questão 6) */
const FIG_SONAR = (() => {
  const [d, mk] = seta('#3A7BD5'), [d2, mk2] = seta('#E8562A');
  return fig('0 0 340 200', 'Um navio na superfície do mar emite um pulso de ultrassom para baixo. O pulso reflete no fundo e volta ao navio. A profundidade h é desconhecida.',
  `${d}${d2}<path d="M0 50 Q 20 44 40 50 T 80 50 T 120 50 T 160 50 T 200 50 T 240 50 T 280 50 T 320 50 T 360 50" fill="none" stroke="#3A7BD5" stroke-width="2"/>
   <path d="M120 50 L130 64 H210 L222 50 Z" fill="var(--line)" stroke="var(--ink)" stroke-width="1.8"/><rect x="150" y="34" width="30" height="16" fill="var(--surface)" stroke="var(--ink)" stroke-width="1.6"/>
   <text x="236" y="40" class="pt">navio</text>
   <path d="M0 176 Q 40 168 80 174 T 160 176 T 240 172 T 340 176 V200 H0 Z" fill="var(--line)" stroke="var(--ink)" stroke-width="1.5"/>
   <text x="300" y="194" text-anchor="middle" class="pt">fundo</text>
   <line x1="158" y1="70" x2="158" y2="168" stroke="#3A7BD5" stroke-width="2.5" marker-end="${mk}"/>
   <line x1="184" y1="168" x2="184" y2="72" stroke="#E8562A" stroke-width="2.5" stroke-dasharray="6 4" marker-end="${mk2}"/>
   <text x="150" y="122" text-anchor="end" class="pt pt-strong" style="fill:#3A7BD5">pulso</text>
   <text x="192" y="122" class="pt pt-strong" style="fill:#E8562A">eco</text>
   <line x1="290" y1="54" x2="290" y2="170" stroke="var(--muted)" stroke-width="1.2" stroke-dasharray="3 3"/>
   <text x="298" y="116" class="pt pt-strong">h = ?</text>`, 380);
})();

/* ===================== LISTA 2 · Conceitos e fenômenos ===================== */
const ondaPiano = (() => { const p = []; for (let k = 0; k <= 160; k++){ const x = 8 * k / 160; p.push([+x.toFixed(3), +(Math.sin(2*Math.PI*x/4) + 0.25*Math.sin(4*Math.PI*x/4)).toFixed(3)]); } return p; })();
const ondaViolino = (() => { const p = []; for (let k = 0; k <= 160; k++){ const x = 8 * k / 160; let y = 0; for (let n = 1; n <= 7; n++) y += Math.sin(2*Math.PI*n*x/4) / n; p.push([+x.toFixed(3), +(0.7 * y).toFixed(3)]); } return p; })();

const Q_OND2 = [
{ src: 'Inédita', nivel: 'básico',
  text: `<p>Um piano e um violino tocam a mesma nota, com a mesma intensidade. Mesmo de olhos fechados, qualquer pessoa sabe qual instrumento está tocando. O gráfico mostra, de forma simplificada, a variação da pressão do ar produzida por cada instrumento ao longo do tempo.</p>
${plot({aria:'Pressão do ar em função do tempo, de 0 a 8 milissegundos, para o piano e para o violino. As duas curvas se repetem a cada 4 ms, mas têm formatos diferentes: a do piano é arredondada; a do violino, em forma de dente de serra.', xmin:0, xmax:8, ymin:-1.4, ymax:1.4, xt:[0,2,4,6,8], yt:[], xl:'t (ms)', yl:'pressão', L:[{p:ondaPiano, c:'#0B6477', lab:'piano', lp:[0.6,1.25]},{p:ondaViolino, c:'#E8562A', lab:'violino', lp:[5.2,1.25]}]})}
<p>A qualidade do som que permite distinguir os dois instrumentos é o(a)</p>`,
  opts: ['altura, que depende da frequência.','timbre, ligado à forma da onda.','intensidade, que depende da amplitude.','velocidade do som, diferente em cada instrumento.','comprimento de onda, que é maior no piano por causa do tamanho das cordas.'], ans: 1,
  hint: 'As duas curvas se repetem no mesmo intervalo de tempo e chegam a alturas parecidas. O que muda entre elas?',
  steps: [['O que é igual', '<p>Mesmo período (4 ms), portanto mesma frequência: mesma nota, mesma <b>altura</b>. Mesma intensidade, pelo enunciado.</p>'],
          ['O que muda', '<p>A <b>forma</b> da onda é diferente, porque cada instrumento produz uma mistura própria de harmônicos. Essa qualidade é o <b>timbre</b>.</p>']],
  alt: 'É o timbre que faz você reconhecer a voz de um amigo ao telefone, mesmo que ele fale na mesma altura e no mesmo volume de outra pessoa.',
  warn: erros([['A)','a nota (frequência) é a mesma: o período das duas curvas é igual.'],['C)','o enunciado fixa a mesma intensidade.'],['D)','no mesmo ar, o som dos dois viaja com a mesma velocidade.'],['E)','mesma frequência e mesma velocidade significam mesmo comprimento de onda.']]) },

{ src: 'Inédita', nivel: 'básico',
  text: '<p>Durante uma tempestade, uma pessoa vê o clarão de um raio e começa a contar o tempo. O som do trovão chega 3 segundos depois. Considere que a luz chega praticamente no mesmo instante em que o raio ocorre e que a velocidade do som no ar é 340 m/s.</p><p>A distância aproximada entre a pessoa e o local do raio é de</p>',
  opts: ['113 m.','340 m.','1,0 km.','3,0 km.','9,0 × 10⁵ km.'], ans: 2,
  hint: 'A luz chega “na hora”. O atraso é todo do som. Distância = velocidade × tempo.',
  steps: [['Por que há atraso', '<p>A luz (3,0 × 10⁸ m/s) chega quase instantaneamente; o som é muito mais lento.</p>'],
          ['Distância', '<div class="eq">d = v · Δt = 340 × 3 ≈ 1 020 m ≈ 1,0 km</div>']],
  alt: 'Regra prática: a cada 3 segundos de atraso, o raio está a cerca de 1 km. Aqui não há divisão por 2, porque o som só vai (não é eco).',
  warn: erros([['A) 113 m:','divide a velocidade pelo tempo.'],['B) 340 m:','usa 1 segundo.'],['D) 3,0 km:','usa 1 km/s para o som.'],['E) 9,0 × 10⁵ km:','usa a velocidade da luz no cálculo.']]) },

{ src: 'Inédita', nivel: 'básico',
  text: `<p>No dia a dia, usamos radiações eletromagnéticas de várias faixas do espectro, como mostra o quadro.</p>
${tabela(['Radiação','Uso no cotidiano'],[['Ondas de rádio','emissoras FM'],['Micro-ondas','forno e Wi-Fi'],['Infravermelho','controle remoto da TV'],['Ultravioleta','lâmpada que seca esmalte de unha'],['Raios X','exames de imagem']])}
<p>Das radiações do quadro, a que tem maior frequência e, por isso, maior energia por fóton, sendo a mais capaz de ionizar átomos do corpo, é</p>`,
  opts: ['ondas de rádio.','micro-ondas.','infravermelho.','ultravioleta.','raios X.'], ans: 4,
  hint: 'Organize o quadro na ordem do espectro, da menor para a maior frequência.',
  steps: [['Ordem do espectro', '<p>Frequência crescente: rádio → micro-ondas → infravermelho → visível → ultravioleta → <b>raios X</b> → raios gama.</p>'],
          ['Energia', '<p>A energia de cada fóton é proporcional à frequência. Por isso os raios X ionizam átomos e exigem proteção (o avental de chumbo no exame).</p>']],
  alt: 'Todas viajam à mesma velocidade no vácuo; o que muda é a frequência (e o comprimento de onda). O ultravioleta já tem energia para queimar a pele, mas os raios X são ainda mais energéticos.',
  warn: erros([['A)','é a de menor frequência do quadro.'],['B)','micro-ondas aquecem a água dos alimentos, mas não ionizam.'],['C)','infravermelho tem frequência menor que a da luz visível.'],['D)','é energética, mas tem frequência menor que a dos raios X.']]) },

{ src: 'Inédita', nivel: 'intermediário',
  text: `<p>O nível de intensidade sonora é medido em decibéis (dB). A escala é logarítmica: cada aumento de 10 dB corresponde a uma intensidade 10 vezes maior. A escala mostra valores típicos de alguns ambientes.</p>
${FIG_DB}
<p>Em relação à conversa normal, a intensidade sonora do trânsito intenso é</p>`,
  opts: ['1,3 vez maior.','2 vezes maior.','20 vezes maior.','100 vezes maior.','1 000 vezes maior.'], ans: 3,
  hint: 'De 60 dB para 80 dB são dois “degraus” de 10 dB. Cada degrau multiplica a intensidade por 10.',
  steps: [['Diferença em dB', '<div class="eq">80 − 60 = 20 dB = 2 × 10 dB</div>'],
          ['Intensidade', '<div class="eq">10 × 10 = 100 vezes maior</div>']],
  alt: 'Por isso o show de rock (110 dB) é perigoso: são 50 dB acima da conversa, ou seja, uma intensidade 100 000 vezes maior. A exposição prolongada acima de cerca de 85 dB já pode causar perda auditiva.',
  deep: ['A mesma resposta pela fórmula com logaritmo', `<p>O enunciado descreve em palavras a definição do nível sonoro:</p>
<div class="eq">β = 10 · log ${f('I','I₀')}</div>
<p>β é o nível em dB, I é a intensidade (W/m²) e I₀ = 10⁻¹² W/m² é a intensidade mínima que o ouvido percebe. Lembre: <b>log x = n</b> significa <b>x = 10ⁿ</b>.</p>
<p><b>1. Conversa normal (60 dB)</b></p>
<div class="eq">60 = 10 · log ${f('I₁','I₀')}</div>
<div class="eq">log ${f('I₁','I₀')} = 6 → ${f('I₁','I₀')} = 10⁶</div>
<div class="eq">I₁ = 10⁶ × 10⁻¹²</div>
<div class="eq">I₁ = 10⁻⁶ W/m²</div>
<p><b>2. Trânsito intenso (80 dB)</b></p>
<div class="eq">log ${f('I₂','I₀')} = 8 → ${f('I₂','I₀')} = 10⁸</div>
<div class="eq">I₂ = 10⁻⁴ W/m²</div>
<p><b>3. Comparação</b></p>
<div class="eq">${f('I₂','I₁')} = ${f('10⁻⁴','10⁻⁶')} = 10²</div>
<div class="eq">${f('I₂','I₁')} = 100</div>
<p><b>Atalho:</b> subtraindo os dois níveis, I₀ some da conta (log a − log b = log a/b):</p>
<div class="eq">β₂ − β₁ = 10 · log ${f('I₂','I₁')}</div>
<div class="eq">80 − 60 = 10 · log ${f('I₂','I₁')}</div>
<div class="eq">log ${f('I₂','I₁')} = 2</div>
<div class="eq">${f('I₂','I₁')} = 10² = 100</div>
<p><b>De onde vem a “regra dos 10 dB”:</b> se a intensidade fica 10 vezes maior, o nível sobe 10 · log 10 = 10 × 1 = 10 dB. E se a intensidade só dobra, sobe 10 · log 2 ≈ 10 × 0,30 = 3 dB: duas caixas de som iguais não fazem o dobro de decibéis, só 3 dB a mais.</p>`],
  warn: erros([['A) 1,3 vez:','divide os decibéis (80/60), como se a escala fosse linear.'],['B) 2 vezes:','divide a diferença (20 dB) por 10 e usa o resultado como fator.'],['C) 20 vezes:','usa a diferença em dB como fator de multiplicação.'],['E) 1 000 vezes:','conta três degraus de 10 dB.']]) },

{ src: 'Inédita', nivel: 'intermediário',
  text: '<p>A nova geração de telefonia móvel no Brasil, a 5G, usa principalmente a faixa de 3,5 GHz, frequência bem mais alta que a das gerações anteriores. Quanto maior a frequência, menor o comprimento de onda, o que permite antenas menores e mais transmissão de dados, mas com menor alcance. Considere a velocidade das ondas eletromagnéticas no ar igual a 3,0 × 10⁸ m/s.</p><p>O comprimento de onda da 5G nessa faixa é de, aproximadamente,</p>',
  opts: ['0,086 mm.','8,6 mm.','8,6 cm.','86 cm.','1,1 × 10¹⁸ m.'], ans: 2,
  hint: 'Use v = λ · f. Lembre que 1 GHz = 10⁹ Hz.',
  steps: [['Frequência no SI', '<div class="eq">f = 3,5 GHz = 3,5 × 10⁹ Hz</div>'],
          ['Comprimento de onda', `<div class="eq">λ = ${f('v','f')} = ${f('3,0 × 10⁸','3,5 × 10⁹')} ≈ 0,086 m = 8,6 cm</div>`]],
  alt: 'Compare: a rádio FM (100 MHz) tem λ = 3 m. A 5G tem frequência 35 vezes maior e, portanto, λ 35 vezes menor. É por isso que ela precisa de muito mais antenas, mais próximas umas das outras.',
  warn: erros([['A) 0,086 mm:','erra a conversão de metros para milímetros.'],['B) 8,6 mm:','erra a conversão de metros para centímetros.'],['D) 86 cm:','usa 10⁸ Hz no lugar de 10⁹ Hz.'],['E) 1,1 × 10¹⁸ m:','multiplica a velocidade pela frequência.']]) },

{ src: 'Inédita', nivel: 'intermediário',
  text: `<p>Um navio de pesquisa mapeia o fundo do mar com um sonar: um pulso de ultrassom é emitido para baixo, reflete no fundo e volta ao navio, como no esquema. Em um ponto da rota, o eco foi recebido 0,80 s depois da emissão. A velocidade do som na água do mar é de cerca de 1 500 m/s.</p>
${FIG_SONAR}
<p>A profundidade do mar nesse ponto é de, aproximadamente,</p>`,
  opts: ['300 m.','600 m.','1 200 m.','1 875 m.','2 400 m.'], ans: 1,
  hint: 'Em 0,80 s, o som fez o caminho de ida e o de volta.',
  steps: [['Distância percorrida', '<div class="eq">d<sub>total</sub> = 1 500 × 0,80 = 1 200 m</div>'],
          ['Profundidade', `<p>Ida e volta:</p><div class="eq">h = ${f('1 200','2')} = 600 m</div>`]],
  alt: 'É a mesma conta do morcego, do sensor de estacionamento e do ultrassom médico: d = v · Δt / 2. O “dividir por 2” só aparece quando há eco.',
  warn: erros([['A) 300 m:','divide por 2 duas vezes.'],['C) 1 200 m:','esquece que o som vai e volta.'],['D) 1 875 m:','divide a velocidade pelo tempo.'],['E) 2 400 m:','multiplica por 2 em vez de dividir.']]) },

{ src: 'Inédita', nivel: 'intermediário',
  text: '<p>Para afinar um violão, o músico gira a tarraxa e aumenta a tensão de uma corda, sem mudar o comprimento da parte que vibra. A nota tocada com a corda solta fica mais aguda.</p><p>A explicação física para esse efeito é que</p>',
  opts: ['a frequência aumenta, porque a velocidade da onda na corda aumenta.','a frequência aumenta, porque o comprimento de onda aumenta.','a frequência diminui, porque a corda fica esticada e vibra devagar.','a frequência não muda, porque o comprimento da corda é o mesmo.','a frequência diminui, porque a amplitude da vibração fica menor com a corda mais tensa.'], ans: 0,
  hint: 'Na corda presa nas pontas, o comprimento de onda do modo fundamental depende só do comprimento da corda. O que a tensão muda?',
  steps: [['O que fica fixo', '<p>O comprimento vibrante não muda; no modo fundamental, λ = 2L também não muda.</p>'],
          ['O que muda', '<p>A velocidade da onda numa corda cresce com a tensão (v = √(T/μ)). Com λ fixo, f = v/λ <b>aumenta</b>: o som fica mais agudo.</p>']],
  alt: 'Apertar a tarraxa (mais tensão) e apertar a corda numa casa do braço (menor comprimento) deixam o som mais agudo, mas por motivos diferentes: um muda v, o outro muda λ.',
  warn: erros([['B)','o comprimento de onda não muda (λ = 2L); e, se aumentasse com v fixa, f diminuiria.'],['C)','o som fica mais agudo, ou seja, a frequência aumenta.'],['D)','o comprimento é o mesmo, mas a velocidade da onda muda.'],['E)','a amplitude está ligada à intensidade (volume), não à altura.']]) },

{ src: 'Inédita', nivel: 'avançado',
  text: `<p>Na ultrassonografia, um detalhe só aparece bem na imagem se for maior que o comprimento de onda do ultrassom no tecido. Frequências mais altas mostram detalhes menores, mas penetram menos no corpo. Um médico quer visualizar estruturas de 0,25 mm, perto da pele, e dispõe dos transdutores do quadro. Considere a velocidade do ultrassom nos tecidos moles igual a 1 540 m/s.</p>
${tabela(['Transdutor','Frequência'],[['I','1,0 MHz'],['II','2,0 MHz'],['III','3,5 MHz'],['IV','5,0 MHz'],['V','7,5 MHz']])}
<p>O transdutor de menor frequência que permite visualizar essas estruturas é o</p>`,
  opts: ['I.','II.','III.','IV.','V.'], ans: 4,
  hint: 'Calcule λ = v/f para cada transdutor (ou descubra a frequência mínima para λ ≤ 0,25 mm).',
  steps: [['Frequência mínima', `<p>É preciso λ ≤ 0,25 mm = 2,5 × 10⁻⁴ m:</p><div class="eq">f ≥ ${f('1 540','2,5 × 10⁻⁴')} ≈ 6,2 MHz</div>`],
          ['Conferindo', '<p>5,0 MHz → λ ≈ 0,31 mm (maior que 0,25 mm: não serve).<br>7,5 MHz → λ ≈ 0,21 mm (serve).</p><p>Resposta: transdutor <b>V</b>.</p>']],
  alt: 'Exames de órgãos profundos (abdome, gestação) usam frequências mais baixas, de 2 a 5 MHz, porque precisam penetrar mais; estruturas superficiais (tireoide, tendões) usam 7 MHz ou mais.',
  warn: erros([['D) IV:','arredonda 0,31 mm para “cerca de 0,3 mm” e aceita; mas 0,31 mm é maior que 0,25 mm.'],['A) I:','escolhe a menor frequência, que tem o maior comprimento de onda (cerca de 1,5 mm).']]) },

{ src: 'Inédita', nivel: 'avançado',
  text: '<p>Quando a luz de uma estrela passa por um gás, alguns comprimentos de onda são absorvidos, gerando linhas escuras no espectro. Em laboratório, uma dessas linhas do hidrogênio aparece em 656 nm. No espectro de uma galáxia distante, a mesma linha aparece em 670 nm, deslocada para o lado vermelho do espectro.</p><p>Com base no efeito Doppler, conclui-se que a galáxia</p>',
  opts: ['se aproxima da Terra, pois a frequência recebida é maior.','se afasta da Terra, pois o comprimento de onda recebido é maior.','está parada, pois a velocidade da luz não muda.','se aproxima, pois a luz fica mais vermelha quando a fonte chega perto.','se afasta, pois a luz perde energia ao atravessar o espaço e fica mais lenta até chegar aqui.'], ans: 1,
  hint: 'Compare o comprimento de onda recebido (670 nm) com o emitido (656 nm). Na aproximação, as frentes de onda se “apertam” ou se “esticam”?',
  steps: [['Comprimento de onda', '<p>O comprimento de onda recebido (670 nm) é <b>maior</b> que o emitido (656 nm): a frequência recebida é menor.</p>'],
          ['Efeito Doppler', '<p>Comprimento de onda esticado indica que a fonte se <b>afasta</b>: é o “desvio para o vermelho”.</p>']],
  alt: 'Foi observando esse desvio para o vermelho em quase todas as galáxias que Hubble concluiu, nos anos 1920, que o Universo está em expansão.',
  warn: erros([['A)','a frequência recebida é menor (o comprimento de onda aumentou).'],['C)','a velocidade da luz é a mesma, mas a frequência e o comprimento de onda medidos mudam.'],['D)','na aproximação, a luz se desvia para o azul.'],['E)','a velocidade da luz no vácuo não diminui.']]) },

{ src: 'Inédita', nivel: 'avançado',
  text: `<p>Um aplicativo de celular registrou a variação de pressão do ar produzida por dois sons, A e B, como mostra o gráfico.</p>
${plot({aria:'Variação de pressão em função do tempo, de 0 a 8 milissegundos. O som A tem amplitude 2 e período 4 ms; o som B tem amplitude 1 e período 2 ms.', xmin:0, xmax:8, ymin:-2.4, ymax:2.4, xt:[0,2,4,6,8], yt:[-2,-1,0,1,2], xl:'t (ms)', yl:'Δp (u.a.)', L:[{p:sen(2, 4, 0, 8), c:'#0B6477', lab:'A', lp:[0.7,2.2]},{p:sen(1, 2, 0, 8), c:'#E8562A', lab:'B', lp:[2.3,1.25]}]})}
<p>Em comparação com o som A, o som B é</p>`,
  opts: ['mais grave e mais forte.','mais agudo e mais forte.','mais grave e mais fraco.','de mesma altura, porém mais fraco.','mais agudo e mais fraco.'], ans: 4,
  hint: 'Leia no gráfico o período (tempo de uma oscilação completa) e a amplitude (altura máxima) de cada som.',
  steps: [['Período e frequência', '<p>A: período 4 ms → f = 250 Hz. B: período 2 ms → f = 500 Hz. B tem frequência maior: é <b>mais agudo</b>.</p>'],
          ['Amplitude', '<p>A tem amplitude 2; B, amplitude 1. B tem menor amplitude: é <b>mais fraco</b>.</p>']],
  alt: 'Altura (grave/agudo) é a frequência: quantas oscilações cabem no gráfico. Intensidade (forte/fraco) é a amplitude: o tamanho da oscilação. São independentes.',
  warn: erros([['A)','inverte as duas comparações.'],['B)','acerta a altura, mas lê a amplitude errado.'],['C)','acerta a intensidade, mas confunde período maior com frequência maior.'],['D)','os períodos são diferentes; logo, as alturas também.']]) }
];

/* ===================== LISTA 3 · Cálculos que já caíram ===================== */
const Q_OND3 = [
{ src: 'Inédita', nivel: 'intermediário',
  text: `<p>Para comprovar que micro-ondas são ondas, um estudante retirou o prato giratório de um forno e aqueceu uma barra de chocolate por poucos segundos. Dentro do forno se formam ondas estacionárias, e o chocolate derrete apenas nas regiões de vibração máxima (ventres), como mostra a figura. A etiqueta do forno indica a frequência de 2,45 GHz.</p>
${FIG_CHOCOLATE}
<p>A velocidade das micro-ondas obtida nesse experimento é de, aproximadamente,</p>`,
  opts: ['1,47 × 10⁸ m/s.','2,94 × 10⁸ m/s.','5,88 × 10⁸ m/s.','2,94 × 10¹⁰ m/s.','5,88 × 10¹⁰ m/s.'], ans: 1,
  hint: 'Numa onda estacionária, dois ventres consecutivos estão separados por meio comprimento de onda.',
  steps: [['Comprimento de onda', '<p>Distância entre ventres consecutivos = λ/2:</p><div class="eq">λ = 2 × 6,0 = 12 cm = 0,12 m</div>'],
          ['Velocidade', '<div class="eq">v = λ · f = 0,12 × 2,45 × 10⁹ ≈ 2,94 × 10⁸ m/s</div><p>Muito próximo da velocidade da luz, como esperado para uma onda eletromagnética.</p>']],
  alt: 'Sem o prato giratório, os ventres ficam sempre no mesmo lugar e o alimento esquenta em “pontos quentes”. O prato gira justamente para espalhar esses pontos pelo alimento.',
  warn: erros([['A) 1,47 × 10⁸ m/s:','usa a distância entre ventres (6 cm) como λ.'],['C) 5,88 × 10⁸ m/s:','usa λ = 4 × 6 cm.'],['D) 2,94 × 10¹⁰ m/s:','acerta λ = 12, mas não converte centímetros em metros.'],['E) 5,88 × 10¹⁰ m/s:','usa λ = 24 e não converte centímetros em metros.']]) },

{ src: 'Inédita', nivel: 'intermediário',
  text: `<p>Ao soprar a boca de uma garrafa, ouve-se um som que corresponde ao modo fundamental de vibração da coluna de ar, que se comporta como um tubo fechado em uma extremidade (a superfície da água). Uma garrafa de 34 cm de altura contém água até a metade, como mostra a figura.</p>
${FIG_GARRAFA}
<p>Considere a velocidade do som no ar igual a 340 m/s e despreze o efeito do gargalo. A frequência do som emitido é de</p>`,
  opts: ['5,0 Hz.','58 Hz.','250 Hz.','500 Hz.','1 000 Hz.'], ans: 3,
  hint: 'Num tubo fechado, o modo fundamental tem um nó na superfície da água e um ventre na boca: o comprimento da coluna de ar é λ/4.',
  steps: [['Coluna de ar', '<p>Só a parte com ar vibra: L = 17 cm = 0,17 m.</p>'],
          ['Comprimento de onda', '<div class="eq">L = λ/4 → λ = 4 × 0,17 = 0,68 m</div>'],
          ['Frequência', `<div class="eq">f = ${f('v','λ')} = ${f('340','0,68')} = 500 Hz</div>`]],
  alt: 'Colocando mais água, a coluna de ar diminui e o som fica mais agudo. É o princípio de instrumentos de sopro e dos “xilofones de garrafas”.',
  warn: erros([['A) 5,0 Hz:','usa o comprimento em centímetros.'],['B) 58 Hz:','multiplica a velocidade pelo comprimento.'],['C) 250 Hz:','usa a altura total da garrafa (34 cm), e não a coluna de ar.'],['E) 1 000 Hz:','usa a fórmula do tubo aberto (λ = 2L).']]) },

{ src: 'Inédita', nivel: 'intermediário',
  text: `<p>Em um exame de ultrassom, o aparelho emite um pulso e registra os ecos refletidos nas faces de uma estrutura do corpo. O gráfico mostra a intensidade dos ecos em função do tempo, contado a partir da emissão. O primeiro eco vem da face mais próxima da estrutura; o segundo, da face mais distante.</p>
${plot({aria:'Intensidade dos ecos em função do tempo, em microssegundos. Há um pico no instante 20 μs e outro no instante 46 μs.', xmin:0, xmax:60, ymin:0, ymax:1.2, xt:[0,10,20,30,40,46,50,60], yt:[], xl:'t (μs)', yl:'eco', L:[{p:[[0,0],[18.5,0],[20,1],[21.5,0],[44.5,0],[46,0.7],[47.5,0],[60,0]], c:'#0B6477', w:2.5}]})}
<p>Considerando a velocidade do ultrassom nos tecidos igual a 1 540 m/s, a espessura da estrutura é de, aproximadamente,</p>`,
  opts: ['1,0 cm.','1,5 cm.','2,0 cm.','3,5 cm.','4,0 cm.'], ans: 2,
  hint: 'A diferença de tempo entre os ecos corresponde ao som atravessar a estrutura duas vezes (ida e volta).',
  steps: [['Diferença de tempo', '<div class="eq">Δt = 46 − 20 = 26 μs = 26 × 10⁻⁶ s</div>'],
          ['Espessura', `<p>Ida e volta dentro da estrutura:</p><div class="eq">e = ${f('v · Δt','2')} = ${f('1 540 × 26 × 10⁻⁶','2')} ≈ 0,020 m = 2,0 cm</div>`]],
  alt: 'Cada eco dá a profundidade de uma face: 1 540 × 20 μs / 2 ≈ 1,5 cm e 1 540 × 46 μs / 2 ≈ 3,5 cm. A espessura é a diferença: 3,5 − 1,5 = 2,0 cm.',
  warn: erros([['B) 1,5 cm:','dá a profundidade da primeira face, não a espessura.'],['D) 3,5 cm:','dá a profundidade da segunda face.'],['E) 4,0 cm:','esquece que o som vai e volta.']]) },

{ src: 'Inédita', nivel: 'intermediário',
  text: '<p>Um alto-falante à prova d’água, colocado na borda de uma piscina, emite no ar um som de 1 000 Hz. Parte dessa onda passa para a água. Considere a velocidade do som igual a 340 m/s no ar e 1 480 m/s na água.</p><p>Na água, a frequência e o comprimento de onda desse som são, respectivamente,</p>',
  opts: ['1 000 Hz e 1,48 m.','4 350 Hz e 0,34 m.','1 000 Hz e 0,34 m.','230 Hz e 1,48 m.','1 000 Hz e 0,078 m.'], ans: 0,
  hint: 'Na refração, quem “manda” na frequência é a fonte. O que muda junto com a velocidade?',
  steps: [['Frequência', '<p>A frequência é determinada pela fonte e <b>não muda</b> na refração: 1 000 Hz.</p>'],
          ['Comprimento de onda', `<div class="eq">λ<sub>água</sub> = ${f('1 480','1 000')} = 1,48 m</div><p>Maior que no ar (0,34 m), porque a velocidade aumentou na mesma proporção.</p>`]],
  alt: 'Pense na onda como uma fila de cristas saindo da fonte num ritmo fixo: cada crista que chega à fronteira gera uma crista do outro lado, no mesmo ritmo. Mais rápida na água, cada crista se afasta mais da anterior: λ maior.',
  warn: erros([['B) 4 350 Hz e 0,34 m:','acha que a frequência muda e o comprimento de onda fica fixo.'],['C) 1 000 Hz e 0,34 m:','mantém o comprimento de onda do ar.'],['D) 230 Hz e 1,48 m:','muda a frequência na proporção inversa das velocidades.'],['E) 1 000 Hz e 0,078 m:','inverte a proporção (λ diminui em vez de aumentar).']]) },

{ src: 'Inédita', nivel: 'avançado',
  text: `<p>Em uma aula sobre ondas estacionárias, uma corda de 1,2 m, presa nas duas extremidades, foi posta para vibrar por um gerador de 150 Hz. A foto, tirada com longa exposição, mostra o padrão formado.</p>
${plot({aria:'Corda de 1,2 m vibrando com três ventres e quatro nós, incluindo as extremidades em 0 e 1,2 m.', xmin:0, xmax:1.2, ymin:-1.3, ymax:1.3, xt:[0,0.4,0.8,1.2], yt:[], xl:'x (m)', yl:'', L:[{p:sen(1, 0.8, 0, 1.2), c:'#0B6477'},{p:sen(-1, 0.8, 0, 1.2), c:'#0B6477'}], pts:[[0,0],[0.4,0],[0.8,0],[1.2,0]]})}
<p>A velocidade de propagação das ondas nessa corda é de</p>`,
  opts: ['60 m/s.','120 m/s.','180 m/s.','360 m/s.','540 m/s.'], ans: 1,
  hint: 'Conte os ventres (“barrigas”). Cada ventre ocupa meio comprimento de onda.',
  steps: [['Comprimento de onda', `<p>Há 3 ventres em 1,2 m; cada ventre vale λ/2:</p><div class="eq">3 × ${f('λ','2')} = 1,2 → λ = 0,80 m</div>`],
          ['Velocidade', '<div class="eq">v = λ · f = 0,80 × 150 = 120 m/s</div>']],
  alt: 'Pela fórmula do harmônico: é o 3º harmônico, f₃ = 3v/(2L) → v = 2 × 1,2 × 150 / 3 = 120 m/s. O modo fundamental dessa corda seria 50 Hz.',
  warn: erros([['A) 60 m/s:','usa λ = 0,4 m (a distância entre nós, que é λ/2).'],['C) 180 m/s:','usa o comprimento da corda como λ.'],['D) 360 m/s:','usa λ = 2L, como se fosse o modo fundamental.'],['E) 540 m/s:','usa λ = 3L, multiplicando pelo número de ventres.']]) },

{ src: 'Inédita', nivel: 'avançado',
  text: '<p>Em águas profundas, a velocidade de um tsunami pode ser estimada por v = √(g · h), em que h é a profundidade do oceano. Em alto-mar, um tsunami tem altura de poucos centímetros e passa despercebido pelos navios, mas carrega muita energia. Considere um tsunami em um trecho do oceano com 4 000 m de profundidade, com período de 15 min, e g = 10 m/s².</p><p>O comprimento de onda desse tsunami é de, aproximadamente,</p>',
  opts: ['3,0 km.','50 km.','180 km.','720 km.','10 800 km.'], ans: 2,
  hint: 'Calcule a velocidade em m/s e use λ = v · T, com o período em segundos.',
  steps: [['Velocidade', '<div class="eq">v = √(10 × 4 000) = √40 000 = 200 m/s (720 km/h)</div>'],
          ['Comprimento de onda', '<div class="eq">λ = v · T = 200 × 900 = 180 000 m = 180 km</div>']],
  alt: 'Com λ de 180 km, a crista e o vale ficam a 90 km de distância: um navio sobe alguns centímetros ao longo de vários minutos e nem percebe. Perto da costa, a profundidade diminui, a onda freia e a altura cresce muito.',
  warn: erros([['A) 3,0 km:','usa o período em minutos (200 × 15).'],['B) 50 km:','usa 200 km/h no lugar de 200 m/s e 1/4 de hora.'],['D) 720 km:','usa a velocidade em km/h com o período de 1 h.'],['E) 10 800 km:','multiplica 720 km/h por 15, misturando horas e minutos.']]) },

{ src: 'Inédita', nivel: 'avançado',
  text: '<p>A corda mais grave de um violão (mi) tem 65 cm de parte vibrante e, tocada solta, emite no modo fundamental um som de 82 Hz. Um luthier substituiu essa corda por outra de densidade linear 6,0 g/m e a afinou na mesma nota. Sabe-se que a velocidade de uma onda numa corda é v = √(T/μ), em que T é a tensão e μ é a densidade linear.</p><p>A tensão na corda nova é de, aproximadamente,</p>',
  opts: ['0,64 N.','17 N.','68 N.','6,8 × 10⁴ N.','6,8 × 10⁵ N.'], ans: 2,
  hint: 'Primeiro, a velocidade da onda: no modo fundamental, λ = 2L. Depois isole T e use μ em kg/m.',
  steps: [['Velocidade', '<div class="eq">λ = 2 × 0,65 = 1,30 m → v = 1,30 × 82 ≈ 106,6 m/s</div>'],
          ['Tensão', '<p>μ = 6,0 g/m = 6,0 × 10⁻³ kg/m.</p><div class="eq">T = μ · v² = 6,0 × 10⁻³ × 106,6² ≈ 68 N</div>']],
  alt: 'Cordas graves são mais grossas (μ maior) para soar graves sem precisar de tensão muito baixa, o que deixaria a corda frouxa. As seis cordas de um violão ficam com tensões parecidas, de 60 a 80 N.',
  warn: erros([['A) 0,64 N:','usa T = μ · v, sem elevar ao quadrado.'],['B) 17 N:','usa λ = L em vez de 2L.'],['D) 6,8 × 10⁴ N:','não converte g/m em kg/m.'],['E) 6,8 × 10⁵ N:','usa o comprimento em centímetros.']]) },

{ src: 'Inédita', nivel: 'avançado',
  text: '<p>Em um festival ao ar livre, um técnico mede 90 dB a 2,0 m de uma caixa de som. Ao ar livre, a intensidade sonora cai com o quadrado da distância (I ∝ 1/r²), e cada redução da intensidade por um fator 10 corresponde a 10 dB a menos.</p><p>O nível sonoro a 20 m dessa caixa é de, aproximadamente,</p>',
  opts: ['0,90 dB.','9,0 dB.','45 dB.','70 dB.','80 dB.'], ans: 3,
  hint: 'A distância ficou 10 vezes maior. Quantas vezes menor fica a intensidade? Quantos “degraus” de 10 dB isso representa?',
  steps: [['Intensidade', `<p>A distância aumentou 10 vezes; com I ∝ 1/r²:</p><div class="eq">I<sub>20 m</sub> = ${f('I<sub>2 m</sub>','10²')} = ${f('I<sub>2 m</sub>','100')}</div>`],
          ['Decibéis', '<p>Um fator 100 = 10 × 10, ou seja, dois degraus de 10 dB:</p><div class="eq">90 − 20 = 70 dB</div>']],
  alt: 'Regra útil: dobrar a distância ao ar livre tira cerca de 6 dB; multiplicar por 10 tira 20 dB. Afastar-se das caixas é a proteção mais simples para os ouvidos.',
  deep: ['A mesma resposta pela fórmula com logaritmo', `<p>O nível sonoro é β = 10 · log (I/I₀). Para comparar dois pontos, subtraia os níveis (log a − log b = log a/b):</p>
<div class="eq">β₂ − β₁ = 10 · log ${f('I₂','I₁')}</div>
<p><b>1. Razão das intensidades</b> (I ∝ 1/r²):</p>
<div class="eq">${f('I₂','I₁')} = ${f('r₁²','r₂²')} = (${f('2,0','20')})²</div>
<div class="eq">${f('I₂','I₁')} = (10⁻¹)² = 10⁻²</div>
<p><b>2. Diferença de nível</b> (log 10ⁿ = n):</p>
<div class="eq">β₂ − β₁ = 10 · log 10⁻²</div>
<div class="eq">β₂ − β₁ = 10 × (−2)</div>
<div class="eq">β₂ − β₁ = −20 dB</div>
<div class="eq">β₂ = 90 − 20 = 70 dB</div>
<p><b>De onde vem a regra dos 6 dB:</b> dobrando a distância, I₂/I₁ = (1/2)² = 1/4, e o nível muda 10 · log (1/4) = −20 · log 2 ≈ −20 × 0,30 = −6 dB.</p>`],
  warn: erros([['A) 0,90 dB:','divide os decibéis por 100, como se a escala fosse linear.'],['B) 9,0 dB:','divide os decibéis por 10.'],['C) 45 dB:','acha que o nível em dB cai à metade.'],['E) 80 dB:','usa I ∝ 1/r (um só degrau de 10 dB).']]) },

{ src: 'Inédita', nivel: 'avançado',
  text: '<p>Um trem se aproxima de uma estação, a 34 m/s, tocando uma buzina de 500 Hz. Uma pessoa parada na plataforma ouve um som mais agudo. Para a fonte em movimento e o observador parado, a frequência percebida é f′ = f · v/(v − v<sub>f</sub>) na aproximação, em que v = 340 m/s é a velocidade do som e v<sub>f</sub> é a velocidade da fonte.</p><p>A frequência percebida pela pessoa enquanto o trem se aproxima é de, aproximadamente,</p>',
  opts: ['450 Hz.','455 Hz.','500 Hz.','550 Hz.','556 Hz.'], ans: 4,
  hint: 'Substitua os valores na fórmula dada. Atenção ao sinal no denominador.',
  steps: [['Substituição', `<div class="eq">f′ = 500 × ${f('340','340 − 34')} = 500 × ${f('340','306')}</div>`],
          ['Resultado', '<div class="eq">f′ ≈ 556 Hz</div><p>Depois que o trem passa, com v + v<sub>f</sub> no denominador, a pessoa ouve ≈ 455 Hz.</p>']],
  alt: 'O trem anda a 10% da velocidade do som, mas a frequência não sobe exatamente 10%: sobe 500/0,9 − 500 ≈ 56 Hz. A fórmula não é “f vezes 1,1”.',
  warn: erros([['A) 450 Hz:','reduz 10% (500 × 306/340), invertendo a fração.'],['B) 455 Hz:','é a frequência percebida no afastamento.'],['C) 500 Hz:','ignora o efeito Doppler (é o que o maquinista ouve).'],['D) 550 Hz:','soma 10% (500 × 374/340) em vez de usar a fórmula.']]) },

{ src: 'Inédita', nivel: 'avançado',
  text: `<p>Dois alto-falantes, A e B, ligados ao mesmo aparelho, emitem em fase um som de 680 Hz. Um ouvinte no ponto P, a 3,00 m de A, percebe que o som quase some para certas distâncias d até B, como no esquema. Considere a velocidade do som no ar igual a 340 m/s.</p>
${FIG_ALTOFALANTES}
<p>A menor diferença entre as distâncias de P aos dois alto-falantes que produz esse “silêncio” é de</p>`,
  opts: ['12,5 cm.','25 cm.','50 cm.','68 cm.','100 cm.'], ans: 1,
  hint: 'Calcule o comprimento de onda. Para as ondas chegarem em oposição de fase, uma deve percorrer meio comprimento de onda a mais que a outra.',
  steps: [['Comprimento de onda', `<div class="eq">λ = ${f('v','f')} = ${f('340','680')} = 0,50 m</div>`],
          ['Interferência destrutiva', `<p>Crista de uma encontra vale da outra quando a diferença de caminho é λ/2, 3λ/2…</p><div class="eq">Δd<sub>mín</sub> = ${f('λ','2')} = 0,25 m = 25 cm</div><p>Por exemplo, com d = 3,25 m.</p>`]],
  alt: 'Se a diferença de caminho for um número inteiro de comprimentos de onda (0, 50 cm, 100 cm…), as ondas chegam em fase e o som fica mais forte. Os pontos de silêncio e de reforço se alternam pelo ambiente.',
  warn: erros([['A) 12,5 cm:','usa λ/4.'],['C) 50 cm:','usa λ inteiro, que dá interferência construtiva.'],['D) 68 cm:','confunde a frequência com a distância.'],['E) 100 cm:','usa 2λ, que também é construtiva.']]) }
];
