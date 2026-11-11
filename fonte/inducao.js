/* ===== Eletromagnetismo · Lista 1 (magnetismo e campo magnético) e Lista 2 (indução eletromagnética) ===== */
/* 20 questões inéditas, no estilo do ENEM. */

const TOOLS_MAG = [
  ['Ímãs', `Polos de mesmo nome se repelem; de nomes diferentes se atraem<br>Não existe polo isolado: quebrar um ímã gera dois ímãs`],
  ['Campo da Terra', `O polo norte da bússola aponta para o norte geográfico, onde fica um polo <b>sul</b> magnético`],
  ['Campo de um fio longo', `B = ${f('μ₀ · i','2π · d')} &nbsp;·&nbsp; μ₀ = 4π × 10⁻⁷ T·m/A`],
  ['Força magnética', `Sobre carga: F = q · v · B · sen θ (nula se v ∥ B)<br>Sobre fio: F = B · i · L · sen θ`],
  ['Movimento circular no campo', `R = ${f('m · v','q · B')}`],
  ['Fios paralelos', `${f('F','L')} = ${f('μ₀ · i₁ · i₂','2π · d')}<br>Correntes de mesmo sentido se atraem; opostas se repelem`]
];

const TOOLS_IND = [
  ['Fluxo magnético', `Φ = B · A · cos θ (θ entre B e a normal à espira) · unidade: Wb`],
  ['Lei de Faraday', `ε = N · ${f('ΔΦ','Δt')} · só há corrente induzida se o fluxo <b>variar</b>`],
  ['Lei de Lenz', `A corrente induzida se opõe à variação de fluxo que a criou`],
  ['Barra em trilhos', `ε = B · L · v &nbsp;·&nbsp; i = ${f('ε','R')} &nbsp;·&nbsp; F = B · i · L`],
  ['Transformador ideal', `${f('U₁','U₂')} = ${f('N₁','N₂')} &nbsp;·&nbsp; U₁ · i₁ = U₂ · i₂ (só com corrente alternada)`],
  ['Transmissão', `Perda na linha: P = R · i² · com mais tensão, menos corrente e menos perda`]
];

/* ===== Figuras ===== */
const FIG_OERSTED = fig('0 0 340 195', 'Montagem de Oersted vista de cima: um fio retilíneo passa logo acima de uma bússola. O fio faz parte de um circuito com uma pilha e uma chave, que está aberta. A agulha da bússola está alinhada ao fio.',
  `<circle cx="170" cy="85" r="44" fill="var(--surface)" stroke="var(--ink)" stroke-width="2"/>
   <path d="M128 85 L170 74 L212 85 L170 96 Z" fill="var(--line)" stroke="var(--ink)" stroke-width="1.2"/>
   <path d="M212 85 L170 74 L170 96 Z" fill="#D64A3B"/>
   <text x="200" y="66" text-anchor="middle" class="pt pt-strong">N</text>
   <line x1="20" y1="85" x2="320" y2="85" stroke="var(--ink)" stroke-width="2.5" opacity=".75"/>
   <path d="M20 85 V160 H140 M148 160 H218 M254 160 H320 V85" fill="none" stroke="var(--ink)" stroke-width="1.8"/>
   <path d="M140 146 V174 M148 153 V167" stroke="var(--ink)" stroke-width="2.6"/>
   <circle cx="220" cy="160" r="3" fill="var(--ink)"/><circle cx="252" cy="160" r="3" fill="var(--ink)"/>
   <line x1="220" y1="160" x2="248" y2="140" stroke="var(--ink)" stroke-width="2"/>
   <text x="144" y="190" text-anchor="middle" class="pt">pilha</text>
   <text x="236" y="190" text-anchor="middle" class="pt">chave aberta</text>
   <text x="300" y="76" text-anchor="end" class="pt pt-strong">fio</text>
   <text x="214" y="44" class="pt">bússola</text>`, 380);

const FIG_FALANTE = fig('0 0 340 190', 'Corte de um alto-falante: um ímã permanente cria um campo magnético radial numa fenda onde fica a bobina, presa ao cone. A corrente do sinal de áudio percorre a bobina.',
  `<rect x="30" y="70" width="80" height="50" rx="4" fill="#8C9AA6"/>
   <text x="70" y="99" text-anchor="middle" class="pt pt-strong" style="fill:#fff">ímã</text>
   <rect x="112" y="72" width="16" height="46" fill="#D9A62E"/>
   <text x="120" y="140" text-anchor="middle" class="pt">bobina</text>
   <path d="M128 70 L250 20 L250 170 L128 120" fill="none" stroke="var(--ink)" stroke-width="2.4"/>
   <text x="268" y="98" class="pt pt-strong">cone</text>
   <text x="170" y="186" text-anchor="middle" class="pt">corrente do sinal de áudio</text>`, 380);

const FIG_ESPECTRO = (() => {
  const [d, mk] = seta('var(--ink)');
  return fig('0 0 340 220', 'Espectrômetro de massa: íons entram por uma fenda com a mesma velocidade, numa região de campo magnético perpendicular à tela, descrevem semicircunferências e atingem uma placa. Íons de massas diferentes chegam a pontos diferentes da placa.',
  `${d}<line x1="20" y1="190" x2="330" y2="190" stroke="var(--ink)" stroke-width="3"/>
   <text x="325" y="208" text-anchor="end" class="pt">placa detectora</text>
   <line x1="60" y1="205" x2="60" y2="190" stroke="var(--ink)" stroke-width="2" marker-end="${mk}"/>
   <text x="60" y="216" text-anchor="middle" class="pt">fenda</text>
   <path d="M60 190 A100 100 0 0 1 260 190" fill="none" stroke="#3A7BD5" stroke-width="2.4"/>
   <path d="M60 190 A110 110 0 0 1 280 190" fill="none" stroke="#E8562A" stroke-width="2.4" stroke-dasharray="6 4"/>
   ${[110,160,210,260,310].map(x => [62,108,154].map(y => `<text x="${x}" y="${y}" text-anchor="middle" class="pt" fill="var(--muted)">×</text>`).join('')).join('')}
   <text x="20" y="24" class="pt">B (entrando na tela)</text>`, 380);
})();

