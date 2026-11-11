/* ===== Indução eletromagnética · Listas 1 e 2 (vindas do site do 3º ano) ===== */
/* ===== figuras ===== */
/* ----- campo entrando no papel (marcas ×) ----- */
const campoX = (xs, ys) => xs.map(x => ys.map(y => `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central" font-size="14" fill="#9aa0aa">×</text>`).join('')).join('');
const SETA = id => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1d2433"/></marker></defs>`;

/* Lista 1 · Q2 — espira quadrada em campo uniforme */
const FIG_ESPIRA_Q = `<figure class="fig figw"><svg class="plot" viewBox="0 0 260 210" role="img" aria-label="Espira quadrada de lado 20 cm em campo magnético uniforme de 0,50 T entrando no papel">
  ${campoX([25,55,85,115,145,175,205,235],[35,65,95,125,155,185])}
  <rect x="70" y="50" width="120" height="120" fill="none" stroke="#b5602a" stroke-width="4"/>
  <path d="M70 196 H190 M70 190 V202 M190 190 V202" stroke="#1d2433" stroke-width="1.3"/>
  <rect x="104" y="188" width="52" height="16" fill="#fffdf9"/>
  <text x="130" y="200" text-anchor="middle" font-size="13" fill="#1d2433">20 cm</text>
  <rect x="150" y="6" width="104" height="18" rx="4" fill="#fffdf9" stroke="#e2dbcf"/>
  <text x="202" y="19" text-anchor="middle" font-size="12" fill="#1d2433">B = 0,50 T (⊗)</text>
</svg></figure>`;

/* trilhos com barra móvel e resistor (Lista 1 · Q7 e Lista 2 · Q3) */
function figTrilhos(id, o){
  const forca = o.F ? `<path d="M204 112 L250 112" stroke="#d2433a" stroke-width="2.5" marker-end="url(#${id}f)"/><text x="256" y="117" font-size="13" font-weight="700" fill="#d2433a">F</text>
    <defs><marker id="${id}f" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#d2433a"/></marker></defs>` : '';
  return `<figure class="fig figw"><svg class="plot" viewBox="0 0 300 180" role="img" aria-label="Barra condutora deslizando sobre trilhos ligados por um resistor, em campo magnético entrando no papel">
  ${SETA(id)}
  ${campoX([112,142,172],[70,100,128])}
  <path d="M40 45 H290 M40 135 H290" stroke="#1d2433" stroke-width="3"/>
  <path d="M40 45 V70 l-8 4 l16 8 l-16 8 l16 8 l-16 8 l8 4 V135" fill="none" stroke="#1d2433" stroke-width="2.5"/>
  <text x="52" y="94" font-size="12" fill="#1d2433">R = ${o.R}</text>
  <rect x="196" y="38" width="8" height="104" rx="2" fill="#b5602a"/>
  <text x="212" y="88" font-size="12" fill="#1d2433">L = ${o.L}</text>
  <path d="M200 28 L250 28" stroke="#1d2433" stroke-width="2" marker-end="url(#${id})"/>
  <text x="224" y="20" text-anchor="middle" font-size="12" fill="#1d2433">v = ${o.v}</text>
  ${forca}
  <text x="150" y="166" text-anchor="middle" font-size="12" fill="#5b6475">B = ${o.B}, entrando no papel (⊗)</text>
</svg></figure>`;
}
const FIG_TRILHOS_L1 = figTrilhos('tr1', { R:'2,0 Ω', L:'0,40 m', v:'5,0 m/s', B:'0,50 T' });
const FIG_TRILHOS_L2 = figTrilhos('tr2', { R:'4,0 Ω', L:'0,50 m', v:'5,0 m/s', B:'0,80 T', F:true });

/* Lista 1 · Q10 — transformador */
const FIG_TRAFO = `<figure class="fig figw"><svg class="plot" viewBox="0 0 320 180" role="img" aria-label="Transformador: primário de 1000 espiras ligado a 220 V alternados; secundário de 50 espiras ligado a uma lâmpada percorrida por 2,0 A">
  <path d="M100 35 H220 V145 H100 Z M125 60 V120 H195 V60 Z" fill="#cfc9bf" fill-rule="evenodd"/>
  <text x="160" y="27" text-anchor="middle" font-size="11" fill="#5b6475">núcleo de ferro</text>
  <g fill="none" stroke="#b5602a" stroke-width="2.5">${[66,76,86,96,106,116].map(y=>`<ellipse cx="112.5" cy="${y}" rx="17" ry="4"/>`).join('')}
  ${[78,96,114].map(y=>`<ellipse cx="207.5" cy="${y}" rx="17" ry="4"/>`).join('')}</g>
  <path d="M96 66 H50 V82 M50 108 V124 H96 V116" fill="none" stroke="#1d2433" stroke-width="2"/>
  <circle cx="50" cy="95" r="13" fill="#fffdf9" stroke="#1d2433" stroke-width="2"/><text x="50" y="100" text-anchor="middle" font-size="16" fill="#1d2433">~</text>
  <path d="M224 78 H270 V88 M270 112 V124 H224 V114" fill="none" stroke="#1d2433" stroke-width="2"/>
  <circle cx="270" cy="100" r="12" fill="#fff6dc" stroke="#1d2433" stroke-width="2"/><path d="M262 92 L278 108 M278 92 L262 108" stroke="#1d2433" stroke-width="1.5"/>
  <text x="50" y="146" text-anchor="middle" font-size="12" fill="#1d2433">U₁ = 220 V</text>
  <text x="112" y="164" text-anchor="middle" font-size="12" fill="#1d2433">N₁ = 1000</text>
  <text x="208" y="164" text-anchor="middle" font-size="12" fill="#1d2433">N₂ = 50</text>
  <text x="272" y="146" text-anchor="middle" font-size="12" fill="#1d2433">i₂ = 2,0 A</text>
</svg></figure>`;

