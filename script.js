var whichChange = 0
var xArr = []
var oArr = []
var x, o, winCount;
var change;
var winCombos = [[1,4,7],[2,5,8],[3,6,9],[1,2,3],[4,5,6],[7,8,9],[1,5,9],[3,5,7]]

function isWin(playerNumbers){
  for(var j = 0; j < winCombos.length; j++){
    winCount = 0;
    for(var i = 0; i < winCombos[j].length; i++){
      console.log(winCombos[j][i]);
      if($.inArray(winCombos[j][i], playerNumbers) !== -1){
        winCount++
        if(winCount === 3) {
          console.log('haystack');
          console.log(oArr);
          console.log("win!!!");
          return true;
        }
      }
    }
  }
  console.log("no win");
  console.log(oArr);
  console.log(xArr);
  return false;
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
    if($(this).attr('locked') == "false"){
    //  console.log('can click this');
      $(this).attr('locked','true')
    //  console.log("locked has been changed to ", $(this).attr('locked'))
      if(whichChange % 2 == 0){
            change = "images/odog.jpg"
            o = $(this).attr("value")
            oArr.push(Number(o))
            isWin(oArr)
            whichChange++
      } else {
        change = "images/xcat.gif"
        // xArr.push($(this).val)
        x = $(this).attr("value")
        xArr.push(Number(x))
        isWin(xArr)
        whichChange++
      }
      $(this).fadeOut(400, function(){
        $(this).fadeIn(400).attr('src', change)
      })
    }
  })
})
