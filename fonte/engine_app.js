/* ===== Estrutura do site: temas e listas. Para adicionar material, inclua um item em "listas" ou um novo tema. ===== */
/* Capelo (ícone da revisão para o vestibular) */
const CAPELO = '<svg viewBox="0 0 40 40" width="30" height="30" aria-hidden="true"><path d="M2 15 L20 7 L38 15 L20 23 Z" fill="currentColor"/><path d="M10 19 V28 Q20 34 30 28 V19 L20 23 Z" fill="currentColor"/><path d="M34 16.5 V27" stroke="currentColor" stroke-width="2"/><circle cx="34" cy="28.5" r="2.2" fill="currentColor"/></svg>';
const SITE = {
  escola: 'Colégio Israelita Brasileiro',
  turma: '3ª série',
  apelido: 'Terceirão',
  turmas: 'Turmas 301 e 302',
  prof: 'Prof. Ricieri',
  temas: [
    {
      id: 'enem', ico: CAPELO, nome: 'Revisão ENEM', cls: 'th-enem', estilo: 'estrada', deco: 'conquista',
      resumo: 'As 30 questões do aulão de Física, divididas em três listas por área.',
      listas: [
        { id: 'eletricidade', key: 'cib3-enem-eletricidade-v1', num: 1,
          titulo: 'Eletricidade e energia',
          resumo: 'Disjuntor, conta de luz, choque, circuitos, LED, chuveiro, transformador, hidrelétrica e cargas elétricas.',
          intro: 'São as questões 1 a 7, 26, 27 e 29 da lista impressa do aulão, em ordem de dificuldade.',
          cls: 'th-eletr', estilo: 'circuito', deco: 'circuito',
          tools: TOOLS_E1, Q: Q_E1 },
        { id: 'calor-ondas', key: 'cib3-enem-calor-ondas-v1', num: 2,
          titulo: 'Calor, ondas e luz',
          resumo: 'Calorimetria, mudança de fase, gases, máquinas térmicas, ondas, som e luz.',
          intro: 'São as questões 8 a 16 e 21 da lista impressa do aulão, em ordem de dificuldade.',
          cls: 'th-calor', estilo: 'espectro', deco: 'calor',
          tools: TOOLS_E2, Q: Q_E2 },
        { id: 'mecanica-optica', key: 'cib3-enem-mecanica-optica-v1', num: 3,
          titulo: 'Movimento, forças e óptica',
          resumo: 'Velocidade média, gráficos, lançamento vertical, transmissão, Newton, atrito, empuxo, alavancas, refração e visão.',
          intro: 'São as questões 17 a 20, 22 a 25, 28 e 30 da lista impressa do aulão, em ordem de dificuldade.',
          cls: 'th-mec', estilo: 'bloco', deco: 'forcas',
          tools: TOOLS_E3, Q: Q_E3 }
      ]
    },
    {
      id: 'inducao', ico: 'Φ', nome: 'Indução eletromagnética', cls: 'th-inducao', estilo: 'onda', deco: 'bobina',
      resumo: 'Fluxo magnético, leis de Faraday e de Lenz, fem de movimento, geradores e transformadores.',
      listas: [
        { id: 'basica', key: 'cib3-inducao-basica-v1', num: 1,
          titulo: 'Nível básico',
          resumo: '6 questões básicas e 4 que já puxam para o intermediário (Básico+).',
          intro: 'Comece por aqui se indução ainda não está firme.',
          tools: TOOLS_INDUCAO, Q: Q_INDUCAO_1 },
        { id: 'intermediaria', key: 'cib3-inducao-intermediaria-v1', num: 2,
          titulo: 'Nível intermediário',
          resumo: '6 questões originais e 4 baseadas em questões do ENEM (2011, 2014, 2017 e 2020).',
          intro: 'As 4 últimas foram montadas a partir de questões reais do ENEM, com outro contexto e outros números.',
          tools: TOOLS_INDUCAO_2, Q: Q_INDUCAO_2 }
      ]
    }
  ]
};

