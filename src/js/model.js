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
        console.log('NEW EMPTY POSITIONS', x, y);
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
            for (let j = 0; j < currRow.length; j++) {
                a = currRow[j];
                a.isNotNew();
                console.log('a before', a.id, a.row, a.cell);
                if (j === 0) {
                    a.editPosition(i, 0);
                }
                console.log('a after', a.id, a.row, a.cell);
                if (j + 1 < currRow.length) {
                    b = currRow[j + 1];
                    console.log('b before', b.id, b.row, b.cell);
                    if (!a.merged && !b.merged && a.value === b.value) {
                        b.editPosition(a.row, a.cell);
                        a.makeMerged();
                        b.makeMerged();
                        console.log('a.value === b.value',  a.id,  b.id);
                        c = this.addSquare(a.row, a.cell, a.value + b.value);
                    } else {
                        b.editPosition(a.row, a.cell + 1);
                    } 
                    console.log('b after',  b.id, b.row, b.cell);
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
        this._id = Math.random().toString(16).slice(2);
        this._row = row;
        this._cell = cell;
        this._value = value;
        this._merged = false;
        this._new = true;
    }

    editPosition(newRow, newCell) {
        console.log('newRow, newCell', newRow, newCell)
        this._row = newRow;
        this._cell = newCell;
        this._new = false;
    }

    makeMerged() {
        this._merged = true;
        this._new = false;
    }

    isNotNew() {
        this._new = false;
    }

    get id() {
        return this._id
    }

    get row() {
        return this._row
    }

    get cell() {
        return this._cell
    }

    get value() {
        return this._value
    }

    get merged() {
        return this._merged
    }

    get new() {
        return this._new
    }
 }