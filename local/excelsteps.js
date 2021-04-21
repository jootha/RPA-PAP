﻿﻿/**
 * STEP stCreateOutputFile
 * Permet de créer le fichier de sortie
 * @step
 * @param : ev {event object} - représente notre évenement
 * @param : sc {scenario object} - représente notre objet scénario
 * @param : st {step object} - représente notre objet step
*/
EXCEL.step({ stCreateOutputFile: function(ev, sc, st) {
	ag2r.audit.startStep(sc.name,st.name);
	ag2r.audit.log('[STEP] stCreateOutputFile');
	ag2r.audit.log('[INFO] Create Excel Sheet');

 	ctx.excel.initialize();

	if(!ctx.fso.file.exist(pathFolder + '\\' + "init"+excelFile )) {//Si le fichier template n'existes pas
		throw new Error(e.error.Fail, 'Fichier '+pathFolder + '\\' + "init"+excelFile +' introuvable');
	}
	try {
	ctx.excel.file.open(pathFolder + '\\' + "init"+excelFile);
	}catch (ex) {
		ctx.excel.file.open(pathFolder + '\\' + "init"+excelFile);
		sc.endScenario();
		return ;
	}
	
	ag2r.audit.log('[INFO] Fill output');
	for (var i = 0; i < sc.data.annonces.length; i++) {		
		var j = 0
			ctx.excel.sheet.setCell((i + 2), ++j,sc.data.annonces[i].getDistance());
			ctx.excel.sheet.setCell((i + 2), ++j,sc.data.annonces[i].getPieces());
			ctx.excel.sheet.setCell((i + 2), ++j,sc.data.annonces[i].getChambres());
			ctx.excel.sheet.setCell((i + 2), ++j,sc.data.annonces[i].getSurface());
			ctx.excel.sheet.setCell((i + 2), ++j,sc.data.annonces[i].getPrix()+" €");
			ctx.excel.sheet.setCell((i + 2), ++j,sc.data.annonces[i].getHref());
		
		if(sc.data.annonces[i].getDistance()<20 &&
			 	sc.data.annonces[i].getSurface()>=100 &&
			 	sc.data.annonces[i].getPrix()<250.000){
			 	ag2r.audit.log("[Info] Maison interressante trouvé");
				sc.data.annonces[i].log()
				var k = 0
				//applique la couleur 6 = jaune aux cellules
				ctx.excel.sheet.setCellColor((i + 2), ++k, 6);
				ctx.excel.sheet.setCellColor((i + 2), ++k, 6);
				ctx.excel.sheet.setCellColor((i + 2), ++k, 6);
				ctx.excel.sheet.setCellColor((i + 2), ++k, 6);
				ctx.excel.sheet.setCellColor((i + 2), ++k, 6);
				ctx.excel.sheet.setCellColor((i + 2), ++k, 6);
		}
	}
	
	ag2r.audit.log('[INFO] Save Excel output file');
	//créé fichier Output
	if(!ctx.fso.folder.exist(pathFolder + '\\Output')) {ctx.fso.folder.create(pathFolder + '\\Output');}
	
	sc.data.filetoSend = pathFolder + '\\Output\\resultatsPAP'+ writeDateTime() + '.xlsx';
	try{
		ctx.excel.file.saveAs(sc.data.filetoSend);
	}catch (ex) {
		throw new Error(e.error.Fail, 'Erreur sauvegarde de '+"C:\\Temp\\myExcelFileSavedAs.xlsx");
		sc.endScenario();
		return ;
	}
	
	ag2r.audit.log('[INFO] Close Excel File');
	ctx.excel.file.close(false);
	ctx.excel.end();
	
	ag2r.audit.endStep(sc.name,st.name,'stCreateOutputFile');
	sc.endStep();
	return;
}});