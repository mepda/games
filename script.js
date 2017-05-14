var whichChange = 0
var xArr = []
var oArr = []
var x, o;
var change;
var winCombos = [[1,4,7],[2,5,8],[3,6,9],[1,2,3],[4,5,6],[7,8,9],[1,5,9],[3,5,7]]

function isWin(numbers){
  for(var j = 0; j <  winCombos.length; j++){
    for(var i = 0; i < winCombos[i].length; i++){
      console.log(winCombos[j][i]);
       if($.inArray(numbers, winCombos[i]) == -1){
         console.log("no win");
         console.log(oArr);
         return false;
       }
    }
  }
  console.log(haystack);
  console.log(oArr);
  console.log("win!!!");
  return true;
}

$(document).ready(function(){
  $('h1').click(function(){
    $('body').addClass('win')
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
            isWin(winCombos, oArr)
            whichChange++
      } else {
        change = "images/xcat.gif"
        // xArr.push($(this).val)
        x = $(this).attr("value")
        xArr.push(x)
        whichChange++
      }
      $(this).fadeOut(400, function(){
        $(this).fadeIn(400).attr('src', change)
      })
    }
  })
})