/* Lista 2 · Q1 — campo inclinado em relação ao plano da espira */
const FIG_ANGULO = `<figure class="fig figw"><svg class="plot" viewBox="0 0 300 175" role="img" aria-label="Espira vista de lado; linhas de campo inclinadas formando 60 graus com o plano da espira">
  ${SETA('ang')}
  <path d="M110 112 V22" stroke="#5b6475" stroke-width="1.5" stroke-dasharray="5 4"/>
  <text x="114" y="24" font-size="12" fill="#5b6475">normal</text>
  <g stroke="#2f66c6" stroke-width="2" marker-end="url(#ang)">
    <path d="M65 153 L135 32"/><path d="M145 153 L215 32"/><path d="M225 153 L285 49"/>
  </g>
  <text x="222" y="30" font-size="13" font-weight="700" fill="#2f66c6">B</text>
  <path d="M60 110 H260" stroke="#b5602a" stroke-width="5" stroke-linecap="round"/>
  <path d="M195 110 A25 25 0 0 0 182.5 88.4" fill="none" stroke="#1d2433" stroke-width="1.5"/>
  <text x="199" y="99" font-size="12" fill="#1d2433">60°</text>
  <text x="160" y="170" text-anchor="middle" font-size="12" fill="#5b6475">espira de raio 10 cm (vista de lado) · B = 0,40 T</text>
</svg></figure>`;

/* Lista 2 · Q5 — duas bobinas, pilha, chave e galvanômetro */
const FIG_BOBINAS = `<figure class="fig figw"><svg class="plot" viewBox="40 12 230 160" role="img" aria-label="Bobina 1 ligada a uma pilha e a uma chave; bobina 2, ao lado, ligada a um galvanômetro">
  <g fill="none" stroke="#b5602a" stroke-width="2.5">${[70,80,90,100,110].map(x=>`<ellipse cx="${x}" cy="60" rx="5" ry="22"/>`).join('')}
  ${[190,200,210,220,230].map(x=>`<ellipse cx="${x}" cy="60" rx="5" ry="22"/>`).join('')}</g>
  <text x="90" y="28" text-anchor="middle" font-size="12" fill="#1d2433">bobina 1</text>
  <text x="210" y="28" text-anchor="middle" font-size="12" fill="#1d2433">bobina 2</text>
  <path d="M70 82 V130 H82 M90 130 H98 M111 130 V82" fill="none" stroke="#1d2433" stroke-width="2"/>
  <path d="M82 118 V142" stroke="#1d2433" stroke-width="2.5"/><path d="M90 124 V136" stroke="#1d2433" stroke-width="4"/>
  <circle cx="98" cy="130" r="2.5" fill="#1d2433"/><circle cx="111" cy="130" r="2.5" fill="#1d2433"/>
  <path d="M98 130 L110 119" stroke="#1d2433" stroke-width="2"/>
  <text x="74" y="160" text-anchor="middle" font-size="11" fill="#5b6475">pilha</text>
  <text x="118" y="160" text-anchor="middle" font-size="11" fill="#5b6475">chave</text>
  <path d="M190 82 V130 H199 M221 130 H230 V82" fill="none" stroke="#1d2433" stroke-width="2"/>
  <circle cx="210" cy="130" r="11" fill="#fffdf9" stroke="#1d2433" stroke-width="2"/><text x="210" y="135" text-anchor="middle" font-size="12" font-weight="700" fill="#1d2433">G</text>
  <text x="210" y="160" text-anchor="middle" font-size="11" fill="#5b6475">galvanômetro</text>
</svg></figure>`;

/* Lista 2 · Q6 — tabela de transmissão */
const TAB_TRANSMISSAO = `<div class="tblwrap tbl-txt"><table class="dtab"><thead><tr><th>Tensão de transmissão</th><th>Corrente na linha</th><th>Potência perdida na linha</th></tr></thead>
<tbody><tr><td>1 000 V</td><td>100 A</td><td>20 kW</td></tr><tr><td>10 000 V<br><small>(elevada por transformador)</small></td><td>?</td><td>?</td></tr></tbody></table></div>`;

const FIG_LENZ = `<figure class="fig figw"><svg class="plot" viewBox="0 0 300 110" role="img" aria-label="Ímã com o polo norte voltado para uma espira, aproximando-se dela">
  <text x="4" y="40" font-size="12" fill="#5b6475">observador</text>
  <path d="M10 50 L48 50" stroke="#5b6475" stroke-width="1.5" marker-end="url(#ah)"/>
  <defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#5b6475"/></marker>
  <marker id="ah2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1d2433"/></marker></defs>
  <rect x="68" y="44" width="40" height="22" fill="#2f66c6"/><text x="88" y="60" text-anchor="middle" font-size="14" font-weight="700" fill="#fff">S</text>
  <rect x="108" y="44" width="40" height="22" fill="#d2433a"/><text x="128" y="60" text-anchor="middle" font-size="14" font-weight="700" fill="#fff">N</text>
  <path d="M158 55 L198 55" stroke="#1d2433" stroke-width="2" marker-end="url(#ah2)"/><text x="176" y="47" font-size="13" font-style="italic" fill="#1d2433">v</text>
  <ellipse cx="240" cy="55" rx="14" ry="42" fill="none" stroke="#b5602a" stroke-width="4"/>
  <text x="262" y="102" font-size="12" fill="#5b6475">espira</text>
</svg></figure>`;

const FIG_GRAF = `<figure class="fig figw"><svg class="plot" viewBox="0 0 280 160" role="img" aria-label="Gráfico de B em função de t: B sobe linearmente de 0 a 0,6 T entre 0 e 0,3 s e fica constante em 0,6 T até 0,5 s">
  <defs><marker id="ax" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1d2433"/></marker></defs>
  <path d="M40 130 L262 130" stroke="#1d2433" stroke-width="1.5" marker-end="url(#ax)"/>
  <path d="M40 130 L40 14" stroke="#1d2433" stroke-width="1.5" marker-end="url(#ax)"/>
  <text x="46" y="18" font-size="12" fill="#1d2433">B (T)</text>
  <text x="252" y="122" font-size="12" fill="#1d2433">t (s)</text>
  <path d="M40 40 L160 40 M160 40 L160 130" stroke="#8a8f99" stroke-dasharray="4 4"/>
  <path d="M40 130 L160 40 L240 40" fill="none" stroke="#b5602a" stroke-width="3"/>
  <text x="34" y="44" text-anchor="end" font-size="12" fill="#1d2433">0,6</text>
  <text x="34" y="134" text-anchor="end" font-size="12" fill="#1d2433">0</text>
  <text x="160" y="146" text-anchor="middle" font-size="12" fill="#1d2433">0,3</text>
  <text x="240" y="146" text-anchor="middle" font-size="12" fill="#1d2433">0,5</text>
  <path d="M240 40 L240 130" stroke="#8a8f99" stroke-dasharray="4 4"/>
</svg></figure>`;



