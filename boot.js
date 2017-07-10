var boot = {
	preload: function(){
		this.game.load.image("loading","loading.png");	
	},
	create: function(){
		this.game.state.start("Preload");		
	},
};