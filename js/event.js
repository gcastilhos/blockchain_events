"use strict";

(function() {

    var _encode = function(text) {
        if (text !== '') {
            return sha256(text);
        }
        return text;
    };
 
    var router = new VueRouter({
        mode: 'history',
        routes: []
    });

    var app = new Vue({
        router,
        el:'#app',
        data: {
            records: [],
            header: [],
            finalHash: '',
            batch: 1,
            padSize: [6, 12, 18, 4, 15, 15, 10, 5, 6, 6, 5, 5, 5, 5]
        },
        filters: {
            encode: _encode,
            recordAsString: function(record) {
                return record.join("|");
            },
        },
        methods: {
            padding: function(value, index) {
                var text = value;
                for (var i = 0; i < this.padSize[index] - value.toString().length; ++i) {
                    text = "&nbsp;" + text;
                }
                return text;
            },
            getData: function(batch) {
                axios.
                    get("./data/records_" + batch + ".json").
                    then(response => {
                        var data = response.data;
                        this.records.splice(data.data.length);
                        data.data.forEach((rec, index) => this.$set(this.records, index, rec.slice(1)));
                        this.header.splice(data.columns.length - 1);
                        this.header = data.columns.slice(1);
                        this.encodeAll();
                     });
            },
            encodeAll: function() {
                var finalHash = '';
                this.records.forEach((rec) => {
                    finalHash += _encode(rec);
                });
                this.finalHash = _encode(finalHash);
            },
        },
        mounted: function() {
            this.batch = this.$route.query.batch !== undefined ? this.$route.query.batch : 1;
            this.getData(this.batch);
        },
        created: function() {
            setInterval(function() {
                this.batch = this.batch === 100 ? 1 : this.batch + 1;
                this.getData(this.batch);
            }.bind(this), 5000);
        }
    });
})()
