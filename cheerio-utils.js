/**
 * Created by alon.cohen on 6/29/2017.
 */
var cheerio = require('cheerio');
var jsonObj = require('./json-utils.js');
var common = require("./common.js");


//exports.getObjFromRowData = function getObjFromRowData($, row, cb){
 function getObjFromRowData($, row){
    return new Promise( (resolve, reject) => {

    var rowObj = new Object();
    //var dirthHref = $(this).find(".cx-mosaic-board-icon").closest('a').attr('href');
    rowObj.name = $('td:nth-child(3)', row).attr('title') ? ($('td:nth-child(3)', row).attr('title')) : ($('td:nth-child(3)', row).html());
    rowObj.workspace = $('td:nth-child(4)', row).attr('title') ? ($('td:nth-child(4)', row).attr('title')) : ($('td:nth-child(4)', row).html());
    rowObj.notes = $('td:nth-child(5) > a', row).attr('href');
    rowObj.changes = $('td:nth-child(6) > a', row).attr('href') ? $('td:nth-child(6) > a', row).attr('href') : $('td:nth-child(6) > a > span', row).html();
    rowObj.cpProductPage = $('td:nth-child(10) > a', row).attr('href');
    rowObj.productId = $('td:nth-child(1) > input[id*=".product.productId"]', row).attr('value');
    var ppDirthHref = $('td:nth-child(8) > a', row).attr('href');
    rowObj.ppHref = "https://www.webcollage.net"+ppDirthHref.replace("#","");

    resolve(rowObj);

 });
}

exports.downloadProductRows = function downloadProductRows(body){
   return new Promise ( (resolve,reject) => {
    const $ = cheerio.load(body);
    var ProductBody;
    var rowObj;

    $(".even, .odd").each(function() {
        console.log("$*********************** Cherrio loop :");

        getObjFromRowData($,this)
            .then(jsonObj.createJsonObjectForProduct)
            .catch(function (err) { console.log("getObjFromRowData CATCH "+err) });


    });

    resolve(" \n\n\n done cheersUtil- ***************************************************************** done downloadProductRows");


});


}

