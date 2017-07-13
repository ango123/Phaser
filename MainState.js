var mainState = {
	
	create: function (){
		this.game.world.setBounds(0,0,2500,10000);
		this.cursor = this.game.input.keyboard.createCursorKeys();
		
		
		this.game.stage.backgroundColor = '#C0C0C0';
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.world.enableBody= true;
		this.player = this.game.add.sprite(70,100,"player");
		this.player.body.gravity.y = 1600;
		
		this.walls = this.game.add.group();
		this.lavas = this.game.add.group();
		this.coins = this.game.add.group();
		this.game.camera.follow(this.player);
		this.player.body.collideWorldBounds = true;
		
		var level = [

'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
'x                                                                           x',
'x                                                                           x',
'x                                                                           x',
'x                                                                           x',
'x                                                                           x',
'x                                                                           x',
'x         xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx       x',
'x         x                                                         x       x',
'x         x  x     x x x!!! x!!! x !!!x!! x     x x!!!   x !!!x!!!  x       x',
'x         x  !!   !! ! !    !    ! !    ! !!    ! !   !  !    !     x       x',
'x         x  ! ! ! ! ! !    !    ! !    ! ! !   ! !   !  !    !     x       x',
'x         x  !  !  ! ! !!!! !!!! ! !    ! !  !  ! !!!!!! !    !     x       x',
'x         x  !     ! !    !    ! ! !    ! !   ! ! !    ! !    !     x       x',
'x         x  !     ! ! !!!! !!!! ! !!!!!! !    !! !!!!!! !    !     x       x',
'x         x                                                         x       x',     
'x         xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx       x',
'x                                                                           x',
'x                                                                           x',
'x                                                                           x',
'x                                                                           x',
'x                                                                           x',
'x                                                                           x',
'x                                                                           x',
'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            
            
            
            
            
            
            
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
takeCoin: function(player, coin){
	coin.kill();
},
    
    
restart: function (){
	this.game.state.start("GameOver");
}	
};

