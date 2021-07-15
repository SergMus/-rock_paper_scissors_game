

window.onload = function () {
    let countC = 1;
    let countP = 1;
    let scoreP, scoreC;
    const resultText = document.querySelector('.result');
    const allFields = document.querySelectorAll('.field');
    const computerFields = document.querySelector('.computer-field').querySelectorAll('.field');
    const playerFields = document.querySelector('.player-field').querySelectorAll('.field');
    const divP = document.querySelector('.player-field');
    const draw = new Audio('./sound/draw.mp3');
    draw.volume = 0.1;
    const win = new Audio('./sound/win.mp3');
    win.volume = 0.2;
    const loss = new Audio('./sound/loss.mp3');
    loss.volume = 0.2;

    divP.addEventListener('click', getScore);

    function getScore(event) {
        if (event.target.classList.contains('field')) {
            scoreP = event.target.dataset.choose;
            event.target.classList.add('active');
            divP.removeEventListener('click', getScore);
            playGame()
        } else { return }
    }

    function playGame() {
        let random = Math.floor(Math.random() * 3);

        document.querySelector('.computer-field').classList.add('blink');
        setTimeout(() => {
            document.querySelector('.computer-field').classList.remove('blink');
            let randItem = computerFields[random];
            scoreC = randItem.dataset.choose;
            randItem.classList.add('active');
            resultFunc(randItem);
        }, 1000)

    }

    function resultFunc(compItem) {
        let result = scoreP + scoreC;
        switch (result) {
            case 'pp':
            case 'rr':
            case 'ss':
                resultText.innerHTML = 'Ничья';
                draw.play();
                break;
            case 'rs':
            case 'pr':
            case 'sp':
                resultText.innerHTML = 'Вы победили!';
                document.querySelector('.count-player').innerHTML = countP;
                countP++;
                compItem.classList.add('error');
                win.play();
                break;
            case 'sr':
            case 'rp':
            case 'ps':
                resultText.innerHTML = 'Вы проиграли!';
                document.querySelector('.count-computer').innerHTML = countC;
                countC++;
                playerFields.forEach(item => {
                    if (item.classList.contains('active')) {
                        item.classList.remove('active')
                        item.classList.add('error')
                    }
                });
                loss.play();
                break;
        }
        setTimeout(() => {
            divP.addEventListener('click', getScore);
            allFields.forEach(item => {
                item.classList.remove('active');
                item.classList.remove('error');
            });
            if (countP == 4) {
                document.querySelector('.congratulations').style.display = 'block';
                document.querySelector('#win1').style.display = 'inline';
                document.querySelector('.output').innerHTML = 'Вы победили! Поздравляем'
            }
            if (countC == 4) {
                document.querySelector('.congratulations').style.display = 'block';
                document.querySelector('#win2').style.display = 'inline';
                document.querySelector('.output').innerHTML = 'Компьютер победил! Попробуйте еще раз'

            }
        }, 3000);
    }

    document.querySelector('.play').onclick = () => {
        document.querySelector('.congratulations').style.display = 'none';
        document.querySelector('#win2').style.display = 'none';
        document.querySelector('#win1').style.display = 'none';
        document.querySelector('.count-player').innerHTML = '0';
        document.querySelector('.count-computer').innerHTML = '0';
        countC = 1;
        countP = 1;
    }
}