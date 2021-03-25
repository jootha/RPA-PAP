
// ----------------------------------------------------------------
//   Test menu for scenario scRecherche 
// ----------------------------------------------------------------
GLOBAL.events.START.on(function (ev) {
	if (ctx.options.isDebug) {
		// Add item in systray menu.
		systray.addMenu('', 'scRecherche', 'Test scRecherche', '', function (ev) {
			var rootData = ctx.dataManagers.rootData.create();
			
			// Initialize your data here.
			GLOBAL.scenarios.scRecherche.start(rootData);
		});
	}
});

//---------------------------------------------------
// Scenario scRecherche Starter ()
//---------------------------------------------------

// ----------------------------------------------------------------
//   Scenario: scRecherche
// ----------------------------------------------------------------
GLOBAL.scenario({ scRecherche: function(ev, sc) {
	var rootData = sc.data;

	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.setScenarioTimeout(600000); // Default timeout for global scenario.
	sc.onError(function(sc, st, ex) { sc.endScenario(); }); // Default error handler.
	sc.onTimeout(30000, function(sc, st) { sc.endScenario(); }); // Default timeout handler for each step.
	sc.step(GLOBAL.steps.Custom);
}}, ctx.dataManagers.rootData).setId('6aef775b-a60f-4d32-906f-50fdc36126ee') ;

// ----------------------------------------------------------------
//   Step: Custom
// ----------------------------------------------------------------
GLOBAL.step({ Custom: function(ev, sc, st) {
	var rootData = sc.data;
	ctx.workflow('scRecherche', '2d4b3e6b-f9cb-4ec8-9a1a-174a1b279b97') ;
	// Describe functionality to be implemented in JavaScript later in the project.
	sc.endStep(); // end Scenario
	return;
}});
