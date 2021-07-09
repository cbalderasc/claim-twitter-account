document.getElementById('username-list').onchange = function(){
    var file = this.files[0];
    var reader = new FileReader();
    reader.onload = function(progressEvent){
        var usernames = this.result.split('\n');
        let list = document.getElementById("list-rendered-inner");

        for(var i = 0; i < usernames.length; i++) {
            let element = document.createElement('li');
            element.innerHTML = usernames[i];
            list.append(element);
        }

        let button = document.createElement('button');
        button.setAttribute("id", "process-list");
        button.innerText = "Procesar";
        document.getElementById("list-rendered").append(button);
        document.getElementById("list-rendered").setAttribute("style", "display: block");
    };
    reader.readAsText(file);
};