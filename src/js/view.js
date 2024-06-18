export default class View {
    constructor({rows, columns}) {
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

                rule = `[data-row="${i}"][data-cell="${j}"] { transform: translate(${j * 110 + 10}px, ${i * 110 - 430}px); }`;
                sheet.insertRule(rule, sheet.cssRules.length);

            }
        }
        
        
    }

    createSquare(row, cell, value) {
        let square;

        square = document.createElement('div');
        square.classList.add('cell__square');
        square.innerHTML = value;
        square.dataset.row = row;
        square.dataset.cell = cell;
        square.dataset.value = value;
        square.dataset.merged = false;

        this.squaresContainer.appendChild(square);
    }

    moveSquaresLeft() {
        document.querySelectorAll('.cell__square').forEach((s) => (s.dataset.cell = 0));
    }

    deleteMergedSquares(row, cell) {
        let squares = document.querySelectorAll(`div.cell__square[data-merged=${true}]`);

        squares.remove();
    }

    bindMoveLeft(handler) {
        document.addEventListener('keydown', function(event) {
            if (event.code == 'ArrowLeft') {
                handler();
                document.querySelectorAll('.cell__square').forEach((s) => {
                    console.log(s); 
                    s.dataset.cell = 0;
                });
            }
          });

    }

    bindMoveRight(handler) {
        document.addEventListener('keydown', function(event) {
            if (event.code == 'ArrowRight') {
                handler();
            }
          });
        
    }

    bindMoveUp(handler) {
        document.addEventListener('keydown', function(event) {
            if (event.code == 'ArrowUp') {
                handler();
            }
          });
        
    }

    bindMoveDown(handler) {
        document.addEventListener('keydown', function(event) {
            if (event.code == 'ArrowDown') {
                handler();
            }
          });
        
    }
}