const FIG_TRILHOS = (() => {
  const [d, mk] = seta('var(--ink)');
  return fig('0 0 340 180', 'Dois trilhos horizontais paralelos, separados por 0,40 m, ligados à esquerda por um resistor de 0,20 ohm. Uma barra apoiada sobre os trilhos é puxada para a direita com velocidade constante de 2,0 m/s, num campo magnético de 0,50 T entrando na tela.',
  `${d}<path d="M40 40 H320 M40 140 H320" stroke="var(--ink)" stroke-width="3"/>
   <path d="M40 40 V70 M40 110 V140" stroke="var(--ink)" stroke-width="2"/>
   <rect x="30" y="70" width="20" height="40" fill="var(--surface)" stroke="var(--ink)" stroke-width="2"/>
   <text x="58" y="96" class="pt pt-strong">R</text>
   <rect x="196" y="32" width="10" height="116" rx="2" fill="#D9A62E"/>
   <line x1="214" y1="90" x2="262" y2="90" stroke="var(--ink)" stroke-width="2.5" marker-end="${mk}"/>
   <text x="238" y="82" text-anchor="middle" class="pt pt-strong">v</text>
   ${[90,140,280,310].map(x => [70,110].map(y => `<text x="${x}" y="${y}" text-anchor="middle" class="pt" fill="var(--muted)">×</text>`).join('')).join('')}
   <text x="300" y="168" text-anchor="end" class="pt">L = 0,40 m · B ⊗</text>`, 380);
})();

const FIG_TERRA = (() => {
  const tri = (x, y) => `<path d="M${x} ${y-7} L${x+6} ${y+5} L${x-6} ${y+5} Z" fill="#3A7BD5"/>`;
  const laco = (k, s) => `<path d="M170 ${168 - 4*k} C ${170 + s*(100 + 30*k)} ${190 + 10*k}, ${170 + s*(100 + 30*k)} ${30 - 10*k}, 170 ${52 + 4*k}" fill="none" stroke="#3A7BD5" stroke-width="1.8"/>`;
  return fig('0 0 340 250', 'Esquema simplificado da Terra. O eixo de rotação, que liga os polos geográficos, é vertical. As linhas do campo magnético estão organizadas em torno de outro eixo, o eixo magnético, um pouco inclinado em relação ao eixo de rotação. Do lado de fora da Terra, as linhas saem da região do sul geográfico e chegam à região do norte geográfico.',
  `<g transform="rotate(-11 170 110)">${laco(0, 1)}${laco(1, 1)}${laco(0, -1)}${laco(1, -1)}
   ${tri(170 + 75, 116)}${tri(170 + 97, 116)}${tri(170 - 75, 116)}${tri(170 - 97, 116)}</g>
   <circle cx="170" cy="110" r="56" fill="var(--eq-bg)" stroke="var(--ink)" stroke-width="2"/>
   <g transform="rotate(-11 170 110)"><line x1="170" y1="40" x2="170" y2="180" stroke="#3A7BD5" stroke-width="2" stroke-dasharray="7 4"/></g>
   <line x1="170" y1="32" x2="170" y2="188" stroke="var(--ink)" stroke-width="1.6"/>
   <circle cx="170" cy="32" r="3" fill="var(--ink)"/><circle cx="170" cy="188" r="3" fill="var(--ink)"/>
   <text x="178" y="22" class="pt pt-strong">norte geográfico</text>
   <text x="162" y="206" text-anchor="end" class="pt pt-strong">sul geográfico</text>
   <text x="148" y="34" text-anchor="end" class="pt pt-strong" style="fill:#3A7BD5">eixo magnético</text>
   <text x="200" y="146" text-anchor="middle" class="pt">Terra</text>
   <text x="170" y="228" text-anchor="middle" class="pt" style="fill:#3A7BD5">linhas do campo magnético</text>
   <text x="170" y="244" text-anchor="middle" class="pt">esquema simplificado, fora de escala</text>`, 360);
})();