/* ===== caixa de ferramentas ===== */
const TOOLS_INDUCAO = [
  ['Fluxo magnético', `Φ = B · A · cos θ<br><small>θ é o ângulo entre o campo B e a reta normal (perpendicular) ao plano da espira. Unidade: weber (1 Wb = 1 T·m²).</small>`],
  ['Lei de Faraday', `ε = N · ${f('|ΔΦ|','Δt')}<br><small>N = número de espiras. 1 Wb/s = 1 V.</small>`],
  ['Lei de Lenz', `A corrente induzida tem sentido tal que <b>se opõe à variação</b> do fluxo que a produziu.`],
  ['Barra em movimento', `ε = B · L · v &nbsp;&nbsp;e&nbsp;&nbsp; i = ${f('ε','R')}`],
  ['Transformador ideal', `${f('U<sub>1</sub>','U<sub>2</sub>')} = ${f('N<sub>1</sub>','N<sub>2</sub>')} &nbsp;&nbsp;e&nbsp;&nbsp; U<sub>1</sub>·i<sub>1</sub> = U<sub>2</sub>·i<sub>2</sub>`],
  ['Conversões', `1 cm = 10<sup>−2</sup> m &nbsp;·&nbsp; 1 cm² = 10<sup>−4</sup> m²`]
];

