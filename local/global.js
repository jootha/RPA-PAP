
// *** Choose language (en|fr|de) ***
GLOBAL.labels.setLanguage(e.language.English);

// Global Systray object
var systray = ctx.systray();


/** main process start handler */
GLOBAL.events.START.on(function (ev) {

	systray.createSystrayMenu(ctx.options.projectName, 'ICON1');
	systray.addMenu('', 'evPAP', GLOBAL.labels.scenarios.scName, '', function (ev) {
		var rootData = ctx.dataManagers.rootData.create();
		GLOBAL.scenarios.scRecherche.start(rootData);
	});
});

/** main process stop handler */
GLOBAL.events.QUIT.on(function(ev) {
	// add code here
});

/** Auto-update menu handler */
GLOBAL.events.UPDATECTX.on(function(ev) {
	ctx.shutdownAgent(true, true, (ctx.options.restartConfirmation ? GLOBAL.labels.updatePopup.label : null), GLOBAL.labels.updatePopup.title);
});

function traceErrorVariable(sc, stepName, gravity, codeError, error, todo, ex){
	ag2r.audit.log("[ERROR] ERR" + codeError.toString() + " : " + error + " : " + ex, e.logIconType.Error);
	ag2r.audit.failStep(sc.name, stepName, "ERR" + codeError.toString() + " : " + error + " :" + ex);
}