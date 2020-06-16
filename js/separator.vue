<template>
    Vue.component('cell-separator', {
    <div class="cell separator" v-html="space"></div>'
</template>

<script>
    module.exports = {
        data: function() {
            return {
                space: "&nbsp;"
            }
        }
    };
</script>
