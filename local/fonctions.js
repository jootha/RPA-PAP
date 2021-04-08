function selectRoom(i){
	PAP.pAcceuil.iNbChambres.clickMouse();
	ag2r.audit.log("[Click] Chambres");
	PAP.pAcceuil.wait(function (ev) {
		for (var index = -1; index < i; index++) {			
			ctx.sleep(300);
			ctx.keyStroke(e.key.Down);
			ag2r.audit.log("[KEY] Down");
		}			
		ctx.sleep(300);
		ctx.keyStroke(e.key.Enter);
		ag2r.audit.log("[KEY] Enter");//Chambres séléctionné
		
		PAP.pAcceuil.iNb_pieces.clickMouse();
		ag2r.audit.log("[Click] pieces");
		PAP.pAcceuil.wait(function (ev) {
			for (var index = 0; index < 3; index++) {			
				ctx.keyStroke(e.key.Up);
				ag2r.audit.log("[KEY] Up");
			}			
			ag2r.audit.log(e.key.Space);
			ag2r.audit.log("[KEY] Space");
			ctx.sleep(300);
			ctx.keyStroke(e.key.Up);
			ag2r.audit.log.log("[KEY] Up");
			ctx.keyStroke(e.key.Space);
			ag2r.audit.log("[KEY] Space");
			ctx.keyStroke(e.key.Enter);
			ag2r.audit.log("[KEY] Enter");
			return;
		},200);
	},200);
}

function selectPieces(){
	return;
}

function Annonce(prix, distance, pieces, chambres, surface){
	this.prix= prix;
	this.distance= distance;
	this.pieces = pieces;
	this.chambres = chambres;
	this.surface=surface;
	this.log = function(){
		ag2r.audit.log("[Prix] : " + this.prix);
		ag2r.audit.log( "[Distance] : " + this.distance); 
		ag2r.audit.log( "[Pieces] : " + this.pieces); 
		ag2r.audit.log( "[Chambres] : " + this.chambres); 
		ag2r.audit.log( "[Surface] : " + this.surface);
	}
}