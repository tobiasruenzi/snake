module.exports.Serpent=Serpent;
module.exports.Point=Point;
module.exports.Joueur=Joueur;

function Point(Coordx, Coordy) {
	this.x=Coordx;
	this.y=Coordy;
	
};
function Serpent(Point1){
	this.Tableau = [Point1];
}
function Joueur(Serpent, ws) {
	this.Serpent=Serpent;
	this.ws=ws
};
