let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let newGameBtn = document.querySelector(".new-game-btn");
let winnerMsg = document.getElementById("winner-msg");
let msg = document.querySelector("#msg");
let hideWinner = document.querySelector(".hide");


let winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];


let turnO = true;

// cell can be any variable name ex: box, x, y etc
boxes.forEach((box) => {  
  box.addEventListener("click", () => {
     if (turnO){
      box.innerText = "O";
      box.classList.add("boxo");
      turnO = false;
    } else {
      box.innerText ="X";
      box.classList.add("boxx");
      turnO = true;
    }
    box.disabled = true;

    checkWinner();  //am just calling checkWinner() f here, code is below
  });
});

function checkWinner() {
  for (let pattern of winPatterns) {
    let posVal1 = boxes[pattern[0]].innerText;
    let posVal2 = boxes[pattern[1]].innerText;
    let posVal3 = boxes[pattern[2]].innerText;
    if (posVal1 != "" && posVal2 != "" && posVal3 != "") {
      if (posVal1 === posVal2 && posVal2 === posVal3 && posVal3 === posVal1) {
        showWinner(posVal1); // calling showWinner() f here
      } else if (posVal1 != posVal2 && posVal2 != posVal3){
        showDraw();
      }
    }
  }
};

 // passing posVal1 to winner parameter
 const showWinner = (winner) => { 
  msg.innerText = `Congratulations, Winner is: ${winner}`;
  disableBtns(); // calling disableBtns() f here
  winnerMsg.classList.remove("hide");
};

const showDraw = () => { 
  msg.innerText = `Match is draw! Better luck next time.`;
  disableBtns(); // calling disableBtns() f here
  winnerMsg.classList.remove("hide");
};

const resetGame = () => {
  turnO = false;
  enableBtns();
  winnerMsg.classList.add("hide");
  boxes.forEach((box) => {
    box.classList.remove("boxo");
    box.classList.remove("boxx");
  });
};

const disableBtns = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
}

const enableBtns = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
}

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
