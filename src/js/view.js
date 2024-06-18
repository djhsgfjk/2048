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
                    transition: transform 1s;
                }`;
                sheet.insertRule(rule, sheet.cssRules.length);

            }
        }
        
        
    }

    createSquare(row, cell, value) {
        let square, squareLabel;

        square = document.createElement('div');
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

    moveSquaresLeft() {
        document.querySelectorAll('.cell__square').forEach((s) => (s.dataset.cell = 0));
    }

    deleteMergedSquares(row, cell) {
        let squares = document.querySelectorAll(`div.cell__square[data-merged=${true}]`);

        squares.remove();
    }

    moveLeft() {
        document.querySelectorAll('.cell__square').forEach((s) => {
            s.dataset.cell = 0;
        });
    }

    bindMoveLeft(handler) {
        document.addEventListener('keydown', function(event) {
            event.preventDefault();
            if (event.code == 'ArrowLeft') {
                handler();
            }
          });

    }

    moveRight() {
        document.querySelectorAll('.cell__square').forEach((s) => {
            s.dataset.cell = this.columns - 1;
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

    moveUp() {
        document.querySelectorAll('.cell__square').forEach((s) => {
            s.dataset.row = 0;
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

    moveDown() {
        document.querySelectorAll('.cell__square').forEach((s) => {
            s.dataset.row = this.rows - 1;
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
}