var nba_team = [];
$(document).ready(function(){ 
  var names = team_name.split(',');
 
  $.each(names, function(i, el){
      if($.inArray(el, nba_team) === -1) nba_team.push(el);
  });  
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

var team1,team2;

$(".team_input_one").typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'nba_team',
  source: substringMatcher(nba_team)

}).on("typeahead:selected", function(e) {
// do stuff with current `typeahead` `value`
  team1 = e.target.value; // `$(e.target).typeahead("val")
});

$(".team_input_two").typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'nba_team',
  source: substringMatcher(nba_team)

}).on("typeahead:selected", function(e) {
// do stuff with current `typeahead` `value`
  team2 = e.target.value; // `$(e.target).typeahead("val")
});


//Chart
let ctx = document.getElementById('match_chart').getContext('2d');
var ctx2 = document.getElementById('compare_line').getContext('2d');

//mock json file for pie chart
var jsonfile2 = {
  "winningarray": [{
    "teamA": 60,
    "teamB" : 80
  }]
};

var pie_data1 = '';
var pie_data2 = '';

let labels = '';
var match_title = 'Winning Rate';
let colorHex = ['#FB3640', '#EFCA08'];
var config_pie = {
  type: 'doughnut',
  data: {
    datasets: [{
      data: [pie_data1,pie_data2],
      backgroundColor: colorHex,
        }],
    labels: labels,
  },
  options: {
    title: {
        display: true,
        text: match_title,
        fontSize: 18
    },
    responsive: true,
    legend: {
      position: 'bottom'
    },
    plugins: {
      datalabels: {
        color: '#fff',
        anchor: 'end',
        align: 'start',
        offset: -10,
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 25,
        backgroundColor: (context) => {
          return context.dataset.backgroundColor;
        },
        font: {
          weight: 'bold',
          size: '20'
        },
        formatter: (value) => {
          return value + ' %';
        }
      }
    }
  }
};


var line1_data = [];
var line2_data = [];


let match_chart = new Chart(ctx, config_pie);

//current year
var d = new Date();
var n = d.getFullYear();
var year_labels = [n-4,n-3,n-2,n-1,n];

var compare_line = new Chart(ctx2,{
  type: 'line',
  data: {
    labels: year_labels ,
    datasets: [{
        fill:false,
        lineTension: 0,
        data: line1_data,
        backgroundColor: [
           'rgba(252, 126, 9,1)'
        ],
        borderColor: [
          'rgba(252, 126, 9,1)'
        ],
        borderWidth: 0
    },{
      fill:false,
      lineTension: 0,
      data: line2_data,
      backgroundColor: [
        'rgba(185, 159, 8,1)'
    ],
      borderColor: [
        'rgba(185, 159, 8,1)'
    ],
    borderWidth: 0
    }
  ]},
  options: {
    title: {
    display: true,
    text: "Ranking Comparison Past 5 years",
    fontSize: 18
  },
  scales: {
    yAxes: [{
        ticks: {
            beginAtZero: true
        }
    }]
},
legend: {
  display:false,
  position: 'bottom'
}, 
font: {
  weight: '300',
  size: '18'
}
  }
  
});

//when click compare
$('#compare_submit').click(function() {
  labels = [team1,team2]
  // pie_data1 = jsonfile2.winningarray.map(function(e) {
  //   return e.teamA
  // });;
  // pie_data2 =  jsonfile2.winningarray.map(function(e) {
  //   return e.teamB
  // });;
  match_chart.data.datasets[0].data = [pie_data1,pie_data2];

  // match_chart.data.datasets[0].data = compute_winrate();
  match_chart.data.labels = labels;
  match_title = team1 + " VS " + team2 + " winning rate";
  match_chart.options.title.text = match_title;
  match_chart.update();

  var team_1; 
  if(typeof result === 'string'){
    team_1 = JSON.parse(result);     
  } else {
    team_1 = result; 
  }
  var collect_rank1 = {
    team_w1: []
  };  

  for(var i = 0; i < team_1.length; i++){
    var item = team_1[i];
    if(item.team_name == team1){
      collect_rank1.team_w1.push({
        "Teamname": item.team_name,
        "w1": item.w_score
      })     
    }
  }

  var team_2; 
  if(typeof result === 'string'){
    team_2 = JSON.parse(result);     
  } else {
    team_2 = result; 
  }
  var collect_rank2 = {
    team_w2: []
  };  
  for(var i = 0; i < team_2.length; i++){
    var item = team_2[i];
    if(item.team_name == team2){
      collect_rank2.team_w2.push({
        "Teamname": item.team_name,
        "w2": item.w_score
      })     
    }
  }

  match_chart.data.datasets[0].data = compute_winrate(collect_rank1.team_w1, collect_rank2.team_w2);
  match_chart.update();

  var team_data1; 
  if(typeof  result === 'string'){
    team_data1 = JSON.parse(result);     
  } else {
    team_data1 = result; 
  }
  
  var collect1 = {
    team_rank1: []
  };    
  for(var i = 0; i < team_data1.length; i++){
    var item = team_data1[i];
    if(item.team_name == team1){
      collect1.team_rank1.push({
        "Teamname": item.team_name,
        "rank1": item.rank
      })     
    }
  }

  var team_data2; 
  if(typeof  result === 'string'){
    team_data2 = JSON.parse(result);     
  } else {
    team_data2 = result; 
  }
  
  var collect2 = {
    team_rank2: []
  };  

  for(var i = 0; i < team_data2.length; i++){
    var item = team_data2[i];
    if(item.team_name == team2){
      collect2.team_rank2.push({
        "Teamname": item.team_name,
        "rank2": item.rank
      })     
    }
  }

  line1_data = collect1.team_rank1.map(function(e) {    
    return e.rank1;
  });;
  line2_data = collect2.team_rank2.map(function(e) {
    return e.rank2;
  });;
  
  compare_line.data.datasets[0].data = line1_data;
  compare_line.data.datasets[1].data = line2_data;
  compare_line.data.datasets[0].label = team1;
  compare_line.data.datasets[1].label = team2;
  compare_line.options.legend.display = true;
  compare_line.update();

});

// compute winrate e.g. w1: array of w point of team A 
function compute_winrate (win1,win2) {
  var sum1 =0 ,sum2 = 0,percent1 = 0,percent2= 0,percent_diff = 0;
  var t= 0;
  for (var i = 0 ; i < 5; i++) {
    sum1 += win1[i].w1;
    sum2 += win2[i].w2;
  } 

  percent1 = 100*sum1/410;  
  percent2 = 100*sum2/410;  
  percent_diff = percent1-percent2;

  if (percent_diff > 0) {
    pie_data1 = 50 + percent_diff;    
    pie_data2 = 50 - percent_diff;    
  } else {
    percent_diff = percent_diff * (-1);
    pie_data1 = 50 - percent_diff;
    pie_data2 = 50 + percent_diff;
  }

  return [pie_data1.toFixed(2), pie_data2.toFixed(2)];
}


