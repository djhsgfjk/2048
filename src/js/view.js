export default class View {
    constructor() {
        this.grid = document.querySelector('.grid');
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

        grid.appendChild(square);
    }

    deleteMergedSquares(row, cell) {
        let squares = document.querySelectorAll(`div.cell__square[data-row=${row}][data-cell=${cell}][data-merged=${true}]`);

        squares.remove();
    }

    // reloadGrid(modelMatrix, direction) {
    //     let square, value;

    //     for(let i = 0; i < this.rows; i++){
    //         for(let j = 0; j < this.columns; j++){
    //             value = modelMatrix[i][j];
    //             square = this.matrix[i][j];
    //             square.innerHTML = value ? value : '';
    //             console.log(square.dataset.value, value);
    //             if (value && square.dataset.value != value) {
    //                 switch(direction) {
    //                     case 1:
    //                         square.classList.add('slide-left');
    //                         break;
    //                     case 2:
    //                         square.classList.add('slide-right');
    //                         break;
    //                     case 3:
    //                         square.classList.add('slide-up');
    //                     case 4:
    //                         square.classList.add('slide-down');
    //                 }
    //             }
    //             square.dataset.value = value;
                
    //         }
    //     }
    // }

    // bindMoveLeft(handler) {
    //     document.addEventListener('keydown', function(event) {
    //         if (event.code == 'ArrowLeft') {
    //             handler();
    //         }
    //       });

    // }

    // bindMoveRight(handler) {
    //     document.addEventListener('keydown', function(event) {
    //         if (event.code == 'ArrowRight') {
    //             handler();
    //         }
    //       });
        
    // }

    // bindMoveUp(handler) {
    //     document.addEventListener('keydown', function(event) {
    //         if (event.code == 'ArrowUp') {
    //             handler();
    //         }
    //       });
        
    // }

    // bindMoveDown(handler) {
    //     document.addEventListener('keydown', function(event) {
    //         if (event.code == 'ArrowDown') {
    //             handler();
    //         }
    //       });
        
    // }

    // bindEmergenceAnimation(squares) {
    //     squares.forEach(([i, j]) => {
    //         this.matrix[i][j].classList.remove('slide-left', 'slide-right', 'slide-up', 'slide-down');
    //         this.matrix[i][j].classList.add('emergence');
    //     });
    // }
}