var turnCounter = 0
var players = [[],[]]
var winCount;
var change;
var playerImage = ["images/odog.jpg","images/xcat.gif"]
var winCombos = [[1,4,7],[2,5,8],[3,6,9],[1,2,3],[4,5,6],[7,8,9],[1,5,9],[3,5,7]]

function isWin(playerNumbers){
  for(var j = 0; j < winCombos.length; j++){
    winCount = 0;
    for(var i = 0; i < winCombos[j].length; i++){
      //console.log(winCombos[j][i]);
      if($.inArray(winCombos[j][i], playerNumbers) !== -1){
        winCount++
        if(winCount === 3) {
          console.log('haystack');
          console.log(players[0]);
          console.log("win!!!");
          window.alert("Win for player ____!")
          return true;
        }
      }
    }
  }
  console.log("no win");
  console.log(players[0]);
  console.log(players[1]);
  return false;
}

function squareIsAvailable(desiredSquare){
  console.log("desired square: " + desiredSquare)

  return (($.inArray(desiredSquare,players[0]) &&  ($.inArray(desiredSquare,players[1]))))
}

function checkForImminentWin(playersArray){
  var bestMove = null
  for(var j = 0; j < winCombos.length; j++){
    var squaresBeforeVictory = []
    for(var i = 0; i < winCombos[j].length; i++){
      if(playersArray.indexOf(winCombos[j][i]) < 0){ //your JQuery code above is cooler and more explicit!
        squaresBeforeVictory.push(winCombos[j][i])
      }
    }
    if(squaresBeforeVictory.length === 1
       && squareIsAvailable(squaresBeforeVictory[0])){
      return squaresBeforeVictory[0];
    }
  }
  return bestMove
}

function takeMiddleOrCorner(){
  var orderOfImportance = [5,1,3,7,9]
  for(var number = 0; number < orderOfImportance.length; number++){
      var bestMove = orderOfImportance[number]
    if(squareIsAvailable(bestMove)){
      return bestMove
    }
  }
  return null
}


function claimSquare(turn,squareNumber){
    players[turn].push(Number(squareNumber))
    isWin(players[turn])
    changeAndFade($("div").find("[value='" + squareNumber + "']"),turn)
    $("div").find("[value='" + squareNumber + "']").attr('locked','true')
    turnCounter++
}

function computersTurn(turn){
  console.log("computers turn")
  var bestMove = null;
    if(players[turn].length > 0){
      bestMove = checkForImminentWin(players[turn])
        //console.log("computer has claimed more than one square")
        console.log("move to win is: " + bestMove)
    }
  var nextTurn = (turn + 1) % 2
  if(players[nextTurn].length > 0 && bestMove === null){
    console.log("computer is not one square from victory")
    bestMove = checkForImminentWin(players[nextTurn])
      console.log("move to block player (if one square from winning) is: " + bestMove)

  }
  if(bestMove === null){
    bestMove = takeMiddleOrCorner()
      console.log("move to take middleorcorener: " + bestMove)

  }
    console.log("bestmove: " + bestMove)

    claimSquare(turn,bestMove);
}

function changeAndFade(square,player){
    square.fadeOut(400, function() {
        square.fadeIn(400).attr('src', playerImage[player])
    })
    console.log("pic: "+ playerImage[player])
}

$(document).ready(function(){
  $('img').add('h1').hover(function(){
    $(this).toggleClass('highlight')
  })

  $('#resetButton').click(function(){
    location.reload()
  })
  $('h1').click(function(){
    $('h1').effect('shake', {times: 3}, 1000)
  })
  $('img').click(function(){
      if($(this).attr('locked') === "false"){
          var playersTurn = turnCounter % 2
          if(playersTurn == 0){
              var chosenSquare = $(this).attr("value")
              claimSquare(playersTurn, chosenSquare)
      }
        changeAndFade($(this))
      }
      computersTurn(turnCounter % 2)
  })
})
