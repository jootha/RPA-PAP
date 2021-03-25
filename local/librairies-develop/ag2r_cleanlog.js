
/** Evenement START */
/** 
* @method _GestionLogs
* @summary Creation du dossier C:\log\rpa et suppression des logs de plus de 7 jours
*/
GLOBAL.events.INIT.on(function(ev) {
	ag2r.audit.log('[EVNT] GLOBAL.events.START.on', e.logIconType.Event);

	ag2r.cleanLog.createLogFolders();
	ag2r.cleanLog.deleteOldLog();
});

/**
* AG2R Librairie de gestion des fichiers de logs
* @constructor
* @class ag2r.cleanLog
* @path ag2r.cleanLog
 */
ag2r.cleanLog = (function () {
	/** variables privees */
	/** @type {string} */ 	var _cLog = 'C:\\log';
	/** @type {string} */ 	var _cLogRPA = 'C:\\log\\rpa';
	/** @type {string} */ 	var _cLogRPARobot;
	
	/** fonctions privées */
	/** 
	* @method _createFolder
	* @summary Cree le dossier demandé s\'il n\'existe pas
	* @param {string} dossier - le chemin du dossier a creer
	*/
	var _createFolder = function(dossier){
		ag2r.audit.log('[INFO] Verification de '+ dossier, e.logIconType.Info);
		try {
			if(!ctx.fso.folder.exist(dossier)) {
				ag2r.audit.log('       ' + dossier + ' nexiste pas, creation ...', e.logIconType.Info);
				ctx.fso.folder.create(dossier);
			}
		} catch(ex) {
			ag2r.audit.log('[ERROR] Erreur suivante apparue : ' + ex.message, e.logIconType.Error);
		}
	};
	
	var self = {
			
		/** fonctions publiques */
		/**
		* @method createLogFolders
		* @path 	ag2r.cleanLog.createLogFolders
		* @summary Creer les dossier C:\log et C:\log\rpa\nom_robot si inexistant
		*/
 		createLogFolders : function()	{
			ctx.notifyAction('ag2r.cleanLog.createLogFolders');
			_cLogRPARobot = _cLogRPA + '\\' + ctx.options.projectName;
			_createFolder(_cLog);
			_createFolder(_cLogRPA);
			_createFolder(_cLogRPARobot);
		},
		
		/**
		* @method deleteOldLog
		* @path 	ag2r.cleanLog.deleteOldLog
		* @summary Supprime les fichiers presents dans C:\log\rpa de plus de 7 jours
		*/
		deleteOldLog : function()	{
			ctx.notifyAction('ag2r.cleanLog.deleteOldLog');
			
			// Nettoyage des logs
			ag2r.audit.log('[INFO] Nettoyage de '+ _cLogRPARobot, e.logIconType.Info);
			try {
				// Recherche des fichiers dans le dossier C:\log
				ag2r.audit.log('       Analyse ...', e.logIconType.Info);
				var logs = ctx.exec('cmd /c dir ' + _cLogRPARobot).output.toUpperCase().split('\n');
				ctx.log('Contenu du dossier récupéré : ' + logs);
				var dateNow = new Date();
				var date, line;
				dateNow.setTime(dateNow.getTime() - 604800000); // Calcul de la date J-7
				
				ag2r.audit.log('       Nettoyage ...', e.logIconType.Info);
				for(var i = 0; i < logs.length; i ++) {
					if(
						// Controle ligne fichier/dossiers
						logs[i].length > 10 && 
						logs[i][2] === '/' && 
						logs[i][5] === '/' && 
						// Controle ligne fichier
						logs[i].indexOf('<DIR>') === -1 
					) {
						// Controle de la date
						line = logs[i].substr(0, 10).split('/');
						date = new Date(Number(line[2]), Number(line[1]) - 1, Number(line[0]));
						
						if(date.getTime() < dateNow.getTime()) {
							// Suppression du fichier
							try {
								line = logs[i].substr(36).replace('\r', '');
							ag2r.audit.log('       Suppression : "' + _cLogRPARobot + '\\' + line + '"', e.logIconType.Info);
							ctx.fso.file.remove(_cLogRPARobot + '\\' + line);
							} catch (ex) {
								ag2r.audit.log('              Impossible de supprimer le fichier : ' + ex.message, e.logIconType.Error);
							}
						}
					}
				}
				ag2r.audit.log('[INFO] Fin du nettoyage des logs', e.logIconType.Info);
			} catch (ex) {
				ag2r.audit.log('[ERROR] Erreur suivante apparue : ' + ex.message, e.logIconType.Error);
			}
		}
	}
	return self;
})();
