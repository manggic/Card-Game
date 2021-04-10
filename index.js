let currentPlayer = "player";

document.getElementsByClassName("botBtn")[0].disabled = true;



let currentScore = 1

function yourTurn() {
  document.getElementsByClassName(`${currentPlayer}Btn`)[0].innerHTML =
        "Your Turn";
    
  document.getElementsByClassName(
    `${currentPlayer}Btn`
  )[0].style.backgroundColor = "red";

   console.log('currentPlayer', currentPlayer);
   if(currentPlayer === 'bot'){
       setTimeout( ()=> startRolling('bot')     , 1000 )
   }
}

yourTurn();

// will start rolling on Your Start button click 
function startRolling(name) {
    //console.log("current : ", name);
    let arrow;
  if (name === "player") {
     arrow = document.getElementById("playerArrow");
    console.log("arrow", arrow);
  } else {

    setTimeout(()=> pressClicked('bot')  , 2000)
     arrow = document.getElementById("botArrow");
    console.log("arrow", arrow);
  }

  arrow.classList.add("arrowRun");
  let running = arrow.style.animationPlayState === "running";
  arrow.style.animationPlayState = running ? "paused" : "running";
}


let playerTurnsOver = false
let botTurnsOver = false
let playerScores = []
let botScores  = []

let previousIndividualScore = "1";

//pressClicked();

function pressClicked(name) {

    
    if(document.getElementById(`${name}Arrow`).classList.contains('arrowRun') && name === currentPlayer  ){        
        console.log("pressed");
        
        if (name === "player") {
          document.getElementById("botArrow").classList.remove("arrowRun");
          arrow = document.getElementById("playerArrow");
          // arrow.classList.remove('arrowRun')
          currentPlayer = "bot";
      
          running = arrow.style.animationPlayState === "running";
          arrow.style.animationPlayState = running ? "paused" : "running";
          document.getElementsByClassName("playerBtn")[0].innerHTML = "Start";
          document.getElementsByClassName("playerBtn")[0].disabled = true;
          document.getElementsByClassName("playerBtn")[0].style.backgroundColor =
            "black";
          // document.getElementsByClassName('playerBtn')[0].style.opacity = 0.5
          document.getElementsByClassName("botBtn")[0].disabled = false;
        } else {
          document.getElementById("playerArrow").classList.remove("arrowRun");
          currentPlayer = "player";
          arrow = document.getElementById("botArrow");
          running = arrow.style.animationPlayState === "running";
          arrow.style.animationPlayState = running ? "paused" : "running";
          let st = window.getComputedStyle(arrow, null);
          document.getElementsByClassName("botBtn")[0].innerHTML = "Start";
          document.getElementsByClassName("botBtn")[0].disabled = true;
          //  document.getElementsByClassName('botBtn')[0].style.opacity = 0.5
          document.getElementsByClassName("playerBtn")[0].disabled = false;
          document.getElementsByClassName("botBtn")[0].style.backgroundColor =
            "black";
        }
        yourTurn();
        document.getElementById(previousIndividualScore).innerHTML = "";
      
        // arrow.classList.remove('arrowRun')
        arrow.style.animationPlayState = "paused";
      
        let st = window.getComputedStyle(arrow, null);
      
        try {
          let tr = st.getPropertyValue("transform");
          var values = tr.split("(")[1];
          values = values.split(")")[0];
          values = values.split(",");
          var a = values[0];
          var b = values[1];
          var c = values[2];
          var d = values[3];
      
          var scale = Math.sqrt(a * a + b * b);
      
          // arc sin, convert from radians to degrees, round
          // DO NOT USE: see update below
          var sin = b / scale;
          var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
      
          let random = Math.trunc(Math.random() * 100);
          console.log("random", random);
          // works!
          console.log("Rotate: " + Number(angle) + "deg");
      
          if (name === "player") {
            if (0 <= Number(angle) && Number(angle) <= 90) {
              console.log("id 2");
              document.getElementById("2").innerHTML = random;
              previousIndividualScore = "2";
            } else if (90 < Number(angle) && Number(angle) <= 180) {
              console.log("id 4");
              document.getElementById("4").innerHTML = random;
              previousIndividualScore = "4";
            } else if (-90 > Number(angle) && Number(angle) > -180) {
              console.log("id 3");
              document.getElementById("3").innerHTML = random;
              previousIndividualScore = "3";
            } else {
              console.log("id 1");
              document.getElementById("1").innerHTML = random;
              previousIndividualScore = "1";
            }

            document.getElementById(`player${currentScore}Score`).innerHTML = random
            playerScores.push(random)
            playerTurnsOver = true
          } else {
            if (0 <= Number(angle) && Number(angle) <= 90) {
              console.log("id 6");
              document.getElementById("6").innerHTML = random;
              previousIndividualScore = "6";
            } else if (90 < Number(angle) && Number(angle) <= 180) {
              console.log("id 8");
              document.getElementById("8").innerHTML = random;
              previousIndividualScore = "8";
            } else if (-90 > Number(angle) && Number(angle) > -180) {
              console.log("id 7");
              previousIndividualScore = "7";
              document.getElementById("7").innerHTML = random;
            } else {
              console.log("id 5");
              document.getElementById("5").innerHTML = random;
              previousIndividualScore = "5";
            }
            document.getElementById(`bot${currentScore}Score`).innerHTML = random
            botTurnsOver = true
            botScores.push(random)
          }

        } catch (err) {
          console.log("error", err);
      }
      
      if (playerTurnsOver && botTurnsOver) {
        currentScore += 1
        playerTurnsOver = false
        botTurnsOver = false
      }

      if (currentScore === 6) {
         let playerTotalScore =   playerScores.reduce((initial, score) => initial += score, 0)   
        console.log('playerScore', playerScores)
        let botTotalScore = botScores.reduce((initial, score) => initial += score, 0)   
        console.log('botScore', botScores)
        document.getElementById('playerTotal').innerHTML = playerTotalScore    
        document.getElementById('botTotal').innerHTML = botTotalScore    

        document.getElementsByClassName('playerBtn')[0].disabled = true
        document.getElementsByClassName('botBtn')[0].disabled = true
         
        playerTotalScore > botTotalScore ? document.getElementById('winner').innerHTML = 'PLAYER WINS !!!' :
        document.getElementById('winner').innerHTML = 'BOT WINS !!!'  
      }
  }      
}
