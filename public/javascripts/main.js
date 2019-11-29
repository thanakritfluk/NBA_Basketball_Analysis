
$('#league-button').click(function(){       
  $('#topten-table').load('topten_league');    
});

$('#conference-button').click(function(){       
  $('#topten-table').load('topten_conference');    
});

$(document).ready(function (){
  $('#dropdown-click').click(function () {
     $('.dropdown-menu').toggle();
  });
  $(document).mousedown(function(){
    $('.dropdown-menu').hide();
  })
});