"use strict";
import '..\/css\/styles.css';
import Controller from './controller';
import View from './view';
import Model from './model';

new Controller({
    model: new Model({
            rows: 4,
            columns: 4,
            minNumber: 2,
            bestScore: Number(localStorage.getItem("bestScore")),
            score: Number(localStorage.getItem("score")),
            squares:  (() => {
                try {
                    const squares = JSON.parse(localStorage.getItem("squares"));
                    return squares;
                } catch (e) {
                    return null;
                }})()
        }),
    view: new View({
        rows: 4,
        columns: 4,
    }),
});