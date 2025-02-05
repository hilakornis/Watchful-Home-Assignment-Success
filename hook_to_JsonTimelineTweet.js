Java.perform(function() {

    var theClass = Java.use("com.twitter.model.json.timeline.urt.JsonTimelineTweet");

    theClass.s.implementation = function() {
         console.log("In function S of JsonTimelineTweet");
         var ret = this.s(); 
         send(JSON.stringify(ret));
         console.log("Return value: "+ret);
          return ret;
      }

      theClass.t.implementation = function(x) {
        console.log("In function T of JsonTimelineTweet");
        var ret = this.t(x); 
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