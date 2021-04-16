// Desktop Studio
// Auto-generated declaration file : do not modify !



var POPUPS = POPUPS || ctx.addApplication('POPUPS');



var PAP = ctx.addApplication('PAP', {"nature":"WEB3","path":"https://www.pap.fr/"});

PAP.pAccueil = PAP.addPage('pAccueil', {"comment":"IMMOBILIER - Annonces immobilières | De Particulier à Particulier - PAP","path":"https://www.pap.fr/"});
PAP.pAccueil.oFormRecherche = PAP.pAccueil.addItem('oFormRecherche');
PAP.pAccueil.oAchat = PAP.pAccueil.addItem('oAchat');
PAP.pAccueil.iLieu = PAP.pAccueil.addItem('iLieu');
PAP.pAccueil.iTypes = PAP.pAccueil.addItem('iTypes');
PAP.pAccueil.oMaison = PAP.pAccueil.addItem('oMaison');
PAP.pAccueil.iNb_pieces = PAP.pAccueil.addItem('iNb_pieces');
PAP.pAccueil.o3Pieces = PAP.pAccueil.addItem('o3Pieces');
PAP.pAccueil.o4Pieces = PAP.pAccueil.addItem('o4Pieces');
PAP.pAccueil.iNbChambres = PAP.pAccueil.addItem('iNbChambres');
PAP.pAccueil.iSurfaceMin = PAP.pAccueil.addItem('iSurfaceMin');
PAP.pAccueil.iPrixMax = PAP.pAccueil.addItem('iPrixMax');
PAP.pAccueil.btRechercher = PAP.pAccueil.addItem('btRechercher');

PAP.pResultats = PAP.addPage('pResultats', {"comment":"Vente maison Lille (59) 3 ou 4 pièces à partir de 3 chambres jusqu à 300.000 euros à partir de 85 m² | De Particulier à Particulier - PAP","path":"https://www.pap.fr/annonce/vente-maisons-lille-59-g43627-du-3-pieces-au-4-pieces-a-partir-de-3-chambres-jusqu-a-300000-euros-a-partir-de-85-m2"});
PAP.pResultats.oDistance = PAP.pResultats.addItem('oDistance', {"occurs":1});
PAP.pResultats.oprix = PAP.pResultats.addItem('oprix', {"occurs":1});
PAP.pResultats.oPieces = PAP.pResultats.addItem('oPieces', {"occurs":1});
PAP.pResultats.oChambres = PAP.pResultats.addItem('oChambres', {"occurs":1});
PAP.pResultats.oSurface = PAP.pResultats.addItem('oSurface', {"occurs":1});
PAP.pResultats.oAnnonce = PAP.pResultats.addItem('oAnnonce', {"occurs":1});


var EXCEL = ctx.addApplication('EXCEL', {"nature":"UIAUTOMATION","path":"C:\\Program Files (x86)\\Microsoft Office\\Root\\Office16\\EXCEL.EXE"});

EXCEL.pExcelFile = EXCEL.addPage('pExcelFile', {"comment":"Window - resultatsPAP.xlsx - Excel"});
EXCEL.pExcelFile.oLocalite = EXCEL.pExcelFile.addItem('oLocalite');
EXCEL.pExcelFile.oPieces = EXCEL.pExcelFile.addItem('oPieces');
EXCEL.pExcelFile.oChambres = EXCEL.pExcelFile.addItem('oChambres');
EXCEL.pExcelFile.oSurface = EXCEL.pExcelFile.addItem('oSurface');
EXCEL.pExcelFile.oPrix = EXCEL.pExcelFile.addItem('oPrix');

GLOBAL.events.START.on(function(ev) { 
    GLOBAL.createExtendedConnector(e.extendedConnector.UIAutomation, '', '', '');
});
