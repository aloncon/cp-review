
console.log("Init String Util ..................................");



exports.getPIDFromUrl = function getWcpcFromUrl (url){

    return url.replace(/.*xxx\=([^\&]*).*/,"$1");

}

exports.getWcpcFromUrl = function getWcpcFromUrl (url){
    return url.replace(/.*wcpc\=([^\&]*).*/,"$1");
}
exports.getModuleIdFromUrl = function getModuleIdFromUrl(url){
    return  url.replace(/.*module\=([^\&]*).*/,"$1")
}
exports.getSiteIdFromUrl = function getSiteIdFromUrl(url){
    return url.replace(/.*site\=([^\&]*).*/,"$1");
}

//MainApp/providers/3720/modules/7288/products/7542072/pre-preview-ppp?view=review
exports.getproviderNumFromUrl = function getproviderNumFromUrl(url){
    return  url.replace(/.*providers\/([^\/]*).*/,"$1")
}
exports.getModuleNumFromUrl = function getModuleNumFromUrl(url){
    return  url.replace(/.*modules\/([^\/]*).*/,"$1")
}
exports.getProductNumFromUrl = function getProductNumFromUrl(url){
    return url.replace(/.*products\/([^\/]*).*/,"$1");
}


//module.exports = "stringUtil";