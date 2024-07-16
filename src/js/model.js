export default class Model {
    constructor({rows, columns, minNumber}) {
        this.rows = rows;
        this.columns = columns;
        this.minNumber = minNumber;
        this.score = 0;
        
        
        this._changed = true;
        this._lastDirection = null; // ['L', 'R', 'U', 'D']
        this._squares = new Array();
    }

    get changed() {
        return this._changed;
    }

    set changed(value) {
        this._changed = value;
    }

    get lastDirection() {
        return this._lastDirection;
    }

    set lastDirection(value) {
        this._lastDirection = value;
    }

    get squares() {
        return this._squares;
    }

    set squares(value) {
        this._squares = value;
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
            value: value});
        this.squares.push(newSquare);
        if (value > this.minNumber) {
            this.score += value
        }
        
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
        this.changed = false;
        this.lastDirection = 'L';
        for (let i = 0; i < this.rows; i++) {
            console.log('row = ', i);
            let a = null, b = null, c = null;
            const currRow = this.squares.filter((s) => (s.row === i)).sort((s1, s2) => (s1.cell - s2.cell));
            for (let j = 0; j < currRow.length; j++) {
                a = currRow[j];
                a.isNotNew();
                console.log('a before', a.id, a.row, a.cell);
                if (j === 0 && a.cell !== 0) {
                    a.editPosition(i, 0);
                    this.changed = true;
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
                        this.changed = true;
                    } else if (b.cell !== a.cell + 1) {
                        b.editPosition(a.row, a.cell + 1);
                        this.changed = true;
                    } 
                    console.log('b after',  b.id, b.row, b.cell);
                }
            }
        }
        console.log('changed', this.changed);
        console.log('--------------------');
    }

    sumRight() {
        console.log('--------------------');
        this.deleteMergedSquares();
        this.changed = false;
        this.lastDirection = 'R';
        for (let i = 0; i < this.rows; i++) {
            console.log('row = ', i);
            let a = null, b = null, c = null;
            const currRow = this.squares.filter((s) => (s.row === i)).sort((s1, s2) => (s2.cell - s1.cell));
            for (let j = 0; j < currRow.length; j++) {
                a = currRow[j];
                a.isNotNew();
                console.log('a before', a.id, a.row, a.cell);
                if (j === 0 && a.cell !== this.columns - 1) {
                    a.editPosition(i, this.columns - 1);
                    this.changed = true;
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
                        this.changed = true;
                    } else if (b.cell !== a.cell - 1) {
                        b.editPosition(a.row, a.cell - 1);
                        this.changed = true;
                    } 
                    console.log('b after',  b.id, b.row, b.cell);
                }
            }
        }
        console.log('--------------------');
    }

    sumUp() {
        console.log('--------------------');
        this.deleteMergedSquares();
        this.changed = false;
        this.lastDirection = 'U';
        for (let i = 0; i < this.columns; i++) {
            console.log('column = ', i);
            let a = null, b = null, c = null;
            const currRow = this.squares.filter((s) => (s.cell === i)).sort((s1, s2) => (s1.row - s2.row));
            for (let j = 0; j < currRow.length; j++) {
                a = currRow[j];
                a.isNotNew();
                console.log('a before', a.id, a.row, a.cell);
                if (j === 0 && a.row !== 0) {
                    a.editPosition(0, i);
                    this.changed = true;
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
                        this.changed = true;
                    } else if (b.row !== a.row + 1) {
                        b.editPosition(a.row + 1, a.cell);
                        this.changed = true;
                    } 
                    console.log('b after',  b.id, b.row, b.cell);
                }
            }
        }
        console.log('--------------------');
    }

    sumDown() {
        console.log('--------------------');
        this.deleteMergedSquares();
        this.changed = false;
        this.lastDirection = 'D';
        for (let i = 0; i < this.columns; i++) {
            console.log('column = ', i);
            let a = null, b = null, c = null;
            const currRow = this.squares.filter((s) => (s.cell === i)).sort((s1, s2) => (s2.row - s1.row));
            for (let j = 0; j < currRow.length; j++) {
                a = currRow[j];
                a.isNotNew();
                console.log('a before', a.id, a.row, a.cell);
                if (j === 0 && a.row !== this.rows - 1) {
                    a.editPosition(this.rows - 1, i);
                    this.changed = true;
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
                        this.changed = true;
                    } else if (b.row !== a.row - 1) {
                        b.editPosition(a.row - 1, a.cell);
                        this.changed = true;
                    } 
                    console.log('b after',  b.id, b.row, b.cell);
                }
            }
        }
        console.log('--------------------');
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