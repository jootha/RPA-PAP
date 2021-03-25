/**
* AG2R Macro de mise en GED Lib
* @class ag2r.macroGed
* @path ag2r.macroGed
*/
ag2r.macroGed = (function () {
	/** variables privées */
	/** @type {string} */ var _dossier64 = 'C:\\Program Files\\MiseEnGED\\MiseEnGed';
	/** @type {string} */ var _dossier86 = 'C:\\Program Files (x86)\\MiseEnGED\\MiseEnGed';
	/** @type {string} */ var _dossierAppli = 'C:\\appli\\MiseEnGED\\MiseEnGed';
	/** @type {string} */ var _executable = 'LaMondiale.GPS.MiseEnGed.exe';
	
	/** fonctions privées */
	/**
  * Construit le morceau de la ligne de commande contenant les fichiers fournis en plus du courrier principal
  * @method      _construireListeFichiers
  * @summary     Construit le morceau de la ligne de commande contenant les fichiers fournis en plus du courrier principal
  * @description
  * @throws      {Error} si fichiers est null
	* @param			 {Array} fichiers Pieces jointes à mettre en GED	
  * @return      {string} Liste des fichiers sous forme de ligne de commande
  */
	var _construireListeFichiers = function (fichiers){
		if (fichiers != null){
			var listeFichiers = '';
			for (var index = 0; index < fichiers.length; index++) {
				listeFichiers = listeFichiers + ' -f=\"' + fichiers[index] + '\"';
			}
			return listeFichiers
		} else {
			// En principe impossible
			throw new Error(e.error.InvalidArgument, '[ag2r.macroGed] Erreur lors de la construction de la liste des fichiers a mettre en GED');
		}
	};
	
	/**
  * Construit le morceau de la ligne de commande contenant les fichiers fournis en plus du courrier principal
  * @method      _construireListeParams
  * @summary     Construit le morceau de la ligne de commande contenant les params supplémentaires
  * @description
  * @throws      {Error} si params est null
	* @param			 {Map} params
  * @return      {string} Liste des params sous forme de ligne de commande
  */
	var _construireListeParams = function (params){
		if (params != null) {
			var listeParams = '-p=\"';
			for (var key in params.keys()) {
				listeParams = listeParams + key + ':' + params.get(key);
			}
			listeParams = listeParams + '\"';
			return listeParams;
		} else {
			// En principe impossible
			throw new Error(e.error.InvalidArgument, '[ag2r.macroGed] Erreur lors de la construction de la liste des params pour la mise en GED');
		}
	};
	
	var self = {
		/** variables publiques */
		/**
		* Canal par lequel le courrier est arrivé
		* @description
		* @enumeration ag2r.macroGed.canal
		* @enum {string}
		* @path ag2r.macroGed.canal
		* @var bureautique Bureautique
		* @var email Email
		* @var courrier Courrier
		* @var fax Fax
		* @readonly
		*/
		canal: {
			bureautique: 'Bureautique',
			email: 'Email',
			courrier: 'Courrier',
			fax: 'Fax'
		},
		
		/** @property {string} nature Nature du courrier */ 
		/**
		* Nature du courrier
		* @description
		* @enumeration ag2r.macroGed.nature
		* @enum {string}
		* @path ag2r.macroGed.nature
		* @var entrant ENTRANT
		* @var sortant SORTANT
		* @readonly
		*/
		nature: {
			entrant: 'Entrant',
			sortant: 'Sortant'
		},
		
		/**
		* Entite vers laquelle effectuer la mise en GED
		* @description
		* @enumeration ag2r.macroGed.entite
		* @enum {string}
		* @path ag2r.macroGed.entite
		* @var arial ARIAL
		* @var aprep APREP
		* @var lmp LMP
		* @var mdpro MDPRO
		* @readonly
		*/
		entite: {
			arial: 'ARIAL',
			aprep: 'APREP',
			lmp: 'LMP',
			mdpro: 'MDPRO'
		},
		
		/**
		* Params que l'on peut passer renseigner directement
		* @description
		* @enumeration ag2r.macroGed.param
		* @enum {string}
		* @path ag2r.macroGed.param
		* @var ged_typeDocument GED_TypeDocument
		* @var ged_numeroContrat GED_NumeroContrat
		* @var ged_nomBeneficiaire GED_NomBeneficiaire
		* @var ged_prenomBeneficiaire GED_PrenomBeneficiaire
		* @var ged_documentTitle GED_DocumentTitle
		* @readonly
		*/
		param: {
			ged_typeDocument: 'GED_TypeDocument',
			ged_numeroContrat: 'GED_NumeroContrat',
			ged_nomBeneficiaire: 'GED_NomBeneficiaire',
			ged_prenomBeneficiaire: 'GED_PrenomBeneficiaire',
			ged_documentTitle: 'GED_DocumentTitle'
		},
		
		/** fonctions publiques */
		/**
		* Méthodes qui va faire appel à la macro de mise en ged
		* @method appelMacro
		* @throws      {Error}
		* @path 	ag2r.macroGed.appelMacro
		* @param 	{ag2r.macroGed.canal} canal Le canal utilisé
		* @param 	{ag2r.macroGed.nature} nature Parameter description
		* @param 	{string} fichier Chemin et nom du fichier à mettre en GED
		* @param 	{Array} [pj] Pieces jointes à mettre en GED
		* @param	{Map} [params]
		* @param 	{ag2r.macroGed.entite} [entite] L\'entite
		* @return {Object} Result
		*/
		appelMacro : function (canal, nature, fichier, pj, params, entite) {
			ctx.notifyAction('ag2r.macroGed.appelMacro');
			// Verification des param obligatoires
			if (canal === null || canal == ''){
				throw new Error(e.error.InvalidArgument, '[ag2r.macroGed.appelMacro] ' + ag2r.errors.error02 + ' canal');
			}
			if (nature === null || nature == ''){
				throw new Error(e.error.InvalidArgument, '[ag2r.macroGed.appelMacro] ' + ag2r.errors.error02 + ' nature');
			}
			if (fichier === null || fichier == ''){
				throw new Error(e.error.InvalidArgument, '[ag2r.macroGed.appelMacro] ' + ag2r.errors.error02+ ' fichier');
			}
			
			// Init command
				var command = '\"' + ag2r.macroGed.getDossierMiseEnGED() + '\\' + _executable +'\" -o=commandline -a=Macro';
				
			// entite
			if (entite !== undefined && entite != null) {
				command = command + ' -e=' + entite;
			}
			
			// canal + nature
			command = command + ' -c=' + canal + ' -n=' + nature;
			
			// fichier
			command = command + ' -f=\"' + fichier + '\"';
			
			ctx.log("[ag2r.macroGed.appelMacro] Command : " + command, e.logIconType.Info);
			
			// pj
			if (pj !== undefined && pj !== null && pj.length >= 1) {
				command = command + _construireListeFichiers(pj);
			}
			
			// params
			if (params !== undefined && params != null && params.length >= 1) {
				command = command + _construireListeParams(params);
			}
						
			try {
				// appel de la macro
				if (ctx.options.isDebug) { 
					ag2r.audit.log("[ag2r.macroGed.appelMacro] Command : " + command, e.logIconType.Info);
				}
				
				return ctx.exec(command);
			} catch (ex) {
				throw new Error(e.error.Fail, '[ag2r.macroGed.appelMacro]' + ag2r.errors.error06);
			}
		},
		
		/**
    * Recupere le dossier d\'installation de la macro de mise en GED.
    * @method      getDossierMiseEnGED
    * @summary     Récupérer le dossier d'installation de la macro de mise en GED
		* @path 	ag2r.macroGed.getDossierMiseEnGED
    * @description
    * @throws      {Error}
    * @return      {string} répertoire d'installation trouvé
    */
		getDossierMiseEnGED : function(){
			ctx.notifyAction('ag2r.macroGed.verifPresenceMacroGED');
			
			try {
				var dossier = '';
				if (ctx.fso.folder.exist(_dossier86)) {
					return _dossier86;
				} else if (ctx.fso.folder.exist(_dossier64)) {
					return _dossier64;
				} else if (ctx.fso.folder.exist(_dossierAppli)) {
					return _dossierAppli;
				}
				
				throw new Error(e.error.NotFound, '[ag2r.macroGed] Impossible de trouver le répertoire d\'installation de la macro de mise en GED');
				
			} catch (ex) {
				throw new Error (e.error.KO, '[ag2r.macroGed] Impossible de trouver le répertoire d\'installation de la macro de mise en GED' + ex);
			}
		}
	}
	return self;
})();
