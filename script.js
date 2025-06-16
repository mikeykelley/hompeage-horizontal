<script>
  let counterEl = document.getElementById("counter");
  let value = 0;
  let max = 12500; // Target value (e.g., £12,500 in wasted revenue)
  let speed = 30;  // Adjust for animation speed

  function updateCounter() {
    if (value < max) {
      value += Math.ceil((max - value) / 20); // Smooth increment
      counterEl.innerText = `£${value.toLocaleString()}`;
      requestAnimationFrame(updateCounter);
    }
  }

  // Start counter when in view (basic trigger)
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(updateCounter, 500); // Or use Intersection Observer
  });
</script>
