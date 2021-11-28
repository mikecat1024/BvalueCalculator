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
        HTML += "<div id=\"week" + week + "match" + match + "\" class=\"defeat\" onclick=\"change_tie_defeat()\">defeats</div>"
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

function get_name_map(){
    var map = {}
    for(var week = 1; week <= week_number; week++){
        for(var match = 0; match < match_number; match++){
            var winner_id = "week" + week + "match" + match + "-winner"
            var loser_id = "week" + week + "match" + match + "-loser"
            var winner = document.getElementById(winner_id)
            var loser = document.getElementById(loser_id)
            map[winner.value] = 1
            map[loser.value] = 1
        }
    }
    return map
}

function check_name(){
    var clan_name = get_name_map()
    if(Object.keys(clan_name).length != clan_number){
        alert("the numbers of clan is not equal to the number of names of clan")
        return false
    } else {
        return true
    }
}

function is_ties(id){
    var match = document.getElementById(id)
    if("tie" == match.classList[0]) return true
    else return false
}

function set_result(start_values, end_values){
    HTML  = document.createElement('div')
    for(var i = 0; i < clan_number; i++){
        clan =  Object.keys(start_values)[i]
        HTML.innerHTML += "<p>" + clan + " : " + (start_values[clan] + end_values[clan])/2 + "</p>"
    }
    document.getElementById('result-area').appendChild(HTML)
}

function calc_value(){
    // if(!check_name()) return 0
    var start_values = get_name_map()
    var end_values = get_name_map()
    for(var week = 1; week <= week_number; week++){
        for(var match = 0; match < match_number; match++){
            if(is_ties("week" + week + "match" + match)){
                continue
            }
            var winner_id = "week" + week + "match" + match + "-winner"
            var loser_id = "week" + week + "match" + match + "-loser"
            var winner = document.getElementById(winner_id)
            var loser = document.getElementById(loser_id)
            var winner_value = start_values[winner.value]
            var loser_value = start_values[loser.value]

            start_values[winner.value] = winner_value + (loser_value/(2*week_number))
            start_values[loser.value] = loser_value - (1/(winner_value*2*week_number))
        }
    }
    for(var week = week_number; week >= 1; week--){
        for(var match = 0; match < match_number; match++){
            if(is_ties("week" + week + "match" + match)){
                continue
            }
            var winner_id = "week" + week + "match" + match + "-winner"
            var loser_id = "week" + week + "match" + match + "-loser"
            var winner = document.getElementById(winner_id)
            var loser = document.getElementById(loser_id)
            var winner_value = end_values[winner.value]
            var loser_value = end_values[loser.value]

            end_values[winner.value] = winner_value + (loser_value/(2*week_number))
            end_values[loser.value] = loser_value - (1/(winner_value*2*week_number))
        }
    }
    set_result(start_values, end_values)
}

function change_tie_defeat(){
    var e = e || window.event
    var target = e.target || e.srcElement;

    if('defeat' == target.classList[0]){
        target.textContent = "ties"
    } else {
        target.textContent = "defeats"
    }

    target.classList.toggle('tie')
    target.classList.toggle('defeat')
}
