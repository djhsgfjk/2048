"use strict";
import '..\/css\/styles.css';
import Controller from './controller';
import View from './view';
import Matrix from './matrix';

console.log('start');

new Controller({
    model: new Matrix({
            rows: 4,
            columns: 4,
        }),
    view: new View({
        rows: 4,
        columns: 4,
    }),
});

console.log('start2');