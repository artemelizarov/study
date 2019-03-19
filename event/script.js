document.addEventListener("DOMContentLoaded", function(){

  document.getElementById("block").onclick = function() {
    alert(document.getElementById("block").innerHTML);
  }
  document.getElementById('my_input').onblur = function(){
    console.log('success');
  }
  document.getElementsByTagName('form')[0].onsubmit = function(event) {
    // event.preventDefault();
    document.querySelector('button').setAttribute('disabled', "disabled");
  //  document.querySelector('button').disabled = true;
  }
  document.getElementsByTagName('img')[0].onmousemove = function () {
  console.log('Координаты оси X'+event.clientX);
	console.log('Координаты оси Y'+event.clientY);


  }
  window.onbeforeunload = function() {
  	return "Данные не сохранены. Точно перейти?";
  };
});
