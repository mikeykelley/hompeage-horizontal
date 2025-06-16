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

  const categoryButtons = document.querySelectorAll(".category-btn");
  const challengesContainer = document.getElementById("challengesContainer");
  const quirksContainer = document.getElementById("quirksContainer");
  const similarBusinessesContainer = document.getElementById("similarBusinesses");
  const upliftAmountEl = document.getElementById("upliftAmount");
  const ordersRange = document.getElementById("orders-range");
  const orderValueLabel = document.getElementById("orderValue");

  let selectedCategory = "Fashion & Apparel";

  function updateContent() {
    // Monthly orders is slider value * 250 (0 to 40 * 250 = 0 to 10,000)
    const ordersCount = parseInt(ordersRange.value) * 250;
    orderValueLabel.textContent = ordersCount.toLocaleString();

    const data = categories[selectedCategory];

    // Challenges list
    challengesContainer.innerHTML = "";
    data.challenges.forEach(challenge => {
      const li = document.createElement("li");
      li.textContent = challenge;
      challengesContainer.appendChild(li);
    });

    // Quirks list
    quirksContainer.innerHTML = "";
    data.quirks.forEach(quirk => {
      const li = document.createElement("li");
      li.textContent = quirk;
      quirksContainer.appendChild(li);
    });

    // Estimated yearly missed revenue = monthly orders * missedRevenuePerOrder * 12
    const yearlyMissed = ordersCount * data.missedRevenuePerOrder * 12;
    upliftAmountEl.textContent = `£${yearlyMissed.toLocaleString()}`;

    // Similar businesses
    similarBusinessesContainer.innerHTML = "";
    if (data.similar.length) {
      const heading = document.createElement("p");
      heading.textContent = "Similar businesses to yours:";
      heading.style.fontWeight = "600";
      heading.style.marginBottom = "8px";
      similarBusinessesContainer.appendChild(heading);

      data.similar.forEach(name => {
        const div = document.createElement("div");
        div.classList.add("business-box");
        div.textContent = name;
        similarBusinessesContainer.appendChild(div);
      });
    }
  }

  categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("selected")) return;
      categoryButtons.forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      selectedCategory = btn.getAttribute("data-category");
      updateContent();
    });
  });

  ordersRange.addEventListener("input", updateContent);

  // Initialize on load
  updateContent();
})();
