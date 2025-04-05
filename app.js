

const buttons = document.querySelectorAll('li.pick > button');

buttons.forEach((button, i) => {
  button.addEventListener('click', (e) => {
    const userChoice = i;
    const computerChoice = Math.floor(Math.random() * 3);
    window.location.href = `/result.html?user=${userChoice}&computer=${computerChoice}`;
    })
})