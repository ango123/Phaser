var gameOver= {
	create: function (){
		var gameOverTitle = this.game.add.sprite(250,75,"gameOver");
		gameOverTitle.anchor.setTo(0.06,0.07);
		var playButton= this.game.add.button(250,160,"play",this.playTheGame,this);
		playButton.anchor.setTo(0.25,0.20);
	},
	playTheGame: function(){
		this.game.state.start('state1');
	}

};