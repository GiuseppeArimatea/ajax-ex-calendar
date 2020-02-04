$(document).ready(function () {


  var questoMese = 0;
  var anno = 2018;
  var baseMese = moment(
    {
      year: anno,
      month: questoMese
    }
  );

  stampaGiorni(baseMese);
  printFestivita(baseMese);
});



// --------------FUNZIONI---------------



function printFestivita(mese) {
  console.log(mese);
  $.ajax(
    {
    url : "https://flynn.boolean.careers/exercises/api/holidays",
    method : "GET",
    data : {
      year: mese.year(),
      month: mese.month()
    },
    success : function (data) {
      console.log(data);
      var feste = data.response;
      for (var i = 0; i < feste.length; i++) {
        var questeFeste = feste[i];
        var questeFesteDate = questeFeste.date;
        $('li[data-complete-date="'+ questeFesteDate +'"]').addClass('red');
        $('li[data-complete-date="'+ questeFesteDate +'"]').find('.festivita').append(questeFeste.name);
      }
    },
    erorr : function (richiesta,stato,errore) {
      alert("errore" + errore)
    }
  });
};


$('.prev').click(function() {
  var questoMese = $('h1').attr('data-this-month');
  var date = moment(questoMese).subtract(1, 'months');
  stampaGiorni(date);
  printFestivita(date);
});


$('.next').click(function() {
  var questoMese = $('h1').attr('data-this-month');
  var date = moment(questoMese).add(1, 'months');
  stampaGiorni(date);
  printFestivita(date);
});




// cicliamo il numero dei giorni e tramite handlebars li aggiungiamo al nostro html
function stampaGiorni(mese) {
  $('h1').text(mese.format('MMMM-YYYY'));
  $('h1').attr('data-this-month',mese.format('YYYY-MM'));
  $('.wrapper').html('');
  var daysInMonth = mese.daysInMonth();
  for (var i = 1 ; i <= daysInMonth; i++) {
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);
    var context = {
      giorno : i,
      mese: mese.format('MMMM'),
      data: mese.format('YYYY-MM') + '-' + addZero(i)
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
