// JavaScript Document for Ajax Functions


/**
 * 	x_sendForm(Ex sendAndLoad) env�a un formulario por por ajax
 *
 *	Valida primero que todos los requeridos y demas condiciones
 *
 * 	@author Xinergia <www.xinergia.com.ar>
 *	@author Emanuel del Barco <emanueldb@gmail.com>
 *	@version 2.0
 *
 *	@param form string ID del Formulario que se desea serializar y enviar a una url
 *	@param disable_button bool Valor que indica si al enviarse el formulario deben ponerse en disable los botones dle mismo
 *   @param url_script string Parametro opcional que indica la url a la cual se deben enviar los datos. Por defecto envia al action del mismo
 *   @param hide_form bool Indica que el formulario debe ocultarse durante el procesamiento
 *   @param txt_loading string Si el formulario es ocultado durnte su procesamiento se mostrara un txt_loading en su lugar
 *   @param func_js_end string Funcion JS que deber� ejecutarse al finalizar el envio de ajax del formulario
 *   @param params_js string Parametros de la funci�n JS que se ejecutar� al finalizar el env�o del formulario
 */
var x_sendForm = function (form, disable_button, func_js_end, params_js, url_script, hide_form, txt_loading) {

    //TODO: ver de simplificar los parametros usando JSON
    if (x_validateForm(form)) {

        // Si no se reciben parametros se envia un string vac�o. Params son par�metros de que ser�n pasados a la funcion func_completo
        if (typeof params_js == "undefined")
            params_js = "";

        // Si se env�a un script se toma este como destino. en caso contrario se usa el action del form
        if (typeof url_script == "undefined" || url_script == "") {
            url_script = "";
            var url = form.attr("action");
        } else {
            var url = url_script;
        }

        if (typeof disable_button == "undefined" || !disable_button)
            var enable_button = false;
        else {
            enable_button = true;
        }

        /*$(".xinha_textarea").each(function(){
         updateTextAreas(this.id);                
         });*/
        $('textarea.ckeditor').each(function () {
            var $textarea = $(this);
            $textarea.val(CKEDITOR.instances[$textarea.attr('name')].getData());
        });


        // creacion del objeto ajax y llamada a la accion
        x_doAjaxCall("POST", url, x_serializeForm(form), func_js_end, params_js, doError, true, enable_button);

    } else {
        x_alert("Por favor, verifique los campos marcados en rojo");
    }

    return;
}

/**
 * 	Ejecuta una ena llamada mediante AJAX
 *
 *	@author Xinergia <www.xinergia.com.ar>
 *	@author Emanuel del Barco <emanueldb@gmail.com>
 * 	@version 1.0
 *
 *	params method: GET o POST
 * 	url: El archivo php q nos va a responder el ajax
 * 	parametros: Array tipo GET PHP.
 * 	func_completo funcion q se va a ejecutar en el onComplete del ajax
 * 	params_func son los parametros opcioneales q le podemos mandar a  func_completo tienen que estar separados x coma
 * 	ej: 'param1','param2' si es string tiene que tener ''
 * 	func_error funcion de error
 * 	asincrono boolean que indica si se llamara al AJAX de moso Asincrono o Sincrono
 * 	enble_button boolean que indica si hay que habilitar los botones del form
 */
var x_doAjaxCall = function (method, url, params, func_complete, params_func, func_error, async, enable_button) {

    //TODO: Podr�amos hacaer que se pueda recibir mas de una funcion, es decir un arreglo de string de funciones con sus respectivos parametros. Por defecto a la primera se le evnia el retorno del AJAX

    // Por defecto la llamada es asincrona
    if (typeof (async) == "undefined") {
        async = true;
    }


    $.ajax({
        url: url,

        type: method,

        data: params + "&fromajax=1",

        dataType: "json",

        beforeSend: function () {

            if (enable_button) {
                x_disableInupts("button");
            }

        },
        complete: function () {
            if (enable_button) {
                x_enableInupts("button");
            }
        },
        success: function (data) {

            if (typeof (func_complete) === "function") {
                func_complete(data, params_func);
            }

        },
        error: func_error,
        async: async

    });

    return;
}



