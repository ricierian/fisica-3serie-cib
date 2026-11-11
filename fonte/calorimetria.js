/* ---------- Calorimetria · Lista do aulão (10 questões inéditas, estilo ENEM) ---------- */
const TOOLS_CALOR = [
  ['Calor sensível e latente', `Q = m · c · ΔT &nbsp;·&nbsp; Q = m · L<br>Sistema isolado: ΣQ = 0`],
  ['Condução (Fourier)', `Φ = ${f('Q','Δt')} = ${f('k · A · ΔT','L')}<br>k: condutividade, constante de cada material`],
  ['Potência e rendimento', `P = ${f('Q','Δt')} &nbsp;·&nbsp; η = ${f('útil','total')}<br>Radiação solar: P = I · A &nbsp;·&nbsp; 1 cal ≈ 4,2 J`],
  ['Água', `c = 1 cal/(g·°C) = 4 200 J/(kg·°C)<br>L<sub>fusão</sub> = 80 cal/g &nbsp;·&nbsp; 1 L ≈ 1 kg`],
  ['Energia mecânica', `E<sub>p</sub> = m · g · h &nbsp;·&nbsp; E<sub>c</sub> = ${f('m · v²','2')}`],
  ['Dilatação', `ΔL = L₀ · α · ΔT<br>Lâmina bimetálica: o metal de maior α fica do lado de fora da curva`],
  ['Refrigerador', `Q₁ = Q₂ + W &nbsp;·&nbsp; e = ${f('Q₂','W')}<br>Q₂: retirado de dentro · Q₁: liberado no ambiente`]
];

/* Lâmina bimetálica do termostato (questão 3) */
const FIG_BIMETAL = fig('0 0 340 170', 'Termostato: lâmina bimetálica presa num suporte à esquerda, com latão na camada de cima e aço na camada de baixo. A ponta livre, à direita, encosta por baixo num contato fixo, fechando o circuito da resistência.',
  `<rect x="14" y="58" width="26" height="70" rx="3" fill="var(--line)" stroke="var(--muted)" stroke-width="1.5"/>
   <rect x="40" y="86" width="248" height="11" fill="#D9A62E"/>
   <rect x="40" y="97" width="248" height="11" fill="#8C9AA6"/>
   <rect x="262" y="62" width="40" height="24" rx="3" fill="none" stroke="var(--ink)" stroke-width="2"/>
   <path d="M302 74 H326 V150 H24 V128" fill="none" stroke="var(--ink)" stroke-width="1.6" stroke-dasharray="5 4"/>
   <text x="150" y="80" text-anchor="middle" class="pt pt-strong">latão</text>
   <text x="150" y="126" text-anchor="middle" class="pt pt-strong">aço</text>
   <text x="282" y="54" text-anchor="middle" class="pt">contato</text>
   <text x="27" y="48" text-anchor="middle" class="pt">suporte</text>
   <text x="175" y="164" text-anchor="middle" class="pt">circuito da resistência do ferro</text>`, 380);

/* Fluxo de energia da geladeira (questão 10) */
const FIG_GELADEIRA = (() => {
  const [d, mk] = seta('var(--ink)');
  const caixa = (x, t1, t2, cheio) => `<rect x="${x}" y="70" width="86" height="60" rx="8" fill="${cheio ? 'var(--line)' : 'none'}" stroke="var(--ink)" stroke-width="2"/><text x="${x + 43}" y="96" text-anchor="middle" class="pt pt-strong">${t1}</text><text x="${x + 43}" y="114" text-anchor="middle" class="pt">${t2}</text>`;
  return fig('0 0 380 190', 'Esquema da geladeira: o calor Q2 é retirado do interior, o compressor recebe o trabalho W da tomada, e o calor Q1 é liberado na cozinha pela grade traseira.',
  `${d}${caixa(4, 'interior', 'fonte fria')}${caixa(147, 'geladeira', 'compressor', true)}${caixa(290, 'cozinha', 'fonte quente')}
   <line x1="94" y1="100" x2="141" y2="100" stroke="var(--ink)" stroke-width="2.5" marker-end="${mk}"/>
   <text x="117" y="90" text-anchor="middle" class="pt pt-strong">Q₂</text>
   <line x1="237" y1="100" x2="284" y2="100" stroke="var(--ink)" stroke-width="2.5" marker-end="${mk}"/>
   <text x="260" y="90" text-anchor="middle" class="pt pt-strong">Q₁</text>
   <line x1="190" y1="24" x2="190" y2="64" stroke="var(--ink)" stroke-width="2.5" marker-end="${mk}"/>
   <text x="200" y="46" class="pt pt-strong">W</text>
   <text x="190" y="16" text-anchor="middle" class="pt">tomada</text>
   <text x="190" y="166" text-anchor="middle" class="pt pt-strong">e = Q₂ / W = 3</text>`, 400);
})();

