$(document).ready(function () {
  moment.updateLocale('it', {
      months : [
          "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio",
          "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
      ]
  });

  var questoMese = 0;
  var anno = 2018;
  var baseMese = moment(
    {
      year: anno,
      month: questoMese
    }
  );

  numeroGiorni(baseMese);
  printFestivita(baseMese);
});



// --------------FUNZIONI---------------



function printFestivita(mese) {
  $.ajax(
    {
    url : "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
    method : "GET",
    data : {
      year: mese.year(),
      mese: mese.month()
    },
    success : function (data) {
      var feste = data.response;
      for (var i = 0; i < feste.length; i++) {
        var questeFeste = feste[i];
        var questeFesteDate = questeFeste.date;
        $('li[data="'+ questeFesteDate +'"]').addClass('red');
        $('li[data="'+ questeFesteDate +'"]').find('.festivita').append(questeFeste.name);
      }
    },
    erorr : function (richiesta,stato,errore) {
      alert("errore" + errore)
    }
  });
};





// $('.prev').click(function() {
//   var questoMese = $('h1').attr('data-this-month', );
//   var date = moment(questoMese).subtract(1, 'months');
// });
//
// $('.next').click(function() {
//   var questoMese = $('h1').attr('data-this-month');
//   var date = moment(questoMese).add(1, 'months');
// });
//
//



// cicliamo il numero dei giorni e tramite handlebars li aggiungiamo al nostro html
function numeroGiorni(moth) {
  for (var i = 1 ; i < 31; i++) {
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);
    var context = {
      giorno : i,
      mese: month.format('MMMM'),
      dataCompleta: month.format('YYYY-MM') + '-' + addZero(i)
    };
    var html = template(context);
    $('.wrapper').append(html);
  }
}




// aggiungo zero
function addZero(num) {
  if (num < 10) {
    return "0" + num
  }
  else {
    return num
  }
}
