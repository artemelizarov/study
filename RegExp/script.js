function valideit(data, regexp, errorText, attr) {
  console.log(data.value.match(regexp));
  if(data.value.match(regexp)) {
    data.className = 'success';
    let toRemove = document.getElementById(attr);
    if(toRemove) {
      toRemove.parentNode.removeChild(toRemove);
    }
} else {
    data.setAttribute('class','error');
    if(!document.getElementById(attr)) {
      let error = document.createElement('p');
      error.className = "error_text";
      error.id = attr;
      error.innerText=errorText;
      console.log(errorText);
      data.parentNode.insertBefore(error, data);
    }
}
}
document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('input[name="phone"]').onblur= function() {
    let data= document.querySelector('input[name="phone"]');
    let regexp = new RegExp(/^\+([0-9]{1}\([0-9]{3}\)[0-9]{3}-[0-9]{2}-[0-9]{2})$/);
    let errorText = "Ne valindi";
    let attr = 'error_phone';
valideit(data, regexp, errorText, attr);
}
document.querySelector('input[name="login"]').onblur= function() {
  let data = document.querySelector('input[name="login"]');
  let regexp = new RegExp(/^(?=.*[A-z])(?=.*[0-9]).*$/)
  let errorText = "Ne valindi";
  let attr = 'error_login';
  valideit(data, regexp, errorText, attr);
}
 document.querySelector('input[name="email"]').onblur= function() {
   let data = document.querySelector('input[name="email"]');
   let regexp = new RegExp(/^[-._a-z0-9]+@[a-z0-9]+\.[a-z]+$/)
   let errorText = "Ne valindi";
   let attr = 'error_email';
   valideit(data, regexp, errorText, attr);
 }
   document.querySelector('input[name="pass"]').onblur= function() {
     let data = document.querySelector('input[name="pass"]');
     let regexp = new RegExp(/^(?=.*[A-z]+)(?=.*[0-9]+)(?=.*[A-Z]+).*$/);
     let errorText = "Ne valindi";
     let attr = 'error_email';
     valideit(data, regexp, errorText, attr);
 }
})
