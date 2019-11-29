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

var d = new Date();
var n = d.getFullYear();
var labels = [n-4,n-3,n-2,n-1,n];
var team_title = jsonfile.jsonarray[0].Teamname;
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
        text: team_title ,
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
var myChart = new Chart(ctx, config);