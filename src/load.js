document.getElementById('username-list').onchange = function(){
    var file = this.files[0];
    var reader = new FileReader();
    reader.onload = function(progressEvent){
        var usernames = this.result.split('\n');
    };
    reader.readAsText(file);
};