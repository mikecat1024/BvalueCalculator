var FormCount = 4
var parent = document.getElementById('form_area');
var clanname = []

for(let i = 0; i < FormCount; i++){
    clanname.push('Clan'+i);
}

function AddForm(){
    for(let i = 0; i < 2; i++){
        var input = document.createElement('li');
        input.innerHTML = '<input type="text" id="inputform' + FormCount + '" placeholder="Clan' + FormCount +'">';
        var parent = document.getElementById('form_area');
        parent.appendChild(input);
        clanname.push('Clan'+i);
        FormCount++;
    }
}

function DeleteForm(){
    for(let i = 0; i < 2; i++){
        var DeleteCount = FormCount-1;
        var parent = document.getElementById('form_area');
        var target = document.getElementById('inputform' + DeleteCount);
        target.remove();
        clanname.pop();
        FormCount--;
    }
}

function ClanName(){
    var schedule = document.getElementById('schedule');
    var inner = ""
    for(let i = 0; i < FormCount; i++){
        const clan = document.getElementById('inputform'+i);
        clanname[i] = clan.value;
    }
    for(let i = 1; i < FormCount; i++){ //week
        console.log(i);
        inner += "<li><ul class=\"week\"><p>week" + i + "<p>";
        for(let j = 0; j < FormCount; j++){ //match
            if(j%2==1){
                inner += "<div>draw</div>"
            } else {
                inner += "<li class=\"match\">"
            }
            inner += "<div id=\"Week" + i + "Clan"+ j%FormCount + "\">" + clanname[j%FormCount] + "</div>";
            if(j%2==1){
                inner += "</li>"
            }
        }
        inner += "</ul></li>";
        console.log(inner);
        var input = document.createElement('li');
        input.innerHTML = inner;
        schedule.appendChild(input);
        inner = ""
    }
}