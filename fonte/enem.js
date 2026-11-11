/* ===== Revisão ENEM · listas do aulão (3 listas de 10, por área) ===== */
/* Figura em imagem (pasta img/) com fundo claro, legível nos dois temas */
const foto = (n, aria, w) => `<figure class="fig figw"${w ? ` style="max-width:${w}px"` : ''}><img src="img/${n}.png" alt="${aria}" loading="lazy"></figure>`;
/* Pegadinha: de onde vem cada alternativa errada (gabarito comentado do professor) */
const erros = linhas => `De onde vem cada alternativa errada:<ul class="erros">${linhas.map(([a, t]) => `<li><b>${a}</b> ${t}</li>`).join('')}</ul>`;
const src = n => `Lista do aulão · Q${String(n).padStart(2, '0')}`;

/* ---------- Lista 1 · Eletricidade e energia ---------- */
const TOOLS_E1 = [
  ['Leis de Ohm', `U = R · i<br>R = ρ · ${f('L','A')}`],
  ['Potência e energia', `P = U · i = R · i² = ${f('U²','R')}<br>E = P · Δt (kWh: P em kW, Δt em h)`],
  ['Associação de resistores', `Série: R<sub>eq</sub> = R₁ + R₂ + …<br>Paralelo: ${f('1','R<sub>eq</sub>')} = ${f('1','R₁')} + ${f('1','R₂')} + …`],
  ['Transformador ideal', `${f('U₁','U₂')} = ${f('N₁','N₂')} = ${f('i₂','i₁')}`],
  ['Energia mecânica', `E<sub>p</sub> = m · g · h<br>P = ${f('ΔE','Δt')} &nbsp;·&nbsp; d = ${f('m','V')}`],
  ['Eletrostática', `F = k · ${f('|q₁| · |q₂|','d²')}<br>Esferas iguais em contato: Q′ = ${f('Q<sub>A</sub> + Q<sub>B</sub>','2')}`],
  ['Conversões', `1 mA = 10⁻³ A · 1 kΩ = 10³ Ω<br>1 MW = 10⁶ W · 30 min = 0,5 h`]
];

