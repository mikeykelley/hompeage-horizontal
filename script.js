document.addEventListener("DOMContentLoaded", () => {
  // Data and constants
  const baseMultipliers = [1, 2, 3];
  const categoryQuirks = {
    "Fashion & Apparel": ["🔄 Frequent returns", "📏 Sizing complexity"],
    "Food & Drink": [
      "🔗 Integrating with third party apps e.g. Bundles/Subscriptions",
      "🍷 Age verification deliveries",
      "❄️ Temperature controlled deliveries",
    ],
    "Health & Beauty": ["⚠️ Hazardous goods restrictions", "🎁 Sensitive packaging"],
    Other: ["⚖️ Bulky items", "⏰ Irregular delivery times"],
  };

  const categories = {
    "Fashion & Apparel": {
      similarBusiness: {
        name: "Holland's Country Clothing",
        image:
          "https://cdn.prod.website-files.com/66977bd785453b9d7b04a8bc/66b4ac80a2384710e0e4b73b_Holland%27s%20Country%20Clothing-p-500.png",
        url: "https://www.zenstores.com/case-study/hollands-country-clothing",
      },
    },
    "Food & Drink": {
      similarBusiness: {
        name: "Arbor Ales",
        image:
          "https://cdn.prod.website-files.com/66977bd785453b9d7b04a8bc/66b4b425b091117c133ee9ac_case-study-arbor-ales-p-800.png",
        url: "https://www.zenstores.com/case-study/arbor-ales",
      },
    },
    "Health & Beauty": {
      similarBusiness: {
        name: "The Vitamin",
        image:
          "https://cdn.prod.website-files.com/66977bd785453b9d7b04a8bc/66b4b67b0341cd7e7e5e941a_The%20Vitamin-p-500.png",
        url: "https://www.zenstores.com/case-study/the-vitamin",
      },
    },
    Other: {
      similarBusiness: {
        name: "FNX Bathrooms",
        image:
          "https://cdn.prod.website-files.com/66977bd785453b9d7b04a8bc/66b477a18735bf49ed0e7737_FNX%20Bathrooms.png",
        url: "https://www.zenstores.com/case-study/fnx-bathrooms",
      },
    },
  };

  // Selected category default
  let selectedCategory = "Fashion & Apparel";

  // Elements
  const ordersSlider = document.getElementById("orders");
  const orderValue = document.getElementById("orderValue");
  const personaMessage = document.getElementById("personaMessage");
  const challengesContainer = document.getElementById("challengesContainer");
  const quirksContainer = document.getElementById("quirksContainer");
  const similarBusinessesContainer = document.getElementById("similarBusinesses");
  const categoryButtons = document.querySelectorAll(".category-btn");
  const sizeLine = document.getElementById("size-of-problem");
  const interactiveArea = document.getElementById("interactive-area");

  // === Glow effect on page load ===
  interactiveArea.classList.add("glow");

  function stopGlow() {
    interactiveArea.classList.remove("glow");
    categoryButtons.forEach((btn) => btn.removeEventListener("click", stopGlow));
    ordersSlider.removeEventListener("input", stopGlow);
  }

  categoryButtons.forEach((btn) => btn.addEventListener("click", stopGlow));
  ordersSlider.addEventListener("input", stopGlow);

  // Get estimated monthly orders count from slider value
  function getOrderCount(v) {
    if (v <= 10) return v * 250;
    if (v <= 25) return 2500 + (v - 10) * 500;
    return 10000 + (v - 25) * 1000;
  }

  // Animate numbers with prefix
  function animateValue(el, start, end, duration = 800, prefix = "£") {
    let startTime = null;
    const step = (t) => {
      if (!startTime) startTime = t;
      const progress = Math.min((t - startTime) / duration, 1);
      const value = Math.floor(start + (end - start) * progress);
      el.textContent = `${prefix}${value.toLocaleString()}`;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  // Update UI on slider or category change
  function updateUI() {
    const v = parseInt(ordersSlider.value, 10);
    const count = getOrderCount(v);

    // Update slider numeric display
    orderValue.textContent = count.toLocaleString();

    // Challenges calculation and display
    challengesContainer.innerHTML = "";
    let total = 0;

    baseMultipliers.forEach((_, i) => {
      const prevSpan = document.getElementById(`challenge-${i}`);
      const prevVal = prevSpan?.dataset?.value * 1 || 0;
      let val;

      if (i === 0) {
        // Manual or poor fulfilment time savings
        const oldTime = count / 15; // hours
        const newTime = count / 60; // hours
        const wage = 12; // hourly wage £
        val = Math.round((oldTime - newTime) * wage);
      } else if (i === 1) {
        // Pick & Pack error cost savings
        const errorRateCurrent = 0.02;
        const errorRateOptimised = 0.005;
        const costPerError = 50;
        val = Math.round(
          count * errorRateCurrent * costPerError -
            count * errorRateOptimised * costPerError
        );
      } else if (i === 2) {
        // Missed orders due to delivery experience uplift
        const aov = 50;
        const baselineConversionRate = 0.03;
        const upliftedConversionRate = baselineConversionRate * 1.05;
        const visitors = count / baselineConversionRate;
        const newOrders = visitors * upliftedConversionRate;
        const extraOrders = Math.round(newOrders - count);
        val = extraOrders * aov;
      }

      total += val;

      const li = document.createElement("li");
      const span = document.createElement("span");
      span.id = `challenge-${i}`;
      span.dataset.value = val;
      li.innerHTML = `<strong>${
        [
          "🛠️ Manual or poor fitting fulfilment solutions",
          "📦 Pick & Pack errors",
          "❌ Missed orders due to poor delivery experience",
        ][i]
      }:</strong> `;
      li.appendChild(span);
      challengesContainer.appendChild(li);
      animateValue(span, prevVal, val);
    });

    // Update total size of prize line with animation
    const prevTotal = sizeLine.dataset.value * 1 || 0;
    sizeLine.dataset.value = total;
    let vs = sizeLine.querySelector("span");
    if (!vs) {
      vs = document.createElement("span");
      sizeLine.textContent = "Size of the prize: ";
      sizeLine.appendChild(vs);
    }
    animateValue(vs, prevTotal, total);

    // Quirks update
    quirksContainer.innerHTML = "";
    const quirksHeading = document.getElementById("quirksHeading");
    if (quirksHeading) {
      quirksHeading.textContent =
        selectedCategory === "Other"
          ? "What we often hear from ecommerce brands"
          : `What makes ${selectedCategory} fulfilment tricky?`;
    }
    (categoryQuirks[selectedCategory] || []).forEach((q) => {
      const li = document.createElement("li");
      li.textContent = q;
      quirksContainer.appendChild(li);
    });

    // Similar business card update
    similarBusinessesContainer.innerHTML = "";
    const heading = document.createElement("h4");
    heading.textContent =
      selectedCategory === "Other"
        ? "Other brands we've helped"
        : `Other ${selectedCategory} brands we've helped`;
    similarBusinessesContainer.appendChild(heading);

    const biz = categories[selectedCategory]?.similarBusiness;
    if (biz) {
      const a = document.createElement("a");
      a.href = biz.url;
      a.target = "_blank";
      a.classList.add("case-study-card");
      const img = document.createElement("img");
      img.src = biz.image;
      img.alt = biz.name;
      a.appendChild(img);
      similarBusinessesContainer.appendChild(a);
    }
  }

  // === Snake scroll animation ===
  const snakeWrapper = document.getElementById("snakeWrapper");
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const viewportHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    // Calculate progress 0-1 based on scroll position relative to snakeWrapper offset top and height
    const rect = snakeWrapper.getBoundingClientRect();
    const offsetTop = scrollY + rect.top; // element offset from top of doc
    const height = rect.height;

    let progress = (scrollY + viewportHeight - offsetTop) / (height + viewportHeight);
    progress = Math.min(Math.max(progress, 0), 1); // clamp 0-1

    // Translate snake horizontally: from -100% (offscreen left) to 0 (onscreen)
    const translateXPercent = -100 + progress * 100;
    snakeWrapper.style.transform = `translateX(${translateXPercent}%)`;
  });

  // === Event listeners ===
  let debounceTimeout;

  ordersSlider.addEventListener("input", () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      updateUI();
    }, 250);
  });

  categoryButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      categoryButtons.forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      selectedCategory = btn.dataset.category;
      updateUI();
    });
  });

  // Initial UI render
  updateUI();
});
