// enumerate_methods.js
//run with command at the terminal: 
// python run_frida_script.py com.twitter.android enumerate_methods.js
console.log("enumerate_methods.js");

Java.perform(function() {
  console.log("Enumerating loaded classes...");

  // Enumerate all loaded classes
  Java.enumerateLoadedClasses({
      onMatch: function(className) {
        
          console.log("Class: " + className);
          try {
              var clazz = Java.use(className);
              var methods = clazz.class.getDeclaredMethods();
              methods.forEach(function(method) {
                  console.log("  Method: " + method.getName());
              });
          } catch (error) {
              console.error("Error: " + error.message);
          }
        
      },
      onComplete: function() {
          console.log("Class enumeration complete.");
      }
  });
});