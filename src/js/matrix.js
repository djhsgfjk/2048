export default class Matrix {
    constructor({rows, columns}){
        this.rows = rows;
        this.columns = columns;
        this.zeroCells = [];
        this.matrix = new Array(rows);
        
        for(let i = 0; i < rows; i++){
            this.matrix[i] = new Array(columns);
            for(let j = 0; j < columns; j++){
                this.matrix[i][j] = 0;
            }
        }
        
        this.matrixChanged = true;
        this.newCells = [];
    }

    initializeMatrix() {
        let x, y;
        
        this.newCells = [];
        [x, y] = [Math.floor(Math.random() * this.rows), Math.floor(Math.random() * this.columns)];
        this.matrix[x][y] = 2;
        this.newCells.push([x, y]);
        while(this.matrix[x][y] === 2) {
            [x, y] = [Math.floor(Math.random() * this.rows), Math.floor(Math.random() * this.columns)];
        }
        this.matrix[x][y] = 2;
        this.newCells.push([x, y]);

        this.matrixChanged = true;
    }

    fillRandomZeroCell() {
        if (this.matrixChanged && this.zeroCells.length > 0) {
            const [x, y] = getRandomArrayElement(this.zeroCells);
            this.matrix[x][y] = 2;
            this.newCells = [[x, y]];

        } else {
            this.newCells = [];
        }

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
        let count, value, sum;
        this.zeroCells = [];
        this.matrixChanged = false;
        for(let i = 0; i < this.rows; i++){
            count = 0; //j
            value = this.matrix[i][count];
            sum = value;
            for(let j = 1; j < this.columns; j++){
                if (value === 0) {
                    value = this.matrix[i][j];
                    sum = value;
                    continue;
                }
                if (sum < value * 2 && (this.matrix[i][j] === value || this.matrix[i][j] === 0)) {
                    sum += this.matrix[i][j];
                } else {
                    if (this.matrix[i][count] !== sum) 
                        this.matrixChanged = true;
                    this.matrix[i][count] = sum;
                    value = this.matrix[i][j];
                    sum = value;
                    count++;
                }
            }
            if (this.matrix[i][count] !== sum) 
                        this.matrixChanged = true;
            this.matrix[i][count] = sum;
            for (let j = count + 1; j < this.columns; j++) {
                if (this.matrix[i][j] !== 0) 
                        this.matrixChanged = true;
                this.matrix[i][j] = 0;
                this.zeroCells.push([i, j]);
            }
        }

        
        this.fillRandomZeroCell();
        
    }

    moveRight() {
        let count, value, sum;
        this.zeroCells = [];
        this.matrixChanged = false;
        for(let i = 0; i < this.rows; i++){
            count = this.columns - 1; //j
            value = this.matrix[i][count];
            sum = value;
            for(let j = this.columns - 2; j >= 0; j--){
                if (value === 0) {
                    value = this.matrix[i][j];
                    sum = value;
                    continue;
                }
                if (sum < value * 2 && (this.matrix[i][j] === value || this.matrix[i][j] === 0)) {
                    sum += this.matrix[i][j];
                } else {
                    if (this.matrix[i][count] !== sum) 
                        this.matrixChanged = true;
                    this.matrix[i][count] = sum;
                    value = this.matrix[i][j];
                    sum = value;
                    count--;
                }
            }
            if (this.matrix[i][count] !== sum) 
                        this.matrixChanged = true;
            this.matrix[i][count] = sum;
            for (let j = count - 1; j >= 0; j--) {
                if (this.matrix[i][j] !== 0) 
                        this.matrixChanged = true;
                this.matrix[i][j] = 0;
                this.zeroCells.push([i, j]);
            }
        }

        
        this.fillRandomZeroCell();
    }

    moveUp() {
        let count, value, sum;
        this.zeroCells = [];
        this.matrixChanged = false;
        for(let j = 0; j < this.columns; j++){
            count = 0; //i
            value = this.matrix[count][j];
            sum = value;
            for(let i = 1; i < this.rows; i++){
                if (value === 0) {
                    value = this.matrix[i][j];
                    sum = value;
                    continue;
                }
                if (sum < value * 2 && (this.matrix[i][j] === value || this.matrix[i][j] === 0)) {
                    sum += this.matrix[i][j];
                } else {
                    if (this.matrix[count][j] !== sum) 
                        this.matrixChanged = true;
                    this.matrix[count][j] = sum;
                    value = this.matrix[i][j];
                    sum = value;
                    count++;
                }
            }
            if (this.matrix[count][j] !== sum) 
                        this.matrixChanged = true;
            this.matrix[count][j] = sum;
            for (let i = count + 1; i < this.rows; i++) {
                if (this.matrix[i][j] !== 0) 
                        this.matrixChanged = true;
                this.matrix[i][j] = 0;
                this.zeroCells.push([i, j]);
            }
        }

       
        this.fillRandomZeroCell();
    }

    moveDown() {
        let count, value, sum;
        this.zeroCells = [];
        this.matrixChanged = false;
        for(let j = 0; j < this.columns; j++){
            count = this.rows - 1; //i
            value = this.matrix[count][j];
            sum = value;
            for(let i = this.rows - 2; i >= 0; i--){
                if (value === 0) {
                    value = this.matrix[i][j];
                    sum = value;
                    continue;
                }
                if (sum < value * 2 && (this.matrix[i][j] === value || this.matrix[i][j] === 0)) {
                    sum += this.matrix[i][j];
                } else {
                    if (this.matrix[count][j] !== sum) 
                        this.matrixChanged = true;
                    this.matrix[count][j] = sum;
                    value = this.matrix[i][j];
                    sum = value;
                    count--;
                }
            }
            if (this.matrix[count][j] !== sum) 
                        this.matrixChanged = true;
            this.matrix[count][j] = sum;
            for (let i = count - 1; i >= 0; i--) {
                if (this.matrix[i][j] !== 0) 
                        this.matrixChanged = true;
                this.matrix[i][j] = 0;
                this.zeroCells.push([i, j]);
            }
        }

        
        this.fillRandomZeroCell();
    }
}