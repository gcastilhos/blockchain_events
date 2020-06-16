"use strict";

Vue.component('cell-separator', {
    template: '<div class="cell separator" v-html="space"></div>',
    data: function() {
        return {
            space: "&nbsp;",
        }
    }
});
