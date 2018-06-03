var btnGoSignUp = document.getElementById("btn-goSignUp");

btnGoSignUp.onclick = async function(){

    if ( await signUp() ) {  
      alert("Cadastrado")
      window.location.href = "/pages/home.html";
    } else {
      alert("Erro ao cadastrar")
    }
}