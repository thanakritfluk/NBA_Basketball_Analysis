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

// mock JSON file
var jsonfile = {
  "jsonarray": [{
     "Teamname": "mock",
     "rank": 10
  }, {
    "Teamname": "mock",
    "rank": 7
  },
  {
    "Teamname": "mock",
    "rank": 8
  },
  {
    "Teamname": "mock",
    "rank": 3
  },
  {
    "Teamname": "mock",
    "rank": 5
  },
]
};
var val;
$(".teamInput").typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'nba_team',
  source: substringMatcher(nba_team)

}).on("change", function(e) {
// do stuff with current `typeahead` `value`
val = e.target.value; // `$(e.target).typeahead("val")
console.log(val)
});

var d = new Date();
var n = d.getFullYear();
var labels = [n-4,n-3,n-2,n-1,n];
var team_title = '';

// console.log(team_title);
var data = jsonfile.jsonarray.map(function(e) {
  return e.rank;
});;

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
          borderWidth: 0
      }]
  },
  options: {
      title: {
        display: true,
        text: team_title,
        fontSize: 16
      },
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      }
  }
};

var ctx = document.getElementById('myChart').getContext('2d');
var rank_chart = new Chart(ctx, config);

$( "#search_submit" ).click(function() {
  rank_chart.options.title.text = val;
  rank_chart.update();
});