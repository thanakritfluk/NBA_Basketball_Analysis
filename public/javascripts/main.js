$("#conference-button").click(function (e) {
  $(".league-table").addClass("d-none").siblings().removeClass("d-none");
});

$("#league-button").click(function (e) {
  $(".conf-table").addClass("d-none").siblings().removeClass("d-none");  
});

$('#dropdown-click').change(function () {
  $('.dropdown-item').hide()
});

$(".dropdown-item").click(function() {
  $('#dropdown-click').text($(this).text()); // or alert($(this).attr('id'));  
});

// $('.download-button').click(function (el) {
  

//   var json = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
//   // what to return in order to show download window?
//   console.log(json);
//   $(".download-button").attr("width","500");
// });

function exportJson(el) {

  var json = "text/json;charset=utf-8," + encodeURIComponent(file);
  // what to return in order to show download window?
  console.log(json);
  el.setAttribute("href", "data:"+json);
  el.setAttribute("download", "nba_score.json");
  
}



