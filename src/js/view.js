export default class View {
    constructor({rows, columns}) {
        let row, cell, square;
        

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

                square = document.createElement('div')
                square.classList.add('cell__square', 'square');
                cell.appendChild(square);
                square.innerHTML = 0;
                square.dataset.value = 0;

                square.addEventListener("animationend", function(event) {
                    event.target.classList.remove('emergence', 'slide-left', 'slide-right', 'slide-up', 'slide-down');
                });

                this.matrix[i][j] = square;
            }
        }
        
    }

    reloadGrid(modelMatrix, direction) {
        let square, value;

        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.columns; j++){
                value = modelMatrix[i][j];
                square = this.matrix[i][j];
                square.innerHTML = value ? value : '';
                console.log(square.dataset.value, value);
                if (value && square.dataset.value != value) {
                    switch(direction) {
                        case 1:
                            square.classList.add('slide-left');
                            break;
                        case 2:
                            square.classList.add('slide-right');
                            break;
                        case 3:
                            square.classList.add('slide-up');
                        case 4:
                            square.classList.add('slide-down');
                    }
                }
                square.dataset.value = value;
                
            }
        }
    }

    bindMoveLeft(handler) {
        document.addEventListener('keydown', function(event) {
            if (event.code == 'ArrowLeft') {
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

    bindEmergenceAnimation(squares) {
        squares.forEach(([i, j]) => {
            this.matrix[i][j].classList.remove('slide-left', 'slide-right', 'slide-up', 'slide-down');
            this.matrix[i][j].classList.add('emergence');
        });
    }
}