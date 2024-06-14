export default class Model {
    constructor({rows, columns}) {
        this.rows = rows;
        this.columns = columns;
        this.score = 0;

        this.squares = new Array(rows);
    }

    addSquare(x, y, value) {
        this.squares.append({
            'row': x,
            'cell': y,
            'value': value,
            'merged': false
        });
    }

    removeMergedSquares(x, y) {
        this.squares.filter(({row, cell, merged}) => {
            return !merged;
        });
    }

    initializeMatrix() {
        let x, y;
        
        [x, y] = [Math.floor(Math.random() * this.rows), Math.floor(Math.random() * this.columns)];
        this.matrix[x][y] = 2;
        while(this.matrix[x][y] === 2) {
            [x, y] = [Math.floor(Math.random() * this.rows), Math.floor(Math.random() * this.columns)];
        }
        this.matrix[x][y] = 2;
    }

    sumLeft() {
        for (let i = 0; i < this.rows; i++) {
            matrx[i][]
        }
    }
}