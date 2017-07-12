var mainstate = {
	
	create: function (){
		this.game.world.setBounds(0,0,2500,10000);
		this.cursor = this.game.input.keyboard.createCursorKeys();
		
		this.score=0;
		this.game.stage.backgroundColor = '#C0C0C0';
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.world.enableBody= true;
		this.player = this.game.add.sprite(70,100,"player");
		this.player.body.gravity.y = 1600;
		this.p1_health = this.game.add.group();
		this.walls=this.game.add.group();
		this.lavas=this.game.add.group();
		this.coins=this.game.add.group();
		this.game.camera.follow(this.player);
		this.player.body.collideWorldBounds = true;
		
		var level = [
'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
'x                                              x                                                                     x',
'x            o                                 x                                                                     x',
'x                                              x                                                                     x',
'x                                              x                                                                     x',
'x                                              x                                                           o         x',
'x            x       o                         x                                                                     x',
'x            x   xxxxxxxxxxxxxxxxxxxxxxxxxxx   x                                                                     x',
'x       x                 x                    x                                                                     x',
'x       x                 x                    x                                                                     x',
'x   o                     x                    x                                                                     x',
'x   x                     x                    x                                                                     x', 
'x   x                     x   xxxxxxxxxxxxxxxxxx                                                                     x',
'x      x                  x                    x                                                                     x',
'x      x                  x                    x                                                                     x',
'x         x               x                    x                                                                     x',
'x         x               x                    x                                                                     x',
'x            x            xxxxxxxxxxxxxxxxxx   x                                                                     x',
'x            x            x                    x                                                                     x',
'x               x         x                    x                                                                     x',
'x               x         x                    x                                                                     x',	
'x               x         x                    x                                                                     x',
'x                         x   xxxxxxxxxxxxxxxxxx                                                                     x',
'x             x           x                    x                                                                     x',
'x                         x                    x       o         o                     o                o            x',
'x           x             x                    x       x     x   x  x!!! x!!! x !!!x!! x     x   x!!!   x !!!x!!!    x',
'x                         x                    x       !!   !!   !  !    !    ! !    ! !     !   !   !  !    !       x',
'x         x               xxxxxxxxxxxxxxxxxx   xxxxx   ! ! ! !   !  !    !    ! !    ! ! !   !   !   !  !    !       x',
'x                         x                            !  !  !   !  !!!! !!!! ! !    ! !  !  !   !!!!!! !    !       x',
'x       x                 x                            !     !   !     !    ! ! !    ! !   ! !   !    ! !    !       x',
'x                         x                            !     !   !  !!!! !!!! ! !!!!!! !    !!   !!!!!! !    !       x',	
'xxxxx!!!!!!!!!!!!!!!!!!!!!xxxxxxxxxxxxxxxxxxxxxx!!!!xx!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
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


}
}
	},
	update: function(){
		this.physics.arcade.collide(this.walls,this.player);
		this.physics.arcade.collide(this.coins,this.player,this.takeCoin, null, this);
		this.physics.arcade.overlap(this.lavas,this.player,this.restart, null,this);
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
		this.p1_health.create(j+10, 10, 'coin');
		//this.p1_health.anchor.setTo(0.5,0.5);
//				this.p1_health.create(0, 0, 'coin');

		j=j +150;
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