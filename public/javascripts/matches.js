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

//mock teamname
var nba_team = ['Atlanta Hawks',
  'Boston Celtics',
  'Brooklyn Nets',
  'Charlotte Hornets',
  'Chicago Bulls',
  'Cleveland Cavaliers',
  'Dallas Mavericks',
  'Denver Nuggets',
  'Detroit Pistons',
  'Golden State Warriors',
  'Houston Rockets',
  'Indiana Pacers',
  'LA Clippers',
  'Los Angeles Lakers',
  'Memphis Grizzlies',
  'Miami Heat',
  'Milwaukee Bucks',
  'Minnesota Timberwolves',
  'New Orleans Pelicans',
  'New York Knicks',
  'Oklahoma City Thunder',
  'Orlando Magic',
  'Philadelphia 76ers',
  'Phoenix Suns',
  'Portland Trail Blazers',
  'Sacramento Kings',
  'San Antonio Spurs',
  'Toronto Raptors',
  'Utah Jazz',
  'Washington Wizards'

];


var team1,team2;

$(".team_input_one").typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'nba_team',
  source: substringMatcher(nba_team)

}).on("change", function(e) {
// do stuff with current `typeahead` `value`
  team1 = e.target.value; // `$(e.target).typeahead("val")
  console.log(team1)
});

$(".team_input_two").typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'nba_team',
  source: substringMatcher(nba_team)

}).on("change", function(e) {
// do stuff with current `typeahead` `value`
  team2 = e.target.value; // `$(e.target).typeahead("val")
  console.log(team2)
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
        fontSize: 16
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

//mock json file for line chart
var jsonfile = {
  "jsonarray": [{
     "Teamname": "mock",
     "rank": 10,
     "rank2" : 2
  }, {
    "Teamname": "mock",
    "rank": 7,
    "rank2" : 4
  },
  {
    "Teamname": "mock",
    "rank": 8,
    "rank2" : 10
  },
  {
    "Teamname": "mock",
    "rank": 3,
    "rank2" : 1
  },
  {
    "Teamname": "mock",
    "rank": 5,
    "rank2" : 3
  },
]
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
    text: "Ranking Comparion past 5 years",
    fontSize: 16
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
}
  }
  
});

//when click compare
$('#compare_submit').click(function() {
  labels = [team1,team2]
  pie_data1 = jsonfile2.winningarray.map(function(e) {
    return e.teamA
  });;
  pie_data2 =  jsonfile2.winningarray.map(function(e) {
    return e.teamB
  });;
  match_chart.data.datasets[0].data = [pie_data1,pie_data2]
  match_chart.data.labels = labels;
  match_title = team1 + " VS " + team2 + " winning rate";
  match_chart.options.title.text = match_title;
  match_chart.update();

  line1_data = jsonfile.jsonarray.map(function(e) {
    return e.rank;
  });;
  line2_data = jsonfile.jsonarray.map(function(e) {
    return e.rank2;
  });;
  
  compare_line.data.datasets[0].data = line1_data;
  compare_line.data.datasets[1].data = line2_data;
  compare_line.data.datasets[0].label = team1;
  compare_line.data.datasets[1].label = team2;
  compare_line.options.legend.display = true;
  compare_line.update();

});



