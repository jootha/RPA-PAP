# librairies

Ce repository contient les lib ag2r à intégrer dans les robots développés avec Contextor.

# Utiliser les librairies

1.  Clonez le repository en local
```
$ git clone git@git-prd.server.lan:A0850/Other/librairies.git
```
2.  Copiez les lib dans le dossier local\ag2r_lib
3.  Ouvrez votre projet Contextor et dans l'écran des scripts, copier le code suivant :
```
<!--  Lib AG2R -->
<SCRIPT Name="AG2R Core" Src="ag2r_lib\ag2r_lib.js" Folder="Libraries_AG2R" />
<SCRIPT Name="AG2R SSO" Src="ag2r_lib\ag2r_sso_login.js" Folder="Libraries_AG2R" />
<SCRIPT Name="AG2R Audit" Src="ag2r_lib\ag2r_utils_audit.js" Folder="Libraries_AG2R" />
<SCRIPT Name="AG2R uoihm" Src="ag2r_lib\ag2r_utils_Ihm.js" Folder="Libraries_AG2R" /> 
<SCRIPT Name="AG2R Date" Src="ag2r_lib\ag2r_utils_date.js" Folder="Libraries_AG2R" /> 
<SCRIPT Name="AG2R Clean Log" Src="ag2r_lib\ag2r_cleanlog.js" Folder="Libraries_AG2R" /> 
<SCRIPT Name="AG2R BAM" Src="ag2r_lib\ag2r_bam.js" Folder="Libraries_AG2R" /> 
<SCRIPT Name="AG2R Macro GED" Src="ag2r_lib\ag2r_macro_ged.js" Folder="Libraries_AG2R" /> 
```

# Ajouter/Modifier une librairies

1.  Tirez une nouvelle branche en local
```
$ git checkout -b feature/add-new-library
```
2.  Effectuez vos développements et modifiez le Readme
3.  Commitez le code sur le repository distant
4.  Créez une Merge Request et soumettez la à approbation