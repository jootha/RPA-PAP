﻿/**
 * STEP stLoadData
 * Permet de vérifier l'existence du fichier de données
 * @step
 * @param : ev {event object} - représente notre évenement
 * @param : sc {scenario object} - représente notre objet scénario
 * @param : st {step object} - représente notre objet step
 * @param : excel{excel object} - représent le fichier excel de data
*/
EXCEL.step({ stLoadData: function(ev, sc, st) {

	ag2r.audit.startStep(sc.name, st.name);
	ag2r.audit.log("[STEP] " + st.name);
	ag2r.audit.log('[INFO] Openning Excel : ' +pathFolder+"\\"+ excelFile);
	
	var excel = new ActiveXObject('Excel.Application');
	
	if(!ctx.fso.file.exist(pathFolder+"\\"+ excelFile )) {
		throw new Error(e.error.Fail, 'Fichier '+pathFolder+"\\"+ excelFile +' introuvable');
	}
	excel.Workbooks.Open(pathFolder+"\\"+ excelFile);
	
	//Table contenant les données du formulaire excel 
	var table = [];
	//tableau contenant la légende trouvé dans le formulaire
	var orignialLegende = [];
	//tableau contenant la légende qui doit se trouver dans le formulaire
	var legende = [
		'Localité',
		'Pièces',
		'Chambres',
		'Surface',
		'Prix'
		];
	
	ag2r.audit.log('[INFO] Loading original legende');
	for(var i = 0; i < legende.length; i ++) {
		orignialLegende.push(excel.Cells(1, i + 1).Value);
	}
	
	ag2r.audit.log('[INFO] Loading datas');
	var lineEmpty;
	var i = 0;
	do {
		lineEmpty = true;
		
		table.push({})
		
		//récupère les valeurs du tableau excel et les stoque dans le tableau
		for(var j = 0; j < legende.length; j ++) {
			table[(table.length -1)][legende[j]] = excel.Cells((i + 2), (j + 1)).Value;
			if(table[(table.length -1)][legende[j]] !== undefined) {lineEmpty = false;}
		}
		//Si la dernière ligne lu est vide, on la supprime du tableau et on sort de la boucle
		if(lineEmpty === true) {table.splice(table.length - 1, 1);}
		i ++;
	} while (lineEmpty === false);
	
	excel.Quit();
	
	//On sauvegarde des données dans sc.data
	ag2r.audit.log('[INFO] Save datas');
	sc.data.table = table;
	sc.data.legende = legende;
	sc.data.orignialLegende = orignialLegende;
	
	/**/
	ag2r.audit.log('[INFO] Moving file');
	if(!ctx.fso.folder.exist(pathFolder + '\\Archive')) {
		ctx.fso.folder.create(pathFolder + '\\Archive');
	}
	excel.ActiveWorkbook.SaveAs(pathFolder + '\\Archive\\' + excelFile);
	excel.Quit();
	ctx.sleep(1000);
	ag2r.audit.log('[INFO] Remove old file');
	ctx.fso.file.remove(pathFolder + '\\' + excelFile);
	/**/
	
	ag2r.audit.endStep(sc.name, st.name);
	sc.endStep();
	return;
}});

/**
 * STEP stReadData
 * Permet de lire les données enregistrées depuis le fichier excel
 * @step
 * @param : ev {event object} - représente notre évenement
 * @param : sc {scenario object} - représente notre objet scénario
 * @param : st {step object} - représente notre objet step
*/
EXCEL.step({ stReadData: function(ev, sc, st) {
	ag2r.audit.startStep(sc.name, st.name);
	ag2r.audit.log("[STEP] " + st.name);
	
	ag2r.audit.log('[INFO] Read data')
	//On parcourt le tableau de données et l'affiche dans les log.
	for (var i = 0; i < sc.data.table.length; i++) {		
			for (var j = 0; j < sc.data.legende.length; j++) {
				ag2r.audit.log('sc.data.table['+i+']['+j+']]'+sc.data.table[i][sc.data.legende[j]]);
			}
	}
	ag2r.audit.endStep(sc.name, st.name);
	sc.endStep();
	return;
}});

/*STEP stCreateOutputFile
*
*
*/
EXCEL.step({ stCreateOutputFile: function(ev, sc, st) {
	ag2r.audit.startStep(sc.name,st.name);
	ag2r.audit.log('[STEP] stCreateOutputFile');
	
	ag2r.audit.log('[INFO] Create Excel Sheet');
	var excel = new ActiveXObject('Excel.Application');
	excel.Workbooks.Open(pathFolder + '\\' + "init"+excelFile);
		
	ag2r.audit.log('[INFO] Fill output');
	for (var i = 0; i < sc.data.table.length; i++) {		
			for (var j = 0; j < sc.data.legende.length; j++) {
				excel.Cells((i + 2), (j + 1)).Value = sc.data.table[i][sc.data.legende[j]];
			}
	}
	
	ag2r.audit.log('[INFO] Save Excel output file');
	//créé fichier Output
	if(!ctx.fso.folder.exist(pathFolder + '\\Output')) {ctx.fso.folder.create(pathFolder + '\\Output');}
	excel.ActiveWorkbook.SaveAs(pathFolder + "\\Output\\resultatsPAP" + writeDateTime() + ".xlsx");
	excel.Quit();
	
	ag2r.audit.endStep(sc.name,st.name,'stCreateOutputFile');
	sc.endStep();
	return;
}});

