﻿// ----------------------------------------------------------------
//   Scenario: scPAP
// ----------------------------------------------------------------
GLOBAL.scenario({ scPAP: function(ev, sc) {
	var rootData = sc.data;

	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.onTimeout(600000, function(sc, st) {
		ag2r.audit.failStep(sc.name, st.name, ag2r.errors.error01 + st.name);
		GLOBAL.data.errors.push(ag2r.errors.error01 + st.name);
		ag2r.ihm.close();

		var traceFolder = ((ctx.options.trace.autoRecordingStarted || ctx.options.trace.frameworkTraces) ? ctx.options.traceFolderRecording : ctx.options.traceFolder);		
		ctx.screenshot({File : ctx.options.path.log + '\\' + traceFolder + '\\' + ag2r.audit.dateNow + '.png'});		
		
		sc.endScenario();
	});
	sc.onError(function(sc, st, ex) {
		ag2r.audit.failStep(sc.name, st.name, ag2r.errors.error00 + st.name + " - " + ex.message);
		GLOBAL.data.errors.push(ag2r.errors.error00 + st.name + " - " + ex.message);
		var traceFolder = ((ctx.options.trace.autoRecordingStarted || ctx.options.trace.frameworkTraces) ? ctx.options.traceFolderRecording : ctx.options.traceFolder);		
		ctx.screenshot({File : ctx.options.path.log + '\\' + traceFolder + '\\' + ag2r.audit.dateNow + '.png'});		
		sc.endScenario();
	});
	sc.onEnd( function(sc) {
		var data = sc.data;
		ag2r.ihm.close();
		ag2r.audit.endScenario();
		sc.setError(e.error.KO, "Génération du diagnostic");
		var message = '<br/><b>Le traitement est terminé</b><br/>' + data.commentaires;
		if (!!GLOBAL.data.errors && GLOBAL.data.errors.length > 0) {
			message = message + '<br/> Une ou plusieurs erreurs sont apparues : <ul>';
			ctx.each(GLOBAL.data.errors, function(index, error) {
				return message = message + '<li>' + error + '</li>';
			});
			message = message + '</ul>';
		}
		ctx.popup('pEnd').open({
				template: e.popup.template.Ok,
				title: 'RPA Controles journaliers',
				CX: 500,
				CY: 500,
				message: message,
				icon: e.popup.icon32.info
			});
	});
	
	// Réinitialisation des données
	GLOBAL.data.errors = [];
	//ag2r.ihm.start(true);
	
	/****    DECLARATION DES STEPS    ****/
	// Déclaration de l'enchainement des steps
	
	sc.step(GLOBAL.steps.Custom);

	ag2r.audit.log("[INFO] Scenario scPAP lancé ...");
	ag2r.audit.startScenario();
}}, ctx.dataManagers.rootData).setId('7bf54ce6-321a-4883-bd42-e93a20300c1c') ;


// ----------------------------------------------------------------
//   Step: Custom
// ----------------------------------------------------------------
GLOBAL.step({ Custom: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('scPAP', '99bbd12f-241f-43b8-bceb-9530bf814f9a') ;
	// Describe functionality to be implemented in JavaScript later in the project.
	sc.endStep(); // end Scenario
	return;
}});