/* ===== questões — Indução, Lista 1 ===== */
const Q_INDUCAO_1 = [
{ src:'Original', nivel:'básico',
  text:`Uma bobina está ligada a um galvanômetro (amperímetro bem sensível), formando um circuito fechado. Em qual das situações abaixo o galvanômetro <b>não</b> indica corrente?`,
  opts:[`Um ímã é aproximado rapidamente da bobina.`,`Um ímã é afastado da bobina.`,`Um ímã permanece parado dentro da bobina.`,`A bobina é girada perto de um ímã fixo.`,`A corrente em uma bobina vizinha é ligada ou desligada.`],
  ans:2,
  hint:`Em cada caso, pergunte-se: o fluxo magnético através da bobina está <b>mudando</b>?`,
  steps:[['Ideia central',`Só há corrente induzida quando o <b>fluxo magnético varia</b> (Lei de Faraday).`],
         ['Analisando',`Aproximar, afastar, girar e ligar/desligar uma corrente vizinha fazem o fluxo mudar. Com o ímã parado, o campo dentro da bobina é intenso, mas <b>constante</b>: ΔΦ = 0.`],
         ['Conclusão',`Sem variação de fluxo, não há fem induzida → alternativa C.`]],
  alt:`Pense no dínamo de bicicleta: se a roda para, a lâmpada apaga, mesmo com o ímã lá dentro. O que gera energia é o <i>movimento</i> (a variação), não a simples presença do ímã.`,
  warn:`Campo intenso não é o mesmo que campo variando. Um ímã forte parado não induz corrente nenhuma.` },

{ src:'Original', nivel:'básico',
  text:`Uma espira quadrada de lado 20 cm está em uma região de campo magnético uniforme de intensidade 0,50 T, perpendicular ao plano da espira e entrando no papel, como mostra a figura.${FIG_ESPIRA_Q}O fluxo magnético através da espira vale:`,
  opts:[`1,0 × 10<sup>−1</sup> Wb`,`2,0 × 10<sup>−2</sup> Wb`,`1,0 × 10<sup>−2</sup> Wb`,`2,0 × 10<sup>−1</sup> Wb`,`4,0 × 10<sup>−2</sup> Wb`],
  ans:1,
  hint:`Converta o lado para metros antes de calcular a área. Campo perpendicular ao plano → cos 0° = 1.`,
  steps:[['Dados',`L = 20 cm = 0,20 m &nbsp;·&nbsp; B = 0,50 T &nbsp;·&nbsp; θ = 0° (campo na direção da normal)`],
         ['Área',`A = L² = (0,20)² = 0,040 m²`],
         ['Fluxo',`Φ = B · A · cos θ = 0,50 · 0,040 · 1 = 0,020 Wb = <b>2,0 × 10<sup>−2</sup> Wb</b>`]],
  alt:`Fluxo é a “quantidade de linhas de campo” que atravessa a espira. Com o campo perpendicular, todas as linhas atravessam: basta fazer B × A.`,
  warn:`Esquecer de elevar o lado ao quadrado dá 0,50 · 0,20 = 0,10 Wb (alternativa A). A área de um quadrado é L², não L.` },

{ src:'Original', nivel:'básico',
  text:`O fluxo magnético através de uma espira diminui de 0,08 Wb para 0,02 Wb em 0,2 s. O módulo da força eletromotriz (fem) média induzida na espira é:`,
  opts:[`0,1 V`,`0,3 V`,`0,4 V`,`0,5 V`,`0,012 V`],
  ans:1,
  hint:`Primeiro calcule <b>quanto</b> o fluxo variou; depois divida pelo tempo.`,
  steps:[['Variação do fluxo',`ΔΦ = Φ<sub>final</sub> − Φ<sub>inicial</sub> = 0,02 − 0,08 = −0,06 Wb`],
         ['Lei de Faraday',`|ε| = ${f('|ΔΦ|','Δt')} = ${f('0,06','0,2')} = <b>0,3 V</b>`]],
  alt:`A fem mede a <i>rapidez</i> com que o fluxo muda: 0,06 Wb em 0,2 s equivale a 0,3 Wb por segundo, ou seja, 0,3 V.`,
  warn:`Usar só o fluxo inicial (0,08 ÷ 0,2 = 0,4 V) ou somar os fluxos (0,10 ÷ 0,2 = 0,5 V) são erros comuns: o que importa é a <b>variação</b>. Multiplicar pelo tempo (0,012) inverte a ideia de taxa.` },

{ src:'Original', nivel:'básico',
  text:`Uma bobina tem 50 espiras. O fluxo magnético através de cada espira aumenta uniformemente 4,0 × 10<sup>−3</sup> Wb em 0,02 s. O módulo da fem induzida na bobina é:`,
  opts:[`0,2 V`,`2 V`,`10 V`,`20 V`,`100 V`],
  ans:2,
  hint:`Cada espira se comporta como uma pequena “pilha” ligada em série com as outras.`,
  steps:[['Uma espira',`ε<sub>1</sub> = ${f('4,0 × 10<sup>−3</sup>','0,02')} = 0,2 V`],
         ['A bobina toda',`ε = N · ε<sub>1</sub> = 50 · 0,2 = <b>10 V</b>`]],
  alt:`As espiras estão em série: é como enfileirar 50 pilhas de 0,2 V — as tensões se somam e dão 10 V.`,
  warn:`0,2 V é a fem de <b>uma</b> espira só — faltou multiplicar por N = 50.` },

{ src:'Original', nivel:'básico',
  text:`O polo norte de um ímã é aproximado de uma espira condutora fechada, deslocando-se ao longo do eixo dela, como na figura. Para um observador do lado do ímã, olhando para a espira, a corrente induzida tem sentido:${FIG_LENZ}`,
  opts:[`horário, e a espira atrai o ímã.`,`anti-horário, e a espira repele o ímã.`,`horário, e a espira repele o ímã.`,`anti-horário, e a espira atrai o ímã.`,`nenhum: não há corrente, pois o ímã não toca a espira.`],
  ans:1,
  hint:`Lei de Lenz: a espira “reage” contra a mudança. O ímã está chegando — ela vai querer empurrá-lo ou puxá-lo?`,
  steps:[['O que muda',`O polo norte se aproxima: o fluxo através da espira (linhas saindo do polo N) <b>aumenta</b>.`],
         ['Reação (Lenz)',`A corrente induzida cria um campo que se opõe a esse aumento: a face da espira voltada para o ímã vira um <b>polo norte</b> — e norte repele norte.`],
         ['Sentido',`Pela regra da mão direita, para o campo da espira apontar para o observador, a corrente deve circular no sentido <b>anti-horário</b> (visto do lado do ímã).`]],
  alt:`A Lei de Lenz funciona como um freio: a espira sempre dificulta o movimento. Ímã chegando → a espira repele; ímã se afastando → a espira atrai.`,
  warn:`“O ímã não toca a espira, então não há corrente” — errado: a interação acontece pelo campo magnético, não pelo contato.` },

{ src:'Original', nivel:'básico',
  text:`Uma barra condutora de 0,50 m de comprimento desliza com velocidade constante de 4,0 m/s sobre dois trilhos condutores, movendo-se perpendicularmente a um campo magnético uniforme de 0,20 T. A fem induzida entre as extremidades da barra é:`,
  opts:[`0,04 V`,`0,10 V`,`0,40 V`,`1,6 V`,`4,0 V`],
  ans:2,
  hint:`Para uma barra que “corta” linhas de campo existe uma fórmula direta com B, L e v.`,
  steps:[['Dados',`B = 0,20 T &nbsp;·&nbsp; L = 0,50 m &nbsp;·&nbsp; v = 4,0 m/s`],
         ['Cálculo',`ε = B · L · v = 0,20 · 0,50 · 4,0 = <b>0,40 V</b>`]],
  alt:`Pela Lei de Faraday: a cada segundo, a área do circuito aumenta 0,50 × 4,0 = 2,0 m². O fluxo cresce 0,20 × 2,0 = 0,40 Wb por segundo → 0,40 V.`,
  warn:`As três grandezas entram multiplicando. Usar só B · L dá 0,10 V (alternativa B) — esqueceu a velocidade.` },

{ src:'Original', nivel:'básico+',
  text:`Uma barra metálica de 0,40 m desliza a 5,0 m/s sobre trilhos condutores ligados por um resistor de 2,0 Ω. O conjunto está em um campo magnético uniforme de 0,50 T, perpendicular ao plano dos trilhos, como mostra a figura.${FIG_TRILHOS_L1}Desprezando as demais resistências, a intensidade da corrente induzida no circuito é:`,
  opts:[`0,20 A`,`0,50 A`,`1,0 A`,`2,0 A`,`2,5 A`],
  ans:1,
  hint:`São duas etapas: primeiro a fem (B · L · v); depois a Lei de Ohm.`,
  steps:[['fem induzida',`ε = B · L · v = 0,50 · 0,40 · 5,0 = 1,0 V`],
         ['Corrente',`i = ${f('ε','R')} = ${f('1,0','2,0')} = <b>0,50 A</b>`]],
  alt:`A barra em movimento funciona como uma pilha de 1,0 V ligada a um resistor de 2,0 Ω — vira um circuito simples.`,
  warn:`Parar na fem e responder 1,0 A confunde volt com ampère. Multiplicar por R (1,0 × 2,0 = 2,0 A) inverte a Lei de Ohm.` },

{ src:'Original', nivel:'básico+',
  text:`Uma espira de área 0,020 m² está inicialmente com seu plano perpendicular a um campo magnético uniforme de 0,40 T. Em 0,10 s, ela é girada até que seu plano fique <b>paralelo</b> às linhas de campo. O módulo da fem média induzida nesse intervalo é:`,
  opts:[`zero, pois o campo não mudou`,`0,008 V`,`0,08 V`,`0,16 V`,`0,8 V`],
  ans:2,
  hint:`Quando o plano da espira fica paralelo às linhas de campo, quantas linhas a atravessam?`,
  steps:[['Fluxo inicial',`Plano ⟂ campo (máximo): Φ<sub>i</sub> = B · A = 0,40 · 0,020 = 0,0080 Wb`],
         ['Fluxo final',`Plano ∥ campo: nenhuma linha atravessa (θ = 90° entre B e a normal) → Φ<sub>f</sub> = 0`],
         ['Faraday',`|ε| = ${f('0,0080','0,10')} = <b>0,080 V</b>`]],
  alt:`Pense numa peneira na chuva: de frente, pega toda a água; de lado, nenhuma. Girar a espira muda o fluxo mesmo com B constante.`,
  warn:`O campo não mudou, mas o <b>fluxo</b> mudou — por isso a fem não é zero. E 0,16 V corresponderia a um giro de 180° (fluxo de +Φ a −Φ), não de 90°.` },

{ src:'Original', nivel:'básico+',
  text:`Uma bobina de 100 espiras, cada uma com área de 0,010 m², está em um campo magnético perpendicular ao seu plano. O gráfico mostra a intensidade do campo em função do tempo.${FIG_GRAF}O módulo da fem induzida nos intervalos de 0 a 0,3 s e de 0,3 s a 0,5 s é, respectivamente:`,
  opts:[`2,0 V e zero`,`2,0 V e 2,0 V`,`0,020 V e zero`,`zero e 2,0 V`,`0,60 V e 0,60 V`],
  ans:0,
  hint:`A fem depende da <b>inclinação</b> do gráfico (rapidez da variação), não da altura.`,
  steps:[['De 0 a 0,3 s',`ΔΦ por espira = ΔB · A = 0,60 · 0,010 = 0,0060 Wb<br>ε = N · ${f('ΔΦ','Δt')} = 100 · ${f('0,0060','0,3')} = <b>2,0&nbsp;V</b>`],
         ['De 0,3 s a 0,5 s',`B constante → ΔΦ = 0 → <b>ε = 0</b>`]],
  alt:`Leitura rápida do gráfico: rampa = há fem; trecho horizontal = não há fem. Quanto mais inclinada a rampa, maior a fem.`,
  warn:`No trecho horizontal o campo é o maior possível, mas a fem é zero. E 0,020 V esqueceu as 100 espiras.` },

{ src:'Original', nivel:'básico+',
  text:`Um transformador ideal tem 1000 espiras no primário, ligado à rede de 220 V (corrente alternada), e 50 espiras no secundário. Uma lâmpada ligada ao secundário é percorrida por corrente de 2,0 A, como no esquema.${FIG_TRAFO}A tensão no secundário e a corrente no primário valem, respectivamente:`,
  opts:[`11 V e 0,10 A`,`11 V e 40 A`,`11 V e 2,0 A`,`4400 V e 0,10 A`,`4400 V e 40 A`],
  ans:0,
  hint:`A tensão segue a razão entre as espiras. Para a corrente, lembre que o transformador ideal não cria nem perde energia: a potência é a mesma nos dois lados.`,
  steps:[['Tensão',`U<sub>2</sub> = U<sub>1</sub> · ${f('N<sub>2</sub>','N<sub>1</sub>')} = 220 · ${f('50','1000')} = <b>11 V</b>`],
         ['Potência',`P = U<sub>2</sub> · i<sub>2</sub> = 11 · 2,0 = 22 W`],
         ['Corrente no primário',`i<sub>1</sub> = ${f('P','U<sub>1</sub>')} = ${f('22','220')} = <b>0,10 A</b>`],
         ['Por que CA?',`O transformador só funciona com corrente alternada: é a <b>variação</b> do fluxo no núcleo que induz tensão no secundário.`]],
  alt:`O transformador “troca” tensão por corrente: a tensão caiu 20 vezes (220 → 11 V), então a corrente no primário é 20 vezes menor que a do secundário (2,0 → 0,10 A).`,
  warn:`Usar a razão de espiras do mesmo jeito para a corrente dá 40 A — a corrente varia ao <b>contrário</b> da tensão. Inverter a razão na tensão dá 4400 V.` }
];