/**
 *
 *  x_serializeForm Dado un form arma un string con forma de parametro GET de php
 *  Esta funcion actualmente se encuentra prototipada pero se escribe para prever alguna modificacion o sobrecarga futura.
 * 	@author Xinergia <www.xinergia.com.ar>
 *	@author Emanuel del Barco <emanueldb@gmail.com>
 */
var x_serializeForm = function (form) {
    var params = "";
    params = form.serialize();
    return params + "&ms=" + new Date().getTime();
}





/**
 * Recorre todas las variables en cadena y asigna el mesaje corresponidente
 * a cada una. Se utiliza para los Spry
 *
 * 	@author Xinergia <www.xinergia.com.ar>
 *	@author Emanuel del Barco <emanueldb@gmail.com>
 */
var x_assignMsgVars = function (spry_msg) {
    //for ( keyVar in mensajes ) {
    global_vars[spry_msg.field + "_input"].mensajeAjax(spry_msg.msg, '');
    //}
}

/**
 * Llama al metodo validate de todas las variables widgets.
 *
 * 	@author Xinergia <www.xinergia.com.ar>
 *	@author Emanuel del Barco <emanueldb@gmail.com>
 */
var x_validateForm = function (formulario) {

    var retorno = true;
    var input = null;

    for (keyVar in global_vars) {

        input = $("#" + keyVar);

        //if (formulario.elements[keyVar])  {
        if (input && $(formulario).has(input).length > 0) {

            if (!input.prop("disabled")) {

                if (!global_vars[keyVar].validate()) {
                    retorno = false;
                }
            }
        }
    }
    return retorno;
}




/**
 *	Realiza la carga de un modulo solicitado en un div determinado (destination_id)
 *	Se considera un modulo una entidad dividida en tres:
 *		- HTML (presentacion)
 *		- PHP (Logica del modulo)
 *		- JS (JS propio del modulo)
 *
 * 	@author Xinergia <www.xinergia.com.ar>
 */
var x_loadModule = function (module, submodule, params, destination_id, this_controller) {


    // Si no se recibe un controller se utiliza el de la vista que hizo la llamada
    if (typeof this_controller == "undefined") {
        var url = controller + ".php?";
    } else {
        var url = this_controller + ".php?";
    }

    var parametros_new = "modulo=" + module + "&" + "submodulo=" + submodule + "&" + params + "&fromajax=1&";

    $.ajax({
        url: url,
        type: 'GET',

        data: parametros_new,

        success: function (data) {
            // Realizamos la carga del modulo
            x_showModule(data, destination_id);

            if ($.uniform) {
                $("#" + destination_id + " :input:not(.ckeditor)").uniform();
            }


            // Cargamos el Archivo JS correspondinte al modulo						
            x_loadJs("common.php?action=1&helper=filesystem&request=javascript_exist&module=" + module + "&submodule=" + submodule + "&controller=" + controller);
        },
        error: function () {
            x_alert("Error, no se puedo recuperar el modulo solicitado")
        }

    });
}


/**
 *	Realiza la carga de un modulo solicitado en un div determinado (destination_id)
 *	Se considera un modulo una entidad dividida en tres:
 *		- HTML (presentacion)
 *		- PHP (Logica del modulo)
 *		- JS (JS propio del modulo)
 *
 *	Adem�s hace uso de Realy Simple History para poder manejar el Back y Forward del Browser
 *
 * 	@author Xinergia <www.xinergia.com.ar>
 */
