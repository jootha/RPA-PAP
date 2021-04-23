/**
 * STEP stInitData
 * Permet de initialise les données
 * @step
 * @param : ev {event object} - représente notre évenement
 * @param : sc {scenario object} - représente notre objet scénario
 * @param : st {step object} - représente notre objet step
*/
PAP.step({ stInitData: function(ev, sc, st) {
	sc.data.nberrResultats=0;//nombre d'erreurs de chargements de la page pResultats
	sc.data.nberrAcc=0;//nombre d'erreurs de chargements de la page pAcceuil
	ctx.wait(function(ev){
		sc.endStep();
		return;
	}, 500);
}});
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
	ctx.shellexec('chrome', sc.data.PAPurl, undefined, e.launchFlag.Hide);
//TODO reconnaissance des elements de pAcceuil capricieux
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
			
			//Si la page ne se charge pas correctement, on relance la page jusqu'à 3 fois
			if(sc.data.nberrAcc>=3){
				ag2r.audit.failStep(sc.name, st.name, ag2r.errors.error04);
			}else {	
				sc.data.nberrAcc++;
				ag2r.audit.log("[Info] nberrAcc = "+sc.data.nberrAcc);
				sc.endStep(PAP.steps.stStartPAP);
				return;
			}
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
		selectionItem(16);
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
		selectionItem(3);//selectionne piece 3
		selectionItem(1);//selectonne piece 4
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
				ag2r.audit.endStep(sc.name,st.name);
				sc.endStep();
				return;
			}, 500);
	}, 200);
}});

/**
 * STEP stVerifSaisie
 * Permet de vérifier si les données saisis sont corrects
 * @step
 * @param : ev {event object} - représente notre évenement
 * @param : sc {scenario object} - représente notre objet scénario
 * @param : st {step object} - représente notre objet step
*/
PAP.step({ stVerifSaisie: function(ev, sc, st) {
	ag2r.audit.startStep(sc.name,st.name);
	var err ="";

	try{
		if(PAP.pAccueil.iTypes.get(PAP.pAccueil.iTypes.exist())!="maison"){
			throw new Error(e.error.Fail, "saisie iTypes incorrect");
			err+="Saisie iTypes incorrect. ";
		}
		if(PAP.pAccueil.iNb_pieces.get(PAP.pAccueil.iNb_pieces.exist())!=3){
			throw new Error(e.error.Fail, "saisie iNb_pieces incorrect");
			err+="Saisie iNb_pieces incorrect. ";
		}
		if(PAP.pAccueil.iNbChambres.get(PAP.pAccueil.iNbChambres.exist())!=3){
			throw new Error(e.error.Fail, "saisie iNbChambres incorrect");
			err+="Saisie iNbChambres incorrect. ";
		}
		if(PAP.pAccueil.iSurfaceMin.get(PAP.pAccueil.iSurfaceMin.exist())!=85){
			throw new Error(e.error.Fail, "saisie iSurfaceMin incorrect");
			err+="Saisie iSurfaceMin incorrect. ";
		}
		if(PAP.pAccueil.iPrixMax.get(PAP.pAccueil.iPrixMax.exist())!=300000){
			throw new Error(e.error.Fail, "saisie iPrixMax incorrect");
			err+="Saisie iPrixMax incorrect. ";
		}
	}catch(ex){
		throw new Error(e.error.Fail,err);
		ag2r.errors.error03;
		sc.endScenario();
		return;
	}
	ag2r.audit.log("[Click] btRechercher ");
	PAP.pAccueil.btRechercher.clickMouse();
	ag2r.audit.endStep(sc.name,st.name);
	sc.endStep();
	return;
}});