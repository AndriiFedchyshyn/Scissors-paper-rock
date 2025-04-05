const body = document.querySelector('body');
const playAgain = document.querySelector('.play-again');
const userImage = document.querySelector('.your-pick > img');
const computerImage = document.querySelector('.computer-pick > img');
const winText = document.querySelector('.who-win');
const userScoreDisplay = document.querySelector('.user-score');
const computerScoreDisplay = document.querySelector('.computer-score');
const resetButton = document.querySelector('.reset-score');

const params = new URLSearchParams(window.location.search);

const choiceImageMap = {
  "0": { image: "rock.jpg", alt: "Rock" },
  "1": { image: "scissors.jpg", alt: "Scissors" },
  "2": { image: "paper.jpg", alt: "Paper" }
};

let userScore = parseInt(localStorage.getItem('userScore')) || 0;
let computerScore = parseInt(localStorage.getItem('computerScore')) || 0;

if (!params.has("user") || !params.has("computer")) {
  window.location.href = `../`;
}

const setUserAndComputerImages = (user, computer) => {
  userImage.src = `img/${choiceImageMap[user].image}`;
  userImage.alt = choiceImageMap[user].alt;
  computerImage.src = `img/${choiceImageMap[computer].image}`;
  computerImage.alt = choiceImageMap[computer].alt;
};

const winnerMap = {
  "0": { "0": "tie", "2": "computer", "1": "you" },
  "2": { "0": "you", "2": "tie", "1": "computer" },
  "1": { "0": "computer", "2": "you", "1": "tie" }
};

const determineWinner = (user, computer) => {
  return winnerMap[user][computer];
};

const checkWinner = () => {
  const winner = determineWinner(user, computer);

  if (winner === 'tie') {
    body.classList.add("tie");
    winText.innerText = "Tie";
  } else if (winner === "you") {
    body.classList.add("you-win");
    winText.innerText = "You Win!";
    userScore++;
  } else {
    body.classList.add("computer-wins");
    winText.innerText = "Computer Win";
    computerScore++;
  }

  localStorage.setItem('userScore', userScore);
  localStorage.setItem('computerScore', computerScore);

  userScoreDisplay.textContent = userScore;
  computerScoreDisplay.textContent = computerScore;
};

const resetScores = () => {
  localStorage.removeItem('userScore');
  localStorage.removeItem('computerScore');
  userScore = 0;
  computerScore = 0;
  userScoreDisplay.textContent = userScore;
  computerScoreDisplay.textContent = computerScore;
};

playAgain.addEventListener('click', () => {
  window.location.href = "./";
});

resetButton.addEventListener('click', resetScores);

const user = params.get("user");
const computer = params.get("computer");

setUserAndComputerImages(user, computer);
checkWinner();