const Q_E1 = [
{ src: src(1), nivel: 'básico',
  text: `<p>Ao reformar o banheiro, uma família comprou um chuveiro elétrico cuja embalagem traz os dados abaixo. O eletricista explicou que o disjuntor do circuito deve ter corrente nominal imediatamente acima da maior corrente de operação do aparelho: um disjuntor abaixo desse valor desarma durante o banho, e um muito acima deixa de proteger a fiação contra superaquecimento.</p>
${tabela(['Dado do chuveiro','Valor'],[['Tensão','220 V'],['Potência na posição verão','4 400 W'],['Potência na posição inverno','6 600 W']])}
<p>Os disjuntores disponíveis na loja são de 16 A, 20 A, 25 A, 32 A e 40 A. Qual deles deve ser instalado?</p>`,
  opts: ['16 A','20 A','25 A','32 A','40 A'], ans: 3,
  hint: 'Em qual posição a corrente é maior? Calcule essa corrente com P = U · i.',
  steps: [['Maior corrente', '<p>A maior potência (6 600 W) é a da posição inverno: é nela que a corrente é máxima.</p>'],
          ['Cálculo', `<div class="eq">i = ${f('P','U')} = ${f('6 600','220')} = 30 A</div>`],
          ['Escolha', '<p>O disjuntor imediatamente acima de 30 A é o de <b>32 A</b>.</p>']],
  alt: 'Com a tensão fixa, corrente e potência são proporcionais: 4 400 W dão 20 A; 6 600 W (1,5 vez mais) dão 1,5 × 20 = 30 A.',
  warn: erros([['A) 16 A:','muito abaixo da corrente de operação; desarma em qualquer posição.'],['B) 20 A:','dimensiona pela posição verão (4 400/220 = 20 A).'],['C) 25 A:','abaixo de 30 A; desarma no inverno.'],['E) 40 A:','superdimensionado; não protege a fiação.']]) },

{ src: src(6), nivel: 'básico',
  text: '<p>Um LED vermelho funciona corretamente com tensão de 2,0 V e corrente de 20 mA. Para ligá-lo a uma bateria de 9,0 V, um estudante coloca um resistor em série com o LED, que fica com a parte da tensão que o LED não deve receber. Qual deve ser a resistência desse resistor?</p>',
  opts: ['100 Ω','350 Ω','450 Ω','550 Ω','3 500 Ω'], ans: 1,
  hint: 'Em série, a corrente é a mesma no LED e no resistor, e as tensões se somam. Que tensão sobra para o resistor?',
  steps: [['Tensão no resistor', '<div class="eq">U<sub>R</sub> = 9,0 − 2,0 = 7,0 V</div>'],
          ['Corrente', '<p>Em série, a corrente no resistor é a do LED: 20 mA = 0,020 A.</p>'],
          ['Resistência', `<div class="eq">R = ${f('U','i')} = ${f('7,0','0,020')} = 350 Ω</div>`]],
  alt: 'O resistor “segura” o excesso: a bateria fornece 9 V, o LED aceita 2 V e o resistor fica com os 7 V restantes, deixando passar só os 20 mA que o LED suporta.',
  warn: erros([['A) 100 Ω:','usa a tensão do LED (2,0/0,020).'],['C) 450 Ω:','usa a tensão total da bateria (9,0/0,020).'],['D) 550 Ω:','soma as tensões em vez de subtrair (11/0,020).'],['E) 3 500 Ω:','converte 20 mA para 0,002 A.']]) },

{ src: src(26), nivel: 'básico',
  text: '<p>Em um carregador antigo de celular, um transformador reduz a tensão alternada da tomada, de 220 V, para 5 V. O enrolamento primário tem 880 espiras. Considerando o transformador ideal, o número de espiras do enrolamento secundário é</p>',
  opts: ['20.','44.','176.','880.','38 720.'], ans: 0,
  hint: 'No transformador ideal, a razão entre as tensões é igual à razão entre os números de espiras.',
  steps: [['Relação', `<div class="eq">${f('U₁','U₂')} = ${f('N₁','N₂')} → ${f('220','5')} = ${f('880','N₂')}</div>`],
          ['Cálculo', `<div class="eq">N₂ = ${f('880 × 5','220')} = 20 espiras</div>`],
          ['Por que corrente alternada', '<p>O transformador só funciona com corrente alternada: a tensão no secundário é induzida pela <b>variação</b> do fluxo magnético (lei de Faraday).</p>']],
  alt: 'A tensão foi reduzida 44 vezes (220 ÷ 5). O número de espiras do secundário é 44 vezes menor que o do primário: 880 ÷ 44 = 20.',
  warn: erros([['B) 44:','dá a razão entre as tensões (220/5).'],['C) 176:','divide as espiras pela tensão de saída (880/5).'],['D) 880:','acha que o número de espiras não muda.'],['E) 38 720:','inverte a proporção (880 × 220/5).']]) },

{ src: src(2), nivel: 'intermediário',
  text: `<p>Ao receber uma conta de luz mais alta que o esperado, um estudante decidiu estimar o consumo dos principais aparelhos de casa. Ele anotou a potência de cada um e o tempo diário de funcionamento. No caso da geladeira, cujo compressor liga e desliga ao longo do dia, usou a potência média informada pelo fabricante.</p>
${tabela(['Aparelho','Potência','Uso diário'],[['Chuveiro','5 000 W','30 min'],['Geladeira (potência média)','150 W','24 h'],['Televisor','100 W','5 h'],['6 lâmpadas LED','10 W cada','5 h']])}
<p>Considere um mês de 30 dias e a tarifa de R$ 0,80 por kWh. O custo mensal estimado para esses aparelhos é</p>`,
  opts: ['R$ 5,52.','R$ 60,00.','R$ 79,20.','R$ 141,60.','R$ 165,60.'], ans: 4,
  hint: 'Calcule a energia de cada aparelho em kWh por dia (P em kW, tempo em horas). Cuidado: 30 min não é 0,3 h.',
  steps: [['Energia por dia', '<p>Chuveiro: 5,0 × 0,5 = 2,5 kWh · Geladeira: 0,15 × 24 = 3,6 kWh · Televisor: 0,1 × 5 = 0,5 kWh · Lâmpadas: 0,06 × 5 = 0,3 kWh</p>'],
          ['Total', '<p>Por dia: 6,9 kWh. No mês: 6,9 × 30 = 207 kWh.</p>'],
          ['Custo', '<div class="eq">207 × 0,80 = R$ 165,60</div>']],
  alt: 'A geladeira tem potência pequena, mas fica ligada 24 h: é o aparelho que mais gasta na tabela (3,6 kWh por dia, mais que o chuveiro). Potência baixa não significa consumo baixo; o que conta é P × tempo.',
  warn: erros([['A) R$ 5,52:','calcula o custo de um só dia.'],['B) R$ 60,00:','considera apenas o chuveiro.'],['C) R$ 79,20:','esquece a geladeira (ou acha que ela gasta pouco por ter potência baixa).'],['D) R$ 141,60:','converte 30 min em 0,3 h no chuveiro.']]) },

{ src: src(3), nivel: 'intermediário',
  text: `<p>A corrente elétrica que atravessa o corpo humano depende da tensão aplicada e da resistência elétrica do corpo, que diminui muito quando a pele está molhada. O quadro relaciona a intensidade da corrente aos danos físicos.</p>
${tabela(['Corrente elétrica','Dano físico'],[['Até 10 mA','Dor e contração muscular'],['De 10 mA até 20 mA','Aumento das contrações musculares'],['De 20 mA até 100 mA','Parada respiratória'],['De 100 mA até 3 A','Fibrilação ventricular'],['Acima de 3 A','Parada cardíaca e queimaduras']], true)}
<p class="small">DURAN, J. E. R. <i>Biofísica: fundamentos e aplicações</i>. São Paulo: Pearson Prentice Hall, 2003 (adaptado).</p>
<p>Um técnico, com as mãos molhadas, toca ao mesmo tempo os terminais extremos de um conjunto de baterias de 9 V associadas em série. Considere que, com a pele molhada, a resistência elétrica do corpo entre as mãos seja de 1 kΩ. Qual é o número mínimo de baterias para que o choque já possa provocar parada respiratória?</p>`,
  opts: ['1','2','3','11','12'], ans: 2,
  hint: 'Ache a tensão que produz 20 mA em 1 kΩ. Quantas baterias de 9 V em série são necessárias para chegar a ela?',
  steps: [['Limite', '<p>A parada respiratória começa em 20 mA = 0,020 A.</p>'],
          ['Tensão mínima', '<div class="eq">U = R · i = 1 000 × 0,020 = 20 V</div>'],
          ['Baterias', '<p>Em série, as tensões se somam: 2 baterias dão 18 V (não bastam); 3 baterias dão 27 V, que produzem 27 mA, já na faixa de parada respiratória. Resposta: <b>3</b>.</p>']],
  alt: 'Teste direto: com n baterias, a corrente é 9n/1 000 A, ou seja, 9n mA. Com n = 2, 18 mA (ainda contrações); com n = 3, 27 mA (parada respiratória).',
  warn: erros([['A) 1:','9 V geram 9 mA: só dor e contração.'],['B) 2:','arredonda 20/9 ≈ 2,2 para baixo (18 V não bastam).'],['D) 11:','usa o limite superior, 100 mA (100/9 ≈ 11).'],['E) 12:','usa 100 mA e arredonda para cima.']]) },

{ src: src(7), nivel: 'intermediário',
  text: '<p>A resistência de um chuveiro é um fio metálico enrolado em espiral, com três terminais. Na posição verão, a corrente percorre o fio inteiro, cuja resistência é 22 Ω. Na posição inverno, a corrente percorre apenas metade do comprimento do mesmo fio. O chuveiro é ligado em 220 V. Qual é a potência do chuveiro na posição inverno?</p>',
  opts: ['1 100 W','2 200 W','3 300 W','4 400 W','8 800 W'], ans: 3,
  hint: 'Metade do comprimento do fio dá que resistência? E, com a tensão fixa, qual fórmula de potência é a mais direta?',
  steps: [['Resistência', `<p>Pela segunda lei de Ohm, R = ρ · ${f('L','A')}: com metade do comprimento, R = 11 Ω.</p>`],
          ['Potência', `<div class="eq">P = ${f('U²','R')} = ${f('220²','11')} = 4 400 W</div>`],
          ['Conferência', '<p>No verão: 220²/22 = 2 200 W. Menor resistência, maior potência.</p>']],
  alt: 'Com U constante, P é inversamente proporcional a R: se R cai pela metade, P dobra (2 200 W → 4 400 W). Por isso o inverno usa o pedaço menor do fio.',
  warn: erros([['A) 1 100 W:','acha que P é proporcional a R (metade da potência).'],['B) 2 200 W:','calcula a potência da posição verão.'],['C) 3 300 W:','estima um aumento de 50% sem usar P = U²/R.'],['E) 8 800 W:','acha que P é proporcional a 1/R².']]) },

{ src: src(27), nivel: 'intermediário',
  text: '<p>Em uma usina hidrelétrica, 100 m³ de água passam pelas turbinas a cada segundo, depois de descer um desnível de 50 m. O conjunto turbina-gerador converte 80% da energia potencial gravitacional da água em energia elétrica. Considere a densidade da água igual a 1 000 kg/m³ e g = 10 m/s². A potência elétrica gerada é</p>',
  opts: ['40 MW.','50 MW.','62,5 MW.','400 MW.','500 MW.'], ans: 0,
  hint: 'Calcule a massa de água que desce a cada segundo e a energia potencial que ela perde nesse segundo. Depois aplique os 80%.',
  steps: [['Massa por segundo', '<p>100 m³ × 1 000 kg/m³ = 1,0 × 10⁵ kg a cada segundo.</p>'],
          ['Potência disponível', `<div class="eq">${f('m · g · h','Δt')} = 1,0 × 10⁵ × 10 × 50 = 5,0 × 10⁷ W = 50 MW</div>`],
          ['Potência elétrica', '<div class="eq">0,80 × 50 = 40 MW</div>']],
  alt: 'O rendimento sempre reduz: a potência elétrica tem de ser menor que os 50 MW disponíveis. Isso já elimina 50; 62,5; 400 e 500 MW.',
  warn: erros([['B) 50 MW:','ignora o rendimento.'],['C) 62,5 MW:','divide pelo rendimento em vez de multiplicar.'],['D) 400 MW:','converte W em MW com 1 MW = 10⁵ W.'],['E) 500 MW:','ignora o rendimento e erra a conversão para MW.']]) },

{ src: src(4), nivel: 'avançado',
  text: `<p>Para iluminar uma maquete, uma estudante montou o circuito da figura, ligado a uma fonte de 12 V de resistência interna desprezível.</p>
${foto('q04', 'Circuito: fonte de 12 V em série com R1 = 4 ohms; em seguida, R3 = 6 ohms e R2 = 12 ohms ligados em paralelo entre si.', 340)}
<p>A intensidade da corrente elétrica no resistor R₃ é</p>`,
  opts: ['0,5 A.','1,0 A.','1,5 A.','2,0 A.','3,0 A.'], ans: 1,
  hint: 'Resolva primeiro o paralelo entre R₂ e R₃ e some R₁. Com a corrente total, ache a tensão no paralelo.',
  steps: [['Paralelo', `<div class="eq">R₂₃ = ${f('12 · 6','12 + 6')} = 4 Ω</div>`],
          ['Corrente total', '<div class="eq">R<sub>eq</sub> = 4 + 4 = 8 Ω → i = 12/8 = 1,5 A</div>'],
          ['Tensão no paralelo', '<div class="eq">U = 4 × 1,5 = 6 V</div>'],
          ['Corrente em R₃', '<div class="eq">i₃ = 6/6 = 1,0 A</div><p>(e 0,5 A em R₂)</p>']],
  alt: 'No paralelo, a corrente se divide na razão inversa das resistências: R₃ (6 Ω) tem metade da resistência de R₂ (12 Ω), então leva o dobro da corrente. Os 1,5 A se dividem em 1,0 A e 0,5 A.',
  warn: erros([['A) 0,5 A:','corrente em R₂, e não em R₃.'],['C) 1,5 A:','corrente total do circuito.'],['D) 2,0 A:','aplica os 12 V inteiros sobre R₃ (12/6).'],['E) 3,0 A:','divide 12 V por R₁ (12/4).']]) },

{ src: src(5), nivel: 'avançado',
  text: `<p>Em uma aula de laboratório, alunos mediram a tensão e a corrente elétrica em dois componentes: um resistor comum e uma lâmpada de filamento, cuja resistência aumenta com a temperatura. Os resultados estão no gráfico, mas a turma esqueceu de anotar qual curva corresponde a cada componente.</p>
${foto('q05', 'Gráfico de tensão U, em volts, em função da corrente i, em ampères, de 0 a 0,3 A. A curva 1 é uma reta que parte da origem e chega a 9 V em 0,3 A. A curva 2 é curvada para cima e chega a 6 V em 0,3 A.', 380)}
<p>Qual curva corresponde ao componente ôhmico, e qual é a resistência elétrica da lâmpada quando submetida a 6 V?</p>`,
  opts: ['Curva 1; 20 Ω','Curva 1; 30 Ω','Curva 2; 20 Ω','Curva 2; 30 Ω','Curva 1; 1,8 Ω'], ans: 0,
  hint: 'Componente ôhmico tem U proporcional a i: no gráfico, uma reta pela origem. A lâmpada é a outra curva; leia nela o ponto de 6 V.',
  steps: [['Componente ôhmico', '<p>A curva 1 é uma reta pela origem: R constante = 6/0,2 = 30 Ω. É o resistor.</p>'],
          ['Lâmpada', '<p>A curva 2 é a lâmpada. Em U = 6 V, i = 0,3 A:</p><div class="eq">R = 6/0,3 = 20 Ω</div>'],
          ['Coerência', '<p>A resistência da lâmpada cresce com a corrente (10 Ω em 0,1 A; 15 Ω em 0,2 A), coerente com o aquecimento do filamento.</p>']],
  alt: 'Num gráfico U × i, a resistência em cada ponto é U/i: a inclinação da reta que liga a origem ao ponto. Na curva 2, essa inclinação aumenta conforme a corrente cresce.',
  warn: erros([['B) Curva 1; 30 Ω:','dá a resistência do resistor, não a da lâmpada.'],['C) Curva 2; 20 Ω:','acha que a curva é o comportamento ôhmico.'],['D) Curva 2; 30 Ω:','troca as duas curvas.'],['E) Curva 1; 1,8 Ω:','multiplica U · i (isso é a potência, 1,8 W).']]) },

{ src: src(29), nivel: 'avançado',
  text: '<p>Duas pequenas esferas metálicas idênticas, A e B, estão a uma distância d uma da outra, com cargas +6q e −2q, e se atraem com uma força de intensidade F. Usando luvas isolantes, um estudante coloca as esferas em contato e depois as recoloca nas posições iniciais. A nova força elétrica entre elas tem intensidade e natureza</p>',
  opts: ['3F, de repulsão.','F/3, de atração.','4F/3, de repulsão.','4F/3, de atração.','F/3, de repulsão.'], ans: 4,
  hint: 'No contato entre esferas idênticas, a carga total, com sinal, se divide igualmente. Depois compare o produto das cargas antes e depois.',
  steps: [['Contato', `<div class="eq">${f('(+6q) + (−2q)','2')} = +2q em cada esfera</div>`],
          ['Antes e depois', `<div class="eq">F = k · ${f('6q · 2q','d²')} = ${f('12kq²','d²')}</div><div class="eq">F′ = k · ${f('2q · 2q','d²')} = ${f('4kq²','d²')} = ${f('F','3')}</div>`],
          ['Natureza', '<p>As duas esferas ficam positivas: <b>repulsão</b>.</p>']],
  alt: 'A distância não muda, então só importa o produto das cargas: 6 × 2 = 12 antes e 2 × 2 = 4 depois. A força cai para 4/12 = 1/3 da original.',
  warn: erros([['A) 3F, de repulsão:','inverte a razão entre as forças.'],['B) F/3, de atração:','calcula a intensidade, mas esquece que os sinais mudaram.'],['C) 4F/3, de repulsão:','soma as cargas sem sinal: (6q + 2q)/2 = 4q em cada.'],['D) 4F/3, de atração:','soma sem sinal e mantém a atração.']]) }
];