/* ===== Configuração do registro (preencher ao publicar) ===== */
const CONFIG = {
  dominio: 'aluno.colegioisraelita.com.br',      // domínio do e-mail dos alunos do CIB. Vazio = não pede identificação
  registro: 'https://script.google.com/macros/s/AKfycbwTG-rFw_zA0tQj6VHZEyR_8VYo2joanKTmgIv-1mtiSsamOYmVOcThbu5c_AG3NiZDUg/exec',     // URL do App da Web do Google Apps Script
  turmas: ['301', '302']
};
const $ = id => document.getElementById(id);
const ID_KEY = 'fis3cib-aluno', FILA_KEY = 'fis3cib-fila', DIA_KEY = 'fis3cib-ultimo-acesso';
const getAluno = () => { try { const a = JSON.parse(localStorage.getItem(ID_KEY) || 'null'); return a && a.email ? a : null; } catch(e){ return null; } };
const setAluno = a => { try { if (a) localStorage.setItem(ID_KEY, JSON.stringify(a)); else localStorage.removeItem(ID_KEY); } catch(e){} };
const precisaLogin = () => !!CONFIG.dominio && !getAluno();
function emailValido(e){ const d = CONFIG.dominio.toLowerCase().replace(/^@/, ''); return new RegExp('^[a-z0-9._%+-]+@' + d.replace(/[.]/g, '\\.') + '$').test(e); }
function enviar(ev){
  const a = getAluno(); if (!CONFIG.registro || !a) return;
  const item = Object.assign({ email: a.email, turma: a.turma, quando: new Date().toISOString(), dispositivo: /mobi|android|iphone|ipad/i.test(navigator.userAgent) ? 'celular/tablet' : 'computador' }, ev);
  let fila = []; try { fila = JSON.parse(localStorage.getItem(FILA_KEY) || '[]'); } catch(e){}
  fila.push(item); try { localStorage.setItem(FILA_KEY, JSON.stringify(fila.slice(-60))); } catch(e){}
  enviarFila();
}
let enviando = false;
async function enviarFila(){
  if (!CONFIG.registro || enviando || navigator.onLine === false) return;
  enviando = true;
  try {
    let fila = []; try { fila = JSON.parse(localStorage.getItem(FILA_KEY) || '[]'); } catch(e){}
    while (fila.length){
      await fetch(CONFIG.registro, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(fila[0]) });
      fila.shift(); try { localStorage.setItem(FILA_KEY, JSON.stringify(fila)); } catch(e){}
    }
  } catch(e){} finally { enviando = false; }
}
window.addEventListener('online', enviarFila);
function registrarAcessoDoDia(){
  const a = getAluno(); if (!CONFIG.registro || !a) return;
  const marca = a.email + '|' + new Date().toLocaleDateString('sv-SE');
  let ult = null; try { ult = localStorage.getItem(DIA_KEY); } catch(e){}
  if (ult !== marca){ enviar({ evento: 'acesso' }); try { localStorage.setItem(DIA_KEY, marca); } catch(e){} }
}
/* Tempo ativo: conta só com a lista aberta, a tela visível e o aluno interagindo (pausa após 3 min parado) */
let tMarca = null, tInter = Date.now();
['click','keydown','scroll','touchstart'].forEach(ev => window.addEventListener(ev, () => {
  const agora = Date.now();
  // Voltou depois de mais de 3 min parado: fecha a contagem anterior (só até 3 min após a última interação) antes de recomeçar
  if (LI && tMarca !== null && agora - tInter > 180000) contarTempo();
  if (LI && tMarca === null && document.visibilityState === 'visible') tMarca = agora;
  tInter = agora;
}, { passive: true }));
function contarTempo(){
  if (!LI || !st || tMarca === null) return;
  const fim = Math.min(Date.now(), tInter + 180000);
  if (fim > tMarca) st.tempo = (st.tempo || 0) + (fim - tMarca) / 1000;
  tMarca = Date.now() <= tInter + 180000 ? Date.now() : null;
  store(LI.key, st);
}
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden'){ contarTempo(); tMarca = null; } else if (LI){ tMarca = Date.now(); tInter = Date.now(); } });
const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
const toTop = () => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
const load = k => { try { const s = JSON.parse(localStorage.getItem(k) || 'null'); if (s && typeof s === 'object') return Object.assign({ answers:{}, hints:{}, cur:-1 }, s); } catch(e){} return { answers:{}, hints:{}, cur:-1 }; };
const store = (k, s) => { try { localStorage.setItem(k, JSON.stringify(s)); } catch(e){} };

let T = null, LI = null, st = null; // tema, lista e progresso atuais

function stats(l){ const s = load(l.key); let n = 0, c = 0; l.Q.forEach((q,i)=>{ const a = s.answers[i]; if (a !== undefined){ n++; if (a === q.ans) c++; } }); return { n, c, total: l.Q.length }; }

