var preload = {
	preload: function(){
		var loadingBar = this.add.sprite(160,140,"loading");
		loadingBar.anchor.setTo(0.5,0.5);
		this.load.setPreloadSprite(loadingBar);
		
		this.game.load.image("player",'player.png');
		this.game.load.image("wall",'wall.png');
		this.game.load.image("coin",'key.png');
		this.game.load.image("lava",'lava.png');
		this.game.load.image("gameTitle","Blockey Title.png");
		this.game.load.image("play","playbutton.png");
		this.game.load.image("enemy","blueEnemy.png");
		this.game.load.image("gameOver", "GameOver.png")
	},
	create: function(){
		this.game.state.start("GameTitle");
	}
};