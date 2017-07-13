/**
 * Created by alon.cohen on 6/18/2017.
 */

var common = require("./common.js");
var request = require('request');
var jar = request.jar();
var fs = require('fs');
var cheerio = require('cheerio');
//var Promise = require('bluebird');



exports.loginToCPandSetJar  = async function loginToCPandSetJar (){
  return new Promise((resolve, reject) => {

  //var request = require('request');
    var request = Promise.promisify(require("request"), {multiArgs: true});
    Promise.promisifyAll(request, {multiArgs: true})

  request = request.defaults({jar: jar, followAllRedirects: true});
  var j = request.jar();
  //var formLoginPage = common.initMainForm(user, pass);
  //common.initMainForm(user, pass);

  request.get({
    url: common.formLoginPage.mainUrl, jar: j,
    headers: common.formLoginPage.headers
  }, function (error, response, body) {

    /*fs.appendFile("login1.html", body, function(){
     console.log("end writing to login.html")
     console.log("2nd login - XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX got inside post respnse func");
     console.log(body);*/
    request.post({
      url: common.formLoginPage.formRedirect,
      form: common.formLoginPage.form,
      method: 'post',
      //body: 'j_username='+user+'&j_password='+pass+'&submit=&redirect-to=/content-review/view?from-login=true',
      jar: j,
      headers: common.formLoginPage.headers
    }, function (error, response, body) {
      common.formLoginPage.jar = j;
        console.log("Jar set to common.formLoginPage.jar | " + common.formLoginPage.mainUrl)
      //downloadSecurePageAndSave(common.formLoginPage.downloadUrl, body, common.formLoginPage, function(err,result){      })
      resolve(" --> jar is ready for scrapping login page");
    })

  })

});
}

exports.loginToCPandSetJar2  = function loginToCPandSetJar2 (){
   return new Promise ((resolve,reject) => {
    var request = require('request');
    //var request = Promise.promisify(require("request"), {multiArgs: true});
    //Promise.promisifyAll(request, {multiArgs: true})

    request = request.defaults({jar: jar, followAllRedirects: true});
    var j = request.jar();
    //var formLoginPage = common.initMainForm(user, pass);
    //common.initMainForm(user, pass);

    request.get({
        url: common.formLoginPage.mainUrl, jar: j,
        headers: common.formLoginPage.headers
    }, function (error, response, body) {

        /*fs.appendFile("login1.html", body, function(){
         console.log("end writing to login.html")
         console.log("2nd login - XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX got inside post respnse func");
         console.log(body);*/

        request.post({
            url: common.formLoginPage.formRedirect,
            form: common.formLoginPage.form,
            method: 'post',
            //body: 'j_username='+user+'&j_password='+pass+'&submit=&redirect-to=/content-review/view?from-login=true',
            jar: j,
            headers: common.formLoginPage.headers
        }, function (error, response, body) {
            common.formLoginPage.jar = j;
            console.log("Jar set to 222 common.formLoginPage.jar | " + common.formLoginPage.mainUrl)
            //downloadSecurePageAndSave(common.formLoginPage.downloadUrl, body, common.formLoginPage, function(err,result){      })
            console.log("JARRRRR 1"+ typeof common.formLoginPage.jar);
            if(common.formLoginPage.jar) {
                console.log("JARRRRR 222"+ typeof common.formLoginPage.jar);
                resolve("ok") ;
            }
        })

    })
});
}
exports.loginToCPandSetJar3  = function loginToCPandSetJar3 (){
    var rp = require('request-promise');
    rp = rp.defaults({});
    var j = rp.jar();

    return new Promise((resolve, reject) => {

     var options = {
         method: 'GET',
         url: common.formLoginPage.mainUrl,
         jar: j,
         headers: common.formLoginPage.headers,
         followAllRedirects: true,
         transform: function (body) {
             console.log("transform func #1 :  " + body.length);
                return cheerio.load(body);
          }
      };

    rp(options)
        .then(function ($) {
            // Process html like you would with jQuery...
            console.log("--- process 1 end ");
            var options2 = {
                url: common.formLoginPage.formRedirect,
                form: common.formLoginPage.form,
                method: 'post',
                jar: j,
                headers: common.formLoginPage.headers,
                followAllRedirects: true,
                transform: function (body) {
                    console.log("transform func #2 :  " + body.length);
                    return cheerio.load(body);
                }
             };

            rp(options)
                .then(function ($) {
                    console.log("--- RP process 2 ended - Jar is ready  ");
                    resolve("  - return - RP process #2 ends")
                })
                .catch(function(err){
                    console.log("ERRORRRRRRRR - loginToCPandSetJar2 -> inner RP !!!");
                }) ;

        })
        .catch(function (err) {
            // Crawling failed or Cheerio choked...
            console.log("ERRORRRRRRRR - loginToCPandSetJar2 -> outer RP !!!");
        });

    });
}

