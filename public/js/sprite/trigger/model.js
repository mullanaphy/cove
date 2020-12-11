define(['underscore', 'backbone', 'jquery'], function(_, Backbone, $) {
    return Backbone.Model.extend({
        defaults: function() {
            return  {
                name: 'Door',
                action: '',
                tileset: 'triggers.png',
                location: {
                    x: 0,
                    y: 0
                }
            };
        }
    });
});