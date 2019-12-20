# NBA_Basketball_Analysis
## Overview 
 A web application that shows the statistics of the TOP10 Teams also can see the ranking of the basketball team in this league in the past 5 years in a visualization that you easy to understand! Moreover, the comparison between the 2 teams competing together is provided too you can easily see the percentage of their winning rate!

## Team member
__Software and Knowledge Engineering, Kasetsart University__

| Full name        | ID           |
| ------------- |:-------------:|
| Thanakrit Darueang| 6010545773 |
| Pichaaun Popukdee | 6010545862  |
| Supaluk Jareonsuk | 6010545835 |


## Dependencies


+ [nodejs](https://nodejs.org/en/download/) latest version
+ [postgres sql](https://nodejs.org/en/download/) version 10.1 or lastest

## For Window setup

<!-- ``` -->
+ Make sure your have add the path to postgres and run pgAdmin server before setup database
<!-- ``` -->

## Set up database on window

```
npm install
```

```
psql -U postgres -f ./scripts/db/setup_user.sql
```
```
psql -U postgres -f ./scripts/db/create_db.sql
```

```
psql -U postgres nba < ./scripts/db/setup_table.sql
```

```
node scraper_api.js
```



## Set up database on mac

Run this command on terminal
```
./scripts/setup_local_db.sh
```
*if permission denied, you should run chmod before set up
```
 chmod +x ./scripts/setup_local_db.sh
 ./scripts/setup_local_db.sh
```


## Run server
```
nodemon server.js
```
Open with <http://localhost:3000/>


## API for data sharing
 <http://localhost:3000/dashboard/score_data>


