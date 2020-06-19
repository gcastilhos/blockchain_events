"use strict";

var cellSeparator = Vue.component('cell-separator', {
    template: '<div class="cell separator" v-html="space"></div>',
    data: function() {
        return {
            space: "&nbsp;",
        }
    }
});

var tableHeader = Vue.component('table-header', {
    template: '<div class="red">' +
              '  <h2 class="big_font" v-if="titleH2 != undefined">{{ titleH2 }}</h2>' +
              '  <h4 class="big_font" v-if="titleH4 != undefined">{{ titleH4 }}</h4>' +
              '</div>',
    props: ['titleH2', 'titleH4']
});

var eventNumber = Vue.component('event-number', {
    template: '<div class="no_space_break"><h5 v-html="eventNumberText"></h5></div>',
    props: ['eventNumberText']
});

