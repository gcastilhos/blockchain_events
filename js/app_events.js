"use strict";

var mounted = function() {
        this.batch = this.$route.query.batch !== undefined ? this.$route.query.batch : 1;
        this.getData(this.batch);
};

var created = function() {
    setInterval(function() {
        this.batch = this.batch === 16 ? 1 : this.batch + 1;
        this.getData(this.batch);
    }.bind(this), 5000);
};

export {mounted as _mounted, created as _created};
