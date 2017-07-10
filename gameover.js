var gameOver= {
	create: function (){
		var gameOverTitle = this.game.add.sprite(250,75,"gameOver");
		gameOverTitle.anchor.setTo(0.5,0.5);
		var playButton= this.game.add.button(250,160,"play",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);
	},
	playTheGame: function(){
		this.game.state.start('state1');
	}

};