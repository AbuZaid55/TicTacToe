const cells = Array.from(document.getElementsByClassName('cell'))
cells.forEach(cell => cell.addEventListener('click', handleClickOnCell));

let currentPlayer = 'X'

function checkWin() {
    const winningCondition = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let condition of winningCondition) {
        let [a, b, c] = condition;
        if (cells[a].textContent != '' && cells[a].textContent === cells[b].textContent && cells[b].textContent === cells[c].textContent) {
            return { win: true, condition: [a, b, c] }
        }

    }
}

function handleClickOnCell(event) {
    const cell = event.target;
    if (cell.textContent != '') return;
    cell.textContent = currentPlayer
    const chkWin = checkWin()
    if (chkWin && chkWin.win) {
        win(chkWin.condition)
    } else if (cells.every(cell => cell.textContent != '')) {
        alert("Game Draw")
        resetBoard([0,0,0])
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
    }
}


function win(condition) {
    let [a, b, c] = condition
    cells[a].style.backgroundColor = "green"
    cells[b].style.backgroundColor = "green"
    cells[c].style.backgroundColor = "green"
    cells[a].style.color = "white"
    cells[b].style.color = "white"
    cells[c].style.color = "white"
    setTimeout(() => {
        const cnfm = confirm(`Player ${currentPlayer} Wins`)
        if (cnfm || !cnfm) {
            resetBoard(condition)
        }
    }, 500);
}

function resetBoard(condition) {
    let [a, b, c] = condition
    cells[a].style.backgroundColor = "yellow"
    cells[b].style.backgroundColor = "yellow"
    cells[c].style.backgroundColor = "yellow"
    cells[a].style.color = "black"
    cells[b].style.color = "black"
    cells[c].style.color = "black"
    cells.forEach(cell => cell.textContent = '')
    currentPlayer = "X"
}