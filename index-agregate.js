/**
 * Created by alon.cohen on 7/9/2017.
 */
var Promise = require("bluebird");

var p1 = new Promise(function(f,r){
    setTimeout(function(){
        console.log("p1");
        f("yay");
    }, 1000);

});

var p2 = new Promise(function(f,r){
    setTimeout(function(){
        console.log("p2");
        r(new Error("boo"));
    }, 200);

})

var p3 = new Promise(function(f,r){
    setTimeout(function(){
        console.log("p3");
        r(new Error("yay"));
    }, 300);

});

var p4 = new Promise(function(f,r){
    setTimeout(function(){
        console.log("p4");
        f("yay");
    }, 400);

});


//Promise.all([p1,p2, p3, p4]).then(function(p){
//    console.log("Results:",p);
//}).error(function(e){
//    console.log("Error:",e);
//});


Promise.all([p1,p2,p3,p4].map(x => x.reflect()))
       .then(console.log("XXXXXXXXXXXX finito"))


