define([
    'underscore',
    'backbone',
    'jquery',
    'core/utils',
    'data/skill',
    'data/item/weapon/sword/iron',
    'data/item/armor/shield/iron',
    'data/item/armor/helmet/iron',
    'data/item/armor/chest/iron',
    'data/item/armor/boots/iron',
    'data/item/weapon/base'
], function(_, Backbone, $, UTILS, SKILL, IronSword, IronShield, IronHelmet, IronMail, IronBoots, BareKnuckles) {

    var bareKnuckles = new BareKnuckles;

    return Backbone.Model.extend({
        initialize: function() {
            this.set($.extend(true, this.defaults(), this.toJSON()));
        },
        defaults: function() {
            return {
                movement: 'land',
                name: 'Dupre',
                gold: 400,
                hp: 300,
                mp: 10,
                items: {
                    equipped: {
                        left: new IronSword,
                        right: new IronShield,
                        helmet: new IronHelmet,
                        body: new IronMail,
                        boots: new IronBoots,
                        leftRing: false,
                        rightRight: false,
                        other: false
                    },
                    unequipped: []
                },
                skill: [
                    SKILL.DANCE_EPIDEMIC
                ],
                stats: {
                    level: 3,
                    intelligence: 20,
                    strength: 21,
                    dexterity: 20
                },
                sprite: 0
            };
        },
        getDefensiveStats: function() {
            var stats = this.get('stats');
            var items = this.get('items');
            for (var i in items) {
                if (items.hasOwnProperty(i)) {
                    stats = items[i].adjustStats(stats, items[i]);
                }
            }
            return stats;
        },
        talkTo: function(sprite) {
            this.set('status', 'converse');
            this.set('talkingTo', sprite);
            this.set('talkingToReplies', _.clone(sprite.get('replies')));
            this.set('talkingToReplyIndex', 0);
            var conversation = _.bind(this.converse, this);
            this.on('continue', conversation);
            this.once('cancel', _.bind(function() {
                this.off('continue', conversation);
                this.unset('talkingTo');
                this.unset('talkingToReplies');
                this.unset('talkingToReplyIndex');
            }, this));
        },
        roaming: {
            equip: function(item) {
                var items = this.get('items');

            }
        },
        converse: function() {
            var replies = this.get('talkingToReplies');
            var i = this.get('talkingToReplyIndex');
            if (!_.isUndefined(replies[i])) {
                this.trigger('cancel');
            }
            else if (_.isFunction(replies[i])) {
                replies[i](user, this.get('gameModel'));
            } else {
                this.get('gameModel').speak(replies[i]);
            }
        },
        engageInPrimalCombat: function() {
            this.set('status', 'battle');
        },
        battle: {
            attack: function(sprite) {
                var location = this.get('location');
                var spriteLocation = sprite.get('location');
                var distance = (Math.abs(location.x - spriteLocation.x) + Math.abs(location.y - spriteLocation.y) === 1) ? 'melee' : 'ranged';
                var weapon = this.get('weapon')[distance];

                if (!weapon) {
                    if (distance === 'ranged') {
                        return;
                    }
                    weapon = bareKnuckles;
                }

                var stats = weapon.applyStats(this.get('stats'));
                var diceRoll = UTILS.rollDice(20);
                if (diceRoll + weapon.attack(stats) > sprite.attacks(weapon.attacks)) {
                    var damage = weapon.getDamage(stats, UTILS.rollDice);
                    var effects = weapon.getEffects(UTILS.rollDice);
                    weapon.animateHit(location, spriteLocation, damage, effects, function() {
                        sprite.doDamage(damage);
                        sprite.applyEffects(effects);
                    });
                } else {
                    weapon.animateMiss(location, spriteLocation);
                }

                this.set('targetting', sprite);
            },
            magic: function(sprite) {

            },
            item: function() {

            }
        }
    });
});