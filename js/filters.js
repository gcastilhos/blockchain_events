"use strict";

var filters = {
    encode: function(text) {
        if (text !== '') {
            return sha256(text);
        }
        return text;
    },
    recordAsString: function(record) {
        return record.join("|");
    }
};

export {filters as _filters};
