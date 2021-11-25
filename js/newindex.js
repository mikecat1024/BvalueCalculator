var clan_number = 4
document.getElementById("clan-number").textContent = clan_number
var week_number, match_number

function add_clan(){
    clan_number++
    document.getElementById("clan-number").textContent = clan_number
}

function subtract_clan(){
    clan_number--
    document.getElementById("clan-number").textContent = clan_number
}

function match_HTML(week, match){
    var HTML = "<li class=\"match\">"
        HTML += "<div id=\"week" + week + "match" + match + "-winner\">"
        HTML += "</div>"
        HTML += "<div>defeat</div>"
        HTML += "<div id=\"week" + week + "match" + match + "-loser\">"
        HTML += "</div>"
    HTML += "</li>"
    return HTML
}

function week_HTML(week){
    var HTML = "<p>week" + week + "</p>"
    HTML += "<ul id=\"week" + week + "\">"
    for(var match = 0; match < match_number; match++){
        HTML += match_HTML(week, match)
    }
    HTML += "</ul>"
    return HTML
}

function set_schedule(){
    week_number = clan_number-!(clan_number%2)
    match_number = Math.floor(clan_number/2)

    var HTML = document.createElement('ul')
    for(var week = 1; week <= week_number; week++){
        HTML.innerHTML += "<li>" + week_HTML(week) + "</li>"
    }
    document.getElementById("schedule-area").appendChild(HTML);
}