/* ===================== LISTA 1 · Magnetismo e campo magnético ===================== */
const Q_MAG = [
{ src: 'Inédita', nivel: 'básico',
  text: `<p>Em uma trilha, um grupo de escoteiros usa uma bússola para se orientar. A agulha, um pequeno ímã que gira livremente, aponta com seu polo norte para a região do norte geográfico da Terra. O esquema, simplificado, representa as linhas do campo magnético do planeta.</p>
${FIG_TERRA}
<p>Isso acontece porque, nas proximidades do norte geográfico, está localizado</p>`,
  opts: ['o polo norte magnético da Terra, que atrai o polo norte da agulha.','um grande depósito de ferro, que atrai qualquer ímã.','o polo sul magnético da Terra, que atrai o polo norte da agulha.','o ponto onde o campo magnético da Terra é nulo.','o polo norte magnético, porque polos de mesmo nome se atraem quando estão muito distantes.'], ans: 2,
  hint: 'Polos de mesmo nome se repelem; de nomes diferentes se atraem. Se o polo norte da agulha é atraído para lá, que polo magnético existe lá?',
  steps: [['Regra dos polos', '<p>Polos de nomes diferentes se atraem. O polo norte da agulha só é puxado para o norte geográfico se ali houver um polo <b>sul</b> magnético.</p>'],
          ['O esquema confirma', '<p>Fora de um ímã, as linhas de campo saem do polo norte e chegam ao polo sul. No esquema, elas chegam à região do norte geográfico: ali está um polo sul magnético.</p>'],
          ['Conclusão', '<p>A Terra se comporta como um grande ímã com o polo sul magnético perto do norte geográfico (e o polo norte magnético perto do sul geográfico).</p>'],
          ['Perto, mas não no mesmo lugar', '<p>Repare no esquema: as linhas de campo se organizam em torno do <b>eixo magnético</b>, que é inclinado em relação ao eixo de rotação. Por isso os polos magnéticos <b>não coincidem</b> com os polos geográficos, e ainda se deslocam lentamente ao longo dos anos.</p><p>Na prática, a bússola aponta para o norte <b>magnético</b>, que fica um pouco afastado do norte geográfico. Dizer que ela aponta para o norte geográfico é uma <b>aproximação</b>, boa o bastante para se orientar numa trilha. A diferença entre as duas direções se chama <b>declinação magnética</b>, e mapas de navegação a indicam para corrigir a leitura da bússola.</p>']],
  alt: 'O nome “polo norte” da agulha vem de ela apontar para o norte geográfico, não do tipo de polo que existe lá. Por isso a troca de nomes confunde tanta gente.',
  warn: erros([['A)','polos de mesmo nome se repelem.'],['B)','a orientação vale no planeta todo, não depende de jazidas.'],['D)','se o campo fosse nulo, a agulha não teria direção preferida.'],['E)','polos de mesmo nome se repelem a qualquer distância.']]) },

{ src: 'Inédita', nivel: 'básico',
  text: '<p>Uma criança quebrou ao meio um ímã de brinquedo em forma de barra, que tinha o polo norte em uma ponta e o polo sul na outra. Ela esperava ter agora um pedaço só com polo norte e outro só com polo sul.</p><p>Na verdade, cada um dos pedaços</p>',
  opts: ['passa a ser um ímã completo, com polo norte e polo sul.','fica com apenas um polo, como a criança imaginou.','perde o magnetismo, porque o ímã foi danificado.','fica com dois polos norte, e o outro pedaço, com dois polos sul.','só volta a ser ímã se for encostado em outro ímã por algum tempo depois de quebrado.'], ans: 0,
  hint: 'O magnetismo do ímã vem de pequenas regiões alinhadas em todo o material. Quebrar o ímã desfaz esse alinhamento?',
  steps: [['Origem do magnetismo', '<p>Um ímã é formado por inúmeras pequenas regiões magnéticas (domínios) alinhadas, cada uma com seu polo norte e seu polo sul.</p>'],
          ['Ao quebrar', '<p>Cada pedaço continua com os domínios alinhados: vira um ímã completo, com <b>polo norte e polo sul</b>. Não existe polo magnético isolado (monopolo).</p>']],
  alt: 'Você pode continuar quebrando o ímã quantas vezes quiser: sempre vai obter ímãs menores, cada um com os dois polos. Isso é a inseparabilidade dos polos magnéticos.',
  warn: erros([['B)','não existe polo magnético isolado.'],['C)','quebrar não desalinha os domínios; o magnetismo continua.'],['D)','cada pedaço tem um polo norte e um polo sul, em pontas opostas.'],['E)','os pedaços já são ímãs logo depois de quebrados.']]) },

{ src: 'Inédita', nivel: 'básico',
  text: `<p>Em uma cooperativa de reciclagem, latas misturadas passam por uma esteira sob um grande eletroímã. Algumas latas são erguidas pelo eletroímã e outras seguem na esteira. O quadro mostra os materiais das latas.</p>
${tabela(['Lata','Material'],[['Sardinha','aço (liga de ferro)'],['Refrigerante','alumínio'],['Leite em pó','aço (liga de ferro)'],['Suco','alumínio']])}
<p>O eletroímã separa as latas porque</p>`,
  opts: ['o alumínio é atraído com mais força do que o aço.','as latas de alumínio ficam eletrizadas e são repelidas.','todos os metais são atraídos, mas as latas de alumínio são mais pesadas.','o eletroímã só atrai objetos que já eram ímãs.','o aço é ferromagnético e é atraído; o alumínio, praticamente não.'], ans: 4,
  hint: 'Nem todo metal é atraído por ímãs. Quais materiais são fortemente atraídos?',
  steps: [['Materiais ferromagnéticos', '<p>Ferro, níquel, cobalto e suas ligas (como o aço) se imantam na presença de um campo magnético e são <b>fortemente atraídos</b>.</p>'],
          ['Alumínio', '<p>O alumínio não é ferromagnético: a atração é desprezível. As latas de aço sobem; as de alumínio seguem na esteira.</p>']],
  alt: 'É o mesmo teste do ímã de geladeira: ele gruda na porta de aço, mas não numa panela de alumínio ou numa moeda de cobre.',
  warn: erros([['A)','é o contrário: o aço é que é atraído.'],['B)','eletroímã não eletriza as latas; a separação é magnética.'],['C)','as latas de alumínio são mais leves, e nem todo metal é atraído.'],['D)','o aço não precisa ser ímã: ele se imanta na presença do campo.']]) },

{ src: 'Inédita', nivel: 'intermediário',
  text: `<p>Em 1820, Hans Christian Oersted percebeu que uma bússola colocada perto de um fio se movia quando o circuito era ligado. Um estudante repetiu a experiência: com a chave aberta, a agulha fica alinhada ao fio, como no esquema.</p>
${FIG_OERSTED}
<p>Ao fechar a chave, a agulha gira e fica aproximadamente perpendicular ao fio. Se o estudante inverter os polos da pilha e fechar a chave de novo, a agulha</p>`,
  opts: ['continua alinhada ao fio, porque a bússola só sente o campo da Terra.','gira para o lado oposto, porque o campo criado pela corrente inverte de sentido.','gira para o mesmo lado, porque o campo de um fio não depende do sentido da corrente.','gira e para apontando para o fio, porque o fio fica imantado.','oscila sem parar, porque a corrente da pilha é alternada.'], ans: 1,
  hint: 'A experiência mostra que corrente elétrica cria campo magnético. O que muda nesse campo quando a corrente troca de sentido?',
  steps: [['Corrente cria campo', '<p>A corrente no fio cria um campo magnético em volta dele (linhas circulares). A agulha se orienta por esse campo, que perto do fio é mais intenso que o da Terra.</p>'],
          ['Invertendo a pilha', '<p>Com a corrente em sentido contrário, o campo do fio também <b>inverte</b>. A agulha gira para o lado oposto.</p>']],
  alt: 'A regra da mão direita resume tudo: polegar no sentido da corrente, dedos curvados no sentido do campo. Trocar o sentido do polegar troca o sentido dos dedos.',
  warn: erros([['A)','se fosse só o campo da Terra, a agulha não teria se mexido ao fechar a chave.'],['C)','o sentido do campo depende do sentido da corrente.'],['D)','o fio de cobre não se imanta; o campo vem da corrente.'],['E)','pilha fornece corrente contínua.']]) },

{ src: 'Inédita', nivel: 'intermediário',
  text: '<p>Em ferros-velhos, guindastes com eletroímãs levantam carcaças de carros e as soltam em outro lugar. O eletroímã é uma bobina enrolada em um núcleo de ferro, ligada a uma fonte de corrente contínua.</p><p>Para que o eletroímã consiga levantar cargas mais pesadas, sem trocar o núcleo, o operador pode</p>',
  opts: ['diminuir a corrente, para o fio esquentar menos.','trocar a corrente contínua por alternada, de mesmo valor.','retirar o núcleo de ferro, para o campo atravessar melhor.','aumentar a corrente ou o número de espiras da bobina.','inverter o sentido da corrente, o que aumenta a força de atração sobre o ferro.'], ans: 3,
  hint: 'O campo de uma bobina depende de quanta corrente passa e de quantas voltas o fio dá.',
  steps: [['Campo de uma bobina', '<p>O campo magnético de uma bobina cresce com a <b>corrente</b> e com o <b>número de espiras</b>. O núcleo de ferro reforça muito esse campo.</p>'],
          ['Conclusão', '<p>Mais corrente ou mais espiras: campo mais intenso e maior força de atração sobre as peças de ferro. E, para soltar a carga, basta desligar a corrente.</p>']],
  alt: 'A grande vantagem do eletroímã sobre o ímã comum é poder ser ligado, desligado e regulado. É o mesmo princípio de campainhas, fechaduras elétricas e relés.',
  warn: erros([['A)','menos corrente significa campo mais fraco.'],['B)','com corrente alternada, o campo troca de sentido o tempo todo; não é assim que se aumenta a força.'],['C)','o núcleo de ferro é justamente o que intensifica o campo.'],['E)','o ferro é atraído com qualquer sentido de corrente; inverter não aumenta a força.']]) },

{ src: 'Inédita', nivel: 'intermediário',
  text: `<p>Moradores de uma casa sob uma linha de transmissão perguntam se o campo magnético dos cabos poderia atrapalhar uma bússola. Um técnico compara o campo de um cabo com o campo da Terra no local, usando os dados do quadro e a expressão B = μ₀ · i / (2π · d), com μ₀ = 4π × 10⁻⁷ T·m/A.</p>
${tabela(['Dado','Valor'],[['Corrente no cabo','500 A'],['Distância do cabo até a casa','20 m'],['Campo magnético da Terra no local','2,5 × 10⁻⁵ T']])}
<p>O campo criado pelo cabo na casa corresponde a que porcentagem do campo da Terra?</p>`,
  opts: ['0,2%','2%','20%','200%','400%'], ans: 2,
  hint: 'Simplifique μ₀/(2π) antes de substituir: 4π × 10⁻⁷ / 2π = 2 × 10⁻⁷.',
  steps: [['Campo do cabo', `<div class="eq">B = ${f('4π × 10⁻⁷ × 500','2π × 20')} = ${f('2 × 10⁻⁷ × 500','20')}</div><div class="eq">B = 5,0 × 10⁻⁶ T</div>`],
          ['Comparação', `<div class="eq">${f('5,0 × 10⁻⁶','2,5 × 10⁻⁵')} = 0,20 = 20%</div>`]],
  alt: 'O campo de um fio cai com a distância (B ∝ 1/d): a 40 m seria a metade, 10%. Além disso, em linhas de corrente alternada o campo troca de sentido 120 vezes por segundo, e a agulha nem consegue acompanhar.',
  warn: erros([['E) 400%:','esquece de dividir pela distância.'],['A) 0,2%:','erra a potência de dez na comparação.']]) },

{ src: 'Inédita', nivel: 'intermediário',
  text: '<p>O vento solar traz partículas eletricamente carregadas que, ao chegarem perto da Terra, são desviadas pelo campo magnético do planeta. A maioria delas não atinge a atmosfera nas regiões tropicais, mas muitas chegam às regiões polares, onde produzem as auroras.</p><p>As partículas conseguem chegar à atmosfera perto dos polos porque, nessas regiões,</p>',
  opts: ['o campo magnético da Terra é nulo.','as partículas são atraídas pelos polos, que têm carga elétrica oposta à delas.','a atmosfera é mais fina e por isso atrai as partículas.','a força magnética sobre as partículas é máxima e as acelera diretamente para baixo, em direção ao solo.','as partículas descem quase paralelas às linhas de campo e quase não são desviadas.'], ans: 4,
  hint: 'A força magnética sobre uma carga é F = q · v · B · sen θ. Quando ela é nula?',
  steps: [['Força magnética', '<p>F = q · v · B · sen θ, em que θ é o ângulo entre a velocidade e o campo. Se a partícula se move na direção do campo (θ = 0°), a força é <b>nula</b>.</p>'],
          ['Perto dos polos', '<p>As linhas de campo da Terra “mergulham” quase verticalmente perto dos polos. As partículas que descem ao longo delas quase não são desviadas e chegam à atmosfera, onde excitam os gases e produzem a luz da aurora.</p>']],
  alt: 'Nas regiões tropicais, as linhas de campo são quase horizontais: partículas vindas de cima chegam quase perpendiculares a elas, sofrem força máxima e são desviadas antes de chegar.',
  warn: erros([['A)','o campo perto dos polos é até mais intenso; o que muda é a direção.'],['B)','polos magnéticos não são cargas elétricas.'],['C)','não é a atmosfera que atrai as partículas.'],['D)','perto dos polos a força é mínima, não máxima.']]) },

{ src: 'Inédita', nivel: 'avançado',
  text: `<p>Em um alto-falante, um ímã permanente cria um campo magnético de 0,50 T na região onde fica a bobina, presa ao cone. O fio da bobina tem 2,0 m de comprimento dentro do campo, sempre perpendicular a ele, e é percorrido pela corrente do sinal de áudio, que chega a 0,40 A.</p>
${FIG_FALANTE}
<p>A força magnética máxima sobre a bobina e o motivo de o cone vibrar e produzir som são, respectivamente,</p>`,
  opts: ['0,40 N; a corrente alternada inverte o sentido da força.','0,40 N; o ímã atrai e repele o cone de papel.','0,80 N; a corrente alternada inverte o sentido da força.','0,20 N; o campo do ímã se inverte com o sinal.','0,20 N; a bobina esquenta e se dilata, empurrando o cone para a frente e para trás.'], ans: 0,
  hint: 'Use F = B · i · L. Depois pense: o que o sinal de áudio faz com o sentido da corrente?',
  steps: [['Força máxima', '<div class="eq">F = B · i · L = 0,50 × 0,40 × 2,0 = 0,40 N</div>'],
          ['Por que vibra', '<p>O sinal de áudio é uma corrente <b>alternada</b>: ela muda de sentido muitas vezes por segundo, e a força sobre a bobina também. O cone é empurrado para a frente e para trás no ritmo do sinal e produz o som.</p>']],
  alt: 'O microfone dinâmico é o alto-falante ao contrário: o som move o cone e a bobina, e o movimento no campo do ímã induz uma corrente (é indução, tema da Lista 2).',
  warn: erros([['B)','o cone é de papel e não é atraído pelo ímã; quem sofre a força é a bobina.'],['C) 0,80 N:','esquece o campo (calcula só i · L).'],['D) 0,20 N:','esquece o comprimento do fio; e o campo do ímã é fixo.'],['E)','a vibração é causada pela força magnética, não por dilatação.']]) },

{ src: 'Inédita', nivel: 'avançado',
  text: `<p>Em um espectrômetro de massa, íons de neônio entram por uma fenda com a mesma velocidade e a mesma carga, em uma região de campo magnético uniforme perpendicular à velocidade. Eles descrevem semicircunferências de raio R = m · v / (q · B) e atingem uma placa. O neônio tem dois isótopos principais, de massas proporcionais a 20 e a 22.</p>
${FIG_ESPECTRO}
<p>Se os íons do isótopo de massa 20 descrevem uma semicircunferência de raio 20 cm, a distância entre os pontos da placa atingidos pelos dois isótopos é de</p>`,
  opts: ['2,0 cm.','4,0 cm.','10 cm.','22 cm.','44 cm.'], ans: 1,
  hint: 'Com v, q e B iguais, o raio é proporcional à massa. E o ponto de impacto fica a um diâmetro (2R) da fenda.',
  steps: [['Raio do outro isótopo', `<p>R ∝ m:</p><div class="eq">R₂₂ = 20 × ${f('22','20')} = 22 cm</div>`],
          ['Pontos de impacto', '<p>Cada íon percorre meia volta: chega à placa a uma distância 2R da fenda. Massa 20: 40 cm. Massa 22: 44 cm.</p><div class="eq">44 − 40 = 4,0 cm</div>']],
  alt: 'Foi assim que se descobriu que um mesmo elemento químico pode ter átomos de massas diferentes (isótopos). Íons mais pesados “fazem a curva” mais aberta.',
  warn: erros([['A) 2,0 cm:','compara os raios, e não os diâmetros.'],['D) 22 cm:','dá o raio do isótopo mais pesado.'],['E) 44 cm:','dá a distância da fenda ao ponto do isótopo mais pesado.']]) },

{ src: 'Inédita', nivel: 'avançado',
  text: '<p>Os dois cabos de uma máquina de solda correm lado a lado, paralelos, a 2,0 cm um do outro. Durante a solda, cada cabo conduz 200 A, mas em sentidos opostos (a corrente vai por um e volta pelo outro). A força magnética entre os cabos, por metro de comprimento, é dada por F/L = μ₀ · i₁ · i₂ / (2π · d), com μ₀ = 4π × 10⁻⁷ T·m/A.</p><p>A força por metro entre os cabos e o efeito dela são:</p>',
  opts: ['0,40 N/m; os cabos se atraem.','0,0040 N/m; os cabos se repelem.','4,0 N/m; os cabos se repelem.','0,40 N/m; os cabos se repelem.','0,40 N/m; não há efeito, pois as forças dos dois cabos se cancelam.'], ans: 3,
  hint: 'Calcule com d em metros. Para o sentido: correntes de mesmo sentido se atraem; de sentidos opostos...',
  steps: [['Intensidade', `<div class="eq">${f('F','L')} = ${f('2 × 10⁻⁷ × 200 × 200','0,020')} = 0,40 N/m</div>`],
          ['Sentido', '<p>Correntes de <b>sentidos opostos</b> se <b>repelem</b>. É por isso que cabos que conduzem correntes muito altas precisam ser bem fixados.</p>']],
  alt: 'Cada cabo está no campo magnético do outro e sofre a força F = B · i · L. A força é mútua: os dois são empurrados, com a mesma intensidade, em sentidos opostos (ação e reação).',
  warn: erros([['A)','acerta a intensidade, mas correntes opostas se repelem.'],['B) 0,0040 N/m:','usa a distância em centímetros (2 em vez de 0,020).'],['C) 4,0 N/m:','usa a distância como 0,0020 m.'],['E)','as forças atuam em cabos diferentes; não se cancelam.']]) }
];

