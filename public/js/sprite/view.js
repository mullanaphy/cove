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
            this.listenTo(this.model, 'continueBattle', _.bind(this.renderBattleField, this));
            this.listenTo(this.model, 'freeRoam', _.bind(this.renderWorld, this));
            this.user = this.model.get('user');
            this.blip = 0;
            this.options = options;
            this.canvas = this.options.canvas;
            this.context2D = this.canvas.getContext('2d');
            this.userImage = new Image();
        },
        renderBattleField: function() {

        },
        renderWorld: function() {
            var config = this.model.get('config');
            if (!this.model.inFocus(this.options.gameModel.getGrid())) {
                return;
            }
            switch (user.get('direction')) {
                case 'down':
                    context2D.drawImage(
                        image.user,
                        (0 + blip) * config.tile.x,
                        this.user.get('sprite') * config.tile.y,
                        config.tile.x,
                        config.tile.y,
                        7 * config.tile.x,
                        (7 * config.tile.y) - 2,
                        config.tile.x,
                        config.tile.y
                    );
                    break;

                case 'left':
                    context2D.drawImage(
                        image.user,
                        (2 + blip) * config.tile.x,
                        (this.user.get('sprite') + 1) * config.tile.y,
                        config.tile.x,
                        config.tile.y,
                        7 * config.tile.x,
                        (7 * config.tile.y) - 2,
                        config.tile.x,
                        config.tile.y
                    );
                    break;

                case 'right':
                    context2D.drawImage(
                        image.user,
                        (0 + blip) * config.tile.x,
                        (this.user.get('sprite') + 1) * config.tile.y,
                        config.tile.x,
                        config.tile.y,
                        7 * config.tile.x,
                        (7 * config.tile.y) - 2,
                        config.tile.x,
                        config.tile.y
                    );
                    break;

                default:
                    context2D.drawImage(
                        image.user,
                        (2 + blip) * config.tile.x,
                        this.user.get('sprite') * config.tile.y,
                        config.tile.x,
                        config.tile.y,
                        7 * config.tile.x,
                        (7 * config.tile.y) - 2,
                        config.tile.x,
                        config.tile.y
                    );
                    break;
            }
        }
    });
});