function plate(eyebrow, title, sub){
  $('eyebrow').textContent = eyebrow; $('ptitle').textContent = title; $('psub').textContent = sub;
  const r = document.documentElement;
  SITE.temas.forEach(t => { t.cls && r.classList.remove(t.cls); t.listas.forEach(l => l.cls && r.classList.remove(l.cls)); });
  r.classList.remove('th-home');
  const cls = (LI && LI.cls) || (T && T.cls);
  if (cls) r.classList.add(cls);
  if (!T) r.classList.add('th-home');
  $('deco').innerHTML = T ? decoTema((LI && LI.deco) || T.deco || T.estilo) : decoTema('capelo');
}
/* Enfeite do cabeçalho de cada tema */
function decoTema(e){
  if (e === 'capelo' || e === 'conquista'){
    const cap = `<g transform="translate(150 6) scale(1.3)"><path d="M2 15 L20 7 L38 15 L20 23 Z" fill="currentColor"/><path d="M10 19 V28 Q20 34 30 28 V19 L20 23 Z" fill="currentColor"/><path d="M34 16.5 V27" stroke="currentColor" stroke-width="2"/><circle cx="34" cy="28.5" r="2.2" fill="currentColor"/></g>`;
    if (e === 'capelo') return `<svg viewBox="0 0 220 80" aria-hidden="true">${cap}<path d="M150 70 h56" stroke="currentColor" stroke-width="2" opacity=".6"/></svg>`;
    return `<svg viewBox="0 0 220 80" aria-hidden="true"><path d="M4 78 L70 36 L96 52 L136 22 L216 78 Z" fill="currentColor" opacity=".35"/><path d="M136 22 V2" stroke="currentColor" stroke-width="2.5"/><path d="M137 2 L160 8 L137 14 Z" fill="currentColor"/><path d="M40 78 L52 68 L62 72 L74 60 L86 64 L100 54 L112 58 L124 40 L134 26" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="3 4"/></svg>`;
  }
  if (e === 'circuito'){
    return `<svg viewBox="0 0 220 80" aria-hidden="true"><path d="M40 20 H180 V60 H40 Z" fill="none" stroke="currentColor" stroke-width="2.5"/><rect x="30" y="30" width="20" height="20" fill="var(--sign)"/><path d="M30 34 H50 M34 46 H46" stroke="currentColor" stroke-width="3"/><path d="M90 60 l5 -8 l10 16 l10 -16 l10 16 l5 -8" fill="var(--sign)" stroke="currentColor" stroke-width="2.5"/><circle cx="180" cy="40" r="15" fill="var(--sign)" stroke="currentColor" stroke-width="2.5"/><path d="M172 36 q8 10 16 0" fill="none" stroke="currentColor" stroke-width="2"/><path d="M180 14 V6 M198 22 L204 16 M162 22 L156 16 M204 40 H212" stroke="currentColor" stroke-width="2.5"/></svg>`;
  }
  if (e === 'calor'){
    let d = 'M96 44'; for (let x = 96; x <= 218; x += 3) d += ` L${x} ${(44 - 12 * Math.sin(2 * Math.PI * (x - 96) / 30)).toFixed(1)}`;
    return `<svg viewBox="0 0 220 80" aria-hidden="true"><rect x="38" y="6" width="14" height="52" rx="7" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="45" cy="64" r="11" fill="currentColor"/><rect x="42" y="26" width="6" height="36" fill="currentColor"/><path d="M58 16 h8 M58 26 h8 M58 36 h8 M58 46 h8" stroke="currentColor" stroke-width="2"/><path d="${d}" fill="none" stroke="currentColor" stroke-width="3"/></svg>`;
  }
  if (e === 'forcas'){
    return `<svg viewBox="0 0 220 80" aria-hidden="true"><path d="M4 70 H110" stroke="currentColor" stroke-width="2.5"/><rect x="36" y="38" width="34" height="32" fill="currentColor" opacity=".55"/><path d="M70 54 H104 M98 48 L106 54 L98 60" fill="none" stroke="currentColor" stroke-width="3"/><path d="M36 54 H12 M18 48 L10 54 L18 60" fill="none" stroke="currentColor" stroke-width="2" opacity=".7"/><path d="M168 8 Q182 40 168 72 Q154 40 168 8 Z" fill="currentColor" opacity=".45"/><path d="M120 24 H168 L214 46 M120 56 H168 L214 34" fill="none" stroke="currentColor" stroke-width="2"/></svg>`;
  }
  if (e === 'enem'){
    return `<svg viewBox="0 0 220 80" aria-hidden="true"><path d="M8 74 L92 30 L132 30 L212 74 Z" fill="currentColor" opacity=".35"/><path d="M110 70 L110 62 M110 54 L110 47 M110 41 L110 36 M110 32 L110 30" stroke="currentColor" stroke-width="3"/><path d="M150 30 V2" stroke="currentColor" stroke-width="2.5"/><path d="M150 2 h22 v5 h-22 z M150 7 h22 v5 h-22 z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M150 2 h5.5 v5 h-5.5 z M161 2 h5.5 v5 h-5.5 z M155.5 7 h5.5 v5 h-5.5 z M166.5 7 h5.5 v5 h-5.5 z" fill="currentColor"/></svg>`;
  }
  if (e === 'bobina'){
    let esp = ''; for (let k = 0; k < 6; k++) esp += `<ellipse cx="${118 + k * 14}" cy="40" rx="7" ry="26" fill="none" stroke="currentColor" stroke-width="3"/>`;
    return `<svg viewBox="0 0 220 80" aria-hidden="true"><rect x="6" y="30" width="34" height="20" fill="currentColor" opacity=".55"/><rect x="40" y="30" width="34" height="20" fill="none" stroke="currentColor" stroke-width="2.5"/><text x="23" y="45" text-anchor="middle" font-size="14" font-weight="700" fill="var(--sign)">N</text><text x="57" y="45" text-anchor="middle" font-size="14" font-weight="700" fill="currentColor">S</text><path d="M80 40 H104" stroke="currentColor" stroke-width="2.5"/><path d="M98 34 L106 40 L98 46" fill="none" stroke="currentColor" stroke-width="2.5"/>${esp}</svg>`;
  }
  if (e === 'onda'){
    let d = 'M0 40'; for (let x = 0; x <= 220; x += 4) d += ` L${x} ${(40 - 14 * Math.sin(2 * Math.PI * x / 55)).toFixed(1)}`;
    return `<svg viewBox="0 0 220 80" aria-hidden="true"><path d="${d}" fill="none" stroke="currentColor" stroke-width="3"/><path d="${d}" transform="translate(0 22)" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".5"/></svg>`;
  }
  if (e === 'raio'){
    const cores = ['#FF5A4F','#FF9F40','#FFE24D','#55D17A','#4FA3FF','#8B6CFF'];
    return `<svg viewBox="0 0 220 80" aria-hidden="true"><line x1="0" y1="52" x2="104" y2="40" stroke="#FFFFFF" stroke-width="3"/><polygon points="96,70 128,14 160,70" fill="none" stroke="currentColor" stroke-width="2.5"/>${cores.map((c, i) => `<line x1="140" y1="44" x2="220" y2="${30 + i * 8}" stroke="${c}" stroke-width="2.5"/>`).join('')}</svg>`;
  }
  return '';
}
/* Trilha de progresso: estrada (carro), onda (corda) ou raio de luz */
function trilha(n){
  const e = (LI && LI.estilo) || (T && T.estilo) || 'estrada';
  if (e === 'bloco'){
    return `<div class="lane2 ln-bloco" id="lane" data-estilo="bloco">
      <svg class="ln-base" viewBox="0 0 1000 30" preserveAspectRatio="none" aria-hidden="true"><line x1="0" y1="24" x2="1000" y2="24"/></svg>
      <svg class="ln-fill" viewBox="0 0 1000 30" preserveAspectRatio="none" aria-hidden="true"><line x1="0" y1="24" x2="1000" y2="24"/></svg>
      <span class="ln-src" aria-hidden="true"></span><span class="ln-head" aria-hidden="true"></span></div>`;
  }
  if (e === 'circuito'){
    return `<div class="lane2 ln-circ" id="lane" data-estilo="circuito">
      <svg class="ln-base" viewBox="0 0 1000 30" preserveAspectRatio="none" aria-hidden="true"><line x1="0" y1="15" x2="1000" y2="15"/></svg>
      <svg class="ln-fill" viewBox="0 0 1000 30" preserveAspectRatio="none" aria-hidden="true"><line x1="0" y1="15" x2="1000" y2="15"/></svg>
      <span class="ln-src" aria-hidden="true"></span><span class="ln-head" aria-hidden="true"></span><span class="ln-lamp" aria-hidden="true"><i></i></span></div>`;
  }
  if (e === 'espectro'){
    let d = 'M0 15'; for (let x = 0; x <= 1000; x += 4) d += ` L${x} ${(15 - 10 * Math.sin(2 * Math.PI * x * (n + 4) * (1 + x / 1000) / 2000)).toFixed(2)}`;
    return `<div class="lane2 ln-onda ln-esp" id="lane" data-estilo="espectro">
      <svg class="ln-base" viewBox="0 0 1000 30" preserveAspectRatio="none" aria-hidden="true"><line x1="0" y1="15" x2="1000" y2="15"/></svg>
      <svg class="ln-fill" viewBox="0 0 1000 30" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="gEsp" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1000" y2="0"><stop offset="0" stop-color="#E5482F"/><stop offset=".3" stop-color="#FF9F40"/><stop offset=".5" stop-color="#FFE24D"/><stop offset=".65" stop-color="#55D17A"/><stop offset=".82" stop-color="#4FA3FF"/><stop offset="1" stop-color="#A57CFF"/></linearGradient></defs><path d="${d}"/></svg>
      <span class="ln-src" aria-hidden="true"></span><span class="ln-head" aria-hidden="true"></span></div>`;
  }
  if (e === 'onda'){
    let d = 'M0 15'; for (let x = 0; x <= 1000; x += 4) d += ` L${x} ${(15 - 10 * Math.sin(2 * Math.PI * x * n / 1000)).toFixed(2)}`;
    return `<div class="lane2 ln-onda" id="lane" data-estilo="onda">
      <svg class="ln-base" viewBox="0 0 1000 30" preserveAspectRatio="none" aria-hidden="true"><line x1="0" y1="15" x2="1000" y2="15"/></svg>
      <svg class="ln-fill" viewBox="0 0 1000 30" preserveAspectRatio="none" aria-hidden="true"><path d="${d}"/></svg>
      <span class="ln-src" aria-hidden="true"></span><span class="ln-head" aria-hidden="true"></span></div>`;
  }
  if (e === 'raio'){
    return `<div class="lane2 ln-raio" id="lane" data-estilo="raio">
      <svg class="ln-base" viewBox="0 0 1000 30" preserveAspectRatio="none" aria-hidden="true"><line x1="0" y1="15" x2="1000" y2="15"/></svg>
      <svg class="ln-fill" viewBox="0 0 1000 30" preserveAspectRatio="none" aria-hidden="true"><line x1="0" y1="15" x2="1000" y2="15"/></svg>
      <span class="ln-src" aria-hidden="true"></span><span class="ln-head" aria-hidden="true"></span></div>`;
  }
  return `<div class="lane" id="lane" data-estilo="estrada">
        <svg class="car" id="car" viewBox="0 0 34 20" aria-hidden="true">
          <path d="M3 13 L5 8 Q6 6 9 6 L21 6 Q23 6 25 8 L29 11 Q32 11.5 32 14 L32 15 L2 15 L2 14 Q2 13 3 13 Z" fill="var(--lane)"/>
          <path d="M8 8 L12 8 L12 11 L6.5 11 Z M14 8 L20 8 Q21.5 8 23 9.5 L24.5 11 L14 11 Z" fill="var(--road)"/>
          <circle cx="9" cy="15.5" r="3" fill="var(--road-ink)"/><circle cx="25" cy="15.5" r="3" fill="var(--road-ink)"/>
        </svg>
      </div>`;
}
function crumbs(items){
  const c = $('crumbs');
  if (!items){ c.hidden = true; c.innerHTML = ''; return; }
  c.hidden = false;
  c.innerHTML = items.map((it, i) => {
    const last = i === items.length - 1;
    return (i ? '<span class="sep">›</span>' : '') + (last ? `<span class="here">${it.label}</span>` : `<button data-nav="${it.nav}">${it.label}</button>`);
  }).join('');
}

