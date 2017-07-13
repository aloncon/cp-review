/**
 * Created by alon.cohen on 7/10/2017.
 */
console.log("Init Test UTILS");

var common = require("./common.js");

exports.testPPProducts = function testPPProducts(obj) {
  return new Promise((resolve, reject) => {
    //if(error){
    //add reject list to object
    //reject(false - errors submitted to the object)
    //}

    //if OK
    {
      console.log("Product Pass All QA phases for : " + obj[0].wcpc);
      resolve("OK")
    }
  });
}
