$(document).ready(function(){
    //ON LOAD
    $("#billPage").hide();
    $("#memberPage").hide();
    $("#senatorsByState").hide();
    $("#learn").hide();
    $(".collContent").hide();
    $( "#menu" ).menu();
    $("#learnPage").on("click", function(){
        $("#billPage").hide();
        $("#memberPage").hide();
        $("#senatorsByState").hide();
        $("#learn").show();
    });

    $("#menuText").on("click", function(){
        $("#billPage").hide();
        $("#memberPage").hide();
        $("#senatorsByState").hide();
        $("#learn").hide();
        $(".collContent").hide();
    });

    //MEMBERS
    $("#search").on("click", function(){
        console.log(document.getElementById("congress").value);
        if (document.getElementById("congress").value === ""){
            $("#members").hide();
            document.getElementById("error").innerHTML = "Please enter a valid year of congress.";
        }else{
            document.getElementById("error").innerHTML = "";
            $("#members").show();
            document.getElementById("members").innerHTML = "<tr>\n" +
                "        <th>Name</th>\n" +
                "        <th>ID</th>\n" +
                "        <th>Title</th>\n" +
                "        <th>Party</th>\n" +
                "        <th>State</th>\n" +
                "        <th>Years in Office</th>\n" +
                "        <th>Contact Information</th>\n" +
                "    </tr>";
            membersApi(document.getElementById("congress").value, document.getElementById("chamber").value);
        }
    });

    $("#mem").on("click", function(){
        $("#billPage").hide();
        $("#learn").hide();
        $("#senatorsByState").hide();
        $("#memberPage").show();

    });

    $("#byState").on("click", function(){
        $("#billPage").hide();
        $("#learn").hide();
        $("#memberPage").hide();
        $("#senatorsByState") .show();
    });

    $("#state").on("click", function(){
        senatorsByState(document.getElementById("st").value);
    });

    $("#state2").on("click", function(){
        repsByDistrict(document.getElementById("st2").value, document.getElementById("district").value);
    });

    function membersApi(congress, chamber) {
        url = "https://api.propublica.org/congress/v1/"+ congress + "/" + chamber + "/members.json";
        $.ajax({
            url: url,
            method: 'GET',
            headers: {'X-API-Key':'OQThYfNgke0bR1QwkP1iMpV12xynMIyZr3HkBRdZ'}
        }).done(function (result) {
            console.log(result);
            displayMembers(result);
        }).fail(function (err) {
            throw err;
        });
    }

    function displayMembers(result){
        for (i = 0; i < result.results[0].num_results; i++){
            document.getElementById("members").innerHTML += "<tr id='" + i +"'><td>" + result.results[0].members[i].first_name + " " + result.results[0].members[i].last_name + "</td><td>"
            + result.results[0].members[i].id + "</td><td>" + result.results[0].members[i].title + "</td><td>" + result.results[0].members[i].party + "</td><td>"
                + result.results[0].members[i].state + "</td><td>" + result.results[0].members[i].seniority + "</td><td>" + "Phone number: " + result.results[0].members[i].phone + "<br>" + "Twitter: " + result.results[0].members[i].twitter_account + "</td></tr>";
        }
        for (i = 0; i < result.results[0].num_results; i++){
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

    function repsByDistrict(state, district){
        url = "https://api.propublica.org/congress/v1/members/house/" + state + "/" + district + "/current.json";
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
            "        <th>Name</th>\n" +
            "        <th>ID</th>\n" +
            "        <th>Next Election</th>\n" +
            "        <th>Party</th>\n" +
            "        <th>Role</th>\n" +
            "        <th>Years in Office</th>\n" +
            "        <th>Contact Information</th>\n" +
            "    </tr>";
        for (i = 0; i < result.results.length; i++){
            document.getElementById("tbl").innerHTML += "<tr id='row"+ i + "'><td>" + result.results[i].name + "</td><td>"+ result.results[i].id +"</td><td>" +
                result.results[i].next_election + "</td><td>" + result.results[i].party +"</td><td>" + result.results[i].role + "</td><td>" +
                result.results[i].seniority + "</td><td>Twitter: " + result.results[i].twitter_id + "</td></tr>";
        }
        for (i = 0; i < result.results.length; i++){
            if (result.results[i].party === "D"){
                document.getElementById("row" + i).style.backgroundColor = "#40bf40";
            }else if (result.results[i].party === "R"){
                document.getElementById("row" + i).style.backgroundColor = "#ff471a";
            }else {
                document.getElementById("row" + i).style.backgroundColor = "yellow";
            }
        }
    }

    function repsByState(result){
        document.getElementById("tbl2").innerHTML = "<tr>\n" +
            "        <th>Name</th>\n" +
            "        <th>ID</th>\n" +
            "        <th>Next Election</th>\n" +
            "        <th>Party</th>\n" +
            "        <th>Role</th>\n" +
            "        <th>Years in Office</th>\n" +
            "        <th>Contact Information</td>\n" +
            "    </tr>";
        for (i = 0; i < result.results.length; i++){
            document.getElementById("tbl2").innerHTML += "<tr id='"+ i + "'><td>" + result.results[i].name + "</td><td>"+ result.results[i].id +"</td><td>" +
                result.results[i].next_election + "</td><td>" + result.results[i].party +"</td><td>" + result.results[i].role + "</td><td>" +
                result.results[i].seniority + "</td><td>Twitter: " + result.results[i].twitter_id + "</td></tr>";
        }
        for (i = 0; i < result.results.length; i++){
            if (result.results[i].party === "D"){
                document.getElementById(i).style.backgroundColor = "#40bf40";
            }else if (result.results[i].party === "R"){
                document.getElementById(i).style.backgroundColor = "#ff471a";
            }else {
                document.getElementById(i).style.backgroundColor = "yellow";
            }
        }
    }

    $("#theState").on("click", function(){
        var state = document.getElementById("st2").value;
        findDistrict(state);
    });

    function findDistrict(state){
        var num = "";
        if (state === "AL"){
            num = "7";
        }else if(state === "AK"){
            num = "1";
        }else if(state==="AZ"){
            num = "9";
        }else if(state==="AR"){
            num = "4";
        }else if(state==="CA"){
            num = "53";
        }else if(state==="CO"){
            num = "7";
        }else if(state==="CT"){
            num = "5";
        }else if(state==="DE"){
            num = "1";
        }else if(state==="FL"){
            num = "27";
        }else if(state==="GA"){
            num = "14";
        }else if(state==="HI"){
            num = "2";
        }else if(state==="ID"){
            num = "2";
        }else if(state==="IL"){
            num = "18";
        }else if(state==="IA"){
            num = "4";
        }else if(state==="KS"){
            num = "4";
        }else if(state==="KY"){
            num = "6";
        }else if(state==="LA"){
            num = "6";
        }else if(state==="ME"){
            num = "2";
        }else if(state==="MA"){
            num = "9";
        }else if(state==="MI"){
            num = "14";
        }else if(state==="MN"){
            num = "8";
        }else if(state==="MS"){
            num = "4";
        }else if(state==="MO"){
            num = "8";
        }else if(state==="MT"){
            num = "1";
        }else if(state==="NE"){
            num = "3";
        }else if(state==="NV"){
            num = "4";
        }else if(state==="NH"){
            num = "2";
        }else if(state==="NJ"){
            num = "12";
        }else if(state==="NM"){
            num = "3";
        }else if(state==="NY"){
            num = "27";
        }else if(state==="NC"){
            num = "13";
        }else if(state==="ND"){
            num = "1";
        }else if(state==="OH"){
            num = "16";
        }else if(state==="OK"){
            num = "5";
        }else if(state==="OR"){
            num = "5";
        }else if(state==="PA"){
            num = "18";
        }else if(state==="RI"){
            num = "2";
        }else if(state==="SC"){
            num = "7";
        }else if(state==="SD"){
            num = "1";
        }else if(state==="TN"){
            num = "9";
        }else if(state==="TX"){
            num = "36";
        }else if(state==="UT"){
            num = "4";
        }else if(state==="VT"){
            num = "1";
        }else if(state==="VA"){
            num = "11";
        }else if(state==="WA"){
            num = "10";
        }else if(state==="WV"){
            num = "3";
        }else if(state==="WI"){
            num = "8";
        }else if(state==="WY"){
            num = "1";
        }
        for (i = 0; i < num; i++){
            document.getElementById("district").innerHTML += "<option value='" + (i+1) + "'>" + (i+1) + "</option>";
        }
    }


    //BILLS

    $("#bills").on("click", function(){
        $("#memberPage").hide();
        $("#senatorsByState").hide();
        $("#learn").hide();
        $("#billPage").show();
        $("#billInfo").hide();
        $("#billInfo2").hide();
    });

    $("#billQuerySearch").on("click", function(){
        $("#billInfo2").hide();
        document.getElementById("body").innerHTML = "";
        billsApi1(document.getElementById("billQuery").value, document.getElementById("sort").value);
    });

    // $("#specificMemberSearch").on("click", function(){
    //     $("#billInfo").hide();
    //     // membersApi("115", "senate");
    //     document.getElementById("body2").innerHTML = "";
    //     billsApi2(document.getElementById("specificMember").value, "introduced");
    // });

    function billsApi1(query, sortBy){
        url = "https://api.propublica.org/congress/v1/bills/search.json?query=" + query + "&sort=" + sortBy + "&";
            $.ajax({
            url: url,
            method: 'GET',
            headers: {'X-API-Key':'OQThYfNgke0bR1QwkP1iMpV12xynMIyZr3HkBRdZ'}
        }).done(function (result) {
            console.log(result);
            displayBills(result);
        }).fail(function (err) {
            throw err;
        });
    }

    // function billsApi2(member, type){
    //     url = "https://api.propublica.org/congress/v1/members/"+ member +"/bills/"+ type +".json";
    //     $.ajax({
    //         url: url,
    //         method: 'GET',
    //         headers: {'X-API-Key':'OQThYfNgke0bR1QwkP1iMpV12xynMIyZr3HkBRdZ'}
    //     }).done(function (result) {
    //         console.log(result);
    //         displayBills2(result);
    //     }).fail(function (err) {
    //         throw err;
    //     });
    // }

    function displayBills(result){
        $("#billInfo").show();
        for(i = 0; i < result.results[0].bills.length; i++) {
            document.getElementById("body").innerHTML += "<tr class='billRow' id='" + i + "'><td>" + result.results[0].bills[i].number + "</td><td>" +
                result.results[0].bills[i].sponsor_title + " " + result.results[0].bills[i].sponsor_name + "</td><td>" + result.results[0].bills[i].title + "</td><td>" +
                result.results[0].bills[i].committees + "</td></tr>";
        }
    }

    // function displayBills2(result){
    //     $("#billInfo2").show();
    //     for(i = 0; i < result.results[0].bills.length; i++) {
    //         document.getElementById("body2").innerHTML += "<tr class='billRow' id='" + i + "'><td>" + result.results[0].bills[i].number + "</td><td>" +
    //             result.results[0].bills[i].sponsor_title + " " + result.results[0].bills[i].sponsor_name + "</td><td>" + result.results[0].bills[i].title + "</td><td>" +
    //             result.results[0].bills[i].committees + "</td></tr>";
    //     }
    // }


//LEARN PAGE



});
