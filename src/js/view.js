import Square from "./square";

export default class View {
    constructor() {
        console.log('creating View');
        this.game = document.querySelector('.game');
    }
}