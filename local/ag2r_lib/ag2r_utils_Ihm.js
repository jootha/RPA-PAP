////////////////////////////////////////////////////////////////
////////         Utilitaires Interface Home Machine     ////////
////////                  utilsIHM.js                   ////////
////////                                                ////////
////////                  Sopra  Steria                 ////////
////////               APS - Smart Machine              ////////
////////                                                ////////
////////////////////////////////////////////////////////////////

﻿/**
* AG2R Librairie de la Popup d\'avancement
* @class ag2r.ihm
* @path ag2r.ihm
*/

ag2r.ihm = (function () {
	/** variables privées */
	/** @type {Object} */ 	var _popupInfo;
	/** @type {Object} */ 	var _popupFormatDetail = {
		html: 'ag2r_lib\\ihm\\popupFormatDetail.html',
		cy: 230
	};
	/** @type {Object} */ 	var _popup = {
		html: 'ag2r_lib\\ihm\\popup.html',
		cy: 178
	};
	
	/**
	* @constructor
	*/
	var self = {
		/** fonctions publiques */
		/**
		* @method start
		* @summary Creation d'une popup informant l'utilisateur de l'avancement du traitement
		* @path 	ag2r.ihm.start
		* @param  {boolean} formatDetail - La fenêtre est en grand format pour permettre d'afficher des détails supplémentaires
		*/
 		start: function(formatDetail)	{
			ctx.notifyAction('ag2r.ihm.start');
			
			if(_popupInfo){
				_popupInfo.close();
			}
			
			var popupFormat = formatDetail ? _popupFormatDetail : _popup;
						
			_popupInfo = ctx.popup('pInfo').open( {
				template: e.popup.template.None,
				title: 'pInfo',
				CX: 512,
				CY: popupFormat.cy,
				X: e.popup.position.Right,
				Y: e.popup.position.Bottom,
				url: popupFormat.html,
				icon: e.popup.icon32.info,
				topMost: true,
				titleVisible: false,
				resizable: false,
				canMove: true,
				canClose: false,
				IEHost: true
			});
			
			GLOBAL._pInfo.events.LOAD.on(function(ev) {
				try {
					_popupInfo.execScript('setName', ctx.options.projectName);
				} catch (ex) {
					ag2r.audit.log('[ERROR] IHM Update Fail : ' + ex.message, e.logIconType.Error);
				}
			});
		},

		/**
		* @method update
		* @summary Mise à jour de la popup informant l'utilisateur de l'avancement du traitement
		* @path 	ag2r.ihm.update
		* @throws {Error} si titre et progression null
		* @param  {string} titre - titre de l'IHM
		* @param  {number} progression - Pourcentage de progression
		*/
		update: function (titre, progression) {
			ctx.notifyAction('ag2r.ihm.update');
			
			if (titre !== null && progression !== null){
				try {
					_popupInfo.execScript('updateMainStatut', titre, progression);
				} catch (ex) {
					ag2r.audit.log('[ERROR] IHM Update Fail : ' + ex.message, e.logIconType.Error);
				}
			} else {
				throw new Error(e.error.InvalidArgument, ag2r.errors.error02);
			}
		},
		
		/**
		* @method updateDetail
		* @summary Mise à jour de la popup informant l'utilisateur de l'avancement des détails du traitement
		* @path 	ag2r.ihm.updateDetail
		* @throws {Error} si sousTitre et progression null
		* @param  {string} sousTitre - sous titre de l'étape dans l'IHM
		* @param  {number} progression - Percent of progression
		*/
		updateDetail: function (sousTitre, progression) {
			ctx.notifyAction('ag2r.ihm.updateDetail');
			
			if (sousTitre !== null && progression !== null){
				try {
					_popupInfo.execScript('updateStatut', sousTitre, progression);
				} catch (ex) {
					ag2r.audit.log('[ERROR] IHM Update Fail : ' + ex.message, e.logIconType.Error);
				}
			} else {
				throw new Error(e.error.InvalidArgument, ag2r.errors.error02);
			}
		},
		
		/**
		* @method setError
		* @summary Mise à jour de la popup informant l'utilisateur d'une erreur dans le traitement
		* @path 	ag2r.ihm.setError
		* @throws {Error} si titre null		
		* @param  {string} titre - titre de l'IHM
		*/
		setError: function (titre) {
			ctx.notifyAction('ag2r.ihm.setError');
			
			if (titre !== null) {
				try {
					_popupInfo.execScript('setProgressError', titre);
				} catch (ex) {
					ag2r.audit.log('[ERROR] IHM Update Fail: ' + ex.message, e.logIconType.Error);
				}
			} else {
				throw new Error(e.error.InvalidArgument, ag2r.errors.error02);
			}
		},
		
				/**
		* @method setSuccess
		* @summary Mise à jour de la popup informant l'utilisateur d'un succès dans le traitement
		* @path 	ag2r.ihm.setSuccess
		*/
		setSuccess: function () {
			ctx.notifyAction('ag2r.ihm.setSuccess');
			
			try {
				_popupInfo.execScript('setProgessSuccess', 'arg');
			} catch (ex) {
				ag2r.audit.log('[ERROR] IHM Update Fail: ' + ex.message, e.logIconType.Error);
			}
		},

		/**
		* @method setWarning
		* @summary Mise à jour de la popup informant l'utilisateur d'un message d'avertissement
		* @path 	ag2r.ihm.setWarning			
		*/
		setWarning: function () {
			ctx.notifyAction('ag2r.ihm.setWarning');
			
			try {
				_popupInfo.execScript('setProgressWarning', 'arg');
			} catch (ex) {
				ag2r.audit.log('[ERROR] IHM Update Fail: ' + ex.message, e.logIconType.Error);
			}
		},

		/**
		* @method unsetWarning
		* @summary Mise à jour de la popup informant l'utilisateur : suppression du message d'avertissement
		* @path 	ag2r.ihm.unsetWarning		
		*/
		unsetWarning: function () {
			ctx.notifyAction('ag2r.ihm.unsetWarning');
			try {
				_popupInfo.execScript('unsetProgressWarning', 'arg');
			} catch (ex) {
				ag2r.audit.log('[ERROR] IHM Update Fail: ' + ex.message, e.logIconType.Error);
			}
		},

		/**
		* @method close
		* @summary Fermeture de la popup 
		* @path 	ag2r.ihm.close
		*/
	 	close: function() {	
			ctx.notifyAction('ag2r.ihm.close');
			
			if(_popupInfo) {
				_popupInfo.close(); 
			}
		}
	}
	return self;
})();