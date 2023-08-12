var name1 = localStorage.getItem(1);//name of the player
var score = localStorage.getItem(2);//score of player
const name3 = parseInt(localStorage.getItem(3));//only sec of player
const record = parseInt(localStorage.getItem(4));//true if played atleast once

    if(name3 <= 20){
        if(name3<record){
            //overriding on h2 tag with innerhtml
            document.getElementById('recrdMessage').innerHTML="NEW RECORD";
            document.getElementById('victMessage').innerHTML="YOU WON!";
            document.getElementById('victMessage').classList.add("win");
            document.getElementById('name3').innerHTML="New High Score is "+score+" sec";
            document.getElementById('name2').innerHTML="You're doing WONDERFUL.. Play Again..!";
            //updating record
            localStorage.setItem(4,name3);
            localStorage.setItem(5,name1);
        }
        else{
            //showing present score
            document.getElementById('victMessage').innerHTML="YOU WON!";
            document.getElementById('victMessage').classList.add("win");
            document.getElementById('name3').innerHTML="goal achived in "+score+" sec";
            document.getElementById('name2').innerHTML="You're doing GOOD... Play Again..!";
        }
    }
    else{
        document.getElementById('victMessage').innerHTML="TIME UP!";
    }
