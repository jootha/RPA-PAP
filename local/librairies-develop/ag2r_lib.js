/**
* AG2R Framework
* @class ag2r
* @path ag2r
* @constructor
*/
var ag2r = (function () {
	
	/** version globales du framework ag2r 
	* @const 
	* @ignore
	* @type {string} */ var _coreVersion = "1.2.2";
	
	/** private functions */
	var _func1 = function(param1, param2) {};

	var self = {
		/** public variables */
		/** 
		 * Generic errors available for any projects
		 * @property {Object} 
		 */ 
		errors: {
			error00: "ERR00 Erreur inattendue - Une erreur inattendue a arrêté le processus : ",
			error01: "ERR01 Délai dépassé - Le temps d'attente a été dépassé : ",
			error02: "ERR02 Variable vide - La variable ne contenait pas de valeur",
			error03: "ERR03 Erreur de donnée - La donnée n'a pu être récupérée dans la page",
			error04: "ERR04 Erreur de polling - Impossible d'accéder aux informations de la page demandée",
			error05: "ERR05 Erreur de fichier - Impossible d'accéder au fichier souhaité",
			error06: "ERR06 Erreur d'exécutable - Impossible d'exécuter l'utilitaire externe"
		}
	}
	return self;
})();