////////////////////////////////////////////////////////////////
////////         		Utilitaires Audit    			////////
////////                                                ////////
////////                  Sopra  Steria                 ////////
////////               APS - Smart Machine              ////////
////////                                                ////////
////////////////////////////////////////////////////////////////

/**
* Paramétrage pour la librairie diagnostic
**/
ctx.options.trace.autoRecording = true;
ctx.options.diagnostic.displayPopup = false;
ctx.options.diagnostic.savePrograms = true;
ctx.options.diagnostic.saveDesktop = true;
ctx.options.diagnostic.saveCrashDumps = true;
ctx.options.diagnostic.saveXMLContext = true;
ctx.options.diagnostic.saveEventViewer = true;
ctx.options.diagnostic.archiveCopy.enabled = true;
ctx.options.diagnostic.archiveCopy.remoteFolder = "C:\\log\\rpa\\" + ctx.options.projectName; 

/**
* AG2R Audit Lib
* @class ag2r.audit
* @path ag2r.audit
*/
ag2r.audit = (function () {
	/** constantes privées */
	/** @type {Array} */ var _COLONNES_FICHIER_AUDIT = ["No.", "Etape", "Date", "Heure de début", "Heure de fin", "Statut", "Commentaire"];	
	/** @type {Object} */ var _STEP_STATUT = { OK: 'OK', KO: 'KO'};	
	
	/** variables privées*/
	/** @type {number} */ var _nStep = 0;
	/** @type {string} */ var _dateAudit;
	/** @type {string} */ var _csvFileName;
	/** @type {string} */ var _txtFileName;
	/** @type {string} */ var _folderName;
	
	
	/** fonctions privées */
	/** 
	* @method _ecrireLogsFonctionnels
	* @summary Ecriture des informations liées à une étape dans le fichier de log fonctionnel. Une partie est écrire au début de step, et la fin de la ligne à la fin d'un step
	* @param {Object} step - Objet contenant les informations du step {numero, nomEtape, statut, commentaire}
	* @param {boolean} estUnDebutDeStep - S'il s'agit d'un début de step on ne saisie pas le retour à la ligne pour renseigner par la suite les informations de fin de step
	* @param {boolean} estUneLigneUnique - Si la ligne à écrire est unique
	*/
	var _ecrireLogsFonctionnels = function(step, estUnDebutDeStep, estUneLigneUnique){
		var date = new Date();

		if(estUnDebutDeStep){
			var txt = [step.numero.toString(), step.nomEtape, date.toLocaleDateString(), date.toLocaleTimeString()].join(';') + ';' + (estUneLigneUnique ? '\n' : '');
		}else{
			var txt = [date.toLocaleTimeString(), step.statut, step.commentaire].join(';') + ';' + '\n';
		}
	
		ctx.wkMng.CtxtWriteFile(_csvFileName, txt , true);
		return;
	};
	
	var self = {
		/** public functions */
		/**
		* Création des fichiers d'audit et déclaration de lancement d'automatisation dans ces fichiers
		* @description
		* __Ex.:__
		<code javascript>
		ag2r.audit.startScenario();
		</code>
		* @method startScenario
		* @path ag2r.audit.startScenario
		*/
		startScenario : function() {
			ctx.options.diagnostic.archiveCopy.remoteFolder = "C:\\log\\rpa\\" + ctx.options.projectName;
			_folderName = "C:\\log\\rpa\\" + ctx.options.projectName;
			// Initilisation des fichiers d'audit avec la date de début
			_dateAudit = ctx.getTimestamp(null, true, '-', false);
			_csvFileName = _folderName + '\\' + ctx.options.projectName + "_" + _dateAudit + ".csv";
			_txtFileName = _folderName + '\\' + ctx.options.projectName + "_" + _dateAudit + ".txt";
			var nomsColonnes = _COLONNES_FICHIER_AUDIT.join(';') + ";\n";
			ctx.wkMng.CtxtWriteFile(_csvFileName, nomsColonnes , true);
			
			// Déclaration du début du scénario dans le fichier de logs
			_ecrireLogsFonctionnels(
				{
					numero: "DEBUT", 
					nomEtape: "Début de l'automatisation..."
				},
				true,
				true
			);
						
			ag2r.audit.log("");
			ag2r.audit.log("----------     AUDIT START SCENARIO     ----------");
			ag2r.audit.log("");
			return;
		},
		
		/** 
		* @method startStep
		* @summary Déclaration de lancement d'un step dans le fichier d'audit
		* @param {string} nomScenario - Nom du scenario
		* @param {string} nomStep - Nom du step
		*/
		startStep : function (nomScenario, nomStep){
			_nStep ++;
			_ecrireLogsFonctionnels(
				{
					numero: _nStep, 
					nomEtape: nomStep
				},
				true
			);
			ag2r.audit.log("");
			ag2r.audit.log("----------     AUDIT START STEP     ----------");
			ag2r.audit.log("               " + nomStep);
			ag2r.audit.log("");
			ag2r.bam.initStep(nomScenario, nomStep);
			return;
		},
		
		/** 
		* @method endStep
		* @summary Déclaration de la fin d'exécution d'un step dans le fichier d'audit
		* @param {string} nomScenario - Nom du scenario
		* @param {string} nomStep - Nom du step
		* @param {string|Object} [commentaire] - Détail sur le déroulement d'un step
		*/
		endStep : function(nomScenario, nomStep, commentaire){
			_ecrireLogsFonctionnels(
				{
					statut: _STEP_STATUT.OK, 
					commentaire: commentaire || ''
				},
				false
			);
			
			ag2r.audit.log("");
			ag2r.audit.log("----------     AUDIT END STEP     ----------");
			ag2r.audit.log("               "+ (typeof commentaire === "string") ? commentaire : commentaire.message);
			ag2r.audit.log("");
			
			if (commentaire) {
				ag2r.bam.envoyerStep(nomScenario, nomStep, e.galaxy.status.Ok, (typeof commentaire === "string") ? commentaire : commentaire.message, false);
			} else {
				ag2r.bam.envoyerStep(nomScenario, nomStep, e.galaxy.status.Ok, '', false);
			}
			return;
		},
		
		/** 
		* @method failStep
		* @summary Déclaration de l'echec lors de l'exécution d'un step dans le fichier d'audit, enregistrement des captures d'écran et des statuts
		* @param {string} nomScenario - Nom du scenario
		* @param {string} nomStep - Nom du step
		* @param {string|Object} [commentaire] - Raison de l'echec du step
		*/
		failStep: function(nomScenario, nomStep, commentaire){
			var traceFolder = ((ctx.options.trace.autoRecordingStarted || ctx.options.trace.frameworkTraces) ? ctx.options.traceFolderRecording : ctx.options.traceFolder);
			ctx.screenshot({File : ctx.options.path.log + '\\' + traceFolder + '\\' + _dateAudit + '.png'});

			_ecrireLogsFonctionnels(
				{
					statut: _STEP_STATUT.KO, 
					commentaire: commentaire || ''
				},
				false
			);
	
			ag2r.audit.log("");
			ag2r.audit.log("----------     AUDIT FAIL STEP     ----------");
			if(commentaire) {
				ag2r.audit.log("               " + (typeof commentaire === "string") ? commentaire : commentaire.message, e.logIconType.Error);
			}
			ag2r.audit.log("");
			
			ag2r.bam.envoyerStep(nomScenario, nomStep, e.galaxy.status.Fail, (typeof commentaire === "string") ? commentaire : commentaire.message, false);
			return;
		},
		
		/** 
		* @method endScenario
		* @summary Déclaration de fin d'exécution d'un scénario ainsi que l'enregistrement des logs en format csv, création d'une erreur "KO" pour générer le diagnostic
		* @param {string|Object} [commentaire] - exception/commentaire rencontré lors de l'exécution d'un scénario
		*/
		endScenario: function(commentaire){
			_ecrireLogsFonctionnels(
				{
					numero: "FIN", 
					nomEtape: "Fin du traitement"
				},
				true,
				true
			);
			
			ag2r.audit.log("");
			ag2r.audit.log("----------     AUDIT END SCENARIO     ----------");
			if(commentaire) {
				ag2r.audit.log("               " + (typeof commentaire === "string") ? commentaire : commentaire.message);
			}
			ag2r.audit.log("");		
			sc.setError(e.error.KO, "Génération du diagnostic");
			return;
		},
		
		/** 
		* @method log
		* @summary Produit une log contextor et ajoute une log dans le fichier de log au format txt
		* @param {string} txt - exception/commentaire rencontré lors de l'exécution d'un scénario
		* @param {e.logIconType} [iconType] - Icone pouvant améliorer la lisibilité des logs
		*/
		log: function(txt, iconType){
			ctx.log(txt, iconType);
			var date = new Date();
			var dateFormatee = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
			ctx.wkMng.CtxtWriteFile(
				_txtFileName,
				'\n' + dateFormatee + '    ' + txt, 
				true
			);
			return;
		}
	};
	return self;
})();
