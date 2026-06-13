/* =============================================
   CONFIGURAÇÃO — edite apenas aqui
   ============================================= */
const CONFIG = {
  encontro: {
    data: "20 de Junho",
    horario: "19:00",
    local: "Rio Preto Shopping",
    atividade: "Jantar Japonês"
  },
  whatsapp: {
    numero: "5517999999999",
    mensagem: "Eu aceitei seu convite ❤️"
  },
  textoFinal: "Mal posso esperar para te ver ❤️"
};

/* =============================================
   UTILITÁRIOS
   ============================================= */
const $ = (id) => document.getElementById(id);
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function transitionTo(fromId, toId) {
  const from = $(fromId);
  const to = $(toId);
  from.classList.remove('active');
  from.classList.add('exit');
  setTimeout(() => {
    from.classList.remove('exit');
    to.classList.add('active');
  }, 420);
}

/* =============================================
   PARTÍCULAS DE FUNDO — Canvas API
   ============================================= */
(function initParticles() {
  const canvas = $('particles-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.8 + 0.4,
      dx: (Math.random() - 0.5) * 0.3,
      dy: -(Math.random() * 0.4 + 0.1),
      alpha: Math.random() * 0.5 + 0.1
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,107,157,${p.alpha})`;
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;
      if (p.y < -4) { p.y = H + 4; p.x = Math.random() * W; }
      if (p.x < -4) p.x = W + 4;
      if (p.x > W + 4) p.x = -4;
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); createParticles(); });
  resize();
  createParticles();
  draw();
})();

/* =============================================
   CONFETES — Canvas API
   ============================================= */
const Confetti = (() => {
  const canvas = $('confetti-canvas');
  const ctx = canvas.getContext('2d');
  let pieces = [];
  let animating = false;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const COLORS = ['#ff6b9d', '#c44dff', '#ff9ef0', '#ffe066', '#5ee7ff', '#ff4f4f'];

  function launch() {
    const cx = window.innerWidth / 2;
    for (let i = 0; i < 120; i++) {
      const angle = (Math.random() * Math.PI * 2);
      const speed = Math.random() * 8 + 3;
      pieces.push({
        x: cx,
        y: window.innerHeight * 0.5,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 6,
        r: Math.random() * 6 + 4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.25,
        alpha: 1,
        shape: Math.random() > 0.5 ? 'rect' : 'circle'
      });
    }
    if (!animating) { animating = true; tick(); }
  }

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces = pieces.filter(p => p.alpha > 0.02);

    pieces.forEach(p => {
      p.vy += 0.25; // gravity
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotSpeed;
      p.alpha -= 0.012;

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      if (p.shape === 'rect') {
        ctx.fillRect(-p.r / 2, -p.r * 1.5, p.r, p.r * 3);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.r / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });

    if (pieces.length > 0) {
      requestAnimationFrame(tick);
    } else {
      animating = false;
    }
  }

  return { launch };
})();

/* =============================================
   CORAÇÕES FLUTUANTES
   ============================================= */
function spawnHearts(count = 12) {
  const emojis = ['❤️', '🩷', '💕', '💖', '💗'];
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'floating-heart';
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.left = (20 + Math.random() * 60) + 'vw';
      el.style.top = (30 + Math.random() * 40) + 'vh';
      el.style.fontSize = (18 + Math.random() * 20) + 'px';
      el.style.animationDuration = (2 + Math.random() * 1.5) + 's';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 4000);
    }, i * 120);
  }
}

/* =============================================
   PARALLAX
   ============================================= */
(function initParallax() {
  const app = $('app') || document.getElementById('app');

  function applyParallax(x, y) {
    const mx = (x / window.innerWidth - 0.5) * 12;
    const my = (y / window.innerHeight - 0.5) * 8;
    document.body.style.backgroundPosition = `${50 + mx * 0.3}% ${50 + my * 0.3}%`;
  }

  window.addEventListener('mousemove', e => applyParallax(e.clientX, e.clientY));

  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', e => {
      if (e.beta === null || e.gamma === null) return;
      const x = ((e.gamma + 90) / 180) * window.innerWidth;
      const y = ((e.beta + 180) / 360) * window.innerHeight;
      applyParallax(x, y);
    });
  }
})();

/* =============================================
   TELA 1 — Intro
   ============================================= */
$('btn-start').addEventListener('click', () => {
  transitionTo('screen-1', 'screen-2');
});

/* =============================================
   TELA 2 — A Pergunta
   ============================================= */
const NO_MESSAGES = [
  "Tem certeza? 🥺",
  "Pensa mais um pouco 😭",
  "Eu programei isso a madrugada toda",
  "Não quebra meu coração",
  "Ok... última chance 🙏"
];
let noAttempts = 0;

function repositionNoBtn() {
  const btn = $('btn-no');
  const margin = 20;
  const bw = btn.offsetWidth || 160;
  const bh = btn.offsetHeight || 52;
  const maxX = window.innerWidth - bw - margin;
  const maxY = window.innerHeight - bh - margin;
  const newX = margin + Math.random() * maxX;
  const newY = margin + Math.random() * maxY;

  btn.classList.add('escaping');
  btn.style.left = newX + 'px';
  btn.style.top = newY + 'px';
}

function handleNoEscape() {
  if (noAttempts >= NO_MESSAGES.length) {
    // Desaparece silenciosamente após 5 tentativas
    const btn = $('btn-no');
    btn.style.opacity = '0';
    btn.style.pointerEvents = 'none';
    return;
  }
  $('no-message').textContent = NO_MESSAGES[noAttempts];
  noAttempts++;
  repositionNoBtn();
}

$('btn-no').addEventListener('mouseover', handleNoEscape);
$('btn-no').addEventListener('touchstart', (e) => {
  e.preventDefault();
  handleNoEscape();
}, { passive: false });

$('btn-yes').addEventListener('click', async () => {
  const btn = $('btn-yes');
  btn.classList.add('celebrate');
  Confetti.launch();
  spawnHearts(16);
  await sleep(1500);
  transitionTo('screen-2', 'screen-3');
  startLoading();
});

/* =============================================
   TELA 3 — Loading Fake
   ============================================= */
const LOADING_STEPS = [
  { at: 0,   msg: "Processando resposta..." },
  { at: 25,  msg: "Verificando compatibilidade..." },
  { at: 50,  msg: "Consultando os astros..." },
  { at: 75,  msg: "Executando algoritmo do amor..." },
  { at: 100, msg: "Resultado encontrado ✓" }
];

function startLoading() {
  let current = 0;
  const fill = $('progress-fill');
  const pct = $('progress-percent');
  const msg = $('progress-message');
  let stepIndex = 0;

  const interval = setInterval(() => {
    current = Math.min(current + 0.5, 100);
    fill.style.width = current + '%';
    pct.textContent = Math.floor(current) + '%';

    // Atualiza mensagem quando bate nos marcos
    if (stepIndex < LOADING_STEPS.length && current >= LOADING_STEPS[stepIndex].at) {
      msg.textContent = LOADING_STEPS[stepIndex].msg;
      stepIndex++;
    }

    if (current >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        transitionTo('screen-3', 'screen-4');
        startTypewriter();
      }, 500);
    }
  }, 20); // ~4s para 100%
}

/* =============================================
   TELA 4 — Surpresa / Typewriter
   ============================================= */
const TYPEWRITER_SEQUENCE = [
  { text: "VOCÊ DISSE SIM? 😳",               pause: 1500 },
  { text: "Eu jurava que você ia apertar NÃO...", pause: 2000 },
  { text: "Nem preparei essa parte direito 😅",   pause: 1500 },
  { text: "Mas... que bom que você disse sim ❤️", pause: 0 }
];

async function startTypewriter() {
  const el = $('typewriter-text');
  const btn = $('btn-surprise');

  for (let i = 0; i < TYPEWRITER_SEQUENCE.length; i++) {
    const { text, pause } = TYPEWRITER_SEQUENCE[i];
    el.classList.remove('done');
    el.textContent = '';

    // Digita caractere a caractere
    for (const char of text) {
      el.textContent += char;
      await sleep(60);
    }

    if (i < TYPEWRITER_SEQUENCE.length - 1) {
      el.classList.add('done'); // remove cursor durante pausa
      await sleep(pause);
      // Fade out texto para próximo
      el.style.opacity = '0';
      await sleep(300);
      el.style.opacity = '1';
    }
  }

  el.classList.add('done');

  // Mostra botão com fade-in
  await sleep(600);
  btn.classList.remove('hidden');
  btn.classList.add('visible');
}

$('btn-surprise').addEventListener('click', () => {
  transitionTo('screen-4', 'screen-5');
  setTimeout(animateInviteCard, 200);
});

/* =============================================
   TELA 5 — O Convite
   ============================================= */
function animateInviteCard() {
  // Preenche dados do CONFIG
  $('invite-data').textContent = CONFIG.encontro.data;
  $('invite-hora').textContent = CONFIG.encontro.horario;
  $('invite-local').textContent = CONFIG.encontro.local;
  $('invite-ativ').textContent = CONFIG.encontro.atividade;

  const rows = ['row-data', 'row-hora', 'row-local', 'row-ativ'];
  rows.forEach((id, i) => {
    setTimeout(() => {
      const el = $(id);
      el.classList.remove('hidden-row');
      el.classList.add('visible-row');
    }, 200 + i * 150);
  });

  // Botão confirmar aparece após as linhas
  setTimeout(() => {
    const btn = $('btn-confirm');
    btn.classList.remove('hidden');
    btn.classList.add('visible');
  }, 200 + rows.length * 150 + 300);
}

$('btn-confirm').addEventListener('click', () => {
  transitionTo('screen-5', 'screen-final');
  setTimeout(animateFinalScreen, 300);
});

/* =============================================
   TELA FINAL
   ============================================= */
function animateFinalScreen() {
  $('final-text').textContent = CONFIG.textoFinal;
  spawnHearts(8);
}

$('btn-whatsapp').addEventListener('click', () => {
  const url = `https://wa.me/${CONFIG.whatsapp.numero}?text=${encodeURIComponent(CONFIG.whatsapp.mensagem)}`;
  window.open(url, '_blank');
});
