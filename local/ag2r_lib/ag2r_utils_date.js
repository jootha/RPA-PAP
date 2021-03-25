////////////////////////////////////////////////////////////////
////////         		Gestion des dates 			    ////////
////////                  date.js                   ////////
////////                                                ////////
////////                  Sopra  Steria                 ////////
////////               APS - Smart Machine              ////////
////////                                                ////////
////////////////////////////////////////////////////////////////

/**
* AG2R Date Lib
* @class ag2r.date
* @path ag2r.date
*/
ag2r.date = (function () {
	var self = {
		// Expression régulière permettant de matcher avec les dates au format 
		DATE_REGEX: /(\d{1,2}).(\d{1,2}).(\d{4})/gm,
		
		/**
		 * Transforme une date du format JJ/MM/AA au format JJ/MM/AAAA
		 * La date peut être dans le passé ou dans le futur
		 * @function
		 * @param {string} dateAA - Date au format JJ/MM/AA format
		 * @param {boolean} estDansLeFutur - Définis si la date en paramètre est une date dans le futur
		 * @return {string} Date au format JJ/MM/AAAA
		**/
		transformerDateAAVersAAAA: function(dateAA, estDansLeFutur) {
			var dateSeparee = dateAA.split('/');
			var anneeCourante = parseInt(new Date().getFullYear().toString().substring(2));
			
			if (estDansLeFutur === undefined) {
				estDansLeFutur = false;
			}

			dateSeparee[2] = dateSeparee[2] % 100;

			if (estDansLeFutur || (dateSeparee[2] <= anneeCourante + 1)) {
				dateSeparee[2] = '20' + dateSeparee[2];
			} else {
				dateSeparee[2] = '19' + dateSeparee[2];
			}
			
			return dateSeparee.join('/');
		},
		/** 
		 * Sépare les différents éléments d'une date et les retourne sous forme d'un objet
		 * @function
		 * @param {string} dateComplete - Date au format JJ/MM/AAAA
		 * @return {object} Objet contenant le jour, le mois et l'année 
		**/
		separerJJMMAAAA: function(dateComplete) {
			var dateSeparee = dateComplete.split('/');
			
			return {
				jour: dateSeparee[0],
				mois: dateSeparee[1],
				annee: dateSeparee[2]
			}
		},
		/**
		 * Transforme une date au format jj(separateur)mm(separateur)aaaa au format souhaité
		 * @function
		 * @param {string|Date} date - La date dont le format est à modifier
		 * @param {string} format - Le format de la date attendue en sortie (doit contenir les éléments jj mm et (aaaa ou aa))
		 * @return {string} - La date formatée
		**/
		transformeDate: function(date, format) {
			var date = (new RegExp(ag2r.date.DATE_REGEX)).exec(date);
			
			if(!date || date.length < 4){
				throw new Error(e.error.InvalidArgument, "Format de date non correct");
			}
			format = format.replace('jj', date[1].length < 2 ? 0 + date[1] : date[1]);
			format = format.replace('mm', date[2].length < 2 ? 0 + date[2] : date[2]);
			
			format = format.replace('aaaa', date[3]);
			format = format.replace('aa', date[3].length === 2 ? date[3] : date[3].substring(2));
			
			return format;
		},
		/**
		 * Calcule le nombre de jours de différence entre 2 dates
		 * @function
		 * @param {string} date1 - Date au format JJ/MM/AAAA
		 * @param {string} date2 - Date au format JJ/MM/AAAA
		 * @return {number} Nombre de jours de différence entre les deux dates en entrée
		**/
		differenceEntre2Dates: function(date1, date2) {
			var msParJour = 1000 * 60 * 60 * 24
			var diffTemps = Math.abs(Date.parse(ag2r.date.transformeDate(date1, 'mm/jj/aaaa')) - Date.parse(ag2r.date.transformeDate(date2, 'mm/jj/aaaa')));
			return Math.abs(Math.ceil(diffTemps / msParJour));
		},
		/**
		 * Transforme un objet date en date au format JJ/MM/AAAA
		 * @function
		 * @param {Date} date - Objet contenant la date
		 * @return {string} Date au format JJ/MM/AAAA
		**/
		transformeObjetDateVersString: function(date) {
			var j = date.getDate().toString();
			var m = (date.getMonth() + 1).toString();
			var a = date.getFullYear();
			
			if (j.length < 2) {
				j = '0' + j;
			}
			if (m.length < 2) {
				m = '0' + m;
			}
			
			return j + '/' + m + '/' + a;
		}
	};
	return self;
})();
