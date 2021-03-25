// Desktop Studio
// Auto-generated declaration file : do not modify !



var POPUPS = POPUPS || ctx.addApplication('POPUPS');



var PAP = ctx.addApplication('PAP', {"nature":"WEB3","path":"https://www.pap.fr/"});

PAP.pAcceuil = PAP.addPage('pAcceuil', {"comment":"IMMOBILIER - Annonces immobilières | De Particulier à Particulier - PAP","path":"https://www.pap.fr/"});
PAP.pAcceuil.oFormRecherche = PAP.pAcceuil.addItem('oFormRecherche', {"mustExist":true});
PAP.pAcceuil.oAchat = PAP.pAcceuil.addItem('oAchat');
PAP.pAcceuil.iLieu = PAP.pAcceuil.addItem('iLieu');
PAP.pAcceuil.iTypes = PAP.pAcceuil.addItem('iTypes');
PAP.pAcceuil.oMaison = PAP.pAcceuil.addItem('oMaison');
PAP.pAcceuil.iNb_pieces = PAP.pAcceuil.addItem('iNb_pieces');
PAP.pAcceuil.o3Pieces = PAP.pAcceuil.addItem('o3Pieces');
PAP.pAcceuil.o4Pieces = PAP.pAcceuil.addItem('o4Pieces');
PAP.pAcceuil.iSurfaceMin = PAP.pAcceuil.addItem('iSurfaceMin');
PAP.pAcceuil.iPrixMax = PAP.pAcceuil.addItem('iPrixMax');

PAP.pResultats = PAP.addPage('pResultats', {"comment":"Vente maison Lille (59) 3 ou 4 pièces à partir de 3 chambres jusqu à 300.000 euros à partir de 85 m² | De Particulier à Particulier - PAP","path":"https://www.pap.fr/annonce/vente-maisons-lille-59-g43627-du-3-pieces-au-4-pieces-a-partir-de-3-chambres-jusqu-a-300000-euros-a-partir-de-85-m2"});
PAP.pResultats.oDistance = PAP.pResultats.addItem('oDistance', {"occurs":1});
PAP.pResultats.oprix = PAP.pResultats.addItem('oprix', {"occurs":1});
PAP.pResultats.oPieces = PAP.pResultats.addItem('oPieces', {"occurs":1});
PAP.pResultats.oChambres = PAP.pResultats.addItem('oChambres', {"occurs":1});
PAP.pResultats.oSurface = PAP.pResultats.addItem('oSurface', {"occurs":1});
PAP.pResultats.btItemTitle = PAP.pResultats.addItem('btItemTitle', {"occurs":1});
