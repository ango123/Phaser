var mainState = {
	preload: function() {
		this.game.load.spritesheet("playerSheet", "Sprite.png", 1841/4, 2400/4)
		this.game.load.spritesheet("enemySheet", "enemy.png", 64, 64)
	},
	create: function (){
		this.game.world.setBounds(0,0,2500,10000);
		this.cursor = this.game.input.keyboard.createCursorKeys();
		
		this.score=0;
		this.game.stage.backgroundColor = '#C0C0C0';
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.world.enableBody= true;

		this.player = this.game.add.sprite(650,100,"playerSheet", 1);
		this.player.animations.add("walk_right", [4, 5, 6, 7])
		this.player.animations.add("walk_left", [8, 9, 10, 11])
		this.player.animations.add("stand", [1])

		this.player.body.gravity.y = 1600;
		this.player.scale.setTo(0.05)

		
		this.walls = this.game.add.group();
		this.lavas = this.game.add.group();
		this.coins = this.game.add.group();

		this.p1_health = this.game.add.group();
		this.walls=this.game.add.group();
		this.lavas=this.game.add.group();
		this.coins=this.game.add.group();

		this.game.camera.follow(this.player);
		this.player.body.collideWorldBounds = true;
		this.enemy = this.game.add.group();
		this.enemy.enableBody=true;
		this.enemy.physicsBodyType = (Phaser.Physics.ARCADE);
		var level = [


'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
'x                                 x    x                                   x',
'x                                 x    x                                   x',
'x                                 x    x                                   x',
'x                                 x    x                                   x',
'x                                 x    x                                   x',
'x o          b        b           x    x          b      b                 x',
'xxxx     xxxxxxxxxxxxxxxxxxxxxxxxxx    xxxxxxxxxxxxxxxxxxxxxxxxxxxxx     x x',
'x        !                                                         x o     x',
'x      o !  x     x x x!!! x!!! x !xxxx! x     x x!!!   x !!!x!!!  x x     x',
'x     xxx!  !!   !! ! !    !    ! !    ! !!    ! !   !  !    !     x     x x',
'x        !  ! ! ! ! ! !    !    ! !    ! ! !   ! !   !  !    !     xx      x',
'x o      !  !  !  ! ! !!!! !!!! ! !    ! !  !  ! !!!!!! !    !     xo    x x',
'xxxx     !  !     ! !    !    ! ! !    ! !   ! ! !    ! !    !     xx      x',
'x        !  !     ! ! !!!! !!!! ! !!!!!! !    !! !!!!!! !    !     x      xx',
'x        !                                                         x       x',     
'x        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx    x  x',
'x                                                                          x',
'x                                                            o         x   x',
'x                x                             b      o      x   x   x     x',
'x                                  o     x  x  x   x  x   x                x',
'x         x   x      x             x  x                                    x',
'x      x                  x    xx                                          x',
'x                                                                          x',
'x!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!x',

];
		

	for (var i = 0; i < level.length; i++) {
		for (var j = 0; j < level[i].length; j++) {

			if (level[i][j] == 'x') {
				var wall = this.game.add.sprite(30+20*j, 30+20*i, 'wall');
				this.walls.add(wall);
				wall.body.immovable = true; 
			}

			else if (level[i][j] == 'o') {
				var coin = this.game.add.sprite(30+20*j, 30+20*i, 'coin');
				this.coins.add(coin);
			}

			else if (level[i][j] == '!') {
				var enemy = this.game.add.sprite(30+20*j, 30+20*i, 'lava');
				this.lavas.add(enemy);
			}

			else if (level[i][j] == 'b') {
				let monster = this.game.add.sprite(30+20*j, 5+20*i, 'enemySheet');
				var enemy = this.enemy.add(monster);
				var tween = this.game.add.tween(this.enemy).to( 
					{ x: 200 }, 
					2000, 
					Phaser.Easing.Linear.None, 
					true, 
					0, 
					1000, 
					true
				);
				window.tween = tween
				let name = "walk_right"
				tween.onRepeat.add(() => {
					console.log(name)
					if (name === "walk_left") {
						monster.animations.play("walk_right", 25, true)
						name = "walk_right"
					} else {
						monster.animations.play("walk_left", 25, true)
						name = "walk_left"
					}
				})
				monster.animations.add("walk_left", [9, 10, 11, 12, 13, 14, 15, 16, 17], 25)
				monster.animations.add("walk_right", [27, 28, 29, 30, 31, 32, 33, 34, 35], 25)
				monster.animations.play("walk_right", 25, true)
				monster.scale.setTo(0.75)		
			}
	}
}
	},
////createenemies: function () {
//
//    for (var y = 0; y < 4; y++)
//    {
//        for (var x = 0; x < 10; x++)
//        {
//            var enemy = enemies.create(x * 48, y * 50, 'enemy');
//            enemy.anchor.setTo(0.5, 0.5);
//		}
//    }
//
//    enemy.x = 100;
//    enemy.y = 50;
//
//   
//
//    //  When the tween loops it calls descend
//    tween.onLoop.add(descend, this);
//},
	update: function(){
		this.physics.arcade.collide(this.walls,this.player);
		this.physics.arcade.collide(this.coins,this.player,this.takeCoin, null, this);
		this.physics.arcade.overlap(this.lavas,this.player,this.restart, null,this);
		this.physics.arcade.overlap(this.enemy,this.player,this.restart, null,this);
		this.updateKeys();
		if(this.cursor.left.isDown){
		   this.player.body.velocity.x = -200;
		   this.player.animations.play("walk_left", 20)
		}
		else if(this.cursor.right.isDown){
			this.player.body.velocity.x = 200;
			this.player.animations.play("walk_right", 20)
		}
		else{
			this.player.body.velocity.x =0;
			this.player.animations.play("stand")
		}
		if(this.cursor.up.isDown && this.player.body.touching.down){
		   this.player.body.velocity.y = -600;
		}
	},
	
updateKeys: function (){
	this.p1_health.callAll('kill');
	var j = 0;
	for(var i = 0; i< this.score; i++){
		this.p1_health.create(j, 10, 'coin');
		this.p1_health.fixedToCamera = true;
		//this.p1_health.anchor.setTo(0.5,0.5);
//				this.p1_health.create(0, 0, 'coin');

		j=j +15;
	}
//	this.p1_health.scale.set(.3,.3);	
	
},
takeCoin: function(player, coin){
	coin.kill();
	this.score++;
	this.updateKeys();
},
    
    
restart: function (){
	this.game.state.start("GameOver");
}	
};