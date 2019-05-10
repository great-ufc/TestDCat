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

    for(var mtd in catalog.getManagement()){
        for(var std in catalog.getSubtypes()){
            var actions = catalog.findActions(mtd, std);
            if(actions.length > 0){
                var table = createTable(actions);
                var card = createCard(catalog.getCatalogSUID(mtd, std), std, table, catalog.getSubtypeHint(std));
                $('#accordionCatalog_' + catalog.getCatalogMID(mtd)).append($(card));
            }
        }
    }

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