/* ===== Nível 1: início da turma ===== */
function openHome(){
  contarTempo(); tMarca = null;
  T = LI = null;
  plate(`Física · ${SITE.escola}`, SITE.apelido, `${SITE.turma} · ${SITE.turmas.replace('Turmas ', '')} · ${SITE.prof}`);
  crumbs(null);
  $('view').innerHTML = `
    <section class="card intro">
      <p class="sect-label">Como usar</p>
      <p>Aqui ficam os materiais do aulão de Física e as listas para a reta final do ENEM. Escolha um tema e depois a lista. Cada lista mostra uma questão por vez, com dica e resolução detalhada logo depois de responder.</p>
    </section>
    <p class="sect-label">Material de consulta</p>
    <div class="cards">
      <button class="tile th-form" data-form="1">
        <span class="ico">ƒ</span>
        <span><span class="tt">Formulário do aulão</span><span class="ds">Todas as fórmulas da lista do aulão, organizadas por assunto, para consultar enquanto resolve.</span>
          <span class="meta"><span class="chip">${FORMULARIO.length} assuntos</span></span></span>
        <span class="go">→</span></button>
    </div>
    <p class="sect-label">Temas</p>
    <div class="cards">
      ${SITE.temas.map((t, i) => {
        const nl = t.listas.length;
        return `<button class="tile ${t.cls || ''}" data-tema="${i}">
          <span class="ico">${t.ico}</span>
          <span><span class="tt">${t.nome}</span><span class="ds">${t.resumo}</span>
            <span class="meta"><span class="chip">${nl} ${nl === 1 ? 'lista' : 'listas'}</span></span></span>
          <span class="go">→</span></button>`;
      }).join('')}
    </div>
    <p class="note">Novas listas entram aqui até o ENEM.</p>
    <section class="card install" id="installCard" hidden></section>
    ${getAluno() ? `<p class="note">Entrou como <b>${getAluno().email}</b>${getAluno().turma ? ' · Turma ' + getAluno().turma : ''}. <button class="btn ghost" data-act="sair" style="padding:0">Não é você? Trocar</button></p>` : ''}`;
  showInstall();
  toTop();
}

