"use strict";
import '..\/css\/styles.css';
import Controller from './controller';
import View from './view';
import Model from './model';

new Controller({
    model: new Model({
            rows: 4,
            columns: 4,
        }),
    view: new View({
        rows: 4,
        columns: 4,
    }),
});