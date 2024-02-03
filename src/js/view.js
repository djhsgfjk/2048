export default class View {
    constructor({rows, columns}) {
        let row, cell;
        

        this.rows = rows;
        this.columns = columns;

        this.grid = document.querySelector('.grid');
        this.matrix = new Array(rows);

        for(let i = 0; i < rows; i++){
            row = document.createElement('div')
            row.classList.add('grid__row', 'row');
            this.grid.appendChild(row);
            
            this.matrix[i] = new Array(columns);
            for(let j = 0; j < columns; j++){
                cell = document.createElement('div')
                cell.classList.add('row__cell', 'cell');
                row.appendChild(cell);
                
                cell.innerHTML = 0;
                cell.dataset.value = 0;

                this.matrix[i][j] = cell;
            }
        }
        
    }

    reloadGrid(modelMatrix) {
        let cell, value;

        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.columns; j++){
                value = modelMatrix[i][j];
                cell = this.matrix[i][j];
                cell.innerHTML = value ? value : '';
                cell.dataset.value = value;
            }
        }
    }

    bindMoveLeft(handler) {
        document.addEventListener('keydown', function(event) {
            if (event.code == 'ArrowLeft') {
                console.log(this);
                handler();
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