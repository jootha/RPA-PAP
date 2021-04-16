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

	ctx.wait(function(ev){
		ag2r.audit.endStep(sc.name,st.name);
		sc.endStep();
		return;
	}, 500);
}});

/**
 * STEP stLoadForm
 * Permet de charger le formulaire de recherche et selectionne Achat
 * @step
 * @param : ev {event object} - représente notre évenement
 * @param : sc {scenario object} - représente notre objet scénario
 * @param : st {step object} - représente notre objet step
*/
PAP.step({ stLoadForm: function(ev, sc, st) {
	ag2r.audit.startStep(sc.name,st.name);
	ag2r.audit.log("[PLNG] " + "PAP.pAccueil.oAchat.exist()");
	ctx.polling({
		delay: 250,
		nbMax: 20,
		test: function(index) {
			ag2r.audit.log("[PLNG] test n°" + index + " - " + PAP.pAccueil.oAchat.exist());
			return PAP.pAccueil.oAchat.exist(); 
		},
		done: function() { 
			PAP.pAccueil.oAchat.click();
			PAP.pAccueil.wait(function(ev) {
				ag2r.audit.log("[WAIT] " + st.name + " - " + ev.appliName + "." + ev.pageName + ".wait");
				ag2r.audit.endStep(sc.name,st.name);
				sc.endStep(PAP.steps.stType);
				return;
			}, 200)
		},
		fail: function() {
			ag2r.audit.log("[ERROR] " + ag2r.errors.error04, e.logIconType.Error);
			ag2r.audit.failStep(sc.name, st.name, ag2r.errors.error04);
		}
	});
}});

/**
 * STEP stType
 * Permet de selecitonner le type de bien : Maison
 * @step
 * @param : ev {event object} - représente notre évenement
 * @param : sc {scenario object} - représente notre objet scénario
 * @param : st {step object} - représente notre objet step
*/
PAP.step({ stType: function(ev, sc, st) {
	ag2r.audit.startStep(sc.name,st.name);
	PAP.pAccueil.iTypes.clickMouse();
	ag2r.audit.log("[Click] Types ");
	PAP.pAccueil.wait(function(ev) {
		ag2r.audit.log("[WAIT] " + st.name + " - " + ev.appliName + "." + ev.pageName + ".wait");			
		for (var index = 0; index < 16; index++) {
			ctx.keyStroke(e.key.Up); 
			ag2r.audit.log("[key] Up");
		}
		ctx.keyStroke(e.key.Enter);
		ag2r.audit.log("[key] Enter");//selectonne Maison
		ctx.keyStroke(e.key.Esc);
		ag2r.audit.log("[key] Esc");//Ferme le menu contextuel
		
		ag2r.audit.endStep(sc.name,st.name);
		sc.endStep(PAP.steps.stPieces);
		return;
	}, 200);
}});
/**
 * STEP stPieces
 * Permet de selectionner 3 et 4 pieces
 * @step
 * @param : ev {event object} - représente notre évenement
 * @param : sc {scenario object} - représente notre objet scénario
 * @param : st {step object} - représente notre objet step
*/
PAP.step({ stPieces: function(ev, sc, st) {
	ag2r.audit.startStep(sc.name,st.name);
	PAP.pAccueil.iNb_pieces.clickMouse();
	ag2r.audit.log("[Click] Pieces ");
	PAP.pAccueil.wait(function(ev) {
		ag2r.audit.log("[WAIT] " + st.name + " - " + ev.appliName + "." + ev.pageName + ".wait");			
		for (var index = 0; index < 3; index++) {
			ctx.keyStroke(e.key.Up); 
			ag2r.audit.log("[key] Up");
		}
		ctx.keyStroke(e.key.Enter);//selectonne piece 3
		ag2r.audit.log("[key] Enter");
		ctx.keyStroke(e.key.Up); 
		ag2r.audit.log("[key] Up");
		ctx.keyStroke(e.key.Enter);//selectonne piece 4
		ag2r.audit.log("[key] Enter");
		ctx.keyStroke(e.key.Esc);//Ferme le menu contextuel
		ag2r.audit.log("[key] Esc");

		ag2r.audit.endStep(sc.name,st.name);
		sc.endStep(PAP.steps.stChambres);
		return;
	}, 200);
}});
/**
 * STEP stChambres
 * Permet de selectionner le nombre le nombre de chambres 3
 * @step
 * @param : ev {event object} - représente notre évenement
 * @param : sc {scenario object} - représente notre objet scénario
 * @param : st {step object} - représente notre objet step
*/
PAP.step({ stChambres: function(ev, sc, st) {
	ag2r.audit.startStep(sc.name,st.name);
	PAP.pAccueil.iNbChambres.clickMouse();
	ag2r.audit.log("[Click] Chambres ");
	PAP.pAccueil.wait(function(ev) {
		ag2r.audit.log("[WAIT] " + st.name + " - " + ev.appliName + "." + ev.pageName + ".wait");			
		for (var index = -1; index < 3; index++) {
			ctx.keyStroke(e.key.Down); 
			ag2r.audit.log("[key] Down");
		}
		ctx.keyStroke(e.key.Enter);//selectonne 3 chambres
		ag2r.audit.log("[key] Enter");
		ctx.keyStroke(e.key.Esc);//Ferme le menu contextuel
		ag2r.audit.log("[key] Esc");
		
		ag2r.audit.endStep(sc.name,st.name);
		sc.endStep(PAP.steps.stLieu);
		return;
	}, 200);
}});

/**
 * STEP stLieu
 * Permet de remplir les champs Lieu, surface et prix, puis valide le formulaire
 * @step
 * @param : ev {event object} - représente notre évenement
 * @param : sc {scenario object} - représente notre objet scénario
 * @param : st {step object} - représente notre objet step
*/
PAP.step({ stLieu: function(ev, sc, st) {
	ag2r.audit.startStep(sc.name,st.name);
	PAP.pAccueil.iLieu.clickMouse();
	ag2r.audit.log("[Click] Lieu ");
	
	PAP.pAccueil.wait(function(ev) {
		ag2r.audit.log("[WAIT] " + st.name + " - " + ev.appliName + "." + ev.pageName + ".wait");
			ctx.keyStroke("Lille (59)"); 
			ag2r.audit.log("[key] Lille (59)");
			PAP.pAccueil.wait(function(ev) {
				ag2r.audit.log("[WAIT] " + st.name + " - " + ev.appliName + "." + ev.pageName + ".wait");
				ctx.keyStroke(e.key.Enter);
				ag2r.audit.log("[key] Enter");
	
				PAP.pAccueil.iSurfaceMin.set(85);
				PAP.pAccueil.iPrixMax.set(300000);
				PAP.pAccueil.btRechercher.clickMouse();
				ag2r.audit.endStep(sc.name,st.name);
				sc.endStep();
				return;
			}, 500);
	}, 200);
}});

