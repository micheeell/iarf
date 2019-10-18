	//TODO: Anexar todo lo necesario para funciones de cadena
	
	/********************************
	*
	*	Manejo de Strings
	*
	*********************************/
	
	//convierte un string a seo format
	var str2Seo = function(text){
        
        text = trim(text);        
        text = text.toLowerCase();
        text = text.replace(/,/g, "_");
        text = text.replace(/:/g, "_");
        text = text.replace(/-/g,"_");
        text = text.replace(/\s/g, "_");
        text = text.replace(/,/g, "_");
        text = text.replace(/''/g, "");	
        text = text.replace(/\\/g, "");        
        text = text.replace(/;/g, "_");
        text = text.replace(/:/g, "_");
        text = text.replace(/á/g, "a");
        text = text.replace(/é/g, "e");
        text = text.replace(/í/g, "i");
        text = text.replace(/ó/g, "o");
        text = text.replace(/ú/g, "u");
        text = text.replace(/ä/g, "a");
        text = text.replace(/ë/g, "e");
        text = text.replace(/ï/g, "i");
        text = text.replace(/ö/g, "o");
        text = text.replace(/ü/g, "u");
        text = text.replace(/'.'/g, "_");
        text = text.replace(/'!'/g, "");
        text = text.replace(/'¡'/g, "");
        text = text.replace(/'+'/g, "");
        text = text.replace(/'?'/g, "");
        text = text.replace(/'¿'/g, "");
        //text = text.replace(/'('/g, "");
        //text = text.replace(/')'/g, "");
        //text = text.replace(/'['/g, "");
        //text = text.replace(/']'/g, "");
       // text = text.replace(/'{'/g, "");
       // text = text.replace(/'}'/g, "");
       // text = text.replace(/'%'/g, "_");
        text = text.replace(/ñ/g, "ni");
        text = text.replace(/à/g, "a");
        text = text.replace(/è/g, "e");
        text = text.replace(/ì/g, "i");
        text = text.replace(/ò/g, "o");
        text = text.replace(/ù/g, "u");
        text = text.replace(/À/g, "a");
        text = text.replace(/È/g, "e");
        text = text.replace(/Ì/g, "i");
        text = text.replace(/Ò/g, "o");
        text = text.replace(/Ù/g, "u");
        text = text.replace(/â/g, "a");
        text = text.replace(/ê/g, "e");
        text = text.replace(/î/g, "i");
        text = text.replace(/ô/g, "o");
        text = text.replace(/û/g, "u");
        text = text.replace(/Â/g,"a");
        text = text.replace(/Ê/g,"e");
        text = text.replace(/Î/g,"i");
        text = text.replace(/Ô/g,"o");
        text = text.replace(/Û/g,"u");
        text = text.replace(/ç/g,"c");
        text = text.replace(/Ç/g,"c");
        text = text.replace(/ã/g,"a");
        text = text.replace(/õ/g,"õ");
        text = text.replace(/c/g,"c");
        text = text.replace(/g/g,"g");
        text = text.replace(/G/g,"g");
        text = text.replace(/g/g,"g");
        text = text.replace(/g/g,"g");
        text = text.replace(/g/g,"g");
        text = text.replace(/G/g,"g");

        
        return text;
    }
	
	
	
	