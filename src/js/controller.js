export default class Controller {
    constructor({model, view}) {
        this.model = model;
        this.view = view;

        if (this.model.squares.length) {
            this.view.setSquares(this.model.squares);
            this.view.setScore(this.model.score);
            this.view.setBestScore(this.model.bestScore);
        } else {
            let [x, y] = this.model.getAnyEmptyPosition();
            this.view.createSquare(this.model.addSquare(x, y, this.model.minNumber).id, x, y, this.model.minNumber);

            [x, y] = this.model.getAnyEmptyPosition();
            this.view.createSquare(this.model.addSquare(x, y, this.model.minNumber).id, x, y, this.model.minNumber);

            this.view.setBestScore(this.model.bestScore);
        }
        
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

        this.view.bindReset(() => {
            this.model.reset();
            this.view.deleteAllSquares();
            this.view.resetScore();

            localStorage.setItem("score", 0);
            localStorage.setItem("squares", null);
            
            let [x, y] = this.model.getAnyEmptyPosition();
            this.view.createSquare(this.model.addSquare(x, y, this.model.minNumber).id, x, y, this.model.minNumber);

            [x, y] = this.model.getAnyEmptyPosition();
            this.view.createSquare(this.model.addSquare(x, y, this.model.minNumber).id, x, y, this.model.minNumber);

            
        })
    }

    applyСhanges() {            
        this.view.deleteMergedSquares();

        this.model.squares.filter((s) => (!s.new))
        .forEach((s) => {
            this.view.editSquarePosition(s.id, s.row, s.cell, s.merged);
        });

        this.model.squares.filter((s) => (s.new && s.value > this.model.minNumber)).forEach((s) => {
            this.view.createSquare(s.id, s.row, s.cell, s.value);
        });

        if (this.model.scoreDiff > 0) this.view.changeScore(this.model.score, this.model.scoreDiff);

        this.model.squares.filter((s) => (s.new && s.value === this.model.minNumber)).forEach((s) => {
            this.view.createSquare(s.id, s.row, s.cell, s.value);
        });

        if (this.model.score === this.model.bestScore) {
            this.view.setBestScore(this.model.bestScore);
            localStorage.setItem("bestScore", this.model.bestScore);
        }

        localStorage.setItem("score", this.model.score);
        localStorage.setItem("squares", this.model.toString());
    }
}
