function showResult() {
  let correct = 0, wrong = 0, skip = 0;

  userAnswers.forEach((ans, i) => {
    if (ans === -1 || ans === null) skip++;
    else if (ans === questions[i].ans) correct++;
    else wrong++;
  });

  // Score formula: +4 correct, -1 wrong (like competitive exams)
  const score = (correct * 4) - (wrong * 1);
  const maxScore = questions.length * 4;
  const accuracy = Math.round(correct / (questions.length - skip || 1) * 100);

  document.getElementById('score-display').textContent = `${score} / ${maxScore}`;
  document.getElementById('stats').innerHTML = `
    <p>Correct: ${correct} | Wrong: ${wrong} | Skipped: ${skip}</p>
    <p>Accuracy: ${accuracy}%</p>
  `;

  show('result-screen');
}

// --- Answer review screen ---
function showReview() {
  // Loop through all questions and show what user answered vs correct
  questions.forEach((q, i) => {
    const ua = userAnswers[i];
    // Color the options: green = correct, red = user's wrong pick
  });
}