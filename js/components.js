"use strict";

Vue.component('cell-separator', {
    template: '<div class="cell separator" v-html="space"></div>',
    data: function() {
        return {
            space: "&nbsp;",
        }
    }
});

Vue.component('table-header', {
    template: '<div class="head">' +
              '  <div class="row">' +
              '    <div class="cell header big_font red">' +
              '      <h2 v-if="titleH2 != undefined">{{ titleH2 }}</h2>' +
              '      <h4 v-if="titleH4 != undefined">{{ titleH4 }}</h4>' +
              '    </div>' +
              '  </div>' +
              '</div>',
    props: ['titleH2', 'titleH4']
});
