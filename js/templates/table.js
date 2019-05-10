var tableTemplate  = '<div class="table-responsive"><table class="table table-hover">';
    tableTemplate += '<thead><tr class="d-flex"><th scope="col">#</th><th scope="col" class="col-2">What?</th><th scope="col" class="col-2">Why?</th><th scope="col" class="col-1">Where?</th>';
    tableTemplate += '<th scope="col" class="col-3">How?</th><th scope="col" class="col-1">Who?</th><th scope="col" class="col-2">When?</th><th style="flex: 0 0 6.2%;max-width: 6.2%;" scope="col" class="text-center" data-toggle="tooltip" data-placement="top" title="Click on the button to select the action.">Options</th></tr></thead>';
    tableTemplate += '<tbody>{{=it.rows}}</tbody></table></div>';

var rowTemplate  = '<tr class="d-flex"><th scope="row">{{=it.index}}</th>';
    rowTemplate += '<td class="col-2">{{=it.what}}</td>';
    rowTemplate += '<td class="col-2">{{=it.why}}</td>';
    rowTemplate += '<td class="col-1">{{=it.where}}</td>';
    rowTemplate += '<td class="col-3">{{=it.how}}</td>';
    rowTemplate += '<td class="col-1">{{=it.who}}</td>';
    rowTemplate += '<td class="col-2">{{=it.when}}</td>';
    rowTemplate += '<td style="flex: 0 0 6.2%;max-width: 6.2%;" class="text-center"><label class="switch "><input id="{{=it.actionID}}" type="checkbox" class="default"><span class="slider round"></span></label></td></tr>';

function createTable(actions){
    //console.log(actions);
    var rows = '';
    for(var index = 0; index < actions.length; index++){
        var rowTmp = doT.template(rowTemplate);
        var result = rowTmp({
            index: index + 1,
            what: actions[index][1],
            why: actions[index][2],
            where: actions[index][3],
            how: actions[index][4],
            who: actions[index][5],
            when: actions[index][6],
            actionID: actions[index][0],
        });
        rows += result;
    }
    var tableTmp = doT.template(tableTemplate);
    var tResult = tableTmp({
        rows: rows
    });
    return tResult;
}

var tableReportTemplate  = '<div class="table-responsive"><table class="table table-hover">';
    tableReportTemplate += '<thead><tr class="d-flex"><th scope="col" class="text-center">#</th><th scope="col" class="col-1">MTD/STD</th><th scope="col" class="col-2">What?</th><th scope="col" class="col-2">Why?</th><th scope="col" class="col-1">Where?</th>';
    tableReportTemplate += '<th scope="col" class="col-3">How?</th><th scope="col" class="col-1">Who?</th><th scope="col" style="flex: 0 0 14.6%;max-width: 14.6%;">When?</th></tr></thead>';
    tableReportTemplate += '<tbody>{{=it.rows}}</tbody></table></div>';

var rowReportTemplate  = '<tr class="d-flex"><td class="text-center">{{=it.index}}</td>';
    rowReportTemplate += '<td class="col-1">{{=it.mstd}}</td>'
    rowReportTemplate += '<td class="col-2">{{=it.what}}</td>';
    rowReportTemplate += '<td class="col-2">{{=it.why}}</td>';
    rowReportTemplate += '<td class="col-1">{{=it.where}}</td>';
    rowReportTemplate += '<td class="col-3">{{=it.how}}</td>';
    rowReportTemplate += '<td class="col-1">{{=it.who}}</td>';
    rowReportTemplate += '<td style="flex: 0 0 14.6%;max-width: 14.6%;">{{=it.when}}</td></tr>';

function createTableReport(actions){
    //console.log(actions);
    var rows = '';
    for(var index = 0; index < actions.length; index++){
        var rowTmp = doT.template(rowReportTemplate);
        var result = rowTmp({
            index: index + 1,
            what: actions[index][1],
            why: actions[index][2],
            where: actions[index][3],
            how: actions[index][4],
            who: actions[index][5],
            when: actions[index][6],
            actionID: actions[index][0],
            mstd: actions[index][7] + ' / ' + actions[index][8]
        });
        rows += result;
    }
    var tableTmp = doT.template(tableReportTemplate);
    var tResult = tableTmp({
        rows: rows
    });
    return tResult;
}


