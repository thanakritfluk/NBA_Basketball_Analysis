const axios = require('axios');
const cheerio = require('cheerio');
var url = 'https://sports.yahoo.com/nba/standings/?season=';
var scraper = require('table-scraper');
var current_year = new Date().getFullYear();
var westData = [];
var eastData = [];
var max_year = 6;

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
        if (i == eastTable.length - 1) {
            westHead = westTable[i].children[1].data
        }
    }

    const tableData = await scraper.get(url)

    for (var i = 0; i < tableData[1].length; i++) {

        var east_data = {
            Team_name: list_east_name[i],
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
        //        console.log(eastData)

        var west_data = {
            Team_name: list_west_name[i],
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
        //        console.log(westData);

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
    let all_data = await get_All_Standing();
    // [0] 2019 [0] East side
    var test = all_data[0][0].map(function (e) {
        return e
    });
    // test[0] First json {} 
    console.log(test[0]);

}
//console_print();
loop_all();