/* ---------- Lista 2 · Calor, ondas e luz ---------- */
const TOOLS_E2 = [
  ['Calorimetria', `Q = m · c · ΔT<br>Q = m · L`],
  ['Rendimento e potência', `η = ${f('útil','total')} &nbsp;·&nbsp; P = ${f('Q','Δt')}<br>1 cal = 4,2 J`],
  ['Escalas', `${f('θ<sub>C</sub>','5')} = ${f('θ<sub>F</sub> − 32','9')} = ${f('T − 273','5')}`],
  ['Gases ideais', `p · V = n · R · T<br>${f('p₁V₁','T₁')} = ${f('p₂V₂','T₂')} (T em K)`],
  ['Máquina térmica', `Q₁ = W + Q₂ &nbsp;·&nbsp; η = ${f('W','Q₁')}<br>η<sub>Carnot</sub> = 1 − ${f('T<sub>fria</sub>','T<sub>quente</sub>')}`],
  ['Ondas', `v = λ · f &nbsp;·&nbsp; f<sub>n</sub> = ${f('n · v','2L')}<br>Luz: c = λ · f (c = 3,0 × 10⁸ m/s)`]
];

const Q_E2 = [
{ src: src(13), nivel: 'básico',
  text: `<p>Em uma feira de ciências, estudantes prenderam uma corda longa a um vibrador ajustado em 5,0 Hz. Uma foto da corda, tirada com uma régua ao fundo, permitiu montar o gráfico do perfil da onda em um instante.</p>
${foto('q13', 'Perfil da onda na corda: deslocamento y, em centímetros, entre −10 e 10, em função da posição x, de 0 a 1,6 m. Há cristas em x = 0,2 m e x = 1,0 m e vales em x = 0,6 m e x = 1,4 m.', 400)}
<p>A velocidade de propagação da onda na corda é</p>`,
  opts: ['0,16 m/s.','0,50 m/s.','2,0 m/s.','4,0 m/s.','8,0 m/s.'], ans: 3,
  hint: 'O comprimento de onda é a distância entre duas cristas consecutivas. Leia no eixo das posições.',
  steps: [['Comprimento de onda', '<p>Cristas consecutivas em x = 0,2 m e x = 1,0 m:</p><div class="eq">λ = 1,0 − 0,2 = 0,8 m</div>'],
          ['Velocidade', '<div class="eq">v = λ · f = 0,8 × 5,0 = 4,0 m/s</div>']],
  alt: 'Entre um zero e o seguinte há só meia onda (0,4 m). O gráfico mostra duas ondas completas em 1,6 m, o que confirma λ = 0,8 m.',
  warn: erros([['A) 0,16 m/s:','divide λ por f.'],['B) 0,50 m/s:','usa a amplitude (0,10 m) no lugar de λ.'],['C) 2,0 m/s:','lê λ como a distância entre dois zeros seguidos (0,4 m).'],['E) 8,0 m/s:','usa o trecho inteiro do gráfico (1,6 m) como λ.']]) },

{ src: src(14), nivel: 'básico',
  text: '<p>Fones de ouvido com cancelamento ativo de ruído têm microfones que captam sons constantes do ambiente, como o ronco das turbinas de um avião. Um circuito eletrônico analisa esse som e faz o alto-falante do fone emitir, além da música, uma onda sonora que reduz o ruído que chega ao ouvido. Com isso, a pessoa pode ouvir música em volume mais baixo e sente menos cansaço ao longo de um voo.</p><p>Para reduzir o ruído, a onda emitida pelo fone deve ter, em relação ao ruído,</p>',
  opts: ['frequência maior e mesma fase.','mesma frequência e mesma fase.','mesma frequência e fase oposta.','frequência menor e fase oposta.','qualquer frequência, desde que tenha maior amplitude.'], ans: 2,
  hint: 'Para que crista encontre vale o tempo todo, as duas ondas precisam “andar no mesmo ritmo”.',
  steps: [['Fenômeno', '<p>O cancelamento é uma <b>interferência destrutiva</b>: as cristas da onda emitida devem coincidir com os vales do ruído.</p>'],
          ['Condições', '<p>Isso exige a mesma frequência (para que a coincidência se mantenha) e oposição de fase: <b>mesma frequência e fase oposta</b>.</p>']],
  alt: 'Some o gráfico do ruído com o mesmo gráfico “de cabeça para baixo”: o resultado é uma linha reta, silêncio. Uma onda de frequência diferente não consegue ser esse espelho.',
  warn: erros([['A)','acha que um som “mais forte” ou mais agudo encobre o ruído.'],['B)','produz interferência construtiva: o ruído aumenta.'],['D)','com frequências diferentes, a oposição de fase não se mantém.'],['E)','confunde cancelamento com mascaramento do som.']]) },

{ src: src(16), nivel: 'básico',
  text: '<p>Quem está parado na calçada percebe que o som da sirene de uma ambulância fica mais agudo enquanto ela se aproxima e mais grave depois que ela passa, embora o motorista ouça sempre o mesmo som. Enquanto a ambulância se aproxima, o som parece mais agudo para o pedestre porque</p>',
  opts: ['a velocidade do som aumenta no sentido em que a ambulância se move.','a sirene emite frequências maiores enquanto o veículo acelera.','a amplitude da onda aumenta e, por isso, o som fica mais agudo.','o comprimento de onda que chega ao ouvido do pedestre aumenta.','a frequência percebida aumenta, e a emitida continua a mesma.'], ans: 4,
  hint: 'O motorista ouve sempre o mesmo som. O que muda, então: o som emitido ou o som percebido?',
  steps: [['Efeito Doppler', '<p>Com a fonte se aproximando, as frentes de onda ficam mais próximas à frente dela.</p>'],
          ['Consequência', '<p>O comprimento de onda percebido diminui e a <b>frequência percebida aumenta</b>: som mais agudo. A frequência emitida e a velocidade do som no ar não mudam.</p>']],
  alt: 'A ambulância “persegue” as próprias ondas: cada nova crista é emitida mais perto da anterior. Crista mais perto de crista significa λ menor e som mais agudo.',
  warn: erros([['A)','a velocidade do som depende do meio, não da fonte.'],['B)','a sirene emite sempre a mesma frequência (o motorista não percebe mudança).'],['C)','amplitude se relaciona à intensidade (volume), não à altura.'],['D)','o comprimento de onda percebido diminui, não aumenta.']]) },

{ src: src(8), nivel: 'intermediário',
  text: `<p>Em uma aula experimental de calorimetria, um professor queimou completamente 2,0 g de amendoim para aquecer 200 g de água, em um recipiente que reduz as perdas de calor. A embalagem do amendoim traz a informação nutricional abaixo.</p>
${tabela(['Porção','Valor energético'],[['20 g','120 kcal']])}
<p>Ao medir a temperatura da água no fim do experimento, ele concluiu que apenas 40% da energia do alimento foi aproveitada no aquecimento. O calor específico da água é 1 cal/(g·°C), e sua temperatura inicial era 20 °C. Qual foi a temperatura final da água?</p>`,
  opts: ['24 °C','44 °C','56 °C','60 °C','80 °C'], ans: 1,
  hint: 'Descubra a energia de 2,0 g de amendoim em calorias, aplique os 40% e use Q = m · c · ΔT. A pergunta é a temperatura final, não a variação.',
  steps: [['Energia do amendoim', '<p>120 kcal/20 g = 6 kcal/g. Em 2,0 g: 12 kcal = 12 000 cal.</p>'],
          ['Energia aproveitada', '<div class="eq">0,40 × 12 000 = 4 800 cal</div>'],
          ['Aquecimento', '<div class="eq">4 800 = 200 × 1 × ΔT → ΔT = 24 °C</div><p>Temperatura final: 20 + 24 = <b>44 °C</b>.</p>']],
  alt: 'Sem perdas, os 12 000 cal aqueceriam a água em 60 °C. Como só 40% foram aproveitados: 0,4 × 60 = 24 °C de aumento, de 20 °C para 44 °C.',
  warn: erros([['A) 24 °C:','responde a variação, não a temperatura final.'],['C) 56 °C:','usa os 60% perdidos no lugar dos 40% aproveitados.'],['D) 60 °C:','ignora o rendimento e dá só a variação.'],['E) 80 °C:','ignora o rendimento (100% aproveitado).']]) },

{ src: src(11), nivel: 'intermediário',
  text: '<p>Rótulos de aerossóis trazem o aviso: não perfure nem exponha ao calor. Considere uma lata fechada, de volume constante, com gás a 3,0 atm e 27 °C, deixada perto de uma churrasqueira, onde atinge 127 °C. Tratando o conteúdo como gás ideal, a pressão interna passa a ser</p>',
  opts: ['0,64 atm.','2,25 atm.','3,0 atm.','4,0 atm.','14 atm.'], ans: 3,
  hint: 'Com volume constante, p/T é constante, com T em kelvin.',
  steps: [['Temperaturas em kelvin', '<p>27 °C = 300 K e 127 °C = 400 K.</p>'],
          ['Lei dos gases', `<div class="eq">${f('p₁','T₁')} = ${f('p₂','T₂')} → p₂ = 3,0 × ${f('400','300')} = 4,0 atm</div>`]],
  alt: 'A temperatura absoluta aumentou 1/3 (de 300 K para 400 K); a pressão aumenta na mesma proporção: 3,0 + 1,0 = 4,0 atm.',
  warn: erros([['A) 0,64 atm:','usa Celsius e inverte a proporção (3 × 27/127).'],['B) 2,25 atm:','inverte a proporção (3 × 300/400).'],['C) 3,0 atm:','acha que a pressão não muda com volume constante.'],['E) 14 atm:','usa temperaturas em Celsius (3 × 127/27).']]) },

{ src: src(15), nivel: 'intermediário',
  text: `<p>Em um instrumento de cordas, a parte vibrante de uma corda mede 50 cm e, tocada solta, emite a nota lá de 440 Hz no modo fundamental, ilustrado na figura. O músico então pressiona a corda contra o braço do instrumento, reduzindo o comprimento vibrante para 40 cm, sem alterar a tensão.</p>
${foto('q15', 'Corda vibrando no modo fundamental: um único ventre entre dois nós, nas extremidades, separados por L = 50 cm.', 380)}
<p>A nova frequência fundamental emitida pela corda é</p>`,
  opts: ['352 Hz.','440 Hz.','550 Hz.','687,5 Hz.','880 Hz.'], ans: 2,
  hint: 'Mesma corda e mesma tensão: a velocidade da onda não muda. No modo fundamental, λ = 2L.',
  steps: [['Velocidade na corda', '<div class="eq">λ = 2 × 0,50 = 1,0 m → v = 1,0 × 440 = 440 m/s</div>'],
          ['Novo comprimento de onda', '<div class="eq">λ′ = 2 × 0,40 = 0,80 m</div>'],
          ['Nova frequência', `<div class="eq">f′ = ${f('v','λ′')} = ${f('440','0,80')} = 550 Hz</div>`]],
  alt: 'Com v fixa, f é inversamente proporcional a L: f′ = 440 × 50/40 = 550 Hz. Corda mais curta, som mais agudo, como ao apertar uma casa do violão.',
  warn: erros([['A) 352 Hz:','acha que f é proporcional a L (440 × 40/50).'],['B) 440 Hz:','acha que a frequência depende só da corda, não do comprimento.'],['D) 687,5 Hz:','acha que f é proporcional a 1/L².'],['E) 880 Hz:','confunde com o segundo harmônico (dobro da frequência).']]) },

{ src: src(21), nivel: 'intermediário',
  text: `<p>Discos ópticos guardam dados em cavidades microscópicas, lidas por um laser. Quanto menores as cavidades, mais dados cabem na mesma área do disco. O fator limitante é o espalhamento da luz por difração, que se torna importante quando as cavidades têm dimensões da ordem do comprimento de onda do laser. Por isso, cada nova geração de disco passou a usar lasers de comprimento de onda menor.</p>
${tabela(['Tecnologia','Comprimento de onda do laser'],[['CD','780 nm'],['DVD','650 nm'],['Blu-ray','405 nm']])}
<p>Considere c = 3,0 × 10⁸ m/s. A tecnologia que permite armazenar mais dados na mesma área e a frequência aproximada de seu laser são</p>`,
  opts: ['CD; 3,8 × 10¹⁴ Hz.','DVD; 4,6 × 10¹⁴ Hz.','Blu-ray; 7,4 × 10¹⁴ Hz.','Blu-ray; 1,35 × 10⁻¹⁵ Hz.','CD; 7,4 × 10¹⁴ Hz.'], ans: 2,
  hint: 'Menor λ permite cavidades menores. Depois use c = λ · f, com λ em metros (1 nm = 10⁻⁹ m).',
  steps: [['Tecnologia', '<p>Menor comprimento de onda, cavidades menores, mais dados: <b>Blu-ray</b> (405 nm).</p>'],
          ['Frequência', `<div class="eq">f = ${f('c','λ')} = ${f('3,0 × 10⁸','405 × 10⁻⁹')} ≈ 7,4 × 10¹⁴ Hz</div>`]],
  alt: 'Frequência e comprimento de onda são inversamente proporcionais: o laser de menor λ tem, obrigatoriamente, a maior frequência. A alternativa E erra justamente ao associar a maior frequência ao CD, que tem o maior λ.',
  warn: erros([['A) CD; 3,8 × 10¹⁴ Hz:','acha que maior λ lê cavidades menores.'],['B) DVD; 4,6 × 10¹⁴ Hz:','escolhe a tecnologia intermediária.'],['D) Blu-ray; 1,35 × 10⁻¹⁵ Hz:','divide λ por c (inverte a fórmula).'],['E) CD; 7,4 × 10¹⁴ Hz:','calcula certo a frequência, mas associa ao disco errado.']]) },

{ src: src(9), nivel: 'avançado',
  text: '<p>Para preparar um chá, uma pessoa aquece em um forno de micro-ondas 400 g de água em uma caneca de vidro de 200 g. A caneca e a água estavam a 10 °C e chegaram a 60 °C após 2 min, com o forno funcionando a 1 000 W. Considere os calores específicos do vidro e da água iguais a 0,2 cal/(g·°C) e 1,0 cal/(g·°C), respectivamente, e 1 cal = 4,2 J. Que percentual da energia consumida pelo forno foi efetivamente usado no aquecimento?</p>',
  opts: ['18%','70%','77%','92%','130%'], ans: 2,
  hint: 'Some o calor recebido pela água e pela caneca, converta para joules e compare com a energia que o forno consumiu (P · Δt).',
  steps: [['Calor útil', '<p>Água: 400 × 1,0 × 50 = 20 000 cal · Caneca: 200 × 0,2 × 50 = 2 000 cal</p><div class="eq">Q = 22 000 cal = 92 400 J</div>'],
          ['Energia consumida', '<div class="eq">E = P · Δt = 1 000 × 120 = 120 000 J</div>'],
          ['Rendimento', `<div class="eq">${f('92 400','120 000')} = 0,77 = 77%</div>`]],
  alt: 'Rendimento nunca passa de 100%: um resultado como 130% denuncia a razão invertida. E calor e energia elétrica precisam estar na mesma unidade (J) antes da divisão.',
  warn: erros([['A) 18%:','não converte calorias em joules.'],['B) 70%:','esquece o calor absorvido pela caneca.'],['D) 92%:','usa ΔT = 60 °C (ignora a temperatura inicial).'],['E) 130%:','inverte a razão (total/útil).']]) },

{ src: src(10), nivel: 'avançado',
  text: `<p>Materiais de mudança de fase são usados em embalagens que mantêm refeições quentes: ao se solidificarem, liberam calor sem variar a temperatura. Para caracterizar um desses materiais, um laboratório aqueceu 200 g de uma amostra sólida, inicialmente a 20 °C, e registrou a temperatura em função do calor recebido.</p>
${foto('q10', 'Gráfico de temperatura, em graus Celsius, em função do calor recebido Q, em calorias. A temperatura sobe de 20 °C a 80 °C entre 0 e 2 400 cal, fica constante em 80 °C entre 2 400 e 6 400 cal e depois sobe até 100 °C em 8 400 cal.', 400)}
<p>O calor latente de fusão e o calor específico do material no estado sólido são, respectivamente,</p>`,
  opts: ['12 cal/g e 0,20 cal/(g·°C).','20 cal/g e 0,15 cal/(g·°C).','32 cal/g e 0,20 cal/(g·°C).','32 cal/g e 0,15 cal/(g·°C).','20 cal/g e 0,20 cal/(g·°C).'], ans: 4,
  hint: 'O patamar horizontal é a fusão: o calor recebido nele é m · L. O primeiro trecho inclinado é o sólido esquentando.',
  steps: [['Calor latente', '<p>Patamar a 80 °C, de 2 400 cal a 6 400 cal: Q = 4 000 cal.</p><div class="eq">L = 4 000/200 = 20 cal/g</div>'],
          ['Calor específico do sólido', '<p>De 20 °C a 80 °C (ΔT = 60 °C) com 2 400 cal:</p><div class="eq">2 400 = 200 × c × 60 → c = 0,20 cal/(g·°C)</div>']],
  alt: 'Em um gráfico T × Q, o calor de cada etapa é a “largura” do trecho no eixo Q, não o valor onde o trecho termina. O patamar vai de 2 400 a 6 400: largura de 4 000 cal.',
  warn: erros([['A) 12 cal/g e 0,20:','usa o trecho do sólido (2 400/200) como calor latente.'],['B) 20 cal/g e 0,15:','usa ΔT = 80 °C, lendo a temperatura a partir de zero.'],['C) 32 cal/g e 0,20:','usa 6 400 cal sem descontar o aquecimento do sólido.'],['D) 32 cal/g e 0,15:','comete os dois erros anteriores.']]) },

{ src: src(12), nivel: 'avançado',
  text: `<p>Em uma usina termelétrica, o vapor produzido na caldeira a 527 °C movimenta uma turbina ligada a um gerador. Ao sair da turbina, o vapor é condensado com água de um rio, a 27 °C, que volta mais quente ao leito, um impacto ambiental conhecido como poluição térmica. O esquema mostra o fluxo de energia a cada segundo.</p>
${foto('q12', 'Esquema: a caldeira, fonte quente a 527 °C, fornece Q1 = 1 000 MW à turbina; a turbina entrega W = 350 MW à rede elétrica e rejeita Q2, desconhecido, para o rio, fonte fria a 27 °C.', 360)}
<p>A potência térmica rejeitada para o rio e o rendimento máximo teórico (de Carnot) para essas temperaturas são, respectivamente,</p>`,
  opts: ['650 MW e 62,5%.','650 MW e 95%.','350 MW e 62,5%.','650 MW e 35%.','1 350 MW e 37,5%.'], ans: 0,
  hint: 'O calor rejeitado sai da conservação da energia. No rendimento de Carnot, as temperaturas têm de estar em kelvin.',
  steps: [['Calor rejeitado', '<div class="eq">Q₂ = Q₁ − W = 1 000 − 350 = 650 MW</div>'],
          ['Carnot', `<p>800 K e 300 K:</p><div class="eq">η = 1 − ${f('300','800')} = 0,625 = 62,5%</div>`],
          ['Coerência', '<p>O rendimento real (350/1 000 = 35%) fica abaixo do máximo teórico, como exige a segunda lei.</p>']],
  alt: 'Toda máquina térmica rejeita calor para a fonte fria. É esse calor (650 MW, quase o dobro da energia elétrica gerada) que esquenta o rio: a poluição térmica do enunciado.',
  warn: erros([['B) 650 MW e 95%:','usa Celsius no rendimento de Carnot (1 − 27/527).'],['C) 350 MW e 62,5%:','confunde o calor rejeitado com o trabalho útil.'],['D) 650 MW e 35%:','dá o rendimento real, não o máximo teórico.'],['E) 1 350 MW e 37,5%:','soma Q₁ e W e calcula T<sub>fria</sub>/T<sub>quente</sub>.']]) }
];