/* ===== Indução, Lista 2 — intermediário ===== */
const FIG_LENZ2 = `<figure class="fig figw"><svg class="plot" viewBox="0 0 300 122" role="img" aria-label="Ímã com o polo norte voltado para a espira, aproximando-se dela; a espira está parada">
  <defs><marker id="ah3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1d2433"/></marker></defs>
  <rect x="40" y="44" width="40" height="22" fill="#2f66c6"/><text x="60" y="60" text-anchor="middle" font-size="14" font-weight="700" fill="#fff">S</text>
  <rect x="80" y="44" width="40" height="22" fill="#d2433a"/><text x="100" y="60" text-anchor="middle" font-size="14" font-weight="700" fill="#fff">N</text>
  <path d="M130 55 L172 55" stroke="#1d2433" stroke-width="2" marker-end="url(#ah3)"/><text x="148" y="47" font-size="13" font-style="italic" fill="#1d2433">v</text>
  <ellipse cx="220" cy="55" rx="14" ry="42" fill="none" stroke="#b5602a" stroke-width="4"/>
  <text x="240" y="30" font-size="13" font-style="italic" fill="#b5602a">i</text>
  <text x="220" y="116" text-anchor="middle" font-size="12" fill="#5b6475">espira parada</text>
</svg></figure>`;

const TOOLS_INDUCAO_2 = [
  ['Fluxo magnético', `Φ = B · A · cos θ<br><small>θ é o ângulo entre B e a <b>normal</b> ao plano da espira (não entre B e o plano!).</small>`],
  ['Lei de Faraday', `ε = N · ${f('|ΔΦ|','Δt')} &nbsp;·&nbsp; <small>se B inverte de sentido, |ΔB| = 2B</small>`],
  ['Lei de Lenz', `A corrente induzida se opõe à <b>variação</b> do fluxo: aproximação → repulsão; afastamento → atração.`],
  ['Barra em trilhos', `ε = B · L · v &nbsp;·&nbsp; i = ${f('ε','R')} &nbsp;·&nbsp; F<sub>mag</sub> = B · i · L &nbsp;·&nbsp; P = ε · i = R · i²`],
  ['Gerador', `ε<sub>máx</sub> = N · B · A · ω &nbsp;·&nbsp; R<sub>fio</sub> = ρ · ${f('comprimento','área da seção')}`],
  ['Transformador e transmissão', `${f('U<sub>1</sub>','U<sub>2</sub>')} = ${f('N<sub>1</sub>','N<sub>2</sub>')} &nbsp;·&nbsp; P = U · i &nbsp;·&nbsp; P<sub>perdida</sub> = R<sub>linha</sub> · i²`],
  ['Valores úteis', `π ≈ 3 &nbsp;·&nbsp; √3 ≈ 1,7 &nbsp;·&nbsp; cos 30° = ${f('√3','2')} &nbsp;·&nbsp; cos 60° = 0,5`]
];

