export default class View {
    constructor({rows, columns}) {
        this.rows = rows;
        this.columns = columns;

        this.grid = document.querySelector('.grid');
        this.squaresContainer = document.querySelector('.squares-container');
        const sheet  = document.querySelector("style").sheet;
        
        for(let i = 0, row, cell, innerCell, rule; i < rows; i++){
            row = document.createElement('div');
            row.classList.add('grid__row', 'row');
            this.grid.appendChild(row);
            
            for(let j = 0; j < columns; j++){
                cell = document.createElement('div');
                cell.classList.add('row__cell', 'cell');
                row.appendChild(cell);

                innerCell = document.createElement('div');
                innerCell.classList.add('cell__inner');

                cell.appendChild(innerCell);

                rule = `[data-row="${i}"][data-cell="${j}"] {
                    transform: translate(${j * 110 + 10}px, ${i * 110 - 430}px); 
                    transition: transform 0.6s;
                }`;
                sheet.insertRule(rule, sheet.cssRules.length);

            }
        }
    }

    setSquares(squares) {
        console.log('squares', squares);
        squares.forEach((s) => {
            let square, squareLabel;
            
            square = document.getElementById(s.id);
            if (!square) {
                square = document.createElement('div');
                square.id = s.id;
                square.classList.add('cell__square', 'square');
                square.dataset.row = s.row;
                square.dataset.cell = s.cell;
                square.dataset.merged = s.merged;

                const squareLabel = document.createElement('div');
                squareLabel.classList.add('square__label');
                squareLabel.innerHTML = s.value;
                squareLabel.dataset.value = s.value;

                square.appendChild(squareLabel);
                this.squaresContainer.appendChild(square);
            }
        })
    }

    createSquare(id, row, cell, value) {
        let square, squareLabel;

        square = document.getElementById(id);
        if (!square) {

            square = document.createElement('div');
            square.id = id;
            square.classList.add('cell__square', 'square');
            square.dataset.row = row;
            square.dataset.cell = cell;
            square.dataset.merged = false;

            squareLabel = document.createElement('div');
            squareLabel.classList.add('square__label', 'square__label--new');
            squareLabel.innerHTML = value;
            squareLabel.dataset.value = value;
            squareLabel.addEventListener("animationend", function(event) {
                event.target.classList.remove('square__label--new');
            });


            square.appendChild(squareLabel);
            this.squaresContainer.appendChild(square);
        }
    }

    editSquarePosition(id, row, cell, merged) {
        let square;

        square = document.getElementById(id);
        console.log('id, row, cell', id, row, cell);
        console.log(square);
        if (square) {
            square.getAnimations().forEach((animation) => animation.finish());
            square.dataset.row = row;
            square.dataset.cell = cell;
            if (merged) {
                square.dataset.merged = true;
                square.children[0].classList.add('square__label--merged'); 
            }
        }
    }

    mergeSquare(id) {
        console.log('id', id);
        const square = document.getElementById(id);
        console.log('square', square);
        if (square) {
            square.dataset.merged = true;
        }

    }

    setScore(value) {
        const scoreElem = document.querySelector('.score-value__value');
        scoreElem.innerHTML = value;
    }

    setBestScore(value) {
        const scoreElem = document.querySelector('.score-value__value--best');
        scoreElem.innerHTML = value;
    }

    resetScore() {
        const scoreElem = document.querySelector('.score-value__value');
        scoreElem.innerHTML = 0;
    }

    deleteMergedSquares() {
        document.querySelectorAll(`.cell__square[data-merged=${true}]`).forEach((e) => (e.remove()));
    }

    deleteAllSquares() {
        document.querySelectorAll(`.cell__square`).forEach((e) => (e.remove()));
    }

    changeScore(newScore, scoreDiff) {
        const scoreElem = document.querySelector('.score-value__value');
        scoreElem.innerHTML = newScore;

        const scoreDiffElem = document.querySelector('.score-value__diff');

        scoreDiffElem.classList.remove("score-value__diff--showing");
        scoreDiffElem.getAnimations().forEach((animation) => animation.finish());
        

        scoreDiffElem.innerHTML = "+" + scoreDiff;
        scoreDiffElem.classList.add("score-value__diff--showing");
    }

    bindMoveLeft(handler) {
        document.addEventListener('keydown', function(event) {
            event.preventDefault();
            if (event.code == 'ArrowLeft') {
                handler();
            }
          });
    }

    bindMoveRight(handler) {
        document.addEventListener('keydown', function(event) {
            event.preventDefault();
            if (event.code == 'ArrowRight') {
                handler();
            }
          });
    }

    bindMoveUp(handler) {
        document.addEventListener('keydown', function(event) {
            event.preventDefault();
            if (event.code == 'ArrowUp') {
                handler();
            }
          });
    }

    bindMoveDown(handler) {
        document.addEventListener('keydown', function(event) {
            event.preventDefault();
            if (event.code == 'ArrowDown') {
                handler();
            }
          });
        
    }

    bindReset(handler) {
        const btn = document.querySelector('.new-game-button');
        console.log(btn)
        if (btn) btn.addEventListener("click", (event) => {
            handler();
          });
    }
}