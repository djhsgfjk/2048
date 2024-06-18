export default class View {
    constructor({rows, columns}) {
        this.grid = document.querySelector('.grid');

        for(let i = 0, row, cell, innerCell; i < rows; i++){
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

            }
        }
        
        this.squaresContainer = document.querySelector('.squares-container');
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

    deleteMergedSquares(row, cell) {
        let squares = document.querySelectorAll(`div.cell__square[data-row=${row}][data-cell=${cell}][data-merged=${true}]`);

        squares.remove();
    }
}