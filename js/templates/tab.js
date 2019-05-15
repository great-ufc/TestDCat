var liTemplate = '<li class="nav-item">';
    liTemplate += '<a class="nav-link" id="{{=it.mtdID}}-tab" data-toggle="tab" href="#{{=it.mtdID}}" role="tab" aria-controls="{{=it.mtdID}}" aria-selected="false">{{=it.mtdName}}</a></li>';

var ulTemplate = '<ul class="nav nav-justified nav-pills" id="myTab" role="tablist">{{=it.content}}</ul>';

var tabDivContent = '<div class="tab-pane fade" id="{{=it.mtdID}}" role="tabpanel" aria-labelledby="{{=it.mtdID}}-tab">';
    tabDivContent += '<div class="accordion" id="accordionCatalog_{{=it.mtdID}}">{{=it.content}}</div></div>';

var tabContent = '<div class="tab-content" id="myTabContent">{{=it.content}}</div>';

function createTab(catalog, element){
    var firstLi = '';
    var lis = '', tabDivs = '';
    var management = catalog.getManagement();
    for(var mtd in management){
        //console.log(mtd, management[mtd]);
        if(firstLi === '') firstLi = '#' + management[mtd] + '-tab';
        /* Creating li elements */
        var liTmp = doT.template(liTemplate);
        lis += liTmp({
            mtdID: management[mtd],
            mtdName: mtd,
        });
        /* Creating cards elements */
        var cards = '';
        for(var std in catalog.getSubtypes()){
            var actions = catalog.findActions(mtd, std);
            if(actions.length > 0){
                var table = createTable(actions);
                var card = createCard(catalog.getCatalogSUID(mtd, std), std, table, catalog.getSubtypeHint(std));
                cards += card;
            }
        }
        /* Creating tab divs elements */
        var tabDivTmp = doT.template(tabDivContent);
        tabDivs += tabDivTmp({
            mtdID: management[mtd],
            mtdName: mtd,
            content: cards,
        });
    }
    /* Creating ul element */
    var ulTmp = doT.template(ulTemplate);
    var ulComponent = ulTmp({ content: lis });

    /* Creating tab content element */
    var tabTmp = doT.template(tabContent);
    var tabComponent = tabTmp({ content: tabDivs });
    
    $(element).html($(ulComponent + tabComponent));
    $(firstLi).click();
    return true;
}