const FIG_LANTERNA = (() => {
  const [d, mk] = seta('var(--ink)');
  return fig('0 0 340 170', 'Corte de uma lanterna de sacudir: dentro de um tubo, um ímã desliza para a frente e para trás e atravessa uma bobina enrolada no meio do tubo. A bobina está ligada a um capacitor e a um LED na ponta.',
  `${d}<rect x="20" y="64" width="250" height="44" rx="20" fill="none" stroke="var(--ink)" stroke-width="2"/>
   <rect x="46" y="74" width="24" height="24" fill="#D64A3B"/><rect x="70" y="74" width="24" height="24" fill="#3A7BD5"/>
   <text x="58" y="91" text-anchor="middle" class="pt pt-strong" style="fill:#fff">N</text><text x="82" y="91" text-anchor="middle" class="pt pt-strong" style="fill:#fff">S</text>
   <line x1="40" y1="46" x2="104" y2="46" stroke="var(--ink)" stroke-width="2" marker-start="${mk}" marker-end="${mk}"/>
   <text x="72" y="36" text-anchor="middle" class="pt">ímã desliza</text>
   ${[140,150,160,170,180,190].map(x => `<ellipse cx="${x}" cy="86" rx="5" ry="28" fill="none" stroke="#D9A62E" stroke-width="2.4"/>`).join('')}
   <text x="165" y="136" text-anchor="middle" class="pt">bobina</text>
   <path d="M190 114 V140 H292 V96 M140 114 V152 H298 V96" fill="none" stroke="var(--ink)" stroke-width="1.4"/>
   <path d="M292 76 V96 M298 76 V96" stroke="var(--ink)" stroke-width="2.2"/>
   <path d="M300 74 L318 86 L300 98 Z" fill="#F2B705" stroke="var(--ink)" stroke-width="1.4"/>
   <text x="336" y="60" text-anchor="end" class="pt">capacitor e LED</text>`, 380);
})();

