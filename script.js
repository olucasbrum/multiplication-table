const tryButton = document.getElementById('try-button');
const gameContainer = document.getElementById('game-container');
const studyButton = document.getElementById('study-button');
const homeButton = document.getElementById('home-button');

function generateQuestion(number) {
  const multiplier = Math.floor(Math.random() * 10) + 1;
  const question = `${number} x ${multiplier} = ?`;
  const answer = number * multiplier;
  return { question, answer };
}

function renderQuestion(questionObj) {
  gameContainer.innerHTML = `
    <div class="question">${questionObj.question}</div>
    <input type="number" class="answer-input">
    <button id="answer-button">Responder</button>
  `;

  const answerButton = document.getElementById('answer-button');

  answerButton.addEventListener('click', () => {
    const answerInput = document.querySelector('.answer-input');
    const userAnswer = parseInt(answerInput.value);
    const isCorrect = userAnswer === questionObj.answer;
    const resultMessage = isCorrect ? 'Você acertou!' : 'Você errou!';

    gameContainer.innerHTML = `
      <div>${resultMessage}</div>
      <button id="try-again-button">Tentar novamente</button>
    `;

    const tryAgainButton = document.getElementById('try-again-button');

    tryAgainButton.addEventListener('click', () => {
      const numberInput = document.getElementById('number-input');
      const questionObj = generateQuestion(parseInt(numberInput.value));
      renderQuestion(questionObj);
    });
  });
}

function renderMultiplicationTable() {
  const table = document.createElement('table');

  table.setAttribute('role', 'table');
  table.innerHTML = `
    <thead>
      <tr>
        <th scope="col"></th>
        ${[...Array(10).keys()].map(i => `<th scope="col">${i + 1}</th>`).join('')}
      </tr>
    </thead>
    <tbody>
      ${[...Array(10).keys()]
        .map(
          i => `
        <tr>
          <th scope="row">${i + 1}</th>
          ${[...Array(10).keys()]
            .map(
              j => `
            <td>${(i + 1) * (j + 1)}</td>
          `,
            )
            .join('')}
        </tr>
      `,
        )
        .join('')}
    </tbody>
  `;

  gameContainer.appendChild(table);
}

tryButton.addEventListener('click', () => {
  gameContainer.style.display = 'block';

  const numberInput = document.getElementById('number-input');
  const questionObj = generateQuestion(parseInt(numberInput.value));

  renderQuestion(questionObj);
});

studyButton.addEventListener('click', () => {
  gameContainer.style.display = 'block';
  gameContainer.innerHTML = '';
  renderMultiplicationTable();
});

homeButton.addEventListener('click', () => {
  gameContainer.style.display = 'none';
});
