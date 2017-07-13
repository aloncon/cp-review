/**
 * Created by alon.cohen on 7/9/2017.
 */
/**
 * Created by alon.cohen on 6/29/2017.
 */
console.log("Start Index JS ");


var request = require('request');
var jar = request.jar();
var fs = require('fs');

var common = require("./common.js");
var downloads = require("./download-utils");
var jsonutils = require("./json-utils");
var stringUtil = require('./string-utils.js');
var testUtil = require('./test-utils.js');



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


let saveJason = () => {
  console.log("\n\n\n*********************************************************************************\n\n\n saveToJason : ");

  return jsonutils.saveJsonToFile(" savvvvvveeeeeee");
}

let addProductToJason = () => {
  console.log("addProductToJason : ");

  //return addCpProductsRowToJson();
}

let testProductContent = ()=> {
  console.log("******************************************************************************************** \nTest Product Content ");
  const promises = Object.keys(jsonutils.productsJson).map(function(item){
    let obj = jsonutils.productsJson[item];
     console.log("Test Product Loop - WCPC: " + obj[0].wcpc + " \n                    Name" +obj[0].name);
      //test pp
      testUtil.testPPProducts()
        .then((result)=>{
          console.log("test result: " + result);
        }).catch(function(err){
        console.log("test PP - Error : " + error);
      });
      //test mini site
      //test mosaic
  });

  return;
}

let addWcpcToProducts = ()=> {
  var arrObj2 = jsonutils.productsJson;
  console.log("xxx" + Object.keys(jsonutils.productsJson).length + "  ");

  const promises = Object.keys(jsonutils.productsJson).map(function (item) {
    let obj = jsonutils.productsJson[item];
    let ppLink = "http://www.webcollage.net/MainApp/providers/" + obj[0]["providerId"] + "/modules/" + obj[0]["moduleId"] + "/products/" + obj[0]["prodId"] + "/pre-preview-ppp?view=review";
    console.log("start scrape : " + ppLink);

    return downloads.promisifyDownloadSecurePage(ppLink, "products")
      .then((body)=> {

        const url = common.getGenericLinkFromBroker(body);
        jsonutils.updteObjectWithValue(item, "wcpc", stringUtil.getWcpcFromUrl(url));
        jsonutils.updteObjectWithValue(item, "module", stringUtil.getModuleIdFromUrl(url));
        
        console.log("xxxxxxx BODY: " + url)
      }).catch(function (err) {
        console.log(" ----------------000000 promisifyDownloadSecurePage => then catch  " + url)
        console.log(err)
      });
  });

  return Promise.all(promises);
}

let scrappeReviewPages = async ()=> {
  console.log("\n\n\nimplement phase 3 ms: 1000");
  let next = common.formLoginPage.downloadUrl;
      //next = "https://www.webcollage.net/MainApp/content-review/view?from-login=true&d-1000806-p=3";

  // && next.indexOf("2") == -1
  while (next != null) {
    console.log("\n\n\n** implement phase 3 ms: 1001 : next: " + next);
    next = await downloads.downloadReviewPages(next);

  }
  console.log("\n\n\n** implement phase 3 ms: 1001 while end : " + next);
}


let phase2 = ()=> {
  console.log("implement phase 2.5 5000");
  return;
}

let loginToCP = ()=> {
  console.log("implement Login to CP and set JAR ");
  return (downloads.loginToCPandSetJar());
}

//init main object
// init jar
let initObjects = () => {
  console.log("Init Objects ");
  common.initMainForm("xxx@webcollage.com", "xxxxx"); 

  return (buildPPUrl1("ssssssssss"));

}


function main() {
  console.log("start main");

  initObjects() //init (form onject)
    .then(loginToCP)  //loginToCPandSetJar2
    .then(phase2)
    .then(scrappeReviewPages)
    .then(addWcpcToProducts)
    .then(testProductContent)
    .then(saveJason)

    .then(() => {
      console.log("\n\n\n\n***********************\nProcees is done -- all phases finished")
    })
    .catch(function (err) {
      console.log(err)
    });
  ;

}

main();