/* ---------- Lista 3 · Movimento, forças e óptica ---------- */
const TOOLS_E3 = [
  ['Movimento uniforme', `v<sub>m</sub> = ${f('Δs','Δt')} &nbsp;·&nbsp; s = s₀ + v · t`],
  ['Movimento uniformemente variado', `v = v₀ + a · t<br>s = s₀ + v₀ · t + ${f('a · t²','2')}<br>v² = v₀² + 2 · a · Δs`],
  ['Rotação e transmissão', `v = 2π · R · f<br>f₁ · N₁ = f₂ · N₂ (N = nº de dentes)`],
  ['Dinâmica', `F<sub>R</sub> = m · a &nbsp;·&nbsp; P = m · g<br>F<sub>at</sub> = μ · N &nbsp;·&nbsp; M = F · d`],
  ['Fluidos', `d = ${f('m','V')}<br>E = d<sub>líq</sub> · V<sub>imerso</sub> · g`],
  ['Óptica', `n₁ · sen θ₁ = n₂ · sen θ₂<br>V = ${f('1','f')} (f em metros)<br>Miopia: lente divergente`],
  ['Conversão', `km/h ÷ 3,6 = m/s`]
];

const Q_E3 = [
{ src: src(19), nivel: 'básico',
  text: `<p>Um professor lança uma esfera verticalmente para cima e a apanha de volta no ponto de lançamento. Desprezando a resistência do ar, ele pede aos alunos que analisem as grandezas cinemáticas no instante em que a esfera, já descendo, passa pela metade da altura máxima. Para isso, apresenta o quadro de possibilidades.</p>
${tabela(['Grandeza','Módulo','Sentido'],[['Velocidade (v)','nulo (v = 0) ou não nulo (v ≠ 0)','para cima ou para baixo'],['Aceleração (a)','nulo (a = 0) ou não nulo (a ≠ 0)','para cima ou para baixo']])}
<p>Grandezas com módulo nulo não têm sentido definido. A combinação correta para esse instante é</p>`,
  opts: ['v ≠ 0 para baixo e a ≠ 0 para baixo.','v ≠ 0 para baixo e a = 0.','v = 0 e a ≠ 0 para baixo, como no ponto mais alto.','v ≠ 0 para cima e a ≠ 0 para baixo.','v ≠ 0 para baixo e a ≠ 0 para cima.'], ans: 0,
  hint: 'Durante todo o voo, só uma força age sobre a esfera (sem resistência do ar). O que isso diz sobre a aceleração?',
  steps: [['Velocidade', '<p>Na descida, a esfera se move para baixo e ainda não parou: <b>v ≠ 0, para baixo</b>.</p>'],
          ['Aceleração', '<p>A aceleração é a da gravidade em todo o movimento: constante, <b>não nula e para baixo</b>.</p>']],
  alt: 'A aceleração é a mesma na subida, no ponto mais alto e na descida: g, para baixo. Só a velocidade muda de sentido.',
  warn: erros([['B)','acha que a aceleração é nula porque a gravidade “já agiu”.'],['C)','repete a resposta do ponto mais alto.'],['D)','usa o sentido do movimento de subida.'],['E)','acha que a aceleração se opõe à velocidade em qualquer caso.']]) },

{ src: src(22), nivel: 'básico',
  text: `<p>Um raio de luz monocromática passa do ar para um bloco de plástico transparente de índice de refração √2, incidindo com ângulo de 45° em relação à normal, como mostra a figura.</p>
${foto('q22', 'Raio de luz no ar incidindo na superfície de um bloco de plástico com índice de refração raiz de 2, formando 45 graus com a normal; o raio refratado está indicado com interrogação.', 300)}
<p>Considere o índice de refração do ar igual a 1, sen 45° = √2/2 e sen 30° = 1/2. O ângulo de refração, medido em relação à normal, é</p>`,
  opts: ['15°.','30°.','45°.','60°.','90°.'], ans: 1,
  hint: 'Use n₁ · sen θ₁ = n₂ · sen θ₂, com os dois ângulos medidos a partir da normal.',
  steps: [['Lei de Snell', '<div class="eq">1 × sen 45° = √2 × sen r</div>'],
          ['Cálculo', `<div class="eq">sen r = ${f('√2/2','√2')} = ${f('1','2')} → r = 30°</div>`],
          ['Coerência', '<p>Ao entrar no meio mais refringente, o raio se aproxima da normal (30° &lt; 45°).</p>']],
  alt: 'Antes da conta, dá para descartar 45° (o raio não desviaria) e também 60° e 90° (o raio se afastaria da normal ao entrar em um meio mais refringente).',
  warn: erros([['A) 15°:','responde o desvio (45° − 30°).'],['C) 45°:','acha que a luz não muda de direção.'],['D) 60°:','mede o ângulo em relação à superfície.'],['E) 90°:','inverte os índices (sen r = √2 × √2/2 = 1).']]) },

{ src: src(17), nivel: 'básico',
  text: '<p>Um ciclista vai de casa até um parque, a 12 km de distância, mantendo 24 km/h. Na volta, cansado e contra o vento, faz o mesmo trajeto a 12 km/h. A velocidade escalar média do ciclista no percurso de ida e volta foi</p>',
  opts: ['12 km/h.','16 km/h.','18 km/h.','24 km/h.','36 km/h.'], ans: 1,
  hint: 'Velocidade média é a distância total dividida pelo tempo total. Calcule o tempo de cada trecho.',
  steps: [['Tempos', '<p>Ida: 12/24 = 0,5 h · Volta: 12/12 = 1,0 h</p>'],
          ['Velocidade média', `<div class="eq">v<sub>m</sub> = ${f('24 km','1,5 h')} = 16 km/h</div>`]],
  alt: 'O ciclista passa o dobro do tempo no trecho lento, por isso a média fica mais perto de 12 do que de 24. A média aritmética (18 km/h) daria o mesmo peso aos dois trechos.',
  warn: erros([['A) 12 km/h:','usa só a velocidade da volta.'],['C) 18 km/h:','faz a média aritmética das velocidades.'],['D) 24 km/h:','usa só a velocidade da ida.'],['E) 36 km/h:','soma as velocidades.']]) },

{ src: src(23), nivel: 'intermediário',
  text: '<p>Ao fazer um exame de vista, uma estudante descobriu que enxerga bem objetos próximos, mas só vê com nitidez objetos até 50 cm de distância (seu ponto remoto). A lente corretiva deve formar, de um objeto muito distante, uma imagem virtual nesse ponto remoto. O defeito da estudante e a lente indicada na receita são</p>',
  opts: ['hipermetropia, corrigida com lente convergente de +2,0 di.','miopia, corrigida com lente convergente de +2,0 di.','hipermetropia, corrigida com lente divergente de −2,0 di.','miopia, corrigida com lente divergente de −0,5 di.','miopia, corrigida com lente divergente de −2,0 di.'], ans: 4,
  hint: 'Vê bem de perto e mal de longe: qual é o defeito? Depois, a lente deve ter o foco no ponto remoto, e a vergência usa f em metros.',
  steps: [['Defeito', '<p>Ponto remoto próximo do olho (50 cm) caracteriza a <b>miopia</b>.</p>'],
          ['Lente', '<p>Para um objeto no infinito, a imagem fica no foco: foco virtual a 50 cm, f = −0,50 m (lente divergente).</p>'],
          ['Vergência', `<div class="eq">V = ${f('1','f')} = ${f('1','−0,50')} = −2,0 di</div><p>É o “−2,00 graus” da receita.</p>`]],
  alt: 'Grau negativo na receita é sempre lente divergente, a marca da miopia. O número sai de 1 dividido pelo ponto remoto em metros: 1/0,5 = 2.',
  warn: erros([['A)','confunde o defeito e o tipo de lente.'],['B)','acerta o defeito, mas usa lente convergente.'],['C)','acerta a lente, mas troca o defeito.'],['D)','responde a distância focal (0,5 m) no lugar da vergência.']]) },

{ src: src(24), nivel: 'intermediário',
  text: `<p>Em um dia sem vento, um paraquedista salta de um avião e cai verticalmente até atingir uma velocidade limite. No instante t₁, ele abre o paraquedas, e sua velocidade de queda diminui até o instante t₂, a partir do qual passa a cair com uma nova velocidade constante, bem menor, que permite um pouso seguro. O gráfico representa a velocidade de queda ao longo do tempo.</p>
${foto('q24', 'Gráfico da velocidade de queda em função do tempo: a velocidade cresce e se estabiliza; em t1 cai rapidamente e, a partir de t2, fica constante em um valor bem menor.', 400)}
<p>Entre os instantes t₁ e t₂, a força de resistência do ar sobre o conjunto paraquedista + paraquedas é</p>`,
  opts: ['maior que o peso, com resultante para cima.','menor que o peso, com resultante para baixo.','igual ao peso, com resultante nula.','maior que o peso, com resultante para baixo.','menor que o peso, com resultante para cima.'], ans: 0,
  hint: 'Entre t₁ e t₂ o conjunto continua descendo, mas cada vez mais devagar. Para que lado aponta a aceleração?',
  steps: [['Aceleração', '<p>A velocidade de queda diminui: a aceleração aponta <b>para cima</b>.</p>'],
          ['Segunda lei de Newton', '<p>A resultante tem o sentido da aceleração. Resultante para cima: a resistência do ar é <b>maior que o peso</b>.</p>'],
          ['Comparação', '<p>Nos trechos de velocidade constante (velocidade limite), a resistência do ar se iguala ao peso e a resultante é nula.</p>']],
  alt: 'É como numa freada de carro: o carro ainda anda para a frente, mas a força resultante aponta para trás. Aqui, o paraquedista ainda desce, mas a resultante aponta para cima.',
  warn: erros([['B)','acha que, se ainda desce, a resultante aponta para baixo.'],['C)','confunde o trecho de frenagem com o de velocidade constante.'],['D)','associa a resultante ao sentido do movimento.'],['E)','combinação impossível: com resistência menor que o peso, a resultante seria para baixo.']]) },

{ src: src(25), nivel: 'intermediário',
  text: '<p>Um carro trafega a 72 km/h por uma pista horizontal quando o motorista freia bruscamente e as rodas travam. Nesse caso, a força que faz o carro parar é o atrito cinético entre os pneus e o asfalto. Com a pista seca, o coeficiente de atrito cinético é 0,8; com a pista molhada, cai para 0,4. Considere g = 10 m/s². Na pista molhada, a distância percorrida desde o travamento das rodas até a parada é</p>',
  opts: ['5,0 m.','25 m.','50 m.','100 m.','500 m.'], ans: 2,
  hint: 'A desaceleração causada pelo atrito é a = μ · g (a massa se cancela). Converta 72 km/h para m/s e use Torricelli.',
  steps: [['Desaceleração', '<div class="eq">F<sub>at</sub> = μ · m · g = m · a → a = μ · g = 0,4 × 10 = 4 m/s²</div>'],
          ['Velocidade inicial', '<p>72 km/h ÷ 3,6 = 20 m/s</p>'],
          ['Torricelli', '<div class="eq">0 = 20² − 2 × 4 × d → d = 400/8 = 50 m</div>']],
  alt: 'A distância de frenagem é inversamente proporcional a μ: com metade do atrito, o dobro da distância. Na pista seca seriam 25 m; na molhada, 50 m.',
  warn: erros([['A) 5,0 m:','calcula o tempo de frenagem (v₀/a = 5 s) e o toma por distância.'],['B) 25 m:','usa o coeficiente da pista seca.'],['D) 100 m:','esquece o fator 2 de Torricelli (v²/a).'],['E) 500 m:','usa a = μ, sem multiplicar por g.']]) },

{ src: src(30), nivel: 'intermediário',
  text: `<p>O carrinho de mão funciona como uma alavanca: o eixo da roda é o ponto de apoio, e a carga fica entre o apoio e as mãos de quem o empurra. Um pedreiro transporta areia; o peso total do carrinho com a carga é 600 N, aplicado a 0,40 m do eixo da roda, e ele segura os cabos a 1,20 m do eixo (distâncias horizontais), como mostra o esquema.</p>
${foto('q30', 'Carrinho de mão: o peso P = 600 N atua a 0,40 m do eixo da roda; a força F, vertical e para cima, é aplicada nos cabos a 1,20 m do eixo.', 380)}
<p>Para manter o carrinho em equilíbrio nessa posição, a força vertical que o pedreiro aplica nos cabos é</p>`,
  opts: ['150 N.','200 N.','300 N.','600 N.','1 800 N.'], ans: 1,
  hint: 'Calcule os momentos em relação ao eixo da roda: o momento do peso deve ser equilibrado pelo momento da força das mãos.',
  steps: [['Momentos', '<div class="eq">F × 1,20 = 600 × 0,40</div>'],
          ['Cálculo', '<div class="eq">F = 240/1,20 = 200 N</div>'],
          ['Interpretação', '<p>A roda sustenta os outros 400 N. Quanto mais perto da roda estiver a carga, menor o esforço.</p>']],
  alt: 'O braço das mãos (1,20 m) é 3 vezes o braço do peso (0,40 m), então a força nas mãos é 3 vezes menor que o peso: 600/3 = 200 N.',
  warn: erros([['A) 150 N:','soma as distâncias e usa 1,60 m como braço da força.'],['C) 300 N:','acha que o peso se divide igualmente entre a roda e as mãos.'],['D) 600 N:','acha que o pedreiro sustenta todo o peso.'],['E) 1 800 N:','inverte os braços de alavanca.']]) },

{ src: src(18), nivel: 'avançado',
  text: `<p>O gráfico mostra a velocidade de um carro desde o instante em que o motorista, atento, vê um obstáculo na pista até o carro parar. Durante o tempo de reação, o carro segue com velocidade constante; depois, freia com desaceleração constante.</p>
${foto('q18', 'Gráfico da velocidade, em m/s, em função do tempo, em segundos: 20 m/s constantes de 0 a 0,8 s; depois a velocidade cai em linha reta até zero em 4,8 s.', 400)}
<p>Suponha que, distraído com o celular, o motorista demore 1,0 s a mais para reagir e depois freie da mesma forma. Nessa situação, a distância total percorrida desde a visão do obstáculo até a parada seria</p>`,
  opts: ['16 m.','20 m.','36 m.','56 m.','76 m.'], ans: 4,
  hint: 'Distância é a área sob o gráfico v × t. Só o trecho de reação muda com a distração; a frenagem continua igual.',
  steps: [['Reação do distraído', '<div class="eq">20 × (0,8 + 1,0) = 36 m</div>'],
          ['Frenagem', `<p>Triângulo de 4,0 s de base:</p><div class="eq">${f('20 × 4,0','2')} = 40 m</div>`],
          ['Total', '<div class="eq">36 + 40 = 76 m</div><p>Contra 56 m do motorista atento.</p>']],
  alt: 'Atalho: o motorista atento percorre 16 + 40 = 56 m. Cada segundo a mais de reação, a 20 m/s, acrescenta 20 m: 56 + 20 = 76 m.',
  warn: erros([['A) 16 m:','dá só a distância de reação do motorista atento.'],['B) 20 m:','dá só o acréscimo causado pela distração.'],['C) 36 m:','dá só a distância de reação do distraído.'],['D) 56 m:','calcula a situação do motorista atento.']]) },

{ src: src(20), nivel: 'avançado',
  text: '<p>Em uma bicicleta, a coroa, ligada aos pedais, tem 48 dentes, e a catraca, presa à roda traseira, tem 16 dentes; as duas são ligadas pela corrente. Um ciclista pedala com frequência de 1 volta por segundo. A roda traseira tem raio de 0,35 m e gira em rotação uniforme junto com a catraca. Considere π = 3 e que a roda não desliza no chão. A velocidade da bicicleta é</p>',
  opts: ['0,7 m/s.','2,1 m/s.','3,15 m/s.','6,3 m/s.','12,6 m/s.'], ans: 3,
  hint: 'A corrente transmite o mesmo número de dentes por segundo na coroa e na catraca. A roda gira junto com a catraca.',
  steps: [['Catraca', '<div class="eq">f<sub>coroa</sub> · N<sub>coroa</sub> = f<sub>catraca</sub> · N<sub>catraca</sub> → f<sub>catraca</sub> = 1 × 48/16 = 3 Hz</div>'],
          ['Roda', '<p>A roda tem a mesma frequência da catraca: 3 Hz.</p>'],
          ['Velocidade', '<div class="eq">v = 2π · R · f = 2 × 3 × 0,35 × 3 = 6,3 m/s</div><p>Cerca de 23 km/h.</p>']],
  alt: 'Uma pedalada faz a roda dar 3 voltas (48/16). Cada volta avança uma circunferência: 2 × 3 × 0,35 = 2,1 m. Uma pedalada por segundo dá 3 × 2,1 = 6,3 m por segundo.',
  warn: erros([['A) 0,7 m/s:','inverte a relação de dentes (f = 1/3 Hz).'],['B) 2,1 m/s:','usa a frequência dos pedais (1 Hz) na roda.'],['C) 3,15 m/s:','esquece o fator 2 em v = 2πRf.'],['E) 12,6 m/s:','usa o diâmetro (0,70 m) como raio.']]) },

{ src: src(28), nivel: 'avançado',
  text: `<p>Um bloco maciço de madeira flutua em água, em equilíbrio, com 60% de sua altura submersa, como mostra a figura. Considere a densidade da água igual a 1,0 g/cm³.</p>
${foto('q28', 'Bloco de madeira flutuando na água com 60% da altura submersa.', 280)}
<p>Se o mesmo bloco for colocado em um óleo de densidade 0,80 g/cm³, a fração de sua altura que ficará submersa será</p>`,
  opts: ['40%.','48%.','60%.','75%.','80%.'], ans: 3,
  hint: 'No equilíbrio, peso = empuxo. Daí sai que a fração submersa é d<sub>bloco</sub>/d<sub>líquido</sub>.',
  steps: [['Equilíbrio', `<div class="eq">d<sub>bloco</sub> · V · g = d<sub>líq</sub> · V<sub>imerso</sub> · g → ${f('V<sub>imerso</sub>','V')} = ${f('d<sub>bloco</sub>','d<sub>líq</sub>')}</div>`],
          ['Densidade do bloco', '<p>Na água, 60% submerso: d<sub>bloco</sub> = 0,60 g/cm³.</p>'],
          ['No óleo', `<div class="eq">${f('0,60','0,80')} = 0,75 = 75%</div>`]],
  alt: 'Um líquido menos denso empurra menos por volume submerso: o bloco precisa afundar mais para gerar o mesmo empuxo (que continua igual ao peso). Por isso a resposta tem de ser maior que 60%.',
  warn: erros([['A) 40%:','dá a fração emersa na água.'],['B) 48%:','multiplica as densidades (0,60 × 0,80).'],['C) 60%:','acha que a fração submersa não depende do líquido.'],['E) 80%:','usa a densidade do óleo como fração submersa.']]) }
];

