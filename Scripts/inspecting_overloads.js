console.log("Inspecting overloads");
Java.perform(function() {
    // Inspect getString
    const Resources = Java.use("android.content.res.Resources");
    const methods = Resources.class.getMethods();
    const methodsCount = methods.length
    for (var i = 0; i < methodsCount; i++) {
        var method = methods[i];
        if (method.toString().includes('getString')) {
            console.log(method);
        }
    }
});