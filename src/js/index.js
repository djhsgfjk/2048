"use strict";
import '..\/css\/styles.css';
import Controller from './controller';
import View from './view';
import Matrix from './matrix';

new Controller({
    model: new Model({
            rows: 4,
            columns: 4,
        }),
    view: new View(),
});