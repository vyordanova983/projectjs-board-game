var clickedGroups = false;

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

var array = [];

document.getElementById("getGroups").addEventListener("click", function(){
    if(clickedGroups === false){
        clickedGroups = true;
        Ajax.get("http://worldcup.sfg.io/teams/group_results", (data) => {
            console.log(data);
            for(var i = 0; i < data.length; i++){
                console.log(data[i]);
                JSON.stringify(data[i], function (key, value) {
                    if (key == "letter") {
                        array.push(value)
                        //alert(value)
                        //document.getElementById("allCountries").innerHTML = value;
                        var tr = document.getElementById("allGroups");
                        var th = document.createElement("th");
                        th.appendChild(document.createTextNode(value));
                        tr.appendChild(th);
                    } else {
                      return value;
                    }
                });
            }
            
            document.getElementById("allGroups").innerHTML = array;
        });
       

        // var ajax = new XMLHttpRequest();

        // // open - GET / POST / PUT / DELETE / PATCH (most popular) 
        // ajax.open("GET", "http://worldcup.sfg.io/teams/group_results")
        // // send 
        // ajax.send();

        // // execution 
        // ajax.onload = () => {

        //     //console.log("Yes we send data");
        //     //console.log(ajax.responseText);
        //     //console.log(JSON.parse(ajax.responseText)); 

        //     ajax.onload = () => {
        //         console.log("Internal transaction");
        //         console.log(JSON.parse(ajax.responseText));

        //         //zaqvkite se izpulnqvat asinhronno !! 😀 
        //     }
        // }
    } 
    else{
        alert('You already clicked it');
    }  
});
