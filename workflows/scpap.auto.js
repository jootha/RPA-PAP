
// ----------------------------------------------------------------
//   Test menu for scenario scPAP 
// ----------------------------------------------------------------
GLOBAL.events.START.on(function (ev) {
	if (ctx.options.isDebug) {
		// Add item in systray menu.
		systray.addMenu('', 'scPAP', 'Test scPAP', '', function (ev) {
			var rootData = ctx.dataManagers.rootData.create();
			
			// Initialize your data here.
			GLOBAL.scenarios.scPAP.start(rootData);
		});
	}
});

//---------------------------------------------------
// Scenario scPAP Starter ()
//---------------------------------------------------

// ----------------------------------------------------------------
//   Scenario: scPAP
// ----------------------------------------------------------------
GLOBAL.scenario({ scPAP: function(ev, sc) {
	var rootData = sc.data;

	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.setScenarioTimeout(600000); // Default timeout for global scenario.
	sc.onError(function(sc, st, ex) { sc.endScenario(); }); // Default error handler.
	sc.onTimeout(30000, function(sc, st) { sc.endScenario(); }); // Default timeout handler for each step.
	sc.step(GLOBAL.steps.Custom);
}}, ctx.dataManagers.rootData).setId('54fd2a90-6fb5-4a38-8665-b38712da1732') ;

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
