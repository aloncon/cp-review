/**
 * Created by alon.cohen on 6/18/2017.
 */
//var Promise = require("bluebird");
var request = require('request');
//var request = Promise.promisifyAll(require("request"));
var jar = request.jar();
var fs = require('fs');
//var fs = Promise.promisifyAll(require("fs"));
var cheerio = require('cheerio');

var common = require("./common.js");
var cheerioUtils = require('./cheerio-utils.js');


exports.loginToCPandSetJar = function loginToCPandSetJar() {
  return new Promise((resolve, reject) => {
    var request = require('request');
    request = request.defaults({jar: jar, followAllRedirects: true});
    var j = request.jar();

    request.get({
      url: common.formLoginPage.mainUrl, jar: j,
      headers: common.formLoginPage.headers
    }, function (error, response, body) {

      request.post({
        url: common.formLoginPage.formRedirect,
        form: common.formLoginPage.form,
        method: 'post',
        //body: 'j_username='+user+'&j_password='+pass+'&submit=&redirect-to=/content-review/view?from-login=true',
        jar: j,
        headers: common.formLoginPage.headers
      }, function (error, response, body) {
        if (error)
          return reject(errr);

        common.formLoginPage.jar = j;
        console.log("Jar set to 222 common.formLoginPage.jar | " + common.formLoginPage.mainUrl)
        //downloadSecurePageAndSave(common.formLoginPage.downloadUrl, body, common.formLoginPage, function(err,result){      })

        if (common.formLoginPage.jar) {
          console.log("XXXJARRRRR 222" + typeof common.formLoginPage.jar);
          resolve("ok");
        }
        else
          reject(new Error("jar is not set"))
      })

    })
  });
}

//find the "Next" link on the page
function getNextUrl(url, body) {
  var nextUrl = null;
  const $ = cheerio.load(body);
  dirthNextLink = $("a:contains('Next')").last();


  if (dirthNextLink && dirthNextLink.attr("href"))
    nextUrl = "https://www.webcollage.net/MainApp/content-review/view" + dirthNextLink.attr("href"); //environment-id=review
  //if(url.indexOf("MainApp/content-review/view?from-login=true")!= -1)
  //  nextUrl = "http://content-preview.webcollage.net/epartner/view-ppp?module=levisdockers&site=epartner&wcpc=1491503889625&view=review&rcpName=Webcollage";

  console.log("get Next ...... " + nextUrl);
  return nextUrl;

}

exports.downloadReviewPages = function downloadReviewPages(url) {
  return new Promise((resolve, reject)=> {
    var Review = url.indexOf("-p") != -1 ? "review" + (url.replace(/.*-p=([^\&]*).*/, "$1")) : "review1";
    var filename = url.indexOf("wcpc") != -1 ? (url.replace(/.*\&wcpc\=([^\&]*).*/, "$1")) : ("reviewMainPages/" + Review);
    console.log(" - - - - - downloadReviewPages2 url : " + url);
    var request = require("request");

    request.get({
      url: url,
      jar: common.formLoginPage.jar,
      headers: common.formLoginPage.headers
    }, async function (error, response, body) {
      if (error){
        console.log("downloadReviewPages2 --> REQUEST  --> ERROR ON CALLBACK " + error);
        return reject(error);
      }
      //add product data to json object
      let result = await cheerioUtils.downloadProductRows(body);
      console.log("downloadReviewPages2 --> cheerioUtils.downloadProductRows --> result" + result)

      fs.appendFile(filename + "_.html", body, function (err, data) {
        if (err) {
          reject(err);
        } else {
          var nextUrl = getNextUrl(url, body);
          console.log(" - - - - - Next: " + nextUrl);
          setTimeout(() => {  resolve(nextUrl)    }, 10000);
          //resolve(nextUrl);
        }

        /*
         if (!nextUrl){

         console.log("End save to : " + filename + "_login.html");
         console.log(" - - - - - Next: " + nextUrl);
         resolve(nextUrl);
         }else{
         //call for download next page
         console.log(" - - - - - CALL Next: " + nextUrl);
         downloadReviewPages2(nextUrl);
         }
         */


      });

    });


  });
}


//for download of a simple (non-authenticated page) and save to disk under products
exports.downloadSecurePagexx = function downloadSecurePagexx(url, folder, callback) {
  request.get({
    url: url,
    jar: common.formLoginPage.jar
    //headers: formLoginPage.headers
  }, function (error, response, body) {

    callback(null, body);

  }).pipe(fs.createWriteStream(folder + "/pages/" + "page.htm"));

}

//for download of a simple (non-authenticated page) and save to disk under products
exports.promisifyDownloadSecurePage = function promisifyDownloadSecurePage(url, folder) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      request.get({
        url: url,
        jar: common.formLoginPage.jar
        //headers: formLoginPage.headers
      }, function (error, response, body) {
        if (error)
          reject(error);

        resolve(body);

      });
    }, 5000);
  });
}
