define(['underscore', 'backbone', 'user/model', 'jquery', 'text!view/dialog.html', 'text!view/menu.html', 'game/view/speechBubble'], function(_, Backbone, UserModel, $, dialogTemplate, menuTemplate, SpeechBubbleView) {

    return Backbone.Model.extend({
        templates: {
            dialog: _.template(dialogTemplate),
            menu: _.template(menuTemplate)
        },
        initialize: function() {
            this.set($.extend(true, this.defaults(), this.toJSON()));
            if (this.has('user')) {
                this.set('user', new UserModel(this.get('user')));
            } else {
                this.set('user', new UserModel);
            }
            this.get('user').on('move', _.bind(this.move, this));
        },
        move: function() {
            var screenSize = this.get('size');
            var gameSize = this.get('screenSize');
            var gameWraps = this.get('wraps');
            var userLocation = this.get('user').get('location');
            var grid = {
                x1: userLocation.x - screenSize.x,
                x2: userLocation.x + screenSize.x,
                y1: userLocation.y - screenSize.y,
                y2: userLocation.y + screenSize.y
            };
            if (grid.x1 < 0) {
                if (gameWraps) {
                    grid.x1 = gameSize.x + grid.x1 - 1;
                } else {
                    grid.x1 = 0;
                }
            }
            if (grid.y1 < 0) {
                if (gameWraps) {
                    grid.y1 = gameSize.y + grid.y1 - 1;
                } else {
                    grid.y1 = 0;
                }
            }
            if (grid.x2 > gameSize.x) {
                if (gameWraps) {
                    grid.x2 = grid.x2 - gameSize.x - 1;
                } else {
                    grid.x2 = gameSize.x - 1;
                }
            }
            if (grid.y2 > gameSize.y) {
                if (gameWraps) {
                    grid.y2 = grid.y2 - gameSize.y - 1;
                } else {
                    grid.y2 = gameSize.y - 1;
                }
            }
            this.set('grid', grid);
        },
        defaults: function() {
            return {
                fps: 15,
                tile: {
                    x: 32,
                    y: 32
                },
                keys: {
                    LEFT: 37,
                    UP: 38,
                    RIGHT: 39,
                    DOWN: 40,
                    PAUSE: 27,
                    ACTION: 32,
                    MENU: 17
                },
                blip: 0,
                location: {
                    x: 0,
                    y: 0
                },
                size: {
                    x: 16,
                    y: 16
                }
            };
        },
        speak: function(content) {
            new SpeechBubbleView(content);
        }
    });
});