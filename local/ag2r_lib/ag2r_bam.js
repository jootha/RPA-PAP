/**
*	Activation et configuration du BAM 
* Pour fonctionner, il faut activer la lib Ctx Galaxy WS
*/
GLOBAL.events.START.on(function (ev) {

	// Options de GalaxyWS
	if (ctx.options.env == e.env.dev || ctx.options.env == e.env.test || ctx.options.env == e.env.qual) {
		ctx.options.galaxyWS.WS.url = 'http://wdc2i744/dev/GalaxyWS';
	} else {
		ctx.options.galaxyWS.WS.url = 'http://wpcci712/prod/GalaxyWS';
	}
	
	ctx.options.galaxyWS.localCache.enabled = true;
	ctx.options.galaxyWS.WS.enabled = false;
	ctx.options.galaxyWS.localCache.parseVeryShortDelay = 1 * 1000;
	ctx.options.galaxyWS.localCache.parseShortDelay = 60 * 1000; 
	ctx.options.galaxyWS.localCache.parseLongDelay = 10 * 60 * 1000;

	ctx.galaxyWS.setUserVariables(ctx.options.computerName, ctx.options.userName, '');

	ctx.galaxyWS.selfRegister(ctx.options.userName, '', 'ALL', 'ALL');

	ctx.galaxyWS.startLocalCacheParsing(ctx.galaxyWS.DelayType.LocalCacheParseShortDelay);
});

/**
 * @constructor
 */
ag2r.bam = (function () {

	var self = {
		
		/** fonctions publiques */
		/**
			* @method tracerActionUtilisateur
		  * @summary Trace une action de l\'utilisateur (comme un clic de débranchement)
			* @param  {string} robot - Nom du robot concerné par l\'action
			* @param  {string} action - étape du process (comme le nom du bouton)
			* @param  {string} status - statut de l\'action. Utiliser e.galaxy.status
			* @param  {string} [data] - Informations supplémentaires à remonter
		*/
 		tracerActionUtilisateur : function(robot, action, status, data)	{
			ctx.notifyAction('tracerActionUtilisateur');
			ctx.galaxyWS.sendProcessNotification(robot, action, status, data, true); 
		},
		
		/**
			* @method envoyerPageNotification
		  * @summary Trace l'accès à une page utilisateur. A déclarer dans un events.LOAD.on d\'une page
			* @param  {ctx.page} page - Page à notifier
			* @param  {string} [data] - données à remonter
		*/
		envoyerPageNotification : function(page, data)	{
			ctx.notifyAction('envoyerPageNotification');
			ctx.galaxyWS.sendPageNotification(page, data);
		},

		/**
		  * @method initStep
			* @summary Initialise le début d\'un processus dans le BAM
			* @param  {string} scenario - Scenario lancé
			* @param  {string} step - étape du process
		*/
		initStep : function (scenario, step) {
			ctx.notifyAction('initStep');
			ctx.galaxyWS.initProcessNotification(scenario, step);
		},
		
		/**
		  * @method envoyerStep
			* @summary Initialise le début d\'un processus dans le BAM
			* @param  {string} scenario - Scenario lancé
			* @param  {string} step - étape du process
			* @param  {string} status - statut de l\'action. Utiliser e.galaxy.status
			* @param  {string} [data] - données à remonter
		*/
		envoyerStep : function (scenario, step, status, data) {
			ctx.notifyAction('envoyerStep');
			ctx.galaxyWS.sendProcessNotification(scenario, step, status, data, false, true); 
		}
	}
	return self;
})();