/**
 * Created with IntelliJ IDEA.
 * User: Mullanaphy
 * Date: 11/1/13
 * Time: 6:46 PM
 * To change this template use File | Settings | File Templates.
 */
define(['backbone', 'jquery'], function(Backbone, $) {
    return Backbone.View.extend({
        initialize: function() {
            this.el = $('body');
            this.$el.focus();
        },
        events: {
            'keydown': 'eventInput'
        },
        eventInput: function(event) {
            var user = this.model.get('user');
            console.log(event);
            this.actions[user.get('status')](event, this.model.get('keys'), user.get('user'), this.model.get('gameModel'));
        },
        actions: {
            talking: function(event, keys, user, gameModel) {
                switch (event.keyCode) {
                    case keys.LEFT:
                        break;

                    case keys.DOWN:
                        break;

                    case keys.RIGHT:
                        break;

                    case keys.UP:
                        break;

                    case keys.ACTION:
                        if (sprite.get('talking')) {
                            return;
                        }
                        user.trigger('continue');
                        break;

                    case keys.CANCEL:
                        user.trigger('cancel');
                        break;
                }
            },
            roaming: function(event, keys, user, gameModel) {
                switch (event.keyCode) {
                    case keys.LEFT:
                        user.set('direction', 'left');
                        --step.x;
                        if (step.x < 0) {
                            if (tileset.wrap) {
                                step.x = tileset.tiles[0].length - 1;
                            }
                            else {
                                return;
                            }
                        }
                        break;

                    case keys.DOWN:
                        user.set('direction', 'left');
                        ++step.y;
                        if (step.y >= tileset.tiles.length) {
                            if (tileset.wrap) {
                                step.y = 0;
                            }
                            else {
                                return;
                            }
                        }
                        break;

                    case keys.RIGHT:
                        user.set('direction', 'right');
                        ++step.x;
                        if (step.x >= tileset.tiles[0].length) {
                            if (tileset.wrap) {
                                step.x = 0;
                            }
                            else {
                                return;
                            }
                        }
                        break;

                    case keys.UP:
                        user.set('direction', 'up');
                        --step.y;
                        if (step.y < 0) {
                            if (tileset.wrap) {
                                step.y = tileset.tiles.length - 1;
                            }
                            else {
                                return;
                            }
                        }
                        break;

                    case keys.ACTION:
                        user.trigger('talk');
                        break;

                    case keys.CANCEL:
                        user.trigger('pause');
                        break;
                }
                if (user.get('status') === 'roaming') {
                    var movement = user.get('movement');
                    if ((movement == 2) || (movement == tileset.tiles[step.y][step.x].type)) {
                        user.set('location', step);
                    }
                }

            }
        }
    });
});
