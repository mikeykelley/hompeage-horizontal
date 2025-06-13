document.addEventListener("DOMContentLoaded", () => {
  const baseMultipliers = [1, 2, 3];
  const categoryQuirks = {
    "Fashion & Apparel": ["🔄 Frequent returns", "📏 Sizing complexity"],
    "Food & Drink": ["🔗 Integrating with third party apps e.g. Bundles/Subscriptions", "🍷 Age verification deliveries", "❄️ Temperature controlled deliveries"],
    "Health & Beauty": ["⚠️ Hazardous goods restrictions", "🎁 Sensitive packaging"],
    "Other": ["⚖️ Bulky items", "⏰ Irregular delivery times"]
  };

  const categories = {
    "Fashion & Apparel": {
      similarBusiness: {
        name: "Holland's Country Clothing",
        image: "https://cdn.prod.website-files.com/66977bd785453b9d7b04a8bc/66b4ac80a2384710e0e4b73b_Holland%27s%20Country%20Clothing-p-500.png",
        url: "https://www.zenstores.com/case-study/hollands-country-clothing"
      }
    },
    "Food & Drink": {
      similarBusiness: {
        name: "Arbor Ales",
        image: "https://cdn.prod.website-files.com/66977bd785453b9d7b04a8bc/66b4b425b091117c133ee9ac_case-study-arbor-ales-p-800.png",
        url: "https://www.zenstores.com/case-study/arbor-ales"
      }
    },
    "Health & Beauty": {
      similarBusiness: {
        name: "The Vitamin",
        image: "https://cdn.prod.website-files.com/66977bd785453b9d7b04a8bc/66b4b67b0341cd7e7e5e941a_The%20Vitamin-p-500.png",
        url: "https://www.zenstores.com/case-study/the-vitamin"
      }
    },
    "Other": {
      similarBusiness: {
        name: "FNX Bathrooms",
        image: "https://cdn.prod.website-files.com/66977bd785453b9d7b04a8bc/66b477a18735bf49ed0e7737_FNX%20Bathrooms.png",
        url: "https://www.zenstores.com/case-study/fnx-bathrooms"
      }
    }
  };

  let selectedCategory = "Fashion & Apparel";
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

  // Function to stop glow on first user interaction
  function stopGlow() {
    interactiveArea.classList.remove("glow");
    categoryButtons.forEach(btn => btn.removeEventListener("click", stopGlow));
    ordersSlider.removeEventListener("input", stopGlow);
  }

  // Stop glow on any category button click
  categoryButtons.forEach(btn => btn.addEventListener("click", stopGlow));

  // Stop glow on slider input change
  ordersSlider.addEventListener("input", stopGlow);

  // === Your existing functions ===

  function getOrderCount(v) {
    if (v <= 10) return v * 250;
    if (v <= 25) return 2500 + (v - 10) * 500;
    return 10000 + (v - 25) * 1000;
  }

  function animateValue(el, start, end, duration = 800, prefix = "£") {
    let startTime = null;
    const step = (t) => {
      if (!startTime) startTime = t;
      const prog = Math.min((t - startTime) / duration, 1);
      const value = Math.floor(start + (end - start) * prog);
      el.textContent = `${prefix}${value.toLocaleString()}`;
      if (prog < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function updateUI() {
    const v = parseInt(ordersSlider.value);
    const count = getOrderCount(v);
    orderValue.textContent = count.toLocaleString();

    // Challenges
    challengesContainer.innerHTML = "";
    let total = 0;

    baseMultipliers.forEach((mult, i) => {
      const prev = document.getElementById(`challenge-${i}`);
      const prevVal = prev?.dataset?.value * 1 || 0;
      let val;

      if (i === 0) {
        // Challenge 1: Manual or poor fitting fulfilment solutions
        const oldTime = count / 15;
        const newTime = count / 60;
        const wage = 12;
        val = Math.round((oldTime - newTime) * wage);
      } else if (i === 1) {
        // Challenge 2: Pick & Pack errors
        const errorRateCurrent = 0.02;
        const errorRateOptimised = 0.005;
        const costPerError = 50;
        val = Math.round((count * errorRateCurrent * costPerError) - (count * errorRateOptimised * costPerError));
      } else if (i === 2) {
        // Challenge 3: Missed orders due to poor delivery experience
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
      li.innerHTML = `<strong>${["🛠️ Manual or poor fitting fulfilment solutions", "📦 Pick & Pack errors", "❌ Missed orders due to poor delivery experience"][i]}:</strong> `;
      li.appendChild(span);
      challengesContainer.appendChild(li);
      animateValue(span, prevVal, val);
    });

    // Total size of the prize
    const prevTot = sizeLine.dataset.value * 1 || 0;
    sizeLine.dataset.value = total;
    let vs = sizeLine.querySelector("span");
    if (!vs) {
      vs = document.createElement("span");
      sizeLine.textContent = "Size of the prize: ";
      sizeLine.appendChild(vs);
    }
    animateValue(vs, prevTot, total);

    // Quirks
    quirksContainer.innerHTML = "";
    const quirksHeading = document.getElementById("quirksHeading");
    if (quirksHeading) {
      quirksHeading.textContent =
        selectedCategory === "Other"
          ? "What we often hear from ecommerce brands"
          : `What makes ${selectedCategory} fulfilment tricky?`;
    }

    (categoryQuirks[selectedCategory] || []).forEach(q => {
      const li = document.createElement("li");
      li.textContent = q;
      quirksContainer.appendChild(li);
    });

    // Similar business
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

  // Attach UI events
let debounceTimeout;

ordersSlider.addEventListener("input", () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    updateUI();
  }, 250); // delay in ms
});

  categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      categoryButtons.forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      selectedCategory = btn.dataset.category;
      updateUI();
    });
  });

  // Initial render
  updateUI();
});
