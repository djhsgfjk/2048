export default class Controller {
    constructor({model, view}) {
        this.model = model;
        this.view = view;
        
        let [x, y] = [2,1]//this.model.getAnyEmptyPosition();
        this.view.createSquare(this.model.addSquare(x, y, this.model.minNumber).id, x, y, this.model.minNumber);

        [x, y] = [2,3]//this.model.getAnyEmptyPosition();
        this.view.createSquare(this.model.addSquare(x, y, this.model.minNumber).id, x, y, this.model.minNumber);
        
        this.view.bindMoveLeft(() => {
            if (this.model.changed || this.model.lastDirection !== 'L') {
                this.model.sumLeft();
            }
            if (this.model.changed) {
                this.model.addSquare(...this.model.getAnyEmptyPosition(), this.model.minNumber);
                this.applyСhanges();
            }
        });

        this.view.bindMoveRight(() => {
            if (this.model.changed || this.model.lastDirection !== 'R') {
                this.model.sumRight();
            }
            if (this.model.changed) {
                this.model.addSquare(...this.model.getAnyEmptyPosition(), this.model.minNumber);
                this.applyСhanges();
            }
        });

        this.view.bindMoveUp(() => {
            if (this.model.changed || this.model.lastDirection !== 'U') {
                this.model.sumUp();
            }
            if (this.model.changed) {
                this.model.addSquare(...this.model.getAnyEmptyPosition(), this.model.minNumber);
                this.applyСhanges();
            }
        });
        this.view.bindMoveDown(() => {
            if (this.model.changed || this.model.lastDirection !== 'D') {
                this.model.sumDown();
            }
            if (this.model.changed) {
                this.model.addSquare(...this.model.getAnyEmptyPosition(), this.model.minNumber);
                this.applyСhanges();
            }
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
