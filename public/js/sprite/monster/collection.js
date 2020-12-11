/**
 *
 */
define(['underscore', 'backbone', 'sprite/monster/model'], function(_, Backbone, MonsterModel) {

    return Backbone.Collection.extend({
        model: MonsterModel
    });
});