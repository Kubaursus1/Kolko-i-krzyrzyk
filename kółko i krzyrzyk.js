const Buttons = document.querySelectorAll("div.square>button"); // mala litera
document.querySelector("#winner").hidden = true;
let sign = "X";
let amount = 0;
const getRandomIntegerBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};
function filterButtons(Buttons) {
  let filteredButtons = [];
  Buttons.forEach((button) => {
    if (button.classList.contains("empty")) {
      let index = button.getAttribute("data-index");
      filteredButtons.push(index);
    }
  });

  return filteredButtons;
}
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
function handleButtonClick(event) {
  const clickedButton = event.target;
  if (clickedButton.classList.contains("empty")) {
    if (sign === "X") {
      if (amount < 5) {
        clickedButton.classList.add("X");
        sign = "O";
        amount += 1;
        clickedButton.classList.remove("empty");
      }
    }
  }
  const macierzWithX = changeToList();
  findWinner(macierzWithX);
  setTimeout(AISetContent, 3000);
  sleep(3500).then(() => {
    const macierzWithO = changeToList();
    findWinner(macierzWithO);
  });
}
function AISetContent() {
  const filteredButtons = filterButtons(Buttons);
  const RandomIndex = getRandomIntegerBetween(0, filteredButtons.length);
  const ButtonIndex = filteredButtons[RandomIndex];
  Buttons.forEach((button) => {
    let index = button.getAttribute("data-index");
    if (index === ButtonIndex) {
      button.classList.add("O");
      sign = "X";
      button.classList.remove("empty");
    }
  });
}
const changeToList = function () {
  let macierz = [];
  Buttons.forEach((button) => {
    if (button.classList.contains("X")) {
      macierz.push("X");
    } else if (button.classList.contains("O")) {
      macierz.push("O");
    } else {
      macierz.push(undefined);
    }
  });
  return macierz;
};
const findWinner = function (macierz) {
  listawygranych = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const opcjawygranej of listawygranych) {
    if (
      macierz.at(opcjawygranej.at(0)) === "X" &&
      macierz.at(opcjawygranej.at(1)) === "X" &&
      macierz.at(opcjawygranej.at(2)) === "X"
    ) {
      document.querySelector("#winner").innerText = `The winner is X`;
      document.querySelector("#winner").hidden = false;
      throw new Error();
    } else if (
      macierz.at(opcjawygranej.at(0)) === "O" &&
      macierz.at(opcjawygranej.at(1)) === "O" &&
      macierz.at(opcjawygranej.at(2)) === "O"
    ) {
      document.querySelector("#winner").innerText = `The winner is O`;
      document.querySelector("#winner").hidden = false;
      throw new Error();
    }
  }
};
Buttons.forEach((Button) => {
  Button.classList.add("empty");
  Button.addEventListener("click", handleButtonClick);
});
