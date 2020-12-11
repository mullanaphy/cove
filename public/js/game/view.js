/**
 * Created with IntelliJ IDEA.
 * User: Mullanaphy
 * Date: 11/1/13
 * Time: 6:46 PM
 * To change this template use File | Settings | File Templates.
 */
define(['underscore', 'backbone'], function(_, Backbone) {
    return Backbone.View.extend({
        initialize: function() {
            this.listenTo(this.model, 'startBattle', _.bind(this.renderBattleField, this));
            this.listenTo(this.model, 'freeRoam', _.bind(this.renderWorld, this));
            this.blip = 0;
            this.context2D = this.el.getContext('2d');
            this.image = {
                tileset: new Image(),
                user: new Image()
            };
        },
        renderBattleField: function() {

        },
        renderWorld: function() {
            var blip = !this.blip ? 1 : 0;
            var input = this.model.get('input');
            if (input && input.pause) {
                return;
            }
            this.context2D.clearRect(0, 0, this.el.width, this.el.height);
            var tileset = this.model.get('tileset');
            var config = this.model.get('config');
            var max_rows = tileset.tiles.length;
            var max_columns = tileset.tiles[0].length;
            var row = 0;
            var column = 0;

            for (var r = tileset.grid.y1; r < tileset.grid.y2; ++r) {
                for (var c = grid.x1; c <= grid.x2; ++c) {
                    if (tileset.wrap) {
                        if (row < 0) {
                            row = max_rows + row;
                        }
                        else if (row >= max_rows) {
                            row = row - max_rows;
                        }
                        if (column < 0) {
                            column = max_columns + column;
                        }
                        else if (column >= max_columns) {
                            column = column - max_columns;
                        }
                    }
                    var tile = tileset.tiles[row] && typeof tileset.tiles[row][column] !== 'undefined' ? tileset.tiles[row][column] : false;
                    var x = (c + 7) * config.tile.x;
                    var y = (r + 7) * config.tile.y;
                    if (!tile) {
                        tile = tileset.defaultTile;
                    }
                    this.context2D.drawImage(
                        image.tileset,
                        tile.x * config.tile.x,
                        tile.y * config.tile.y,
                        config.tile.x,
                        config.tile.y,
                        x,
                        y,
                        config.tile.x,
                        config.tile.y
                    );
                }
            }
        }
    });
});