document.addEventListener("DOMContentLoaded", () => {
  // Calculator related stuff here (your existing code)
  // Category selection
  const categoryButtons = document.querySelectorAll('.category-btn');
  categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      updateCalculator();
    });
  });

  // Monthly orders slider
  const ordersInput = document.getElementById('orders');
  const orderValueLabel = document.getElementById('orderValue');
  ordersInput.value = 10; // default value roughly
  orderValueLabel.textContent = mapSliderToOrders(ordersInput.value);

  ordersInput.addEventListener('input', () => {
    orderValueLabel.textContent = mapSliderToOrders(ordersInput.value);
    updateCalculator();
  });

  function mapSliderToOrders(value) {
    // Map 0-40 slider to shipment volumes, e.g., 0 to 40k orders
    return (value * 1000).toLocaleString();
  }

  // Dummy updateCalculator function for now
  function updateCalculator() {
    // Here you update challenges, quirks, uplift etc based on category & orders
    // For demo, just console log
    const category = document.querySelector('.category-btn.selected').dataset.category;
    const orders = ordersInput.value * 1000;
    console.log('Update calculator with:', category, orders);
  }

  updateCalculator();

  // Snake tracker scroll effect
  const snakeProgress = document.getElementById('snakeProgress');
  const pathLength = 1000; // SVG path length (approx)
  snakeProgress.style.strokeDasharray = pathLength;
  snakeProgress.style.strokeDashoffset = pathLength;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = Math.min(scrollTop / docHeight, 1);
    const drawLength = pathLength * scrollPercent;
    snakeProgress.style.strokeDashoffset = pathLength - drawLength;
  });
});
