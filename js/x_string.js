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
        text = text.replace(/�/g, "a");
        text = text.replace(/�/g, "e");
        text = text.replace(/�/g, "i");
        text = text.replace(/�/g, "o");
        text = text.replace(/�/g, "u");
        text = text.replace(/�/g, "a");
        text = text.replace(/�/g, "e");
        text = text.replace(/�/g, "i");
        text = text.replace(/�/g, "o");
        text = text.replace(/�/g, "u");
        text = text.replace(/'.'/g, "_");
        text = text.replace(/'!'/g, "");
        text = text.replace(/'�'/g, "");
        text = text.replace(/'+'/g, "");
        text = text.replace(/'?'/g, "");
        text = text.replace(/'�'/g, "");
        //text = text.replace(/'('/g, "");
        //text = text.replace(/')'/g, "");
        //text = text.replace(/'['/g, "");
        //text = text.replace(/']'/g, "");
       // text = text.replace(/'{'/g, "");
       // text = text.replace(/'}'/g, "");
       // text = text.replace(/'%'/g, "_");
        text = text.replace(/�/g, "ni");
        text = text.replace(/�/g, "a");
        text = text.replace(/�/g, "e");
        text = text.replace(/�/g, "i");
        text = text.replace(/�/g, "o");
        text = text.replace(/�/g, "u");
        text = text.replace(/�/g, "a");
        text = text.replace(/�/g, "e");
        text = text.replace(/�/g, "i");
        text = text.replace(/�/g, "o");
        text = text.replace(/�/g, "u");
        text = text.replace(/�/g, "a");
        text = text.replace(/�/g, "e");
        text = text.replace(/�/g, "i");
        text = text.replace(/�/g, "o");
        text = text.replace(/�/g, "u");
        text = text.replace(/�/g,"a");
        text = text.replace(/�/g,"e");
        text = text.replace(/�/g,"i");
        text = text.replace(/�/g,"o");
        text = text.replace(/�/g,"u");
        text = text.replace(/�/g,"c");
        text = text.replace(/�/g,"c");
        text = text.replace(/�/g,"a");
        text = text.replace(/�/g,"�");
        text = text.replace(/c/g,"c");
        text = text.replace(/g/g,"g");
        text = text.replace(/G/g,"g");
        text = text.replace(/g/g,"g");
        text = text.replace(/g/g,"g");
        text = text.replace(/g/g,"g");
        text = text.replace(/G/g,"g");

        
        return text;
    }
	
	
	
	