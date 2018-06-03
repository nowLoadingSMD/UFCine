var logar = document.getElementById("btn-goLogin");

logar.onclick = async function(){

    if ( await login() ){  
        alert("Logado")
        window.location.href = "/pages/home.html"
    } else {
      alert("Erro ao logar")
    }
  
  }