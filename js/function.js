var clan_number = 4
document.getElementById("clan-number").textContent = clan_number
var week_number, match_number

function add_clan(){
    clan_number++
    document.getElementById("clan-number").textContent = clan_number
}

function subtract_clan(){
    if(clan_number == 2){
        alert("Set the number of clans to be greater than one.")
        return 0
    }
    clan_number--
    document.getElementById("clan-number").textContent = clan_number
}

function input_HTML(week, match, str){
    var HTML = "<input type=\"text\" id=\"week" + week + "match" + match + str + "\" placeholder=\"clan name\">"
    return HTML
}

function match_HTML(week, match){
    var HTML = "<li class=\"match\">"
        HTML += "<ul>"
            HTML += "<li>" + input_HTML(week, match, "-winner") + "</li>"
            HTML += "<li id=\"week" + week + "match" + match + "\" class=\"defeat\" onclick=\"change_tie_defeat()\">defeats</li>"
            HTML += "<li>" + input_HTML(week, match, "-loser") + "</li>"
        HTML += "</ul>"
    HTML += "</li>"
    return HTML
}

function week_HTML(week){
    var HTML = "<p>week" + week + "</p>"
    HTML += "<ul id=\"week" + week + "\" class=\"week-unit\">"
    for(var match = 0; match < match_number; match++){
        HTML += match_HTML(week, match)
    }
    HTML += "</ul>"
    return HTML
}

function set_button(){
    document.getElementById("calc-button-area").classList.remove("hidden")
}

function reset(id){
    var schedule = document.getElementById(id)
    var empty = schedule.cloneNode(false)
    schedule.parentNode.replaceChild(empty, schedule)
}

function set_schedule(){
    set_button()
    reset("schedule")
    week_number = clan_number-!(clan_number%2)
    match_number = Math.floor(clan_number/2)

    var HTML = document.createElement('ul')
    HTML.id="weeks"
    for(var week = 1; week <= week_number; week++){
        HTML.innerHTML += "<li class=\"week\">" + week_HTML(week) + "</li>"
        if(week%4 == 0) HTML.innerHTML += "<br>"
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

function validate(){
    var clan_name = get_name_map()

    if(Object.keys(clan_name).includes("")){
        alert("Enter the name of clans")
        return false
    }

    var matches = {}
    for(var week = 1; week <= week_number; week++){
        var clans = {}
        for(var match = 0; match < match_number; match++){
            var winner_id = "week" + week + "match" + match + "-winner"
            var loser_id = "week" + week + "match" + match + "-loser"
            var winner = document.getElementById(winner_id)
            var loser = document.getElementById(loser_id)
            if(winner.value == loser.value){
                alert("Winner is equal to loser.")
                return false
            }
            clans[winner.value] = 1
            clans[loser.value] = 1
            matches[winner.value + '-' + loser.value] = 1
        }
        if(Object.keys(clans).length != 2*match_number){
            alert("Some clans are duplicated.")
            return false
        }
    }
    if(Object.keys(matches).length != week_number*match_number){
        alert("Some matches are duplicated.")
        return false
    }

    if(Object.keys(clan_name).length != clan_number){
        alert("the numbers of clan is not equal to the number of names of clan")
        return false
    }
    else {
        return true
    }
}

function is_tie(id){
    var match = document.getElementById(id)
    if("tie" == match.classList[0]) return true
    else return false
}

function is_bye(id){
    var match = document.getElementById(id)
    if("freewin" == match.classList[0]) return true
    else return false
}

function set_result(start_values, end_values){
    reset('result-area')
    HTML  = document.createElement('div')
    HTML.id = "result"
    HTML.innerHTML += "<p id=\"result-title\">B-value</p>"
    for(var i = 0; i < clan_number; i++){
        clan =  Object.keys(start_values)[i]
        HTML.innerHTML += "<p class=\"result-detail\">" + clan + " : " + (start_values[clan] + end_values[clan])/2 + "</p>"
    }
    document.getElementById('result-area').appendChild(HTML)
}

function calc_value(){
    if(!validate()) return 0
    var start_values = get_name_map()
    var end_values = get_name_map()
    for(var week = 1; week <= week_number; week++){
        for(var match = 0; match < match_number; match++){
            if(is_tie("week" + week + "match" + match)){
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
            if(is_tie("week" + week + "match" + match)){
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

    var type = ['defeat', 'tie']
    for(var i = 0; i < type.length; i++){
        if(type[i] == target.classList[0]){
            target.classList.toggle(type[i])
            target.classList.toggle(type[(i+1)%type.length])
            target.textContent = type[(i+1)%type.length] + 's'
            break
        }
    }
}

set_schedule()