/* ===== Nível 2: tema ===== */
function openTema(ti){
  contarTempo(); tMarca = null;
  T = SITE.temas[ti]; LI = null;
  plate(`Física · ${SITE.turma}`, T.nome, T.resumo);
  crumbs([{ label:'Início', nav:'home' }, { label:T.nome }]);
  $('view').innerHTML = `
    <p class="sect-label">Listas e práticas</p>
    <div class="cards">
      ${T.listas.map((l, i) => {
        const s = stats(l);
        const prog = s.n ? `<span class="chip ${s.n === s.total ? 'ok' : ''}">${s.n === s.total ? `Feita · ${s.c}/${s.total} certas` : `${s.n}/${s.total} respondidas`}</span>` : '';
        return `<button class="tile ${l.cls || ''}" data-lista="${i}">
          <span class="ico lane">L${l.num}</span>
          <span><span class="tt">Lista ${l.num} · ${l.titulo}</span><span class="ds">${l.resumo}</span>
            <span class="meta"><span class="chip">${s.total} questões</span><span class="chip">com resolução</span>${prog}</span></span>
          <span class="go">→</span></button>`;
      }).join('')}
    </div>`;
  toTop();
}

/* ===== Nível 3: lista interativa ===== */
function openLista(li){
  contarTempo();
  LI = T.listas[li]; st = load(LI.key); st.cur = -1; tMarca = Date.now(); tInter = Date.now();
  plate(`Física · ${SITE.turma} · ${T.nome}`, `Lista ${LI.num}`, LI.titulo);
  crumbs([{ label:'Início', nav:'home' }, { label:T.nome, nav:'tema' }, { label:`Lista ${LI.num}` }]);
  $('view').innerHTML = `
    <nav class="road" aria-label="Progresso nas questões">
      <div class="road-top"><span id="roadLabel"></span><span id="roadScore"></span></div>
      ${trilha(LI.Q.length)}
      <div class="marks" id="marks" style="grid-template-columns:repeat(${LI.Q.length},1fr)"></div>${levelRow()}
    </nav>
    <details class="tools">
      <summary><span>Caixa de ferramentas: fórmulas e conversões</span><span class="chev">›</span></summary>
      <div class="tools-grid">${LI.tools.map(([t,h])=>`<div class="tool"><h4>${t}</h4><div>${h}</div></div>`).join('')}</div>
    </details>
    <div id="qa"></div>`;
  renderRoad(); renderIntro(); toTop();
}


const lvKey = n => ({'básico':'b','básico+':'bp','intermediário':'i','avançado':'a'})[n] || 'b';
function levelGroups(){
  const g = [];
  LI.Q.forEach((q, i) => { if (!q.nivel) return; const last = g[g.length-1]; if (last && last.n === q.nivel && last.end === i) last.end = i + 1; else g.push({ n: q.nivel, start: i, end: i + 1 }); });
  return g;
}
function levelRow(){
  const g = levelGroups(); if (!g.length) return '';
  return `<div class="lvrow" style="grid-template-columns:repeat(${LI.Q.length},1fr)">${g.map(x => `<span class="lv-${lvKey(x.n)}" style="grid-column:${x.start+1} / ${x.end+1}">${x.n}</span>`).join('')}</div>`;
}
function levelSummary(){
  const g = levelGroups(); if (!g.length) return '';
  const c = {}; g.forEach(x => c[x.n] = (c[x.n] || 0) + (x.end - x.start));
  return `<div class="row" style="gap:6px">${Object.keys(c).map(n => `<span class="lvl lvl-${lvKey(n)}">${c[n]} ${n === 'básico' ? (c[n]>1?'básicas':'básica') : n === 'básico+' ? 'Básico+' : n === 'intermediário' ? (c[n]>1?'intermediárias':'intermediária') : (c[n]>1?'avançadas':'avançada')}</span>`).join('')}</div>`;
}
const save = () => store(LI.key, st);
function resumoLista(){
  const porNivel = n => { const idx = LI.Q.map((q,i) => i).filter(i => LI.Q[i].nivel === n); return idx.length ? idx.filter(i => status(i) === 'ok').length + '/' + idx.length : ''; };
  return {
    evento: 'lista concluída', tema: T.nome, lista: 'Lista ' + LI.num,
    acertos: correctCount(), total: LI.Q.length,
    basico: [porNivel('básico'), porNivel('básico+')].filter(Boolean).join(' + '), intermediario: porNivel('intermediário'), avancado: porNivel('avançado'),
    erradas: LI.Q.map((q,i) => i).filter(i => status(i) !== 'ok').map(i => i + 1).join(', '),
    dicas: Object.keys(st.hints || {}).filter(k => st.hints[k]).length,
    tempoMin: Math.round((st.tempo || 0) / 6) / 10
  };
}
function status(i){ const a = st.answers[i]; if (a === undefined) return 'none'; return a === LI.Q[i].ans ? 'ok' : 'bad'; }
function correctCount(){ return LI.Q.reduce((n,_,i)=> n + (status(i)==='ok'?1:0), 0); }
function answeredCount(){ return LI.Q.reduce((n,_,i)=> n + (status(i)!=='none'?1:0), 0); }

