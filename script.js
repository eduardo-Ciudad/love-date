/* =============================================
   CONFIGURAÇÃO — edite apenas aqui
   ============================================= */
const CONFIG = {
  encontro: {
    data: "sabado",
    horario: "19:00",
    local: "bom prato",
    atividade: "jantar "
  },
  whatsapp: {
    numero: "5517999999999",
    mensagem: "Eu aceitei seu convite ❤️"
  },
  textoFinal: "Já adianta a derrota"
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
    particles = Array.from({ length: 60 }, (_, index) => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.8 + 0.4,
      dx: (Math.random() - 0.5) * 0.3,
      dy: -(Math.random() * 0.4 + 0.1),
      alpha: Math.random() * 0.5 + 0.1,
      color: index % 2 === 0 ? '214,51,108' : '125,176,63'
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
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

  const COLORS = ['#D6336C','#F2B3C8','#7DB03F','#A8D163','#8B5E3C','#FFFFFF'];

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
  const emojis = ['❤️', '', '', ''];
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
  "Tem certeza? ",
  "Pensa mais um pouco ",
  "tá acabado as chances",
  "4 é a da sorte",
  "ok a ultima chance kkk"
];
let noAttempts = 0;

function repositionNoBtn() {
  const btn = $('btn-no');
  const screen = $('screen-2');
  const margin = 20;
  const fixedWidth = btn.offsetWidth;
  const bh = btn.offsetHeight || 52;
  const screenRect = screen.getBoundingClientRect();
  const yesRect = $('btn-yes').getBoundingClientRect();
  const titleRect = screen.querySelector('.question-text').getBoundingClientRect();
  const maxX = Math.max(margin, screenRect.width - fixedWidth - margin);
  const maxY = Math.max(margin, screenRect.height - bh - margin);
  let newX = margin;
  let newY = margin;

  for (let attempt = 0; attempt < 10; attempt++) {
    const candidateX = margin + Math.random() * Math.max(0, maxX - margin);
    const candidateY = margin + Math.random() * Math.max(0, maxY - margin);
    const candidate = { left: screenRect.left + candidateX, right: screenRect.left + candidateX + fixedWidth, top: screenRect.top + candidateY, bottom: screenRect.top + candidateY + bh };
    const intersects = (rect) => !(candidate.right + 12 < rect.left || candidate.left - 12 > rect.right || candidate.bottom + 12 < rect.top || candidate.top - 12 > rect.bottom);
    newX = candidateX;
    newY = candidateY;
    if (!intersects(yesRect) && !intersects(titleRect)) break;
  }
  btn.classList.add('escaping');
  screen.appendChild(btn);
  btn.style.width = fixedWidth + 'px';
  btn.style.left = newX + 'px';
  btn.style.top = newY + 'px';
}

function handleNoEscape() {
  const message = $('no-message');
  const sadKiwi = message.querySelector('.no-kiwi');
  $('no-message-text').textContent = NO_MESSAGES[noAttempts];
  message.classList.add('visible');
  sadKiwi.classList.remove('shake');
  void sadKiwi.offsetWidth;
  sadKiwi.classList.add('shake');
  noAttempts++;
  if (noAttempts >= NO_MESSAGES.length) {
    const btn = $('btn-no');
    btn.style.opacity = '0';
    btn.style.pointerEvents = 'none';
    return;
  }
  repositionNoBtn();
}

let ignoreNextNoClick = false;
$('btn-no').addEventListener('pointerenter', (e) => {
  if (e.pointerType === 'mouse') handleNoEscape();
});
$('btn-no').addEventListener('pointerdown', (e) => {
  e.preventDefault();
  ignoreNextNoClick = true;
  handleNoEscape();
});
$('btn-no').addEventListener('click', (e) => {
  e.preventDefault();
  if (ignoreNextNoClick) { ignoreNextNoClick = false; return; }
  handleNoEscape();
});

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
  { at: 25,  msg: "Abrindo com e4..." },
  { at: 50,  msg: "Consultando o kiwi triste..." },
  { at: 75,  msg: "Calculando xeque-mate em 3..." },
  { at: 100, msg: "Resultado encontrado ✓" }
];

function startLoading() {
  let current = 0;
  const fill = $('progress-fill');
  const pct = $('progress-percent');
  const msg = $('progress-message');
  const kiwi = $('progress-kiwi');
  let stepIndex = 0;

  const interval = setInterval(() => {
    current = Math.min(current + 0.5, 100);
    fill.style.width = current + '%';
    kiwi.style.left = `calc(${current}% - 15px)`;
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
  { text: "Escolheu a única escolha possível para essa pergunta", pause: 1800 },
  { text: "Bom, como além de ser um excelente garoto de programa", pause: 2000 },
  { text: "também sou o último romântico", pause: 0 }
];

async function startTypewriter() {
  const el = $('typewriter-text');
  const btn = $('btn-surprise');
  const dots = document.querySelectorAll('.typewriter-dots span');

  for (let i = 0; i < TYPEWRITER_SEQUENCE.length; i++) {
    dots.forEach((dot, index) => dot.classList.toggle('active', index === i));
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
function animateInviteCard() {
  document.querySelectorAll('.invite-row').forEach((row, index) => {
    row.classList.add('hidden-row');
    setTimeout(() => {
      row.classList.remove('hidden-row');
      row.classList.add('visible-row');
    }, index * 120);
  });
}
/* =============================================
   TELA 5 — O Convite
   ============================================= */
$('btn-confirm').addEventListener('click', () => {
  var data = document.getElementById('input-data').value;
  var hora = document.getElementById('input-hora').value;
  var local = document.getElementById('input-local').value;

  if (!data || !hora || !local) {
    alert('Preenche pelo menos a data, hora e local 😅');
    return;
  }

  transitionTo('screen-5', 'screen-final');
  setTimeout(animateFinalScreen, 500);
});

/* =============================================
   TELA FINAL
   ============================================= */
function animateFinalScreen() {
  $('final-text').innerHTML = CONFIG.textoFinal.replace(' a derrota', '<br>a derrota');
  setTimeout(() => document.querySelector('.fallen-king').classList.add('fallen'), 400);
  spawnHearts(8);
}

$('btn-whatsapp').addEventListener('click', () => {
  var data = document.getElementById('input-data').value || 'A combinar';
  var hora = document.getElementById('input-hora').value || 'A combinar';
  var local = document.getElementById('input-local').value || 'A combinar';
  var ativ = 'Comer um pastel e perder no xadrez pessoalmente';

  var msg = '❤️ *Encontro confirmado!*\n\n' +
    '📅 Data: ' + data + '\n' +
    '🕐 Hora: ' + hora + '\n' +
    '📍 Local: ' + local + '\n' +
    '♟️ Atividade: ' + ativ + '\n\n' +
    'Te vejo lá! 😊';

  var url = 'https://wa.me/5517997061100?text=' + encodeURIComponent(msg);
  window.open(url, '_blank');
});
