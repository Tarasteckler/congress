$(document).ready(function(){
    $("#memberPage").hide();
    $("#senatorsByState").hide();
    $("#search").on("click", function(){
        document.getElementById("members").innerHTML = "<tr>\n" +
            "        <td>Name</td>\n" +
            "        <td>ID</td>\n" +
            "        <td>Title</td>\n" +
            "        <td>Party</td>\n" +
            "        <td>State</td>\n" +
            "        <td>Years in Office</td>\n" +
            "        <td>Contact Information</td>\n" +
            "    </tr>";
        listMembers(document.getElementById("congress").value, document.getElementById("chamber").value);
    });

    $( "#menu" ).menu();

    $("#mem").on("click", function(){
        $("#senatorsByState").hide();
        $("#memberPage").show();

    });

    $("#byState").on("click", function(){
        $("#memberPage").hide();
        $("#senatorsByState") .show();
    });

    $("#state").on("click", function(){
        senatorsByState(document.getElementById("st").value);
    });


    function listMembers(congress, chamber) {
        url = "https://api.propublica.org/congress/v1/"+ congress + "/" + chamber + "/members.json";
        $.ajax({
            url: url,
            method: 'GET',
            headers: {'X-API-Key':'OQThYfNgke0bR1QwkP1iMpV12xynMIyZr3HkBRdZ'}
        }).done(function (result) {
            console.log(result);
            display(result);
        }).fail(function (err) {
            throw err;
        });
    }

    function display(result){
        for (i = 0; i < 99; i++){
            document.getElementById("members").innerHTML += "<tr id='" + i +"'><td>" + result.results[0].members[i].first_name + " " + result.results[0].members[i].last_name + "</td><td>"
            + result.results[0].members[i].id + "</td><td>" + result.results[0].members[i].title + "</td><td>" + result.results[0].members[i].party + "</td><td>"
                + result.results[0].members[i].state + "</td><td>" + result.results[0].members[i].seniority + "</td><td>" + "Phone number: " + result.results[0].members[i].phone + "<br>" + "Twitter: " + result.results[0].members[i].twitter_account + "</td></tr>";
        }
        for (i=0; i<99; i++){
            if (result.results[0].members[i].party === "D"){
                document.getElementById(i).style.backgroundColor = "#40bf40";
            }else{
                document.getElementById(i).style.backgroundColor = "#ff471a";

            }
        }
    }

    function senatorsByState(state){
        url = "https://api.propublica.org/congress/v1/members/senate/" + state + "/current.json";
        $.ajax({
            url: url,
            method: 'GET',
            headers: {'X-API-Key':'OQThYfNgke0bR1QwkP1iMpV12xynMIyZr3HkBRdZ'}
        }).done(function (result) {
            console.log(result);
            senBySt(result);
        }).fail(function (err) {
            throw err;
        });
    }


    function representativesByState(state){
        url = "https://api.propublica.org/congress/v1/members/senate/" + state + "/current.json";
        $.ajax({
            url: url,
            method: 'GET',
            headers: {'X-API-Key':'OQThYfNgke0bR1QwkP1iMpV12xynMIyZr3HkBRdZ'}
        }).done(function (result) {
            console.log(result);
            repsByState(result);
        }).fail(function (err) {
            throw err;
        });
    }

    function senBySt(result){
        document.getElementById("tbl").innerHTML = "<tr>\n" +
            "        <td>Name</td>\n" +
            "        <td>ID</td>\n" +
            "        <td>Next Election</td>\n" +
            "        <td>Party</td>\n" +
            "        <td>Role</td>\n" +
            "        <td>Years in Office</td>\n" +
            "        <td>Contact Information</td>\n" +
            "    </tr>";
        for (i=0; i<result.results.length; i++){
            document.getElementById("tbl").innerHTML += "<tr id='"+ i + "'><td>" + result.results[i].name + "</td><td>"+ result.results[i].id +"</td><td>" +
                result.results[i].next_election + "</td><td>" + result.results[i].party +"</td><td>" + result.results[i].role + "</td><td>" +
                result.results[i].seniority + "</td><td>Twitter: " + result.results[i].twitter_id + "</td></tr>";
        }
        for (i=0; i<result.results.length; i++){
            if (result.results[i].party === "D"){
                document.getElementById(i).style.backgroundColor = "#40bf40";
            }else if (result.results[i].party === "R"){
                document.getElementById(i).style.backgroundColor = "#ff471a";
            }else {
                document.getElementById(i).style.backgroundColor = "yellow";
            }
        }
    }

    function repsByState(result){
        document.getElementById("tbl2").innerHTML = "<tr>\n" +
            "        <td>Name</td>\n" +
            "        <td>ID</td>\n" +
            "        <td>Next Election</td>\n" +
            "        <td>Party</td>\n" +
            "        <td>Role</td>\n" +
            "        <td>Years in Office</td>\n" +
            "        <td>Contact Information</td>\n" +
            "    </tr>";
        for (i=0; i<result.results.length; i++){
            document.getElementById("tbl2").innerHTML += "<tr id='"+ i + "'><td>" + result.results[i].name + "</td><td>"+ result.results[i].id +"</td><td>" +
                result.results[i].next_election + "</td><td>" + result.results[i].party +"</td><td>" + result.results[i].role + "</td><td>" +
                result.results[i].seniority + "</td><td>Twitter: " + result.results[i].twitter_id + "</td></tr>";
        }
        for (i=0; i<result.results.length; i++){
            if (result.results[i].party === "D"){
                document.getElementById(i).style.backgroundColor = "#40bf40";
            }else if (result.results[i].party === "R"){
                document.getElementById(i).style.backgroundColor = "#ff471a";
            }else {
                document.getElementById(i).style.backgroundColor = "yellow";
            }
        }
    }
});
