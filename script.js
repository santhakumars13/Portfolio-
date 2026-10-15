/* ==========================================================================
   1. Interactive Neural Network Node Canvas
   ========================================================================== */
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

function initCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  particles = [];

  // Optimal particle density calculation
  const particleCount = Math.floor((width * height) / 30000);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 1.5 + 0.5
    });
  }
}

function renderMatrix() {
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.06)';

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];

    p.x += p.vx;
    p.y += p.vy;

    // Boundary bouncing
    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();

    // Line connections between near neighbors
    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j];
      const distance = Math.hypot(p.x - p2.x, p.y - p2.y);

      if (distance < 120) {
        ctx.lineWidth = 1 - distance / 120;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(renderMatrix);
}

window.addEventListener('resize', initCanvas);
initCanvas();
renderMatrix();

/* ==========================================================================
   2. Mobile Navigation Toggle
   ========================================================================== */
const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');

if (mobileToggle && navMenu) {
  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
    });
  });
}

/* ==========================================================================
   3. Real-Time Logistic Regression Inference Simulator
   ========================================================================== */
const sliderCredit = document.getElementById('slider-credit');
const sliderIncome = document.getElementById('slider-income');
const sliderDti = document.getElementById('slider-dti');

const valCredit = document.getElementById('val-credit');
const valIncome = document.getElementById('val-income');
const valDti = document.getElementById('val-dti');

const probDisplay = document.getElementById('prob-display');
const gaugeFill = document.getElementById('gauge-fill');
const verdictBadge = document.getElementById('verdict-badge');

function computeProbability() {
  const credit = parseFloat(sliderCredit.value);
  const income = parseFloat(sliderIncome.value);
  const dti = parseFloat(sliderDti.value);

  // Update DOM labels
  valCredit.textContent = credit;
  valIncome.textContent = income.toFixed(1);
  valDti.textContent = dti + '%';

  // Feature vector normalized with representative weights
  // z = w1*(normalized credit) + w2*(normalized income) - w3*(normalized DTI) + bias
  const z = ((credit - 580) / 100) * 1.35 +
            ((income - 10) / 10) * 0.90 -
            ((dti - 25) / 15) * 1.50 + 0.5;

  // Sigmoid transfer function
  const probability = 1 / (1 + Math.exp(-z));
  const finalPercentage = Math.min(Math.max(probability * 100, 2), 98.8).toFixed(1);

  // Update UI Elements
  probDisplay.textContent = finalPercentage + '%';
  gaugeFill.style.width = finalPercentage + '%';

  if (finalPercentage >= 65) {
    verdictBadge.textContent = "Eligible / Low Risk";
    verdictBadge.className = "result-badge badge-approved";
    gaugeFill.style.background = "var(--accent-green)";
  } else if (finalPercentage >= 45) {
    verdictBadge.textContent = "Review / Moderate Risk";
    verdictBadge.className = "result-badge badge-review";
    gaugeFill.style.background = "var(--accent-amber)";
  } else {
    verdictBadge.textContent = "Ineligible / High Risk";
    verdictBadge.className = "result-badge badge-denied";
    gaugeFill.style.background = "var(--accent-red)";
  }
}

[sliderCredit, sliderIncome, sliderDti].forEach(slider => {
  if (slider) slider.addEventListener('input', computeProbability);
});

// Run once on load
computeProbability();
  