//find the "Next" link on the page
function getNextUrl(url, body){
  var nextUrl = null;
  const $ = cheerio.load(body);
  dirthNextLink = $("a:contains('Next')").last();


  if(dirthNextLink && dirthNextLink.attr("href"))
    nextUrl = "https://www.webcollage.net/MainApp/content-review/view" + dirthNextLink.attr("href"); //environment-id=review
  //if(url.indexOf("MainApp/content-review/view?from-login=true")!= -1)
  //  nextUrl = "http://content-preview.webcollage.net/epartner/view-ppp?module=levisdockers&site=epartner&wcpc=1491503889625&view=review&rcpName=Webcollage";

    console.log("get Next ...... " + nextUrl);
    return nextUrl;

}

// Loop trough all PP links on CP review page
function addCpProductsRowToJson(body){
//  return new Promise ( (resolve,reject) => {
      const $ = cheerio.load(body);
      var ProductBody;
      var rowObj;


  $(".even, .odd").each(function() {
    //Promise nesting
    /*
     let getObjResult =   common.getObjFromRowData($,this);
     let getWcpcResult = getWcpcLinkFromBroker(getObjResult);
     */

      setTimeout(()=> console.log(" - - - - - -  - - - - -  -- addCpProductsRowToJson!!! "), 9000);


    /*

     common.getObjFromRowData($,this)
     .then(getWcpcLinkFromBroker)
     .then(result => console.log("Finish add product to jSon: " + result));
     */

    //if(result.indexOf("7709656") != -1)
    // resolve(" - ***************************************************************** done downloadProductRows");





  });

  //resolve(" - ***************************************************************** done downloadProductRows");
  //callback(null,"done from downloadProductRows ++++++++++++++++++++++++++++++++++++++++++ ");
  //return "SS";

//});


}


exports.downloadReviewPages2 = function downloadReviewPages2(url){
 return new Promise((resolve,reject)=>{
   var Review = url.indexOf("-p")!= -1? "review"+(url.replace(/.*-p=([^\&]*).*/,"$1")) : "review1";
   var filename = url.indexOf("wcpc")!= -1? (url.replace(/.*\&wcpc\=([^\&]*).*/,"$1")) : ("reviewMainPages/"+Review);
    console.log(" - - - - - downloadReviewPages2 url : " + url);

    var request = require("request");
    //Promise.promisifyAll(request, {multiArgs: true})

       request.get({
        url: url,
        jar: common.formLoginPage.jar,
        headers: common.formLoginPage.headers
        }, function(error, response, body) {

        fs.appendFile(filename+ "_.html", body, function()  {
          var nextUrl = getNextUrl(url, body);
          resolve(nextUrl);
          console.log("End save to : " + filename + "_login.html");

          console.log(" - - - - - Next: " + nextUrl);


        });

      });


});
}


exports.downloadReviewPages = async function downloadReviewPages(url){
  return new Promise( (resolve, reject) => {
        var Review = url.indexOf("-p")!= -1? "review"+(url.replace(/.*-p=([^\&]*).*/,"$1")) : "review1";
  var filename = url.indexOf("wcpc")!= -1? (url.replace(/.*\&wcpc\=([^\&]*).*/,"$1")) : ("reviewMainPages/"+Review);


  request.get({
    url: url,
    jar: common.formLoginPage.jar,
    headers: common.formLoginPage.headers
  }, function(error, response, body) {

    fs.appendFile(filename+ "_.html", body, function(){
      console.log("End save to : " + filename + "_login.html");
      var nextUrl = getNextUrl(url, body);
      console.log(" - - - - - Next: " + nextUrl);

      var addCpProductsRowToJsonResult =  addCpProductsRowToJson(body);
      //console.log("#### downloadReviewPages result: " + addCpProductsRowToJsonResult)

      if(nextUrl) {
        console.log("one more CP review ..... : " + nextUrl);
        downloadReviewPages(nextUrl);
      }else{
        setTimeout(() => resolve("OK from downloadReviewPages " /*+ loopRowsResult*/) , 2);
      }
    });

    //looping products and addding to jSon ...
    /*
     downloadProductRows(body, function(err, message){
     console.log("$$$$$$ \n\nreturn from downloadProductRows " + message);
     })
     */

    //run on all review rows and add them to json
    //let loopRowsResult = downloadProductRows(body);
    //downloadProductRows(body);


    /*
     downloadProductRows(body)
     .then(result => {console.log("finish downloadProductRows for " +  filename + "_login.html \n " + result)
     console.log(" - - - - - - -  - nextUrl  : " + nextUrl );
     if (nextUrl != null)
     {
     downloadReviewPages(nextUrl, body);
     }else{
     setTimeout(() =>  resolve("OK from downloadReviewPages ") ,16000);
     }
     });
     */



  });

});
}

