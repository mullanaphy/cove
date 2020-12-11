/**
 * Created with IntelliJ IDEA.
 * User: Mullanaphy
 * Date: 11/15/13
 * Time: 6:37 PM
 * To change this template use File | Settings | File Templates.
 */
define(['data/item/armor/base'], function(Base) {
    return Base.extend({
        defaults: function() {
            return {
                name: 'Backhand'
            };
        }
    });
});