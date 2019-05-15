class CatalogTD {
    constructor(catData, stdData, lang) {
        this.lang = lang;

        this.matrix = [];
        this.allActions = [];
        this.data = catData.feed.entry;

        this.management = {};
        this.subtypes = {};

        /* Getting management types from spreadsheet data */
        var count = 1;
        var distinctMTD = [];
        var firstColumn = this.data.filter(element => (element["gs$cell"]["col"] == 1 && element["gs$cell"]["row"] != 1));
        for(var key in firstColumn){
            var mtd = firstColumn[key]["gs$cell"]["$t"];
            if (distinctMTD.indexOf(mtd) == -1){
                this.management[mtd] = 'mtd' + (count++);
                distinctMTD.push(mtd);
            }
        } 

        /* Getting subtypes from spreadsheet data */
        var colSTDLang = stdData.feed.entry.find(element => element["gs$cell"]["$t"] == lang)["gs$cell"]["col"];
        var stdsTmp = stdData.feed.entry.filter(element => element["gs$cell"]["col"] == colSTDLang && element["gs$cell"]["row"] != 1);
        var stdsHintsTmp = stdData.feed.entry.filter(element => element["gs$cell"]["col"] == (parseInt(colSTDLang) + 1) && element["gs$cell"]["row"] != 1);
        for(var i = 0; i < stdsTmp.length; i++){
            var std = stdsTmp[i]["gs$cell"]["$t"];
            var hint = stdsHintsTmp[i]["gs$cell"]["$t"];
            this.subtypes[std] = { id: 'std' + (i + 1), hint: hint};
        }
    
        /* Creating matrix to store actions */
        for(var m in this.management){
            for(var s in this.subtypes){
                this.matrix.push({
                    id: this.management[m] + '_' + this.subtypes[s].id,
                    actions: []
                });
            }
        }

        /* Processing json data */
        var table = [];
        var lines = this.data[this.data.length - 1]["gs$cell"]["row"] - 1;
        var columns = this.data[this.data.length - 1]["gs$cell"]["col"];

        for(var l = 0; l < lines; l++){
            for(var c = 0; c < columns; c++){
                table[l] = [];
            }   
        }
            
        for(var index = 0; index < this.data.length; index++){
            var sData = {
                row:    this.data[index]["gs$cell"]["row"], 
                col:    this.data[index]["gs$cell"]["col"], 
                value:  this.data[index]["gs$cell"]["$t"]
            };
            if(sData.row == 1) continue;
            table[sData.row - 2][sData.col - 1] = sData.value;
        }

        for(var l = 0; l < lines; l++){
            var action = [];
            for(c = 2; c < columns; c++){
                action.push(table[l][c])
            }
            var mtdID = this.management[table[l][0]];
            var stdID = this.subtypes[table[l][1]].id;
            this.matrix.find(element => element.id == mtdID + "_" + stdID).actions.push(action);
            
            var cAction = action.slice();
            cAction.push(table[l][0]);
            cAction.push(table[l][1]);
            this.allActions.push(cAction);
        }

        //console.log(table);
    };

    findActions(mtd, std){
        var mtdID = this.management[mtd];
        var stdID = this.subtypes[std].id;

        let found = this.matrix.find(element => element.id == mtdID + "_" + stdID);
        return  typeof found !== "undefined" ? found.actions : null;
    };

    findAction(actionID){
        return this.allActions.find(element => element[0] == actionID);
    };

          getData() { return this.data };
        getMatrix() { return this.matrix };
    getManagement() { return this.management };
      getSubtypes() { return this.subtypes };   

    getCatalogMID(prop){ return this.management[prop] };
    getCatalogSID(prop){ return this.subtypes[prop].id };
    getSubtypeHint(std){ return this.subtypes[std].hint };
    getCatalogSUID(mtd, std){ return this.management[mtd] + '_' + this.subtypes[std].id };
};

function getDataSource(lang){
    if(lang === 'pt-BR'){
        return "https://spreadsheets.google.com/feeds/cells/1riiMiV0HPUPQ1Xe8FLAz0fkAlKglZJnh2bj0E7DyDZ8/3/public/values?alt=json";
    }

    return "https://spreadsheets.google.com/feeds/cells/1riiMiV0HPUPQ1Xe8FLAz0fkAlKglZJnh2bj0E7DyDZ8/2/public/values?alt=json";
}

function getSubtypesSheetURL(){
    return "https://spreadsheets.google.com/feeds/cells/1riiMiV0HPUPQ1Xe8FLAz0fkAlKglZJnh2bj0E7DyDZ8/4/public/values?alt=json";
}