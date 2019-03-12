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
    const Group = (function () {
        let teams;
        const render = async function() {
            const teamToHtml = function (team) {
                const result = 
                `
                    <tr id="${team.fifa_code}">
                        <td>${team.country}</td>
                        <td>${team.fifa_code}</td>
                        <td>${team.wins}</td>
                        <td>${team.draws}</td>
                        <td>${team.losses}</td>
                        <td>${team.points}</td>
                    </tr>
                `;
                return result;
            }
            const group = HashService.getParts()[1];
            if(!group) {
                return "Group not found!";
            }
            const teams = await GroupService.getTeams(group);
            if (teams.length === 0) {
                return "Group not found!";
            }
            const result = 
            `
                <h1 style="text-align: center">Group ${group.toUpperCase()}</h1>
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <td>Country</td>
                            <td>Fifa Code</td>
                            <td>Group number</td>
                            <td>Group letter</td>
                            <td>Number</td>
                            <td>Points</td>
                        </tr>
                    </thead>
                    <tbody>
                        ${teams
                            .map(teamToHtml)
                            .join('\n')}
                    </tbody>
                </table>
            `;
            return result;
        };
    
        const after_render = async function () {
    
        }
    
        return {
            render,
            after_render
        }
    })();
});