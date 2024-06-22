export default class Controller {
    constructor({model, view}) {
        this.model = model;
        this.view = view;
        
        let [x, y] = [2,1]//this.model.getAnyEmptyPosition();
        this.view.createSquare(this.model.addSquare(x, y, this.model.minNumber).id, x, y, this.model.minNumber);

        [x, y] = [2,3]//this.model.getAnyEmptyPosition();
        this.view.createSquare(this.model.addSquare(x, y, this.model.minNumber).id, x, y, this.model.minNumber);
        
        this.view.bindMoveLeft(() => {
            this.model.sumLeft();
            this.applyСhanges();
            
        });

        this.view.bindMoveRight(() => {
            this.model.sumRight();
            this.applyСhanges();
        });

        this.view.bindMoveUp(() => {
            this.model.sumUp();
            this.applyСhanges();
        });
        this.view.bindMoveDown(() => {
            this.model.sumDown();
            this.applyСhanges();
        });
    }

    applyСhanges() {
        this.view.deleteMergedSquares();

        this.model.squares.filter((s) => (!s.new))
        .forEach((s) => {
            this.view.editSquarePosition(s.id, s.row, s.cell, s.merged);
        });

        setTimeout(() => {
            this.model.squares.filter((s) => (s.new && s.value > this.model.minNumber)).forEach((s) => {
                this.view.createSquare(s.id, s.row, s.cell, s.value);
            });
        }, 100);

        setTimeout(() => {
            this.model.squares.filter((s) => (s.new && s.value === this.model.minNumber)).forEach((s) => {
                this.view.createSquare(s.id, s.row, s.cell, s.value);
            });
        }, 200);
        
    }
}
