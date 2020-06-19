"use strict";

var mounted = function() {
    this.getData(this.batch);
    this.getTotals(this.batch);
};

var created = function() {
    setInterval(function() {
        this.batch = this.batch === 15 ? 1 : this.batch + 1;
        this.getData(this.batch);
        this.getTotals(this.batch);
    }.bind(this), 5000);
};

export {mounted as _mounted, created as _created};
