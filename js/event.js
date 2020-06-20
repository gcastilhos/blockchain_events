"use strict";

import {_methods} from './methods.js';
import {_mounted, _created} from './app_events.js';
import {_filters} from './filters.js';

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
        categoryHeader: ['Use<br />Category', 'Name&nbsp;of&nbsp;the&nbsp;Category', 'TOTAL<br />in&nbsp;KWH'],
        batch: 1,
        textAlignment: [1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        titleEvents: 'EVENT USE  CATEGORIZATION',
        subTitleEvents: '(Grouping and FILTERING as per USAGE.)',
        titleTotals: 'CONSUMPTION<br />CONSOLIDATION&nbsp;PER<br />CATEGORY',
    },
    filters: _filters,
    methods: _methods,
    mounted: _mounted,
    created: _created,
    computed: {
    },
});

export {app, router};
