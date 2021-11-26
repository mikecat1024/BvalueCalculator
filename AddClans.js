var FormCount = 4
var parent = document.getElementById('form_area');
var clanname = []

function AddForm(){
    var input = document.createElement('li');
    input.innerHTML = '<input type="text" id="inputform' + FormCount + '" value="Clan' + FormCount +'">';
    var parent = document.getElementById('form_area');
    parent.appendChild(input);
    clanname.push('Clan'+i);
    FormCount++;
}

function DeleteForm(){
    var DeleteCount = FormCount-1;
    var parent = document.getElementById('form_area');
    var target = document.getElementById('inputform' + DeleteCount);
    target.remove();
    clanname.pop();
    FormCount--;
}

function WeekMatch(w, firstnum, secondnum){
    ret = "<li class=\"match\"><div id=\"Week" + w + "Clan"+ firstnum + "-" + secondnum + "\" onclick=\"Win()\">" + clanname[firstnum] + "</div>";
    ret += "<div id = \"Week" + w + "Draw" + firstnum + "-"+ secondnum + "\" onclick=\"Draw()\">draw</div>";
    ret += "<div id=\"Week" + w + "Clan"+ secondnum + "-" + firstnum + "\" onclick=\"Win()\">" + clanname[secondnum] + "</div></li>";
    return ret;
}
function WeekMatchSample(w, firstnum, secondnum){
    ret = "<li class=\"match\"><div id=\"Week" + w + "Clan"+ firstnum + "-" + secondnum + "\">" + clanname[firstnum] + "</div>";
    ret += "<div id = \"Week" + w + "Draw" + firstnum + "-"+ secondnum + "\">draw</div>";
    ret += "<div id=\"Week" + w + "Clan"+ secondnum + "-" + firstnum + "\">" + clanname[secondnum] + "</div></li>";
    return ret;
}
function Schedule(){
    var schedule = document.getElementById('schedule');
    var clone = schedule.cloneNode( false );
    schedule.parentNode.replaceChild( clone , schedule );
    GetSchedule(WeekMatch);
    document.getElementById('button_area').remove();
    document.getElementById('OK').classList.remove('hidden')
}

function Sample(){
    var schedule = document.getElementById('schedule');
    var clone = schedule.cloneNode( false );
    schedule.parentNode.replaceChild( clone , schedule );
    GetSchedule(WeekMatchSample);
}

function GetSchedule(WM){ // 我ながらこの書き方はどうかと思う（が、とりあえず使えるようにしたいので放置）
    var schedule = document.getElementById('schedule');
    var inner = ""
    for(let i = 0; i < FormCount; i++){
        const clan = document.getElementById('inputform'+i);
        clanname[i] = clan.value;
    }
    if(FormCount%2 == 0){
        for(let i = 1; i < FormCount; i++){
            inner += "<li><ul class=\"week\"><p>week" + i + "<p>";
            inner += WM(i, 0, i);
            var firstclan = i+1, secondclan = FormCount+i-2;
            if(secondclan >= FormCount) secondclan = secondclan%FormCount+1; 
            for(var j = 0; j < FormCount/2-1; j++, firstclan++, secondclan--){
                if(firstclan == FormCount) firstclan = 1;
                if(secondclan == 0) secondclan = FormCount-1;
                inner += WM(i, firstclan, secondclan);
            }
            inner += "</ul></li>";
            var input = document.createElement('li');
            input.innerHTML = inner;
            schedule.appendChild(input);
            inner = ""
        }
    } else {
        for(var week = 1; week <= FormCount; week++){
            inner += "<li><ul class=\"week\"><p>week" + week + "<p>";
            for(var i = 0; i < (FormCount-1)/2; i++){
                inner += WM(week, (i+week-1)%FormCount, (2*FormCount-i-2+week)%FormCount);
            }
            inner += "</ul></li>";
            var input = document.createElement('li');
            input.innerHTML = inner;
            schedule.appendChild(input);
            inner = ""
        }
    }
}

var win = []

for(var i = 0; i < 100; i++){
    var tmp = []
    win.push(tmp);
}

function reverse(s){
    return s.split("").reverse().join("");
}

function Win(e){
    var e = e || window.event;
    var target = e.target || e.srcElement;
    week = target.id.split('Clan')[0].split('Week')[1];

    if(target.id.split('Clan').length == 2){
        var rev = reverse(target.id.split('Clan')[1]);
        for (var i = 0; i < win[week].length; i++){
            if(rev == win[week][i]){
                alert("invalid action!");
                return;
            }
        }
    }

    var new_win = []
    var is_contained = false;
    for(var i = 0; i < win[week].length; i++){
        if(win[week][i] != target.id.split('Clan')[1]){
            new_win.push(win[week][i]);
        } else {
            is_contained = true;
        }
    }
    win[week] = new_win;

    target.classList.toggle('green')

    if(!is_contained){
        win[week].push(target.id.split('Clan')[1]);
    }
}

function Draw(e){
    var e = e || window.event;
    var target = e.target || e.srcElement;
    target.classList.toggle('gray');
}

function Calc(){
    var result = document.getElementById('result');
    var clone = result.cloneNode( false );
    result.parentNode.replaceChild( clone , result );
    Calculate();
}

function Calculate() {
    var result = document.getElementById('result');

    var values = [];
    values.push([]);
    values.push([]);
    for(var i = 0; i < FormCount+1; i++){
        values[0].push(1);
        values[1].push(1);
    }
    for(var i = 1; i < FormCount+(FormCount%2); i++){
        for(var j = 0; j < win[i].length; j++){
            winner = win[i][j].split('-')[0];
            loser = win[i][j].split('-')[1];
            winner_value = values[0][winner];
            loser_value = values[0][loser];
            values[0][winner] = winner_value + (loser_value/(2*(FormCount-1)));
            values[0][loser] = loser_value - (1/(winner_value*(2*(FormCount-1))));
        }
    }
    for(var i = FormCount-1+(FormCount%2); i > 0; i--){
        for(var j = 0; j < win[i].length; j++){
            winner = win[i][j].split('-')[0];
            loser = win[i][j].split('-')[1];
            winner_value = values[1][winner];
            loser_value = values[1][loser];
            values[1][winner] = winner_value + (loser_value/(2*(FormCount-1)));
            values[1][loser] = loser_value - (1/(winner_value*(2*(FormCount-1))));
        }
    }
    var Bvalues = [];
    for(var i = 0; i < FormCount; i++){
        Bvalues.push((values[0][i] + values[1][i])/2);
    }
    var inner = "<ul>";
    for(var i = 0; i < FormCount; i++){
        inner += "<li><p>" + clanname[i] +"'s B-value is " + Bvalues[i] +"</p></li>"
    }
    inner += "</ul>"
    var input = document.createElement('div');
    input.innerHTML = inner;
    result.appendChild(input);
}
