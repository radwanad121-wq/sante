/* Medical site engine by Redone. Informational layout: no ratings, no testimonials. */
(function () {
  const S = window.SITE, T = S.theme, root = document.documentElement;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce) root.classList.add("motion");

  /* fonts + meta */
  const head = document.head;
  head.insertAdjacentHTML("beforeend",
    `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
     <link rel="stylesheet" href="https://fonts.googleapis.com/css2?${T.fonts}&display=swap">
     <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>${S.emoji || "★"}</text></svg>">`);

  const hd = T.heroDark !== false;
  const css = `
:root{--dark:${T.dark};--deep:${T.deep || T.dark};--brand:${T.brand};--accent:${T.accent};--bg:${T.bg};--surface:${T.surface};--ink:${T.ink};--muted:${T.muted};--line:${T.line};
--hero-ink:${hd ? "#fff" : T.ink};--hero-muted:${hd ? "rgba(255,255,255,.72)" : T.muted};--on-accent:${T.onAccent || "#111"};
--fd:${T.fd};--fb:${T.fb};box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
*,*::before,*::after{box-sizing:inherit}
html{scroll-behavior:smooth;scroll-padding-top:84px}
body{margin:0;background:var(--bg);color:var(--ink);font:400 17px/1.65 var(--fb);overflow-x:hidden;-webkit-font-smoothing:antialiased}
h1,h2,h3{font-family:var(--fd);margin:0;line-height:1.02;letter-spacing:${T.track || "-.015em"};font-weight:${T.fw || 700}}
a{color:inherit}
:focus-visible{outline:3px solid var(--accent);outline-offset:3px;border-radius:4px}
.wrap{max-width:1200px;margin:0 auto;padding:0 24px}
.motion .rv{opacity:0;transform:translateY(44px)}
.motion .split{visibility:hidden}
.w{display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.08em}.w>span{display:inline-block}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
header{position:fixed;inset:0 0 auto;z-index:50;padding-top:env(safe-area-inset-top,0px);transition:background .35s,box-shadow .35s}
header.solid{background:color-mix(in srgb,var(--deep) 88%,transparent);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}
${hd ? "" : "header:not(.solid) .bar{color:var(--ink)}"}
.bar{height:80px;display:flex;align-items:center;justify-content:space-between;gap:16px;color:#fff}
.logo{display:flex;align-items:center;gap:12px;text-decoration:none;font-family:var(--fd);font-weight:700;font-size:21px}
.logo i{width:38px;height:38px;border-radius:12px;background:var(--accent);color:var(--on-accent);display:grid;place-items:center;font-style:normal;font-size:18px}
nav{display:flex;gap:28px;font-size:15px;font-weight:500}nav a{text-decoration:none;opacity:.8}nav a:hover{opacity:1}
.btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:10px;padding:16px 26px;border-radius:${T.radius || "999px"};border:0;font:600 16px/1 var(--fb);text-decoration:none;cursor:pointer;overflow:hidden;isolation:isolate}
.btn::after{content:"";position:absolute;inset:0;z-index:-1;background:rgba(255,255,255,.28);transform:translateX(-101%);transition:transform .45s cubic-bezier(.7,0,.2,1)}
.btn:hover::after{transform:none}
.btn-acc{background:var(--accent);color:var(--on-accent)}
.btn-brand{background:var(--brand);color:#fff}
.btn-ghost{background:transparent;color:var(--hero-ink);border:1px solid color-mix(in srgb,var(--hero-ink) 35%,transparent)}
@media (max-width:900px){nav{display:none}}@media (max-width:480px){.bar .btn{padding:12px 16px;font-size:14px}.logo{font-size:16px;gap:9px}.logo i{width:32px;height:32px}.art{width:min(220px,62vw)}}
.hero{position:relative;min-height:100vh;min-height:100svh;display:flex;align-items:center;overflow:hidden;color:var(--hero-ink);
background:radial-gradient(900px 600px at 80% 20%,color-mix(in srgb,var(--brand) ${hd ? 55 : 16}%,transparent),transparent 60%),var(--dark)}
.hero .wrap{position:relative;z-index:2;width:100%;display:grid;grid-template-columns:1.2fr .8fr;gap:40px;align-items:center;padding-top:120px;padding-bottom:90px}
.pill{display:inline-flex;align-items:center;gap:10px;padding:7px 16px 7px 7px;border-radius:999px;background:color-mix(in srgb,var(--hero-ink) 8%,transparent);border:1px solid color-mix(in srgb,var(--hero-ink) 16%,transparent);font-size:14px;font-weight:600;margin-bottom:26px}
.pill b{background:var(--accent);color:var(--on-accent);border-radius:999px;padding:4px 10px;font-size:13px}
.hero h1{font-size:clamp(46px,7.6vw,${T.h1max || 110}px)}
.hero h1 em{font-style:normal;color:var(--accent)}
.hero p.sub{font-size:clamp(17px,1.5vw,20px);color:var(--hero-muted);max-width:32em;margin:24px 0 34px}
.ctas{display:flex;flex-wrap:wrap;gap:12px}
.art{position:relative;justify-self:center;width:min(420px,80vw);aspect-ratio:1}
.art svg.main{width:100%;height:100%;overflow:visible}
.ring{position:absolute;right:-6%;bottom:-4%;width:42%;aspect-ratio:1;display:grid;place-items:center;text-decoration:none;color:var(--hero-ink)}
.ring svg{position:absolute;inset:0;animation:spin 20s linear infinite}
.ring span{width:58%;aspect-ratio:1;border-radius:50%;background:var(--accent);color:var(--on-accent);display:grid;place-items:center;font:800 clamp(22px,3vw,34px)/1 var(--fd);box-shadow:0 20px 40px rgba(0,0,0,.3)}
@keyframes spin{to{transform:rotate(360deg)}}
@media (max-width:900px){.hero .wrap{grid-template-columns:1fr;padding-top:110px}.art{order:-1;width:min(260px,70vw);justify-self:start}}
.marquee{background:var(--accent);color:var(--on-accent);overflow:hidden;padding:18px 0;font:700 clamp(19px,2.3vw,28px)/1.2 var(--fd)}
.track{display:flex;width:max-content;animation:marq 30s linear infinite}
.track span{display:flex;align-items:center;gap:44px;padding-right:44px;white-space:nowrap}
.track span::after{content:"";width:12px;height:12px;background:currentColor;transform:rotate(45deg);opacity:.7}
@keyframes marq{to{transform:translateX(-50%)}}
section{padding:110px 0}
.sh{display:grid;grid-template-columns:1fr 1fr;gap:28px;align-items:end;margin-bottom:52px}
.sh h2{font-size:clamp(38px,5.6vw,74px)}.sh p{margin:0;color:var(--muted);font-size:18px;max-width:30em}
@media (max-width:860px){section{padding:80px 0}.sh{grid-template-columns:1fr}}
.stats{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.stat{padding:40px 22px;border-right:1px solid var(--line)}.stat:last-child{border-right:0}
.stat b{display:block;font:800 clamp(50px,6.5vw,90px)/1 var(--fd);color:var(--brand)}.stat span{color:var(--muted)}
@media (max-width:760px){.stats{grid-template-columns:1fr}.stat{border-right:0;border-bottom:1px solid var(--line)}.stat:last-child{border-bottom:0}}
.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;perspective:1200px}
.card{position:relative;background:var(--surface);border:1px solid var(--line);border-radius:26px;padding:32px;display:flex;flex-direction:column;gap:14px;transform-style:preserve-3d;transition:box-shadow .35s}
.card:hover{box-shadow:0 28px 56px color-mix(in srgb,var(--deep) 18%,transparent)}
.card .ic{width:52px;height:52px;border-radius:16px;background:color-mix(in srgb,var(--brand) 12%,transparent);color:var(--brand);display:grid;place-items:center;font-size:24px}
.card h3{font-size:26px}.card p{margin:0;color:var(--muted)}
.card .tag{position:absolute;top:22px;right:22px;font-size:12px;font-weight:700;padding:5px 11px;border-radius:999px;background:var(--accent);color:var(--on-accent)}
.card .more{margin-top:auto;padding-top:8px;font-weight:600;color:var(--brand);background:none;border:0;font:600 15px var(--fb);cursor:pointer;text-align:left;padding-left:0}
.card .more::after{content:"";display:inline-block;width:8px;height:8px;border-top:2px solid currentColor;border-right:2px solid currentColor;transform:rotate(45deg);margin-left:10px;transition:transform .3s}
.card:hover .more::after{transform:translateX(4px) rotate(45deg)}
@media (max-width:960px){.cards{grid-template-columns:1fr 1fr}}@media (max-width:620px){.cards{grid-template-columns:1fr}}
.dark{background:var(--deep);color:#fff}.dark .sh p{color:rgba(255,255,255,.7)}
.tl{position:relative;max-width:820px;margin:0 auto;padding-left:90px}
.rail{position:absolute;left:30px;top:0;bottom:0;width:6px;border-radius:3px;background:rgba(255,255,255,.12)}
.fill{position:absolute;inset:0;border-radius:3px;background:var(--accent);transform-origin:top;transform:scaleY(0)}
.dot{position:absolute;left:-12px;top:0;width:30px;height:30px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 8px color-mix(in srgb,var(--accent) 22%,transparent)}
.step{position:relative;padding-bottom:64px}.step:last-child{padding-bottom:0}
.step .n{position:absolute;left:-90px;top:0;width:68px;text-align:center;font:800 15px var(--fd);color:rgba(255,255,255,.45)}
.step h3{font-size:clamp(28px,3.6vw,44px);margin-bottom:8px}.step p{margin:0;color:rgba(255,255,255,.7);font-size:18px;max-width:30em}
@media (max-width:600px){.tl{padding-left:62px}.rail{left:18px}.step .n{left:-62px;width:44px}}
.why{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
.q{background:var(--surface);border:1px solid var(--line);border-radius:26px;padding:32px}
.q .st{color:var(--accent);letter-spacing:3px}.q h3{font-size:26px;margin:14px 0 8px}.q p{margin:0;color:var(--muted)}
.gl{display:inline-flex;margin-top:34px;font-weight:600;text-underline-offset:4px}
@media (max-width:960px){.why{grid-template-columns:1fr}}
.faq{max-width:860px}
.qa{border-bottom:1px solid var(--line)}
.qa button{all:unset;box-sizing:border-box;width:100%;display:flex;justify-content:space-between;align-items:center;gap:16px;padding:24px 0;cursor:pointer;font:700 clamp(19px,2vw,24px)/1.3 var(--fd)}
.qa button:focus-visible{outline:3px solid var(--accent)}
.pm{flex:none;width:40px;height:40px;border-radius:50%;border:1px solid var(--line);display:grid;place-items:center;transition:transform .35s,background .35s}
.qa.open .pm{transform:rotate(45deg);background:var(--accent);border-color:var(--accent);color:var(--on-accent)}
.ans{height:0;overflow:hidden}.ans p{margin:0 0 24px;color:var(--muted);max-width:42em}
.contact{background:radial-gradient(800px 500px at 0% 0%,color-mix(in srgb,var(--brand) 50%,transparent),transparent 60%),var(--deep);color:#fff}
.contact .wrap{display:grid;grid-template-columns:1fr 1fr;gap:54px;align-items:start}
.contact h2{font-size:clamp(40px,5.6vw,76px)}.contact .lead{color:rgba(255,255,255,.75);font-size:18px;margin:20px 0 30px}
.info{display:grid;gap:18px}.info>div{display:flex;gap:14px}.info svg{flex:none;margin-top:3px}
.info b{display:block;font-weight:600}.info span{color:rgba(255,255,255,.7)}
.hours{display:grid;grid-template-columns:auto 1fr;gap:4px 16px;color:rgba(255,255,255,.7);font-size:15px;margin-top:4px}
.glass{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);border-radius:28px;padding:32px;backdrop-filter:blur(16px);display:grid;gap:16px}
.glass h3{font-size:28px}
label{display:grid;gap:7px;font-size:14px;font-weight:600;color:rgba(255,255,255,.8)}
input,select,textarea{font:inherit;font-size:16px;color:#fff;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.18);border-radius:14px;padding:14px 15px;width:100%}
input:focus,select:focus,textarea:focus{outline:none;border-color:var(--accent);background:rgba(255,255,255,.1)}
select option{color:#111}
.row2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.err{margin:0;color:#FF9A9A;font-size:14px;min-height:1.2em}
@media (max-width:960px){.contact .wrap{grid-template-columns:1fr}}@media (max-width:480px){.row2{grid-template-columns:1fr}}
footer{background:color-mix(in srgb,var(--deep) 85%,#000);color:rgba(255,255,255,.6);font-size:14px;padding:28px 0}
footer .wrap{display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px}
.wa{position:fixed;right:20px;bottom:calc(20px + env(safe-area-inset-bottom,0px));z-index:60;width:62px;height:62px;border-radius:50%;background:#25D366;display:grid;place-items:center;box-shadow:0 10px 30px rgba(37,211,102,.45);transition:transform .25s}
.wa:hover{transform:scale(1.08)}
.float{animation:float 5s ease-in-out infinite}@keyframes float{50%{transform:translateY(-12px)}}
.spinr{transform-box:fill-box;transform-origin:center;animation:spin 12s linear infinite}.spinl{transform-box:fill-box;transform-origin:center;animation:spin 9s linear infinite reverse}
.steam{animation:steam 3.4s ease-in-out infinite;opacity:0}.steam.d2{animation-delay:1.1s}.steam.d3{animation-delay:2.2s}
@keyframes steam{0%{opacity:0;transform:translateY(20px)}40%{opacity:.8}100%{opacity:0;transform:translateY(-40px)}}
.glint{animation:glint 3.5s ease-in-out infinite}@keyframes glint{0%,60%{transform:translateX(-160px)}100%{transform:translateX(200px)}}
.twinkle{transform-box:fill-box;transform-origin:center;animation:tw 2.4s ease-in-out infinite}.twinkle.d2{animation-delay:.8s}.twinkle.d3{animation-delay:1.6s}
@keyframes tw{0%,100%{transform:scale(.4);opacity:.3}50%{transform:scale(1);opacity:1}}
.pulse{transform-box:fill-box;transform-origin:center;animation:pl 2.6s ease-out infinite}.pulse.d2{animation-delay:1.3s}
@keyframes pl{0%{transform:scale(.6);opacity:.7}100%{transform:scale(1.5);opacity:0}}
.lane{animation:lane 1s linear infinite}@keyframes lane{to{stroke-dashoffset:-60}}
.sway{transform-box:fill-box;transform-origin:center;animation:sway 4s ease-in-out infinite}@keyframes sway{50%{transform:rotate(-14deg)}}
`;
  head.insertAdjacentHTML("beforeend", `<style>${css}</style>`);

  /* hero illustrations */
  const A = T.accent, B = T.brand, W = "rgba(255,255,255,.9)", F = "rgba(255,255,255,.08)", L = hd ? "rgba(255,255,255,.25)" : "rgba(0,0,0,.12)";
  const arts = {
    physio: `<circle cx="200" cy="200" r="185" fill="${hd ? F : "rgba(0,0,0,.04)"}"/><circle class="pulse" cx="200" cy="200" r="140" fill="none" stroke="${A}" stroke-width="3"/><g class="float"><path d="M200 70 C196 120 214 150 200 200 C186 250 206 280 200 330" stroke="${hd ? W : B}" stroke-width="10" fill="none" stroke-linecap="round"/>${[0,1,2,3,4,5,6].map(i=>`<rect x="176" y="${82+i*36}" width="48" height="22" rx="11" fill="${i%2? A : (hd ? W : B)}"/>`).join("")}</g>`,
    speech: `<circle cx="200" cy="200" r="185" fill="${hd ? F : "rgba(0,0,0,.04)"}"/><g class="float"><path d="M110 120 h180 a30 30 0 0 1 30 30 v80 a30 30 0 0 1 -30 30 h-90 l-50 44 v-44 h-40 a30 30 0 0 1 -30 -30 v-80 a30 30 0 0 1 30 -30z" fill="${hd ? W : B}"/>${[0,1,2,3,4].map(i=>`<rect class="twinkle${i?" d"+(i%3+1):""}" x="${142+i*26}" y="${165-[10,24,34,24,10][i]}" width="14" height="${[20,48,68,48,20][i]}" rx="7" fill="${hd ? A : "#fff"}"/>`).join("")}</g>`,
    osteo: `<circle cx="200" cy="200" r="185" fill="${hd ? F : "rgba(0,0,0,.04)"}"/><circle class="pulse" cx="200" cy="200" r="120" fill="none" stroke="${A}" stroke-width="3"/><circle class="pulse d2" cx="200" cy="200" r="120" fill="none" stroke="${A}" stroke-width="3"/><g class="float"><path d="M150 300 C120 250 120 180 150 140 C160 126 176 128 178 146 L182 200 L190 110 C192 92 214 92 214 112 L212 196 L226 120 C230 102 252 106 250 126 L238 210 L262 160 C270 146 290 154 284 172 L250 280 C240 310 220 320 200 320 C180 320 162 316 150 300Z" fill="${hd ? W : B}"/></g>`,
    drive: `<circle cx="200" cy="200" r="190" fill="${F}"/><path d="M60 380 L170 160 M340 380 L230 160" stroke="${L}" stroke-width="6"/><path d="M200 380 L200 170" stroke="${A}" stroke-width="8" stroke-dasharray="30 30" class="lane"/>
      <g class="sway"><circle cx="200" cy="170" r="110" fill="none" stroke="${W}" stroke-width="22"/><circle cx="200" cy="170" r="28" fill="${A}"/><path d="M92 170 H172 M228 170 H308 M200 198 V278" stroke="${W}" stroke-width="20" stroke-linecap="round"/></g>`,
    food: `<circle cx="200" cy="210" r="185" fill="${F}"/><g class="float"><path d="M70 270 Q70 140 200 130 Q330 140 330 270 Z" fill="${A}"/><path d="M110 250 Q120 170 190 158" stroke="rgba(255,255,255,.5)" stroke-width="8" fill="none" stroke-linecap="round"/><circle cx="200" cy="118" r="16" fill="${A}"/><rect x="40" y="268" width="320" height="22" rx="11" fill="${W}"/></g>
      <path class="steam" d="M160 100 q-15 -25 0 -50 q15 -25 0 -50" stroke="${W}" stroke-width="6" fill="none" stroke-linecap="round"/><path class="steam d2" d="M200 95 q-15 -25 0 -50 q15 -25 0 -50" stroke="${W}" stroke-width="6" fill="none" stroke-linecap="round"/><path class="steam d3" d="M240 100 q-15 -25 0 -50 q15 -25 0 -50" stroke="${W}" stroke-width="6" fill="none" stroke-linecap="round"/>`,
    gym: `<circle class="pulse" cx="200" cy="200" r="150" fill="none" stroke="${A}" stroke-width="4"/><circle class="pulse d2" cx="200" cy="200" r="150" fill="none" stroke="${A}" stroke-width="4"/><circle cx="200" cy="200" r="150" fill="${F}"/>
      <g class="float"><rect x="110" y="188" width="180" height="24" rx="12" fill="${W}"/><rect x="70" y="130" width="44" height="140" rx="14" fill="${A}"/><rect x="40" y="155" width="34" height="90" rx="12" fill="${A}"/><rect x="286" y="130" width="44" height="140" rx="14" fill="${A}"/><rect x="326" y="155" width="34" height="90" rx="12" fill="${A}"/></g>`,
    optic: `<circle cx="200" cy="200" r="185" fill="${F}"/><defs><clipPath id="lc"><circle cx="128" cy="200" r="70"/><circle cx="272" cy="200" r="70"/></clipPath></defs>
      <g class="float"><circle cx="128" cy="200" r="70" fill="${hd ? "rgba(255,255,255,.12)" : "rgba(47,107,255,.10)"}" stroke="${hd ? W : B}" stroke-width="16"/><circle cx="272" cy="200" r="70" fill="${hd ? "rgba(255,255,255,.12)" : "rgba(47,107,255,.10)"}" stroke="${hd ? W : B}" stroke-width="16"/><path d="M190 196 Q200 180 210 196" stroke="${hd ? W : B}" stroke-width="12" fill="none"/><path d="M58 190 L20 170 M342 190 L380 170" stroke="${hd ? W : B}" stroke-width="12" stroke-linecap="round"/>
      <g clip-path="url(#lc)"><rect class="glint" x="0" y="100" width="40" height="220" fill="rgba(255,255,255,.55)" transform="skewX(-20)"/></g></g>`,
    garage: `<circle cx="200" cy="200" r="185" fill="${F}"/><g class="spinr"><circle cx="160" cy="180" r="80" fill="none" stroke="${A}" stroke-width="34" stroke-dasharray="22 16"/><circle cx="160" cy="180" r="52" fill="none" stroke="${A}" stroke-width="22"/></g>
      <g class="spinl"><circle cx="275" cy="270" r="52" fill="none" stroke="${W}" stroke-width="24" stroke-dasharray="16 12"/><circle cx="275" cy="270" r="32" fill="none" stroke="${W}" stroke-width="14"/></g>`,
    spa: `<circle cx="200" cy="210" r="185" fill="${F}"/><circle class="pulse" cx="200" cy="300" r="120" fill="none" stroke="${A}" stroke-width="3"/><circle class="pulse d2" cx="200" cy="300" r="120" fill="none" stroke="${A}" stroke-width="3"/>
      <g class="float"><ellipse cx="200" cy="300" rx="120" ry="34" fill="${W}" opacity=".9"/><ellipse cx="200" cy="250" rx="92" ry="30" fill="${A}"/><ellipse cx="200" cy="206" rx="64" ry="24" fill="${W}"/><path d="M200 182 C170 150 176 110 200 90 C224 110 230 150 200 182 Z" fill="${A}"/></g>
      <path class="steam" d="M150 120 q-12 -20 0 -40 q12 -20 0 -40" stroke="${W}" stroke-width="5" fill="none" stroke-linecap="round"/><path class="steam d2" d="M250 120 q-12 -20 0 -40 q12 -20 0 -40" stroke="${W}" stroke-width="5" fill="none" stroke-linecap="round"/>`,
    dental: `<circle cx="200" cy="200" r="185" fill="${hd ? F : "rgba(15,163,163,.08)"}"/><g class="float"><path d="M200 108 C170 86 110 90 104 150 C99 200 126 236 138 300 C146 344 176 344 182 300 C186 272 192 258 200 258 C208 258 214 272 218 300 C224 344 254 344 262 300 C274 236 301 200 296 150 C290 90 230 86 200 108 Z" fill="#fff" stroke="${B}" stroke-width="10"/><path d="M140 150 Q150 120 180 118" stroke="${A}" stroke-width="10" fill="none" stroke-linecap="round" opacity=".6"/></g>
      <path class="twinkle" d="M320 90 l8 22 22 8 -22 8 -8 22 -8 -22 -22 -8 22 -8z" fill="${A}"/><path class="twinkle d2" d="M80 290 l6 16 16 6 -16 6 -6 16 -6 -16 -16 -6 16 -6z" fill="${A}"/><path class="twinkle d3" d="M330 300 l5 13 13 5 -13 5 -5 13 -5 -13 -13 -5 13 -5z" fill="${B}"/>`
  };

  const ico = {
    pin: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${A}" stroke-width="2"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>`,
    clock: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${A}" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
    phone: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${A}" stroke-width="2"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>`,
    wa: `<svg width="32" height="32" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm4.5 12.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4a.5.5 0 0 0 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z"/></svg>`
  };
  const maps = `https://www.google.com/maps/place/?q=place_id:${S.placeId}`;
  const wa = t => `https://wa.me/${S.wa}${t ? "?text=" + encodeURIComponent(t) : ""}`;
  
  const nav = S.nav || [["#services", "Soins"], ["#etapes", "Votre visite"], ["#approche", "Le cabinet"], ["#contact", "Contact"]];
  const today = new Date(Date.now() + 864e5).toISOString().slice(0, 10);

  document.body.innerHTML = `
<header id="hdr"><div class="wrap bar">
  <a class="logo" href="#top"><i>${esc(S.mark)}</i>${esc(S.short)}</a>
  <nav aria-label="Navigation">${nav.map(n => `<a href="${n[0]}">${esc(n[1])}</a>`).join("")}</nav>
  <a class="btn btn-acc" href="#contact">${esc(S.navCta || "Réserver")}</a>
</div></header>
<main id="top">
  <section class="hero" style="padding:0"><div class="wrap">
    <div>
      <div class="pill hero-in"><b>${esc(S.badge)}</b>${esc(S.area)}, Casablanca</div>
      <h1 class="split">${S.h1}</h1>
      <p class="sub hero-in">${esc(S.sub)}</p>
      <div class="ctas hero-in"><a class="btn btn-acc" href="#contact">${esc(S.cta1 || "Prendre rendez-vous")}</a><a class="btn btn-ghost" href="tel:+${S.wa}">${esc(S.phone)}</a></div>
    </div>
    <div class="art hero-in">
      <svg class="main" viewBox="0 0 400 400" aria-hidden="true">${arts[S.niche]}</svg>
      <a class="ring" href="#contact" aria-label="Prendre rendez-vous">
        <svg viewBox="0 0 200 200" aria-hidden="true"><defs><path id="rc" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0"/></defs><text fill="currentColor" font-size="13" font-weight="700" letter-spacing="3" font-family="sans-serif"><textPath href="#rc">${esc(S.ringText)} ✦ ${esc(S.ringText)} ✦ </textPath></text></svg>
        <span>${S.ringIcon || "+"}</span>
      </a>
    </div>
  </div></section>
  <div class="marquee" aria-hidden="true"><div class="track">${[...S.marquee, ...S.marquee].map(m => `<span>${esc(m)}</span>`).join("")}</div></div>
  <section style="padding-bottom:0"><div class="wrap"><div class="stats rv">
    ${S.stats.map(s => `<div class="stat"><b>${s.pre || ""}<span class="count" data-to="${s.v}" data-dec="${s.dec || 0}">${s.dec ? String(s.v).replace(".", ",") : s.v}</span>${s.suf || ""}</b><span>${esc(s.l)}</span></div>`).join("")}
  </div></div></section>
  <section id="services"><div class="wrap">
    <div class="sh"><h2 class="split">${esc(S.servicesTitle)}</h2><p class="rv">${esc(S.servicesSub)}</p></div>
    <div class="cards">${S.services.map(c => `<article class="card rv tilt">${c.tag ? `<span class="tag">${esc(c.tag)}</span>` : ""}<div class="ic" aria-hidden="true">${c.i}</div><h3>${esc(c.t)}</h3><p>${esc(c.d)}</p><button class="more" type="button" data-pick="${esc(c.t)}">${esc(S.pickLabel || "Demander")}</button></article>`).join("")}</div>
  </div></section>
  <section class="dark" id="etapes"><div class="wrap">
    <div class="sh"><h2 class="split">${esc(S.stepsTitle)}</h2><p class="rv">${esc(S.stepsSub)}</p></div>
    <div class="tl" id="tl"><div class="rail" aria-hidden="true"><div class="fill" id="fill"></div><div class="dot" id="dot"></div></div>
      ${S.steps.map((s, i) => `<div class="step rv"><span class="n">0${i + 1}</span><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p></div>`).join("")}
    </div>
  </div></section>
  <section id="approche"><div class="wrap">
    <div class="sh"><h2 class="split">${esc(S.whyTitle)}</h2><p class="rv">${esc(S.whySub || "Ce qui guide chaque consultation au cabinet.")}</p></div>
    <div class="why">${S.why.map((q, i) => `<article class="q rv"><span class="st" style="letter-spacing:0;font-weight:800">0${i + 1}</span><h3>${esc(q.t)}</h3><p>${esc(q.d)}</p></article>`).join("")}</div>
  </div></section>
  <section id="faq" style="padding-top:0"><div class="wrap">
    <div class="sh"><h2 class="split">Questions fréquentes.</h2></div>
    <div class="faq">${S.faq.map(f => `<div class="qa rv"><button type="button" aria-expanded="false"><span>${esc(f.q)}</span><span class="pm" aria-hidden="true">+</span></button><div class="ans"><p>${esc(f.a)}</p></div></div>`).join("")}</div>
  </div></section>
  <section class="contact" id="contact"><div class="wrap">
    <div>
      <h2 class="split">${esc(S.contactTitle)}</h2>
      <p class="lead rv">${esc(S.contactSub)}</p>
      <div class="info rv">
        <div>${ico.pin}<p style="margin:0"><b>${esc(S.address)}</b><span><a href="${maps}" target="_blank" rel="noopener">Itinéraire sur Google Maps</a></span></p></div>
        <div>${ico.clock}<div><b>Horaires</b><div class="hours">${S.hours.map(h => `<span>${esc(h[0])}</span><span>${esc(h[1])}</span>`).join("")}</div></div></div>
        <div>${ico.phone}<p style="margin:0"><b><a href="tel:+${S.wa}">${esc(S.phone)}</a></b><span>Appel ou WhatsApp</span></p></div>
      </div>
    </div>
    <form class="glass rv" id="f" novalidate>
      <h3>${esc(S.formTitle)}</h3>
      <div class="row2"><label>Nom<input id="fn" autocomplete="name" placeholder="Votre nom"></label><label>Téléphone<input id="fp" type="tel" autocomplete="tel" placeholder="06 00 00 00 00"></label></div>
      <label>${esc(S.serviceLabel || "Service")}<select id="fs">${S.services.map(c => `<option>${esc(c.t)}</option>`).join("")}<option>Autre demande</option></select></label>
      <label>${esc(S.dateLabel || "Date souhaitée")}<input id="fd" type="date" min="${today}" value="${today}"></label>
      <label>Message (optionnel)<textarea id="fm" rows="3" placeholder="${esc(S.msgHint || "Précisez votre demande")}"></textarea></label>
      <p class="err" id="err" role="alert"></p>
      <button class="btn btn-acc" type="submit">Envoyer sur WhatsApp</button>
    </form>
  </div></section>
</main>
<footer><div class="wrap"><span>© ${esc(S.name)}, Casablanca</span><span>Site réalisé par Redone</span></div></footer>
<a class="wa" href="${wa()}" target="_blank" rel="noopener" aria-label="Écrire sur WhatsApp">${ico.wa}</a>`;

  /* behaviour */
  const $ = id => document.getElementById(id);
  const hdr = $("hdr"); addEventListener("scroll", () => hdr.classList.toggle("solid", scrollY > 40), { passive: true });
  document.querySelectorAll("[data-pick]").forEach(b => b.addEventListener("click", () => { $("fs").value = b.dataset.pick; $("contact").scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); }));
  $("f").addEventListener("submit", e => {
    e.preventDefault();
    const n = $("fn").value.trim(), p = $("fp").value.trim();
    if (!n || p.replace(/\D/g, "").length < 9) { $("err").textContent = "Ajoutez votre nom et un numéro valide pour qu'on puisse vous répondre."; return; }
    $("err").textContent = "";
    const m = $("fm").value.trim();
    const txt = `${S.msgIntro}\nNom : ${n}\nTéléphone : ${p}\n${S.serviceLabel || "Service"} : ${$("fs").value}\n${S.dateLabel || "Date souhaitée"} : ${$("fd").value}${m ? "\nMessage : " + m : ""}`;
    window.open(wa(txt), "_blank", "noopener");
  });
  document.querySelectorAll(".qa").forEach(q => q.querySelector("button").addEventListener("click", () => {
    const open = !q.classList.contains("open"), a = q.querySelector(".ans");
    q.classList.toggle("open", open); q.querySelector("button").setAttribute("aria-expanded", open);
    if (window.gsap && !reduce) gsap.to(a, { height: open ? "auto" : 0, duration: .5, ease: "power3.inOut" }); else a.style.height = open ? "auto" : "0";
  }));

  /* motion */
  const unhide = () => { root.classList.remove("motion"); document.querySelectorAll(".split").forEach(e => e.style.visibility = "visible"); };
  if (reduce) { unhide(); return; }
  const load = src => new Promise((ok, ko) => { const s = document.createElement("script"); s.src = src; s.onload = ok; s.onerror = ko; document.head.appendChild(s); });
  const safety = setTimeout(unhide, 4000);
  load("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js")
    .then(() => load("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"))
    .then(run).catch(unhide);

  function split(el) {
    const walk = n => [...n.childNodes].map(c => c.nodeType === 3
      ? c.textContent.split(/(\s+)/).map(t => t.trim() ? `<span class="w"><span>${t}</span></span>` : t).join("")
      : `<${c.tagName.toLowerCase()}>${walk(c)}</${c.tagName.toLowerCase()}>`).join("");
    el.innerHTML = walk(el); el.style.visibility = "visible"; return el.querySelectorAll(".w>span");
  }
  function run() {
    clearTimeout(safety);
    gsap.registerPlugin(ScrollTrigger);
    gsap.timeline({ defaults: { ease: "expo.out" } })
      .from(split(document.querySelector(".hero h1")), { yPercent: 115, duration: 1.3, stagger: .07 })
      .from(".hero-in", { opacity: 0, y: 30, duration: 1, stagger: .12 }, "-=1")
      .from(".art svg.main", { scale: .7, rotate: -12, opacity: 0, duration: 1.6 }, .2);
    gsap.to(".art", { yPercent: 18, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    document.querySelectorAll("section:not(.hero) .split").forEach(h =>
      gsap.from(split(h), { yPercent: 115, duration: 1.1, ease: "expo.out", stagger: .06, scrollTrigger: { trigger: h, start: "top 86%" } }));
    ScrollTrigger.batch(".rv", { start: "top 90%", onEnter: els => gsap.to(els, { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: .1 }) });
    document.querySelectorAll(".count").forEach(c => {
      const o = { v: 0 }, d = +c.dataset.dec; c.textContent = "0";
      gsap.to(o, { v: +c.dataset.to, duration: 2, ease: "power2.out", scrollTrigger: { trigger: c, start: "top 92%" }, onUpdate: () => c.textContent = d ? o.v.toFixed(d).replace(".", ",") : Math.round(o.v) });
    });
    const tl = $("tl");
    gsap.to("#fill", { scaleY: 1, ease: "none", scrollTrigger: { trigger: tl, start: "top 60%", end: "bottom 60%", scrub: .4 } });
    gsap.to("#dot", { y: () => tl.offsetHeight - 30, ease: "none", scrollTrigger: { trigger: tl, start: "top 60%", end: "bottom 60%", scrub: .4, invalidateOnRefresh: true } });
    if (matchMedia("(hover:hover)").matches) {
      document.querySelectorAll(".tilt").forEach(c => {
        c.addEventListener("mousemove", e => { const r = c.getBoundingClientRect(); gsap.to(c, { rotateY: ((e.clientX - r.left) / r.width - .5) * 8, rotateX: -((e.clientY - r.top) / r.height - .5) * 8, y: -6, duration: .5 }); });
        c.addEventListener("mouseleave", () => gsap.to(c, { rotateY: 0, rotateX: 0, y: 0, duration: .7, ease: "elastic.out(1,.6)" }));
      });
      document.querySelectorAll(".btn").forEach(b => {
        b.addEventListener("mousemove", e => { const r = b.getBoundingClientRect(); gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * .18, y: (e.clientY - r.top - r.height / 2) * .25, duration: .4 }); });
        b.addEventListener("mouseleave", () => gsap.to(b, { x: 0, y: 0, duration: .6, ease: "elastic.out(1,.5)" }));
      });
    }
    addEventListener("load", () => ScrollTrigger.refresh());
    setTimeout(() => ScrollTrigger.refresh(), 1200);
  }
})();