function renderRoad(){
  const Q = LI.Q;
  $('marks').innerHTML = Q.map((_,i)=>{
    const s = status(i);
    const cls = ['mk', s==='ok'?'ok':s==='bad'?'bad':'', st.cur===i?'cur':''].join(' ');
    const lab = s==='ok'?'certa':s==='bad'?'errada':'não respondida';
    return `<button class="${cls}" data-go="${i}" aria-label="Questão ${i+1}, ${lab}">${i+1}</button>`;
  }).join('');
  const pos = st.cur < 0 ? 0 : st.cur >= Q.length ? Q.length - 0.5 : st.cur + 0.5;
  const lane = $('lane'), pct = (pos/Q.length)*100;
  if (lane.dataset.estilo === 'estrada') $('car').style.left = `calc(${pct}% + ${st.cur<0?17:0}px)`;
  else { lane.style.setProperty('--p', pct.toFixed(2)); lane.querySelector('.ln-fill').style.clipPath = `inset(0 ${(100 - pct).toFixed(2)}% 0 0)`; }
  const n = answeredCount();
  $('roadLabel').textContent = st.cur>=0 && st.cur<Q.length ? `Questão ${st.cur+1} de ${Q.length}` : `Percurso: ${Q.length} questões`;
  $('roadScore').textContent = n ? `${correctCount()} de ${n} certas` : '';
}

function renderIntro(){
  const Q = LI.Q, n = answeredCount();
  $('qa').innerHTML = `
  <section class="card intro">
    <div class="qnum">Antes de começar</div>
    <p>São <b>${Q.length} questões</b> sobre ${LI.titulo.toLowerCase()}. ${LI.intro || ''}</p>${levelSummary()}
    <ul>
      <li>Responda uma questão por vez. Logo depois, aparece a <b>resolução detalhada</b>, passo a passo.</li>
      <li>Travou? Use o botão <b>Ver dica</b> antes de responder.</li>
      <li>A <b>caixa de ferramentas</b> acima tem as fórmulas e conversões que você vai usar.</li>
      <li>Tenha papel e lápis à mão e tente resolver antes de clicar na alternativa.</li>
    </ul>
    <div class="row">
      <button class="btn primary" id="startBtn">${n && n < Q.length ? 'Continuar de onde parei' : n === Q.length ? 'Ver meu resultado' : 'Começar a questão 1'}</button>
      ${n ? `<span class="small">${n} de ${Q.length} questões respondidas neste aparelho.</span>` : ''}
    </div>
  </section>`;
  $('startBtn').onclick = () => {
    if (n === Q.length) goQ(Q.length);
    else { const next = Q.findIndex((_,i)=>status(i)==='none'); goQ(next < 0 ? 0 : next); }
  };
}

function renderQuestion(i){
  const Q = LI.Q, q = Q[i], a = st.answers[i], done = a !== undefined, skipped = a === -1;
  const opts = q.opts.map((o,k)=>{
    let cls = 'opt', tag = '';
    if (done){
      if (k === q.ans){ cls += ' is-correct'; tag = '<span class="tag">✓ correta</span>'; }
      else if (k === a){ cls += ' is-wrong'; tag = '<span class="tag">✗ sua resposta</span>'; }
      else cls += ' is-dim';
    }
    return `<li><button class="${cls}" data-pick="${k}" ${done?'disabled':''}><span class="letter">${L[k]}</span><span>${o}</span>${tag}</button></li>`;
  }).join('');
  let fb = '';
  if (done){
    fb = a === q.ans
      ? `<div class="feedback good" role="status"><span class="ico">✓</span>Correto! Confira a resolução para ver se o seu raciocínio bate.</div>`
      : skipped
        ? `<div class="feedback bad" role="status"><span class="ico">→</span>Sem problema. Acompanhe a resolução com calma e tente refazer no papel.</div>`
        : `<div class="feedback bad" role="status"><span class="ico">✗</span>Não foi dessa vez. A resposta certa é a ${L[q.ans]}. Veja onde o raciocínio muda.</div>`;
  }
  const sol = done ? `
    <section class="sol" aria-label="Resolução detalhada">
      <h3>Resolução detalhada</h3>
      <ol class="steps">
        ${q.steps.map(([lab,html])=>`<li class="step"><div class="step-body"><div class="step-label">${lab}</div>${html}</div></li>`).join('')}
      </ol>
      <div class="answer"><span class="letter">${L[q.ans]}</span><span>Resposta: alternativa ${L[q.ans]} (${q.opts[q.ans]})</span></div>
      ${q.alt ? `<div class="alt"><b class="lbl">Outro jeito de pensar</b>${q.alt}</div>` : ''}
      ${q.warn ? `<div class="warn"><b class="lbl">Cuidado com a pegadinha</b>${q.warn}</div>` : ''}
    </section>` : '';
  const showHint = st.hints[i] && !done;
  const last = i === Q.length - 1;
  $('qa').innerHTML = `
  <article class="card">
    <div class="qhead">
      <div class="qnum">Questão ${i+1} <span>/ ${Q.length}</span></div>
      <span class="row" style="gap:6px">${q.nivel ? `<span class="lvl lvl-${lvKey(q.nivel)}">Nível ${q.nivel === 'básico+' ? 'Básico+' : q.nivel}</span>` : ''}<span class="src">${q.src}</span></span>
    </div>
    <div class="stmt">${q.text}</div>
    <ul class="opts">${opts}</ul>
    ${!done ? `<div class="row">
        ${showHint ? '' : `<button class="btn" id="hintBtn">Ver dica</button>`}
        <span class="spacer"></span>
        <button class="btn ghost" id="skipBtn">Não sei, mostrar a resolução</button>
      </div>` : ''}
    ${showHint ? `<div class="tip"><b>Dica</b>${q.hint}</div>` : ''}
    ${fb}
    ${sol}
    <div class="row">
      ${i > 0 ? `<button class="btn" id="prevBtn">← Anterior</button>` : ''}
      <span class="spacer"></span>
      ${done ? `<button class="btn primary" id="nextBtn">${last ? 'Ver meu resultado' : 'Próxima questão →'}</button>`
             : (!last ? `<button class="btn ghost" id="jumpBtn">Pular por enquanto</button>` : '')}
    </div>
  </article>`;
  $('qa').querySelectorAll('[data-pick]').forEach(b => b.onclick = () => answer(i, +b.dataset.pick));
  const h = $('hintBtn'); if (h) h.onclick = () => { st.hints[i] = true; save(); renderQuestion(i); };
  const s = $('skipBtn'); if (s) s.onclick = () => answer(i, -1);
  const p = $('prevBtn'); if (p) p.onclick = () => goQ(i - 1);
  const n = $('nextBtn'); if (n) n.onclick = () => goQ(i + 1);
  const j = $('jumpBtn'); if (j) j.onclick = () => goQ(i + 1);
}

