Java.perform(function() {

    var theClass = Java.use("com.twitter.api.model.json.core.JsonApiTweet");

    theClass.t.implementation = function() {
         console.log("In function T of JsonApiTweet");
         var ret = this.t(); 
         send(ret);
         console.log("Return value: "+ret);
          return ret;
      }
//     theClass.b.implementation = function(v) {
//         console.log("In function B");
//          return false;
//      }
//    theClass.c.implementation = function(v) {
//         console.log("In function C");
//          return false;
//      }

    console.log("Exploit Complete")

})