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