function answer(i, k){
  if (st.answers[i] !== undefined) return;
  st.answers[i] = k; save();
  if (answeredCount() === LI.Q.length && !st.enviado){ contarTempo(); st.enviado = true; save(); enviar(resumoLista()); }
  renderRoad(); renderQuestion(i);
  const fb = $('qa').querySelector('.feedback');
  if (fb) fb.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}

function renderEnd(){
  const Q = LI.Q, c = correctCount(), n = answeredCount();
  const msg = n < Q.length
    ? `Você ainda tem ${Q.length - n} questão(ões) sem responder. Toque nelas abaixo para terminar.`
    : c >= Math.ceil(Q.length * 0.9) ? 'Excelente! Você domina este conteúdo. Releia as pegadinhas para chegar ao ENEM ainda mais seguro.'
    : c >= Math.ceil(Q.length * 0.6) ? 'Bom trabalho. Revise as questões que errou e leia com atenção as pegadinhas: é onde mais se perde ponto.'
    : 'Vale revisar a caixa de ferramentas e refazer as questões com calma, acompanhando cada passo da resolução, antes do ENEM.';
  $('qa').innerHTML = `
  <section class="card">
    <div class="qnum">Resultado</div>
    <div class="score">${c}<span> / ${Q.length}</span></div>
    <p style="margin:0">${msg}</p>
    <ul class="reslist">
      ${Q.map((q,i)=>{ const s = status(i); const t = s==='ok'?'✓ certa':s==='bad'?(st.answers[i]===-1?'→ vista':'✗ errada'):'— pendente';
        return `<li><button class="res ${s}" data-go="${i}"><b>Questão ${i+1}</b><span class="st">${t}</span></button></li>`; }).join('')}
    </ul>
    <div class="row">
      <button class="btn" id="resetBtn">Refazer a lista do zero</button>
      <button class="btn primary" data-nav="tema">Voltar para ${T.nome}</button>
      <span class="small" id="resetNote"></span>
    </div>
  </section>`;
  const r = $('resetBtn'); let armed = false;
  r.onclick = () => {
    if (!armed){ armed = true; r.textContent = 'Confirmar: apagar minhas respostas'; $('resetNote').textContent = 'Toque de novo para confirmar.'; return; }
    st = { answers:{}, hints:{}, cur:-1, tempo:0 }; save(); goQ(-1);
  };
}

function goQ(i){
  st.cur = i; save();
  renderRoad();
  if (i < 0) renderIntro();
  else if (i >= LI.Q.length) renderEnd();
  else renderQuestion(i);
  toTop();
}

/* ===== Formulário do aulão ===== */
function openFormulario(){
  contarTempo(); tMarca = null; T = LI = null;
  plate(`Física · ${SITE.turma} · Aulão`, 'Formulário', 'Todas as fórmulas da lista do aulão, por assunto.');
  document.documentElement.classList.add('th-form');
  crumbs([{ label:'Início', nav:'home' }, { label:'Formulário' }]);
  $('view').innerHTML = `
    <nav class="card formnav" aria-label="Assuntos do formulário"><p class="sect-label">Ir para</p><div class="row" style="gap:6px">${FORMULARIO.map(([sec], i) => `<a class="chip chip-link" href="#/formulario" data-sec="${i}">${sec}</a>`).join('')}</div></nav>
    ${FORMULARIO.map(([sec, itens], i) => `<section class="card formsec" id="sec${i}"><h2 class="formh">${sec}</h2><div class="tools-grid form-grid">${itens.map(([t, h]) => `<div class="tool"><h4>${t}</h4><div>${h}</div></div>`).join('')}</div></section>`).join('')}`;
  toTop();
}

