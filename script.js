const gameContainer = document.getElementById("game");
const startBtn = document.querySelector("button");
let cardNum = 0;
let matches = 0;
let remember = [];
let arr = [];
let num = 1;

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.setAttribute("match", "false");
    newDiv.setAttribute("Clicked", "false");

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

/*
TODO:
clean up code and add comments
*/
function handleCardClick(event) {
  //CHECK IF CLICK HAS SAME TARGET AS BEFORE
  if (event.target.getAttribute("Clicked") == "false") {
    //UPDATE CURRENT SCORE
    let score = document.querySelector("span");
    score.innerText = `Current score: ${remember.length + 1}`;
    let val = event.target.getAttribute("match");
    //SET CLICK VALUE TO AVOID DBCLICKS
    event.target.setAttribute("Clicked", "true");
    //CHECK IF CLICK IS MATCH ALREADY
    if (val == "false") {
      //CHECK IF YOU ALREADY HAVE 2 CARDS FLIPPED
      if (cardNum < 2) {
        event.target.innerText = parseInt(event.target.classList.value);
        remember.push(event.target);
        cardNum++;
        //FLIP CARDS BACK IF WRONG
        if (cardNum == 2) {
          let len = remember.length;
          //IF THEY ARE A MATCH
          if (
            remember[len - 2].classList.value ==
            remember[len - 1].classList.value
          ) {
            remember[len - 2].setAttribute("match", "true");
            remember[len - 1].setAttribute("match", "true");
            matches++;
          }
          if (remember[len - 2].getAttribute("match") == "false") {
            //PAUSE FOR 1 SECOND BEFORE MAKING BLACK AGAIN
            setTimeout(() => {
              remember[len - 2].innerText = "";
              remember[len - 1].innerText = "";
            }, 1000);
          }
          //RESET VALUES
          cardNum = 0;
          remember[len - 2].setAttribute("Clicked", "false");
          remember[len - 1].setAttribute("Clicked", "false");
        }
      }
    }
  }
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
  //END GAME AND RESTARTING
  if (matches == num) {
    let score = document.querySelector("span").innerText;
    if (parseInt(localStorage.hScore) > remember.length) {
      localStorage.setItem("hScore", remember.length);
    }
    //CLEAR BOARD
    let test = document.getElementById("game");
    test.innerHTML = "";
    //WIN SCREEN
    let p = document.createElement("p");
    p.innerText = "You win!";
    test.appendChild(p);
  }
}

startBtn.addEventListener("click", function (e) {
  e.preventDefault();
  startGame();
});

//START GAME
function startGame() {
  //CALL GAMEBOARD ELEMENT
  if (document.getElementById("numberMatch")) {
    num = parseInt(document.getElementById("numberMatch").value);
  } else {
    num = 5;
  }
  let test = document.getElementById("game");
  //CLEAR GAMEBOARD
  test.innerHTML = "";
  startBtn.innerText = "Reset with 5 matches";
  cardNum = 0;
  matches = 0;
  remember = [];
  arr = [];
  //CALL NEW GAME BOARD
  arr = populateArr(num);
  let shuffledColors = shuffle(arr);
  createDivsForColors(shuffledColors);
  //CREATE SCORE TRACKERS
  test.append(document.createElement("br"));
  //CURRENT SCORE
  let score = document.createElement("span");
  score.innerText = ` Current score: ${remember.length}`;
  score.classList.add("current");
  test.append(score);
  test.append(document.createElement("br"));
  //HIGH SCORE
  let high = document.createElement("span");
  console.log(localStorage.hScore);
  //IF HIGHSCORE ISNT THERE SET TO 1000
  if (!localStorage.hScore) {
    localStorage.setItem("hScore", 1000);
  }
  high.innerText = ` High score: ${localStorage.hScore}`;
  test.append(high);
}

//FILL ARR WITH INPUTS
function populateArr(len) {
  for (let i = 1; i <= len; i++) {
    //DOUBLE PUSH TO CREATE PAIR
    arr.push(i);
    arr.push(i);
  }
  return arr;
}
