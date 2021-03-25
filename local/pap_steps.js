/**
 * STEP stStartPAP
 * Permet de lancer l'application PAP
 * @step
 * @param : ev {event object} - représente notre évenement
 * @param : sc {scenario object} - représente notre objet scénario
 * @param : st {step object} - représente notre objet step
*/
PAP.step({ stStartPAP: function(ev, sc, st) {
	ag2r.audit.log("[STEP] " + st.name);
	sc.data.PAPurl= "https://www.pap.fr/";
	PAP.start(sc.data.PAPurl);
	ctx.wait(function(ev){
		sc.endStep();
		return;
	}, 500);
}});