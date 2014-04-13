
Laser = function(){

	Laser.superclass.constructor.call(this);

	this.constant = 200;

	//this set of cords holds the destination of the laser
	this.xCor = 0;
	this.yCor = 0;

	// this set of cords holds the spawn cords
	this.spawnX = 0;
	this.spawnY = 0;

	//the distance betewn the two points
	this.distance = 0;

	this.addEventListener("update", this.UpdatePosition.bind(this));
	this.addEventListener("update", this.DetectCollisions.bind(this));
	this.useWorldPosition(true);
}

Laser.prototype = {

	setup : function(prams){

		this.xCor = prams.x;
		this.yCor = prams.y;

		this.spawnX = prams.spawnX;
		this.spawnY = prams.spawnY;

		prams.image = "laser";

		this.mGame = prams.masterGame;

		this.distance = Math.sqrt(Math.pow(this.spawnX-this.xCor, 2) + Math.pow(this.spawnY-this.yCor, 2));
	},

	UpdatePosition : function(event){
		
		this.worldX += this.mGame.mPlayer.mHorizontalSpeed;
		this.n = this.distance/this.constant;
		this.worldX += (this.xCor - this.spawnX)/this.n;
		this.worldY += (this.yCor - this.spawnY)/this.n;
		if(this.xCor < this.worldX && this.yCor < this.worldY){
			this.markForRemoval();
		}
	},

	DetectCollisions : function(event){

		var Obstical;
		var obstacleBounds = this.getBounds();
		var obstacleBuffer = 0.7;
		var playerBuffer = 0.5;

		for(var i = 0; i < this.mGame.obstacleLayer.numChildren(); i++){
			Obstical = this.mGame.obstacleLayer.getChildAt(i);
			if(Obstical.getBounds().intersects(obstacleBounds, obstacleBuffer, playerBuffer)){
				Obstical.markForRemoval();
				this.markForRemoval();
			}
		}
	},

}

extend(Laser, TGE.Sprite);