var btnGoSignUp = document.getElementById("btn-goSignUp");

btnGoSignUp.onclick = async function(){

    if ( await signUp() ) {  
      alert("Cadastrado")
      window.location.href = "/pages/home.html";
    } else {
      document.getElementById("errorName").style.display = "block";
      document.getElementById("errorEmail").style.display = "block";
      document.getElementById("errorPassword").style.display = "block";
      document.getElementById("errorUser").style.display = "block";
    }
}