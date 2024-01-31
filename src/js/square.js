export default class Square {
    constructor(){
        console.log('this is Square!');
        this.cell = this.getRandomFreeCell();
        if (this.cell) {
            this.square = document.createElement('div');
            this.square.classList.add('cell__square--2', 'square');
            this.square.innerHTML = '2'
            this.cell.appendChild(this.square);
        } 
    }

    getRandomFreeCell() {
        const cells = document.querySelectorAll('.cell:empty');
        if (cells.length > 0) {
            const cell = getRandomElement(cells);
            return cell;
        }
    }
}

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}