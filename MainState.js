var mainState = {
	
	create: function (){
		this.game.world.setBounds(0,0,2500,10000);
		this.cursor = this.game.input.keyboard.createCursorKeys();
		
		this.score=0;
		this.game.stage.backgroundColor = '#C0C0C0';
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.world.enableBody= true;
		this.player = this.game.add.sprite(650,100,"player");
		this.player.body.gravity.y = 1600;

		
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
var monster = this.game.add.sprite(30+20*j, 30+20*i, 'enemy');
this.enemy.add(monster);
var tween = this.game.add.tween(this.enemy).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
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
		}
		else if(this.cursor.right.isDown){
			this.player.body.velocity.x = 200;
		}
		else{
			this.player.body.velocity.x =0;
		}
		if(this.cursor.up.isDown && this.player.body.touching.down){
		   this.player.body.velocity.y = -600;
		}
	},
	
updateKeys: function (){
	this.p1_health.callAll('kill');
	var j = 0;
	for(var i = 0; i< this.score; i++){
		console.log("creating group", i)
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

