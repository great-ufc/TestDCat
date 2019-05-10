var cardTemplate = '<div class="card" style="margin: 5px 10px;"><div class="card-header" id="heading{{=it.cardID}}"><h2 class="mb-0">';
      cardTemplate += '<button class="btn btn-link collapsed" style="box-shadow: none; color: #064f9e; width: 98%; text-align: left;" type="button" data-toggle="collapse" data-target="#collapse{{=it.cardID}}" aria-expanded="false" aria-controls="collapse{{=it.cardID}}">';
      cardTemplate += '{{=it.cardTitle}}';
      cardTemplate += '</button><i class="fas fa-arrow-circle-down" style="color: #064f9e;font-size: 22px"></i></h2></div>';
      cardTemplate += '<div id="collapse{{=it.cardID}}" class="collapse" aria-labelledby="heading{{=it.cardID}}"><div class="card-body">';
      cardTemplate += '<div class="row" style="padding: 0px 20px;"><p class="text-break">{{=it.sHint}}</p></div>';
      cardTemplate += '{{=it.cardContent}}';
      cardTemplate += '</div></div></div>';

function createCard(id, title, content, hint){
    var cardTmp = doT.template(cardTemplate);
    var result = cardTmp({
      cardID: id,
      sHint: hint,
      cardTitle: title,
      cardContent: content,
    });
    return result;
}