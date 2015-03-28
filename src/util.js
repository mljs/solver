var math = require("mathjs");

Util = {

    /*
     * Function that given a column vector and the maximum of that vector,
     * returns the index where is it, if there are more of two maximum,
     * it returns the first index found.
     *
     * @param {Vector} vector - Column vector.
     * @param {Number|BigNumber} number - Maximum of the vector.
     * @return {Number} index - Index of the first maximum.
     *
     * */
    getIndexColumn : function(vector, number) {
        var size = math.subset(math.size(vector), math.index(0));
        for(var index = 0; index < size; ++index) {
            var value = math.subset(vector, math.index(index, 0));
            if( math.equal(value, number) ) {
                return index;
            }
        }
    },

    /*
     * Function that given a column vector and the maximum of that vector,
     * returns the index where is it, if there are more of two maximum,
     * it returns the first index found.
     *
     * @param {Vector} vector - Row vector.
     * @param {Number|BigNumber} number - Maximum of the vector.
     * @return {Number} index - Index of the first maximum.
     *
     * */
    getIndexRow : function(vector, number) {
        var size = math.subset(math.size(vector), math.index(0));
        for(var index = 0; index < size; ++index) {
            var value = math.subset(vector, math.index(index));
            if( math.equal(value, number) ) {
                return index;
            }
        }
    }


};
