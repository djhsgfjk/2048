export default class Controller {
    constructor({model, view}) {
        this.model = model;
        this.view = view;

        this.model.initializeMatrix();
        this.view.reloadGrid(this.model.matrix);
        
        this.view.bindMoveLeft(() => {
            this.model.moveLeft();
            this.view.reloadGrid(this.model.matrix);
        });
        this.view.bindMoveRight(() => {
            this.model.moveRight();
            this.view.reloadGrid(this.model.matrix);
        });
        this.view.bindMoveUp(() => {
            this.model.moveUp();
            this.view.reloadGrid(this.model.matrix);
        });
        this.view.bindMoveDown(() => {
            this.model.moveDown();
            this.view.reloadGrid(this.model.matrix);
        });
    }
}
