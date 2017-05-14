var whichChange = 0
var xArr = []
var oArr = [3,5,6,7,8]
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