const FIG_FREIO = (() => {
  const [d, mk] = seta('var(--ink)');
  return fig('0 0 340 180', 'Freio magnético visto de lado: dois ímãs fixos no trilho, um acima e outro abaixo de uma fenda. Uma aleta de cobre presa ao carrinho entra na fenda, movendo-se para a direita. Entre os ímãs há um campo magnético vertical.',
  `${d}<rect x="170" y="30" width="110" height="34" rx="4" fill="#8C9AA6" stroke="var(--ink)" stroke-width="1.6"/>
   <rect x="170" y="116" width="110" height="34" rx="4" fill="#8C9AA6" stroke="var(--ink)" stroke-width="1.6"/>
   <text x="225" y="52" text-anchor="middle" class="pt pt-strong" style="fill:#fff">ímã</text>
   <text x="225" y="138" text-anchor="middle" class="pt pt-strong" style="fill:#fff">ímã</text>
   ${[190, 225, 260].map(x => `<line x1="${x}" y1="66" x2="${x}" y2="114" stroke="var(--muted)" stroke-width="1.2" stroke-dasharray="3 3"/>`).join('')}
   <rect x="70" y="82" width="150" height="16" rx="3" fill="#C8743A" stroke="var(--ink)" stroke-width="1.4"/>
   <rect x="20" y="70" width="50" height="40" rx="6" fill="var(--line)" stroke="var(--ink)" stroke-width="1.6"/>
   <text x="45" y="128" text-anchor="middle" class="pt">carrinho</text>
   <text x="134" y="76" text-anchor="middle" class="pt">aleta de cobre</text>
   <line x1="80" y1="150" x2="140" y2="150" stroke="var(--ink)" stroke-width="2.5" marker-end="${mk}"/>
   <text x="110" y="168" text-anchor="middle" class="pt pt-strong">v</text>
   <text x="268" y="94" class="pt pt-strong">B</text>
   <text x="225" y="172" text-anchor="middle" class="pt">ímãs fixos no trilho</text>`, 380);
})();

