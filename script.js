document.addEventListener("DOMContentLoaded", () => {
  const categories = {
    "Fashion & Apparel": {
      challenges: [
        "High return rates slow your fulfilment",
        "Size and style variations increase errors",
        "Seasonal demand spikes cause stress"
      ],
      quirks: [
        "Complex sizing charts",
        "Frequent promotions",
        "Multiple SKUs per style"
      ],
      uplift: 12000
    },
    "Food & Drink": {
      challenges: [
        "Perishability demands fast turnaround",
        "Temperature control increases costs",
        "Strict packaging requirements"
      ],
      quirks: [
        "Short shelf life",
        "Custom packaging",
        "Regulatory compliance"
      ],
      uplift: 9000
    },
    "Health & Beauty": {
      challenges: [
        "Strict labelling and regulations",
        "High SKU diversity",
        "Seasonal trends affect stock levels"
      ],
      quirks: [
        "Sensitive products handling",
        "Batch tracking",
        "Customer allergies"
      ],
      uplift: 10000
    },
    Other: {
      challenges: [
        "General shipping delays",
        "Inventory inaccuracies",
        "Customer communication gaps"
      ],
      quirks: [
        "Varied product types",
        "Multiple warehouse locations",
        "Complex shipping zones"
      ],
      uplift: 8000
    }
  };

  // Elements
  const categoryButtons = document.querySelectorAll(".category-btn");
  const orderSlider = document.getElementById("orders");
  const orderValueDisplay = document.getElementById("orderValue");
  const challengesContainer = document.getElementById("challengesContainer");
  const quirksContainer = document.getElementById("quirksContainer");
  const upliftAmount = document.querySelector(".uplift-amount .amount");

  // Current state
  let currentCategory = "Fashion & Apparel";
  let currentOrders = 250;

  // Initialize slider max and step based on your previous slider settings
  // (You can adjust max value and steps here as needed)
  orderSlider.min = 0;
  orderSlider.max = 40;
  orderSlider.step = 1;

  // Convert slider value (0-40) to actual monthly shipment volume:
  // For demo, we multiply by 50 + base 250, so 0 = 250 orders, max = 40*50+250=2250
  function calculateOrdersFromSlider(value) {
    return 250 + value * 50;
  }

  // Update displayed shipment volume
  function updateOrderDisplay(value) {
    orderValueDisplay.textContent = value.toLocaleString();
  }

  // Update challenges list
  function updateChallenges(category) {
    challengesContainer.innerHTML = "";
    categories[category].challenges.forEach(challenge => {
      const li = document.createElement("li");
      li.textContent = challenge;
      challengesContainer.appendChild(li);
    });
  }

  // Update quirks list
  function updateQuirks(category) {
    quirksContainer.innerHTML = "";
    categories[category].quirks.forEach(quirk => {
      const li = document.createElement("li");
      li.textContent = quirk;
      quirksContainer.appendChild(li);
    });
  }

  // Update revenue uplift
  function updateUplift(category, orders) {
    // Simple formula: uplift * (orders / 1000)
    const baseUplift = categories[category].uplift;
    const estimatedUplift = Math.round(baseUplift * (orders / 1000));
    upliftAmount.textContent = `£${estimatedUplift.toLocaleString()}`;
  }

  // Set selected category button styling
  function updateCategorySelection(newCategory) {
    categoryButtons.forEach(btn => {
      if (btn.dataset.category === newCategory) {
        btn.classList.add("selected");
      } else {
        btn.classList.remove("selected");
      }
    });
  }

  // On category button click
  categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const selected = btn.dataset.category;
      if (selected !== currentCategory) {
        currentCategory = selected;
        updateCategorySelection(currentCategory);
        updateChallenges(currentCategory);
        updateQuirks(currentCategory);
        updateUplift(currentCategory, currentOrders);
      }
    });
  });

  // On slider change
  orderSlider.addEventListener("input", () => {
    currentOrders = calculateOrdersFromSlider(orderSlider.value);
    updateOrderDisplay(currentOrders);
    updateUplift(currentCategory, currentOrders);
  });

  // Initialize UI
  function init() {
    updateCategorySelection(currentCategory);
    currentOrders = calculateOrdersFromSlider(orderSlider.value);
    updateOrderDisplay(currentOrders);
    updateChallenges(currentCategory);
    updateQuirks(currentCategory);
    updateUplift(currentCategory, currentOrders);
  }

  init();
});
