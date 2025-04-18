let gameseq = [];
let userseq = [];

let btns = ["yellow", "red", "green", "purple"];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");
let highScoreDisplay = document.getElementById("high-score");

// Load high score from localStorage if available
if (localStorage.getItem("simonHighScore")) {
  highScore = parseInt(localStorage.getItem("simonHighScore"));
  highScoreDisplay.innerText = `High Score: ${highScore}`;
}

document.addEventListener("keypress", function () {
  if (!started) {
    console.log("Game is started");
    started = true;

    levelup();
  }
});

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function levelup() {
  userseq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randcolor = btns[randIdx];
  let randbtn = document.querySelector(`.${randcolor}`);
  gameseq.push(randcolor);
  console.log(gameseq);
  btnFlash(randbtn);
}

function checkAns(idx) {
  if (userseq[idx] == gameseq[idx]) {
    if (userseq.length == gameseq.length) {
      setTimeout(levelup, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to restart the Game`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);

    // Update high score if current level is higher
    if (level > highScore) {
      highScore = level;
      localStorage.setItem("simonHighScore", highScore);
      highScoreDisplay.innerText = `High Score: ${highScore}`;
    }

    reset();
  }
}

function btnpress() {
  let btn = this;
  btnFlash(btn);
  userColor = btn.getAttribute("id");
  userseq.push(userColor);

  checkAns(userseq.length - 1);
}
let allbtns = document.querySelectorAll(".btn");
for (btn of allbtns) {
  btn.addEventListener("click", btnpress);
}

function reset() {
  userseq = [];
  gameseq = [];
  level = 0;
  started = false;
}
