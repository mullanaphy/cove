!function() {
    var utils = {
        rollDice: function(sides) {
            return Math.floor((Math.random() * sides) - 1);
        }
    };
    define(function() {
        return utils;
    });
}();