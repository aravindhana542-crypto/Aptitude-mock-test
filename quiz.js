let current = 0;
let userAnswers = [];   // stores what user picked for each question
let timerInterval = null;
let timeLeft = 15;

// --- Screen switching ---
function show(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}

// --- Start test ---
function startTest() {
  current = 0;
  userAnswers = new Array(questions.length).fill(null);
  show('quiz-screen');
  renderQuestion();
}

// --- Render a question ---
function renderQuestion() {
  clearInterval(timerInterval);         // reset any existing timer
  const q = questions[current];

  document.getElementById('q-text').textContent = q.q;
  document.getElementById('q-topic').textContent = q.topic;
  document.getElementById('q-number').textContent =
    `Question ${current + 1} of ${questions.length}`;

  // Build option buttons dynamically
  const container = document.getElementById('options-container');
  container.innerHTML = '';
  q.opts.forEach((opt, i) => {
    const btn = document.createElement('div');
    btn.className = 'option';
    btn.textContent = `${String.fromCharCode(65 + i)}. ${opt}`;  // A, B, C, D
    btn.onclick = () => selectAnswer(i);
    container.appendChild(btn);
  });

  // Hide explanation and next button
  document.getElementById('explanation').style.display = 'none';
  document.getElementById('next-btn').style.display = 'none';

  // Start the countdown timer
  timeLeft = 15;
  updateTimerBar();
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerBar();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      revealAnswer(null);   // time's up — auto-submit with no answer
    }
  }, 1000);
}

// --- Update timer bar width and color ---
function updateTimerBar() {
  const fill = document.getElementById('timer-fill');
  fill.style.width = (timeLeft / 15 * 100) + '%';
  fill.style.background = timeLeft <= 5 ? 'red' : timeLeft <= 8 ? 'orange' : 'blue';
}

// --- When user clicks an option ---
function selectAnswer(chosenIndex) {
  if (userAnswers[current] !== null) return;  // prevent double-click
  clearInterval(timerInterval);
  userAnswers[current] = chosenIndex;
  revealAnswer(chosenIndex);
}

// --- Show correct/wrong colors and explanation ---
function revealAnswer(chosen) {
  if (userAnswers[current] === null) userAnswers[current] = -1; // mark skipped
  const q = questions[current];

  document.querySelectorAll('.option').forEach((el, i) => {
    if (i === q.ans) el.classList.add('correct');
    else if (i === chosen) el.classList.add('wrong');
    el.style.pointerEvents = 'none';  // disable further clicks
  });

  const exp = document.getElementById('explanation');
  exp.textContent = '💡 ' + q.exp;
  exp.style.display = 'block';
  document.getElementById('next-btn').style.display = 'inline-block';
}

// --- Go to next question or end ---
function nextQuestion() {
  if (current < questions.length - 1) {
    current++;
    renderQuestion();
  } else {
    showResult();
  }
}