const Q_CALOR = [
{ src: 'Inédita', nivel: 'básico',
  text: '<p>Para enfrentar as ondas de calor, algumas prefeituras incentivam a pintura de telhados e lajes com tinta branca, os chamados “telhados frios”. Em dias de sol forte, a temperatura no interior das casas com telhado branco pode ficar alguns graus abaixo da registrada em casas com telhas escuras.</p><p>A principal razão para esse efeito é que a superfície branca</p>',
  opts: ['aumenta a condução de calor do telhado para o forro.','reduz as correntes de convecção dentro dos cômodos.','diminui a absorção da radiação solar pelo telhado.','impede que o calor do Sol chegue ao telhado pelo ar.','emite mais radiação infravermelha do que qualquer superfície escura, à mesma temperatura.'], ans: 2,
  hint: 'O calor do Sol chega ao telhado atravessando o espaço vazio. Qual é o único processo que funciona no vácuo, e o que a cor da superfície muda nele?',
  steps: [['Como o calor chega', '<p>A energia do Sol atravessa o vácuo e chega ao telhado por <b>irradiação</b> (ondas eletromagnéticas).</p>'],
          ['Papel da cor', '<p>Superfícies claras refletem a maior parte dessa radiação; superfícies escuras absorvem quase toda. Com o telhado branco, <b>menos energia é absorvida</b> e menos calor passa para dentro da casa.</p>']],
  alt: 'Pense na roupa preta e na roupa branca ao sol do meio-dia: a cor não muda a temperatura do ar, muda quanto da radiação o tecido absorve. O telhado funciona do mesmo jeito.',
  warn: erros([['A)','mais condução para o forro esquentaria a casa, não a refrescaria.'],['B)','a tinta do telhado não interfere na circulação de ar dentro dos cômodos.'],['D)','o calor do Sol não chega pelo ar, e sim por radiação, atravessando o vácuo.'],['E)','bons absorvedores são bons emissores: a superfície escura é que emite mais, não a branca.']]) },

{ src: 'Inédita', nivel: 'básico',
  text: '<p>Em uma manhã fria, uma pessoa sai da cama descalça, pisa no piso de cerâmica do quarto e, em seguida, no tapete de lã ao lado da cama. O piso e o tapete estão no mesmo ambiente há horas, mas ela tem a nítida sensação de que a cerâmica está muito mais fria que o tapete.</p><p>Essa sensação ocorre porque</p>',
  opts: ['a cerâmica conduz melhor o calor e retira energia do pé mais depressa.','a cerâmica está, de fato, a uma temperatura menor que a do tapete.','a lã fornece calor ao pé, enquanto a cerâmica fornece frio.','a cerâmica acumulou mais frio durante a noite do que o tapete.','o tapete reflete a radiação emitida pelo pé, e a cerâmica absorve toda a radiação que recebe.'], ans: 0,
  hint: 'Se os dois estão no mesmo ambiente há horas, como estão as temperaturas deles? Então o que a pele está “medindo”?',
  steps: [['Temperaturas', '<p>Depois de horas no mesmo quarto, piso e tapete estão em <b>equilíbrio térmico</b>: têm a mesma temperatura.</p>'],
          ['O que a pele percebe', '<p>A pele não mede temperatura: percebe a <b>rapidez</b> com que perde calor. O pé, mais quente, perde calor por condução para o que toca.</p>'],
          ['Condutividade', '<p>A condutividade térmica k é uma propriedade constante de cada material. A da cerâmica é muito maior que a da lã (que ainda prende ar, ótimo isolante): o fluxo de calor do pé para a cerâmica é maior, e a sensação é de mais frio.</p>']],
  alt: 'É a mesma física da maçaneta de metal e da porta de madeira. Se os dois estivessem a 60 °C, a cerâmica pareceria mais quente, pelo mesmo motivo: ela troca calor mais depressa.',
  warn: erros([['B)','os dois estão no mesmo ambiente há horas: mesma temperatura.'],['C)','“frio” não é algo que se transfere; o que flui é calor, do pé para o piso.'],['D)','não existe “acumular frio”; objetos não guardam calor nem frio, têm energia interna.'],['E)','o efeito principal é a condução pelo contato, não a radiação.']]) },

{ src: 'Inédita', nivel: 'básico',
  text: `<p>O ferro de passar roupa tem um termostato que desliga a resistência quando a base fica quente demais. Ele usa uma lâmina bimetálica: duas tiras de metais diferentes, soldadas ao longo de todo o comprimento. Na temperatura ambiente, a lâmina é reta e sua ponta encosta por baixo em um contato, fechando o circuito, como no esquema.</p>
${FIG_BIMETAL}
${tabela(['Metal','Coeficiente de dilatação linear (°C⁻¹)'],[['Latão','19 × 10⁻⁶'],['Aço','11 × 10⁻⁶']])}
<p>Ao ser aquecida, a lâmina</p>`,
  opts: ['curva para cima, pressionando ainda mais o contato.','curva para cima, pois o aço se dilata mais que o latão.','não curva, pois os dois metais recebem o mesmo calor.','permanece reta, apenas aumenta de comprimento, e continua encostada no contato.','curva para baixo, afastando-se do contato e desligando a resistência.'], ans: 4,
  hint: 'Compare os coeficientes: qual tira “quer” ficar mais comprida? Como as duas estão soldadas, a mais comprida precisa ficar do lado de fora da curva.',
  steps: [['Quem dilata mais', '<p>O latão tem coeficiente maior (19 × 10⁻⁶ contra 11 × 10⁻⁶ °C⁻¹): com o mesmo aquecimento, ele se alonga mais que o aço.</p>'],
          ['Para onde curva', '<p>Soldadas, as tiras só acomodam a diferença curvando. O latão, mais comprido, fica do lado de fora da curva, em cima: a lâmina se curva <b>para baixo</b>.</p>'],
          ['Efeito no circuito', '<p>A ponta desce, se afasta do contato e o circuito se abre: a resistência desliga. Quando esfria, a lâmina volta e liga de novo.</p>']],
  alt: 'Pense numa pista de corrida: na curva, quem corre na raia de fora percorre mais. Na lâmina, o metal que se alonga mais vai para “a raia de fora”.',
  warn: erros([['A)','inverte o sentido da curva: quem fica por fora é o latão.'],['B)','lê a tabela ao contrário: o aço dilata menos.'],['C)','o calor é o mesmo, mas a dilatação depende do coeficiente de cada metal.'],['D)','esquece que as tiras são soldadas e se dilatam de modos diferentes.']]) },

{ src: 'Inédita', nivel: 'intermediário',
  text: `<p>Para comparar uma panela comum com uma panela de pressão, um estudante colocou a mesma quantidade de água a 20 °C em cada uma, aqueceu ambas em bocas idênticas do fogão, na mesma intensidade, e mediu a temperatura da água ao longo do tempo. O gráfico mostra os resultados.</p>
${plot({aria:'Temperatura da água, em graus Celsius, em função do tempo, em minutos. Na panela comum, a temperatura sobe de 20 °C a 100 °C em 8 min e fica constante em 100 °C. Na panela de pressão, sobe no mesmo ritmo até 120 °C, aos 10 min, e fica constante em 120 °C.', xmin:0, xmax:20, ymin:0, ymax:140, xt:[0,5,10,15,20], yt:[0,20,40,60,80,100,120,140], xl:'t (min)', yl:'θ (°C)', L:[{p:[[0,20],[10,120],[20,120]], c:'#E8562A', lab:'panela de pressão', lp:[10.5,129]},{p:[[0,20],[8,100],[20,100]], c:'#3A7BD5', dash:'7 5', lab:'panela comum', lp:[11,82]}]})}
<p>Com base no gráfico, a panela de pressão cozinha os alimentos mais rapidamente porque</p>`,
  opts: ['a chama transfere mais calor por minuto à panela de pressão.','com a pressão maior, a água ferve a uma temperatura mais alta.','durante a fervura, a temperatura da água continua subindo.','a pressão aumenta o calor específico da água, que passa a guardar mais energia.','o vapor preso impede a mudança de fase, e toda a energia aquece a água.'], ans: 1,
  hint: 'Compare as duas curvas: a inclinação no começo é igual ou diferente? E em que temperatura cada uma “para”?',
  steps: [['Leitura do gráfico', '<p>No início, as duas retas têm a mesma inclinação: as duas panelas recebem calor no mesmo ritmo. A diferença está no patamar: 100 °C na comum e 120 °C na de pressão.</p>'],
          ['Patamar', '<p>O patamar é a fervura: enquanto a água muda de fase, a temperatura fica constante (calor latente).</p>'],
          ['Conclusão', '<p>Com mais pressão, a temperatura de ebulição sobe. O alimento fica em contato com água a 120 °C, e não a 100 °C, e cozinha mais rápido.</p>']],
  alt: 'Em grandes altitudes acontece o contrário: a pressão é menor, a água ferve abaixo de 100 °C e o feijão demora mais. O leite UHT usa a mesma ideia, aquecido acima de 100 °C sob pressão alta.',
  warn: erros([['A)','as retas têm a mesma inclinação: o ritmo de aquecimento é o mesmo.'],['C)','nos dois patamares a temperatura fica constante durante a fervura.'],['D)','a pressão muda a temperatura de ebulição, não o calor específico.'],['E)','a água ferve também na panela de pressão; o patamar a 120 °C mostra isso.']]) },

{ src: 'Inédita', nivel: 'intermediário',
  text: `<p>Para escolher o isolante da tampa de uma caixa térmica, um técnico mediu o fluxo de calor através de uma placa de teste com 0,5 m² de área e 2,5 cm de espessura. Com uma diferença de 20 °C entre as duas faces, o fluxo medido foi de 12 W. Pela lei de Fourier, o fluxo de calor por condução é dado por Φ = k · A · ΔT / L, em que k é a condutividade térmica, uma constante característica de cada material.</p>
${tabela(['Material','k (W/(m·°C))'],[['Aço','50'],['Vidro','0,80'],['Madeira','0,15'],['Isopor','0,030'],['Ar parado','0,025']])}
<p>A placa testada é feita de</p>`,
  opts: ['aço.','vidro.','madeira.','isopor.','ar parado.'], ans: 3,
  hint: 'Isole k na lei de Fourier e lembre-se de que a espessura precisa estar em metros.',
  steps: [['Dados no SI', '<p>Φ = 12 W · A = 0,5 m² · ΔT = 20 °C · L = 2,5 cm = 0,025 m</p>'],
          ['Condutividade', `<div class="eq">k = ${f('Φ · L','A · ΔT')}</div><div class="eq">k = ${f('12 × 0,025','0,5 × 20')} = 0,030 W/(m·°C)</div>`],
          ['Material', '<p>Na tabela, k = 0,030 W/(m·°C) corresponde ao <b>isopor</b>.</p>']],
  alt: 'Repare na tabela: o aço conduz mais de mil vezes melhor que o isopor. Bons isolantes, como isopor, lã e espumas, funcionam porque prendem ar parado em pequenas bolhas, e o ar parado conduz muito pouco.',
  warn: erros([['A) aço:','divide o fluxo pela espessura em vez de multiplicar (dá 48 ≈ 50).']]) },

{ src: 'Inédita', nivel: 'intermediário',
  text: `<p>Em uma tarde de verão, um estudante percebe que a areia da praia está muito quente, enquanto a água do mar continua fresca. Para entender o fenômeno, ele considera porções de areia e de água de mesma massa, recebendo a mesma quantidade de energia do Sol, e consulta a tabela de calores específicos aproximados.</p>
${tabela(['Material','Calor específico (kJ/(kg·°C))'],[['Água','4,2'],['Concreto','0,88'],['Areia','0,84']])}
<p>A razão entre a variação de temperatura da areia e a da água e o sentido da brisa que sopra na praia durante a tarde são, respectivamente,</p>`,
  opts: ['0,20; do mar para a areia.','0,20; da areia para o mar.','1,0; não há brisa, pois as duas recebem a mesma energia.','5,0; da areia para o mar.','5,0; do mar para a areia.'], ans: 4,
  hint: 'Com Q e m iguais, ΔT é inversamente proporcional ao calor específico. Para a brisa: sobre qual superfície o ar esquenta mais e sobe?',
  steps: [['Razão das variações', `<p>Q = m · c · ΔT, com Q e m iguais:</p><div class="eq">${f('ΔT<sub>areia</sub>','ΔT<sub>água</sub>')} = ${f('c<sub>água</sub>','c<sub>areia</sub>')} = ${f('4,2','0,84')} = 5,0</div>`],
          ['Brisa', '<p>A areia fica mais quente; o ar sobre ela se aquece, fica menos denso e sobe. O ar mais frio, de cima do mar, ocupa o lugar: a brisa sopra <b>do mar para a areia</b> (brisa marítima).</p>']],
  alt: 'À noite tudo se inverte: a areia esfria rápido (calor específico baixo) e o mar continua morno, então a brisa sopra da terra para o mar. O mesmo efeito explica a menor amplitude térmica das cidades litorâneas.',
  warn: erros([['A) 0,20; do mar para a areia:','inverte a razão (c<sub>areia</sub>/c<sub>água</sub>), embora acerte a brisa.'],['B) 0,20; da areia para o mar:','inverte a razão e o sentido da brisa.'],['C)','mesma energia não significa mesma variação de temperatura: depende do calor específico.'],['D) 5,0; da areia para o mar:','acerta a razão, mas inverte a convecção (o ar quente sobe, e o frio vem ocupar o lugar).']]) },

{ src: 'Inédita', nivel: 'intermediário',
  text: '<p>Em provas longas em dias quentes, a evaporação do suor é o principal mecanismo de resfriamento do corpo. Suponha que, durante 1 hora de corrida, um atleta precise eliminar, apenas pela evaporação do suor, 540 J de energia térmica a cada segundo. Considere que a entalpia de vaporização da água, à temperatura da pele, é 43,2 kJ/mol e que sua massa molar é 18 g/mol.</p><p>A massa de suor que precisa evaporar nessa hora é de, aproximadamente,</p>',
  opts: ['0,225 g.','2,5 g.','45 g.','0,81 kg.','810 kg.'], ans: 3,
  hint: 'Calcule a energia total da hora, descubra quantos mols de água ela vaporiza e converta mols em gramas.',
  steps: [['Energia total', '<p>1 h = 3 600 s.</p><div class="eq">E = 540 × 3 600 = 1 944 000 J = 1 944 kJ</div>'],
          ['Quantidade de matéria', `<div class="eq">n = ${f('1 944 kJ','43,2 kJ/mol')} = 45 mol</div>`],
          ['Massa', '<div class="eq">m = 45 × 18 = 810 g ≈ 0,81 kg</div><p>Quase 1 litro de suor por hora: por isso a hidratação durante a prova é indispensável.</p>']],
  alt: 'Para evaporar, a água “cobra” calor latente e retira esse calor da pele. É o mesmo motivo de sentir frio ao sair da piscina com vento e de a moringa de barro manter a água fresca.',
  warn: erros([['A) 0,225 g:','usa 540 J como energia total, sem multiplicar pelo tempo.'],['B) 2,5 g:','divide os 45 mol por 18 em vez de multiplicar.'],['C) 45 g:','para no número de mols e o lê como gramas.'],['E) 810 kg:','divide joules por quilojoules por mol, sem converter a unidade.']]) },

{ src: 'Inédita', nivel: 'avançado',
  text: `<p>Uma família de Porto Alegre instalou um aquecedor solar de água. O manual traz os dados abaixo, e a irradiância solar média sobre os coletores, em um dia de céu limpo, é de 700 W/m².</p>
${tabela(['Dado do sistema','Valor'],[['Área dos coletores','3,0 m²'],['Rendimento dos coletores','50%'],['Volume do reservatório','150 L']])}
<p>Considere a densidade da água 1 kg/L, seu calor específico 4 200 J/(kg·°C) e que não há perdas no reservatório. O tempo necessário para aquecer toda a água do reservatório de 20 °C para 44 °C é de</p>`,
  opts: ['1,0 h.','2,0 h.','4,0 h.','7,3 h.','12 h.'], ans: 2,
  hint: 'Potência solar = irradiância × área. Só metade dela aquece a água. Depois compare com a energia que a água precisa receber.',
  steps: [['Potência útil', '<div class="eq">P = 0,50 × 700 × 3,0 = 1 050 W</div>'],
          ['Energia necessária', '<div class="eq">Q = 150 × 4 200 × (44 − 20)</div><div class="eq">Q = 15 120 000 J</div>'],
          ['Tempo', `<div class="eq">Δt = ${f('15 120 000','1 050')} = 14 400 s = 4,0 h</div>`]],
  alt: 'Irradiância (W/m²) é potência por área: multiplique pela área para ter a potência que chega, e pelo rendimento para ter a que fica na água. É o mesmo raciocínio dos painéis fotovoltaicos e dos refletores solares.',
  warn: erros([['A) 1,0 h:','calcula a energia em calorias e divide pela potência em watts.'],['B) 2,0 h:','esquece o rendimento de 50%.'],['D) 7,3 h:','usa 44 °C como variação de temperatura.'],['E) 12 h:','esquece a área dos coletores (usa só 1 m²).']]) },

{ src: 'Inédita', nivel: 'avançado',
  text: '<p>Um ciclista de 70 kg, com uma bicicleta de 10 kg, desce uma serra mantendo a velocidade constante com o uso dos freios a disco. Em um trecho, ele perde 20 m de altura. A bicicleta tem dois discos de freio de aço, de 0,25 kg cada, e o calor específico do aço é 460 J/(kg·°C). Considere g = 10 m/s² e que toda a energia dissipada nesse trecho aquece os discos, sem perdas para o ar.</p><p>O aumento de temperatura dos discos é de, aproximadamente,</p>',
  opts: ['0,070 °C.','35 °C.','61 °C.','70 °C.','140 °C.'], ans: 3,
  hint: 'Com velocidade constante, a energia cinética não muda. Que energia “sumiu” na descida, e para onde ela foi?',
  steps: [['Energia dissipada', '<p>Velocidade constante: a energia cinética não varia, e toda a energia potencial perdida vira calor nos freios. A massa é a do conjunto (80 kg).</p><div class="eq">E = m · g · h = 80 × 10 × 20 = 16 000 J</div>'],
          ['Massa aquecida', '<p>Dois discos: 2 × 0,25 = 0,50 kg de aço.</p>'],
          ['Aumento de temperatura', `<div class="eq">ΔT = ${f('E','m · c')} = ${f('16 000','0,50 × 460')} ≈ 70 °C</div>`]],
  alt: 'Em uma serra longa, essa energia se acumula a cada trecho. É por isso que freios superaquecem em descidas e que caminhões usam o freio motor: dividir a dissipação evita que os discos percam eficiência.',
  warn: erros([['A) 0,070 °C:','usa a massa dos discos em gramas com c em J/(kg·°C).'],['B) 35 °C:','usa m · g · h / 2, como se fosse energia cinética.'],['C) 61 °C:','considera só a massa do ciclista e esquece a bicicleta.'],['E) 140 °C:','considera só um disco.']]) },

{ src: 'Inédita', nivel: 'avançado',
  text: `<p>Uma família coloca 2,0 kg de água a 20 °C no congelador para fazer gelo. Na geladeira, um fluido refrigerante circula em ciclo: ele <b>evapora</b> na serpentina do interior (evaporador), é comprimido pelo compressor e se <b>condensa</b> na serpentina da grade traseira (condensador), voltando depois ao interior por uma válvula de expansão. Com o trabalho W do compressor, a geladeira retira o calor Q₂ do interior e libera o calor Q₁ na cozinha. Para essa geladeira, a eficiência é e&nbsp;=&nbsp;Q₂/W&nbsp;=&nbsp;3.</p>
${FIG_GELADEIRA}
<p>Considere o calor específico da água 1 cal/(g·°C), o calor latente de fusão 80 cal/g e 1 cal = 4,2 J. Para transformar toda a água em gelo a 0 °C, o calor liberado na cozinha e a parte do ciclo em que o fluido libera esse calor são, respectivamente,</p>`,
  opts: ['280 kJ, no evaporador.','840 kJ, no condensador.','1 120 kJ, no condensador.','1 120 kJ, no evaporador.','2 520 kJ, na válvula de expansão.'], ans: 2,
  hint: 'Duas perguntas. Na mudança de fase: evaporar absorve ou libera calor? E condensar? Na conta: calcule o calor retirado da água, o trabalho do compressor (pela eficiência) e some.',
  steps: [['Onde o calor sai', '<p>Evaporar <b>absorve</b> calor latente (por isso o evaporador fica no interior e o esfria). Condensar <b>libera</b> calor latente: é no <b>condensador</b>, na grade traseira, que o calor vai para a cozinha.</p>'],
          ['Calor retirado da água', '<p>Resfriar de 20 °C a 0 °C: 2 000 × 1 × 20 = 40 000 cal. Congelar: 2 000 × 80 = 160 000 cal.</p><div class="eq">Q₂ = 200 000 cal = 840 kJ</div>'],
          ['Trabalho do compressor', `<div class="eq">W = ${f('Q₂','e')} = ${f('840','3')} = 280 kJ</div>`],
          ['Calor na cozinha', '<div class="eq">Q₁ = Q₂ + W = 840 + 280 = 1 120 kJ</div>']],
  alt: 'A cozinha recebe mais calor do que a geladeira tirou da água, porque a energia elétrica do compressor também vira calor. Por isso deixar a geladeira aberta não refresca a cozinha: no balanço, ela a esquenta.',
  warn: erros([['A) 280 kJ, no evaporador:','responde o trabalho do compressor e troca evaporador por condensador.'],['B) 840 kJ, no condensador:','esquece que o trabalho do compressor também chega à cozinha.'],['D) 1 120 kJ, no evaporador:','acerta a conta, mas no evaporador o fluido absorve calor, não libera.'],['E) 2 520 kJ, na válvula de expansão:','multiplica Q₂ pela eficiência; na válvula, o fluido só perde pressão e esfria.']]) }
];