const Q_INDUCAO_2 = [
{ src:'Original', nivel:'intermediário',
  text:`Uma espira circular de raio 10 cm está em um campo magnético uniforme de 0,40 T. As linhas de campo formam um ângulo de <b>60° com o plano</b> da espira, como na figura (vista de lado).${FIG_ANGULO}Usando π ≈ 3 e √3 ≈ 1,7, o fluxo magnético através da espira é aproximadamente:`,
  opts:[`6,0 × 10<sup>−3</sup> Wb`,`1,0 × 10<sup>−2</sup> Wb`,`1,2 × 10<sup>−2</sup> Wb`,`2,4 × 10<sup>−2</sup> Wb`,`1,2 × 10<sup>−1</sup> Wb`],
  ans:1,
  hint:`Cuidado com o ângulo: a fórmula usa o ângulo entre B e a <b>normal</b> ao plano. Se o campo faz 60° com o plano, quanto faz com a normal?`,
  steps:[['Área',`r = 10 cm = 0,10 m → A = π · r² ≈ 3 · 0,010 = 0,030 m²`],
         ['Ângulo certo',`60° com o plano → θ = 90° − 60° = 30° com a normal → cos 30° = ${f('√3','2')} ≈ 0,85`],
         ['Fluxo',`Φ = B · A · cos θ ≈ 0,40 · 0,030 · 0,85 ≈ <b>1,0 × 10<sup>−2</sup> Wb</b>`]],
  alt:`Pense na “sombra” da espira vista na direção do campo. Se o campo fosse rente ao plano (0° com o plano), não passaria nada; se fosse perpendicular ao plano, passaria tudo. 60° com o plano é bem perto de perpendicular, então o fluxo é quase o máximo (B · A = 1,2 × 10<sup>−2</sup> Wb), só um pouco menor.`,
  warn:`Usar cos 60° direto dá 6,0 × 10<sup>−3</sup> Wb (alternativa A) — é o erro clássico de medir o ângulo a partir do plano. Ignorar o ângulo dá 1,2 × 10<sup>−2</sup> Wb (C).` },

{ src:'Original', nivel:'intermediário',
  text:`Uma bobina de 20 espiras, cada uma com área de 0,020 m², está em um campo magnético perpendicular ao seu plano, de intensidade 0,30 T. Em 0,05 s, o campo tem seu <b>sentido invertido</b>, passando a valer 0,30 T no sentido oposto. O módulo da fem média induzida é:`,
  opts:[`zero`,`0,24 V`,`2,4 V`,`4,8 V`,`9,6 V`],
  ans:3,
  hint:`O campo não foi a zero: foi de +0,30 T a −0,30 T. Qual é a variação total?`,
  steps:[['Variação do campo',`ΔB = (−0,30) − (+0,30) = −0,60 T → |ΔB| = 0,60 T`],
         ['Variação do fluxo (uma espira)',`|ΔΦ| = |ΔB| · A = 0,60 · 0,020 = 0,012 Wb`],
         ['Faraday',`ε = N · ${f('|ΔΦ|','Δt')} = 20 · ${f('0,012','0,05')} = <b>4,8 V</b>`]],
  alt:`Divida em duas etapas: de 0,30 T até zero o fluxo cai 0,006 Wb; de zero até 0,30 T no outro sentido, cai mais 0,006 Wb. Total: 0,012 Wb por espira.`,
  warn:`“A intensidade inicial e a final são iguais, então não variou” leva a zero (A). Usar só 0,30 T de variação dá 2,4 V (C) — metade do valor certo.` },

{ src:'Original', nivel:'intermediário',
  text:`Uma barra condutora de 0,50 m desliza sem atrito sobre trilhos ligados por um resistor de 4,0 Ω, em um campo magnético uniforme de 0,80 T perpendicular ao plano dos trilhos. Para que a barra mantenha velocidade constante de 5,0 m/s, um agente externo deve puxá-la com uma força F, como na figura.${FIG_TRILHOS_L2}A intensidade da força aplicada pelo agente e a potência dissipada no resistor são, respectivamente:`,
  opts:[`zero e 1,0 W`,`0,20 N e 0,50 W`,`0,20 N e 1,0 W`,`0,40 N e 2,0 W`,`1,0 N e 0,20 W`],
  ans:2,
  hint:`Calcule a corrente; a força magnética sobre a barra (B · i · L) freia o movimento. Com velocidade constante, a força do agente equilibra exatamente essa força.`,
  steps:[['fem e corrente',`ε = B · L · v = 0,80 · 0,50 · 5,0 = 2,0 V &nbsp;→&nbsp; i = ${f('2,0','4,0')} = 0,50 A`],
         ['Força magnética',`F<sub>mag</sub> = B · i · L = 0,80 · 0,50 · 0,50 = 0,20 N, oposta à velocidade (Lenz). O agente aplica <b>0,20 N</b>.`],
         ['Potência',`P = R · i² = 4,0 · 0,50² = <b>1,0 W</b>`],
         ['Conferindo pela energia',`Potência do agente = F · v = 0,20 · 5,0 = 1,0 W — igual à dissipada no resistor.`]],
  alt:`Lenz em termos de energia: a corrente só existe porque alguém está empurrando a barra. Todo o trabalho do agente vira calor no resistor (1,0 W).`,
  warn:`“Velocidade constante, então a força é zero” (A) vale sem campo; aqui existe a força magnética de frenagem, que precisa ser equilibrada.` },

{ src:'Original', nivel:'intermediário',
  text:`Um pequeno ímã é solto dentro de um tubo vertical de cobre e leva vários segundos para atravessá-lo. Um bloco de madeira idêntico, solto no mesmo tubo, atravessa quase instantaneamente. Sabe-se que o cobre <b>não</b> é atraído por ímãs. A explicação para a queda lenta do ímã é que:`,
  opts:[`o cobre é atraído pelo ímã, que fica “grudando” nas paredes do tubo.`,`o ar dentro do tubo é comprimido pelo ímã, que é mais denso que a madeira.`,`correntes induzidas no tubo geram campos que freiam o ímã.`,`o ímã fica eletricamente carregado pelo atrito e é atraído pelo tubo.`,`dentro do tubo metálico a gravidade fica blindada e atua com menor intensidade.`],
  ans:2,
  hint:`O fluxo magnético através de cada “anel” do tubo muda enquanto o ímã passa. O que a Lei de Lenz diz sobre isso?`,
  steps:[['Fluxo variando',`Cada trecho do tubo funciona como uma espira fechada. Com o ímã passando, o fluxo nesses anéis varia.`],
         ['Correntes induzidas',`Surgem correntes induzidas no cobre (correntes de Foucault), que é bom condutor.`],
         ['Lenz',`Essas correntes geram campos que repelem o ímã acima e o atraem por trás: o efeito sempre se opõe ao movimento, e o ímã cai devagar.`],
         ['Energia',`A energia potencial perdida pelo ímã vira principalmente calor no tubo, e não energia cinética.`]],
  alt:`É o mesmo princípio do freio magnético de trens e de algumas montanhas-russas: metal condutor + ímã em movimento = frenagem sem contato.`,
  warn:`O cobre não é ferromagnético — ele não é atraído por ímãs parados (A é falsa). O efeito só aparece porque o ímã está em <b>movimento</b>; um ímã parado no tubo não sofre força nenhuma.` },

{ src:'Original', nivel:'intermediário',
  text:`Duas bobinas estão lado a lado, sem contato. A bobina 1 está ligada a uma pilha e a uma chave; a bobina 2, a um galvanômetro de zero central, como no esquema.${FIG_BOBINAS}O que se observa no galvanômetro ao <b>fechar</b> a chave, ao <b>mantê-la fechada</b> e ao <b>abri-la</b>?`,
  opts:[`Desvia ao fechar e permanece desviado enquanto a chave estiver fechada; volta a zero ao abrir.`,`Desvia rapidamente ao fechar, volta a zero e desvia ao contrário ao abrir.`,`Desvia momentaneamente ao fechar e ao abrir, sempre no mesmo sentido.`,`Não desvia em nenhum momento, pois as bobinas não estão ligadas entre si.`,`Permanece em zero ao fechar e só desvia quando a chave é aberta.`],
  ans:1,
  hint:`O galvanômetro só registra corrente enquanto o fluxo na bobina 2 está <b>mudando</b>. Em qual desses momentos a corrente na bobina 1 está variando?`,
  steps:[['Fechar a chave',`A corrente na bobina 1 sobe de zero ao valor final → o fluxo na bobina 2 <b>aumenta</b> → pulso de corrente induzida.`],
         ['Chave fechada',`Corrente constante na bobina 1 → fluxo constante → <b>nenhuma</b> corrente induzida.`],
         ['Abrir a chave',`O fluxo <b>diminui</b> até zero → pulso em sentido <b>oposto</b> ao do fechamento (Lenz).`]],
  alt:`Esse foi o experimento de Faraday em 1831: ele esperava corrente contínua na segunda bobina, mas só viu “trancos” do ponteiro ao ligar e ao desligar.`,
  warn:`A alternativa A troca “campo existindo” por “campo variando”. E o sentido não é o mesmo nos dois pulsos (C): aumentar e diminuir o fluxo provocam reações opostas.` },

{ src:'Original', nivel:'intermediário',
  text:`Uma usina deve enviar 100 kW a uma cidade por uma linha de transmissão de resistência total 2,0 Ω. A tabela mostra o que acontece com a transmissão em 1 000 V e propõe elevar a tensão para 10 000 V com um transformador, mantendo a potência enviada.${TAB_TRANSMISSAO}Com a transmissão em 10 000 V, a potência perdida na linha passa a ser:`,
  opts:[`20 kW`,`2,0 kW`,`200 W`,`20 W`,`200 kW`],
  ans:2,
  hint:`Com a potência fixa, a corrente na linha depende da tensão (P = U · i). E a perda depende do <b>quadrado</b> da corrente.`,
  steps:[['Corrente em 10 kV',`i = ${f('P','U')} = ${f('100 000','10 000')} = 10 A (antes era 100 A)`],
         ['Perda',`P<sub>perdida</sub> = R · i² = 2,0 · 10² = <b>200 W</b>`]],
  alt:`Tensão 10 vezes maior → corrente 10 vezes menor → perda 10² = 100 vezes menor: 20 kW ÷ 100 = 200 W. É por isso que as linhas de transmissão operam em altíssima tensão — e por isso precisamos de transformadores (e de corrente alternada).`,
  warn:`Dividir a perda só por 10 dá 2,0 kW (B). A perda cai com o <b>quadrado</b> da corrente. E não use U²/R com a tensão da usina: a queda de tensão na linha não é 10 000 V.` },

{ src:'Baseada no ENEM 2011', nivel:'intermediário',
  text:`O captador de um baixo elétrico é formado por uma bobina enrolada em torno de um ímã permanente, posicionada logo abaixo das cordas. Um músico trocou as cordas de aço por cordas de <b>cobre</b>, que é excelente condutor elétrico, e o amplificador praticamente deixou de emitir som. Isso aconteceu porque a corda de cobre:`,
  opts:[`conduz tão bem a eletricidade que a corrente induzida escapa por ela antes de chegar à bobina.`,`quase não se magnetiza, e sua vibração pouco altera o fluxo na bobina.`,`vibra com frequência alta demais para ser percebida pelo captador.`,`desmagnetiza o ímã do captador por estar muito próxima dele.`,`precisaria estar ligada eletricamente à bobina para transmitir a vibração.`],
  ans:1,
  hint:`Para induzir corrente, algo precisa fazer o fluxo magnético na bobina variar. Uma corda de aço vibrando faz isso. Por quê? O cobre tem essa mesma propriedade?`,
  steps:[['Como funciona o captador',`O ímã magnetiza a corda de aço logo acima dele: a corda vira um pequeno ímã.`],
         ['Vibração → fluxo variando',`Quando a corda magnetizada vibra, o fluxo na bobina varia no mesmo ritmo, induzindo uma corrente que vai ao amplificador.`],
         ['Com cobre',`O cobre não é ferromagnético: quase não se magnetiza. A corda vibra, mas o fluxo na bobina praticamente não muda → quase nenhuma corrente induzida.`]],
  alt:`O captador “escuta” o magnetismo da corda, não a eletricidade dela. Ser bom condutor não ajuda; o que importa é ser magnetizável (ferro, aço, níquel).`,
  warn:`A armadilha é achar que “bom condutor = bom para eletricidade = bom para o captador”. A corda não faz parte do circuito; a ligação dela com a bobina é só magnética.` },

{ src:'Baseada no ENEM 2014', nivel:'intermediário',
  text:`Na figura, um ímã com o polo norte voltado para uma espira parada se aproxima dela, e surge na espira uma corrente induzida i.${FIG_LENZ2}Usando os mesmos materiais, qual procedimento também produz na espira uma corrente de <b>mesmo sentido</b> que i?`,
  opts:[`Afastar o ímã da espira, mantendo a polaridade.`,`Inverter a polaridade do ímã e aproximá-lo da espira.`,`Inverter a polaridade do ímã e afastá-lo da espira.`,`Mover o ímã e a espira juntos, para a direita, com a mesma velocidade.`,`Deixar o ímã parado bem perto da espira, com a mesma polaridade.`],
  ans:2,
  hint:`Na figura, o fluxo através da espira (linhas saindo do N, apontando para a direita) está <b>aumentando</b>. Procure a situação em que a corrente induzida precise criar o mesmo campo que na figura.`,
  steps:[['Situação da figura',`O campo do ímã na espira aponta para a direita e cresce. Pela Lei de Lenz, a corrente i cria na espira um campo para a <b>esquerda</b>.`],
         ['Polaridade invertida e afastando',`Com o S voltado para a espira, o campo do ímã nela aponta para a esquerda (entrando no polo S). Afastando o ímã, esse campo para a esquerda <b>diminui</b>.`],
         ['Reação',`Para compensar a perda, a corrente induzida cria um campo para a <b>esquerda</b> — o mesmo da figura → mesmo sentido de i. Alternativa C.`]],
  alt:`Duas inversões se cancelam: inverter a polaridade troca o sentido da corrente, e trocar aproximar por afastar troca de novo. Inverter só uma das duas coisas (A ou B) dá o sentido oposto.`,
  warn:`Em D o ímã e a espira andam juntos: não há movimento <b>relativo</b>, o fluxo não muda e não há corrente. Em E o ímã parado também não induz nada.` },

{ src:'Baseada no ENEM 2020', nivel:'intermediário',
  text:`Em um pequeno gerador de uma usina, a tensão de pico nos terminais das bobinas é de 60 V quando o eixo gira a 900 rotações por minuto. Durante uma cheia, a turbina passou a girar a 1 200 rotações por minuto. Mantidos o ímã, as bobinas e as demais características, a nova tensão de pico é:`,
  opts:[`45 V`,`60 V`,`80 V`,`107 V`,`120 V`],
  ans:2,
  hint:`A fem depende da <b>rapidez</b> com que o fluxo varia. O fluxo máximo através das bobinas mudou? E a rapidez?`,
  steps:[['O que não muda',`O fluxo máximo (N · B · A) é o mesmo: mesmo ímã, mesmas bobinas.`],
         ['O que muda',`Girando mais rápido, o fluxo vai do máximo ao mínimo em menos tempo: ε<sub>máx</sub> = N · B · A · ω é proporcional à rotação.`],
         ['Proporção',`ε = 60 · ${f('1 200','900')} = 60 · ${f('4','3')} = <b>80 V</b>`]],
  alt:`Mesma variação de fluxo em 3/4 do tempo → fem 4/3 maior. É a Lei de Faraday aplicada ao gerador: ΔΦ igual, Δt menor.`,
  warn:`Achar que a tensão não muda porque “o ímã é o mesmo” (B) confunde fluxo com variação de fluxo. Elevar a razão ao quadrado dá ≈ 107 V (D) — a dependência com a rotação é linear.` },

{ src:'Baseada no ENEM 2017', nivel:'intermediário',
  text:`Um estudante montou um gerador com um fio de cobre de diâmetro D enrolado em N espiras circulares de área A, que giram com frequência f entre dois ímãs que produzem um campo uniforme B. Ele mediu a tensão máxima V e a corrente de curto-circuito i (terminais ligados diretamente). Ele quer <b>aumentar a corrente de curto-circuito sem alterar a tensão máxima</b>. Para isso, deve:`,
  opts:[`dobrar o número N de espiras, mantendo o mesmo fio.`,`dobrar a frequência f com que as espiras giram.`,`dobrar a intensidade B do campo entre os ímãs.`,`usar fio mais grosso, com as mesmas N espiras.`,`dobrar a área A de cada uma das N espiras.`],
  ans:3,
  hint:`Separe as grandezas em dois grupos: as que mudam a tensão (fem) e as que mudam só a resistência do fio. Em curto-circuito, i = V/R.`,
  steps:[['Tensão',`V = N · B · A · ω → depende de N, B, A e f. Para não mudar V, nenhuma delas pode mudar.`],
         ['Resistência',`R = ρ · ${f('comprimento do fio','área da seção do fio')}. Um fio mais grosso tem seção maior → R menor.`],
         ['Corrente',`i = V/R: V igual e R menor → <b>i maior</b>. Alternativa D.`]],
  alt:`Por que dobrar N não serve? Dobra a tensão, mas o fio fica com o dobro do comprimento e a resistência também dobra: a corrente de curto fica igual. Já f, B e A mudam a tensão — o estudante queria V constante.`,
  warn:`Dobrar N é a resposta de uma pergunta parecida (dobrar V mantendo i). Leia com atenção o que deve mudar e o que deve ficar constante.` }
];

