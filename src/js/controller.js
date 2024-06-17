export default class Controller {
    constructor({model, view}) {
        this.model = model;
        this.view = view;
        
        // let [x, y] = this.model.getAnyEmptyPosition();
        // this.model.addSquare(x, y, 2);
        // this.view.createSquare(x, y, 2);

        // [x, y] = this.model.getAnyEmptyPosition();
        // this.model.addSquare(x, y, 2);
        // this.view.createSquare(x, y, 2);

        this.model.addSquare(0, 0, 2);
        this.view.createSquare(0, 0, 2);

        this.model.addSquare(1, 2, 2);
        this.view.createSquare(1, 2, 2);
    }
}
