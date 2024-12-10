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
  `The art of typing goes beyond just pressing keys on a keyboard. It requires focus, discipline, and practice. Over time, you will find that typing becomes second nature, allowing you to express your thoughts freely. By taking regular typing tests and challenging yourself, you can track your progress and set new personal records.`,
  `In a world increasingly driven by technology, the importance of digital literacy cannot be overstated. As we navigate through daily tasks that involve computers, smartphones, and various online platforms, being proficient in digital skills has become essential. From simple actions like sending emails and browsing the internet to more complex tasks such as coding and data analysis, understanding how to effectively utilize technology can significantly enhance productivity and efficiency. Moreover, digital literacy opens doors to new opportunities in the job market, as employers seek individuals who can adapt to technological advancements and leverage them for business growth. Schools and educational institutions are now prioritizing digital education, ensuring that students are equipped with the necessary skills to thrive in an ever-evolving digital landscape. This shift towards integrating technology in education not only prepares students for future careers but also empowers them to become informed citizens in a digital society. As we move forward, embracing digital literacy will be crucial for personal and professional development, fostering innovation, and driving economic growth. It is vital for individuals to continually improve their digital skills to keep pace with the rapid advancements in technology and to fully participate in the global economy.`,
  `The beauty of nature is a constant source of inspiration for countless individuals, fueling creativity and fostering a deep appreciation for the environment. From the serene landscapes of rolling hills and vibrant forests to the majestic mountains and tranquil lakes, nature provides a stunning backdrop for reflection and rejuvenation. Many artists, writers, and musicians draw upon the splendor of the natural world to express their thoughts and emotions, creating works that resonate with the human experience. The changing seasons bring a unique charm, with each transition offering new colors, sounds, and sensations that captivate the senses. For instance, spring ushers in blooming flowers and the joyous songs of birds, while autumn showcases a breathtaking display of vibrant foliage. Engaging with nature not only nurtures creativity but also promotes mental and physical well-being. Spending time outdoors can reduce stress, enhance mood, and improve overall health. As urbanization continues to grow, it is crucial to seek opportunities to connect with nature, whether through hiking, gardening, or simply taking a walk in the park. By embracing the beauty of the natural world, individuals can cultivate a sense of harmony and balance in their lives, ultimately leading to greater fulfillment and happiness.`,
  `The significance of education in shaping an individuals future cannot be underestimated. Education serves as the foundation for personal growth, equipping individuals with the knowledge and skills necessary to navigate the complexities of life. It empowers students to think critically, solve problems, and communicate effectively, which are essential competencies in today’s fast-paced world. Moreover, education fosters social awareness and responsibility, encouraging individuals to contribute positively to their communities. Access to quality education can break the cycle of poverty, offering opportunities for upward mobility and improving overall quality of life. In recent years, the rise of online learning platforms has revolutionized the educational landscape, making it easier for people to pursue their studies from anywhere in the world. This democratization of knowledge allows learners to tailor their education to their unique needs and interests, promoting lifelong learning. However, challenges remain, such as ensuring equitable access to educational resources and addressing the digital divide. As society continues to evolve, it is crucial to prioritize education as a fundamental human right, fostering a culture of learning that benefits individuals and society as a whole. By investing in education, we invest in a brighter, more prosperous future for everyone.`
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
