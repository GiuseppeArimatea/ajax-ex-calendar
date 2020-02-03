$(document).ready(function () {
  moment.updateLocale('it', {
      months : [
          "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio",
          "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
      ]
  });
  var gennaio = moment("2018-01-01");
  var giorniGennaio = moment(2018-01).daysInMonth(); // prendiamo i giorni di gennaio

  Mese(giorniGennaio,gennaio) //invochiamo la funzione mese



// Chiamiamo l' API, prendiamo i giorni di festa tramite un for...gli aggiungiamo una classe red e li stampiamo tramite handlebars.
  $.ajax({
    url : "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
    method : "GET",
    success : function (data) {
      for (var i = 0; i < data.response.length; i++) {
        $(".wrapper div").each(function () {
          if ($(this).attr("data") == data.response[i].date) {
            $(this).addClass("red");
            var source = $("#entry-template").html();
            var template = Handlebars.compile(source);
            var context = {
              name : data.response[i].name,
            }
            var html = template(context);
            $(this).append(html)
          };
        })
      }
    },
    erorr : function (richiesta,stato,errore) {
      alert("errore" + errore)
    }
  });
});

// cicliamo il numero dei giorni e tramite handlebars li aggiungiamo al nostro html
function Mese(giorni,mese) {
  for (var i = 0; i < giorni; i++) {
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);
    var context = {
      giorno: parseInt(mese.format("D")) + i,
      mese: mese.format("MMMM"),
      data : mese.format("YYYY"+"-"+"MM") + "-" + addZero((parseInt(mese.format("D")) + i)) ,
    };
    var html = template(context);
    $(".wrapper").append(html);
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
