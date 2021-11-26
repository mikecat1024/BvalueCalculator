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

function input_HTML(week, match, str){
    var HTML = "<input type=\"text\" id=\"week" + week + "match" + match + str + "\">"
    return HTML
}

function match_HTML(week, match){
    var HTML = "<li class=\"match\">"
        HTML += "<div>" + input_HTML(week, match, "-winner") + "</div>"
        HTML += "<div>defeat</div>"
        HTML += "<div>" + input_HTML(week, match, "-loser") + "</div>"
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

function set_button(){
    document.getElementById("calc-button-area").classList.remove("hidden")
}

function reset_schedule(){
    var schedule = document.getElementById("schedule")
    var empty = schedule.cloneNode(false)
    schedule.parentNode.replaceChild(empty, schedule)
}

function set_schedule(){
    set_button()
    reset_schedule()
    week_number = clan_number-!(clan_number%2)
    match_number = Math.floor(clan_number/2)

    var HTML = document.createElement('ul')
    for(var week = 1; week <= week_number; week++){
        HTML.innerHTML += "<li>" + week_HTML(week) + "</li>"
    }
    document.getElementById("schedule").appendChild(HTML);
}

function check_name(){
    var clan_name = {}
    for(var week = 1; week <= week_number; week++){
        for(var match = 0; match < match_number; match++){
            console.log(match)
            var winner_id = "week" + week + "match" + match + "-winner"
            var loser_id = "week" + week + "match" + match + "-loser"
            var winner = document.getElementById(winner_id)
            var loser = document.getElementById(loser_id)
            clan_name[winner.value] = true
            clan_name[loser.value] = true
        }
    }
    if(Object.keys(clan_name).length != clan_number){
        alert("the numbers of clan is not equal to the number of names of clan")
    }
}

function calc_value(){
    check_name()
}

