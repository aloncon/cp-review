/**
 * Created by alon.cohen on 6/15/2017.
 */
console.log("Start Index JS ");

var common = require("./common.js");
var downloads = require("./download-utils.old");
var request = require('request');
var jar = request.jar();
var fs = require('fs');
var Promise = require('bluebird');


function main(){
    console.log("start main");

    var promiseArray= []; //this arr will include all functions
    //init form login
    /*
    common.initMainForm("alon.cohen@webcollage.com","ugt7158")
        .then(function(){ console.log("**** then finish init 111 : "); })
         .then(downloads.loginToCPandSetJar2())
           .then(downloads.downloadReviewPages2(common.formLoginPage.downloadUrl));
     */
    //------------------------------------------------------------------------------------
    //synch set
    common.initMainForm("alon.cohen@webcollage.com","ugt7158");
    let jar = downloads.loginToCPandSetJar2();
    console.log("jar : " + jar)
    let scrape1 = downloads.downloadReviewPages2(common.formLoginPage.downloadUrl);
    console.log(scrape1);

  /*  promiseArray.push(new Promise(function(resolve) {
        var next = common.formLoginPage.downloadUrl;
        let result = downloads.downloadReviewPages2(next);
        resolve(result);
    }));
*/
    promiseArray.push(new Promise(function(resolve) {
        resolve(   "-------------------Hi " + 222);
    }));

    promiseArray.push(new Promise(function(resolve) {
        resolve("-------------------Hi " + 3);
    }));
    console.log("******************* START PROMISSES LOOP ************************************** \n\n\n\n")

    /*
    Promise.each(promiseArray, function(result) {
        console.log(result);
    });
    */
    //------------------------------------------------------------------------------------


    //let downloadReviewPagesResult = await downloads.downloadReviewPages2(common.formLoginPage.downloadUrl);
    //console.log("**** downloadReviewPages result: " + downloadReviewPagesResult)


}

main();

