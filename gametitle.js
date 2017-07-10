var gameTitle = {
	create: function(){
		var gameTitle = this.game.add.sprite(250,100,'gameTitle');
			gameTitle.anchor.setTo(0.5,0.5);
		var playButton = this.game.add.button(250,100,'play', this.playTheGame, this);
			playButton.anchor.setTo(0.5,0.5);
	},
	playTheGame: function(){
		this.game.state.start('state1');
	}
};