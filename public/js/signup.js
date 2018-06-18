var btnGoSignUp = document.getElementById("btn-goSignUp");

btnGoSignUp.onclick = async function(){
  
    if ( await signUp() ) {  
      window.location.href = "/pages/home.html";
    } else {
      document.getElementById("errorName").style.display = "block";
      document.getElementById("errorEmail").style.display = "block";
      document.getElementById("errorPassword").style.display = "block";
    }
}

function checkStudent() {
  var checkBox = document.getElementById("slideOne");
  var btnDisplay = document.getElementById("grid-author");

  if (checkBox.checked == true){
      btnDisplay.style.display = "block";
  } else {
      btnDisplay.style.display = "none";
  }
}