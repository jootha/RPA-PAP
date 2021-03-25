////////////////////////////////////////////////////////////////
////////         Utilitaires Interface Home Machine     ////////
////////                  utilsIHM.js                   ////////
////////                                                ////////
////////                  Sopra  Steria                 ////////
////////               APS - Smart Machine              ////////
////////                                                ////////
////////////////////////////////////////////////////////////////

/**
* AG2R Audit Lib
* @class ag2r.audit
* @path ag2r.audit
*/

ctx.options.trace.autoRecording = true;
ctx.options.diagnostic.displayPopup = false;
ctx.options.diagnostic.savePrograms = true;
ctx.options.diagnostic.saveDesktop = true;
ctx.options.diagnostic.saveCrashDumps = true;
ctx.options.diagnostic.saveXMLContext = true;
ctx.options.diagnostic.saveEventViewer = true;
ctx.options.diagnostic.archiveCopy.useExecRun = true;
ctx.options.diagnostic.archiveCopy.enabled = true;
ctx.options.diagnostic.archiveCopy.remoteFolder = "C:\\Log"; 

ag2r.audit = (function () {
	/** private variables */
	/** @type {number} */ var nStep = 0;
	/** @type {string} */ var auditDate;
	/** @type {string} */ var csvFileName;
	/** @type {string} */ var txtFileName;	
	
	/** private functions */
	/**
		* Créer une chaine de carractère contenant la date au format demandé
		* @description
		* @method		dateNow
		* @path ag2r.audit.dateNow
		* @return		{string}
	*/
	var _dateNow = function () {
			var str = "";
			var date = new Date();
			str += date.getFullYear().toString();

			if (date.getMonth() + 1 < 10) {str += "0" + (date.getMonth() + 1).toString();}
			else {str += (date.getMonth() + 1).toString();}

			if (date.getDate() < 10) {str += "0" + date.getDate().toString();}
			else {str += date.getDate().toString();}

			if (date.getHours() < 10) {str += "0" + date.getHours().toString();}
			else {str += date.getHours().toString();}

			if (date.getMinutes() < 10) {str += "0" + date.getMinutes().toString();}
			else {str += date.getMinutes().toString();}

			if(date.getSeconds() < 10) {str += "0" + date.getSeconds().toString();}
			else {str += date.getSeconds().toString();}
			
			return str;
		};

	var self = {
		
		/** public functions */
		/**
		* Déclaration de lancement d'automatisation dans le fichier d'audit
		* @description
		* __Ex.:__
		<code javascript>
		ag2r.audit.startScenario();
		</code>
		* @method startScenario
		* @path ag2r.audit.startScenario
		*/
		startScenario : function() {
			var date = new Date();
			auditDate = _dateNow();
			csvFileName = "C:\\Log\\" + ctx.options.projectName + "_" + auditDate + ".csv";
			txtFileName = "C:\\Log\\" + ctx.options.projectName + "_" + auditDate + ".txt";
			
			var txt = "No.;Etape;Date;Heure de début;Heure de fin;Statut;Commentaire;\n" + nStep.toString() + ".;Début de l'automatisation ...;" +
				date.toLocaleDateString() + ";" + date.toLocaleTimeString();
			
			ctx.wkMng.CtxtWriteFile(csvFileName, '\n' + txt, true);
			ag2r.audit.log("");
			ag2r.audit.log("----------     AUDIT START SCENARIO     ----------");
			ag2r.audit.log("");
		},
		
		/** 
			* @method startStep
		  * @summary Déclaration de lancement d'un step dans le fichier d'audit
			* @param {string} name - Nom du step
		*/
		startStep : function (name){
			var date = new Date();
			nStep ++;
			var txt = nStep.toString() + ".;" + name + ";" + date.toLocaleDateString() + ";" + date.toLocaleTimeString();
			ctx.wkMng.CtxtWriteFile(csvFileName, '\n' + txt , true);
			ag2r.audit.log("");
			ag2r.audit.log("----------     AUDIT START STEP     ----------");
			ag2r.audit.log("               " + name);
			ag2r.audit.log("");
		},
		
		/** 
			* @method endStep
		  * @summary Déclaration de la fin d'exécution d'un step dans le fichier d'audit
			* @param {string} [comment] - Détail sur le déroulement d'un step
		*/
		endStep : function(comment){
			var date = new Date();
			var txt = date.toLocaleTimeString() + ";OK";
			if(comment){txt += ";" + comment;}
			ctx.wkMng.CtxtWriteFile(csvFileName, ';' + txt , true);
			ag2r.audit.log("");
			ag2r.audit.log("----------     AUDIT END STEP     ----------");
			if(comment) {ag2r.audit.log("               " + comment);}
			ag2r.audit.log("");
		},
		
		/** 
			* @method failStep
		  * @summary Déclaration de l'echec lors de l'exécution d'un step dans le fichier d'audit
			* @param {string|Object} [comment] - Raison de l'echec du step
		*/
		failStep: function(comment){
			var date = new Date();
			var txt = date.toLocaleTimeString() + ";KO";
			if(comment) {
				txt += ";";
				if (typeof comment === "string") {txt += comment;}
				else {txt += comment.message;}
			}
			ctx.wkMng.CtxtWriteFile(csvFileName, ';' + txt , true);
			
			ag2r.audit.log("");
			ag2r.audit.log("----------     AUDIT FAIL STEP     ----------");
			if(comment) {
				if (typeof comment === "string") {ag2r.audit.log("               " + comment);}
				else {ag2r.audit.log("               " + comment.message);}
			}
			ag2r.audit.log("");
		},
		
		/** 
			* @method endScenario
		  * @summary Déclaration de fin d'exécution d'un scénario ainsi d'enregistrer les logs en format csv
			* @param {string|Object} [comment] - exception/commentaire rencontré lors de l'exécution d'un scénario
		*/
		endScenario: function(comment){
			var date = new Date();
			var txt = "END;Fin du traitement;" + date.toLocaleDateString() + ";" + date.toLocaleTimeString();
			ctx.wkMng.CtxtWriteFile(csvFileName, '\n' + txt , true);

			ag2r.audit.log("");
			ag2r.audit.log("----------     AUDIT END SCENARIO     ----------");
			if(comment) {
				if (typeof comment === "string") {ag2r.audit.log("               " + comment);}
				else {ag2r.audit.log("               " + comment.message);}
			}
			ag2r.audit.log("");		
		},
		
		/** 
			* @method log
		  * @summary Produit une log contextor et ajoute une log dans le fichier de log au format txt
			* @param {string} txt - exception/commentaire rencontré lors de l'exécution d'un scénario
		*/
		log: function(txt){
		ctx.log(txt);
		var date = new Date();
		ctx.wkMng.CtxtWriteFile(
			txtFileName,
			'\n' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '    ' + txt , true);
		}
		
	};
	return self;
})();