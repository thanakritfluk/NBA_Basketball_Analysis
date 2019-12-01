

var val;
var rank_chart;

$(document).ready(function(){    

  var names = team_name.split(',');     
  var nba_team = [];
  $.each(names, function(i, el){
      if($.inArray(el, nba_team) === -1) nba_team.push(el);
  });

  $(".teamInput").typeahead({
    hint: true,
    highlight: true,
    minLength: 1
  },
  {
    name: 'nba_team',
    source: substringMatcher(nba_team)

  }).on("typeahead:selected", function(e) {
  // do stuff with current `typeahead` `value`
  val = e.target.value; // `$(e.target).typeahead("val")
  });

  var d = new Date();
  var n = d.getFullYear();
  var labels = [n-4,n-3,n-2,n-1,n];
  var team_title = '';

  var data = '';

  var config = {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            fill:false,
            lineTension: 0,
            label: 'Ranking',
            data: data,
            backgroundColor: [
              'rgba(252, 126, 9,1)'
            ],
            borderColor: [
              'rgba(252, 126, 9,1)'
            ],
            pointBorderWidth: 12,
        }]
    },
    options: {
        title: {
          display: true,
          text: team_title,
          fontSize: 26
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    fontSize: 16,
                    suggestedMax: 16
                }
            }],
            xAxes: [{
              ticks: {
                fontSize: 16
              }
            }]
        },
        legend: {
          labels: {
              // This more specific font property overrides the global property
              fontColor: 'grey',
              fontSize: 16
          }
      },
      plugins: {
        datalabels: {
          color: 'white',
          font: {
            weight: 'bold',
            size: 16,
          }
        }
      }
          
          
  }};

  var ctx = document.getElementById('rank_chart').getContext('2d');
  rank_chart = new Chart(ctx, config);
  
});



$( "#search_submit" ).click(function() { 
  var team_data; 
  if(typeof  result === 'string'){
    team_data = JSON.parse(result);     
  } else {
    team_data = result; 
  }
  var collect = {
    team_rank: []
  };  
  for(var i = 0; i < team_data.length; i++){
    var item = team_data[i];
    if(item.team_name == val){
      collect.team_rank.push({
        "Teamname": item.team_name,
        "rank": item.rank
      })     
    }
  }

  rank_chart.options.title.text = val;
  data = collect.team_rank.map(function(e) {
    return e.rank;
  });;
  rank_chart.data.datasets[0].data = data;
  rank_chart.update();
});

var substringMatcher = function (strs) {
  return function findMatches(q, cb) {
      var matches, substringRegex;

      // an array that will be populated with substring matches
      matches = [];

      // regex used to determine if a string contains the substring q
      substrRegex = new RegExp(q, 'i');

      // iterate through the pool of strings and for any string that
      // contains the substring `q`, add it to the matches array
      $.each(strs, function (i, str) {
          if (substrRegex.test(str)) {
              matches.push(str);
          }
      });

      cb(matches);
  };
};

