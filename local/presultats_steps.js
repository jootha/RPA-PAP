/**
 * STEP stGetResults
 * Permet de récupère les données des maisons et créé un objet par maison.
 * @step
 * @param : ev {event object} - représente notre évenement
 * @param : sc {scenario object} - représente notre objet scénario
 * @param : st {step object} - représente notre objet step
*/
PAP.step({ stGetResults: function(ev, sc, st) {
	ag2r.audit.startStep(sc.name,st.name);
	var i =0;
	var data = sc.data;
	//tableau contenant la légende qui doit se trouver dans le formulaire
	sc.data.annonces=[];
	
	ag2r.audit.log("[PLNG] " + "PAP.pResultats.oprix.i(0).exist()");
	ctx.polling({
		delay: 250,
		nbMax: 20,
		test: function(index) {
			ag2r.audit.log("[PLNG] test n°" + index + " - " + PAP.pResultats.oprix.i(0).exist());
			return PAP.pResultats.oprix.i(0).exist(); 
		},
		done: function() { 
			while(PAP.pResultats.oprix.i(i).exist() && 
				PAP.pResultats.oDistance.i(i).exist() &&
				PAP.pResultats.oPieces.i(i).exist() &&
				PAP.pResultats.oChambres.i(i).exist() &&
				PAP.pResultats.oSurface.i(i).exist()) {// Affiche les informations trouvés dans la console dans la console

					sc.data.annonces.push(new Annonce(
						PAP.pResultats.oDistance.i(i).get().replace(/[^0-9\.]+/g, ""),
						PAP.pResultats.oPieces.i(i).get().replace(/[^0-9\.]+/g, ""),
						PAP.pResultats.oChambres.i(i).get().replace(/[^0-9\.]+/g, ""),
						PAP.pResultats.oSurface.i(i).get().replace(/m2/g, ""),
						PAP.pResultats.oprix.i(i).get().replace(/€/g, ""),
						PAP.pResultats.oAnnonce.i(i).getAttribute('href')));
					sc.data.annonces[i].log();
					i++;
		}					
		ag2r.audit.endStep(sc.name,st.name);
		sc.endStep();
		return;	
		},
		fail: function() {
			ag2r.audit.log("[ERROR] " + ag2r.errors.error04, e.logIconType.Error);
			ag2r.audit.failStep(sc.name, st.name, ag2r.errors.error04);
		}
	});
}});