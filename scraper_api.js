const axios = require('axios');
const cheerio = require('cheerio');
const db = require('./public/javascripts/db');
var url = 'https://sports.yahoo.com/nba/standings/?season=';
var scraper = require('table-scraper');
var current_year = new Date().getFullYear();
var westData = [];
var eastData = [];
var max_year = 6;

function deleteData() {
    const sql = `DELETE FROM standing;`;
    db.query(
        sql,
        (err, res) => {
          console.log(err, res);          
        }
    ).catch(err => console.log(err));
}


function insertData(params){
    const sql = `INSERT INTO standing (
        rank,
        team_name,            
        conference,
        year,
        w_score,
        l_score,
        pct_score,
        cgb_score,
        home_score,        
        div_score,        
        conf_score,        
        l10_score,        
        pf_score,
        pa_score,
        diff_score,
        strk_score)
        VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16);        
    `
    db.query(
        sql, params,
        (err, res) => {
          console.log(err, res);
        //   db.end();
        }
    ).catch(err => console.log(err));
}


async function getStandingData(url, year) {
    var eastHead;
    var westHead;
    var list_east_name = [];
    var list_west_name = [];

    const response = await axios(url)

    const html = response.data;
    const $ = cheerio.load(html);
    const eastTable = $('table:nth-of-type(1) span:nth-of-type(2)');
    const westTable = $('table:nth-of-type(2) span:nth-of-type(2)');

    for (var i = 0; i < eastTable.length; i++) {
        list_east_name.push(eastTable[i].children[1].data);
        if (i == eastTable.length - 1) {
            eastHead = eastTable[i].children[1].data
        }
    }

    for (var i = 0; i < westTable.length; i++) {
        list_west_name.push(westTable[i].children[1].data);
        if (i == westTable.length - 1) {
            westHead = westTable[i].children[1].data
        }
    }

    const tableData = await scraper.get(url)

    for (var i = 0; i < tableData[1].length; i++) {

        var east_data = {
            Team_name: list_east_name[i],
            Conference: 'Eastern',
            Rank: i + 1,            
            W: tableData[1][i][eastHead],
            L: tableData[1][i]['W'],
            Pct: tableData[1][i]['L'],
            CGB: tableData[1][i]['GB'],
            Home: tableData[1][i]['CGB'],
            Div: tableData[1][i]['Home'],
            Conf: tableData[1][i]['Div'],
            Last10: tableData[1][i]['Conf'],
            PF: tableData[1][i]['Last 10'],
            PA: tableData[1][i]['PF'],
            Diff: tableData[1][i]['PA'],
            Streak: tableData[1][i]['Diff'],
            Year: year
        }
        eastData.push(east_data);        

        const params_east = [
            east_data.Rank,            
            east_data.Team_name,
            east_data.Conference,
            east_data.Year,
            east_data.W,
            east_data.L,
            east_data.Pct,
            east_data.CGB,
            east_data.Home,
            east_data.Div,
            east_data.Conf,
            east_data.Last10,
            east_data.PF,
            east_data.PA,
            east_data.Diff,
            east_data.Streak
        ]        

        insertData(params_east);
        

        var west_data = {
            Team_name: list_west_name[i],
            Conference: 'Western',
            Rank: i + 1,
            W: tableData[2][i][westHead],
            L: tableData[2][i]['W'],
            Pct: tableData[2][i]['L'],
            CGB: tableData[2][i]['GB'],
            Home: tableData[2][i]['CGB'],
            Div: tableData[2][i]['Home'],
            Conf: tableData[2][i]['Div'],
            Last10: tableData[2][i]['Conf'],
            PF: tableData[2][i]['Last 10'],
            PA: tableData[2][i]['PF'],
            Diff: tableData[2][i]['PA'],
            Streak: tableData[2][i]['Diff'],
            Year: year
        }
        westData.push(west_data);

        const params_west = [
            west_data.Rank,            
            west_data.Team_name,
            west_data.Conference,
            west_data.Year,
            west_data.W,
            west_data.L,
            west_data.Pct,
            west_data.CGB,
            west_data.Home,
            west_data.Div,
            west_data.Conf,
            west_data.Last10,
            west_data.PF,
            west_data.PA,
            west_data.Diff,
            west_data.Streak
        ]        

        insertData(params_west);   
    }

    return [eastData, westData]
}


async function get_All_Standing() {
    let data = [];
    for (var i = 1; i < max_year; i++) {
        //        console.log(url.concat(current_year));
        //        console.log(await getStandingData(url.concat(current_year), current_year));
        data.push(await getStandingData(url.concat(current_year), current_year));
        westData = [];
        eastData = [];
        url = 'https://sports.yahoo.com/nba/standings/?season=';
        current_year -= 1;
    }

    return data;
}


async function loop_all() {
    deleteData();
    let all_data = await get_All_Standing();    
    // [0] 2019 [0] East side
    var test = all_data[0][0].map(function (e) {            
        return e
    });

    var test1 = all_data[0][1].map(function (e) {
        return e
    })
    
    // test[0] First json {}     
    await getStandingData.insert
    console.log(test);

    console.log(test1);   

}
//console_print();
loop_all();
