/* ---------- Eletricidade e circuitos · Lista ENEM (10 questões inéditas) ---------- */
const TOOLS_ELET = [
  ['Lei de Ohm e potência', `U = R · i &nbsp;·&nbsp; P = U · i = R · i² = ${f('U²','R')}`],
  ['Resistência do fio', `R = ρ · ${f('L','A')} (mais comprido: maior R; mais grosso: menor R)`],
  ['Associações', `Série: mesma corrente; R<sub>eq</sub> = R₁ + R₂ + …<br>Paralelo: mesma tensão; ${f('1','R<sub>eq</sub>')} = ${f('1','R₁')} + ${f('1','R₂')} + …`],
  ['Energia e carga', `E = P · Δt (kWh ou Wh) &nbsp;·&nbsp; Q = i · Δt (A·h ou mA·h)<br>Energia de uma bateria: E = U · Q (V × A·h = Wh)`],
  ['Gerador real', `U = ε − r · i (a tensão nos terminais cai quando a corrente aumenta)`],
  ['Medidores', `Amperímetro: em série · Voltímetro: em paralelo`],
  ['Ponte de Wheatstone', `Galvanômetro zerado: R₁ · R₄ = R₂ · R₃ (produtos dos braços opostos)`]
];

const lamp = (x, y, lab) => `<circle cx="${x}" cy="${y}" r="13" fill="var(--surface)" stroke="var(--ink)" stroke-width="2"/><path d="M${x-9} ${y-9} L${x+9} ${y+9} M${x+9} ${y-9} L${x-9} ${y+9}" stroke="var(--ink)" stroke-width="1.6"/><text x="${x}" y="${y-19}" text-anchor="middle" class="pt pt-strong">${lab}</text>`;

const FIG_LAMPADAS = fig('0 0 340 200', 'Circuito: uma bateria alimenta a lâmpada L1, ligada em série com o conjunto das lâmpadas L2 e L3, que estão em paralelo entre si. As três lâmpadas são idênticas.',
  `<path d="M40 40 H300 V170 H40 Z" fill="none" stroke="var(--ink)" stroke-width="2"/>
   <path d="M230 40 V170" stroke="var(--ink)" stroke-width="2"/>
   <rect x="28" y="92" width="24" height="26" fill="var(--surface)" stroke="none"/>
   <path d="M26 96 H54 M32 106 H48 M26 116 H54 M32 126 H48" stroke="var(--ink)" stroke-width="2.4"/>
   <text x="20" y="114" text-anchor="end" class="pt">ε</text>
   ${lamp(130, 40, 'L1')}${lamp(230, 105, '')}${lamp(300, 105, '')}
   <text x="212" y="110" text-anchor="end" class="pt pt-strong">L2</text>
   <text x="318" y="110" class="pt pt-strong">L3</text>`, 380);

