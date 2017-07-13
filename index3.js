/**
 * Created by alon.cohen on 6/29/2017.
 */
console.log("Start Index JS ");

var PromiseB = require("bluebird");
//var request = require('request');
var request = PromiseB.promisifyAll(require("request"));
var jar = request.jar();
//var fs = require('fs');
var fs = PromiseB.promisifyAll(require("fs"));

var common = require("./common.js");
var downloads = require("./download-utils");
var jsonutils = require("./json-utils");
var stringUtil = require('./string-utils.js');


buildPPUrl1 = function buildPPUrl1(url) {
  //let buildPPUrl1  = url =>{
  return new Promise((resolve, reject)=> {
    var dirthHref = url;
    //var module = dirthHref.replace(/.*module\=([^\&]*).*/,"$1")
    var moduleid = "XXXXXX";

    var wcpc = "yyyyy";
    var partner = "fffffffff";
    console.log("http://content-preview.webcollage.net/epartner/view-ppp?environment-id=review&module=" + moduleid + "&site=epartner&wcpc=" + wcpc + "&view=review&rcpName=Webcollage")
    resolve("http://content-preview.webcollage.net/epartner/view-ppp?environment-id=review&module=" + moduleid + "&site=epartner&wcpc=" + wcpc + "&view=review&rcpName=Webcollage");
  })
}

let myLog = ms=> {
  console.log("my log for " + ms);
}

let delay = ms => {
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      console.log("delay for " + ms)
    }, 0);

    //return setTimeout(()=>{console.log("delay for " + ms)},ms)
    resolve();
  });
}

let saveJason = () => {
  console.log("\n\n\n*********************************************************************************\n\n\n saveToJason : ");

  return setTimeout(()=>jsonutils.saveJsonToFile2(" savvvvvveeeeeee"), 9000);
}

let addProductToJason = () => {
  console.log("addProductToJason : ");

  //return addCpProductsRowToJson();
}


function logItem(item) {
  return new Promise((resolve, reject) => {
    //process.nextTick(() => {
    console.log(item);
    resolve();
  })
}


let addWcpcToProducts = ()=> {
  var arrObj2 = jsonutils.productsJson;
  console.log("xxx" + Object.keys(jsonutils.productsJson).length + "  ");
  console.log("xxx" + Object.keys(arrObj2).length + "  ");
  //var promises = ['aaa', 'bbb', 'ccc'].map(function(productObj){


  const promises = Object.keys(jsonutils.productsJson).map(function (item) {
    let obj = jsonutils.productsJson[item];
    let ppLink = "http://www.webcollage.net/MainApp/providers/" + obj[0]["providerId"] + "/modules/" + obj[0]["moduleId"] + "/products/" + obj[0]["prodId"] + "/pre-preview-ppp?view=review";
    console.log("start scrape : " + ppLink);

    //let wcpc = common.getWcpcLinkFromBroker(ppLink);
    //obj[0]["wcpc"] = "alonXXX";
    console.log("xxxssss " + jsonutils.productsJson[item]);
    console.log("xxxssss " + obj[0]["name"]);
    console.log("xxxssss " + obj[0]["workspace"]);
    return downloads.promisifyDownloadSecurePage(ppLink, "products")
      .then((body)=> {
        const url = common.getGenericLinkFromBroker(body);

        jsonutils.updteObjectWithValue(item, "wcpc", stringUtil.getWcpcFromUrl(url));

        console.log("xxxxxxx BODY: " + url)
      });
  });

  return Promise.all(promises);
}

let scrappeReviewPages = async ()=> {
  console.log("\n\n\nimplement phase 3 ms: 1000");
  let next = common.formLoginPage.downloadUrl;
  //while (next = await downloads.downloadReviewPages2(next) != null)
  while (next != null && next.indexOf("2") == -1) {
    console.log("\n\n\n** implement phase 3 ms: 1001 : next: " + next);
    next = await downloads.downloadReviewPages2(next);
  }
  console.log("\n\n\n** implement phase 3 ms: 1001 while end : " + next);
}


let phase2 = ()=> {
  console.log("implement phase 2.5 5000");
  return delay(1000);
}

let loginToCP = ()=> {
  console.log("implement phase 2.0 ");
  return (downloads.loginToCPandSetJar2());
}

//init main object
// init jar
let initObjects = () => {
  console.log("implement phase 1 8000");
  common.initMainForm("alon.cohen@webcollage.com", "ugt7158");
  //let jarInit = downloads.loginToCPandSetJar2();
  //return delay(8000);
  return (buildPPUrl1("ssssssssss"));

}


function main() {
  console.log("start main");

  /*
   PromiseB.all([
   delay(7000),
   delay(23000),
   delay(1000),
   delay(2500)
   ]);
   */
  //  delay(7000)
  //    .then(()=>{setTimeout( console.log("\n\n\n\n***********************\nProcees is done -- all phases finished 2"),9000)})
  /*
   Promise.all([
   initObjects(),
   loginToCP(),
   phase2(),
   scrappeReviewPages(),
   addWcpcToProducts(),
   saveJason()

   ]).then(()=>{console.log("\n\n\n\n***********************\nProcees is done -- all phases finished")});
   */

  initObjects() //init (form onject)
    .then(loginToCP)  //loginToCPandSetJar2
    .then(phase2)
    .then(scrappeReviewPages)
    .then(addWcpcToProducts)
    .then(saveJason)
    //.then(addProductToJason) ;
    .then(() => {
      console.log("\n\n\n\n***********************\nProcees is done -- all phases finished")
    })
    .catch(function (err) {
      console.log(err)
    });
  ;


}

//scrappeReviewPages = Promise.promisifyAll(scrappeReviewPages);
//addWcpcToProducts = Promise.promisifyAll(addWcpcToProducts);


main();


