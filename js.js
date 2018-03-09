$(document).ready(function(){
    $("#search").on("click", function(){
        document.getElementById("members").innerHTML = "<tr>\n" +
            "        <td>Name</td>\n" +
            "        <td>ID</td>\n" +
            "        <td>Title</td>\n" +
            "        <td>Party</td>\n" +
            "        <td>State</td>\n" +
            "        <td>Years in office</td>\n"+
            "        <td>Contact Information</td>\n" +
            "    </tr>";
        listMembers(document.getElementById("congress").value, document.getElementById("chamber").value);

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
                + result.results[0].members[i].state + "</td><td>" + result.results[0].members[i].seniority + "</td><td>Phone number: " + result.results[0].members[i].phone + "<br>" + "Twitter: " + result.results[0].members[i].twitter_account + "</td></tr>";
        }
        for (i=0; i<99; i++){
            if (result.results[0].members[i].party === "D"){
                document.getElementById(i).style.backgroundColor = "#40bf40";
            }else{
                document.getElementById(i).style.backgroundColor = "#ff471a";

            }
        }
    }


});