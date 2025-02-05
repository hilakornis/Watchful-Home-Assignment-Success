// class MyElementSet {
//     constructor() {
//         this.elements = new Set();
//     }

//     addElement(name, value) {
//         // Assuming 'name' is a string and 'value' is a boolean
//         this.elements.add({ name, value });
//     }

//     printElements() {
//         for (const element of this.elements) {
//             console.log(`Name: ${element.name}, Value: ${element.value}`);
//         }
//     }
// }

Java.perform(function() {
    var prefClass = Java.use('z7t');

    prefClass.b.implementation = function(str_x, boolean_y) {       
        var string_class = Java.use("java.lang.String");
        var my_string = string_class.$new(str_x); //creating a new String by using `new` operator 
        
        var ret = this.b(str_x, boolean_y); 
           

        if(my_string.indexOf("voting") > 0 ){
            
            console.log("In function b of z7t" 
            + "arguments: "  + my_string + " boolean_y : " + boolean_y);  
            
            send(ret);
            console.log("Return value: " + ret);

            return true;
        }
         return ret;
        
    }
   

});