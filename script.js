// Elements
const categoryButtons = document.querySelectorAll('.category-btn');
const ordersSlider = document.getElementById('orders');
const orderValueDisplay = document.getElementById('orderValue');
const challengesContainer = document.getElementById('challengesContainer');
const quirksContainer = document.getElementById('quirksContainer');
const revenueBox = document.getElementById('size-of-problem');
const upliftAmount = revenueBox.querySelector('.amount');

const snakePath = document.getElementById('snake-path');
const dots = document.querySelectorAll('.progress-dots .dot');

const maxDashOffset = 1600; // approx length of snake path
const scrollStart = 0; // scroll top start
const scrollEnd = document.body.scrollHeight - window.innerHeight; // scroll max

// Example data for challenges and quirks per category and volume
const data = {
  "Fashion & Apparel": {
    challenges: [
      "High return rates increase processing time",
      "Sizing errors lead to customer dissatisfaction",
      "Complex inventory with multiple variants"
    ],
    quirks: [
      "Seasonal spikes in demand",
      "Multiple SKUs per product"
    ],
    revenueImpact: 12000
  },
  "Food & Drink": {
    challenges: [
      "Perishable goods require fast shipping",
      "Strict packaging compliance",
      "Temperature control logistics"
    ],
    quirks: [
      "Variable order size",
      "Peak during holidays"
    ],
    revenueImpact: 8000
  },
  "Health & Beauty": {
    challenges: [
      "Regulatory compliance in shipping",
      "Delicate packaging requirements",
      "Sensitive to delivery delays"
    ],
    quirks: [
      "Fragile items",
      "Subscription renewals impact volume"
    ],
    revenueImpact: 9500
  },
  "Other": {
    challenges: [
      "Varied product types complicate fulfillment",
      "Unpredictable demand",
      "Multiple delivery partners"
    ],
    quirks: [
      "Diverse inventory",
      "Multiple sales channels"
    ],
    revenueImpact: 7000
  }
};

let currentCategory = "Fashion & Apparel";

function updateCategorySelection(selectedBtn) {
  categoryButtons.forEach(btn => btn.classList.remove('selected'));
  selectedBtn.classList.add('selected');
  currentCategory = selectedBtn.dataset.category;
  updateUI();
}

categoryButtons.forEach(btn =>
  btn.addEventListener('click', () => updateCategorySelection(btn))
);

ordersSlider.value = 250 / 10; // slider 0-40 step = monthly orders from 0 to 400 approx
orderValueDisplay.textContent = "250";

ordersSlider.addEventListener('input', () => {
  const monthlyOrders = Math.round(ordersSlider.value * 10);
  orderValueDisplay.textContent = monthlyOrders;
  updateUI();
});

function updateUI() {
  // Show challenges
  challengesContainer.innerHTML = "";
  quirksContainer.innerHTML = "";

  const cdata = data[currentCategory];

  // Add challenges
  cdata.challenges.forEach(ch => {
    const li = document.createElement('li');
    li.textContent = ch;
    challengesContainer.appendChild(li);
  });

  // Add quirks
  cdata.quirks.forEach(q => {
    const li = document.createElement('li');
    li.textContent = q;
    quirksContainer.appendChild(li);
  });

  // Update revenue uplift (scaled by monthly orders, for example)
  const monthlyOrders = Math.round(ordersSlider.value * 10);
  const estimatedAnnualMissed = cdata.revenueImpact * (monthlyOrders / 250);
  const roundedEst = Math.round(estimatedAnnualMissed / 100) * 100;
  upliftAmount.textContent = `£${roundedEst.toLocaleString()}`;
  revenueBox.setAttribute('data-value', roundedEst);
}

// Scroll-based snake animation
function updateSnakeOnScroll() {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  let scrollPercent = scrollTop / docHeight;
  if (scrollPercent > 1) scrollPercent = 1;
  if (scrollPercent < 0) scrollPercent = 0;

  // Calculate dashoffset based on scroll percent
  const dashOffset = maxDashOffset * (1 - scrollPercent);
  snakePath.style.strokeDashoffset = dashOffset;

  // Update active dot based on scrollPercent segments (9 dots)
  const activeIndex = Math.min(
    dots.length - 1,
    Math.floor(scrollPercent * (dots.length - 1))
  );

  dots.forEach((dot, i) => {
    if (i === activeIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// Initialize UI
updateUI();
updateSnakeOnScroll();

// Listen for scroll events to update snake
window.addEventListener('scroll', updateSnakeOnScroll);
