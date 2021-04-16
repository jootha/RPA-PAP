/**
 * STEP stSendMail
 * Permet d'envoyer le fichier excel d'output par mail
 * @step
 * @param : ev {event object} - représente notre évenement
 * @param : sc {scenario object} - représente notre objet scénario
 * @param : st {step object} - représente notre objet step
*/
PAP.step({ stSendMail: function(ev, sc, st) {
	ag2r.audit.startStep(sc.name,st.name);
	ag2r.audit.log("[STEP] " + st.name);
	try {
		ctx.outlook.init();

	}catch (ex) {
		ag2r.audit.log("[ERROR] Impossible d'ouvrir l'application Outlook : " + ex.message);
		sc.endScenario();
		return ;
	}
  ctx.outlook.mail.create({
	  To:'adrien.lecomte.ext@ag2rlamondiale.fr',
	  Cc :'adrien.lecomte@cgi.com.com',
	  Subject:'[RPA-PAP] - Rapport recherche de maisons à Lille',
	  Body:'[Message automatique] - En PJ le rapport des appartements sur Lille'
	});
	ctx.outlook.mail.attach(0, sc.data.filetoSend);
	
	try {
	ag2r.audit.log("[INFO] Envoi d'un mail");
// Sends the mail.
    var res = ctx.outlook.mail.send(0);  
  } catch (err) {
		throw new Error("Sending of “Microsoft Outlook” mail in failure (" + err.description + ").");
    return e.error.KO;
  }
  ag2r.audit.log("“Microsoft Outlook” mail sent successfully.")
	
// Ends “Microsoft Outlook” application.
  ctx.outlook.end();
	ag2r.audit.endStep(sc.name,st.name);
	sc.endStep();
	return;
}});