//Getting the variables from the previous highest score - not works afer
const highScore = localStorage.getItem(4);
const highScoreName = localStorage.getItem(5);

if(highScoreName === 'norecord' || highScoreName === null){
    document.getElementById('hscore').style.visibility = 'none';
    document.getElementById('hname').innerHTML = 'No Previous Record';
}else{
document.getElementById('hname').innerHTML='Name : ' + highScoreName;
document.getElementById('hscore').innerHTML='Time :  ' + highScore + ' sec';
}
function testJS(){
    var x = document.querySelector('input').value;
    // const y = localStorage.getItem(5)
    localStorage.setItem(1, x);
}

function reset(){
    localStorage.setItem(5,'norecord')
    localStorage.setItem(4,100);
    location.replace("index.html");
}