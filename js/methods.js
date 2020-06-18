"use strict";

var encode = (text) => {
    if (text !== '') {
        return sha256(text);
    }
    return text;
};

var categoryColors = {
    'A': 'white',
    'B': 'cyan',
    'C': 'yellow',
    'D': 'orange',
    'E': 'lightGreen',
    'F': 'magenta',
    'G': 'pink',
    'H': 'lightGrey',
    'UNDETM': 'brown',
};

var methods = {

   padding: function(value, index) {
        var text = value;
        for (var i = 0; i < this.padSize[index] - value.toString().length; ++i) {
            text = "&nbsp;" + text;
        }
        return text;
    },
    getData: function(batch) {
        axios.
            get("./data/events_" + batch + ".json").
            then(response => {
                var data = response.data;
                this.records.splice(data.data.length);
                data.data.forEach((rec, index) => this.$set(this.records, index, rec.slice(1)));
                this.header.splice(data.columns.length - 1);
                this.header = data.columns.slice(1);
                this.encodeAll();
             });
    },
    getTotals: function(batch) {
        axios.
            get("./data/power_composition_" + batch + ".json").
            then(response => {
                var data = response.data;
                this.totals.splice(data.data.length);
                data.data.forEach((rec, index) => this.$set(this.totals, index, rec));
                this.totals.splice(0, 0, this.categoryHeader);
             });
        axios.
            get("./data/event_numbers_" + batch + ".json").
            then(response => {
                response.data.forEach((rec, index) => this.$set(this.eventNumbers, index, rec));
             });
   },
     encodeAll: function() {
        var finalHash = '';
        this.records.forEach((rec) => {
            finalHash += encode(rec);
        });
        this.finalHash = encode(finalHash);
    },
    eventColor: function(category) {
        return categoryColors[category];
    }
};

export {encode as _encode, methods as _methods}; 