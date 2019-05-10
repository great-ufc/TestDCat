class CatalogTD {
    constructor(jData) {
        this.matrix = [];
        this.allActions = [];
        this.data = jData.feed.entry;

        this.management = {
            'Identificação' : 'mtd01',
            'Medição'       : 'mtd02',
            'Priorização'   : 'mtd03',
            'Comunicação'   : 'mtd04',
            'Monitoramento' : 'mtd05',
            'Reembolso'     : 'mtd06',
            'Documentação'  : 'mtd07',
            'Prevenção'     : 'mtd08',
        };
        
        this.subtypes = {
            'Baixa Cobertura de Código'         : {id: 'std01', hint: 'Acontece quando o sistema possui uma meta de cobertura e ela não é atingida durante a release.'},
            'Adiamento de Testes'               : {id: 'std02', hint: 'Acontece quando testes são adiados e saem do escopo da release que será testada.'},
            'Ausência de Testes'                : {id: 'std03', hint: ''},
            'Ausência de Testes Automatizados'  : {id: 'std04', hint: ''},
            'Defeitos não Encontrados em Testes': {id: 'std05', hint: ''},
            'Testes muito Custosos'             : {id: 'std06', hint: ''},
            'Erros de Estimativa'               : {id: 'std07', hint: ''},
            'Equipamentos Inadequados'          : {id: 'std08', hint: ''},
            'Alocação Inadequada'               : {id: 'std09', hint: ''},
            'Todos'                             : {id: 'std10', hint: ''}
        };

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