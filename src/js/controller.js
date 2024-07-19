export default class Controller {
    constructor({model, view}) {
        this.model = model;
        this.view = view;
        
        let [x, y] = this.model.getAnyEmptyPosition();
        this.view.createSquare(this.model.addSquare(x, y, this.model.minNumber).id, x, y, this.model.minNumber);

        [x, y] = this.model.getAnyEmptyPosition();
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
        this.view.finishAnimations();

        for (let i = 0; i < this.model.rows; i++) {
            for (let j = 0; j < this.model.columns; j++) {
                this.model.squares.filter((s) => (s.row === i && s.cell === j && !s.new))
                .forEach((s, index) => {
                    this.view.editSquarePosition(s.id, s.row, s.cell, s.merged);
                    if (index === 0) {
                        this.model.squares.filter((sFromMerged) => (sFromMerged.row === i && sFromMerged.cell === j && sFromMerged.new && sFromMerged.value > this.model.minNumber))
                        .forEach((sFromMerged) => {
                            this.view.bindCreateSquare(s.id, sFromMerged.id, sFromMerged.row, sFromMerged.cell, sFromMerged.value);
                        });
                    }
                });
            }
        }

        setTimeout(() => {
            this.model.squares.filter((sNew) => (sNew.new && sNew.value === this.model.minNumber))
            .forEach((sNew) => {
                this.view.createSquare(sNew.id, sNew.row, sNew.cell, sNew.value);
            });
        }, 200);
    }
}