/* ===== Formulário do aulão (página de consulta) ===== */
const FORMULARIO = [
  ['Eletrodinâmica', [
    ['Leis de Ohm', `U = R · i &nbsp;;&nbsp; R = ρ · ${f('L','A')}`],
    ['Potência elétrica', `P = U · i = R · i² = ${f('U²','R')}`],
    ['Energia elétrica', `E = P · Δt <small>(kWh: P em kW, Δt em h)</small>`],
    ['Resistores em série e em paralelo', `R<sub>eq</sub> = R₁ + R₂ + … <br>${f('1','R<sub>eq</sub>')} = ${f('1','R₁')} + ${f('1','R₂')} + …`],
    ['Gerador real e geradores em série', `U = ε − r · i &nbsp;;&nbsp; ε<sub>eq</sub> = ε₁ + ε₂`]]],
  ['Magnetismo', [
    ['Transformador ideal', `${f('U₁','U₂')} = ${f('N₁','N₂')} = ${f('i₂','i₁')}<br><small>U₁ · i₁ = U₂ · i₂: i é inversamente proporcional a U e a N</small>`],
    ['Lei de Faraday e fluxo magnético', `ε = −N · ${f('ΔΦ','Δt')} &nbsp;;&nbsp; Φ = B · A · cos θ<br><small>N espiras; θ entre B e a normal</small>`]]],
  ['Termologia', [
    ['Calor sensível e latente', `Q = m · c · ΔT &nbsp;;&nbsp; Q = m · L`],
    ['Potência térmica e condução', `P = ${f('Q','Δt')} = ${f('k · A · ΔT','e')}<br><small>k: condutividade; e: espessura</small>`],
    ['Escalas termométricas', `${f('θ<sub>C</sub>','5')} = ${f('θ<sub>F</sub> − 32','9')} = ${f('T − 273','5')}`],
    ['Dilatação linear', `ΔL = L₀ · α · ΔT`],
    ['Gases ideais', `p · V = n · R · T &nbsp;;&nbsp; ${f('p₁V₁','T₁')} = ${f('p₂V₂','T₂')}<br><small>T em K; R = 0,082 atm·L/(mol·K) = 8,31 J/(mol·K)</small>`],
    ['Máquina térmica', `Q₁ = W + Q₂ &nbsp;;&nbsp; η = ${f('W','Q₁')}<br>η<sub>Carnot</sub> = 1 − ${f('T<sub>fria</sub>','T<sub>quente</sub>')}`]]],
  ['Ondulatória', [
    ['Equação fundamental e corda vibrante', `v = λ · f &nbsp;;&nbsp; f<sub>n</sub> = ${f('n · v','2L')}<br><small>harmônico n</small>`]]],
  ['Cinemática', [
    ['Velocidade média e movimento uniforme', `v<sub>m</sub> = ${f('Δs','Δt')} &nbsp;;&nbsp; s = s₀ + v · t`],
    ['Movimento uniformemente variado', `v = v₀ + a · t<br>s = s₀ + v₀ · t + ${f('a · t²','2')}<br>v² = v₀² + 2 · a · Δs`],
    ['Rotação uniforme e transmissão', `v = 2π · R · f &nbsp;;&nbsp; f₁N₁ = f₂N₂<br><small>N = nº de dentes</small>`]]],
  ['Dinâmica e energia', [
    ['Newton, peso e atrito', `F<sub>R</sub> = m · a &nbsp;;&nbsp; P = m · g<br>F<sub>at</sub> = μ · N`],
    ['Trabalho e potência', `τ = F · d · cos θ &nbsp;;&nbsp; P = ${f('ΔE','Δt')}`],
    ['Energias', `E<sub>c</sub> = ${f('m · v²','2')} &nbsp;;&nbsp; E<sub>p</sub> = m · g · h<br>E<sub>el</sub> = ${f('k · x²','2')} &nbsp;;&nbsp; E<sub>M</sub> = E<sub>c</sub> + E<sub>p</sub><br><small>sem atrito, a energia mecânica se conserva</small>`],
    ['Quantidade de movimento e impulso', `Q = m · v &nbsp;;&nbsp; I = F · Δt = ΔQ<br><small>sistema isolado: Q se conserva</small>`],
    ['Momento de uma força', `M = F · d<br><small>equilíbrio: soma dos momentos nula</small>`]]],
  ['Fluidos', [
    ['Pressão e densidade', `p = ${f('F','A')} &nbsp;;&nbsp; d = ${f('m','V')}`],
    ['Stevin e prensa hidráulica', `p = p₀ + d · g · h &nbsp;;&nbsp; ${f('F₁','A₁')} = ${f('F₂','A₂')}`],
    ['Empuxo', `E = d<sub>líq</sub> · V<sub>imerso</sub> · g`]]],
  ['Eletrostática', [
    ['Lei de Coulomb', `F = k · ${f('|q₁| · |q₂|','d²')}`],
    ['Esferas condutoras em contato', `Q′ = ${f('Q<sub>A</sub> + Q<sub>B</sub>','2')} &nbsp;;&nbsp; ${f('Q′<sub>A</sub>','R<sub>A</sub>')} = ${f('Q′<sub>B</sub>','R<sub>B</sub>')}<br><small>iguais: carga dividida igualmente; raios diferentes: carga proporcional ao raio</small>`]]],
  ['Óptica', [
    ['Luz e refração', `c = λ · f &nbsp;;&nbsp; n = ${f('c','v')}<br>n₁ · sen θ₁ = n₂ · sen θ₂<br><small>c = 3,0 × 10⁸ m/s</small>`],
    ['Lentes e espelhos', `${f('1','f')} = ${f('1','p')} + ${f('1','p′')} &nbsp;;&nbsp; A = ${f('i','o')} = −${f('p′','p')}<br><small>f &gt; 0: convergente ou côncavo; f &lt; 0: divergente ou convexo; p′ &lt; 0: imagem virtual</small>`],
    ['Vergência, o “grau”', `V = ${f('1','f')}<br><small>V em dioptrias, f em metros</small>`],
    ['Defeitos da visão', `Miopia (não vê bem de longe) → lente divergente<br>Hipermetropia e presbiopia (não vê bem de perto) → lente convergente<br>Astigmatismo → lente cilíndrica`]]],
  ['Gravitação e física moderna', [
    ['Gravitação universal', `F = G · ${f('M · m','d²')}<br><small>G = 6,7 × 10⁻¹¹ N·m²/kg²</small>`],
    ['Energia de um fóton', `E = h · f<br><small>h = 6,6 × 10⁻³⁴ J·s</small>`]]]
];
