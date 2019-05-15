var catalog = null;
var selectedActions = [];

function doData(json) {
    catalog = new CatalogTD(json);
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

$(document).ready(function(){
    //console.log(catalog);
    createTab(catalog, '#dynamicCatalog');

    $('input[type=checkbox]').click( function(){
        if($(this).is(':checked')){
           //console.log(catalog.findAction(this.id));
           selectedActions.push(catalog.findAction(this.id));
        }else{
            //console.log(this.id);
            selectedActions = actionRemove(this.id);
        }
        updateTableReport();
     });
    
     $('i').click(function(){
        $(this).prev().click();
     });
});