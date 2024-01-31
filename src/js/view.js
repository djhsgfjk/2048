import Square from "./square";

export default class View {
    constructor() {
        console.log('creating View');
        this.game = document.querySelector('.game');
        this.btn = document.querySelector('.test-btn');
        this.square = document.createElement('div', ['cell__square--2 square']);
            
        console.log(this.btn);
        this.btn.addEventListener('click', () => {
            console.log('clicked!');
            console.log('sq1!');
            console.log('Square', new Square());
            console.log('sq2!');
            
        });
    }
}