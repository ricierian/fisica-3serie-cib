# Monta o index.html do app a partir dos arquivos desta pasta.
# Uso (na raiz do repositório):  python3 fonte/montar.py
# Ordem do script: data.js (ajudantes: f, L, plot, fig, sen, tabela) → enem.js → inducao.js → engine_app.js (SITE, CONFIG e motor).
import os
B=os.path.dirname(os.path.abspath(__file__))+'/'
head=open(B+'head.html',encoding='utf-8').read().replace('<title>Lista de Cinemática 9º Ano</title>','''<title>Terceirão · Física CIB</title>
<link rel="manifest" href="manifest.webmanifest">
<meta name="theme-color" content="#123E8C">
<meta name="description" content="Aulão de Física e listas interativas para a reta final do ENEM, 3ª série do Colégio Israelita Brasileiro.">
<link rel="icon" type="image/png" href="icons/favicon.png">
<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Terceirão">
<meta name="apple-mobile-web-app-status-bar-style" content="default">''')
extra=open(B+'extra.css',encoding='utf-8').read()+'''
.install{border-color:var(--sign)}
.install p{margin:0}
@media (display-mode: standalone){.wrap{padding-top:max(20px,env(safe-area-inset-top,0px))}}
'''
js='\n'.join(open(B+n,encoding='utf-8').read() for n in ['data.js','enem.js','inducao.js','engine_app.js'])
body='''<div class="wrap">
<header class="plate"><div class="plate-deco" id="deco" aria-hidden="true"></div><div class="plate-inner"><div class="eyebrow" id="eyebrow"></div><h1 id="ptitle"></h1><p id="psub"></p></div></header>
<nav class="crumbs" id="crumbs" aria-label="Você está em" hidden></nav>
<main id="view" style="display:flex;flex-direction:column;gap:18px"></main>
</div>
'''
doc=head+extra+'\n</style>\n</head>\n<body>\n'+body+'<script>\n'+js+'\n</script>\n</body>\n</html>\n'
open(B+'../index.html','w',encoding='utf-8').write(doc)
print(len(doc))
