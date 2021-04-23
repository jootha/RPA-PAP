/**
 * STEP stGetPAPUrl
 * Permet de récupérer l'URL de PAP
 * @step
 * @param : ev {event object} - représente notre évenement
 * @param : sc {scenario object} - représente notre objet scénario
 * @param : st {step object} - représente notre objet step
*/
GLOBAL.step({ stGetPAPUrl: function(ev, sc, st) {

	var rootData = sc.data;
	ag2r.audit.startStep(sc.name, st.name);
	ctx.settings.PAPurl.get(function(code, label, setting) {
		if (code == e.error.OK) {
			sc.data.PAPurl = setting.value;
			ag2r.audit.endStep(sc.name, st.name, GLOBAL.labels.variables.get);
			sc.endStep();
			return;
		} else {
			ag2r.audit.log("[ERROR] " + ag2r.errors.error07 + setting.name, e.logIconType.Error);
			ag2r.audit.failStep(sc.name,st.name,ag2r.errors.error07 + setting.name);
			sc.endScenario(); // fin du scenario
		}
	});
	
	ag2r.audit.endStep(sc.name, st.name);
	sc.endStep();
	return;
}});
/**
 * STEP stGetExcelPath
 * Permet de récupérer le chemin des fichiers excel
 * @step
 * @param : ev {event object} - représente notre évenement
 * @param : sc {scenario object} - représente notre objet scénario
 * @param : st {step object} - représente notre objet step
*/
GLOBAL.step({ stGetExcelPath: function(ev, sc, st) {

	var rootData = sc.data;
	ag2r.audit.startStep(sc.name, st.name);
	ctx.settings.template.get(function(code, label, setting) {
		if (code == e.error.OK) {
			sc.data.template = setting.value;
			ag2r.audit.endStep(sc.name, st.name, GLOBAL.labels.variables.get);
			sc.endStep();
			return;
		} else {
			ag2r.audit.log("[ERROR] " + ag2r.errors.error07 + setting.name, e.logIconType.Error);
			ag2r.audit.failStep(sc.name,st.name,ag2r.errors.error07 + setting.name);
			sc.endScenario(); // fin du scenario
		}
	});
	
	ag2r.audit.endStep(sc.name, st.name);
	sc.endStep();
	return;
}});