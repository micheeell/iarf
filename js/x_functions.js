/******************************************************************************
 *
 *  Funciones globales
 *
 ******************************************************************************/  

    var x_evaluateIntroKey = function(e){
    
        if(e && e.which){ //mozilla
            e = e
            characterCode = e.which 
        }
        else {
            if (typeof event =="undefined")
                return;
            e = event
            characterCode = e.keyCode //IE
        }
     
        if(characterCode == 13)
            return true;
        else
            return false;
    
    }


