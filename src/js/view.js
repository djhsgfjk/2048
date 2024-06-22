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

    editSquare(row0, cell0, row, cell, value) {
        let square, squareLabel;

        square = document.querySelector(`[data-row="${row0}"][data-cell="${cell0}"]`);
        if (square) {
            square.dataset.row = row;
            square.dataset.cell = cell;

            squareLabel = square.children[0];
            squareLabel.innerHTML = value;
            squareLabel.dataset.value = value;
        }   
    }

    mergeSquare(row0, cell0) {
        console.log('row0, cell0', row0, cell0);
        const square = document.querySelector(`[data-row="${row0}"][data-cell="${cell0}"]`);
        console.log('square', square);
        if (square) square.dataset.merged = true;

    }

    deleteMergedSquares() {
        document.querySelectorAll(`.cell__square[data-merged=${true}]`).forEach((e) => (e.remove()));
    }

    deleteSquare(row0, cell0) {
        document.querySelector(`[data-row="${row0}"][data-cell="${cell0}"]`).remove();
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
}