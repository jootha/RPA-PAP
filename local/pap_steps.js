/**
 * STEP stStartPAP
 * Permet de lancer l'application PAP
 * @step
 * @param : ev {event object} - représente notre évenement
 * @param : sc {scenario object} - représente notre objet scénario
 * @param : st {step object} - représente notre objet step
*/
PAP.step({ stStartPAP: function(ev, sc, st) {
	ag2r.audit.startStep(sc.name,st.name);
	sc.data.PAPurl= "https://www.pap.fr/";
	ctx.shellexec('chrome', sc.data.PAPurl, undefined, e.launchFlag.Hide);
	//PAP.start(sc.data.PAPurl);
	ctx.wait(function(ev){
		ag2r.audit.endStep(sc.name,st.name);
		sc.endStep();
		return;
	}, 500);
}});

/**
 * STEP stFillForm
 * Permet de complète le formulaire de recherche
 * @step
 * @param : ev {event object} - représente notre évenement
 * @param : sc {scenario object} - représente notre objet scénario
 * @param : st {step object} - représente notre objet step
*/
PAP.step({ stFillForm: function(ev, sc, st) {
	ag2r.audit.startStep(sc.name,st.name);
	ag2r.audit.log("[PLNG] " + "PAP.pAcceuil.oFormRecherche.exist()");
	ctx.polling({
		delay: 250,
		nbMax: 20,
		test: function(index) {
			ag2r.audit.log("[PLNG] test n°" + index + " - " + PAP.pAcceuil.oFormRecherche.exist());
			return PAP.pAcceuil.oFormRecherche.exist(); 
		},
		done: function() { 
			PAP.pAcceuil.oAchat.click();
			PAP.pAcceuil.iTypes.clickMouse();
			//PAP.pAcceuil.iNb_pieces.clickMouse();
			PAP.pAcceuil.wait(function(ev) {
				ag2r.audit.log("[WAIT] " + st.name + " - " + ev.appliName + "." + ev.pageName + ".wait : oMaison.click");
				//PAP.pAcceuil.o3Pieces.click();
				//PAP.pAcceuil.o4Pieces.clickMouse();
				//PAP.pAcceuil.iNbChambres.set(3);
				PAP.pAcceuil.oMaison.click();

				PAP.pAcceuil.iPrixMax.set("300000");
				PAP.pAcceuil.iSurfaceMin.set("85");
				
				PAP.pAcceuil.iLieu.click();

				PAP.pAcceuil.wait(function(ev) {
					ag2r.audit.log("[WAIT] " + st.name + " - " + ev.appliName + "." + ev.pageName + ".wait : \"Lille (59)\"");
					//PAP.pAcceuil.iLieu.set("Lille (59)");
					ctx.keyStroke("Lille (59)");
					
					PAP.pAcceuil.wait(function(ev) {
						ag2r.audit.log("[WAIT] " + st.name + " - " + ev.appliName + "." + ev.pageName + ".wait : Enter");
						ctx.keyStroke(e.key.Enter);
						ag2r.audit.endStep(sc.name,st.name);
						sc.endStep();
						return;
					}, 1000);
				}, 200);
			}, 300);

			
		},
		fail: function() {
			ag2r.audit.log("[ERROR] " + ag2r.errors.error04, e.logIconType.Error);
			ag2r.audit.failStep(sc.name, st.name, ag2r.errors.error04);
		}
	});
}});