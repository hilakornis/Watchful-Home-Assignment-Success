
Java.perform(function() {
    const packagePrefix = 'com.twitter.android';  // Change this to the package you want to hook

    // Function to hook into all methods of a class
    function hookMethods(className) {
        if (!className.startsWith(packagePrefix)) {
            return;
        }

        try {
            var clazz = Java.use(className);
            var methods = clazz.class.getDeclaredMethods();
            methods.forEach(function(method) {
                var methodName = method.getName();
                var hook = clazz[methodName];
                if (hook) {
                    hook.implementation = function() {
                        console.log("Called: " + className + "." + methodName);
                        return this[methodName].apply(this, arguments);
                    };
                }
            });
        } catch (error) {
            console.error("Error: " + error.message);
        }
    }

    // Enumerate all loaded classes and hook into their methods
    Java.enumerateLoadedClasses({
        onMatch: function(className) {
            hookMethods(className);
        },
        onComplete: function() {
            console.log("Class enumeration complete.");
        }
    });
});