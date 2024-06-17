export default class Model {
    constructor({rows, columns}) {
        this.rows = rows;
        this.columns = columns;
        this.score = 0;
        
        this.squares = new Array(rows);
    }

    getAnyEmptyPosition() {
        let x, y;
        [x, y] = [Math.floor(Math.random() * this.rows), Math.floor(Math.random() * this.columns)];
        while(this.squares.some((s) => (s.row === x && s.cell === y))) {
            [x, y] = [Math.floor(Math.random() * this.rows), Math.floor(Math.random() * this.columns)];
        }
        return [x, y];
    }

    addSquare(x, y, value) {
        const newSquare = new Square(x, y, value);
        this.squares.push(newSquare);
        // return newSquare;
    }

    removeMergedSquares(x, y) {
        this.squares.filter((s) => {
            return !s.merged;
        });
    }

    // sumLeft() {
    //     for (let i = 0; i < this.rows; i++) {
            
    //     }
    // }
}

class Square{
    constructor({row, cell, value}) {
        this.row0 = null;
        this.cell0 = null;
        this.row = row;
        this.cell = cell;
        this.value = value;
        this.merged = false;
    }

    editPosition(row, cell) {
        this.row0 = this.row;
        this.cell0 = this.cell;
        this.row = row;
        this.cell = cell;
    }

    isMerged() {
        this.merged = true;
    }
}