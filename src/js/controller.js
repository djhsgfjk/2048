export default class Controller {
    constructor({model, view}) {
        this.model = model;
        this.view = view;

        this.model.initializeMatrix();
        this.view.reloadGrid(this.model.matrix);
        this.view.bindEmergenceAnimation(this.model.newCells);
        
        this.view.bindMoveLeft(() => {
            this.model.moveLeft();
            this.view.reloadGrid(this.model.matrix, 1);
            this.view.bindEmergenceAnimation(this.model.newCells);
        });

        this.view.bindMoveRight(() => {
            this.model.moveRight();
            this.view.reloadGrid(this.model.matrix, 2);
            this.view.bindEmergenceAnimation(this.model.newCells);
        });

        this.view.bindMoveUp(() => {
            this.model.moveUp();
            this.view.reloadGrid(this.model.matrix, 3);
            this.view.bindEmergenceAnimation(this.model.newCells);
        });
        this.view.bindMoveDown(() => {
            this.model.moveDown();
            this.view.reloadGrid(this.model.matrix, 4);
            this.view.bindEmergenceAnimation(this.model.newCells);
        });
    }
}
