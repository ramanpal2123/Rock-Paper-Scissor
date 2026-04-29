let userScore = 0;
let compScore = 0;
let currentMode = 'comp';
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
    scissor: '✌️ Scissors'
};

const setMsg = (text, type = '') => {
    msg.textContent = text;
    msg.className = 'msg' + (type ? ' ' + type : '');
};

const popScore = (el) => {
    el.classList.remove('pop');
    void el.offsetWidth;
    el.classList.add('pop');
};

vsCompBtn.addEventListener('click', () => {
    currentMode = 'comp';
    vsCompBtn.classList.add('active');
    vsHumanBtn.classList.remove('active');
    compChoiceContainer.style.display = 'flex';
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
    return options[Math.floor(Math.random() * 3)];
};

const decideWinner = (c1, c2) => {
    if (c1 === c2) return 'draw';
    if (
        (c1 === 'rock' && c2 === 'scissor') ||
        (c1 === 'paper' && c2 === 'rock') ||
        (c1 === 'scissor' && c2 === 'paper')
    ) return 'p1';
    return 'p2';
};

const drawGame = () => setMsg("It's a Draw! Play again", 'draw');

const showWinner = (userWin, p1, p2) => {
    if (userWin) {
        userScore++;
        userScorePara.textContent = userScore;
        popScore(userScorePara);
        if (currentMode === 'comp') {
            setMsg(`You win! ${choiceEmoji[p1]} beats ${choiceEmoji[p2]}`, 'win');
        } else {
            setMsg(`Player 1 wins! ${choiceEmoji[p1]} beats ${choiceEmoji[p2]}`, 'win');
        }
    } else {
        compScore++;
        compScorePara.textContent = compScore;
        popScore(compScorePara);
        if (currentMode === 'comp') {
            setMsg(`You lose! ${choiceEmoji[p2]} beats ${choiceEmoji[p1]}`, 'lose');
        } else {
            setMsg(`Player 2 wins! ${choiceEmoji[p2]} beats ${choiceEmoji[p1]}`, 'lose');
        }
    }
};

const playVsComp = (userChoice) => {
    const compChoice = genCompChoice();
    compChoiceText.textContent = choiceEmoji[compChoice];
    const result = decideWinner(userChoice, compChoice);
    if (result === 'draw') drawGame();
    else showWinner(result === 'p1', userChoice, compChoice);
};

const playVsHuman = (p2Choice) => {
    overlay.style.display = 'none';
    const result = decideWinner(p1Choice, p2Choice);
    if (result === 'draw') drawGame();
    else showWinner(result === 'p1', p1Choice, p2Choice);
    p1Choice = null;
};

document.querySelectorAll('.choice:not(.p2-choice)').forEach((choice) => {
    choice.addEventListener('click', () => {
        const userChoice = choice.getAttribute('id');
        if (currentMode === 'comp') {
            playVsComp(userChoice);
        } else {
            p1Choice = userChoice;
            setMsg('Player 1 locked in! Player 2 — your turn…');
            overlay.style.display = 'flex';
        }
    });
});

document.querySelectorAll('.p2-choice').forEach((choice) => {
    choice.addEventListener('click', () => {
        const p2Choice = choice.getAttribute('id').replace('p2-', '');
        playVsHuman(p2Choice);
    });
});

const resetGame = () => {
    userScore = 0; compScore = 0;
    userScorePara.textContent = 0;
    compScorePara.textContent = 0;
    setMsg('Play your move');
    compChoiceText.textContent = '—';
    p1Choice = null;
    overlay.style.display = 'none';
};

document.querySelector('#replay-btn').addEventListener('click', resetGame);
