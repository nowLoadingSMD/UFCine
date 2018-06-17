var logar = document.getElementById("btn-goLogin");

logar.onclick = async function(){

    if ( await login() ){  
        alert("Logado")
        window.location.href = "/pages/home.html"
    } else {
      document.getElementById("errorEmail").style.display = "block";
      document.getElementById("errorPassword").style.display = "block";
    }
  
  }