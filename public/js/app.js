define([
  'underscore',
  'pad/keyboard/view',
  'game/view',
  'game/model',
  'user/model',
  'user/view',
  'sprite/monster/collection',
  'sprite/monster/view',
  'sprite/npc/collection',
  'sprite/npc/view',
  'sprite/trigger/collection',
  'sprite/trigger/view'
], function(_, GamePad, GameView, GameModel, UserModel, UserView, MonsterCollection, MonsterView, NpcCollection, NpcView, TriggerCollection, TriggerView) {
  var APP = function(id, canvas, resources) {
    this.canvas = canvas;
    this.lastUpdate = new Date;

    /*
     * Initiate our Game state and his/her view.
     */
    this.gameModel = new GameModel({
      id: id
    });

    this.resources = resources || {
      'css': '/css/',
      'js': '/js/',
      'tiles': '/tiles/',
      'states': '/states/',
      'tileset': '/tileset/'
    };

    /*
     * Let's load our default views.
     */
    this.gameView = new GameView({model: this.gameModel, el: this.canvas});

    /*
     * This is what we'll be passing around to all of our views/models.
     */
    var options = {
      gameModel: this.gameModel,
      gameView: this.gameView,
      canvas: this.canvas
    };

    /*
     * We need our hero don't we?
     */
    this.userModel = new UserModel({id: id}, options);
    this.userView = new UserView({
      model: this.userModel
    }, options);

    /*
     * Load up NPCs and enemies.
     */
    this.triggers = new TriggerCollection(this.gameModel.get('triggers'), options);
    this.triggersView = new TriggerView({model: this.userModel, collection: this.triggers}, options);

    /*
     * Let's load up our NPCs.
     */
    this.npcs = new NpcCollection(this.gameModel.get('npcs'), options);
    this.npcsView = new NpcView({model: this.userModel, collection: this.npcs}, options);

    /*
     * What's an RPG without monsters?
     */
    this.monsters = new MonsterCollection(this.gameModel.get('monsters'), options);
    this.monstersView = new MonsterView({model: this.userModel, collection: this.monsters}, options);

    this.gamePad = new GamePad({model: this.gameModel}, options);
    this.load();
  };

  APP.prototype.run = function(date) {
    var delta = this.lastUpdate - date;
    this.lastUpdate = date;
    if (this.monsters.size()) {
      this.continueBattle(date);
    } else {
      this.freeRoam(date);
    }
    this.render();
    requestAnimationFrame(this.run);
  };

  APP.prototype.continueBattle = function(date) {
    this.gameModel.trigger('continueBattle');
  };

  APP.prototype.freeRoam = function(date) {
    this.gameModel.trigger('freeRoam');
  };

  APP.prototype.save = function() {
    this.pause = true;
    this.model.save(null, {
      success: _.bind(function() {
        this.pause = false;
      }, this)
    });
  };

  APP.prototype.render = function() {
    this.gameModel.trigger('render');
  };

  APP.prototype.load = function() {
    /*
     * This should kick start our whole game.
     */
    this.gameModel.fetch({
      success: _.bind(function() {
        this.run(new Date);
      }, this)
    });
  };

  return APP;
});