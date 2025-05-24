// Loader Code
const loaderContainer = document.querySelector('.loader-container');
const pageContent = document.querySelector('.page-content');

function initLoader() {
    loaderContainer.classList.remove('hidden');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loaderContainer.classList.add('hidden');
            pageContent.classList.add('visible');
            initGame();
        }, 2000);
    });
}

document.addEventListener('DOMContentLoaded', initLoader);

// Main Code
let turn = 'X';
let isGameOver = false;
let boxes; 

function initGame() {
    boxes = document.querySelectorAll('.box');
    const bgIndicator = document.querySelector('.bg');
    const resultsDiv = document.querySelector('#results');
    const playAgainBtn = document.querySelector('#play-again');

    boxes.forEach(box => {
        box.addEventListener('click', handleBoxClick);
    });
    playAgainBtn.addEventListener('click', resetGame);
}

function handleBoxClick() {
    if (!isGameOver && this.innerHTML === '') {
        this.innerHTML = turn;
        checkWin();
        checkDraw();
        if (!isGameOver) changeTurn();
    }
}

function changeTurn() {
    turn = turn === 'X' ? 'O' : 'X';
    document.querySelector('.bg').style.left = turn === 'O' ? '85px' : '0';
}

function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (boxes[a].innerHTML &&
            boxes[a].innerHTML === boxes[b].innerHTML &&
            boxes[a].innerHTML === boxes[c].innerHTML) {
            
            isGameOver = true;
            document.querySelector('#results').innerHTML = `${turn} Wins!`;
            document.querySelector('#play-again').style.display = 'inline';

            condition.forEach(index => {
                boxes[index].style.backgroundColor = '#60B5FF';
                boxes[index].style.color = '#000';
            });
            break;
        }
    }
}

function checkDraw() {
    if (!isGameOver) {
        const isDraw = [...boxes].every(box => box.innerHTML !== '');
        if (isDraw) {
            isGameOver = true;
            document.querySelector('#results').innerHTML = 'Draw';
            document.querySelector('#play-again').style.display = 'inline';
        }
    }
}


function resetGame() {
    isGameOver = false;
    turn = 'X';
    document.querySelector('.bg').style.left = '0';
    document.querySelector('#results').innerHTML = '';
    document.querySelector('#play-again').style.display = 'none';

    boxes.forEach(box => {
        box.innerHTML = '';
        box.style.removeProperty('background-color');
        box.style.color = '#fff';
    });
}











/* 


document.addEventListener('DOMContentLoaded', initLoader);

// main code
const boxes = document.querySelectorAll('.box');

let turn = 'X';
let isGameOver = false;

boxes.forEach(e => {
  e.addEventListener('click', () => {
    if (!isGameOver && e.innerHTML === '') {
      e.innerHTML = turn;
      checkWin();
      checkDraw();
      changeTurn();
    }
  });
});

function changeTurn() {
  if (turn === 'X') {
    turn = 'O';
    document.querySelector('.bg').style.left = '85px';
  } else {
    turn = 'X';
    document.querySelector('.bg').style.left = '0';
  }
}

function checkWin() {
  let winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let i = 0; i < winConditions.length; i++) {
    let v0 = boxes[winConditions[i][0]].innerHTML;
    let v1 = boxes[winConditions[i][1]].innerHTML;
    let v2 = boxes[winConditions[i][2]].innerHTML;

    if (v0 !== '' && v0 === v1 && v0 === v2) {
      isGameOver = true;
      document.querySelector('#results').innerHTML = turn + ' Wins!';
      document.querySelector('#play-again').style.display = 'inline';

      for (let j = 0; j < 3; j++) {
        boxes[winConditions[i][j]].style.backgroundColor = '#60B5FF';
        boxes[winConditions[i][j]].style.color = '#000';
      }
    }
  }
}

function checkDraw() {
  if (!isGameOver) {
    let isDraw = true;
    boxes.forEach(e => {
      if (e.innerHTML === '') isDraw = false;
    });
    if (isDraw) {
      isGameOver = true;
      document.querySelector('#results').innerHTML = 'Draw';
      document.querySelector('#play-again').style.display = 'inline';
    }
  }
}


});  */
