/**
 *
 */
define(['underscore', 'backbone', 'sprite/trigger/model'], function(_, Backbone, TriggerModel) {

    return Backbone.Collection.extend({
        model: TriggerModel,
        initialize: function(data, options) {
            this.options = options;
            this.options.gameModel.get('user').on('move', _.bind(this.findSteppingStone, this));
        },
        findSteppingStone: function() {
            var user = this.options.gameModel.get('user');
            var direction = user.get('direction');
            var closestSprites = this.getClosestSprites();
            if (closestSprites.length) {
                var closest = closestSprites[0];
                var count = closestSprites.length;
                if (count > 1) {
                    for (var i = 1; i < count; ++i) {
                        if (closestSprites[i] < closet.distance) {
                            closest = closestSprites[i];
                        }
                    }
                }
                user.talkTo(closest.sprite);
            }
        },
        getClosestSprites: function(direction, x, y) {
            var collection = this.filter(function(item) {
                var location = item.get('location');
                var talkingRange = item.get('range');
                var distance = null;
                switch (direction) {
                    case 'up':
                        if (location.x > x && location.y === y) {
                            distance = location.x - x;
                        }
                        break;
                    case 'down':
                        if (location.x < x && location.y === y) {
                            distance = x - location.x;
                        }
                        break;
                    case 'left':
                        if (location.x === x && location.y < y) {
                            distance = y - location.y;
                        }
                        break;
                    case 'right':
                        if (location.x === x && location.y > y) {
                            distance = location.y - y;
                        }
                        break;
                }
                if (distance === null || distance > talkingRange) {
                    return distance;
                }
                return {
                    distance: distance,
                    sprite: item
                };
            });
            if (collection.length) {
                return collection[0];
            } else {
                return false;
            }
        }
    });
});