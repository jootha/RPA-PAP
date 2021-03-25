
// *** Choose language (en|fr|de) ***
GLOBAL.labels.setLanguage(e.language.English);

// Global Systray object
var systray = ctx.systray();


/** main process start handler */
GLOBAL.events.START.on(function (ev) {
	// *** Create Systray ***
	systray.createSystrayMenu(ctx.options.projectName, 'ICON1');
	systray.addMenu('', 'scPAP', 'Test scPAP', '', function (ev) {
			var rootData = ctx.dataManagers.rootData.create();
			
			// Initialize your data here.
			GLOBAL.scenarios.scPAP.start(rootData);
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

