window.onload=function(){
	(function($){
		var _settings = {
			name:'Some guy',
			action:'',
			tileset:'npcs.0.1.png',
			say:{
				defaultText:['Hi!'],
				key:0
			},
			direction:'down',
			location:{
				x:0,
				y:0
			},
			movement:{
				type:0,
				speed:0
			}
		};
		
		$.rpg.npc = function(settings){
			this.load(settings);
		};
		
		$.rpg.npc.prototype.load = function(settings){
			this.settings = $.object.extend(_settings,settings);
			if(this.movement.speed)
				this._move = setTimeout('this.move',this.movement.speed);
		};
		
		$.rpg.npc.prototype.unload = function() {
			clearTimeout(this._move);
		};
		
		$.rpg.npc.prototype.move = function() {
			if($.rpg.state.input.pause) return;
			
			var random_number = Math.floor(Math.random()*11),
			tileset = $.rpg.tileset,
			step = this.settings.location;
			
			switch(random_number) {
				case 1: // Left.
					this.settings.direction = 'left';
					break;
					
				case 2: // Down.
					this.settings.direction = 'down';
					break;
					
				case 3: // Right.
					this.settings.direction = 'right';
					break;
					
				case 4: // Up.
					this.settings.direction = 'up';
					break;
			}
			
			switch(this.settings.direction) {
				case 'left':
					--step.x;
					if(step.x<0) {
						if(tileset.wrap)
							step.x = tileset.tiles[0].length-1;
						else
							step.x = 0;
					}
					break;
					
				case 'down':
					++step.y;
					if(step.y>=tileset.tiles.length) {
						if(tileset.wrap)
							step.y=0;
						else
							step.y = tileset.tiles.length-1;
					}
					break;
					
				case 'right':
					++step.x;
					if(step.x>=tileset.tiles[0].length) {
						if(tileset.wrap)
							step.x=0;
						else
							step.x = tileset.tiles[0].length-1;
					}
					break;
					
				case 'up':
					--step.y;
					if(step.y<0) {
						if(tileset.wrap)
							step.y = tileset.tiles.length-1;
						else
							step.y = 0;
					}
					break;
			}
			
			this.settings.location = step;
		};
		
		$.rpg.npc.prototype.location = function() {
			return this.settings.location;
		};
		
		$.rpg.npc.prototype.direction = function() {
			return this.settings.direction;
		}
		
		$.rpg.npc.prototype.sprite = function() {
			return this.settings.sprite;
		}
		
	})(phy);
}