document.addEventListener("DOMContentLoaded", () => {
  // 1. Dynamic Year
  const yearElement = document.getElementById("currentYear");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Ambient Cursor Lighting (Follows Mouse pointer smoothly)
  const ambientGlow = document.getElementById("ambientGlow");
  window.addEventListener("pointermove", (e) => {
    if (!ambientGlow) return;
    ambientGlow.style.left = `${e.clientX}px`;
    ambientGlow.style.top = `${e.clientY}px`;
  });

  // 3. Responsive Navigation Toggle
  const mobileToggle = document.getElementById("mobileToggle");
  const navMenu = document.getElementById("navMenu");

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      const spans = mobileToggle.querySelectorAll("span");
      if (navMenu.classList.contains("open")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 6px)";
        spans[1].style.transform = "rotate(-45deg) translate(5px, -6px)";
      } else {
        spans[0].style.transform = "none";
        spans[1].style.transform = "none";
      }
    });

    // Close menu when clicking navigation links
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        const spans = mobileToggle.querySelectorAll("span");
        spans[0].style.transform = "none";
        spans[1].style.transform = "none";
      });
    });
  }

  // 4. Interactive Credit Scoring Sandbox (Simulated Logistic Inference)
  const cibilInput = document.getElementById("cibil");
  const incomeInput = document.getElementById("income");
  const dtiInput = document.getElementById("dti");

  const cibilVal = document.getElementById("cibilVal");
  const incomeVal = document.getElementById("incomeVal");
  const dtiVal = document.getElementById("dtiVal");

  const riskPctDisplay = document.getElementById("riskPct");
  const verdictBadge = document.getElementById("verdictBadge");

  function calculateRiskScore() {
    if (!cibilInput || !incomeInput || !dtiInput) return;

    const cibil = parseFloat(cibilInput.value);
    const income = parseFloat(incomeInput.value);
    const dti = parseFloat(dtiInput.value);

    // Update real-time label outputs
    cibilVal.textContent = cibil;
    incomeVal.textContent = income;
    dtiVal.textContent = `${dti}%`;

    // Mathematical logistic risk estimation weights
    // Lower CIBIL raises risk, higher DTI raises risk, higher income provides safety
    const normalizedCibil = (cibil - 300) / 600; // 0 to 1
    const normalizedIncome = Math.min(income / 40, 1); // Cap at 40 LPA
    const normalizedDti = dti / 100; // 0 to 0.8

    // Risk index formula
    let rawRisk = 0.55 - normalizedCibil * 0.65 + normalizedDti * 0.45 - normalizedIncome * 0.2;
    rawRisk = Math.max(0.04, Math.min(0.96, rawRisk)); // Bound between 4% and 96%

    const riskPercentage = Math.round(rawRisk * 100);
    riskPctDisplay.textContent = `${riskPercentage}%`;

    // Dynamic thresholds and UI feedback
    if (riskPercentage < 30) {
      riskPctDisplay.style.color = "var(--accent-green)";
      verdictBadge.textContent = "Eligible for Automated Approval";
      verdictBadge.style.color = "var(--accent-green)";
      verdictBadge.style.backgroundColor = "rgba(52, 211, 153, 0.15)";
      verdictBadge.style.borderColor = "rgba(52, 211, 153, 0.3)";
    } else if (riskPercentage <= 55) {
      riskPctDisplay.style.color = "var(--accent-amber)";
      verdictBadge.textContent = "Requires Manual Underwriting Review";
      verdictBadge.style.color = "var(--accent-amber)";
      verdictBadge.style.backgroundColor = "rgba(251, 191, 36, 0.15)";
      verdictBadge.style.borderColor = "rgba(251, 191, 36, 0.3)";
    } else {
      riskPctDisplay.style.color = "var(--accent-red)";
      verdictBadge.textContent = "High Default Probability — Declined";
      verdictBadge.style.color = "var(--accent-red)";
      verdictBadge.style.backgroundColor = "rgba(248, 113, 113, 0.15)";
      verdictBadge.style.borderColor = "rgba(248, 113, 113, 0.3)";
    }
  }

  [cibilInput, incomeInput, dtiInput].forEach((input) => {
    if (input) {
      input.addEventListener("input", calculateRiskScore);
    }
  });

  // Run calculation once on load
  calculateRiskScore();

  // 5. One-Click Copy Email to Clipboard
  const copyBtn = document.getElementById("copyBtn");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const email = "santhakumar.aids@gmail.com";
      navigator.clipboard.writeText(email).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = "Copied to Clipboard!";
        copyBtn.style.color = "var(--accent-cyan)";
        setTimeout(() => {
          copyBtn.textContent = originalText;
          copyBtn.style.color = "";
        }, 2200);
      });
    });
  }
});
