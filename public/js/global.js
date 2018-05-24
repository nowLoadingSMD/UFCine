jQuery(document).ready(function($) { 
    $(".scroll").click(function(event){        
		event.preventDefault();
		$('html,body').animate({scrollTop:$(this.hash).offset().top}, 600);
    });
});

// Get the modal
var modal = document.getElementById('myModal');
		
// Get the button that opens the modal
var btn = document.getElementById("btn-login");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("close")[1];

var btnSignUp = document.getElementById("btn-modal-signUp");
var btnLogin = document.getElementById("btn-modal-login");
var modalLogin = document.getElementById("modal-login");
var modalSignUp = document.getElementById("modal-signUp");

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
span2.onclick = function() {
  modal.style.display = "none";
}

btnSignUp.onclick = function(){
  modalLogin.style.display = "none";
  modalSignUp.style.display = "block";
}

btnLogin.onclick = function(){
  modalLogin.style.display = "block";
  modalSignUp.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}