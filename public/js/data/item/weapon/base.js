/**
 * Created with IntelliJ IDEA.
 * User: Mullanaphy
 * Date: 11/15/13
 * Time: 6:37 PM
 * To change this template use File | Settings | File Templates.
 */
define(['data/item'], function(Item) {
    return Item.extend({
        defaults: function() {
            return {
                name: 'Bare Knuckled'
            };
        },
        applyStats: function(stats) {

        },
        getDamage: function(stats, rollDice) {

        },
        getEffects: function(rollDice) {

        },
        animateHit: function(location, spriteLocation) {

        },
        animateMiss: function(location, spriteLocation) {

        }
    });
});