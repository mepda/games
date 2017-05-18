var turnCounter = 0
var players = [[], []]
var winCount;
var playerImage = ["images/odog.jpg", "images/xcat.gif"]
var winCombos = [[1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 5, 9], [3, 5, 7]]


/*
NOTES:
-The computer is not perfect, it can be beaten. (this could be changed with a simple addition to the computersTurn method.
-There's no way to choose whether you want to go first or second, and there's no way to choose whether the players are human or computer controlled.
-I took some serious liberties with renaming variables!
-There's a pretty serious bad code-smell here.  Both 'value' attributes for squares and player arrays are used to determine squares availability.
-Overall, this is totally sick.  Nice work so far!  The confetti is amazing!  (is that your code?!?!)
 */


function isWin(player) {
    for (var j = 0; j < winCombos.length; j++) {
        winCount = 0;
        for (var i = 0; i < winCombos[j].length; i++) {
            if ($.inArray(winCombos[j][i], players[player]) !== -1) {
                winCount++
                if (winCount === 3) {
                    console.log("players squares: " + players[0]);
                    console.log("computers squares: " + players[1]);
                    window.alert("Win for player " + player + "!")
                    canYouSeeMe()
                    RestartConfetti()
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

function squareIsAvailable(desiredSquare) {
    console.log("desired square: " + desiredSquare)
    return (($.inArray(desiredSquare, players[0]) === -1 && ($.inArray(desiredSquare, players[1]) === -1)))
}

function checkForImminentWin(playersArray) {
    var bestMove = null
    for (var j = 0; j < winCombos.length; j++) {
        var squaresBeforeVictory = []
        for (var i = 0; i < winCombos[j].length; i++) {
            if (playersArray.indexOf(winCombos[j][i]) < 0) { //your JQuery code above is cooler and more explicit!
                squaresBeforeVictory.push(winCombos[j][i])
            }
        }
        if (squaresBeforeVictory.length === 1
            && squareIsAvailable(squaresBeforeVictory[0])) {
            return squaresBeforeVictory[0];
        }
    }
    return bestMove
}

function takeMiddleOrCorner() {
    var orderOfImportance = [5, 1, 3, 7, 9]
    for (var number = 0; number < orderOfImportance.length; number++) {
        var bestMove = orderOfImportance[number]
        if (squareIsAvailable(bestMove)) {
            return bestMove
        }
    }
    return null
}


function claimSquare(turn, squareNumber) {
    players[turn].push(Number(squareNumber))
    changeAndFade($("div").find("[value='" + squareNumber + "']"), turn)
    $("div").find("[value='" + squareNumber + "']").attr('locked', 'true')
    isWin(turn)
    turnCounter++
}

function computersTurn(turn) {
    console.log("computers turn")
    var bestMove = null;
    if (players[turn].length > 0) {
        bestMove = checkForImminentWin(players[turn])
        console.log("move to win is: " + bestMove)
    }
    var nextTurn = (turn + 1) % 2
    if (players[nextTurn].length > 0 && bestMove === null) {
        console.log("computer is not one square from victory")
        bestMove = checkForImminentWin(players[nextTurn])
        console.log("move to block player (if one square from winning) is: " + bestMove)

    }
    if (bestMove === null) {
        bestMove = takeMiddleOrCorner()
        console.log("move to take middleorcorener: " + bestMove)

    }
    console.log("bestmove: " + bestMove)

    claimSquare(turn, bestMove);
}

function changeAndFade(square, player) {
    square.fadeOut(400, function () {
        square.fadeIn(400).attr('src', playerImage[player])
    })
    console.log("pic: " + playerImage[player])
}

$(document).ready(function () {

  console.log("confetis", window.requestAnimFrame);

    $('img').add('h1').hover(function () {
        $(this).toggleClass('highlight')
    })

    $('#resetButton').click(function () {
        location.reload()
    })
    $('h1').click(function () {
        $('h1').effect('shake', {times: 3}, 1000)
    })
    $('img').click(function () {
        if ($(this).attr('locked') == "false") {
            var playersTurn = turnCounter % 2
            if (playersTurn == 0) {
                var chosenSquare = $(this).attr("value")
                claimSquare(playersTurn, chosenSquare)
            }
            changeAndFade($(this))
            computersTurn(turnCounter % 2)

        }
    })
})
