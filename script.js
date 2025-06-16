(() => {
  const categories = {
    "Fashion & Apparel": {
      challenges: [
        "High return rates due to sizing issues",
        "Managing multiple courier services",
        "Seasonal demand spikes",
      ],
      quirks: [
        "Fast fashion trends change quickly",
        "Inventory turnover is rapid",
      ],
      missedRevenuePerOrder: 15,
      similar: ["Brand A", "Brand B", "Brand C"],
    },
    "Food & Drink": {
      challenges: [
        "Perishable stock handling",
        "Strict delivery time windows",
        "Complex multi-location fulfillment",
      ],
      quirks: [
        "High demand on weekends",
        "Packaging compliance requirements",
      ],
      missedRevenuePerOrder: 20,
      similar: ["FoodCo", "TasteBuds", "Yummy Corp"],
    },
    "Health & Beauty": {
      challenges: [
        "Sensitive product storage",
        "Regulatory packaging rules",
        "Demand forecasting is difficult",
      ],
      quirks: [
        "Product launches impact logistics",
        "Customer loyalty programs",
      ],
      missedRevenuePerOrder: 18,
      similar: ["BeautyBrand", "GlowUp", "HealthPro"],
    },
    Other: {
      challenges: [
        "Diverse product categories",
        "Unpredictable order sizes",
        "Vendor coordination complexity",
      ],
      quirks: [
        "Custom orders often",
        "Multi-channel sales",
      ],
      missedRevenuePerOrder: 12,
      similar: ["MultiStore", "GeneralShop", "VarietyInc"],
    },
  };

  // Get DOM refs
  const categoryButtons = document.querySelectorAll(".category-btn");
  const challengesContainer = document.getElementById("challengesContainer");
  const quirksContainer = document.getElementById("quirksContainer");
  const similarBusinessesContainer = document.getElementById("similarBusinesses");
  const upliftAmountEl = document.querySelector(".uplift-amount .amount");
  const ordersRange = document.getElementById("orders-range");
  const orderValueLabel = document.getElementById("orderValue");

  let selectedCategory = "Fashion & Apparel";

  // Update dynamic content based on current selections
  function updateContent() {
    const ordersCount = parseInt(ordersRange.value) * 250; // slider * 250 = approx monthly orders
    orderValueLabel.textContent = ordersCount.toLocaleString();

    const data = categories[selectedCategory];

    // Update challenges list
    challengesContainer.innerHTML = "";
    data.challenges.forEach((challenge) => {
      const li = document.createElement("li");
      li.textContent = challenge;
      challengesContainer.appendChild(li);
    });

    // Update quirks list
    quirksContainer.innerHTML = "";
    data.quirks.forEach((quirk) => {
      const li = document.createElement("li");
      li.textContent = quirk;
      quirksContainer.appendChild(li);
    });

    // Update estimated missed revenue (orders * missedRevenuePerOrder * 12 months)
    const yearlyMissed = ordersCount * data.missedRevenuePerOrder * 12;
    upliftAmountEl.textContent = `£${yearlyMissed.toLocaleString()}`;

    // Update similar businesses
    similarBusinessesContainer.innerHTML = "";
    if (data.similar.length > 0) {
      const heading = document.createElement("p");
      heading.textContent = "Similar businesses to yours:";
      heading.style.fontWeight = "600";
      heading.style.marginBottom = "8px";
      similarBusinessesContainer.appendChild(heading);

      data.similar.forEach((name) => {
        const div = document.createElement("div");
        div.classList.add("business-box");
        div.textContent = name;
        similarBusinessesContainer.appendChild(div);
      });
    }
  }

  // Handle category button click
  categoryButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("selected")) return;
      categoryButtons.forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      selectedCategory = btn.getAttribute("data-category");
      updateContent();
    });
  });

  // Handle range slider change
  ordersRange.addEventListener("input", updateContent);

  // Initial load
  updateContent();
})();
