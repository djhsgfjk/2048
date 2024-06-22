export default class Controller {
    constructor({model, view}) {
        this.model = model;
        this.view = view;
        
        let [x, y] = [2, 0]//this.model.getAnyEmptyPosition();
        this.model.addSquare(x, y, this.model.minNumber);
        this.view.createSquare(x, y, this.model.minNumber);

        [x, y] = [2, 2]//this.model.getAnyEmptyPosition();
        this.model.addSquare(x, y, this.model.minNumber);
        this.view.createSquare(x, y, this.model.minNumber);
        
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
        this.model.squares.filter((s) => (s.isMerged)).forEach((s) => {
            this.view.mergeSquare(s.getPrevRow, s.getPrevCell);
        })
        this.model.squares.forEach((s) => {
            if (s.getPrevRow === null && s.getPrevCell === null) {
                this.view.createSquare(s.getRow, s.getCell, s.getValue);
            } else {
                this.view.editSquare(s.getPrevRow, s.getPrevCell, s.getRow, s.getCell, s.getValue);
            }
        });
    }
}
