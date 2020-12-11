define(['underscore', 'backbone', 'jquery'], function(_, Backbone, $) {
    return Backbone.Model.extend({
        defaults: function() {
            return  {
                name: 'Trader Giatto',
                action: '',
                tileset: 'npcs.0.1.png',
                direction: 'down',
                location: {
                    x: 0,
                    y: 0
                },
                movement: {
                    type: 0,
                    speed: 0
                },
                deepThoughts: {
                    move: 8,
                    turn: 2
                }
            };
        },
        initialize: function(data, options) {
            _.each(options, _.bind(function(value, key) {
                this.set(key, value);
            }, this));
            this.on('think', _.bind(this.think, this));
            this.on('load', _.bind(this.load, this));
            this.calculateThoughts();
        },
        load: function() {
            this.set('gameViewTileset', this.get('gameView').get('tileset'));
        },
        calculateThoughts: function() {
            var thoughts = this.get('deepThoughts');
            var thoughtsMap = [];
            for (var k in thoughts) {
                if (thoughts.hasOwnProperty(k)) {
                    for (var i = 0; i < thoughts[k]; ++i) {
                        thoughtsMap.push(k);
                    }
                }
            }
            this.set('thoughts', thoughts);
        },
        getThought: function() {
            var thoughts = this.get('thoughts');
            return thoughts[Math.floor(Math.random() * thoughts.length)];
        },
        think: function() {
            if (!this.get('engaged')) {
                var thought = this.getThought();
                if (typeof this[thought] !== 'undefined') {
                    this[this.thought]();
                } else {
                    this.crapTheirPants(thought);
                }
            }
            return this;
        },
        crapTheirPants: function(thought) {
            console.log('FIDDLESTICKS! ' + this.get('name') + ' totally crapped their pants instead of doing "' + thought + '"');
            console.log(this.toJSON());
        },
        turn: function() {
            switch (Math.floor(Math.random() * 11)) {
                case 1: // Left.
                    this.set('direction', 'left');
                    break;

                case 2: // Down.
                    this.set('direction', 'down');
                    break;

                case 3: // Right.
                    this.set('direction', 'right');
                    break;

                case 4: // Up.
                    this.set('direction', 'up');
                    break;
            }
            return this;
        },
        move: function() {
            var tileset = this.get('gameViewTileset');
            var step = this.get('location');
            switch (this.get('direction')) {
                case 'left':
                    --step.x;
                    if (step.x < 0) {
                        if (tileset.wrap) {
                            step.x = tileset.tiles[0].length - 1;
                        } else {
                            step.x = 0;
                        }
                    }
                    break;

                case 'down':
                    ++step.y;
                    if (step.y >= tileset.tiles.length) {
                        if (tileset.wrap) {
                            step.y = 0;
                        } else {
                            step.y = tileset.tiles.length - 1;
                        }
                    }
                    break;

                case 'right':
                    ++step.x;
                    if (step.x >= tileset.tiles[0].length) {
                        if (tileset.wrap) {
                            step.x = 0;
                        } else {
                            step.x = tileset.tiles[0].length - 1;
                        }
                    }
                    break;

                case 'up':
                    --step.y;
                    if (step.y < 0) {
                        if (tileset.wrap) {
                            step.y = tileset.tiles.length - 1;
                        } else {
                            step.y = 0;
                        }
                    }
                    break;
            }
            this.set('location', step);
        },
        inFocus: function(grid) {
            var location = this.get('location');
            return location.x >= grid.x1 && location.x <= grid.x2 && location.y >= grid.y1 && location.y <= grid.y2;
        }
    });
});