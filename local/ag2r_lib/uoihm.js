﻿////////////////////////////////////////////////////////////////
////////         Utilitaires Interface Home Machine     ////////
////////                  utilsIHM.js                   ////////
////////                                                ////////
////////                  Sopra  Steria                 ////////
////////               APS - Smart Machine              ////////
////////                                                ////////
////////////////////////////////////////////////////////////////

ag2r.ihm = (function () {
	/** private variables */
	/** @type {Object} */ var _popupInfo;
	/** @type {string} */ var _title = '';
	/** @type {string} */ var _txt = '';
	
	/** private functions */
	var _openPopup = function() {
		_popupInfo.open({
			icon : e.popup.gif.loader4,
			message : "<b>" + _title + "</b><br/><p>" + _txt +"</p>",
			CX : 500,
			CY : 100,
			X : e.popup.position.Right,
			Y : e.popup.position.Bottom
		});
	};

	var self = {
		
		/** public functions */
		/**
			* @method start
		  * @summary Creation d\' une popup informant l\' utilisateur de l\'avancement du traitement
			* @param  {string} title - title of the ihm
			* @param  {string} [txt] - txt of the ihm
		*/
 		start : function(title, txt)	{
			ag2r.audit.log("[ag2r.ihm.start]");
			
			if(_popupInfo){_popupInfo.close();}
			
			_title = (typeof title === 'undefined') ? '' : title;
			_txt = (typeof txt === 'undefined') ? '' : txt;
			
			_popupInfo = ctx.popup('pInfo', e.popup.template.NoButton);
			_openPopup();
		},

		/**
		  * @method update
			* @summary Mise a jour de la une popup informant l\' utilisateur de l\'avancement du traitement
			* @param  {string} title - title of the ihm
			* @param  {string} [txt] - txt of the ihm
		*/
		update : function (title, txt) {
			ag2r.audit.log("ag2r.ihm.update with title/txt" + title + '/' + txt);
			
			_title = (typeof title === 'undefined') ? '' : title;
			_txt = (typeof txt === 'undefined') ? '' : txt;
			
			_popupInfo.close();
			_openPopup();
		},

		/**
			* @method close
		  * @summary Fermeture de la popup 
		*/
	 	close : function() {	
			ag2r.audit.log("ag2r.ihm.close");
			
			if(_popupInfo) { _popupInfo.close(); }
		}
	}
	return self;
})();