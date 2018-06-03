jQuery(document).ready(async function($) { 
    $(".scroll").click(function(event){        
		event.preventDefault();
		$('html,body').animate({scrollTop:$(this.hash).offset().top}, 600);
    });

    console.log(await checkLogged())

    if (await checkLogged()) {
      document.getElementById("btn-login").style.display = "none";
      document.getElementById("btn-user").style.display = "block";

      $(".block-logged").css("display", "block");

      document.getElementById("profileAnchor").href = `/pages/profile.html?id=${getCookie('userId')}`;

    } else {
      $(".block-logged").css("display", "none");
    }

});

// Get the modal
var modal = document.getElementById('myModal');
		
// Get the button that opens the modal
var btn = document.getElementById("btn-login");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("close")[1];
var span3 = document.getElementsByClassName("close")[2];

var btnSignUp = document.getElementById("btn-modal-signUp");
var btnLogin = document.getElementById("btn-modal-login");
var btnUpload = document.getElementById("btn-upload");
var modalLogin = document.getElementById("modal-login");
var modalSignUp = document.getElementById("modal-signUp");
var modalUpload = document.getElementById("modal-upload");

var modalContent = document.getElementsByClassName('modal-content')[0];

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
span3.onclick = function() {
  modal.style.display = "none";
}

btnSignUp.onclick = function(){
  modalLogin.style.display = "none";
  modalSignUp.style.display = "block";
  modalUpload.style.display = "none";
}

btnLogin.onclick = function(){
  modalLogin.style.display = "block";
  modalSignUp.style.display = "none";
  modalUpload.style.display = "none";
}

btnUpload.onclick = function(){
  modalContent.style.width = "80%";
  modalContent.style.height = "auto";
  modalContent.style.marginTop = "-50px";
  modalLogin.style.display = "none";
  modalSignUp.style.display = "none";
  modal.style.display = "block";
  modalUpload.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

var logar = document.getElementById("btn-goLogin");
var user = document.getElementById("btn-user");
var logarMobile = document.getElementById("iconLogin");

var btnGoSignUp = document.getElementById("btn-goSignUp"); //Rever essa variavel
var btnLogout = document.getElementById("btn-logout");

logar.onclick = async function(){

  if ( await login() ){
      modal.style.display = "none";
      btn.style.display = "none";
      user.style.display = "block";
      logarMobile.style.display = "none";
  // } else {
  //   alert("Erro ao logar")
  // }

  
      $(".block-logged").css("display", "block");
  } else {
    alert("Erro ao logar")
  }

}

btnGoSignUp.onclick = async function(){

  if ( await signUp() ) {
    modal.style.display = "none";
    btn.style.display = "none";
    user.style.display = "block";
    logarMobile.style.display = "none";

    $(".block-logged").css("display", "block");
  } else {
    alert("Erro ao cadastrar")
  }
}

btnLogout.onclick = function(e){
  // e.preventDefault()
  logout();
  btn.style.display = "block";
  user.style.display = "none";
  modalLogin.style.display = "block";
  modalUpload.style.display = "none";
  modalContent.style.width = "40%";
  modalContent.style.height = "350px";
  modalContent.style.marginTop = "auto";
}

var addItem = document.getElementById("addItem");
var list = document.getElementById("list");
var addItem2 = document.getElementById("addItem2");
var list2 = document.getElementById("list2");

addItem.onclick = function(){
  var textfield = document.createElement("input");
  textfield.type = "text";
  list.appendChild(textfield);
}

addItem2.onclick = function(){
  var textfield = document.createElement("input");
  textfield.type = "text";
  list2.appendChild(textfield);

  $(".block-logged").css("display", "none");
}