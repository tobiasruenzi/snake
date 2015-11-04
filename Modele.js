module.exports.Point=Point;
module.exports.Joueur=Joueur;

function Point(Coordx, Coordy) {
	this.x=Coordx;
	this.y=Coordy;

};

function Joueur(Point, ws, nexttete) {
	this.Serpent=[Point];
	this.id;
	this.ws=ws;
	this.nexttete=nexttete;
	this.grandir=function(point){
		this.Serpent.push(point);
	};
};
function bonbon(point) {
	this.x=point.x;
	this.y=point.y;
}