var x_goTo = function (module, submodule, params, destination_id, link, this_controller) {



    //bookmarks.sethash(hash,window.location.href,"Main");

    // Creamos ahora un objeto para guardarlo asociado al hash actual
    /*	var oRestore = new Object();
     oRestore.module = module+'';
     oRestore.submodule = submodule+'';
     oRestore.params = params+'';
     oRestore.destination_id = destination_id+'';
     oRestore.this_controller = this_controller+'';
     
     // Agregamos una entrada al history
     dhtmlHistory.add(hash, oRestore);*/




    if ((global_vars instanceof Object) == false || controller == "xadmin") {
        global_vars = {};
    }

    // Si no se recibe un controller se utiliza el de la vista que hizo la llamada
    if (typeof this_controller == "undefined") {
        var url = controller + ".php?";
    } else {
        var url = this_controller + ".php?";
    }

    var parametros_new = "modulo=" + module + "&" + "submodulo=" + submodule + "&" + params + "&fromajax=1&";

    $.ajax({
        url: url,
        type: 'GET',

        data: parametros_new,

        success: function (data) {


            var hash = Base64.encode(module + "|" + submodule + "|" + params + "|" + destination_id);		//var hash = new Date().getTime();

            window.location.hash = hash;

            bookmarks.sethash(window.location.hash,
                    {module: module,
                        submodule: submodule,
                        params: params,
                        destination_id: destination_id
                    }
            );


            // Realizamos la carga del modulo
            x_showModule(data, destination_id);

            resize();

            if ($.uniform) {
                $("#" + destination_id + " :input:not(.ckeditor)").uniform();
            }

            // Cargamos el Archivo JS correspondinte al modulo						
            x_loadJs("common.php?action=1&helper=filesystem&request=javascript_exist&module=" + module + "&submodule=" + submodule + "&controller=" + controller);
        },
        error: function () {
            x_alert("Error, no se puedo recuperar el modulo solicitado")
        }

    });


}

function x_initRestore() {

    var hash = Base64.encode("home");		//var hash = new Date().getTime();

    // Creamos ahora un objeto para guardarlo asociado al hash actual
    var oRestore = new Object();
    oRestore.module = 'home';
    oRestore.submodule = 'bienvenido';
    oRestore.params = '';
    oRestore.destination_id = 'content';
    oRestore.this_controller = 'xadmin';

    // Agregamos una entrada al history
    dhtmlHistory.add(hash, oRestore);
}
/**
 *	Restaura una llamada AJAX lejendo de una entreda a dhtmlHistory
 *
 * 	@author Xinergia <www.xinergia.com.ar>
 */
function x_restoreGoTo(oRestore) {

    //var oRestore = historyStorage.get(hash);
    //alert(oRestore.module);
    if (typeof oRestore != "undefined" && oRestore != null) {
        x_loadModule(oRestore.module, oRestore.submodule, oRestore.params, oRestore.destination_id);
    }
}



/**
 *
 *  x_showModule Funcion que carga por AJAX un Modulo HTML
 *  Nos quedamos en la misma p�gina. No redireccionamos. Solo cambiamos el contenido del id=destino
 *
 * 	@author Xinergia <www.xinergia.com.ar>
 */
var x_showModule = function (html, destino) {
    //TODO: cambiar el nombre a showContentIntoDiv() o similar para darle mas de un uso
    $("#" + destino).html(html);

    if (!(typeof controller == "undefined") && controller == "xadmin") {
        resize();
    }

    return;
}

/**
 * Carga un Js nuevo en la pagina
 *
 * 	@author Xinergia <www.xinergia.com.ar>
 *
 */
var x_loadJs = function (script) {

    $.ajax({
        url: script,
        type: 'GET',
        /*onLoading : function (){ x_showLoading();  x_showLoadingInContext()},
         onSuccess : function (){ x_hideLoading();  x_hideLoadingInContext()},*/
        success: function (my_script) {

            if (my_script != "") {
                $.getScript(my_script);
            }

        }


    });

}



/**
 * Funcion generica
 *
 **/
var doError = function (jqXHR, textStatus, errorThrown) {

    if ($('#x_loading_box_in_context').length > 0) {
        $('#x_loading_box_in_context').hide();
    }

    console.debug(jqXHR);
}


