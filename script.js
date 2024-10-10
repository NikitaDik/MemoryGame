const cards = document.querySelectorAll('.card');
const board = document.querySelector('.board');
const startButton = document.querySelector('.button-success');
const movesCountElement = document.querySelector('.moves');
let movesCount = 0;
let numberOfCards;
let activeCard;
const emojis = [
    '🌸', '🌈', '✨', '🔥', '💎', '🌟', '🍀', '🦋', '🍂', '🌼', '🌙', '🌺', '🌹', '🎉', '⚡', '💫', '❤️', '🌞', '🎶', '🍭',
    '🍉', '🍒', '🍎', '🍇', '🍓', '🍑', '🍍', '🍋', '🍫', '🍩', '🍰', '🍹', '🥂', '🍕', '🍔', '🍟', '🥑', '🥥', '🍜',
    '🐱', '🐶', '🐻', '🦊', '🐼', '🦄', '🐧', '🐸', '🦉', '🐢', '🐙', '🐠', '🐬', '🐳', '🦋', '🐞', '🐝', '🐾', '🦢',
    '🚗', '🚀', '🚁', '🚲', '🚤', '⛵', '✈️', '🚂', '🏰', '🌋', '🗻', '🕌', '🏯', '🗽',
    '🎨', '🎬', '🎧', '🎤', '🎹', '🎻', '🎷', '🎺', '🎸', '🥁', '🎲', '🎯', '🎮', '🎳', '🏆', '🏅', '🥇', '🥈', '🥉', '🎱'
  ];  

function startGame() {
    const width = parseInt(document.getElementById('width').value);
    const height = parseInt(document.getElementById('height').value);
    numberOfCards = width * height;

    movesCount = 0;
    movesCountElement.innerHTML = movesCount;

    let gameEmojis = [];
    while (gameEmojis.length < Math.floor(numberOfCards / 2)) {
        randomEmoji = randomElement(emojis);
        if (!gameEmojis.includes(randomEmoji)) {
            gameEmojis.push(randomEmoji);
        }
    }
    gameEmojis = [...gameEmojis, ...gameEmojis];
    shuffleArray(gameEmojis);


    board.innerHTML = '';
    board.style.gridTemplateColumns = `repeat(${width}, 100px)`;
    board.style.gridTemplateRows = `repeat(${height}, 100px)`;

    activeCard = undefined;
    for (let i = 0; i < numberOfCards; i++) {
        const card = document.createElement('div');
        card.innerHTML = gameEmojis[i] ?? "";
        card.classList.add('card');
        card.addEventListener('click', (event) => {
            if (!event.target.classList.contains('matched') && event.target.innerHTML) {
                card.classList.toggle('flipped');

                if (activeCard) {
                    if (event.target.innerHTML == activeCard.innerHTML && event.target !== activeCard) {
                        event.target.classList.add('matched');
                        activeCard.classList.add('matched');
                        numberOfCards -= 2;
                    } else {
                        setTimeout((event, activeCard) => {
                            activeCard.classList.remove('flipped');
                            event.target.classList.remove('flipped');
                        }, 700, event, activeCard);
                    }
                    activeCard = undefined;
                    movesCountElement.innerHTML = ++movesCount;
                } else {
                    activeCard = event.target;
                }
            }
        })
        board.appendChild(card)
    }
}

function randomElement(array) {
    return array[Math.floor(Math.random() * (emojis.length - 1))];
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

startButton.addEventListener('click', startGame);
