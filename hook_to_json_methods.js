// enumerate_methods.js
//run with command at the terminal: 
// python run_frida_script.py com.twitter.android enumerate_methods.js
console.log("hook_to_json_methods.js");

function hook(class_name, func_name){
    Java.perform(function() {

        var theClass = Java.use(class_name);
 
        theClass.put.overload('java.lang.String', 'double').implementation = function(v) {
             console.log("In function " + func_name + " overload : " + "'java.lang.String', 'double'");
             return this.put.overload('java.lang.String', 'double');
          }
          theClass.put.overload('java.lang.String', 'int').implementation = function(v) {
            console.log("In function " + func_name + " overload : " + "'java.lang.String', 'int'");
            return this.put.overload('java.lang.String', 'int');
         }
       
         theClass.put.overload('java.lang.String', 'long').implementation = function(v) {
            console.log("In function " + func_name + " overload : " + "'java.lang.String', 'long'");
            return this.put.overload('java.lang.String', 'long');
         }
       
         theClass.put.overload('java.lang.String', 'java.lang.Object').implementation = function(str, obj_JSONObject) {
            console.log("In function " + func_name + " overload : " + "'java.lang.String', 'java.lang.Object'" + "\n input: " + "string: " + str + " obj: " + obj_JSONObject.toString());
            var ret =  this.put(str, obj_JSONObject);

            
            // return this.put.overload('java.lang.String', 'java.lang.Object');
            return ret;
         }
       
         theClass.put.overload('java.lang.String', 'boolean').implementation = function(v) {
            console.log("In function " + func_name + " overload : " + "'java.lang.String', 'boolean'");
            return this.put.overload('java.lang.String', 'boolean');
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
}


// override_json_methods.js
/*
Java.perform(function() {
    var JSONObject = Java.use("org.json.JSONObject");

    // Enumerate methods of JSONObject
    var methods = JSONObject.class.getDeclaredMethods();

    methods.forEach(function(method) {
        var methodName = method.getName();
        var overloads = JSONObject[methodName].overloads;

        overloads.forEach(function(overload) {
            overload.implementation = function() {
                // Log the method call
                console.log("Called: org.json.JSONObject." + methodName + " with args: " + JSON.stringify(arguments));
                
                // Call the original method
                var result = overload.apply(this, arguments);
                
                // Optionally, log the result
                console.log("Result: " + result);
                
                return result;
            };
        });
    });

    console.log("Hooked all methods of org.json.JSONObject");
});*/


//overload of jsonObject
// Java.perform(function() {
//     var JSONObject = Java.use("org.json.JSONObject");

//     // Enumerate methods of JSONObject
//     var methods = JSONObject.class.getDeclaredMethods();

//     methods.forEach(function(method) {
//         var methodName = method.getName();
//         var overloads = JSONObject[methodName].overloads;

//         overloads.forEach(function(overload) {
//             overload.implementation = function() {
//                 // Log the method call
//                 // console.log("Called: org.json.JSONObject." + methodName);
//                 // Log the method call
//                 console.log("Called: org.json.JSONObject." + methodName + " with args: " + JSON.stringify(arguments));
//                 // Print each string argument
//                 // for (var i = 0; i < arguments.length; i++) {
//                 //     // console.log("for argument[" + i + "] :" + arguments[i].className());
//                 //     // if (typeof arguments[i] === 'string' || arguments[i] instanceof Java.use("java.lang.String")) {
//                 //     //     console.log("String argument: " + arguments[i]);
//                 //     // }
//                 // }

//                 for (var i = 0; i < arguments.length; i++) {
//                     try {
//                         var arg = arguments[i];
                        
//                         if (typeof arg === 'string' || arg instanceof Java.use("java.lang.String")) {
//                             console.log("String argument: " + arg);

//                         }
//                     } catch (error) {
//                         // console.error("Error processing argument " + i + ": " + error.message);
//                     }
//                 }

//                 // Call the original method
//                 var result = overload.apply(this, arguments);
                
//                 // Optionally, log the result
//                 console.log("Result: " + result);
                
//                 return result;
//             };
//         });
//     });

//     console.log("Hooked all methods of org.json.JSONObject");
// });

Java.perform(function() {
  console.log("Enumerating loaded classes...");

  // Enumerate all loaded classes
  Java.enumerateLoadedClasses({
      onMatch: function(className) {
        if(className.includes("com.twitter.model.json.timeline.urt.JsonTimelineEntry") || className.includes("org.json.JSONObject") ||  className.includes("com.twitter.util")){
          console.log("Class: " + className);
          try {
              var clazz = Java.use(className);
              var methods = clazz.class.getDeclaredMethods();
              
              methods.forEach(function(method) {
                var method_name =   method.getName()
                // if (method_name.includes("put")){
                //     // hook("org.json.JSONObject", "put"); //todo
                // }
                
                console.log("  Method: " + method_name);
                //We will try to override the implementation of put. so that it can be what we need it to be. 
                // if (method_name.includes("put")){
                //     console.log("  Method: " + method_name);
                //     hook("org.json.JSONObject", "put");
                // }

                var methodName = method.getName();
                var overloads = JSONObject[methodName].overloads;

                overloads.forEach(function(overload) {
                    overload.implementation = function() {
                        // Log the method call
                        // console.log("Called: org.json.JSONObject." + methodName + " with args: " + JSON.stringify(arguments));
                        
                        // Call the original method
                        var result = overload.apply(this, arguments);
                        
                        // Optionally, log the result
                        // console.log("Result: " + result);
                
                return result;
            };
        });


                  
              });
          } catch (error) {
              console.error("Error: " + error.message);
          }
        }
      },
      onComplete: function() {
          console.log("Class enumeration complete.");
      }
  });
});