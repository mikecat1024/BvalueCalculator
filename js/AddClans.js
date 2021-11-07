var FormCount = 4
var parent = document.getElementById('form_area');
var clanname = []

function AddForm(){
    for(let i = 0; i < 2; i++){
        var input = document.createElement('li');
        input.innerHTML = '<input type="text" id="inputform' + FormCount + '" value="Clan' + FormCount +'">';
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

function WeekMatch(w, firstnum, secondnum){
    ret = "<li class=\"match\"><div id=\"Week" + w + "Clan"+ firstnum + "-" + secondnum + "\" onclick=\"Win()\">" + clanname[firstnum] + "</div>";
    ret += "<div id = \"Week" + w + "Draw" + firstnum + "-"+ secondnum + "\" onclick=\"Win()\">draw</div>";
    ret += "<div id=\"Week" + w + "Clan"+ secondnum + "-" + firstnum + "\" onclick=\"Win()\">" + clanname[secondnum] + "</div></li>";
    return ret;
}

function ClanName(){
    var schedule = document.getElementById('schedule');
    var inner = ""
    for(let i = 0; i < FormCount; i++){
        const clan = document.getElementById('inputform'+i);
        clanname[i] = clan.value;
    }
    for(let i = 1; i < FormCount; i++){
        inner += "<li><ul class=\"week\"><p>week" + i + "<p>";
        inner += WeekMatch(i, 0, i);
        var firstclan = i+1, secondclan = FormCount+i-2;
        if(secondclan >= FormCount) secondclan = secondclan%FormCount+1; 
        for(var j = 0; j < FormCount/2-1; j++, firstclan++, secondclan--){
            if(firstclan == FormCount) firstclan = 1;
            if(secondclan == 0) secondclan = FormCount-1;
            inner += WeekMatch(i, firstclan, secondclan);
        }
        inner += "</ul></li>";
        var input = document.createElement('li');
        input.innerHTML = inner;
        schedule.appendChild(input);
        inner = ""
    }
    var input = document.createElement('div');
    inner = "<input type=\"button\" value=\"決定\" onclick=\"Calc()\"></input>"
    input.innerHTML = inner;
    var parent = document.getElementById('wins');
    parent.appendChild(input);
    document.getElementById('button_area').remove();
}

var win = []

for(var i = 0; i < FormCount-1; i++){
    var tmp = []
    win.push(tmp);
}

function Win(e){
    var e = e || window.event;
    var target = e.target || e.srcElement;
    target.classList.toggle('green');
    week = target.id.split('Clan')[0].split('Week')[1];
    if(target.id.split('Clan').length == 2){
        win[week].push(target.id.split('Clan')[1]);
    }
}

function Calc() {
    var before_values = [], after_values = [];
    for(var i = 0; i < FormCount; i++){
        before_values.push(1);
        after_values.push(1);
    }
    for(var i = 1; i < FormCount; i++){
        var until = win[i].length;
        console.log(until);
        for(var j = 0; j < until; j++){
            winner = win[i][j].split('-');
            loser = win[i][j].split('-');
            console.log(winner);
        }
    }
}