/* ===================== LISTA 2 · Indução eletromagnética ===================== */
const Q_IND = [
{ src: 'Inédita', nivel: 'básico',
  text: `<p>Algumas lanternas de emergência não usam pilhas: basta sacudi-las para que acendam. Dentro delas, um ímã desliza para a frente e para trás, atravessando uma bobina ligada a um capacitor que armazena a energia, como no esquema.</p>
${FIG_LANTERNA}
<p>A lanterna produz energia elétrica porque</p>`,
  opts: ['o ímã libera elétrons para a bobina ao passar por dentro dela.','o movimento do ímã faz variar o fluxo magnético na bobina, induzindo corrente.','o atrito do ímã com o tubo eletriza a bobina.','o campo magnético do ímã parado já é suficiente para gerar corrente na bobina.','a bobina se transforma em ímã e passa a atrair cargas elétricas do ar.'], ans: 1,
  hint: 'Se o ímã ficasse parado dentro da bobina, a lanterna funcionaria? O que o movimento muda?',
  steps: [['Variação de fluxo', '<p>Ao passar pela bobina, o ímã faz o fluxo magnético através das espiras aumentar e diminuir.</p>'],
          ['Indução', '<p>Pela lei de Faraday, <b>fluxo variando</b> induz uma força eletromotriz e, no circuito fechado, uma corrente. Parado, o ímã não induz nada.</p>']],
  alt: 'É o mesmo princípio do dínamo de bicicleta e dos geradores das usinas: transformar movimento (energia mecânica) em energia elétrica por indução.',
  warn: erros([['A)','o ímã não fornece elétrons; os elétrons já estão no fio da bobina.'],['C)','não é eletrização por atrito, e sim indução magnética.'],['D)','campo parado não induz corrente: é preciso que o fluxo varie.'],['E)','não há atração de cargas do ar.']]) },

{ src: 'Inédita', nivel: 'básico',
  text: '<p>Nos carregadores sem fio de celular, uma bobina na base é ligada à tomada e outra bobina fica dentro do celular. Ao apoiar o aparelho na base, a bateria começa a carregar, sem contato elétrico entre as duas partes. O fabricante explica que a bobina da base é alimentada com corrente alternada, e não com corrente contínua.</p><p>A corrente precisa ser alternada porque</p>',
  opts: ['a corrente contínua é perigosa demais para o celular.','a corrente alternada transporta mais carga por segundo.','a corrente alternada aquece a bobina, e o calor carrega a bateria.','só um campo magnético variável induz corrente na bobina do celular.','a corrente contínua criaria um campo forte demais, que desmagnetizaria o celular.'], ans: 3,
  hint: 'Para que apareça corrente induzida na bobina do celular, o fluxo magnético nela precisa fazer o quê?',
  steps: [['Corrente contínua', '<p>Corrente contínua cria um campo magnético constante: o fluxo na bobina do celular não varia e <b>não há indução</b>.</p>'],
          ['Corrente alternada', '<p>Com corrente alternada, o campo muda de intensidade e de sentido o tempo todo. O fluxo na bobina do celular varia e induz uma corrente, que (depois de retificada) carrega a bateria.</p>']],
  alt: 'É o mesmo motivo de o transformador não funcionar com pilhas: tanto o carregador sem fio quanto o transformador dependem de um fluxo magnético que varia.',
  warn: erros([['A)','a segurança não é o motivo; com corrente contínua simplesmente não haveria indução.'],['B)','o problema não é a quantidade de carga, e sim a variação do campo.'],['C)','o aquecimento é uma perda, não o mecanismo de carga.'],['E)','não é questão de intensidade: campo constante não induz corrente.']]) },

{ src: 'Inédita', nivel: 'básico',
  text: '<p>Nos fogões de indução, uma bobina sob o vidro do fogão é percorrida por corrente alternada. Uma panela de ferro colocada sobre ela esquenta rapidamente, mas o vidro do fogão continua quase frio. Já uma panela de vidro, no mesmo lugar, não esquenta.</p><p>A panela de ferro esquenta porque</p>',
  opts: ['o campo magnético variável induz correntes elétricas no fundo da panela, que o aquecem.','a bobina fica muito quente e transmite calor para a panela por condução.','o vidro do fogão concentra a radiação infravermelha na panela.','o ferro é atraído pela bobina e o atrito aquece a panela.','a corrente da tomada passa diretamente pela panela através do vidro, que é um bom condutor elétrico.'], ans: 0,
  hint: 'O ferro é um condutor elétrico. O que acontece com um condutor colocado num campo magnético que varia?',
  steps: [['Campo variável', '<p>A corrente alternada na bobina cria um campo magnético que varia rapidamente.</p>'],
          ['Correntes induzidas', '<p>Esse campo variável induz correntes elétricas no metal da panela (correntes de Foucault). Elas dissipam energia por efeito Joule <b>no próprio fundo da panela</b>, que esquenta.</p>'],
          ['Panela de vidro', '<p>O vidro não conduz corrente: nele não há correntes induzidas, e ele não esquenta.</p>']],
  alt: 'O calor nasce na panela, e não no fogão. Por isso o fogão de indução desperdiça menos energia e o vidro em volta da panela fica pouco quente.',
  warn: erros([['B)','a bobina não precisa esquentar; o calor surge na panela.'],['C)','não é radiação: é indução.'],['D)','não há atrito; a panela fica parada.'],['E)','o vidro é isolante; não há contato elétrico.']]) },

{ src: 'Inédita', nivel: 'intermediário',
  text: '<p>No captador de uma guitarra elétrica, uma bobina de 5 000 espiras envolve um pequeno ímã. Quando a corda de aço vibra logo acima, o fluxo magnético em cada espira varia. Em certo instante, o fluxo em cada espira varia 2,0 × 10⁻⁷ Wb em 0,0050 s.</p><p>A força eletromotriz média induzida na bobina nesse intervalo é de</p>',
  opts: ['5,0 × 10⁻⁶ V.','4,0 × 10⁻⁵ V.','1,0 × 10⁻³ V.','0,20 V.','2,0 V.'], ans: 3,
  hint: 'Lei de Faraday para uma bobina: ε = N · ΔΦ / Δt.',
  steps: [['Lei de Faraday', `<div class="eq">ε = N · ${f('ΔΦ','Δt')}</div>`],
          ['Cálculo', `<div class="eq">ε = 5 000 × ${f('2,0 × 10⁻⁷','5,0 × 10⁻³')} = 5 000 × 4,0 × 10⁻⁵</div><div class="eq">ε = 0,20 V</div>`]],
  alt: 'O sinal do captador é fraco (décimos de volt) e por isso vai para um amplificador. Cordas de náilon não funcionam: não alteram o fluxo do ímã.',
  warn: erros([['A)','multiplica pelo intervalo de tempo em vez de dividir.'],['B)','esquece o número de espiras.'],['C)','esquece de dividir pelo intervalo de tempo.']]) },

{ src: 'Inédita', nivel: 'intermediário',
  text: `<p>O gráfico mostra como varia o fluxo magnético através de cada espira de uma bobina de 20 espiras ao longo de 5 s.</p>
${plot({aria:'Fluxo magnético em cada espira, em webers, em função do tempo, em segundos. O fluxo sobe de 0 a 0,6 Wb entre 0 e 2 s, fica constante em 0,6 Wb entre 2 e 4 s e cai a zero entre 4 e 5 s.', xmin:0, xmax:5, ymin:0, ymax:0.7, xt:[0,1,2,3,4,5], yt:[0,0.2,0.4,0.6], xl:'t (s)', yl:'Φ (Wb)', l:44, L:[{p:[[0,0],[2,0.6],[4,0.6],[5,0]], c:'#7A4FB5'}], pts:[[0,0],[2,0.6],[4,0.6],[5,0]]})}
<p>O intervalo em que a força eletromotriz induzida na bobina tem o maior módulo, e o valor desse módulo, são</p>`,
  opts: ['de 0 a 2 s; 6,0 V.','de 2 a 4 s; 12 V.','de 4 a 5 s; 12 V.','de 4 a 5 s; 0,60 V.','de 2 a 4 s; zero.'], ans: 2,
  hint: 'A fem depende da rapidez com que o fluxo varia: procure o trecho mais inclinado do gráfico, não o mais alto.',
  steps: [['Rapidez de variação', '<p>0 a 2 s: ΔΦ/Δt = 0,6/2 = 0,3 Wb/s.<br>2 a 4 s: fluxo constante → 0.<br>4 a 5 s: ΔΦ/Δt = 0,6/1 = 0,6 Wb/s (o mais inclinado).</p>'],
          ['Fem', '<div class="eq">ε = N · ΔΦ/Δt = 20 × 0,6 = 12 V</div>']],
  alt: 'Entre 2 e 4 s o fluxo é o maior do gráfico, mas a fem é zero: o que induz corrente é a variação do fluxo, não o seu valor.',
  warn: erros([['A)','é o trecho de 0 a 2 s, menos inclinado: 20 × 0,3 = 6,0 V.'],['B)','confunde fluxo alto com fluxo variando.'],['D)','esquece o número de espiras.'],['E)','acerta que a fem é nula de 2 a 4 s, mas não é o intervalo pedido.']]) },

{ src: 'Inédita', nivel: 'intermediário',
  text: `<p>Algumas montanhas-russas usam freios magnéticos: no fim do percurso, aletas de cobre presas ao carrinho passam entre ímãs fixos nos trilhos, como no esquema. O carrinho desacelera suavemente, sem nenhum contato entre as peças, e as aletas esquentam.</p>
${FIG_FREIO}
<p>Esse freio funciona porque</p>`,
  opts: ['os ímãs atraem as aletas de cobre e as seguram.','o cobre é ferromagnético e se imanta ao passar pelos ímãs.','o atrito com o ar entre os ímãs é muito grande.','os ímãs eletrizam as aletas por indução, e elas passam a ser repelidas pelos trilhos metálicos.','as correntes induzidas nas aletas, pela lei de Lenz, se opõem ao movimento que as criou.'], ans: 4,
  hint: 'O cobre não é atraído por ímãs. Mas é um ótimo condutor. O que acontece com um condutor que se move perto de um ímã?',
  steps: [['Correntes induzidas', '<p>Ao passar entre os ímãs, o fluxo magnético nas aletas varia, e surgem correntes induzidas no cobre.</p>'],
          ['Lei de Lenz', '<p>Essas correntes criam campos que se <b>opõem à variação</b> que as originou: o resultado é uma força contrária ao movimento do carrinho.</p>'],
          ['Energia', '<p>A energia cinética perdida vira calor nas aletas (efeito Joule). Quanto mais rápido o carrinho, maior a força de frenagem.</p>']],
  alt: 'É o mesmo efeito do ímã que cai devagar dentro de um tubo de cobre. Sem movimento, não há variação de fluxo e o freio não atua: por isso ele não para o carrinho de vez, só o desacelera.',
  warn: erros([['A)','cobre praticamente não é atraído por ímãs.'],['B)','cobre não é ferromagnético.'],['C)','o efeito não depende do ar.'],['D)','não há eletrização; o efeito é a indução.']]) },

{ src: 'Inédita', nivel: 'intermediário',
  text: `<p>Uma máquina de solda usa um transformador para reduzir a tensão da rede e fornecer uma corrente muito alta ao eletrodo. Os dados estão no quadro. Considere o transformador ideal.</p>
${tabela(['Enrolamento','Espiras','Tensão','Corrente'],[['Primário (rede)','440','220 V','?'],['Secundário (eletrodo)','40','?','100 A']])}
<p>A tensão no secundário e a corrente no primário são, respectivamente,</p>`,
  opts: ['20 V e 9,1 A.','20 V e 100 A.','20 V e 1 100 A.','2 420 V e 9,1 A.','2 420 V e 1 100 A.'], ans: 0,
  hint: 'A tensão segue a razão entre os números de espiras. No transformador ideal, a potência de entrada é igual à de saída.',
  steps: [['Tensão no secundário', `<div class="eq">U₂ = U₁ · ${f('N₂','N₁')} = 220 × ${f('40','440')} = 20 V</div>`],
          ['Corrente no primário', `<p>U₁ · i₁ = U₂ · i₂:</p><div class="eq">i₁ = ${f('20 × 100','220')} ≈ 9,1 A</div>`]],
  alt: 'O transformador “troca” tensão por corrente: diminui a tensão 11 vezes e aumenta a corrente 11 vezes. A potência (2 000 W) é a mesma dos dois lados.',
  warn: erros([['B)','acha que a corrente é a mesma nos dois enrolamentos.'],['C)','multiplica a corrente pela razão de espiras em vez de dividir.'],['D)','inverte a razão de espiras na tensão.'],['E)','inverte as duas razões.']]) },

{ src: 'Inédita', nivel: 'avançado',
  text: `<p>Uma usina envia 1,0 MW para uma cidade por uma linha de transmissão de resistência total 10 Ω. O quadro compara duas tensões de transmissão possíveis, com a mesma potência enviada.</p>
${tabela(['Tensão de transmissão','Corrente na linha','Perda na linha'],[['10 kV','100 A','100 kW (10% do enviado)'],['100 kV','?','?']])}
<p>Com a transmissão em 100 kV, a perda na linha passa a ser de</p>`,
  opts: ['0,001% do enviado.','0,01% do enviado.','0,1% do enviado.','1% do enviado.','10% do enviado.'], ans: 2,
  hint: 'Calcule a nova corrente (P = U · i). A perda é R · i²: o que acontece quando a corrente fica 10 vezes menor?',
  steps: [['Nova corrente', `<div class="eq">i = ${f('P','U')} = ${f('1,0 × 10⁶','1,0 × 10⁵')} = 10 A</div>`],
          ['Nova perda', '<div class="eq">P<sub>perda</sub> = R · i² = 10 × 10² = 1 000 W = 1 kW</div>'],
          ['Porcentagem', `<div class="eq">${f('1 kW','1 000 kW')} = 0,1%</div>`]],
  alt: 'Tensão 10 vezes maior → corrente 10 vezes menor → perda 10² = 100 vezes menor (de 10% para 0,1%). É por isso que se transmite energia em alta tensão, com transformadores nas duas pontas.',
  warn: erros([['D) 1%:','acha que a perda cai na mesma proporção da corrente (esquece o quadrado).'],['E) 10%:','acha que a perda não muda com a tensão.'],['B) 0,01%:','divide a perda por 1 000, como se dependesse do cubo da corrente.']]) },

{ src: 'Inédita', nivel: 'avançado',
  text: '<p>Nos geradores das usinas, a frequência da tensão produzida depende do número de pares de polos magnéticos do rotor e da rotação: f = p · n, em que p é o número de pares de polos e n é o número de rotações por segundo. Na rede brasileira, f = 60 Hz. Em uma hidrelétrica, a turbina gira devagar, e o rotor do gerador tem 80 polos (40 pares).</p><p>Para gerar 60 Hz, o rotor desse gerador deve girar a</p>',
  opts: ['1,5 rpm.','45 rpm.','90 rpm.','2 400 rpm.','3 600 rpm.'], ans: 2,
  hint: 'Use p = 40 pares. A conta dá rotações por segundo; o enunciado pede rotações por minuto.',
  steps: [['Rotações por segundo', `<div class="eq">n = ${f('f','p')} = ${f('60','40')} = 1,5 rotação por segundo</div>`],
          ['Rotações por minuto', '<div class="eq">1,5 × 60 = 90 rpm</div>']],
  alt: 'Um gerador com 1 par de polos precisa girar 60 vezes por segundo (3 600 rpm), como nas termelétricas a vapor. Com muitos polos, o gerador pode girar devagar, no ritmo das turbinas hidráulicas.',
  warn: erros([['A) 1,5 rpm:','não converte rotações por segundo em rotações por minuto.'],['B) 45 rpm:','usa 80 polos em vez de 40 pares.'],['D) 2 400 rpm:','multiplica a frequência pelo número de pares.'],['E) 3 600 rpm:','é a rotação de um gerador com um só par de polos.']]) },

{ src: 'Inédita', nivel: 'avançado',
  text: `<p>Uma barra metálica é puxada com velocidade constante de 2,0 m/s sobre dois trilhos condutores separados por 0,40 m, ligados por um resistor de 0,20 Ω. O conjunto está num campo magnético uniforme de 0,50 T, perpendicular ao plano dos trilhos. Despreze o atrito e a resistência da barra e dos trilhos.</p>
${FIG_TRILHOS}
<p>Para manter a velocidade constante, a força aplicada na barra deve ter intensidade de</p>`,
  opts: ['0,080 N.','0,40 N.','0,80 N.','2,0 N.','4,0 N.'], ans: 1,
  hint: 'Calcule a fem (B · L · v), a corrente (ε/R) e a força magnética sobre a barra (B · i · L). Com velocidade constante, a força aplicada equilibra a força magnética.',
  steps: [['Fem e corrente', `<div class="eq">ε = B · L · v = 0,50 × 0,40 × 2,0 = 0,40 V</div><div class="eq">i = ${f('0,40','0,20')} = 2,0 A</div>`],
          ['Força magnética', '<p>Pela lei de Lenz, a força magnética sobre a barra se opõe ao movimento:</p><div class="eq">F = B · i · L = 0,50 × 2,0 × 0,40 = 0,40 N</div><p>A força aplicada deve ter o mesmo valor, 0,40 N.</p>']],
  alt: 'Confira pela energia: a potência da força aplicada (F · v = 0,40 × 2,0 = 0,80 W) é igual à potência dissipada no resistor (ε · i = 0,40 × 2,0 = 0,80 W). O trabalho para puxar a barra vira calor no resistor.',
  warn: erros([['A) 0,080 N:','usa a fem no lugar da corrente na força (B · ε · L).'],['C) 0,80 N:','confunde a força com a potência (ε · i).'],['D) 2,0 N:','dá a corrente como resposta.']]) }
];
