
//nulo 1=Todas , 2=Seleccionar	
var updateComboBox = function(caller, idelement, manager, metodo, nulo) {

    var id_selected = $(caller).val();

    /*if (nulo > 0) {
     nulo = nulo;
     } else {
     nulo = 0;
     }*/

    // Armamos el string de parametros para la llamada AJAX
    var params = 'action=1&modulo=common&submodulo=getcombo&manager=' + manager + '&method=' + metodo + '&idcaller=' + id_selected + '&nulo=' + nulo + '&';


    $("#" + idelement + " option").empty().prop("disabled", true);


    // Hacemos la llamada ajax para actualizar el contenido del combo
    x_doAjaxCall('get', "common.php", params, doUpdateComboBox, idelement, '', true, false);

};

//nulo 1=Todas , 2=Seleccionar
//update combo box con multiples callers serializa los callers y los envia
//el metodo de combo es el encargado de interpretar las claves valor	
var updateComboBoxMixed = function(callers, idelement, manager, metodo, nulo) {

    my_filter = "";

    if (callers.length == 0) {
        return false;

    }

    callers.each(function() {
        mySelf = $(this);
        my_filter += "&" + mySelf.attr("name") + "=" + mySelf.val();
    });
    /*if (!$.isArray(callers) ){
     return false;
     }
     
     for(i = 0; i < callers.length ; i++){
     my_flter = "&" + $(callers[i]).attr("name")+"="+$(callers[i]).val(); 
     } */

    /*if (nulo > 0) {
     nulo = nulo;
     } else {
     nulo = 0;
     }*/

    // Armamos el string de parametros para la llamada AJAX
    var params = 'action=1&modulo=common&submodulo=getcomboMixed&manager=' + manager + '&method=' + metodo + my_filter + '&nulo=' + nulo + '&';


    $("#" + idelement + " option").empty().prop("disabled", true);


    // Hacemos la llamada ajax para actualizar el contenido del combo
    x_doAjaxCall('get', "common.php", params, doUpdateComboBox, idelement, '', true, false);

}

/**
 * Hace lo mismo que el update combobox pero depende de muchos callers
 * @param {type} callers
 * @param {type} idelement
 * @param {type} manager
 * @param {type} metodo
 * @param {type} nulo
 * @returns {undefined}
 */
var updateComboBoxMulti = function(callers, idelement, manager, metodo, nulo) {


    var callers = callers.split(",");
    //console.log("aaa");
    //console.log($("#" + callers[0]).val());


    var i;
    var id_selected = "" + $("#" + callers[0]).val();
    //console.log(callers.length);
    for (i = 1; i < callers.length; i++) {
        id_selected += "," + $("#" + callers[i]).val();
    }
    //var id_selected = $(caller).val();

    /*if (nulo > 0) {
     nulo = nulo;
     } else {
     nulo = 0;
     }*/

    // Armamos el string de parametros para la llamada AJAX
    var params = 'action=1&modulo=common&submodulo=getcombo&manager=' + manager + '&method=' + metodo + '&idcaller=' + id_selected + '&nulo=' + nulo + '&';



    $("#" + idelement + " option").empty().prop("disabled", true);


    // Hacemos la llamada ajax para actualizar el contenido del combo
    x_doAjaxCall('get', "common.php", params, doUpdateComboBox, idelement, '', true, false);

};

/**
 *
 * Finaliza la actualizacion de los ComboBox aplicando los atributos originales en los nuevos recien generados
 *
 */
var doUpdateComboBox = function(data, idelement) {

    $("#" + idelement + " option").empty().prop("disabled", false);

    if (data.result) {
        $("#" + idelement).html(data.html);
        $("#" + idelement).prop("selectedIndex", 0);
    }

	//uniform
	if ( $.uniform ){
    	$.uniform.update("#" + idelement);
	}

}

/**
 *  Deshabilita un determinado grupo de inputs segul el parametro state
 *
 * 	@author Emanuel del Barco <emanueldb@gmail.com>
 *
 */
var x_disableInupts = function(TypeInput) {
    $(':' + TypeInput).prop("disabled", true);
}
/**
 *  Habilita un determinado grupo de inputs segul el parametro state
 *
 * 	@author Emanuel del Barco <emanueldb@gmail.com>
 *
 */
var x_enableInupts = function(TypeInput) {
    $(':' + TypeInput).prop("disabled", false);
}


/**
 *  Crea los elementos de formulario q se encuentran en el documento.
 *  o en un contenedor determinado. Tambien inicializa los editores wysiwyg
 * 	
 *
 */
var x_runJS = function(container) {

    if (typeof container == "undefined") {
        var elements = $(".js_code");
        var x_editors = $(".x_editor");
    } else {
        var elements = $("#" + container + " .js_code");
        var x_editors = $("#" + container + " .x_editor");
    }


    var code = "";
    var parent = ""

    code = ""

    elements.each(function() {
        code += $(this).html().replace(/&amp;/gi, "&");

    }).remove();


    try {
        eval(code);
    } catch (err) {
        alert(code);
        alert(err.message);
    }


    /*for(var i=0; i<elements.length;i++){
     //fix para urls
     code =  elements[i].html().replace(/&amp;/gi, "&");                         
     try{
     eval(code);
     }catch(err){
     alert(code);
     alert(err.message);
     }
     
     //borra el elemento js_code
     parent = elements[i].parentNode;            
     try{
     parent.removeChild( elements[i]);
     }catch(err){
     ;
     }                
     
     }*/

    /*
     if (x_editors && x_editors.length>0){
     
     var textAreas = "[";
     
     for(var j=0; j<x_editors.length;j++){
     if (j == 0){
     textAreas += "'" + $F(x_editors[j].id) +"'";                   
     }else{
     textAreas +=   ", '" + $F(x_editors[j].id) +"'" ;
     }
     
     }
     textAreas += "]";
     
     
     try{        
     eval("xinit_editors("+textAreas+")");
     }catch(err){
     alert(code);
     alert(err.message);
     }
     
     }*/

}

/**
 *  Actualiza los textareas de los editores para q viajen correctamente mediante
 *  una llamada ajax
 * 	
 *
 */
var updateTextAreas = function(idTextArea) {


    if (typeof Xinha != "undefined") {
        var editor = Xinha.getEditor(idTextArea);
        var html = editor.getEditorContent();
        $("#" + idTextArea).val(html);
        return true;
    } else {
        return false;
    }

}

/**
 * Selecciona todos los checks de los listados
 *
 *
 *
 */
var x_CheckAll = function(contentId, chkclass) {

    //$("#"+contentId+" :checkbox."+chkclass).prop("checked",true);
	
    $.uniform.update($("#" + contentId + " :checkbox." + chkclass).prop("checked", true));
}

/**
 * Deselecciona todos los checks de los listados
 *
 *
 *
 */
var x_UncheckAll = function(contentId, chkclass) {

    $.uniform.update($("#" + contentId + " :checkbox." + chkclass).prop("checked", false));
}


var x_CheckUncheckAll = function(contentId, chkclass, check) {


    if (typeof (check) == "undefined") {
        check = $('#checkuncheck');
    } else {
        check = $(check);
    }

    if (check.prop("checked")) {

        x_CheckAll(contentId, chkclass);

        //$.uniform.update("#checkuncheck :checkbox."+chkclass);
        $.uniform.update("#" + contentId + " :checkbox." + chkclass);

    } else {
        x_UncheckAll(contentId, chkclass);
        $.uniform.update("#" + contentId + " :checkbox." + chkclass);
    }
}
