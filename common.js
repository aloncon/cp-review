console.log("Init common");

var stringUtil = require('./string-utils.js');
var cheerio = require('cheerio');
var formLoginPage = new Object();
var downloads = require("./download-utils");

exports.formLoginPage = formLoginPage;


exports.buildPPUrl = function buildPPUrl (url){
    var dirthHref = url;
    //var module = dirthHref.replace(/.*module\=([^\&]*).*/,"$1")
    var moduleid = stringUtil.getModuleIdFromUrl(dirthHref.toString());

    var wcpc = stringUtil.getWcpcFromUrl(dirthHref);
    var partner = stringUtil.getSiteIdFromUrl(dirthHref);

    return "http://content-preview.webcollage.net/epartner/view-ppp?environment-id=review&module="+moduleid+"&site=epartner&wcpc="+wcpc+"&view=review&rcpName=Webcollage";

}

exports.buildLoginUrl = function buildPPUrl (url){
    var dirthHref = url;
    var moduleid = stringUtil.getModuleIdFromUrl(dirthHref.toString());


    return "http://content-preview.webcollage.net/epartner/view-ppp?environment-id=review&module="+moduleid+"&site=epartner&wcpc="+wcpc+"&view=review&rcpName=Webcollage";

}

exports.getGenericLinkFromBroker = function getGenericLinkFromBroker(body){
     const $ = cheerio.load(body);

     return $('DIV#cx-preview-sites-wrap > UL > LI > a').attr('href');
};
    //return "http://www.webcollage.net/MainApp/preview-ppp?module=cpwalmart&site=epartner&wcpc=1496910629052&view=review&rcpName=Webcollage";

//create an object that include all form feilds neccessary for login CP and scrape
exports.initMainForm = async function initMainForm(user, pass){
    return new Promise ((resolve, reject) => {
    //var formLoginPage = new Object();
    formLoginPage.mainUrl = 'https://www.webcollage.net/MainApp/login';
    formLoginPage.formRedirect = 'https://www.webcollage.net/MainApp/login/authenticate';
    formLoginPage.form = {"j_username": user, "j_password": pass, "submit": ""};
    formLoginPage.headers =  { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
        'Content-Type' : 'text/html;charset=utf-8' };
    formLoginPage.downloadUrl = "https://www.webcollage.net/MainApp/content-review/view?from-login=true";
    formLoginPage.downloadUrlArray = {};
    formLoginPage.jar = null;

    resolve("initMainForm object is done");
    //  return formLoginPage;
})
}

//exports.getObjFromRowData = function getObjFromRowData($, row, cb){
exports.getObjFromRowData = async function getObjFromRowData($, row){
    return new Promise( (resolve, reject) => {
            var rowObj = new Object();
    //const $ = cheerio.load(row);

    //var dirthHref = $(this).find(".cx-mosaic-board-icon").closest('a').attr('href');
    rowObj.name = $('td:nth-child(3)', row).attr('title') ? ($('td:nth-child(3)', row).attr('title')) : ($('td:nth-child(3)', row).html());
    rowObj.workspace = $('td:nth-child(4)', row).attr('title') ? ($('td:nth-child(4)', row).attr('title')) : ($('td:nth-child(4)', row).html());
    rowObj.notes = $('td:nth-child(5) > a', row).attr('href');
    rowObj.changes = $('td:nth-child(6) > a', row).attr('href') ? $('td:nth-child(6) > a', row).attr('href') : $('td:nth-child(6) > a > span', row).html();
    rowObj.cpProductPage = $('td:nth-child(10) > a', row).attr('href');
    rowObj.productId = $('td:nth-child(1) > input[id*=".product.productId"]', row).attr('value');
    var ppDirthHref = $('td:nth-child(8) > a', row).attr('href');
    rowObj.ppHref = "https://www.webcollage.net"+ppDirthHref.replace("#","");
    //var newHref = common.buildPPUrl(dirthHref);

    //  cb(null, rowObj);
    //return rowObj;
    //resolve(rowObj, j);

    resolve(rowObj);

});
}

