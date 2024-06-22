export default class Model {
    constructor({rows, columns, minNumber}) {
        this.rows = rows;
        this.columns = columns;
        this.minNumber = minNumber;
        this.score = 0;
        
        this.squares = new Array();
    }

    getAnyEmptyPosition() {
        let x, y;
        [x, y] = [Math.floor(Math.random() * this.rows), Math.floor(Math.random() * this.columns)];
        while(this.squares.some((s) => (s.row === x && s.cell === y))) {
            [x, y] = [Math.floor(Math.random() * this.rows), Math.floor(Math.random() * this.columns)];
        }
        return [x, y];
    }

    addSquare(row, cell, value) {
        const newSquare = new Square({
            row: row, 
            cell: cell, 
            value:value});
        this.squares.push(newSquare);
        return newSquare;
    }

    deleteMergedSquares() {
        this.squares = this.squares.filter((s) => {
            return !s.merged;
        });
    }

    sumLeft() {
        
        console.log('--------------------');
        this.deleteMergedSquares();
        for (let i = 0; i < this.rows; i++) {
            console.log('row = ', i);
            let a = null, b = null, c = null;
            const currRow = this.squares.filter((s) => (s.row === i)).sort((s1, s2) => (s1.cell - s2.cell));
            for (let j = 0; j < currRow.length; j ++) {
                a = currRow[j];
                console.log('a before', a.getRow, a.getCell);
                if (a.isMerged) continue;
                if (j === 0) {
                    a.editPosition(i, 0);
                }
                console.log('a after', a.getRow, a.getCell);
                if (j + 1 < currRow.length) {
                    b = currRow[j + 1];
                    console.log('b before', b.getRow, b.getCell);
                    if (a.getValue === b.getValue) {
                        console.log('a.row, a.cell', a.row, a.getCell);
                        b.editPosition(a.getRow, a.getCell);
                        a.makeMerged();
                        b.makeMerged();
                        console.log('a.value === b.value', a, b);
                        c = this.addSquare(a.getRow, a.getCell, a.getValue + b.getValue);
                    } else if (a.getCell + 1 !== b.getCell) {
                        b.editPosition(a.getRow, a.getCell + 1);
                    } else {
                        b.editPosition(b.getRow, b.getCell);
                    }
                    console.log('b after', b.getRow, b.getCell);
                }
            }
        }

        const [x, y] = this.getAnyEmptyPosition();
        this.addSquare(x, y, this.minNumber);
        console.log(this.squares);
        console.log('--------------------');
    }

    sumRight() {
    }

    sumUp() {
    }

    sumDown() {
    }
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

    editPosition(newRow, newCell) {
        console.log('newRow, newCell', newRow, newCell)
        this.row0 = this.row;
        this.cell0 = this.cell;
        this.row = newRow;
        this.cell = newCell;
    }

    makeMerged() {
        this.merged = true;
    }

    get getPrevRow() {
        return this.row0
    }

    get getPrevCell() {
        return this.cell0
    }

    get getRow() {
        return this.row
    }

    get getCell() {
        return this.cell
    }

    get getValue() {
        return this.value
    }

    get isMerged() {
        return this.merged
    }
}