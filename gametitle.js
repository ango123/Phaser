var gameTitle = {
	create: function(){
		var gameTitle = this.game.add.sprite(250,100,'gameTitle');
			gameTitle.anchor.setTo(0.3,-0.2);
		var playButton = this.game.add.button(250,100,'play', this.playTheGame, this);
			playButton.anchor.setTo(0.25,0.4);
	},
	playTheGame: function(){
		this.game.state.start('state1');
	}
};