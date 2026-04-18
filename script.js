let userScore = 0;
let compScore = 0;
let currentMode = 'comp'; // 'comp' or 'human'
let p1Choice = null;

const msg = document.querySelector('#msg');
const userScorePara = document.querySelector('#user-score');
const compScorePara = document.querySelector('#comp-score');
const compChoiceText = document.querySelector('#comp-choice-text');
const compChoiceContainer = document.querySelector('#comp-choice-container');
const overlay = document.querySelector('#overlay');
const vsCompBtn = document.querySelector('#vs-comp-btn');
const vsHumanBtn = document.querySelector('#vs-human-btn');
const p1Tag = document.querySelector('#p1-tag');
const p2Tag = document.querySelector('#p2-tag');
const scoreP1Label = document.querySelector('#score-p1-label');
const scoreP2Label = document.querySelector('#score-p2-label');

const choiceEmoji = {
    rock: '✊ Rock',
    paper: '✋ Paper',
    scissor: '✌️ Scissor'
};

// Mode toggle
vsCompBtn.addEventListener('click', () => {
    currentMode = 'comp';
    vsCompBtn.classList.add('active');
    vsHumanBtn.classList.remove('active');
    compChoiceContainer.style.display = 'block';
    p1Tag.textContent = 'You';
    p2Tag.textContent = 'Computer';
    scoreP1Label.textContent = 'You';
    scoreP2Label.textContent = 'Computer';
    resetGame();
});

vsHumanBtn.addEventListener('click', () => {
    currentMode = 'human';
    vsHumanBtn.classList.add('active');
    vsCompBtn.classList.remove('active');
    compChoiceContainer.style.display = 'none';
    p1Tag.textContent = 'Player 1';
    p2Tag.textContent = 'Player 2';
    scoreP1Label.textContent = 'Player 1';
    scoreP2Label.textContent = 'Player 2';
    resetGame();
});

const genCompChoice = () => {
    const options = ["rock", "paper", "scissor"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

const drawGame = () => {
    msg.innerHTML = "It's a Draw! Play again";
    msg.style.backgroundColor = "orange";
};

const showWinner = (userWin, p1, p2) => {
    if (userWin) {
        userScore++;
        userScorePara.innerHTML = userScore;
        if (currentMode === 'comp') {
            msg.innerHTML = `You win! You chose ${choiceEmoji[p1]}`;
        } else {
            msg.innerHTML = `Player 1 wins! ${choiceEmoji[p1]} beats ${choiceEmoji[p2]}`;
        }
        msg.style.backgroundColor = "green";
    } else {
        compScore++;
        compScorePara.innerHTML = compScore;
        if (currentMode === 'comp') {
            msg.innerHTML = `You lose! Computer chose ${choiceEmoji[p2]}`;
        } else {
            msg.innerHTML = `Player 2 wins! ${choiceEmoji[p2]} beats ${choiceEmoji[p1]}`;
        }
        msg.style.backgroundColor = "red";
    }
};

const decideWinner = (choice1, choice2) => {
    if (choice1 === choice2) return 'draw';
    if (
        (choice1 === 'rock' && choice2 === 'scissor') ||
        (choice1 === 'paper' && choice2 === 'rock') ||
        (choice1 === 'scissor' && choice2 === 'paper')
    ) return 'p1';
    return 'p2';
};

const playVsComp = (userChoice) => {
    const compChoice = genCompChoice();
    compChoiceText.textContent = choiceEmoji[compChoice];
    const result = decideWinner(userChoice, compChoice);
    if (result === 'draw') {
        drawGame();
    } else {
        showWinner(result === 'p1', userChoice, compChoice);
    }
};

const playVsHuman = (p2Choice) => {
    overlay.style.display = 'none';
    const result = decideWinner(p1Choice, p2Choice);
    if (result === 'draw') {
        drawGame();
    } else {
        showWinner(result === 'p1', p1Choice, p2Choice);
    }
    p1Choice = null;
};

// Main choices — Player 1 / Human vs Comp
document.querySelectorAll('.choice:not(.p2-choice)').forEach((choice) => {
    choice.addEventListener('click', () => {
        const userChoice = choice.getAttribute('id');
        if (currentMode === 'comp') {
            playVsComp(userChoice);
        } else {
            p1Choice = userChoice;
            msg.innerHTML = "Player 1 chose! Now Player 2...";
            msg.style.backgroundColor = "#081b31";
            overlay.style.display = 'flex';
        }
    });
});

// Player 2 choices
document.querySelectorAll('.p2-choice').forEach((choice) => {
    choice.addEventListener('click', () => {
        const p2Choice = choice.getAttribute('id').replace('p2-', '');
        playVsHuman(p2Choice);
    });
});

const resetGame = () => {
    userScore = 0;
    compScore = 0;
    userScorePara.innerHTML = 0;
    compScorePara.innerHTML = 0;
    msg.innerHTML = 'Play your move';
    msg.style.backgroundColor = '#081b31';
    compChoiceText.textContent = '-';
    p1Choice = null;
    overlay.style.display = 'none';
};


document.querySelector('#replay-btn').addEventListener('click', () => {
    resetGame();
});