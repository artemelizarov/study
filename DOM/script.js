console.log(window.screen);
let div1 = document.getElementsByTagName('div');
console.log(div1);
function randomColor() {
  function getRandom() {
    let min =0;
    let max = 255;
    return parseInt (Math.random()* (max- min) + min);
  }
  return "rgb("+getRandom()+','+getRandom()+', '+getRandom()+ ")";
}
// function getRandom() {
//   let min =0;
//   let max = 255;
//   return parseInt (Math.random()* (max- min) + min);
// }

for ( let i = 0; i<div1.length; i++){
  div1[i].style.background = randomColor();
}
