let xpSpan = document.getElementById("xp-span");
let levelSpan = document.getElementById("level-span");
let stageSpan = document.getElementById("stage-span");
let startBtn = document.getElementById("start-btn");
let welcome = document.getElementById("welcome");
let enemyContainer = document.getElementById("enemy-container");

let player = {
  name: "Joey2Slice",
  xp: 0,
  level: 1,
};

let stage = 1;

let enemies = [
  { type: "King", xp: 20 },
  { type: "Queen", xp: 30 },
  { type: "Pawn", xp: 5 },
  { type: "Pawn", xp: 5 },
  { type: "Pawn", xp: 5 },
  { type: "Pawn", xp: 5 },
  { type: "Pawn", xp: 5 },
  { type: "Pawn", xp: 5 },
  { type: "Pawn", xp: 5 },
  { type: "Pawn", xp: 5 },
  { type: "Pawn", xp: 5 },
  { type: "Pawn", xp: 5 },
];

const renderStats = () => {
  xpSpan.innerText = player.xp;
  levelSpan.innerText = player.level;
};

welcome.innerText = `Welcome, ${player.name}!`;
stageSpan.innerText = stage;
renderStats();

const sortEnemies = () => {
  return enemies.sort(() => {
    return Math.random() - 0.5;
  });
};

const renderEnemies = (arr) => {
  enemyContainer.innerHTML = "";
  arr.forEach((enemy) => {
    renderEnemy(enemy);
  });
};

const killedEnemy = (value) => {
  player.xp = player.xp + value;
  checkLevel();
  renderStats();
};

const checkLevel = () => {
  if (player.xp >= 100) {
    player.level = player.level + 1;
    player.xp = player.xp - 100;
  }
};

const renderEnemy = (obj) => {
  let div = document.createElement("div");
  let nameH2 = document.createElement("h2");
  let xpH2 = document.createElement("h2");
  let btn = document.createElement("button");

  div.className = "card";
  btn.className = "enemy-btn";

  nameH2.innerText = `${obj.type}`;
  xpH2.innerText = `${obj.xp}`;
  btn.innerText = "X";
  btn.value = obj.xp;
  checkStage(btn);
  
  btn.addEventListener("click", (event) => {
    let num = parseInt(event.target.value);
    div.style.visibility = "hidden";
    killedEnemy(num);
  });

  div.append(nameH2);
  div.append(xpH2);
  div.append(btn);
  enemyContainer.append(div);
};

const checkStage = (element) => {
  if (stage <= 5) {
    element.style.height = "40px";
    element.style.width = "40px";
  } else if (stage <= 10) {
    element.style.height = "30px";
    element.style.width = "30px";
  } else if (stage <= 15) {
    element.style.height = "20px";
    element.style.width = "20px";
  } else {
    element.style.height = "10px";
    element.style.width = "10px";
    element.innerText = "";
  }
}

const gameOver = () => {
  enemyContainer.innerHTML = "";
  let h1 = document.createElement("h1");
  h1.innerText = "GAME OVER!!";
  enemyContainer.append(h1);
  startBtn.style.visibility = "visible";
  startBtn.innerText ="Restart?";
  startBtn.addEventListener("click", () => {
    window.location.reload();
  })
};

startBtn.addEventListener("click", () => {
  startBtn.style.visibility = "hidden";
  renderEnemies(sortEnemies());

  setInterval(() => {
    if (stage < 20) {  //// CHANGE THIS TO whatever stage you want to end at
      stage = stage + 1;
      stageSpan.innerText = stage;
      renderEnemies(sortEnemies());
    } else {
      gameOver();
    }
  }, 3000);
});
