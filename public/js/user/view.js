/**
 * Created with IntelliJ IDEA.
 * User: Mullanaphy
 * Date: 11/1/13
 * Time: 6:46 PM
 * To change this template use File | Settings | File Templates.
 */
define(['underscore', 'backbone'], function(_, Backbone) {
  var blip = 0;
  return Backbone.View.extend({
    initialize: function(data, options) {
      this.listenTo(this.model, 'render', _.bind(this.render, this));
      this.user = this.model.get('user');
      this.canvas = options.canvas;
      this.context2D = this.canvas.getContext('2d');
      this.userImage = new Image();
    },
    draw: function(config, x, y) {
      this.context2D.drawImage(
        this.userImage,
        x,
        y,
        config.tile.x,
        config.tile.y,
        7 * config.tile.x,
        (7 * config.tile.y) - 2,
        config.tile.x,
        config.tile.y
      );
    },
    render: function() {
      var config = this.model.get('config');
      var sprite = this.user.get('sprite');
      var lastUpdate = this.model.get('lastUpdate');
      blip = 0 ? 1 : 0;
      switch (this.user.get('direction')) {
        case 'down':
          this.draw(config, (blip) * config.tile.x, sprite * config.tile.y);
          break;

        case 'left':
          this.draw(config, (2 + blip) * config.tile.x, (sprite + 1) * config.tile.y);
          break;

        case 'right':
          this.draw(config, (blip) * config.tile.x, (sprite + 1) * config.tile.y);
          break;

        default:
          this.draw(config, (2 + blip) * config.tile.x, sprite * config.tile.y);
      }
    }
  });
});