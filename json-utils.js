console.log("Init QA UTILS");

//var fs = require('fs');
var fs = require("fs");

var stringUtil = require('./string-utils.js');

var productsJson =  {};
module.exports.productsJson = productsJson;


exports.updteObjectWithValue = function updteObjectWithValue(itemId,feild,value){
 let obj = productsJson[itemId];
 obj[0][feild] = value;
 console.log("updteObjectWithValue XXXXXXX :" + itemId + " feild:" + feild + " val: " + value);
}

exports.createJsonObjectForProduct = function createJsonObjectForProduct(rowObj){ //rowObj.productId, rowObj.ppHref, rowObj.name, rowObj.workspace, rowObj.notes, rowObj.changes, rowObj.cpProductPage

 //var wcpc = stringUtil.getWcpcFromUrl(rowObj.ppHref);
 let wcpc = null;
 let prodNum = stringUtil.getProductNumFromUrl(rowObj.ppHref);
 let moduleNum = stringUtil.getModuleNumFromUrl(rowObj.ppHref);
 let providerNum = stringUtil.getproviderNumFromUrl(rowObj.ppHref);
 //var module = stringUtil.getModuleIdFromUrl(rowObj.ppHref);
 let module = null;
 //var partner = stringUtil.getSiteIdFromUrl(rowObj.ppHref);
 let partner = stringUtil.getSiteIdFromUrl(rowObj.ppHref);

 console.log("*********************** jason object added:"+rowObj.name);
 console.log(Object.keys(productsJson).length);
 productsJson[rowObj.productId] = [{"wcpc":wcpc, "module":module, "prodId":prodNum ,"moduleId":moduleNum, "providerId":providerNum,  "name":rowObj.name, "workspace": rowObj.workspace, "notes":rowObj.notes, "changes": rowObj.changes,"cpproduct": rowObj.cpProductPage}];

}

exports.addProductToJson = function addProductToJson (url, response, body, callback){
 //test for PPP
 console.log("addProductToJson: " + url);
 console.log("addProductToJson: " + response);
 var wcpc = stringUtil.getWcpcFromUrl(url);

 callback(null,wcpc);
}


exports.saveJsonToFile = function saveJsonToFile(result){
 var folder = "json";
 var fileName = "cp_products7_3__2017"; // get Date

 var json = JSON.stringify(productsJson);
 console.log("\n\n\n exports.saveJsonToFile2 func JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ SAVE JSON TO FILE: " + folder+fileName + " result: " + result);

 fs.writeFile(folder+"/"+fileName+"2.json", json, 'utf8',function(err,data){
  if (err) {
   console.log(" - - - - -saveJsonToFile2 ERROR: " +  err);
  }else {
   console.log(" : saveJsonToFile2 \n\n\n $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ calback is done" + data);
  }
 });

}
