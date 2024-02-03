// export default 
'use strict';
class Matrix {
    constructor({rows, columns}){
        let x, y;

        this.rows = rows;
        this.columns = columns;
        this.matrix = new Array(rows);
        
        for(let i = 0; i < rows; i++){
            this.matrix[i] = new Array(columns);
            for(let j = 0; j < columns; j++){
                this.matrix[i][j] = 0;
            }
        }
        [x, y] = [Math.floor(Math.random() * rows), Math.floor(Math.random() * columns)];
        this.matrix[x][y] = 2;
        while(this.matrix[x][y] === 2) {
            [x, y] = [Math.floor(Math.random() * rows), Math.floor(Math.random() * columns)];
    
        }
        this.matrix[x][y] = 2;
        // this.matrix[1][3] = 2;
        // this.matrix[3][0] = 2;

    }

    #fillRandomZeroCell() {
        const [x, y] = getRandomArrayElement(this.zeroCells);
        this.matrix[x][y] = 2;

        function getRandomArrayElement(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        }
    }

    printMatrix() {
        for(let i = 0; i < this.rows; i++){
            console.log(this.matrix[i]);
        }
        console.log('\n');
    }

    moveLeft() {
        let x, y, value, sum;
        this.zeroCells = [];
        for(let i = 0; i < this.rows; i++){
            [x, y] = [i, 0];
            value = this.matrix[i][0];
            sum = value;
            for(let j = 1; j < this.columns; j++){
                if (value === 0) {
                    value = this.matrix[i][j];
                }
                if (this.matrix[i][j] === value || this.matrix[i][j] === 0) {
                    sum += this.matrix[i][j];
                    this.matrix[i][j] = 0;
                    this.zeroCells.push([i, j]);
                } else {
                    this.matrix[x][y] = sum;
                    
                    [x, y] = [x, y+1];
                    value  = this.matrix[i][j];
                    sum = value;
                }
            }
            this.matrix[x][y] = sum;
        }

        this.#fillRandomZeroCell();
    }

    moveRight() {
        let x, y, value, sum;
        this.zeroCells = [];
        for(let i = 0; i < this.rows; i++){
            [x, y] = [i, this.columns - 1];
            value = this.matrix[i][this.columns - 1];
            sum = value;
            for(let j = this.columns - 2; j > 0; j--){
                if (value === 0) {
                    value = this.matrix[i][j];
                }
                if (this.matrix[i][j] === value || this.matrix[i][j] === 0) {
                    sum += this.matrix[i][j];
                    this.matrix[i][j] = 0;
                    this.zeroCells.push([i, j]);
                } else {
                    this.matrix[x][y] = sum;
                    
                    [x, y] = [x, y-1];
                    value  = this.matrix[i][j];
                    sum = value;
                }
            }
            this.matrix[x][y] = sum;
        }

        this.#fillRandomZeroCell();
    }

    moveUp() {
        let x, y, value, sum;
        this.zeroCells = [];
        for(let j = 0; j < this.columns; j++){
            [x, y] = [0, j];
            value = this.matrix[0][j];
            sum = value;
            for(let i = 1; i < this.rows; i++){
                if (value === 0) {
                    value = this.matrix[i][j];
                }
                if (this.matrix[i][j] === value || this.matrix[i][j] === 0) {
                    sum += this.matrix[i][j];
                    this.matrix[i][j] = 0;
                    this.zeroCells.push([i, j]);
                } else {
                    this.matrix[x][y] = sum;
                    
                    [x, y] = [x+1, y];
                    value  = this.matrix[i][j];
                    sum = value;
                }
            }
            this.matrix[x][y] = sum;
        }

        this.#fillRandomZeroCell();
    }

    moveDown() {
        let x, y, value, sum;
        this.zeroCells = [];
        for(let j = 0; j < this.columns; j++){
            [x, y] = [this.rows - 1, j];
            value = this.matrix[this.rows - 1][j];
            sum = value;
            for(let i = this.rows - 2; i > 0; i--){
                if (value === 0) {
                    value = this.matrix[i][j];
                }
                if (this.matrix[i][j] === value || this.matrix[i][j] === 0) {
                    sum += this.matrix[i][j];
                    this.matrix[i][j] = 0;
                    this.zeroCells.push([i, j]);
                } else {
                    this.matrix[x][y] = sum;
                    
                    [x, y] = [x-1, y];
                    value  = this.matrix[i][j];
                    sum = value;
                }
            }
            this.matrix[x][y] = sum;
        }

        this.#fillRandomZeroCell();
    }
}

// const matrix = new Matrix({
//     rows: 4,
//     columns: 4,
// });
// matrix.printMatrix();
// matrix.moveDown();
// matrix.printMatrix();
// matrix.moveDown();
// matrix.printMatrix();
// matrix.moveDown();
// matrix.printMatrix();
// matrix.moveDown();
// matrix.printMatrix();
// matrix.moveDown();
// matrix.printMatrix();
// matrix.moveDown();
// matrix.printMatrix();