const resist = (x1, y1, x2, y2, lab, dx, dy) => { const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, ang = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI; return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="var(--ink)" stroke-width="2"/><rect x="${mx-18}" y="${my-7}" width="36" height="14" fill="var(--surface)" stroke="var(--ink)" stroke-width="2" transform="rotate(${ang} ${mx} ${my})"/><text x="${mx + dx}" y="${my + dy}" text-anchor="middle" class="pt pt-strong">${lab}</text>`; };

const FIG_PONTE = fig('0 0 340 230', 'Ponte de Wheatstone em forma de losango. Do nó superior saem R1 = 100 ohms, para a esquerda, e R2 = 200 ohms, para a direita. Do nó inferior saem R3 = 150 ohms, para a esquerda, e o sensor RS, para a direita. Um galvanômetro G liga os nós da esquerda e da direita. Uma bateria liga os nós superior e inferior.',
  `${resist(190, 25, 110, 110, 'R₁ = 100 Ω', -52, -6)}${resist(190, 25, 270, 110, 'R₂ = 200 Ω', 54, -6)}
   ${resist(110, 110, 190, 195, 'R₃ = 150 Ω', -52, 12)}${resist(270, 110, 190, 195, 'R<tspan font-size="9">S</tspan> (sensor)', 56, 12)}
   <line x1="110" y1="110" x2="270" y2="110" stroke="var(--ink)" stroke-width="1.6"/>
   <circle cx="190" cy="110" r="13" fill="var(--surface)" stroke="var(--ink)" stroke-width="2"/><text x="190" y="115" text-anchor="middle" class="pt pt-strong">G</text>
   <path d="M190 25 H30 V95 M30 125 V195 H190" fill="none" stroke="var(--ink)" stroke-width="2"/>
   <path d="M16 99 H44 M22 109 H38 M16 119 H44" stroke="var(--ink)" stroke-width="2.4"/>
   ${[[190,25],[110,110],[270,110],[190,195]].map(([x,y]) => `<circle cx="${x}" cy="${y}" r="3.5" fill="var(--ink)"/>`).join('')}`, 380);

const Q_ELET = [
{ src: 'Inédita', nivel: 'básico',
  text: '<p>Em um pisca-pisca de Natal antigo, quando uma das lâmpadas queima, todas as outras se apagam. Já em uma casa, quando a lâmpada da sala queima, as dos outros cômodos continuam acesas e os aparelhos continuam funcionando.</p><p>Essa diferença acontece porque</p>',
  opts: ['no pisca-pisca, as lâmpadas estão em série; em casa, em paralelo.','no pisca-pisca, as lâmpadas estão em paralelo; em casa, em série.','as lâmpadas do pisca-pisca funcionam com corrente contínua.','em casa, cada lâmpada tem um fusível próprio dentro do bulbo.','a lâmpada queimada passa a conduzir toda a corrente, e as outras ficam sem energia elétrica.'], ans: 0,
  hint: 'Quando uma lâmpada queima, seu filamento se rompe e ela vira um “circuito aberto”. Em que tipo de ligação isso interrompe a corrente em todas?',
  steps: [['Lâmpada queimada', '<p>O filamento se rompe: por aquela lâmpada não passa mais corrente.</p>'],
          ['Série', '<p>Em série, só há um caminho para a corrente: interrompido em um ponto, ele se interrompe para todas. Por isso o pisca-pisca apaga inteiro.</p>'],
          ['Paralelo', '<p>Em paralelo, cada aparelho tem o próprio caminho e recebe a tensão total da rede: um deles desligado não afeta os outros. É assim a instalação de uma casa.</p>']],
  alt: 'A ligação em paralelo também garante que todos os aparelhos da casa recebam a mesma tensão (127 V ou 220 V), que é a tensão para a qual foram fabricados.',
  warn: erros([['B)','inverte as ligações.'],['C)','o tipo de corrente não explica o apagão de todas.'],['D)','lâmpadas não têm fusível no bulbo; quem protege é o disjuntor do circuito.'],['E)','a lâmpada queimada deixa de conduzir; ela não “rouba” a corrente.']]) },

{ src: 'Inédita', nivel: 'básico',
  text: `<p>Uma família vai ligar um aquecedor elétrico potente por meio de uma extensão. O eletricista alerta que o fio da extensão também esquenta e que deve ser escolhida a extensão de menor resistência elétrica. As opções disponíveis, todas de fios de cobre, estão no quadro.</p>
${tabela(['Extensão','Comprimento','Área da seção do fio'],[['I','5 m','0,75 mm²'],['II','5 m','2,5 mm²'],['III','10 m','1,5 mm²'],['IV','10 m','0,75 mm²'],['V','20 m','2,5 mm²']])}
<p>A extensão mais adequada é a</p>`,
  opts: ['I.','II.','III.','IV.','V.'], ans: 1,
  hint: 'Pela segunda lei de Ohm, R = ρ · L/A. Como o material é o mesmo, compare a razão L/A de cada extensão.',
  steps: [['Segunda lei de Ohm', '<p>Mesmo material (mesmo ρ): a resistência é proporcional a L/A. Fio <b>curto</b> e <b>grosso</b> tem menor resistência.</p>'],
          ['Comparação', '<p>L/A: I = 6,7 · II = 2,0 · III = 6,7 · IV = 13,3 · V = 8,0 (em m/mm²).</p><p>Menor resistência: <b>II</b>.</p>']],
  alt: 'Fio fino e comprido esquenta mais (P = R · i²) e pode derreter o isolamento e causar incêndio. Por isso aparelhos potentes, como chuveiros e aquecedores, exigem fios grossos e ligação direta na tomada.',
  warn: erros([['I)','é curta, mas o fio é fino.'],['IV)','é a pior opção: comprida e fina.'],['V)','tem fio grosso, mas é quatro vezes mais comprida que a II.']]) },

{ src: 'Inédita', nivel: 'básico',
  text: '<p>Em uma aula de laboratório, um estudante monta um circuito com uma pilha e uma pequena lâmpada. Ele quer medir, ao mesmo tempo, a corrente elétrica que atravessa a lâmpada e a tensão elétrica entre os terminais dela, usando um amperímetro e um voltímetro.</p><p>Para fazer as medidas corretamente, ele deve ligar</p>',
  opts: ['o amperímetro e o voltímetro em série com a lâmpada.','o amperímetro em paralelo e o voltímetro em série com a lâmpada.','o amperímetro em série e o voltímetro em paralelo com a lâmpada.','o amperímetro e o voltímetro em paralelo com a lâmpada.','o amperímetro em paralelo com a pilha e o voltímetro em série com a lâmpada, para não interferir na corrente.'], ans: 2,
  hint: 'Para medir corrente, ela precisa passar por dentro do medidor. Para medir tensão, o medidor compara dois pontos.',
  steps: [['Amperímetro', '<p>A corrente da lâmpada tem de atravessar o aparelho: ligação <b>em série</b>. Ele tem resistência muito pequena, para não alterar a corrente.</p>'],
          ['Voltímetro', '<p>Mede a diferença de potencial entre os terminais da lâmpada: ligação <b>em paralelo</b>. Ele tem resistência muito grande, para quase não desviar corrente.</p>']],
  alt: 'Um amperímetro ligado em paralelo funciona como um curto-circuito (resistência quase nula): pode queimar o fusível do aparelho ou descarregar a pilha.',
  warn: erros([['A)','em série, o voltímetro, de resistência enorme, praticamente corta a corrente.'],['B)','inverte as duas ligações.'],['D)','em paralelo, o amperímetro provoca um curto-circuito.'],['E)','amperímetro em paralelo com a pilha é um curto-circuito.']]) },

{ src: 'Inédita', nivel: 'intermediário',
  text: '<p>Uma lanterna funciona com três pilhas de 1,5 V ligadas em série e uma lâmpada de 4,5 V e 0,9 W. Cada pilha tem capacidade de 2 000 mAh, ou seja, pode fornecer uma corrente de 2 000 mA durante 1 hora (ou uma corrente menor por mais tempo).</p><p>Com a lâmpada funcionando nas condições nominais, a lanterna fica acesa por, aproximadamente,</p>',
  opts: ['2,2 h.','3,3 h.','6,7 h.','10 h.','30 h.'], ans: 3,
  hint: 'Calcule a corrente na lâmpada (P = U · i). Em série, a mesma corrente atravessa as três pilhas.',
  steps: [['Corrente', `<div class="eq">i = ${f('P','U')} = ${f('0,9','4,5')} = 0,2 A = 200 mA</div>`],
          ['Série', '<p>Em série, a tensão das pilhas se soma (4,5 V), mas a mesma corrente atravessa todas elas: cada pilha fornece os 200 mA.</p>'],
          ['Duração', `<div class="eq">Δt = ${f('2 000 mAh','200 mA')} = 10 h</div>`]],
  alt: 'Associar pilhas em série aumenta a tensão; em paralelo, a tensão fica a de uma pilha, mas a carga disponível (e a duração) aumenta.',
  warn: erros([['A) 2,2 h:','divide a capacidade (2 Ah) pela potência (0,9 W), misturando grandezas.'],['B) 3,3 h:','divide o tempo pelas três pilhas.'],['E) 30 h:','soma a capacidade das três pilhas, como se estivessem em paralelo.']]) },

{ src: 'Inédita', nivel: 'intermediário',
  text: '<p>Uma pessoa se muda para uma cidade onde a rede elétrica é de 220 V e leva seu chuveiro, de 5 500 W, fabricado para funcionar em 127 V. Antes de instalar, ela pergunta a um técnico o que aconteceria se o chuveiro fosse ligado diretamente na rede nova. Considere que a resistência do chuveiro não varia.</p><p>Ligado em 220 V, a potência do chuveiro passaria a ser de, aproximadamente,</p>',
  opts: ['3 200 W.','5 500 W.','9 500 W.','16 500 W.','28 600 W.'], ans: 3,
  hint: 'Com a resistência fixa, use P = U²/R: a potência é proporcional ao quadrado da tensão.',
  steps: [['Razão das tensões', `<div class="eq">${f('220','127')} ≈ 1,73</div>`],
          ['Potência', '<p>Com R fixa, P ∝ U²:</p><div class="eq">P′ = 5 500 × 1,73² ≈ 5 500 × 3 ≈ 16 500 W</div><p>O triplo da potência de projeto: a resistência queima em pouco tempo.</p>']],
  alt: 'Para usar a mesma potência em 220 V, a resistência teria de ser cerca de 3 vezes maior. Por isso existem chuveiros específicos para cada tensão, e a solução segura é trocar o aparelho, com instalação feita por profissional habilitado.',
  warn: erros([['A) 3 200 W:','inverte a razão das tensões (127/220) e esquece o quadrado.'],['B) 5 500 W:','acha que a potência não depende da tensão.'],['C) 9 500 W:','usa a razão das tensões sem elevar ao quadrado.'],['E) 28 600 W:','eleva a razão das tensões ao cubo.']]) },

{ src: 'Inédita', nivel: 'intermediário',
  text: `<p>Um aquecedor de ambiente tem dois resistores iguais, de 20 Ω cada, e uma chave seletora de três posições, descritas no quadro. Ele é ligado em 220 V.</p>
${tabela(['Posição','Ligação'],[['Mínima','os dois resistores em série'],['Média','apenas um resistor'],['Máxima','os dois resistores em paralelo']])}
<p>As potências do aquecedor nas posições mínima e máxima são, respectivamente,</p>`,
  opts: ['1 210 W e 2 420 W.','1 210 W e 4 840 W.','2 420 W e 4 840 W.','4 840 W e 1 210 W.','605 W e 2 420 W.'], ans: 1,
  hint: 'Calcule a resistência equivalente de cada posição e use P = U²/R. Atenção: menor resistência significa maior potência.',
  steps: [['Resistências equivalentes', '<p>Série: 20 + 20 = 40 Ω. Paralelo: 20/2 = 10 Ω.</p>'],
          ['Potências', `<div class="eq">P<sub>mín</sub> = ${f('220²','40')} = 1 210 W</div><div class="eq">P<sub>máx</sub> = ${f('220²','10')} = 4 840 W</div>`]],
  alt: 'Com tensão fixa, quanto menor a resistência, maior a corrente e maior a potência. Por isso a posição “mais quente” é a de resistores em paralelo, e não em série.',
  warn: erros([['A) 1 210 W e 2 420 W:','dá a potência da posição média como máxima.'],['C) 2 420 W e 4 840 W:','dá a posição média como mínima.'],['D) 4 840 W e 1 210 W:','acha que mais resistência dá mais calor.'],['E) 605 W e 2 420 W:','usa 80 Ω para a associação em série.']]) },

{ src: 'Inédita', nivel: 'intermediário',
  text: '<p>A bateria de um patinete elétrico tem tensão de 36 V e capacidade de 10 Ah. Em uso típico na cidade, o patinete consome 12 Wh de energia por quilômetro rodado.</p><p>Com a bateria totalmente carregada, a autonomia do patinete é de, aproximadamente,</p>',
  opts: ['0,83 km.','3,0 km.','30 km.','360 km.','4 320 km.'], ans: 2,
  hint: 'A energia guardada na bateria é tensão × carga. Com ela em Wh, compare com o consumo por quilômetro.',
  steps: [['Energia da bateria', '<div class="eq">E = U · Q = 36 V × 10 Ah = 360 Wh</div>'],
          ['Autonomia', `<div class="eq">${f('360 Wh','12 Wh/km')} = 30 km</div>`]],
  alt: 'Ampère-hora mede carga elétrica, não energia. Só multiplicando pela tensão se obtém a energia em watt-hora. É a mesma conta para celulares, notebooks e carros elétricos (que usam kWh).',
  warn: erros([['A) 0,83 km:','divide a carga (10 Ah) pelo consumo, sem usar a tensão.'],['B) 3,0 km:','divide a tensão pelo consumo.'],['D) 360 km:','lê a energia (360 Wh) como a distância.'],['E) 4 320 km:','multiplica a energia pelo consumo.']]) },

{ src: 'Inédita', nivel: 'avançado',
  text: `<p>Para iluminar uma maquete, um estudante montou o circuito da figura com três lâmpadas idênticas e uma bateria de resistência interna desprezível. Considere que a resistência das lâmpadas não varia.</p>
${FIG_LAMPADAS}
<p>Se a lâmpada L3 for retirada do soquete, o brilho das lâmpadas L1 e L2 passa a ser:</p>`,
  opts: ['L1 e L2 brilham mais.','L1 e L2 brilham menos.','L1 brilha mais e L2 brilha menos.','L1 brilha menos e L2 brilha mais.','L1 não muda e L2 brilha mais, pois recebe a corrente que ia para L3.'], ans: 3,
  hint: 'Calcule a resistência equivalente antes e depois. Depois compare a corrente em cada lâmpada: o brilho depende de P = R · i².',
  steps: [['Antes', '<p>R<sub>eq</sub> = R + R/2 = 1,5R → corrente total i = ε/1,5R ≈ 0,67 ε/R.<br>L1 recebe 0,67 ε/R; L2 recebe metade: 0,33 ε/R.</p>'],
          ['Depois', '<p>Sem L3, L1 e L2 ficam em série: R<sub>eq</sub> = 2R → i = 0,5 ε/R nas duas.</p>'],
          ['Comparação', '<p>L1: de 0,67 para 0,50 ε/R → <b>brilha menos</b>. L2: de 0,33 para 0,50 ε/R → <b>brilha mais</b>.</p>']],
  alt: 'Retirar uma lâmpada em paralelo aumenta a resistência total: a corrente da bateria diminui (L1 enfraquece), e a tensão que sobra para L2 aumenta (L2 fortalece). Pensar só “a corrente de L3 vai toda para L2” esquece que a corrente total também muda.',
  warn: erros([['A)','a resistência total aumenta; a corrente de L1 não pode crescer.'],['B)','L2 passa a ter mais tensão e mais corrente.'],['C)','inverte os dois efeitos.'],['E)','a corrente total da bateria muda; L1 é afetada.']]) },

{ src: 'Inédita', nivel: 'avançado',
  text: '<p>A bateria de um carro tem força eletromotriz de 12 V e resistência interna de 0,05 Ω. Ao dar a partida, o motor de arranque solicita uma corrente de 100 A. Muitos motoristas notam que, nesse momento, os faróis acesos ficam bem mais fracos.</p><p>Durante a partida, a tensão nos terminais da bateria e o efeito nos faróis são:</p>',
  opts: ['12 V; os faróis não mudam.','7,0 V; os faróis ficam mais fracos.','5,0 V; os faróis ficam mais fracos.','17 V; os faróis ficam mais fortes.','7,0 V; os faróis ficam mais fortes, pois a corrente total da bateria aumenta.'], ans: 1,
  hint: 'Num gerador real, parte da tensão “fica” na resistência interna: U = ε − r · i.',
  steps: [['Tensão nos terminais', '<div class="eq">U = ε − r · i = 12 − 0,05 × 100 = 12 − 5 = 7,0 V</div>'],
          ['Faróis', '<p>Os faróis estão ligados aos terminais da bateria. Com a tensão caindo de 12 V para 7 V, a potência deles (P = U²/R) cai para cerca de (7/12)² ≈ 34% do normal: brilham bem menos.</p>']],
  alt: 'Com a corrente pequena dos faróis, a queda na resistência interna é desprezível e a bateria entrega quase 12 V. Só a corrente enorme do motor de arranque torna a queda importante.',
  warn: erros([['A) 12 V:','ignora a resistência interna.'],['C) 5,0 V:','dá a queda na resistência interna, não a tensão nos terminais.'],['D) 17 V:','soma a queda em vez de subtrair.'],['E)','acerta a tensão, mas o brilho depende da tensão nos faróis, que diminuiu.']]) },

{ src: 'Inédita', nivel: 'avançado',
  text: `<p>Em uma estufa, a temperatura é monitorada por um sensor resistivo R<sub>S</sub> instalado em uma ponte de Wheatstone, como no esquema. O técnico ajusta o circuito e percebe que o galvanômetro G não indica corrente (ponte em equilíbrio).</p>
${FIG_PONTE}
${tabela(['Temperatura','Resistência do sensor'],[['20 °C','500 Ω'],['30 °C','400 Ω'],['40 °C','300 Ω'],['50 °C','200 Ω'],['60 °C','100 Ω']])}
<p>Nesse instante, a temperatura da estufa é de</p>`,
  opts: ['20 °C.','30 °C.','40 °C.','50 °C.','60 °C.'], ans: 2,
  hint: 'Com a ponte em equilíbrio, os produtos das resistências de braços opostos são iguais.',
  steps: [['Equilíbrio da ponte', '<p>Braços opostos: R₁ com R<sub>S</sub>, e R₂ com R₃.</p><div class="eq">R₁ · R<sub>S</sub> = R₂ · R₃</div>'],
          ['Resistência do sensor', `<div class="eq">R<sub>S</sub> = ${f('200 × 150','100')} = 300 Ω</div>`],
          ['Temperatura', '<p>Pela tabela, 300 Ω corresponde a <b>40 °C</b>.</p>']],
  alt: 'Sem corrente no galvanômetro, os nós da esquerda e da direita estão no mesmo potencial: R₁ e R₂ dividem a tensão na mesma proporção que R₃ e R<sub>S</sub>, ou seja, R₁/R₃ = R₂/R<sub>S</sub>.',
  warn: 'Erro comum: igualar os produtos de braços <b>vizinhos</b> (R₁ · R₂ = R₃ · R<sub>S</sub>). Isso daria cerca de 133 Ω, valor que nem aparece na tabela: sinal de que a relação está errada.' }
];