/* ===== Navegação com endereço próprio (#/tema/lista) e botão Voltar do celular ===== */
function go(h){ if (location.hash === h) route(); else location.hash = h; }
function openLogin(){
  contarTempo(); tMarca = null; T = LI = null;
  plate(`Física · ${SITE.escola}`, SITE.apelido, `${SITE.turma} · ${SITE.turmas.replace('Turmas ', '')} · ${SITE.prof}`);
  crumbs(null);
  $('view').innerHTML = `
    <form class="card intro" id="loginForm" novalidate>
      <p class="sect-label">Identificação</p>
      <p>Para usar as listas, informe o seu <b>e-mail do colégio</b> e a sua turma. Você só faz isso uma vez neste aparelho.</p>
      <label class="fld"><span>E-mail do colégio <small class="fld-dica">(só a parte antes do @)</small></span>
        <span class="emailbox">
          <input id="loginEmail" type="text" inputmode="email" autocomplete="username" autocapitalize="none" autocorrect="off" spellcheck="false" placeholder="nome.sobrenome" required>
          <span class="dom" aria-hidden="true">@${CONFIG.dominio.replace('.', '.<wbr>')}</span>
        </span></label>
      <label class="fld"><span>Turma</span>
        <select id="loginTurma" required><option value="">Escolha</option>${CONFIG.turmas.map(t => `<option value="${t}">${t}</option>`).join('')}</select></label>
      <p class="small" id="loginErro" role="alert"></p>
      <div class="row"><button class="btn primary" type="submit">Entrar</button></div>
      <p class="note">O professor recebe o seu e-mail, a turma, a data de acesso e os resultados das listas (acertos, tempo e dicas usadas), só para acompanhar os estudos da turma.</p>
    </form>`;
  $('loginForm').onsubmit = e => {
    e.preventDefault();
    let usuario = $('loginEmail').value.trim().toLowerCase().replace(/\s+/g, '');
    const dom = '@' + CONFIG.dominio.toLowerCase().replace(/^@/, '');
    if (usuario.endsWith(dom)) usuario = usuario.slice(0, -dom.length);   // se digitou o e-mail inteiro, aproveita
    const email = usuario + dom, turma = $('loginTurma').value;
    if (!usuario){ $('loginErro').textContent = 'Escreva a parte do seu e-mail antes do @.'; $('loginEmail').focus(); return; }
    if (usuario.includes('@') || !emailValido(email)){ $('loginErro').textContent = `Escreva só a parte antes do @. O resto (${dom}) já está preenchido.`; $('loginEmail').focus(); return; }
    if (!turma){ $('loginErro').textContent = 'Escolha a sua turma.'; $('loginTurma').focus(); return; }
    setAluno({ email, turma }); registrarAcessoDoDia(); route();
  };
  toTop();
}
function route(){
  if (precisaLogin()){ openLogin(); return; }
  registrarAcessoDoDia(); enviarFila();
  const p = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  document.documentElement.classList.remove('th-form');
  if (p[0] === 'formulario'){ openFormulario(); return; }
  const ti = SITE.temas.findIndex(t => t.id === p[0]);
  if (ti < 0){ openHome(); return; }
  if (!p[1]){ openTema(ti); return; }
  const li = SITE.temas[ti].listas.findIndex(l => l.id === p[1]);
  if (li < 0){ openTema(ti); return; }
  T = SITE.temas[ti]; openLista(li);
}
window.addEventListener('hashchange', route);
document.addEventListener('click', e => {
  const fm = e.target.closest('[data-form]'); if (fm){ go('#/formulario'); return; }
  const sc = e.target.closest('[data-sec]'); if (sc){ e.preventDefault(); const el = $('sec' + sc.dataset.sec); if (el) el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); return; }
  const act = e.target.closest('[data-act="sair"]'); if (act){ setAluno(null); try { localStorage.removeItem(DIA_KEY); } catch(err){} go('#/'); route(); return; }
  const nav = e.target.closest('[data-nav]');
  if (nav){ go(nav.dataset.nav === 'tema' && T ? '#/' + T.id : '#/'); return; }
  const t = e.target.closest('[data-tema]'); if (t){ go('#/' + SITE.temas[+t.dataset.tema].id); return; }
  const l = e.target.closest('[data-lista]'); if (l){ go('#/' + T.id + '/' + T.listas[+l.dataset.lista].id); return; }
  const g = e.target.closest('[data-go]'); if (g && LI){ goQ(+g.dataset.go); }
});

/* ===== Instalação como aplicativo ===== */
let installEvt = null;
const standalone = () => (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true;
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); installEvt = e; showInstall(); });
window.addEventListener('appinstalled', () => { installEvt = null; const c = $('installCard'); if (c) c.hidden = true; });
function showInstall(){
  const c = $('installCard'); if (!c || standalone()) return;
  if (installEvt){
    c.hidden = false;
    c.innerHTML = `<p class="sect-label">Instale no celular</p><p>Tenha as listas como um aplicativo: ícone na tela inicial e funcionando mesmo sem internet.</p><div class="row"><button class="btn primary" id="instBtn">Instalar o app</button></div>`;
    $('instBtn').onclick = async () => { installEvt.prompt(); try { await installEvt.userChoice; } catch(e){} installEvt = null; c.hidden = true; };
  } else if (isIOS){
    c.hidden = false;
    c.innerHTML = `<p class="sect-label">Instale no iPhone</p><p>No Safari, toque em <b>Compartilhar</b> (o quadrado com a seta para cima) e depois em <b>Adicionar à Tela de Início</b>.</p>`;
  }
}

if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('sw.js').catch(() => {});
route();
