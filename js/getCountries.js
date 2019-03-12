var clickedCountries=false;

var Ajax = {

    ajax : null,

    init() {

        if(!this.ajax) { 
            this.ajax = new XMLHttpRequest();   //toi se griji da inicializira ajax propertyto i da go vrushta

        }
        return this.ajax;
    },

   
    get(url, callback) {
        var request = this.init();
        request.open("GET", url);
        request.send();
        request.onload = () => {
            console.log(request.statusCode);
            callback(JSON.parse(request.responseText));
        };
    },

    post(url, data, callback) { 
        //var request = this.init();
        request.open("POST", url);
        request.send(data);
        request.onload = () => {
            callback(JSON.parse(request.responseText));
        };

    }
};

// document.getElementById("allCountries").innerHTML = data;

document.getElementById("getCountries").addEventListener("click", function(){
    if(clickedCountries === false){
        clickedCountries = true;
        Ajax.get("http://worldcup.sfg.io/teams/", (data) => {
            // console.log(data);
            for(var i = 0; i < data.length; i++){
                console.log(data[i]);
                JSON.stringify(data[i], function (key, value) {
                    if (key == "country") {
                        document.getElementById("allCountries").innerHTML = value;
                    } else {
                      return value;
                    }
                });
            }
        });

        
        //var ajax = new XMLHttpRequest();

        // open - GET / POST / PUT / DELETE / PATCH (most popular) 
        // ajax.open("GET", "http://worldcup.sfg.io/teams/")
        // // send 
        // ajax.send();

        // // execution 

        // ajax.onload = () => {

        //     ajax.onload = () => {
        //         console.log("Internal transaction");
        //         var array = JSON.parse(ajax.responseText);
        //         console.log(array);
        //         // for(var i = 0; i < array.length; i++){
        //         //     console.log(array[i]);
        //         // }

        //         //zaqvkite se izpulnqvat asinhronno !!
        //     }
        // }
       
    }
    else{
        alert('You already clicked it');
    }
});