"use strict";

import {_methods, _encode} from './methods.js';
import {_mounted, _created} from './app_events.js';

var router = new VueRouter({
    mode: 'history',
    routes: []
});

var app = new Vue({
    router,
    el:'#app',
    data: {
        records: [],
        totals: [],
        header: [],
        eventNumbers: [],
        categoryHeader: ['Use Category', 'Name&nbsp;of&nbsp;the&nbsp;Category', 'TOTAL in&nbsp;KWH'],
        finalHash: '',
        batch: 1,
        padSize: [5, 10, 8, 3, 10, 12, 10, 15, 10, 11, 15, 15, 15, 15, 35]
    },
    filters: {
        encode: _encode,
        recordAsString: function(record) {
            return record.join("|");
        },
    },
    methods: _methods,
    mounted: _mounted,
    created:  _created
});

export {app, router};
