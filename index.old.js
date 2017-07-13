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


async function get(v){
    return new Promise((resolve, reject) => {
        setTimeout( () =>  resolve("get secret " + v), 1000);
});
}

async function process(value){
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(value+'${value}-code'),10);
});
}


async function main(){
    console.log("start main");

    //init form login
    await common.initMainForm("alon.cohen@webcollage.com","ugt7158").then(function(result){ console.log("**** then finish init: " + result); });

    //login to CP and save J
//    let setJar = await downloads.loginToCPandSetJar();
 //   console.log("**** await loginToCPandSetJar result: " + setJar)
    //download Review page from CP
    var nextUrl = 0;
    while(nextUrl < 10 ){
        nextUrl+=1;
        console.log("while ...... " + nextUrl);
    }

     downloads.loginToCPandSetJar()
     .then(function () {
         var nextUrl = 0;
         while(nextUrl < 10 ){
             nextUrl+=1;
             console.log("while ...... " + nextUrl);
             setTimeout(()=> console.log(" - - - - - -  - - - - -  -- while !!! "), 29000);
         }
       }).then(function () {
         //var nextUrlull;
         var next = common.formLoginPage.downloadUrl;
         //while(next!=null) {
             downloads.downloadReviewPages2(next)
         //}



     });


    //let downloadReviewPagesResult = await downloads.downloadReviewPages2(common.formLoginPage.downloadUrl);
    //console.log("**** downloadReviewPages result: " + downloadReviewPagesResult)


    //let scrape = await scrapeProductContent(val);
    //console.log('resultcccccccccc:' + scrape)
    //let saveResult = await jsonutils.saveJsonToFile2();
    //console.log('resultcccccccccc:' + saveResult)











    // ******************************************************************************
    let getVal = await get(' -x 1 - ');
    let getProcess = await process(getVal);
    //console.log('resultcccccccccc:' + getProcess)

    //*****************************************************************************

    /* Given async function sayHi
    function sayHi() {
        return new Promise((resolve) => {
            setTimeout(() => {
            console.log('Hi');
            resolve();
        }, 3000);
    });
    }

// And an array of async functions to loop through
    const asyncArray = [sayHi, sayHi, sayHi];


// We create the start of a promise chain
    let chain = Promise.resolve();

// And append each function in the array to the promise chain
    for (const func of asyncArray) {
        chain = chain.then(func)
            .then( () => {console.log("sss")} );
    }
    */

}

main();

