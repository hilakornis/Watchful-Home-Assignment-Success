console.log("Running hook_to_MainActivity");

Java.perform(function() {
    var MainActivity = Java.use('com.twitter.app.main.MainActivity');
    
    MainActivity.onProvideKeyboardShortcuts.implementation = function() {
        console.log('onProvideKeyboardShortcuts called');
        this.onProvideKeyboardShortcuts();        
    };

    // MainActivity.isFeatureEnabled.implementation = function() {
    //     return true; // Force enable feature
    // };
});