window.onload=function(){
	$.console("Focusing Canvas...\n");
	document.getElementById('canvas').focus();
	$.console("Opening RPG...\n");
	(function($) {
		$.console("Inside...\n");
		$.user = {
			xsrf:1
		};
		$.rpg=function(config) {
			// Default Configuration.
			$.console("Loading Default Data...\n");
			$.rpg.resources={
				'css':'/css/',
				'js':'/js/',
				'tiles':'/tiles/',
				'states':'/states/',
				'tileset':'/tileset/'
			};
			$.rpg.state = {
				input:{
					x:2,
					y:10,
					direction:'down',
					pause:false,
					trigger:false
				},
				user:{
					movement:'air',
					name:'Dupre',
					gold:400,
					hp:300,
					mp:10,
					weapon:{
						'short':'sword',
						'long':false,
						armor:'cloth',
						unequiped:[]
					},
					stats:{
						level:3,
						intelligence:20,
						strength:21,
						dexterity:20
					},
					sprite:0
				},
				config:$.object.extend({
					fps:15,
					tile:{
						x:32,
						y:32
					},
					keys:{
						LEFT:37,
						UP:38,
						RIGHT:39,
						DOWN:40,
						PAUSE:27,
						ACTION:32,
						MENU:17
					}
				},config),
				save:function() {
					$.ajax({
						url:$.rpg.resources.states+$.state.user.id,
						method:'post',
						parameters:$.object.extend($.rpg.state.config,$.rpg.state.user)
					});
				},
				load:function() {
					$.ajax({
						url:$.rpg.resources.states+$.state.user.id,
						success:function(r) {
							$.rpg.state.user = $.object.extend($.rpg.state.user,r.user);
							$.rpg.state.config = $.object.extend($.rpg.state.config,r.config);
						}
					});
				}
			};
			
			// Default settings for a character.
			$.rpg.npcs=[];
			
			// Screen.
			var blip = 0,
			canvas = document.getElementById('canvas'),
			context2D = canvas.getContext('2d'),
			image = {
				tileset:new Image(),
				user:new Image()
			};
			tilesets = {};
			image.user.src = $.rpg.resources.tiles+'characters.0.1.png';
			$.console("\tDONE!");
			
			$.console("Initiating Redrawer...\n");
			$.rpg.redraw=function() {
				if($.rpg.state.input.pause)return;
				var tileset = $.rpg.tileset,
				input = $.rpg.state.input,
				actions = [],
				config = $.rpg.state.config;
				context2D.clearRect(0,0,canvas.width,canvas.height);
				// Draw the tiles.
				var max_rows = tileset.tiles.length,
				max_columns = tileset.tiles[0].length,
				row = 0,
				column = 0;
				for(var r=-7,rows=8;r<=rows;++r) {
					for(var c=-7,columns=8;c<=columns;++c) {
						row = input.y+r;
						column = input.x+c;
						if(tileset.wrap) {
							if(row<0) row = max_rows+row;
							else if(row>=max_rows) row = row-max_rows;
							if(column<0) column = max_columns+column;
							else if(column>=max_columns) column = column-max_columns;
						}
						var tile = tileset.tiles[row]&&typeof tileset.tiles[row][column]!=='undefined'?tileset.tiles[row][column]:false,
						x = (c+7)*config.tile.x,
						y = (r+7)*config.tile.y;
						if(!tile) tile = tileset.defaultTile;
						context2D.drawImage(image.tileset,tile.x*config.tile.x,tile.y*config.tile.y,config.tile.x,config.tile.y,x,y,config.tile.x,config.tile.y);
						
						// Display NPCs if they are on screen.
						if($.rpg.npcs.length) {
							for(var i=0,count=$.rpg.npcs.length;i<count;++i) {
								var npc = $.rpg.npcs[i];
								var location = npc.location();
								if(location.x==x&&location.y==y) {
									switch(npc.direction()) {
										case 'down':
											context2D.drawImage(image.npcs,(0+blip)*config.tile.x,npc.sprite()*config.tile.y,config.tile.x,config.tile.y,x,y,config.tile.x,config.tile.y);
											break;
										case 'left':
											context2D.drawImage(image.npcs,(2+blip)*config.tile.x,(npc.sprite()+1)*config.tile.y,config.tile.x,config.tile.y,x,y,config.tile.x,config.tile.y);
											break;
										case 'right':
											context2D.drawImage(image.npcs,(0+blip)*config.tile.x,(npc.sprite()+1)*config.tile.y,config.tile.x,config.tile.y,x,y,config.tile.x,config.tile.y);
											break;
										default:
											context2D.drawImage(image.npcs,(2+blip)*config.tile.x,npc.sprite()*config.tile.y,config.tile.x,config.tile.y,x,y,config.tile.x,config.tile.y);
											break;
									}
								}
							}
						}
					}
				}
				if(tileset.tiles[input.y][input.x].trigger) $.rpg.trigger(tileset.tiles[input.y][input.x].trigger);
				
				// Draw the player.
				switch(input.direction) {
					case 'down':
						context2D.drawImage(image.user,(0+blip)*config.tile.x,$.rpg.state.user.sprite*config.tile.y,config.tile.x,config.tile.y,7*config.tile.x,(7*config.tile.y)-2,config.tile.x,config.tile.y);
						break;
					case 'left':
						context2D.drawImage(image.user,(2+blip)*config.tile.x,($.rpg.state.user.sprite+1)*config.tile.y,config.tile.x,config.tile.y,7*config.tile.x,(7*config.tile.y)-2,config.tile.x,config.tile.y);
						break;
					case 'right':
						context2D.drawImage(image.user,(0+blip)*config.tile.x,($.rpg.state.user.sprite+1)*config.tile.y,config.tile.x,config.tile.y,7*config.tile.x,(7*config.tile.y)-2,config.tile.x,config.tile.y);
						break;
					default:
						context2D.drawImage(image.user,(2+blip)*config.tile.x,$.rpg.state.user.sprite*config.tile.y,config.tile.x,config.tile.y,7*config.tile.x,(7*config.tile.y)-2,config.tile.x,config.tile.y);
						break;
				}
				
				if($.rpg.state.user.party) {
					var party = $.rpg.state.user.party;
					for(var i=0,count=party.length;i<count;++i) {
					
					}
				}
				
				// If there is an action to perform do it.
				/* if(typeof action!=='undefined'&&action) {
					action[input.x].execute();
					input.action=false;
				} */
				
				// If somehow the user went out of bounds.
				else if(!tileset.wrap&&(input.x<0||input.y<0||input.x>tileset.tiles[0].length||input.y>tileset.tiles.length)) {
					//				$.rpg.tileset(tileset.exit.tileset,tileset.exit.x,tileset.exit.y);
					input.action=false;
				}
			};
			$.console("\tDONE!");
			
			// Change tileset.
			$.console("Initializing Tileset Handler...\n");
			$.rpg.tileset=function(tileset,x,y) {
				if(!x)x=0;
				if(!y)y=0;
				var load=function(tileset) {
					$.rpg.npcs = [];
					$.rpg.state.input.x = x;
					$.rpg.state.input.y = y;
					$.rpg.state.input.direction = tileset.start.direction;
					image.tileset.src = tileset.image;
					if(tileset.npcs.length) for(var i=0,count=tileset.npcs.length;i<count;++i) $.rpg.npcs.push(new $.rpg.npc(tileset.npcs[i]));
				};
				if(!tilesets[tileset]) {
					$.ajax({
						url:'/rest.php',
						parameters:{
							controller:'tileset',
							value:tileset
						},
						success:function(response) {
							tilesets[tileset] = response;
							load(response);
						}
					});
				}
				else load(tilesets[tileset]);
			};
			$.console("\tDONE!");
			
			// Input Handler.
			$.console("Setting Handlers...\n");
			var _handler = function(event){
				var keys = $.rpg.state.config.keys,
				tileset = $.rpg.tileset,
				step = {
					x:$.rpg.state.input.x,
					y:$.rpg.state.input.y
				};
				switch(event.keyCode) {
					case keys.LEFT: // Left.
						$.rpg.state.input.direction='left';
						--step.x;
						if(step.x<0) {
							if(tileset.wrap) step.x = tileset.tiles[0].length-1;
							else return;
						}
						break;
					case keys.DOWN: // Down.
						$.rpg.state.input.direction='down';
						++step.y;
						if(step.y>=tileset.tiles.length) {
							if(tileset.wrap) step.y=0;
							else return;
						}
						break;
					case keys.RIGHT: // Right.
						$.rpg.state.input.direction='right';
						++step.x;
						if(step.x>=tileset.tiles[0].length) {
							if(tileset.wrap) step.x=0;
							else return;
						}
						break;
					case keys.UP: // Up.
						$.rpg.state.input.direction='up';
						--step.y;
						if(step.y<0) {
							if(tileset.wrap) step.y = tileset.tiles.length-1;
							else return;
						}
						break;
					case keys.MENU: // Menu.
						$.rpg.menu();
						break;
					case keys.ACTION: // Menu.
						$.rpg.state.input.action=true;
						break;
					case keys.PAUSE:
						if($.rpg.state.input.pause)$.rpg.state.input.pause=false;
						else $.rpg.state.input.pause=true;
						break;
				}
				if(($.rpg.state.user.movement==2)||($.rpg.state.user.movement==tileset.tiles[step.y][step.x].type)) {
					$.rpg.state.input.x = step.x;
					$.rpg.state.input.y = step.y;
				}
				$.rpg.state.input.trigger = false;
				$.console($.rpg.state.input.x+','+$.rpg.state.input.y);
			};
			if($.browser.CHROME||$.browser.SAFARI) document.onkeydown=_handler;
			else document.onkeypress=_handler;
			$.console("\tDONE!");
			
			// Triggers Handler.
			$.console("Setting Triggers...\n");
			$.rpg.trigger=function(trigger) {
				if($.rpg.state.input.trigger) return;
				$.rpg.state.input.trigger = true;
				$.rpg.state.input.pause = true;
				try {
					switch(typeof trigger) {
						case 'function':
							(trigger());
							break;
						case 'object':
							
							break;
						case 'array':
							if(trigger&&typeof $.rpg.triggers[trigger.shift()]==='function') $.rpg.triggers[func].apply(this,trigger);
							break;
						default:
							$.console(trigger);
					}				
				} catch(e) {};
				$.rpg.state.input.pause = false;
			};
			$.console("\tDONE!");
			
			// Menu.
			$.console("Setting Menu...\n");
			$.rpg.menu=function() {
				// Open it if it isn't already opened.
				if(!$.rpg.menu.opened) {
					$.rpg.state.input.pause = true;
					
					$.popup();
				}
				// Otherwise we're just going to close it.
				else $.rpg.state.input.pause = false;
			};
			$.rpg.menu.prototype.execute=function() {
				$('#dialog').html('Dialog').fadeIn();
			};
			$.rpg.menu.opened = false;
			$.console("\tDONE!");
			
			// NPC handler.
			$.console("Initiating NPC Handler...\n");
			$.rpg.prototype.npc=function(settings){
				settings = $.object.extend({
					action:function(){
						alert('hi');
					}
				},settings);
				npc = settings;
				return npc;
			};
			$.console("\tDONE!");
			
			// Example run.
			$.console("Loading Tileset...\n");
			(function() {
				$.ajax({
					url:$.rpg.resources.tileset+'world.0.2',
					success:function(tileset){
						$.console("\tLoaded...\n");
						$.rpg.tileset = tileset;
						$.console("\tTileset Parsed...\n");
						if($.rpg.npcs.length>0) {
							for(var i = 0,count = $.rpg.npcs; i <= count; ++i) {
								$.rpg.npcs[i].unload();
								delete $.rpg.npcs[i];
							}
							$.rpg.npcs = [];
						}
						$.rpg.state.user = {
							movement:2,
							sprite:0
						};
						image.tileset.src = $.rpg.resources.tiles+'world.0.1.png';
						$.console("\tTileset Begin...\n");
						setInterval($.rpg.redraw,1000/$.rpg.state.config.fps);
						setInterval(
							function(){
								blip=!blip?1:0
							},
							400
							);
						$.console("\tDONE!\n");
						$.console("Play on!");
						if(typeof tileset.npc==='array'&&tileset.npc.length) {
							for(var i = 0,count = tileset.npc.length; i <= count; ++i) {
								$.rpg.npcs.push(new $.rpg.npc(tileset.npc[i]));
							}
						}
					}
				});
			})();
		};
		$.rpg();
	})(phy);
};