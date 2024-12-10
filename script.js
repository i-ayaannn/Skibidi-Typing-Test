const typingArea = document.getElementById('typing-area');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const timerElement = document.getElementById('timer');
const speedElement = document.getElementById('speed');
const accuracyElement = document.getElementById('accuracy');
const testTextElement = document.getElementById('test-text');

const paragraphs = [
  `Typing is an essential skill in the modern digital age. The ability to type quickly and accurately can significantly improve productivity and efficiency. Practice makes perfect, and regular typing tests are a great way to hone this skill. Whether you are composing emails, coding, or writing a novel, typing fluently helps you focus on the task at hand without being distracted by the mechanics of typing itself. Over time, you will notice improvements in your speed and confidence.`,
  `The quick brown fox jumps over the lazy dog. This sentence is often used to test typing speed and accuracy because it contains every letter of the English alphabet. Mastering this simple sentence can significantly improve your keyboard skills. Typing is not just about speed but also about accuracy, which plays a crucial role in avoiding errors in professional work.`,
  `In the fast-paced world of technology, typing has become a fundamental skill for everyone. From students to professionals, the ability to type efficiently is vital for success. As you practice typing, remember to maintain a proper posture and use all your fingers to achieve maximum speed and accuracy. With consistent effort, typing can become an effortless skill.`,
  `Learning to type is one of the most valuable skills you can acquire. It not only improves your productivity but also allows you to communicate more effectively in the digital world. Whether you're taking notes, writing a blog, or coding, fast and accurate typing ensures that your ideas flow seamlessly onto the screen.`,
  `The art of typing goes beyond just pressing keys on a keyboard. It requires focus, discipline, and practice. Over time, you will find that typing becomes second nature, allowing you to express your thoughts freely. By taking regular typing tests and challenging yourself, you can track your progress and set new personal records.`
];

let words = [];
let timer;
let timeLeft = 60;
let correctWords = 0;
let typedWords = 0;
let isTestActive = false;

function getRandomParagraph() {
  return paragraphs[Math.floor(Math.random() * paragraphs.length)];
}

function renderTestText() {
  testTextElement.innerHTML = words
    .map((word, i) => `<span id="word-${i}">${word} </span>`)
    .join('');
}

function startTest() {
  if (isTestActive) return;

  isTestActive = true;
  typingArea.disabled = false;
  typingArea.value = '';
  typingArea.focus();

  correctWords = 0;
  typedWords = 0;
  timeLeft = 60;

  const randomParagraph = getRandomParagraph();
  words = randomParagraph.split(' ');

  renderTestText();
  updateStats();

  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Time left: ${timeLeft}s`;
    if (timeLeft === 0) {
      clearInterval(timer);
      endTest();
    }
  }, 1000);
}

function endTest() {
  isTestActive = false;
  typingArea.disabled = true;
  updateStats();
}

function updateStats() {
  const accuracy = typedWords > 0 ? Math.round((correctWords / typedWords) * 100) : 0;
  const wpm = Math.round((correctWords / (60 - timeLeft)) * 60);

  speedElement.textContent = `Speed: ${wpm} WPM`;
  accuracyElement.textContent = `Accuracy: ${accuracy}%`;
}

function checkTyping() {
  const input = typingArea.value.trim().split(' ');
  correctWords = 0;
  typedWords = input.length;

  input.forEach((word, i) => {
    const span = document.getElementById(`word-${i}`);
    if (!span) return;

    if (word === words[i]) {
      span.classList.add('correct');
      span.classList.remove('incorrect');
      correctWords++;
    } else {
      span.classList.add('incorrect');
      span.classList.remove('correct');
    }
  });

  updateStats();
}

startBtn.addEventListener('click', startTest);
resetBtn.addEventListener('click', () => {
  clearInterval(timer);
  isTestActive = false;
  typingArea.disabled = true;
  typingArea.value = '';
  timerElement.textContent = `Time left: 60s`;
  speedElement.textContent = `Speed: 0 WPM`;
  accuracyElement.textContent = `Accuracy: 0%`;
  renderTestText();
});
typingArea.addEventListener('input', checkTyping);

// Initialize with a random paragraph on page load
words = getRandomParagraph().split(' ');
renderTestText();
