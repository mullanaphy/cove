/**
 * Created with IntelliJ IDEA.
 * User: Mullanaphy
 * Date: 11/1/13
 * Time: 6:46 PM
 * To change this template use File | Settings | File Templates.
 */
define(['underscore', 'backbone'], function(_, Backbone) {
    return Backbone.View.extend({
        initialize: function(data, options) {
            this.dialog = options.dialog;
            if (_.isArray(this.dialog)) {
                this.dialog = [this.dialog];
            }
            this.index = 0;
            this.lines = this.dialog.length;
            this.listenTo(this.model, 'action', _.bind(this.render, this));
        },
        render: function() {
            if (this.index >= this.lines) {
                this.remove();
            } else {
                var line = this.dialog[this.index++];

            }
        }
    });
});