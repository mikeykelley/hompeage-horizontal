// Example: control variable for progress (1 to 3)
let progress = 1; // change this dynamically in your app

const snakeLineFill = document.querySelector('.snake-line-fill');
const snakeSteps = document.querySelectorAll('.snake-step');

function updateSnakeProgress(progress) {
  // Clamp progress between 1 and number of steps
  const maxSteps = snakeSteps.length;
  progress = Math.min(Math.max(progress, 1), maxSteps);

  // Update active steps
  snakeSteps.forEach((step, index) => {
    if (index < progress) {
      step.classList.add('active');
    } else {
      step.classList.remove('active');
    }
  });

  // Calculate fill height % (steps fill evenly spaced)
  // Fill from bottom, so fill height = (progress - 1) / (maxSteps - 1) * 100%
  if (maxSteps > 1) {
    const fillPercent = ((progress - 1) / (maxSteps - 1)) * 100;
    snakeLineFill.style.height = fillPercent + '%';
  } else {
    snakeLineFill.style.height = '0%';
  }
}

// Example: update the tracker every 3 seconds cycling steps 1 to 3 (demo)
let demoProgress = 1;
setInterval(() => {
  updateSnakeProgress(demoProgress);
  demoProgress++;
  if (demoProgress > 3) demoProgress = 1;
}, 3000);

// Call once at start to initialize
updateSnakeProgress(progress);
