var catalog = null;
var selectedActions = [];

function processSpreadSheetData(json, stdData, lang) {
    catalog = new CatalogTD(json, stdData, lang);
}

function actionRemove(actionID) {
    return selectedActions.filter(function(action){
        return action[0] != actionID;
    });
 }

 function updateTableReport(){
     if(selectedActions.length > 0){
        $('#report').html($(createTableReport(selectedActions)));
        $('#rdiv').fadeIn();
     }else{
        $('#rdiv').fadeOut();
     }
 }

 function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName, i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
}

function printHandler(){
    if($('#rdiv:visible').length == 0){
        $('#printModal').modal('show');
    }else{
        window.print();
    }
}

var lang = 'en-US';

function getLangFromURL(){
    lang = getUrlParameter('lang');
    if(typeof lang === 'undefined'){
        lang = 'en-US';
    }else if(lang.toLowerCase().trim() == 'pt-br' || lang.toLowerCase().trim() == 'ptbr'){
        lang = 'pt-BR';
    }else if(lang.toLowerCase().trim() == 'en-us' || lang.toLowerCase().trim() == 'enus'){

    }else{
        lang = 'en-US';
    }
}

function changeLanguage(){
    if(lang == 'en-US'){
        lang = 'pt-BR';
        $('#flagBTN').attr('src', 'img/united-states.svg');
    }else if(lang == 'pt-BR'){
        lang = 'en-US';
        $('#flagBTN').attr('src', 'img/brazil.svg');
    }else{
        lang = 'en-US';
        $('#flagBTN').attr('src', 'img/brazil.svg');
    }
    loadCatalog();
}

function loadCatalog(){
    /* Two requests: get catalog considering the language and get subtypes information */
    $.get(getDataSource(lang), function(catalogData) {
        $.get(getSubtypesSheetURL(), function(stdData) {
            processSpreadSheetData(catalogData, stdData, lang);
            createTab(catalog, '#dynamicCatalog');

            /* Binding checkbox events to put selected actions in a new table */
            $('input[type=checkbox]').click( function(){
                if($(this).is(':checked')){
                   selectedActions.push(catalog.findAction(this.id));
                }else{
                    selectedActions = actionRemove(this.id);
                }
                updateTableReport();
             });
            
             /* By clicking in the icon the accordion will open */
            $('i').click(function(){
               $(this).prev().click();
            });
        });
    });
}

$(document).ready(function(){
    $.ajaxSetup({
        beforeSend: function() {
            $('#loader').show();
        },
        complete: function() {
            $('#loader').hide();
        }
    });

    getLangFromURL();
    loadCatalog();

    $(document).bind("keyup keydown", function(e){
        if(e.ctrlKey && e.keyCode == 80){
            printHandler();
            return false;
        }
    });
});